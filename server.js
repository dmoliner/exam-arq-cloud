const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

const statsFilePath = path.join(__dirname, 'stats.json');

// Middleware per parsejar JSON en peticions POST/PUT
app.use(express.json());

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

// Servir archivos estáticos explícitos para máxima seguridad
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/preguntes.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'preguntes.js'));
});

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.js'));
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send('Recurs no trobat');
});

app.listen(PORT, () => {
    console.log(`=== Servidor web Node.js actiu ===`);
    console.log(`Accedeix a la aplicació en: http://localhost:${PORT}`);
});
