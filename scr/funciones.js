function validarYCalcular() {
    var hInput = document.getElementById('h').value;
    var mInput = document.getElementById('m').value;
    var sInput = document.getElementById('s').value;
    
    var h = parseInt(hInput) || 0;
    var m = parseInt(mInput) || 0;
    var s = parseInt(sInput) || 0;
    var op = document.getElementById('opcion').value; // Lee la opción elegida
    var box = document.getElementById('res');

    if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) {
        box.className = 'error'; 
        box.innerHTML = 'Error: Datos fuera de rango'; 
        return;
    }

    // Normalización 24h -> 12h para el reloj físico
    var h12 = h % 12;
    var posH = h12 * 30;
    var posM = m * 6;
    var posS = s * 6;

    // Actualizar manecillas
    document.getElementById('hora-hand').style.transform = 'translateX(-50%) rotate(' + posH + 'deg)';
    document.getElementById('min-hand').style.transform = 'translateX(-50%) rotate(' + posM + 'deg)';
    document.getElementById('seg-hand').style.transform = 'translateX(-50%) rotate(' + posS + 'deg)';

    // Calcular todos los ángulos
    var anguloHM = Math.abs(posH - posM);
    var anguloMS = Math.abs(posM - posS);
    var anguloHS = Math.abs(posH - posS);

    // Seleccionar cuál mostrar como principal según el menú
    var principal = 0;
    var texto = "";

    if (op === 'hm') {
        principal = anguloHM;
        texto = "Horario - Minutero";
    } else if (op === 'ms') {
        principal = anguloMS;
        texto = "Minutero - Segundero";
    } else {
        principal = anguloHS;
        texto = "Horario - Segundero";
    }

    box.className = 'success';
    
    var periodo = h >= 12 ? 'PM' : 'AM';
    var horaCero = h12 === 0 ? 12 : h12;

    box.innerHTML = '<div><small>' + horaCero + ':' + m.toString().padStart(2, '0') + ' ' + periodo + '</small></div>' +
                    '<div style="font-size: 1.3em; margin: 5px 0;"><b>' + texto + ': ' + principal + '°</b></div>' +
                    '<div style="font-size: 0.8em; opacity: 0.7; border-top: 1px solid #ccc; padding-top: 5px;">' +
                    'H-M: ' + anguloHM + '° | M-S: ' + anguloMS + '°' +
                    '</div>';
}
