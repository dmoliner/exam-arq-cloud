let examen = [];
let indexActual = 0;
let respostes = new Array(50).fill(null);
let respostesCorrectesArray = new Array(50).fill(false);
let currentMode = ''; // 'test' o 'flashcard'

let darrerSyncTimestamp = 0;
let isSyncing = false;

// Funció per desar l'estat actual al servidor
async function desarEstatSessio() {
    if (examen.length === 0 || isSyncing) return; // No hi ha cap test actiu per desar o s'està sincronitzant des del servidor
    
    darrerSyncTimestamp = Date.now();
    try {
        await fetch('/api/sync-state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                examen,
                indexActual,
                respostes,
                respostesCorrectesArray,
                currentMode,
                timestamp: darrerSyncTimestamp
            })
        });
    } catch (e) {
        console.error("Error al desar l'estat de la sessió al servidor:", e);
    }
}

// Funció per esborrar l'estat al servidor quan es finalitza o es torna al menú
async function esborrarEstatSessio() {
    try {
        await fetch('/api/sync-state', {
            method: 'DELETE'
        });
    } catch (e) {
        console.error("Error al esborrar l'estat de la sessió:", e);
    }
}

// Funció per sincronitzar l'estat des del servidor
async function sincronitzarEstatServidor() {
    if (isSyncing) return;
    
    try {
        const sessioRes = await fetch('/api/session');
        const sessioData = await sessioRes.json();
        if (!sessioData.loggedIn || sessioData.role !== 'student') return; // Només sincronitzem si és estudiant loguejat
        
        const res = await fetch('/api/sync-state');
        if (res.status === 404) {
            // Si el servidor no té estat però nosaltres tenim un test o cas pràctic actiu en curs en local, és que s'ha esborrat des de l'altre costat. Tornem al menú.
            if (examen.length > 0) {
                tornarAlMenuSenseSincronitzar();
            }
            return;
        }
        
        if (res.ok) {
            const serverState = await res.json();
            
            // Si el servidor té un estat que és més recent que el nostre darrer desament local
            if (serverState.timestamp > darrerSyncTimestamp) {
                isSyncing = true;
                
                // Actualitzar variables globals locals
                examen = serverState.examen;
                indexActual = serverState.indexActual;
                respostes = serverState.respostes;
                respostesCorrectesArray = serverState.respostesCorrectesArray;
                currentMode = serverState.currentMode;
                darrerSyncTimestamp = serverState.timestamp;
                
                // Assegurar-nos que els contenidors de pantalla estiguin ben configurats
                document.getElementById('menu-container').classList.add('hidden');
                document.getElementById('quiz-container').classList.remove('hidden');
                document.getElementById('result-screen').classList.add('hidden');
                document.getElementById('progres-screen').classList.add('hidden');
                document.getElementById('quiz-title').innerText = currentMode === 'test' ? 'Tipus Test' : 'Cas Pràctic / Desenvolupament';
                
                // Carregar pregunta i reflectir l'estat a la interfície
                carregar();
                
                // Si ja hi ha una resposta desada per a la pregunta actual en test, tornar a pintar-la (marcar opcions, mostrar justificació)
                if (currentMode === 'test' && respostes[indexActual] !== null) {
                    const optionsContainer = document.getElementById('options-container');
                    const q = examen[indexActual];
                    const selectedIdx = respostes[indexActual];
                    
                    if (optionsContainer && optionsContainer.children.length > selectedIdx) {
                        const div = optionsContainer.children[selectedIdx];
                        const radio = div.querySelector('input[type="radio"]');
                        if (radio) radio.checked = true;
                        
                        const esCorrecte = (selectedIdx === q.respostaCorrecta);
                        div.classList.add(esCorrecte ? 'correct' : 'incorrect');
                        
                        if (!esCorrecte) {
                            optionsContainer.children[q.respostaCorrecta].classList.add('correct');
                            optionsContainer.children[q.respostaCorrecta].querySelector('input[type="radio"]').checked = true;
                        }
                        
                        document.getElementById('justificacio-text').innerText = q.justificacio;
                        document.getElementById('justificacio-container').classList.remove('hidden');
                        document.getElementById('justificacio-container').style.display = 'block';
                    }
                }
                
                isSyncing = false;
            }
        }
    } catch (e) {
        console.error("Error durant la sincronització de l'estat:", e);
    }
}

