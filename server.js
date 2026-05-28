const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

const statsFilePath = path.join(__dirname, 'stats.json');

// Credencials agafades de les variables d'entorn o fallbacks segurs
const USER_ADMIN = process.env.user_admin || 'admin';
const PASS_ADMIN = process.env.pass_admin || 'admin123';

if (!process.env.user_admin || !process.env.pass_admin) {
    console.warn(`[⚠️ SEGURETAT] Les variables d'entorn user_admin o pass_admin no estan definides. S'estan utilitzant les credencials per defecte.`);
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

// API d'Autenticació
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USER_ADMIN && password === PASS_ADMIN) {
        // Establir la cookie de sessió (vàlida per 2 hores)
        res.cookie('admin_session', 'authenticated_token_123', { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
        return res.json({ success: true });
    }
    return res.status(401).json({ success: false, message: 'Usuari o contrasenya incorrectes' });
});

app.get('/api/logout', (req, res) => {
    res.clearCookie('admin_session');
    res.redirect('/login');
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
