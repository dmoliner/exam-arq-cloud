# Simulador d'Examen Perfil Cloud

Aquesta és una WebApp per a la preparació d'examens del temari d'arquitectura Cloud.Permet als candidats posar a prova els seus coneixements en tecnologies Cloud mitjançant simulacres d'examen de 50 preguntes seleccionades de forma aleatòria.

---

## 🚀 Característiques principals

* **Preguntes aleatòries**: Cada intent genera un test únic de 50 preguntes obtingudes de manera aleatòria del banc de preguntes complet (`preguntes.js`).
* **Correcció i justificació instantània**: En seleccionar una resposta, es mostra immediatament si és correcta o incorrecta, acompanyada d'una **justificació tècnica detallada** per ajudar a l'estudi.
* **Seguiment del progrés**: Durant el test, es pot consultar un gràfic de tipus *doughnut* (mitjançant la llibreria Chart.js) amb el percentatge d'encerts i errors acumulats.
* **Nota final detallada**: En finalitzar les 50 preguntes, es presenta la nota final calculada sobre 10 punts i un resum visual global dels resultats.
* **Interfície responsive**: Disseny modern, net i adaptat per a dispositius mòbils i ordinadors de sobretaula.
* **Desplegament lleuger**: Servidor en Node.js i Express preparat tant per a execució local com per a desplegament amb Docker.

---

## 📁 Estructura del Projecte

El projecte està estructurat de manera modular per facilitar la seva comprensió i manteniment:

```text
Temari_webAPP/
├── index.html          # Estructura de la interfície d'usuari (UI) i pantalles del simulador.
├── styles.css          # Full d'estils CSS per a una visualització neta i moderna.
├── app.js              # Lògica del client (gestió del test, esdeveniments, puntuació i gràfics).
├── preguntes.js        # Banc de dades amb les preguntes, opcions, respostes correctes i justificacions.
├── server.js           # Servidor web minimalista en Node.js utilitzant Express.
├── Dockerfile          # Configuració de la imatge de Docker per a entorns de producció o proves.
├── .dockerignore       # Fitxers exclosos del context de construcció de Docker.
└── package.json        # Dependències del projecte i scripts de Node.js.
```

---

## 🛠️ Requisits previs

Abans de començar, assegura't de tenir instal·lat:

* [Node.js](https://nodejs.org/) (versió 18.0.0 o superior)
* [npm](https://www.npmjs.com/) (normalment inclòs amb Node.js)
* O bé [Docker](https://www.docker.com/) si prefereixes executar-lo mitjançant contenidors.

---

## ⚙️ Com començar

### Opció 1: Execució Local amb Node.js

1. Clona o descarrega aquest repositori al teu ordinador.
2. Obre una terminal al directori arrel del projecte (`Temari_webAPP`).
3. Instal·la les dependències necessàries:
   ```bash
   npm install
   ```
4. Inicia el servidor de l'aplicació:
   ```bash
   npm start
   ```
5. Obre el teu navegador preferit i accedeix a:
   [http://localhost:3000](http://localhost:3000)

### Opció 2: Execució mitjançant Docker

L'aplicació està completament preparada per ser contenidoritzada. Això garanteix que s'executarà de la mateixa manera en qualsevol ordinador o entorn Cloud.

1. Construeix la imatge de Docker:
   ```bash
   docker build -t temari-webapp-cloud .
   ```
2. Executa el contenidor obrint el port `3000`:
   ```bash
   docker run -d -p 3000:3000 --name simulador-diba temari-webapp-cloud
   ```
3. Accedeix a l'aplicació a través de:
   [http://localhost:3000](http://localhost:3000)

---

## 📊 Banc de Preguntes (`preguntes.js`)

El fitxer `preguntes.js` conté el llistat d'objectes amb les preguntes de l'examen. Per afegir, modificar o treure preguntes del banc general, només cal editar aquest fitxer seguint l'estructura següent:

```javascript
{
    pregunta: "1. Quina és la definició correcta de Cloud Computing segons el NIST?",
    opcions: [
        "A) Un model que permet l'accés sota demanda a un conjunt compartit de recursos computacionals configurables.",
        "B) Un programari instal·lat en un servidor local sense accés extern.",
        "C) Una xarxa de servidors privats exclusius per a grans corporacions.",
        "D) L'ús exclusiu d'emmagatzematge en dispositius USB a la xarxa."
    ],
    respostaCorrecta: 0, // Índex de la resposta correcta (començant per 0)
    justificacio: "El NIST defineix el Cloud Computing com un model per permetre l'accés de xarxa ubiquu, convenient i sota demanda a un conjunt compartit de recursos de computació configurables..."
}
```

---

## 📝 Llicència i Notes

Aquesta aplicació s'ha desenvolupat com a eina acadèmica i de suport per a l'estudi personal. Les preguntes estan inspirades en les competències i conceptes clau que se solen avaluar en els perfils de sistemes en el núvol (Cloud) de les administracions públiques.

