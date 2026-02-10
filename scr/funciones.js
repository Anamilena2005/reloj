function validarYCalcular() {
    var hInput = document.getElementById('h').value;
    var mInput = document.getElementById('m').value;
    var sInput = document.getElementById('s').value;
    
    var h = parseInt(hInput) || 0;
    var m = parseInt(mInput) || 0;
    var s = parseInt(sInput) || 0;
    var box = document.getElementById('res');

    if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) {
        box.className = 'error'; 
        box.innerHTML = 'Error: Datos fuera de rango'; 
        return;
    }

    // Grados de las manecillas
    var h12 = h % 12;
    var posH = h12 * 30;
    var posM = m * 6;
    var posS = s * 6;

    // Movimiento visual del reloj
    document.getElementById('hora-hand').style.transform = 'translateX(-50%) rotate(' + posH + 'deg)';
    document.getElementById('min-hand').style.transform = 'translateX(-50%) rotate(' + posM + 'deg)';
    document.getElementById('seg-hand').style.transform = 'translateX(-50%) rotate(' + posS + 'deg)';

    // Cálculo de los dos ángulos
    var angHM = Math.abs(posH - posM);
    if (angHM > 180) angHM = 360 - angHM;

    var angMS = Math.abs(posM - posS);
    if (angMS > 180) angMS = 360 - angMS;

    box.className = 'success';
    var periodo = h >= 12 ? 'PM' : 'AM';
    var hDisp = h12 === 0 ? 12 : h12;

    // DISEÑO: El de la hora siempre está arriba, el del segundo aparece abajo
    var html = '<div style="font-size: 0.8em; color: #666;">' + hDisp + ':' + m.toString().padStart(2, '0') + ' ' + periodo + '</div>';
    html += '<div style="margin: 5px 0;"><b>Ángulo H-M: ' + angHM + '°</b></div>';

    // Condición: Solo si hay algo escrito en la casilla de segundos, mostramos el segundo ángulo
    if (sInput !== "" && sInput !== null) {
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed #bbb; color: #1a73e8;">' +
                '<b>Ángulo M-S: ' + angMS + '°</b></div>';
    }

    box.innerHTML = html;
}
