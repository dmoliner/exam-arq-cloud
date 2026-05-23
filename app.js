let examen = [];
let indexActual = 0;
let respostes = new Array(50).fill(null);
let respostesCorrectesArray = new Array(50).fill(false);

// Funció per carregar de forma asíncrona les preguntes del fitxer JSON i inicialitzar el test
async function inicialitzarExamen() {
    try {
        const response = await fetch('preguntes.json');
        if (!response.ok) throw new Error("No s'ha pogut descarregar el catàleg de preguntes");
        const testPreguntes = await response.json();
        
        // Triar 50 preguntes aleatòries
        examen = [...testPreguntes].sort(() => 0.5 - Math.random()).slice(0, 50);

        // Alternar/barrejar l'ordre de les possibles respostes de cada pregunta en iniciar el test
        examen.forEach(q => {
            const textCorrecte = q.opcions[q.respostaCorrecta];
            // Barreja aleatòria de les opcions de la pregunta
            q.opcions = q.opcions
                .map(v => ({ v, r: Math.random() }))
                .sort((a, b) => a.r - b.r)
                .map(x => x.v);
            // Re-calcular el nou índex de la resposta correcta
            q.respostaCorrecta = q.opcions.indexOf(textCorrecte);
        });

        carregar();
    } catch (e) {
        console.error("Error carregant les preguntes:", e);
        document.getElementById('question-text').innerText = "Error en carregar les preguntes del simulador. Si us plau, recarrega la pàgina per tornar-ho a provar.";
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
    const instanceKey = canvasId === 'historicChartProgres' ? 'historicChartProgresInstance' : 'historicChartFinalInstance';
    if (window[instanceKey]) window[instanceKey].destroy();
    
    const datesOrdenades = Object.keys(stats).sort();
    if (datesOrdenades.length === 0) return;
    
    // Convertim dates "YYYY-MM-DD" a format "DD/M" (ex: 23/5)
    const labels = datesOrdenades.map(d => {
        const parts = d.split('-');
        return `${parseInt(parts[2], 10)}/${parseInt(parts[1], 10)}`;
    });
    
    // Dades per al gràfic
    const dadesPercentatge = datesOrdenades.map(d => {
        const dayStats = stats[d];
        return dayStats.preguntesTotals > 0 ? (dayStats.encertsTotals / dayStats.preguntesTotals) * 100 : 0;
    });
    
    const dadesProves = datesOrdenades.map(d => stats[d].provesFetes);
    
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
    const stats = await obtenirStatsDiaries();
    const avui = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    
    if (!stats[avui]) {
        stats[avui] = {
            provesFetes: 0,
            encertsTotals: 0,
            preguntesTotals: 0
        };
    }
    
    const encerts = respostesCorrectesArray.filter(v => v).length;
    stats[avui].provesFetes += 1;
    stats[avui].encertsTotals += encerts;
    stats[avui].preguntesTotals += 50;
    
    await desarStatsDiaries(stats);
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
    
    document.getElementById('quiz-container').style.display = 'none';
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
    document.getElementById('progress').innerText = `Pregunta ${indexActual + 1} de 50`;
    const textNet = q.pregunta.substring(q.pregunta.indexOf('.') + 2);
    document.getElementById('question-text').innerText = textNet;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    document.getElementById('justificacio-container').style.display = 'none';
    
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
                // També cal marcar el radio-button de la resposta correcta
                optionsContainer.children[q.respostaCorrecta].querySelector('input[type="radio"]').checked = true;
            }
            
            document.getElementById('justificacio-text').innerText = q.justificacio;
            document.getElementById('justificacio-container').style.display = 'block';
        };
        optionsContainer.appendChild(div);
    });
}

document.getElementById('btn-seguent').onclick = () => {
    if (respostes[indexActual] === null) return alert("Has de seleccionar una resposta.");
    if (indexActual < 49) { indexActual++; carregar(); }
    else { mostrarResultats(); }
};

async function mostrarResultats() {
    const encerts = respostesCorrectesArray.filter(v => v).length;
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('progres-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('final-score').innerHTML = `Nota Final: <b>${((encerts / 50) * 10).toFixed(2)} / 10</b>`;
    dibuixar('donutChartFinal', encerts, 50);
    
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

inicialitzarExamen();