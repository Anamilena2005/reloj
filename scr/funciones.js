function validarYCalcular() {
    var hInput = document.getElementById('h').value;
    var mInput = document.getElementById('m').value;
    var sInput = document.getElementById('s').value;
    
    var h = parseInt(hInput) || 0;
    var m = parseInt(mInput) || 0;
    var s = parseInt(sInput) || 0;
    var op = document.getElementById('opcion').value;
    var box = document.getElementById('res');

    // 1. Validación de rangos (Calidad de Software)
    if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) {
        box.className = 'error'; 
        box.innerHTML = 'Error: Datos fuera de rango (0-23h / 0-59m/s)'; 
        return;
    }

    // 2. Normalización para el Reloj Analógico
    var h12 = h % 12;
    var posH = h12 * 30;
    var posM = m * 6;
    var posS = s * 6;

    // 3. Mover manecillas visuales
    document.getElementById('hora-hand').style.transform = 'translateX(-50%) rotate(' + posH + 'deg)';
    document.getElementById('min-hand').style.transform = 'translateX(-50%) rotate(' + posM + 'deg)';
    document.getElementById('seg-hand').style.transform = 'translateX(-50%) rotate(' + posS + 'deg)';

    // 4. Calcular el ángulo solicitado en el menú
    var angulo = 0;
    var textoRelacion = "";

    if (op === 'hm') {
        angulo = Math.abs(posH - posM);
        textoRelacion = "Horario – Minutero";
    } else if (op === 'ms') {
        angulo = Math.abs(posM - posS);
        textoRelacion = "Minutero – Segundero";
    } else {
        angulo = Math.abs(posH - posS);
        textoRelacion = "Horario – Segundero";
    }

    // 5. Mostrar resultados (Principal y aviso de segundos)
    box.className = 'success';
    var periodo = h >= 12 ? 'PM' : 'AM';
    var hDisplay = h12 === 0 ? 12 : h12;

    var htmlResultado = '<div><small>Hora: ' + hDisplay + ':' + m.toString().padStart(2, '0') + ' ' + periodo + '</small></div>' +
                        '<div style="font-size: 1.3em; margin: 5px 0;"><b>' + textoRelacion + ': ' + angulo + '°</b></div>';

    // Si hay segundos, mostramos un indicador pequeño abajo para confirmar que se están usando
    if (sInput !== "" && sInput !== null) {
        htmlResultado += '<div style="font-size: 0.8em; color: #555; border-top: 1px dashed #ccc; padding-top: 5px;">' +
                         'Segundos detectados: ' + s + 's</div>';
    }

    box.innerHTML = htmlResultado;
}
