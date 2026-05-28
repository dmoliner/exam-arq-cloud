const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

const statsFilePath = path.join(__dirname, 'stats.json');

// Credencials de la base de dades de 2 usuaris obtingudes de variables d'entorn d'Azure
const USER_ADMIN = process.env.user_admin || 'admin';
const PASS_ADMIN = process.env.pass_admin || 'admin123';
const USER_STUDENT = process.env.user1 || 'user1';
const PASS_STUDENT = process.env.pass_user1 || 'user123';

if (!process.env.user_admin || !process.env.pass_admin || !process.env.user1 || !process.env.pass_user1) {
    console.warn(`[⚠️ SEGURETAT] Faltes variables d'entorn d'Azure (user_admin, pass_admin, user1, pass_user1). S'estan utilitzant els valors de seguretat per defecte.`);
}

// Middleware per parsejar JSON en peticions POST/PUT
app.use(express.json());

// Petit middleware per parsejar cookies manualment sense llibreries externes
const customCookieParser = (req, res, next) => {
    const cookiesStr = req.headers.cookie || '';
    req.cookies = {};
    cookiesStr.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        if (parts.length === 2) {
            req.cookies[parts[0].trim()] = parts[1].trim();
        }
    });
    next();
};
app.use(customCookieParser);

// Middleware per protegir rutes d'administració
const requireAdmin = (req, res, next) => {
    if (req.cookies.admin_session === 'authenticated_token_123') {
        next();
    } else {
        res.redirect('/login');
    }
};

// Middleware per protegir rutes de l'estudiant (user1)
const requireStudent = (req, res, next) => {
    if (req.cookies.student_session === 'authenticated_token_456') {
        next();
    } else {
        res.redirect('/login');
    }
};


// API endpoints per a l'històric de proves persistent al servidor (global)
app.get('/api/stats', (req, res) => {
    if (!fs.existsSync(statsFilePath)) {
        return res.json({});
    }
    fs.readFile(statsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error llegint stats.json", err);
            return res.status(500).send("Error de servidor");
        }
        try {
            res.json(JSON.parse(data));
        } catch (e) {
            res.json({});
        }
    });
});

app.post('/api/stats', (req, res) => {
    const stats = req.body || {};
    fs.writeFile(statsFilePath, JSON.stringify(stats, null, 2), 'utf8', (err) => {
        if (err) {
            console.error("Error escrivint stats.json", err);
            return res.status(500).send("Error de servidor");
        }
        res.sendStatus(200);
    });
});

// API d'Autenticació (Base de dades de 2 usuaris de variables d'entorn d'Azure)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || username.trim() === '') {
        return res.status(400).json({ success: false, message: 'El nom d\'usuari és obligatori' });
    }
    if (!password || password.trim() === '') {
        return res.status(400).json({ success: false, message: 'La contrasenya és obligatòria' });
    }

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    // 1. Validació d'Administrador
    if (trimmedUser === USER_ADMIN && trimmedPass === PASS_ADMIN) {
        res.cookie('admin_session', 'authenticated_token_123', { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
        return res.json({ success: true, redirect: '/admin' });
    }

    // 2. Validació d'Estudiant (user1)
    if (trimmedUser === USER_STUDENT && trimmedPass === PASS_STUDENT) {
        res.cookie('student_session', 'authenticated_token_456', { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
        res.cookie('user_name', USER_STUDENT, { maxAge: 30 * 24 * 60 * 60 * 1000 });
        return res.json({ success: true, redirect: '/' });
    }

    return res.status(401).json({ success: false, message: 'Usuari o contrasenya incorrectes' });
});

app.get('/api/logout', (req, res) => {
    res.clearCookie('admin_session');
    res.clearCookie('student_session');
    res.clearCookie('user_name');
    res.redirect('/login');
});

// API per consultar l'estat actual de la sessió de l'usuari
app.get('/api/session', (req, res) => {
    if (req.cookies.admin_session === 'authenticated_token_123') {
        return res.json({ loggedIn: true, role: 'admin', username: USER_ADMIN });
    } else if (req.cookies.student_session === 'authenticated_token_456') {
        return res.json({ loggedIn: true, role: 'student', username: USER_STUDENT });
    }
    return res.json({ loggedIn: false });
});

// API GET: Llistar totes les preguntes de test i casos pràctics per a gestió
app.get('/api/admin/questions', requireAdmin, (req, res) => {
    const preguntesTestPath = path.join(__dirname, 'preguntes.json');
    const preguntesPracticPath = path.join(__dirname, 'preguntes-caspractic.json');

    let preguntesTest = [];
    let preguntesPractic = [];

    try {
        if (fs.existsSync(preguntesTestPath)) {
            preguntesTest = JSON.parse(fs.readFileSync(preguntesTestPath, 'utf8'));
        }
    } catch (e) { console.error("Error llegint preguntes.json", e); }

    try {
        if (fs.existsSync(preguntesPracticPath)) {
            preguntesPractic = JSON.parse(fs.readFileSync(preguntesPracticPath, 'utf8'));
        }
    } catch (e) { console.error("Error llegint preguntes-caspractic.json", e); }

    res.json({
        test: preguntesTest,
        practic: preguntesPractic
    });
});

// API POST: Afegir una nova pregunta al fitxer corresponent
app.post('/api/admin/questions', requireAdmin, (req, res) => {
    const { type, question } = req.body;
    if (!type || !question) {
        return res.status(400).send("Dades incompletes");
    }

    const filePath = type === 'test' 
        ? path.join(__dirname, 'preguntes.json') 
        : path.join(__dirname, 'preguntes-caspractic.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let list = [];
        if (!err && data) {
            try { list = JSON.parse(data); } catch(e) {}
        }
        
        list.push(question);
        
        fs.writeFile(filePath, JSON.stringify(list, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Error al desar la pregunta", err);
                return res.status(500).send("Error de servidor");
            }
            res.json({ success: true });
        });
    });
});

// API DELETE: Eliminar una pregunta pel seu índex i tipus
app.delete('/api/admin/questions', requireAdmin, (req, res) => {
    const { type, index } = req.body;
    if (type === undefined || index === undefined) {
        return res.status(400).send("Falten paràmetres de tipus o índex");
    }

    const filePath = type === 'test' 
        ? path.join(__dirname, 'preguntes.json') 
        : path.join(__dirname, 'preguntes-caspractic.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err || !data) return res.status(500).send("Error llegint el fitxer");
        let list = [];
        try { list = JSON.parse(data); } catch(e) { return res.status(500).send("Error parsejant el fitxer"); }
        
        if (index < 0 || index >= list.length) {
            return res.status(400).send("Índex de pregunta fora de rang");
        }
        
        list.splice(index, 1);
        
        fs.writeFile(filePath, JSON.stringify(list, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Error al guardar modificacions", err);
                return res.status(500).send("Error de servidor");
            }
            res.json({ success: true });
        });
    });
});

// Servir archivos estáticos explícitos para máxima seguridad
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/admin', requireAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/rendiment', requireStudent, (req, res) => {
    res.sendFile(path.join(__dirname, 'rendiment.html'));
});

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/preguntes.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'preguntes.json'));
});

app.get('/preguntes-caspractic.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'preguntes-caspractic.json'));
});

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.js'));
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send('Recurs no trobat');
});

app.listen(PORT, () => {
    console.log(`=== Servidor web Node.js actiu (Espai Privat Habilitat) ===`);
    console.log(`Accedeix a la aplicació en: http://localhost:${PORT}`);
});