// Esdeveniment inicial al carregar el DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // Intentar sincronització inicial i activar interval de consulta periòdica (polling cada 4s)
    sincronitzarEstatServidor().then(() => {
        setInterval(sincronitzarEstatServidor, 4000);
    });

    
    // Comprovar estat de la sessió de l'usuari i rendiment condicional
    fetch('/api/session')
        .then(res => res.json())
        .then(data => {
            const profileBtn = document.querySelector('.btn-user-profile');
            const mainStatsSection = document.getElementById('main-stats-section');
            
            if (data.loggedIn) {
                if (data.role === 'student') {
                    // Revelar secció de rendiment i carregar dades per a l'estudiant
                    if (mainStatsSection) {
                        mainStatsSection.classList.remove('hidden');
                        carregarHistoricGlobal();
                    }
                    const menuRendimentBtn = document.getElementById('menu-rendiment-btn-wrapper');
                    if (menuRendimentBtn) {
                        menuRendimentBtn.classList.remove('hidden');
                    }
                    // Adaptar botó de perfil per a tancament de sessió directe
                    if (profileBtn) {
                        profileBtn.href = '/api/logout';
                        profileBtn.title = `Tancar Sessió (${data.username})`;
                        profileBtn.classList.add('logged-in');
                    }
                } else if (data.role === 'admin') {
                    // L'administrador manté ocult el panell principal però el seu botó s'adapta al seu espai privat
                    if (profileBtn) {
                        profileBtn.href = '/admin';
                        profileBtn.title = `Panell d'Admin (${data.username})`;
                        profileBtn.classList.add('logged-in');
                        profileBtn.style.background = '#e0f2fe';
                        profileBtn.style.borderColor = '#bae6fd';
                        profileBtn.style.color = '#0369a1';
                    }
                }
            } else {
                // Usuari anònim, per defecte la secció de gràfics es manté oculta
                if (mainStatsSection) {
                    mainStatsSection.classList.add('hidden');
                }
                const menuRendimentBtn = document.getElementById('menu-rendiment-btn-wrapper');
                if (menuRendimentBtn) {
                    menuRendimentBtn.classList.add('hidden');
                }
            }
        })
        .catch(err => {
            console.error("Error al comprovar la sessió de l'usuari:", err);
        });

    // Inicialitzar botons específics de Flashcard
    document.getElementById('btn-comprovar').onclick = () => {
        const q = examen[indexActual];
        const respostaUsuari = document.getElementById('user-answer').value || "";
        document.getElementById('user-answer').disabled = true;
        document.getElementById('btn-comprovar').classList.add('hidden');
        
        let textSolucio = q.justificacio;
        if (q.opcions && q.opcions.length > 0) {
            const textCorrecte = q.opcions[q.respostaCorrecta];
            textSolucio = `[La dada clau esperada era: ${textCorrecte}]\n\nExplicació tècnica: ${q.justificacio || 'Sense justificació afegida.'}`;
        }
        
        document.getElementById('justificacio-text').innerText = textSolucio || "Sense explicació afegida al JSON.";
        document.getElementById('justificacio-container').classList.remove('hidden');
        document.getElementById('justificacio-container').style.display = 'block';
        document.getElementById('self-assessment-container').classList.remove('hidden');

        // Petit verificador automàtic de paraules clau i conceptes encadenats (Strict Mode)
        try {
            const resultat = avaluarRespostaAutomatica(respostaUsuari, q.justificacio || "");
            const infoDiv = document.getElementById('verificador-automatic-info');
            
            if (respostaUsuari.trim().length < 5) {
                infoDiv.innerHTML = `🤖 <b>Verificador Automàtic:</b> La teva resposta és massa curta per ser avaluada automàticament. Si us plau, desenvolupa més la teva explicació tècnica.`;
                infoDiv.style.display = 'block';
            } else if (resultat.esCert) {
                const paraulesPintades = resultat.paraulesTrobades.map(p => p.charAt(0).toUpperCase() + p.slice(1));
                const conceptesPintats = resultat.conceptesEncadenats.map(c => c.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
                
                let htmlFeedback = `🤖 <b>Verificador Automàtic (Strict Mode):</b> S'ha validat la teva resposta!<br>`;
                if (conceptesPintats.length > 0) {
                    htmlFeedback += `✅ <b>Conceptes connectats detectats:</b> <i>${conceptesPintats.slice(0, 5).join(', ')}</i>.<br>`;
                }
                htmlFeedback += `🔑 <b>Paraules clau coincidents:</b> <i>${paraulesPintades.slice(0, 5).join(', ')}</i>.<br>`;
                htmlFeedback += `Recomanació: <b><span style="color:#10b981;">Encert</span></b>.`;
                
                infoDiv.innerHTML = htmlFeedback;
                infoDiv.style.display = 'block';
                
                // Efecte visual de feedback al botó recomanat
                const btnEncert = document.getElementById('btn-encert');
                btnEncert.style.transform = 'scale(1.05)';
                setTimeout(() => btnEncert.style.transform = 'scale(1)', 1000);
            } else {
                const paraulesPintades = resultat.paraulesTrobades.map(p => p.charAt(0).toUpperCase() + p.slice(1));
                const conceptesPintats = resultat.conceptesEncadenats.map(c => c.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
                
                let htmlFeedback = `🤖 <b>Verificador Automàtic (Strict Mode):</b> Resposta incompleta o manca de precisió en els conceptes clau.<br>`;
                if (paraulesPintades.length > 0) {
                    htmlFeedback += `🔑 <b>Paraules trobades:</b> <i>${paraulesPintades.slice(0, 5).join(', ')}</i> (mínim requerit: ${resultat.minimParaulesClau}).<br>`;
                }
                if (conceptesPintats.length > 0) {
                    htmlFeedback += `🔗 <b>Conceptes detectats:</b> <i>${conceptesPintats.slice(0, 4).join(', ')}</i>.<br>`;
                } else if (resultat.minimConceptes > 0) {
                    htmlFeedback += `⚠️ <b>Consell tècnic:</b> Intenta connectar millor els conceptes o fer referència específica als serveis oficials i mètodes d'alta disponibilitat/seguretat demanats.<br>`;
                }
                htmlFeedback += `Recomanació: <b><span style="color:#f43f5e;">Error / Incompleta</span></b>.`;
                
                infoDiv.innerHTML = htmlFeedback;
                infoDiv.style.display = 'block';
                
                // Efecte visual de feedback al botó recomanat
                const btnError = document.getElementById('btn-error');
                btnError.style.transform = 'scale(1.05)';
                setTimeout(() => btnError.style.transform = 'scale(1)', 1000);
            }
        } catch (err) {
            console.error("Error al verificador automàtic", err);
        }
    };
    
    document.getElementById('btn-encert').onclick = () => registrarAvaluacioFlashcard(true);
    document.getElementById('btn-error').onclick = () => registrarAvaluacioFlashcard(false);

    // Detecció de doble pulsació de l'Intro (Enter) a la textarea per mostrar la solució automàticament
    let darrerEnterTime = 0;
    const userAnswerTextarea = document.getElementById('user-answer');
    if (userAnswerTextarea) {
        userAnswerTextarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const ara = Date.now();
                if (ara - darrerEnterTime < 400) {
                    e.preventDefault(); // Evita afegir el segon salt de línia a la textarea
                    const btnComprovar = document.getElementById('btn-comprovar');
                    if (btnComprovar && !btnComprovar.classList.contains('hidden')) {
                        btnComprovar.click();
                    }
                }
                darrerEnterTime = ara;
            }
        });
    }
});

