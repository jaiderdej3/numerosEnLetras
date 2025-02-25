const UIModule = (function () {
    function actualizarResultado(resultado) {
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerText = resultado;
        resultadoDiv.classList.add("visible");
    }

    function agregarHistorial(texto) {
        const historialList = document.getElementById("historialList");
        if (!historialList) return;
        const li = document.createElement("li");
        li.textContent = texto;
        historialList.prepend(li);
    }

    function cargarHistorialEnUI() {
        const historialList = document.getElementById("historialList");
        historialList.innerHTML = "";
        const historial = StorageModule.cargarHistorial();
        historial.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            historialList.appendChild(li);
        });
    }

    function resetUIHistorial() {
        const historialList = document.getElementById("historialList");
        if (historialList) {
            historialList.innerHTML = "";
        }
    }

    function mostrarError(mensaje) {
        actualizarResultado(mensaje);
    }

    return {
        actualizarResultado,
        agregarHistorial,
        cargarHistorialEnUI,
        resetUIHistorial,
        mostrarError
    };
})();
