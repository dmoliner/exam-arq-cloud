const examen = [...testPreguntes].sort(() => 0.5 - Math.random()).slice(0, 50);
let indexActual = 0;
let respostes = new Array(50).fill(null);
let respostesCorrectesArray = new Array(50).fill(false);

function dibuixar(canvasId, encerts, total) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    // Si el gràfic ja existeix, el destruim per poder dibuixar-lo de nou
    if (window.chartInstance) window.chartInstance.destroy();
    
    window.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: { labels: ['Encerts', 'Errors'], datasets: [{ data: [encerts, total - encerts], backgroundColor: ['#28a745', '#dc3545'] }] },
        options: { cutout: '70%', responsive: true }
    });
}

function mostrarProgres() {
    const encerts = respostesCorrectesArray.filter(v => v).length;
    const respostesDonades = respostes.filter(v => v !== null).length;
    
    if (respostesDonades === 0) return alert("Encara no has respost cap pregunta.");
    
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('progres-screen').style.display = 'block';
    dibuixar('donutChartProgres', encerts, respostesDonades);
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
}

carregar();