// Funcions auxiliars per al Verificador Automàtic de Paraules Clau (Strict & Bigram Mode)
function normalitzarText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Treure accents
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ") // Treure puntuació (posant espai per no ajuntar paraules)
        .replace(/\s+/g, " ")
        .trim();
}

function avaluarRespostaAutomatica(respostaUsuari, justificacioModel) {
    const textUsuari = normalitzarText(respostaUsuari);
    const textModel = normalitzarText(justificacioModel);
    
    // Paraules comunes catalanes, castellanes i de nexe a excloure
    const paraulesStop = new Set([
        'sobre', 'perque', 'ambdos', 'llarg', 'terme', 'durada', 'molts', 'altres', 'forma', 'manera',
        'estat', 'sense', 'completament', 'exclusivament', 'nostra', 'vostra', 'totes', 'tots', 'quals',
        'qualssevol', 'poden', 'mitjancant', 'utilitzant', 'aquet', 'aquella', 'aquelles', 'aquells',
        'primer', 'segon', 'tercer', 'correcte', 'incorrecte', 'nomes', 'molt', 'forca', 'quines', 'quins',
        'quines', 'quina', 'el', 'la', 'els', 'les', 'un', 'una', 'uns', 'unes', 'de', 'del', 'dels', 'a', 
        'al', 'als', 'per', 'com', 'que', 'en', 'amb', 'i', 'o', 'no', 'si', 'mes', 'pero', 'seus', 'seva', 
        'seves', 'seu', 'teu', 'teva', 'meu', 'meva', 'pel', 'pels', 'on', 'hi', 'ho', 'li', 'ens', 'us', 
        'em', 'et', 'es', 'sha', 'shan', 'ha', 'han', 'pot', 'ser', 'estar', 'saber', 'fer', 'veure', 'tenir',
        'diferents', 'aquesta', 'aquests', 'aquestes', 'cada', 'sota', 'contra', 'entre', 'durant', 'mentre'
    ]);
    
    // Conceptes clau cloud predefinits (normalitzats)
    const conceptesPredefinits = [
        "load balancer", "balancejador de carrega", "balancejador carrega",
        "active directory", "directori actiu",
        "storage account", "compte de emmagatzematge", "compte emmagatzematge",
        "virtual machine", "maquina virtual", "maquines virtuals",
        "traffic manager", "gestor de transit",
        "application gateway", "pasarel·la de aplicacio", "pasarela de aplicacio",
        "hub and spoke", "concentrador i raigs",
        "expressroute", "express route",
        "vpn gateway", "pasarel·la vpn", "pasarela vpn",
        "private link", "enllac privat",
        "private endpoint", "punt de extrem privat", "punt extrem privat", "punts de extrem privats",
        "sql database", "base de dades sql", "base dades sql",
        "key vault", "magatzem de claus",
        "cosmos db", "cosmos database",
        "availability zone", "zona de disponibilitat", "zones de disponibilitat",
        "disaster recovery", "recuperacio de desastres", "recuperacio davant desastres",
        "high availability", "alta disponibilitat",
        "network security group", "grup de seguretat de xarxa", "grup seguretat xarxa", "nsg",
        "route table", "taula de rutes", "taules de rutes",
        "virtual network", "xarxa virtual", "xarxes virtuals", "vnet",
        "resource group", "grup de recursos", "grups de recursos",
        "cognitive services", "serveis cognitius",
        "app service", "servei de aplicacions",
        "function app", "aplicacio de funcions", "aplicacio funcions",
        "api management", "gestio de apis",
        "event grid", "quadricula de esdeveniments",
        "event hubs", "concentradors de esdeveniments",
        "service bus", "bus de servei",
        "log analytics", "analisi de registres",
        "site recovery", "recuperacio de llocs",
        "ddos protection", "proteccio ddos",
        "firewall policy", "politica de cortafocs", "politica de firewall",
        "managed identity", "identitat gestionada", "identitats gestionades",
        "role based", "basat en rols",
        "access control", "control de acces",
        "rbac",
        "multi factor", "multifactor", "mfa"
    ];

    // 1. Detecció de conceptes cloud predefinits coincidents
    const conceptesPredefinitsTrobats = conceptesPredefinits.filter(concept => {
        return textModel.includes(concept) && textUsuari.includes(concept);
    });

    // 2. Extracció dinàmica de bigrames del model i detecció
    const paraulesModelOriginals = textModel.split(/\s+/).map(w => w.trim()).filter(w => w.length > 0);
    const bigramesModel = [];
    for (let i = 0; i < paraulesModelOriginals.length - 1; i++) {
        const w1 = paraulesModelOriginals[i];
        const w2 = paraulesModelOriginals[i + 1];
        
        // Un bigrama és vàlid si cap dels dos és stop-word i almenys un té >= 4 caràcters
        if (!paraulesStop.has(w1) && !paraulesStop.has(w2) && (w1.length >= 4 || w2.length >= 4)) {
            bigramesModel.push(`${w1} ${w2}`);
        }
    }
    const bigramesUnicsModel = [...new Set(bigramesModel)];
    const bigramesTrobats = bigramesUnicsModel.filter(bigrama => textUsuari.includes(bigrama));

    // Combinar tots els conceptes encadenats
    const totsConceptesEncadenats = [...new Set([...conceptesPredefinitsTrobats, ...bigramesTrobats])];

    // 3. Extracció de paraules clau individuals (>4 lletres i no comunes)
    const paraulesModel = textModel.split(/\s+/)
        .map(w => w.trim())
        .filter(w => w.length > 4 && !paraulesStop.has(w));
        
    const paraulesUniquesModel = [...new Set(paraulesModel)];
    const paraulesTrobades = paraulesUniquesModel.filter(paraula => textUsuari.includes(paraula));

    // --- CRITERIS STRICTS D'AVALUACIÓ ---
    // A) Paraules clau: Exigim almenys el 22% de coincidència global de paraules individuals I un mínim de 3 paraules clau (o el total de paraules si és curt)
    const minimParaulesClau = Math.min(3, paraulesUniquesModel.length);
    const taxaCoincidenciaParaules = paraulesUniquesModel.length > 0 ? (paraulesTrobades.length / paraulesUniquesModel.length) : 0;
    const compleixParaulesClau = paraulesTrobades.length >= minimParaulesClau && taxaCoincidenciaParaules >= 0.22;

    // B) Conceptes encadenats: Si el model té bigrames o conceptes predefinits, exigim que almenys en tingui 1 (o 2 si és un model llarg i complex de >4 conceptes)
    const conceptesDelModel = [...new Set([
        ...conceptesPredefinits.filter(c => textModel.includes(c)),
        ...bigramesUnicsModel
    ])];
    
    let compleixConceptesEncadenats = true;
    let minimConceptes = 0;
    if (conceptesDelModel.length > 0) {
        minimConceptes = conceptesDelModel.length >= 4 ? 2 : 1;
        compleixConceptesEncadenats = totsConceptesEncadenats.length >= minimConceptes;
    }

    const esCert = compleixParaulesClau && compleixConceptesEncadenats;

    return {
        esCert: esCert,
        paraulesTrobades: paraulesTrobades,
        conceptesEncadenats: totsConceptesEncadenats,
        minimParaulesClau: minimParaulesClau,
        minimConceptes: minimConceptes
    };
}



