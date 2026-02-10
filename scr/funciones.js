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

    // Posiciones en grados
    var h12 = h % 12;
    var posH = h12 * 30;
    var posM = m * 6;
    var posS = s * 6;

    // Mover manecillas del reloj
    document.getElementById('hora-hand').style.transform = 'translateX(-50%) rotate(' + posH + 'deg)';
    document.getElementById('min-hand').style.transform = 'translateX(-50%) rotate(' + posM + 'deg)';
    document.getElementById('seg-hand').style.transform = 'translateX(-50%) rotate(' + posS + 'deg)';

    box.className = 'success';
    var periodo = h >= 12 ? 'PM' : 'AM';
    var hDisplay = h12 === 0 ? 12 : h12;
    var titulo = "";
    var anguloFinal = 0;

    // LÓGICA DE DETECCIÓN AUTOMÁTICA
    if (sInput !== "" && sInput !== null) {
        // SI EL USUARIO INGRESÓ SEGUNDOS: Prioridad al ángulo Minuto-Segundo
        anguloFinal = Math.abs(posM - posS);
        titulo = "Ángulo Minutero - Segundero";
    } else {
        // SI LA CASILLA DE SEGUNDOS ESTÁ VACÍA: Ángulo Horario-Minuto
        anguloFinal = Math.abs(posH - posM);
        titulo = "Ángulo Horario - Minutero";
    }

    // Ajuste para el ángulo menor (estándar de calidad)
    if (anguloFinal > 180) { anguloFinal = 360 - anguloFinal; }

    box.innerHTML = '<div style="font-size: 0.8em; color: #666;">' + hDisplay + ':' + m.toString().padStart(2, '0') + (sInput !== "" ? ':' + s.toString().padStart(2, '0') : "") + ' ' + periodo + '</div>' +
                    '<div style="margin-top: 5px;"><b>' + titulo + ':</b></div>' +
                    '<div style="font-size: 1.8em; color: #1a73e8;">' + anguloFinal + '°</div>';
}
