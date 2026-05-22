const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

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