// Funció per escollir el mode des del menú
async function iniciarMode(mode) {
    currentMode = mode;
    document.getElementById('menu-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    
    // Configurar títols segons el mode
    document.getElementById('quiz-title').innerText = mode === 'test' ? 'Tipus Test' : 'Cas Pràctic / Desenvolupament';
    
    await inicialitzarExamen();
    await desarEstatSessio(); // Desar estat immediatament en iniciar
}

function tornarAlMenu() {
    tornarAlMenuSenseSincronitzar();
    esborrarEstatSessio(); // Esborrar estat del servidor de manera activa
}

function tornarAlMenuSenseSincronitzar() {
    examen = [];
    indexActual = 0;
    respostes = new Array(50).fill(null);
    respostesCorrectesArray = new Array(50).fill(false);
    
    document.getElementById('menu-container').classList.remove('hidden');
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('progres-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
}


function registrarAvaluacioFlashcard(esCorrecte) {
    respostes[indexActual] = document.getElementById('user-answer').value || "(Resposta en blanc)";
    respostesCorrectesArray[indexActual] = esCorrecte;
    
    // Actualitzar progrés visual de la barra superior
    const percentatge = ((indexActual + 1) / examen.length) * 100;
    document.getElementById('progress-bar-fill').style.width = `${percentatge}%`;

    // Avançar directament a la següent pregunta sense passar pel botó "Següent"
    if (indexActual < examen.length - 1) {
        indexActual++;
        carregar();
        desarEstatSessio(); // Desar l'estat del progrés actiu
    } else {
        mostrarResultats();
    }
}

// Funció per carregar de forma asíncrona les preguntes del fitxer JSON i inicialitzar el test
async function inicialitzarExamen() {
    try {
        const fitxer = currentMode === 'test' ? 'preguntes.json' : 'preguntes-caspractic.json';
        const response = await fetch(fitxer);
        if (!response.ok) throw new Error("No s'ha pogut descarregar el catàleg de preguntes");
        const testPreguntes = await response.json();
        
        // Comprovar si l'usuari és públic (anònim) o autenticat per limitar les preguntes
        let limitPreguntes = 5; // Per defecte per al simulador públic
        try {
            const sessioRes = await fetch('/api/session');
            const sessioData = await sessioRes.json();
            if (sessioData.loggedIn && (sessioData.role === 'student' || sessioData.role === 'admin')) {
                limitPreguntes = 50; // Usuari autenticat
            }
        } catch (sessioErr) {
            console.warn("No s'ha pogut comprovar la sessió, limitant a mode públic (5 preguntes):", sessioErr);
        }

        // Triar fins al límit de preguntes aleatòries (o menys si el fitxer en té menys)
        examen = [...testPreguntes].sort(() => 0.5 - Math.random());
        if (examen.length === 0) {
            throw new Error("No s'ha trobat cap pregunta al catàleg del servidor. Comprova que hagis carregat correctament els fitxers .json a l'Azure Blob Storage de destí (o al disc local).");
        }
        const totalAprovades = Math.min(examen.length, limitPreguntes);
        examen = examen.slice(0, totalAprovades);
        
        respostes = new Array(examen.length).fill(null);
        respostesCorrectesArray = new Array(examen.length).fill(false);
        indexActual = 0;
 
        // Alternar/barrejar l'ordre de les possibles respostes en iniciar si estem en mode test
        if (currentMode === 'test') {
            examen.forEach(q => {
                if (q.opcions && q.opcions.length > 0) {
                    const textCorrecte = q.opcions[q.respostaCorrecta];
                    q.opcions = q.opcions
                        .map(v => ({ v, r: Math.random() }))
                        .sort((a, b) => a.r - b.r)
                        .map(x => x.v);
                    q.respostaCorrecta = q.opcions.indexOf(textCorrecte);
                }
            });
        }
 
        carregar();
    } catch (e) {
        console.error("Error carregant les preguntes:", e);
        document.getElementById('question-text').innerText = "⚠️ Error al simulador: " + e.message;
    }
}

// Funcions de gestió d'històric mitjançant API REST al Servidor (global)
async function obtenirStatsDiaries() {
    try {
        const response = await fetch('/api/stats');
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        console.error("Error al obtenir stats del servidor", e);
    }
    return {}; // Diccionari buit per defecte en cas d'error o no trobat
}

async function desarStatsDiaries(stats) {
    try {
        await fetch('/api/stats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stats)
        });
    } catch (e) {
        console.error("Error al desar stats al servidor", e);
    }
}

function dibuixarDiari(canvasId, stats) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    let instanceKey;
    if (canvasId === 'historicChartProgres') {
        instanceKey = 'historicChartProgresInstance';
    } else if (canvasId === 'historicChartFinal') {
        instanceKey = 'historicChartFinalInstance';
    } else {
        instanceKey = 'historicChartMenuInstance';
    }
    if (window[instanceKey]) window[instanceKey].destroy();
    
    const datesOrdenades = [];
    const avui = new Date();
    for (let i = 7; i >= 0; i--) {
        const d = new Date();
        d.setDate(avui.getDate() - i);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        datesOrdenades.push(`${yyyy}-${mm}-${dd}`);
    }
    
    // Convertim dates "YYYY-MM-DD" a format "DD/M" (ex: 23/5)
    const labels = datesOrdenades.map(d => {
        const parts = d.split('-');
        return `${parseInt(parts[2], 10)}/${parseInt(parts[1], 10)}`;
    });
    
    // Dades per al gràfic
    const dadesPercentatge = datesOrdenades.map(d => {
        const dayStats = stats[d];
        if (!dayStats) return 0;
        return dayStats.preguntesTotals > 0 ? (dayStats.encertsTotals / dayStats.preguntesTotals) * 100 : 0;
    });
    
    const dadesProves = datesOrdenades.map(d => stats[d] ? stats[d].provesFetes : 0);
    
    window[instanceKey] = new Chart(ctx, {
        type: 'bar', // Tipus de base
        data: {
            labels: labels,
            datasets: [
                {
                    type: 'line', // Línia per a proves fetes
                    label: 'Proves Fetes',
                    data: dadesProves,
                    borderColor: '#2563eb', // Blau elèctric
                    borderWidth: 2,
                    borderDash: [5, 5], // Línia de punts/traços
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 1.5,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: false,
                    yAxisID: 'yProves' // Eix Y de la dreta
                },
                {
                    type: 'bar', // Barres per a encerts (%)
                    label: 'Encerts (%)',
                    data: dadesPercentatge,
                    backgroundColor: '#10b981', // Verd maragda
                    borderColor: '#ffffff',
                    borderWidth: 1.5,
                    borderRadius: 4,
                    yAxisID: 'y', // Eix Y de l'esquerra
                    barThickness: 24 // Fes que la barra d'encerts no sigui tant gruixuda
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#475569',
                        font: {
                            family: "'Outfit', sans-serif",
                            size: 11,
                            weight: '600'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: { family: 'Outfit', size: 12, weight: 'bold' },
                    bodyFont: { family: 'Outfit', size: 12 },
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.dataset.type === 'line') {
                                label += context.parsed.y + ' ' + (context.parsed.y === 1 ? 'prova' : 'proves');
                            } else {
                                label += Math.round(context.parsed.y) + '%';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#475569',
                        font: {
                            family: "'Outfit', sans-serif",
                            weight: '600'
                        }
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    min: 0,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#475569',
                        font: {
                            family: "'Outfit', sans-serif",
                            weight: '600',
                            size: 10
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Encerts (%)',
                        color: '#10b981',
                        font: {
                            family: "'Outfit', sans-serif",
                            size: 12,
                            weight: '700'
                        }
                    }
                },
                yProves: {
                    type: 'linear',
                    position: 'right',
                    min: 0,
                    display: true, // Eix secundari visible perquè es llegeixi el nombre de proves realitzades
                    ticks: {
                        color: '#475569',
                        font: {
                            family: "'Outfit', sans-serif",
                            weight: '600',
                            size: 10
                        },
                        stepSize: 1,
                        precision: 0
                    },
                    title: {
                        display: true,
                        text: 'nº de proves',
                        color: '#2563eb', // Color blau a joc amb la línia discontínua
                        rotation: -90, // Gira el títol perquè es llegeixi de baix a dalt
                        font: {
                            family: "'Outfit', sans-serif",
                            size: 12,
                            weight: '700'
                        }
                    },
                    grid: {
                        drawOnChartArea: false // Evita interferències de línies de quadrícula
                    }
                }
            }
        }
    });
}

async function novaProva() {
    location.reload();
}

function dibuixar(canvasId, encerts, total) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    // Si el gràfic ja existeix, el destruim per poder dibuixar-lo de nou
    if (window.chartInstance) window.chartInstance.destroy();
    
    // Configurar estils de Chart.js per a la temàtica clara (blanc trencat)
    Chart.defaults.color = '#475569';
    Chart.defaults.font.family = "'Outfit', sans-serif";
    
    window.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: { 
            labels: ['Encerts', 'Errors'], 
            datasets: [{ 
                data: [encerts, total - encerts], 
                backgroundColor: ['#10b981', '#f43f5e'],
                borderColor: '#ffffff', // Coincideix amb el color de fons blanc del contenidor
                borderWidth: 3
            }] 
        },
        options: { 
            cutout: '75%', 
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#0284c7',
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        padding: 16,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
}

function dibuixarBarres(canvasId, estadistiques) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const instanceKey = canvasId === 'barChartTemes' ? 'barChartProgresInstance' : 'barChartFinalInstance';
    if (window[instanceKey]) window[instanceKey].destroy();
    
    const temes = Object.keys(estadistiques).sort();
    
    // Calcular percentatges
    const dadesEncerts = temes.map(t => {
        const total = estadistiques[t].encerts + estadistiques[t].errors;
        return total > 0 ? (estadistiques[t].encerts / total) * 100 : 0;
    });
    const dadesErrors = temes.map(t => {
        const total = estadistiques[t].encerts + estadistiques[t].errors;
        return total > 0 ? (estadistiques[t].errors / total) * 100 : 0;
    });
    
    window[instanceKey] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: temes,
            datasets: [
                {
                    label: 'Encerts',
                    data: dadesEncerts,
                    backgroundColor: '#10b981',
                    borderColor: '#ffffff',
                    borderWidth: 1.5
                },
                {
                    label: 'Errors',
                    data: dadesErrors,
                    backgroundColor: '#f43f5e',
                    borderColor: '#ffffff',
                    borderWidth: 1.5
                }
            ]
        },
        plugins: [
            {
                id: 'percentatgesTextPlugin',
                afterDatasetsDraw(chart) {
                    const { ctx } = chart;
                    chart.data.datasets.forEach((dataset, i) => {
                        const meta = chart.getDatasetMeta(i);
                        meta.data.forEach((bar, index) => {
                            const percentatge = dataset.data[index];
                            
                            // 1. Dibuixar el títol del tema a sobre de la barra (només un cop per fila)
                            if (i === 0) {
                                ctx.save();
                                ctx.fillStyle = '#334155'; // Slate 700 per a gran llegibilitat
                                ctx.font = 'bold 13px Outfit, sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'bottom';
                                const xStart = chart.chartArea.left;
                                const yPos = bar.y - (bar.height / 2) - 3;
                                ctx.fillText(chart.data.labels[index], xStart, yPos);
                                ctx.restore();
                            }
                            
                            // 2. Dibuixar el text de percentatge si el segment és visible
                            if (percentatge > 0) {
                                ctx.save();
                                ctx.fillStyle = '#ffffff';
                                ctx.font = 'bold 10px Outfit, sans-serif';
                                ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
                                ctx.shadowBlur = 2;
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                const xCenter = bar.x - (bar.width / 2);
                                const yCenter = bar.y;
                                if (bar.width > 28) {
                                    ctx.fillText(`${Math.round(percentatge)}%`, xCenter, yCenter);
                                }
                                ctx.restore();
                            }
                        });
                    });
                }
            }
        ],
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            categoryPercentage: 0.85,
            barPercentage: 0.55,
            plugins: {
                legend: {
                    display: false // Treure la llegenda
                }
            },
            scales: {
                x: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#475569',
                        font: {
                            family: "'Outfit', sans-serif",
                            size: 10 // Mida reduïda per a un disseny compacte dels percentatges
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    stacked: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: false // Amaga completament els textos de l'eix Y (sense llegenda al costat)
                    }
                }
            }
        }
    });
}

