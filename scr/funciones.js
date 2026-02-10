function validarYCalcular() {
    var hInput = document.getElementById('h').value;
    var mInput = document.getElementById('m').value;
    var sInput = document.getElementById('s').value;
    var op = document.getElementById('opcion').value;
    var box = document.getElementById('res');

    var h = parseInt(hInput) || 0;
    var m = parseInt(mInput) || 0;
    var s = parseInt(sInput) || 0;

    if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) {
        box.className = 'error'; 
        box.innerHTML = 'Error: Datos fuera de rango'; 
        return;
    }

    // 1. Normalización 24h a 12h y posiciones
    var hAnaloga = h % 12;
    var posH = hAnaloga * 30;
    var posM = m * 6;
    var posS = s * 6;

    // 2. Movimiento visual
    document.getElementById('hora-hand').style.transform = 'translateX(-50%) rotate(' + posH + 'deg)';
    document.getElementById('min-hand').style.transform = 'translateX(-50%) rotate(' + posM + 'deg)';
    document.getElementById('seg-hand').style.transform = 'translateX(-50%) rotate(' + posS + 'deg)';

    // 3. Cálculo del ángulo seleccionado en el menú
    var angulo = 0;
    var texto = "";
    
    if (op === 'hm') {
        angulo = Math.abs(posH - posM);
        texto = "Horario - Minutero";
    } else if (op === 'ms') {
        angulo = Math.abs(posM - posS);
        texto = "Minutero - Segundero";
    } else {
        angulo = Math.abs(posH - posS);
        texto = "Horario - Segundero";
    }

    // Ajuste al ángulo menor (estándar de calidad)
    if (angulo > 180) angulo = 360 - angulo;

    // 4. Mostrar resultado único
    box.className = 'success';
    var periodo = h >= 12 ? 'PM' : 'AM';
    var hDisplay = hAnaloga === 0 ? 12 : hAnaloga;

    box.innerHTML = '<div style="font-size: 0.8em; color: #666;">' + hDisplay + ':' + m.toString().padStart(2, '0') + ' ' + periodo + '</div>' +
                    '<div style="font-size: 1.2em; margin-top: 5px;"><b>' + texto + ': ' + angulo + '°</b></div>';
}
