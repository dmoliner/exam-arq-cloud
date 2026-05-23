const examen = [...testPreguntes].sort(() => 0.5 - Math.random()).slice(0, 50);
let indexActual = 0;
let respostes = new Array(50).fill(null);
let respostesCorrectesArray = new Array(50).fill(false);

// Funcions de gestió d'històric mitjançant Cookies persistents
function obtenirStatsDiaries() {
    const nomCookie = "simulador_diari_stats=";
    const descodificat = decodeURIComponent(document.cookie);
    const parts = descodificat.split(';');
    for (let i = 0; i < parts.length; i++) {
        let c = parts[i].trim();
        if (c.indexOf(nomCookie) === 0) {
            try {
                return JSON.parse(c.substring(nomCookie.length));
            } catch (e) {
                console.error("Error llegint cookie", e);
            }
        }
    }
    return {
        provesFetes: 0,
        encertsTotals: 0,
        preguntesTotals: 0
    };
}

function desarStatsDiaries(stats) {
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Caduca en 365 dies (persistent)
    const expires = "expires=" + d.toUTCString();
    document.cookie = "simulador_diari_stats=" + encodeURIComponent(JSON.stringify(stats)) + ";" + expires + ";path=/";
}

function dibuixarDiari(canvasId, stats) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const instanceKey = canvasId === 'donutChartProgresDiari' ? 'donutChartProgresDiariInstance' : 'donutChartFinalDiariInstance';
    if (window[instanceKey]) window[instanceKey].destroy();
    
    if (stats.provesFetes === 0) return;
    
    const encerts = stats.encertsTotals;
    const total = stats.preguntesTotals;
    
    window[instanceKey] = new Chart(ctx, {
        type: 'doughnut',
        data: { 
            labels: ['Encerts Acumulats', 'Errors Acumulats'], 
            datasets: [{ 
                data: [encerts, total - encerts], 
                backgroundColor: ['#10b981', '#f43f5e'],
                borderColor: '#ffffff',
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
                            size: 11,
                            weight: '600'
                        },
                        padding: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
}

function novaProva() {
    const stats = obtenirStatsDiaries();
    const encerts = respostesCorrectesArray.filter(v => v).length;
    
    stats.provesFetes += 1;
    stats.encertsTotals += encerts;
    stats.preguntesTotals += 50;
    
    desarStatsDiaries(stats);
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
                    title: {
                        display: true,
                        text: 'Rendiment per Temes', // El títol de l'eix Y és el títol del gràfic
                        color: '#0284c7',
                        font: {
                            family: "'Outfit', sans-serif",
                            size: 13, // Mida continguda del títol del gràfic
                            weight: '800'
                        },
                        padding: { bottom: 12 }
                    },
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

function mostrarProgres() {
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
    
    // Mostrar històric diari
    const stats = obtenirStatsDiaries();
    if (stats.provesFetes === 0) {
        document.getElementById('diari-buit-progres').style.display = 'block';
        document.getElementById('diari-grafic-wrapper-progres').style.display = 'none';
    } else {
        document.getElementById('diari-buit-progres').style.display = 'none';
        document.getElementById('diari-grafic-wrapper-progres').style.display = 'flex';
        dibuixarDiari('donutChartProgresDiari', stats);
        
        const percentatgeAvui = ((stats.encertsTotals / stats.preguntesTotals) * 100).toFixed(1);
        document.getElementById('proves-fetes-text-progres').innerHTML = `<b>${stats.provesFetes}</b> ${stats.provesFetes === 1 ? 'prova feta' : 'proves fetes'} &nbsp;|&nbsp; Mitjana: <b>${percentatgeAvui}% encerts</b>`;
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
        div.innerText = opt;
        div.onclick = () => {
            if (respostes[indexActual] !== null) return;
            respostes[indexActual] = i;
            const esCorrecte = (i === q.respostaCorrecta);
            respostesCorrectesArray[indexActual] = esCorrecte;
            div.classList.add(esCorrecte ? 'correct' : 'incorrect');
            if (!esCorrecte) optionsContainer.children[q.respostaCorrecta].classList.add('correct');
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

function mostrarResultats() {
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
    
    // Mostrar històric diari
    const stats = obtenirStatsDiaries();
    if (stats.provesFetes === 0) {
        document.getElementById('diari-buit-final').style.display = 'block';
        document.getElementById('diari-grafic-wrapper-final').style.display = 'none';
    } else {
        document.getElementById('diari-buit-final').style.display = 'none';
        document.getElementById('diari-grafic-wrapper-final').style.display = 'flex';
        dibuixarDiari('donutChartFinalDiari', stats);
        
        const percentatgeAvui = ((stats.encertsTotals / stats.preguntesTotals) * 100).toFixed(1);
        document.getElementById('proves-fetes-text-final').innerHTML = `<b>${stats.provesFetes}</b> ${stats.provesFetes === 1 ? 'prova feta' : 'proves fetes'} &nbsp;|&nbsp; Mitjana: <b>${percentatgeAvui}% encerts</b>`;
    }
}

carregar();