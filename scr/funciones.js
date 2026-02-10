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

    // 1. Conversión de 24h a 12h y cálculo de grados
    var hAnaloga = h % 12;
    var posH = hAnaloga * 30;
    var posM = m * 6;
    var posS = s * 6;

    // 2. Movimiento visual del reloj
    document.getElementById('hora-hand').style.transform = 'translateX(-50%) rotate(' + posH + 'deg)';
    document.getElementById('min-hand').style.transform = 'translateX(-50%) rotate(' + posM + 'deg)';
    document.getElementById('seg-hand').style.transform = 'translateX(-50%) rotate(' + posS + 'deg)';

    // 3. Cálculo de Ángulo Principal (Basado en el Menú)
    var anguloPrincipal = 0;
    var etiquetaPrincipal = "";
    if (op === 'hm') { anguloPrincipal = Math.abs(posH - posM); etiquetaPrincipal = "Horario - Minutero"; }
    else if (op === 'ms') { anguloPrincipal = Math.abs(posM - posS); etiquetaPrincipal = "Minutero - Segundero"; }
    else { anguloPrincipal = Math.abs(posH - posS); etiquetaPrincipal = "Horario - Segundero"; }
    
    if (anguloPrincipal > 180) anguloPrincipal = 360 - anguloPrincipal;

    // 4. Construcción del Resultado
    box.className = 'success';
    var periodo = h >= 12 ? 'PM' : 'AM';
    var h12 = hAnaloga === 0 ? 12 : hAnaloga;

    var html = '<div style="font-size: 0.8em; color: #666; margin-bottom: 5px;">' + h12 + ':' + m.toString().padStart(2, '0') + ' ' + periodo + '</div>';
    html += '<div style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">' +
            '<small>Resultado Principal:</small><br>' +
            '<b>' + etiquetaPrincipal + ': ' + anguloPrincipal + '°</b></div>';

    // 5. RESPUESTA SECUNDARIA (Solo si hay segundos ingresados)
    if (sInput !== "" && sInput !== null) {
        var anguloSeg = Math.abs(posM - posS);
        if (anguloSeg > 180) anguloSeg = 360 - anguloSeg;

        html += '<div style="margin-top: 8px; color: #1a73e8;">' +
                '<small>Cálculo de Segundos (Extra):</small><br>' +
                '<b>Minutero - Segundero: ' + anguloSeg + '°</b></div>';
    }

    box.innerHTML = html;
}
