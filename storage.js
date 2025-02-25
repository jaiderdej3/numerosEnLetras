const StorageModule = (function () {
    const KEY = "historialConversiones";

    function guardarConversion(texto) {
        let historial = JSON.parse(localStorage.getItem(KEY)) || [];
        historial.unshift(texto);
        localStorage.setItem(KEY, JSON.stringify(historial));
    }

    function cargarHistorial() {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    }

    function resetHistorial() {
        localStorage.removeItem(KEY);
    }

    return {
        guardarConversion,
        cargarHistorial,
        resetHistorial
    };
})();
