window.addEventListener("DOMContentLoaded", function () {
    UIModule.cargarHistorialEnUI();

    const inputNumero = document.getElementById("numero");
    inputNumero.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            procesarConversion();
        }
    });

    document.getElementById("btnConvertir").addEventListener("click", procesarConversion);
    document.getElementById("btnLimpiar").addEventListener("click", function () {
        document.getElementById("numero").value = "";
        UIModule.actualizarResultado("");
    });
    document.getElementById("btnCopiar").addEventListener("click", copiarResultado);
    document.getElementById("btnResetHistorial").addEventListener("click", function () {
        StorageModule.resetHistorial();
        UIModule.resetUIHistorial();
    });
});

function procesarConversion() {
    const input = document.getElementById("numero");
    const numeroStr = input.value.trim();
    if (numeroStr === "") {
        UIModule.mostrarError("Por favor, ingresa un número.");
        return;
    }
    const numero = parseFloat(numeroStr);
    if (isNaN(numero) || numero < 0) {
        UIModule.mostrarError("Ingrese un número válido (no negativo).");
        return;
    }
    if (numero >= 1000000000000000) {
        UIModule.mostrarError("Número fuera de rango.");
        return;
    }

    try {
        const conversion = ConversionModule.convertirNumeroAMoneda(numero);
        UIModule.actualizarResultado(conversion);
        UIModule.agregarHistorial(conversion);
        StorageModule.guardarConversion(conversion);
    } catch (error) {
        console.error("Error en la conversión:", error);
        UIModule.mostrarError("Se produjo un error durante la conversión.");
    }
}

function copiarResultado() {
    const resultado = document.getElementById("resultado").innerText;
    if (!resultado) return;
    navigator.clipboard.writeText(resultado)
        .then(() => alert("Resultado copiado al portapapeles"))
        .catch(err => alert("Error al copiar: " + err));
}