async function mostrarProgres() {
    const encerts = respostesCorrectesArray.filter(v => v).length;
    const respostesDonades = respostes.filter(v => v !== null).length;
    
    if (respostesDonades === 0) return alert("Encara no has respost cap pregunta.");
    
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('progres-screen').classList.remove('hidden');
    document.getElementById('progres-screen').style.display = 'block';
    dibuixar('donutChartProgres', encerts, respostesDonades);
    
    // Calcular estadístiques per temes
    const estadistiquesTemes = {};
    respostes.forEach((resp, idx) => {
        if (resp !== null) {
            const q = examen[idx];
            const tema = q.tema || "Altres";
            if (!estadistiquesTemes[tema]) {
                estadistiquesTemes[tema] = { encerts: 0, errors: 0 };
            }
            if (respostesCorrectesArray[idx]) {
                estadistiquesTemes[tema].encerts++;
            } else {
                estadistiquesTemes[tema].errors++;
            }
        }
    });
    dibuixarBarres('barChartTemes', estadistiquesTemes);
    
    // Mostrar històric general
    const stats = await obtenirStatsDiaries();
    const dates = Object.keys(stats);
    if (dates.length === 0) {
        document.getElementById('diari-buit-progres').style.display = 'block';
        document.getElementById('diari-grafic-wrapper-progres').style.display = 'none';
    } else {
        document.getElementById('diari-buit-progres').style.display = 'none';
        document.getElementById('diari-grafic-wrapper-progres').style.display = 'flex';
        dibuixarDiari('historicChartProgres', stats);
        
        let totalProves = 0;
        let totalEncerts = 0;
        let totalPreguntes = 0;
        dates.forEach(d => {
            totalProves += stats[d].provesFetes;
            totalEncerts += stats[d].encertsTotals;
            totalPreguntes += stats[d].preguntesTotals;
        });
        
        const percentatgeGlobal = totalPreguntes > 0 ? ((totalEncerts / totalPreguntes) * 100).toFixed(1) : 0;
        document.getElementById('proves-fetes-text-progres').innerHTML = `<b>${totalProves}</b> ${totalProves === 1 ? 'prova feta' : 'proves fetes'} &nbsp;|&nbsp; Mitjana: <b>${percentatgeGlobal}% encerts</b>`;
    }
}

