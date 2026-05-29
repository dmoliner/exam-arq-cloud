const express = require('express');
const path = require('path');
const fs = require('fs');
const { ContainerClient } = require('@azure/storage-blob');
const app = express();

const PORT = process.env.PORT || 3001;

const statsFilePath = path.join(__dirname, 'stats.json');

// Configurar Azure Blob Storage mitjançant URL i Token SAS obtinguts de les variables d'entorn
const URL_SAS_BLOB = process.env.URL_SAS_BLOB;
const TOKEN_SAS_BLOB = process.env.TOKEN_SAS_BLOB;

let containerClient = null;
if (URL_SAS_BLOB && TOKEN_SAS_BLOB) {
    try {
        let sasToken = TOKEN_SAS_BLOB.trim();
        if (sasToken && !sasToken.startsWith('?')) {
            sasToken = '?' + sasToken;
        }
        // Combinar la URL base del contenidor i el token SAS amb format correcte
        const containerSasUrl = `${URL_SAS_BLOB.trim()}${sasToken}`;
        containerClient = new ContainerClient(containerSasUrl);
        console.log(`[☁️ AZURE STORAGE] Connectat correctament al Blob Storage mitjançant URL i Token SAS.`);
    } catch (err) {
        console.error(`[❌ AZURE STORAGE] Error al connectar amb el Blob Storage mitjançant SAS:`, err.message);
    }
} else {
    console.log(`[💻 LOCAL STORAGE] No s'han detectat URL_SAS_BLOB i TOKEN_SAS_BLOB. L'aplicació funcionarà amb els fitxers locals.`);
}

// Funció per determinar el nom del blob (camí complet) a Azure Blob Storage
function getBlobName(filename) {
    if (filename === 'preguntes-caspractic.json') {
        return 'caspractic/preguntes-caspractic.json';
    }
    return filename;
}

// Funcions asíncrones per llegir/escriure fitxers de preguntes amb fallback
async function readQuestions(filename) {
    const localPath = path.join(__dirname, filename);
    
    if (containerClient) {
        const blobName = getBlobName(filename);
        try {
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            const exists = await blockBlobClient.exists();
            if (exists) {
                const buffer = await blockBlobClient.downloadToBuffer();
                const dataStr = buffer.toString('utf8');
                return JSON.parse(dataStr);
            } else {
                console.warn(`[☁️ AZURE STORAGE] El blob ${blobName} no existeix a Azure. Retornant array buit.`);
                return [];
            }
        } catch (err) {
            console.error(`[❌ AZURE STORAGE] Error llegint blob ${blobName} de Azure:`, err.message);
            return [];
        }
    }
    
    if (fs.existsSync(localPath)) {
        try {
            return JSON.parse(fs.readFileSync(localPath, 'utf8'));
        } catch (e) {
            console.error(`Error parsejant el fitxer local ${filename}:`, e);
            return [];
        }
    }
    return [];
}

async function writeQuestions(filename, data) {
    const localPath = path.join(__dirname, filename);
    const dataStr = JSON.stringify(data, null, 2);
    
    if (containerClient) {
        const blobName = getBlobName(filename);
        try {
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.upload(dataStr, dataStr.length);
            console.log(`[☁️ AZURE STORAGE] Blob ${blobName} actualitzat amb èxit a Azure.`);
        } catch (err) {
            console.error(`[❌ AZURE STORAGE] Error al desar blob ${blobName} a Azure:`, err.message);
        }
    }
    
    fs.writeFileSync(localPath, dataStr, 'utf8');
}

// Credencials de la base de dades de 2 usuaris obtingudes de variables d'entorn d'Azure (sense contrasenyes per defecte al codi)
const USER_ADMIN = process.env.user_admin;
const PASS_ADMIN = process.env.pass_admin;
const USER_STUDENT = process.env.user1;
const PASS_STUDENT = process.env.pass_user1;

if (!USER_ADMIN || !PASS_ADMIN || !USER_STUDENT || !PASS_STUDENT) {
    console.error(`[❌ SEGURETAT] Faltes variables d'entorn d'Azure obligatòries (user_admin, pass_admin, user1, pass_user1). L'accés romandrà bloquejat fins que estiguin definides.`);
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
app.get('/api/admin/questions', requireAdmin, async (req, res) => {
    try {
        const preguntesTest = await readQuestions('preguntes.json');
        const preguntesPractic = await readQuestions('preguntes-caspractic.json');
        res.json({
            test: preguntesTest,
            practic: preguntesPractic
        });
    } catch (e) {
        console.error("Error al llistar les preguntes per a gestió", e);
        res.status(500).send("Error de servidor");
    }
});

// API POST: Afegir una nova pregunta al fitxer corresponent
app.post('/api/admin/questions', requireAdmin, async (req, res) => {
    const { type, question } = req.body;
    if (!type || !question) {
        return res.status(400).send("Dades incompletes");
    }

    const filename = type === 'test' ? 'preguntes.json' : 'preguntes-caspractic.json';

    try {
        const list = await readQuestions(filename);
        list.push(question);
        await writeQuestions(filename, list);
        res.json({ success: true });
    } catch (e) {
        console.error("Error al desar la pregunta", e);
        res.status(500).send("Error de servidor");
    }
});

// API DELETE: Eliminar una pregunta pel seu índex i tipus
app.delete('/api/admin/questions', requireAdmin, async (req, res) => {
    const { type, index } = req.body;
    if (type === undefined || index === undefined) {
        return res.status(400).send("Falten paràmetres de tipus o índex");
    }

    const filename = type === 'test' ? 'preguntes.json' : 'preguntes-caspractic.json';

    try {
        const list = await readQuestions(filename);
        if (index < 0 || index >= list.length) {
            return res.status(400).send("Índex de pregunta fora de rang");
        }
        
        list.splice(index, 1);
        await writeQuestions(filename, list);
        res.json({ success: true });
    } catch (e) {
        console.error("Error al eliminar la pregunta", e);
        res.status(500).send("Error de servidor");
    }
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

app.get('/preguntes.json', async (req, res) => {
    try {
        const data = await readQuestions('preguntes.json');
        res.json(data);
    } catch (err) {
        res.status(500).send("Error de servidor");
    }
});

app.get('/preguntes-caspractic.json', async (req, res) => {
    try {
        const data = await readQuestions('preguntes-caspractic.json');
        res.json(data);
    } catch (err) {
        res.status(500).send("Error de servidor");
    }
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
