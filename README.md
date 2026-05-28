# Simulador de Proves per al Perfil d'Arquitecte Cloud

Aquesta és una aplicació web avançada (WebApp) desenvolupada en Node.js i Express per a la preparació de les proves teoricopràctiques d'arquitectura Cloud de la Borsa de la Diputació de Barcelona. Permet als candidats posar a prova els seus coneixements en serveis Cloud (especialment Microsoft Azure), dissenyar arquitectures ubiquitzades i analitzar el seu progrés mitjançant mètriques interactives.

---

## 🚀 Característiques Principals i Noves Modificacions

* **Simulacres d'Examen Aleatoris**: Genera automàticament proves úniques de 50 preguntes seleccionades de forma aleatòria del banc de preguntes (`preguntes.json`), barrejan l'ordre de les possibles respostes per a un repàs eficient.
* **Sistema d'Avaluació de Respostes (Strict Mode)**: Permet autoavaluar casos pràctics mitjançant un **Verificador Automàtic intel·ligent** de conceptes encadenats i paraules clau cloud en Català, garantint un rigor acadèmic estricte.
* **Base de Dades Segura de Dos Usuaris (Azure Ready)**:
  * **Administrador**: Identificat per la variable d'entorn `user_admin` i contrasenya `pass_admin`. Dóna accés al panell avançat de gestió de preguntes (`/admin`).
  * **Estudiant (`user1`)**: Identificat per la variable `user1` i contrasenya `pass_user1`. Dóna accés al simulador i a la revelació dinàmica de mètriques d'estudi.
* **Seguretat Reforçada (Zero Hardcoding)**: S'han eliminat completament les contrasenyes per defecte del fitxer de codi font. L'aplicació només validarà els accessos si estan definides les variables d'entorn a la instància d'Azure.
* **Rendiment Global Públic Condicional (Màxima Privadesa)**:
  * Per defecte, cap visitant anònim pot veure les estadístiques ni els gràfics a la pàgina d'inici per mantenir la privadesa dels resultats.
  * Un cop l'estudiant (`user1`) inicia la seva sessió de forma segura, es revela dinàmicament la secció de rendiment a la pàgina principal carregant el gràfic de línia i barres de doble eix (`historicChartMenu`).
* **Interfície Responsive i Centrada Premium**:
  * Es reestructura tot el cos del tauler de rendiment per a dispositius mòbils, forçant un flux vertical pur on totes les targetes (`.stat-card` i `.q-item-card`) s'apilen de manera impecable una a sota de les altres.
  * S'incorpora un límit d'amplada de **`1200px`** i centrat automàtic que genera uns marges simètrics elegants a l'esquerra i a la dreta en pantalles de sobretaula grans, mantenint el fons homogeni `#f8fafc`.
* **Protecció de Rutes amb Middleware**: Les rutes `/admin` i `/rendiment` estan protegides al servidor amb els corresponents *middlewares* de sessió HTTP-Only (`requireAdmin` i `requireStudent`), redirigint immediatament a la pantalla de `/login` si es detecta un accés no autoritzat.
* **Icona de Perfil i Tancament de Sessió en Viu**: Una icona superior dreta s'il·lumina en verd maragda quan la sessió està activa, i canvia a vermell brillant amb hover, actuant com a botó de tancament de sessió directe (`/api/logout`).

---

## 📁 Estructura del Projecte

```text
Temari_webAPP/
├── server.js                 # Servidor backend Express amb middlewares de sessió i rutes protegides.
├── index.html                # Interfície d'usuari del simulador amb la secció de rendiment oculta.
├── login.html                # Pantalla d'accés unificat per a estudiant i administrador.
├── admin.html                # Panell d'administració privat per crear/eliminar preguntes en viu.
├── rendiment.html            # Tauler personalitzat responsive del progrés d'estudi de user1.
├── styles.css                # Full d'estils general amb variables CSS, media queries a 1024px i centrat a 1200px.
├── app.js                    # Lògica frontend amb avaluació asíncrona de sessió i gràfics de Chart.js.
├── preguntes.json            # Base de dades local de preguntes tipus test.
├── preguntes-caspractic.json # Base de dades de preguntes tipus cas pràctic (desenvolupament).
├── stats.json                # Històric persistent d'estudi dia a dia generat de forma dinàmica.
└── package.json              # Dependències i comandaments d'execució del projecte.
```

---

## ⚙️ Com Començar

### Opció 1: Execució Local de Desenvolupament (Preproducció)

Per provar l'aplicació en local (port per defecte: **`3001`** a preproducció) sense hardcodejar cap contrasenya al codi font, pots obrir el teu terminal de **PowerShell** i executar la següent línia de comandes (que defineix les variables d'entorn temporalment només en memòria):

```powershell
$env:user_admin="admin"; $env:pass_admin="admin123"; $env:user1="user1"; $env:pass_user1="user123"; npm start
```

Un cop engegat, obre el teu navegador i accedeix a:
👉 [http://localhost:3001](http://localhost:3001)

### Opció 2: Execució a Producció (Branca `main`)

La branca `main` utilitza el port **`3000`** de manera local. Per iniciar-la amb les credencials del simulador:

```powershell
$env:user_admin="admin"; $env:pass_admin="admin123"; $env:user1="user1"; $env:pass_user1="user123"; $env:PORT=3000; node server.js
```

Obre el teu navegador i accedeix a:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🔒 Variables d'Entorn Requerides (Azure WebApp)

Per al correcte funcionament de l'aplicació un cop estigui desplegada a l'entorn de Microsoft Azure, recorda configurar les següents claus dins dels *Configuration Settings* de la teva App Service:

| Variable | Descripció | Valor Exemple |
| :--- | :--- | :--- |
| `user_admin` | Nom d'usuari de l'administrador | `admin` |
| `pass_admin` | Contrasenya del perfil d'administrador | `admin123` |
| `user1` | Nom d'usuari de l'estudiant | `user1` |
| `pass_user1` | Contrasenya del perfil de l'estudiant | `user123` |

---

## 📝 Llicència i Notes d'Estudi

Aquest simulador s'ha creat amb finalitats acadèmiques com a suport integral per a la superació de les oposicions de perfils tècnics d'arquitectura de sistemes Cloud a l'administració pública catalana. Les millores de disseny apliquen patrons harmonitzats premium en colors HSL, tipografies modernes i fluxos de dades completament asíncrons.
