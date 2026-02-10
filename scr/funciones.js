function validarYCalcular() {
    var hInput = document.getElementById('h').value;
    var mInput = document.getElementById('m').value;
    var sInput = document.getElementById('s').value;
    
    var h = parseInt(hInput) || 0;
    var m = parseInt(mInput) || 0;
    var s = parseInt(sInput) || 0;
    var box = document.getElementById('res');

    // Validación de Calidad (0-23 horas)
    if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) {
        box.className = 'error'; 
        box.innerHTML = 'Error: Datos fuera de rango (0-23)'; 
        return;
    }

    // NORMALIZACIÓN PARA EL RELOJ ANALÓGICO
    // El operador % 12 hace que: 13->1, 15->3, 00->0
    var hAnaloga = h % 12;

    // Conversión a grados (Lógica estática según actividad)
    var posH = hAnaloga * 30;
    var posM = m * 6;
    var posS = s * 6;

    // Mover manecillas visuales
    document.getElementById('hora-hand').style.transform = 'translateX(-50%) rotate(' + posH + 'deg)';
    document.getElementById('min-hand').style.transform = 'translateX(-50%) rotate(' + posM + 'deg)';
    document.getElementById('seg-hand').style.transform = 'translateX(-50%) rotate(' + posS + 'deg)';

    // Cálculo de ángulos
    var anguloHM = Math.abs(posH - posM);
    var anguloMS = Math.abs(posM - posS);

    box.className = 'success';
    
    // Formato de texto para el usuario
    var periodo = h >= 12 ? 'PM' : 'AM';
    var horaCero = hAnaloga === 0 ? 12 : hAnaloga;

    var contenido = '<div style="font-size: 0.8em; color: #555;">' + horaCero + ':' + m.toString().padStart(2, '0') + ' ' + periodo + '</div>' +
                    '<div style="margin-top: 5px;"><b>Principal (H-M): ' + anguloHM + '°</b></div>';
    
    // Mostrar ángulo secundario solo si hay segundos
    if (sInput !== "" && sInput !== null) {
        contenido += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed #bbb; font-size: 0.9em;">' +
                     'Secundario (M-S): ' + anguloMS + '°</div>';
    }

    box.innerHTML = contenido;
}