function carregar() {
    const q = examen[indexActual];
    
    // Progrés text i barra superior
    const progressText = `Pregunta ${indexActual + 1} de ${examen.length}`;
    document.getElementById('progress-text').innerText = progressText;
    const percentatge = ((indexActual) / examen.length) * 100;
    document.getElementById('progress-bar-fill').style.width = `${percentatge}%`;
    
    // Netejar el número inicial de la pregunta per estètica
    const textNet = q.pregunta.replace(/^\d+\.\s*/, '');
    document.getElementById('question-text').innerText = textNet;
    
    document.getElementById('justificacio-container').classList.add('hidden');
    document.getElementById('justificacio-container').style.display = 'none';
    document.getElementById('self-assessment-container').classList.add('hidden');
    document.getElementById('verificador-automatic-info').style.display = 'none';
    
    if (currentMode === 'test') {
        document.getElementById('options-container').classList.remove('hidden');
        document.getElementById('text-answer-container').classList.add('hidden');
        document.getElementById('btn-seguent').classList.remove('hidden');
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        if (q.opcions && q.opcions.length > 0) {
            q.opcions.forEach((opt, i) => {
                const div = document.createElement('div');
                div.className = 'option';
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'pregunta-opcions';
                radio.className = 'option-radio';
                radio.id = `opt-${i}`;
                
                const labelSpan = document.createElement('span');
                labelSpan.className = 'option-text';
                const netText = opt.replace(/^[a-d]\)\s*/i, '');
                labelSpan.innerText = netText;
                
                div.appendChild(radio);
                div.appendChild(labelSpan);
                
                div.onclick = () => {
                    if (respostes[indexActual] !== null) return;
                    respostes[indexActual] = i;
                    radio.checked = true; // Marcar el radio-button seleccionat
                    
                    const esCorrecte = (i === q.respostaCorrecta);
                    respostesCorrectesArray[indexActual] = esCorrecte;
                    div.classList.add(esCorrecte ? 'correct' : 'incorrect');
                    
                    if (!esCorrecte) {
                        optionsContainer.children[q.respostaCorrecta].classList.add('correct');
                        optionsContainer.children[q.respostaCorrecta].querySelector('input[type="radio"]').checked = true;
                    }
                    
                    document.getElementById('justificacio-text').innerText = q.justificacio;
                    document.getElementById('justificacio-container').classList.remove('hidden');
                    document.getElementById('justificacio-container').style.display = 'block';
                    
                    // Actualitzar progrés de barra en marcar
                    const pctMarcat = ((indexActual + 1) / examen.length) * 100;
                    document.getElementById('progress-bar-fill').style.width = `${pctMarcat}%`;
                    
                    desarEstatSessio(); // Desar estat immediatament en respondre
                };
                optionsContainer.appendChild(div);
            });
        }
    } else {
        document.getElementById('options-container').classList.add('hidden');
        document.getElementById('text-answer-container').classList.remove('hidden');
        document.getElementById('btn-comprovar').classList.remove('hidden');
        document.getElementById('btn-seguent').classList.add('hidden');
        
        const textarea = document.getElementById('user-answer');
        textarea.value = '';
        textarea.disabled = false;
        textarea.focus();
    }
}

document.getElementById('btn-seguent').onclick = () => {
    if (respostes[indexActual] === null) return alert("Has de seleccionar una resposta.");
    if (indexActual < examen.length - 1) { 
        indexActual++; 
        carregar(); 
        desarEstatSessio(); // Desar estat en passar a la següent pregunta
    }
    else { mostrarResultats(); }
};

async function mostrarResultats() {
    const encerts = respostesCorrectesArray.filter(v => v).length;
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('progres-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('final-score').innerHTML = `Nota Final: <b>${((encerts / examen.length) * 10).toFixed(2)} / 10</b>`;
    dibuixar('donutChartFinal', encerts, examen.length);
    
    esborrarEstatSessio(); // El test ha finalitzat, esborrem l'estat actiu del servidor
    
    // Desa automàticament les estadístiques al servidor al finalitzar el test (només si l'usuari està autenticat)
    try {
        const sessioRes = await fetch('/api/session');
        const sessioData = await sessioRes.json();
        
        if (sessioData.loggedIn && (sessioData.role === 'student' || sessioData.role === 'admin')) {
            const stats = await obtenirStatsDiaries();
            // Obtenir data local en format YYYY-MM-DD
            const avuiObj = new Date();
            const yyyy = avuiObj.getFullYear();
            const mm = String(avuiObj.getMonth() + 1).padStart(2, '0');
            const dd = String(avuiObj.getDate()).padStart(2, '0');
            const avui = `${yyyy}-${mm}-${dd}`;
            
            if (!stats[avui]) {
                stats[avui] = {
                    provesFetes: 0,
                    encertsTotals: 0,
                    preguntesTotals: 0
                };
            }
            stats[avui].provesFetes += 1;
            stats[avui].encertsTotals += encerts;
            stats[avui].preguntesTotals += examen.length;
            
            await desarStatsDiaries(stats);
        }
    } catch (e) {
        console.error("Error al desar les estadístiques automàticament:", e);
    }
    
    // Calcular estadístiques per temes
    const estadistiquesTemes = {};
    respostes.forEach((resp, idx) => {
        if (resp !== null) {
            const q = examen[idx];
            const tema = q.tema || "Altres";
            if (!estadistiquesTemes[tema]) {
                estadistiquesTemes[tema] = { encerts: 0, errors: 0 };
            }
            if (respostesCorrectesArray[idx]) {
                estadistiquesTemes[tema].encerts++;
            } else {
                estadistiquesTemes[tema].errors++;
            }
        }
    });
    dibuixarBarres('barChartFinalTemes', estadistiquesTemes);
    
    // Mostrar històric general
    const stats = await obtenirStatsDiaries();
    const dates = Object.keys(stats);
    if (dates.length === 0) {
        document.getElementById('diari-buit-final').style.display = 'block';
        document.getElementById('diari-grafic-wrapper-final').style.display = 'none';
    } else {
        document.getElementById('diari-buit-final').style.display = 'none';
        document.getElementById('diari-grafic-wrapper-final').style.display = 'flex';
        dibuixarDiari('historicChartFinal', stats);
        
        let totalProves = 0;
        let totalEncerts = 0;
        let totalPreguntes = 0;
        dates.forEach(d => {
            totalProves += stats[d].provesFetes;
            totalEncerts += stats[d].encertsTotals;
            totalPreguntes += stats[d].preguntesTotals;
        });
        
        const percentatgeGlobal = totalPreguntes > 0 ? ((totalEncerts / totalPreguntes) * 100).toFixed(1) : 0;
        document.getElementById('proves-fetes-text-final').innerHTML = `<b>${totalProves}</b> ${totalProves === 1 ? 'prova feta' : 'proves fetes'} &nbsp;|&nbsp; Mitjana: <b>${percentatgeGlobal}% encerts</b>`;
    }
}

// Funció per carregar i dibuixar l'històric global en el menú principal (visible només per a user1)
async function carregarHistoricGlobal() {
    const stats = await obtenirStatsDiaries();
    const dates = Object.keys(stats);
    if (dates.length === 0) {
        document.getElementById('diari-buit-menu').style.display = 'block';
        document.getElementById('diari-grafic-wrapper-menu').style.display = 'none';
    } else {
        document.getElementById('diari-buit-menu').style.display = 'none';
        document.getElementById('diari-grafic-wrapper-menu').style.display = 'flex';
        dibuixarDiari('historicChartMenu', stats);
        
        let totalProves = 0;
        let totalEncerts = 0;
        let totalPreguntes = 0;
        dates.forEach(d => {
            totalProves += stats[d].provesFetes;
            totalEncerts += stats[d].encertsTotals;
            totalPreguntes += stats[d].preguntesTotals;
        });
        
        const percentatgeGlobal = totalPreguntes > 0 ? ((totalEncerts / totalPreguntes) * 100).toFixed(1) : 0;
        document.getElementById('proves-fetes-text-menu').innerHTML = `<b>${totalProves}</b> ${totalProves === 1 ? 'prova feta' : 'proves fetes'} &nbsp;|&nbsp; Mitjana: <b>${percentatgeGlobal}% encerts</b>`;
    }
}

// A punt per a la interacció de l'usuari des del menú principal