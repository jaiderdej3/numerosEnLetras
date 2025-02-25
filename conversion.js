const ConversionModule = (function () {
    // Función para capitalizar la primera letra
    function capitalizar(texto) {
        if (!texto) return "";
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

    function numeroALetras(numero, esParteDeMayor = false, esMoneda = false) {
        const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
        const especiales = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
        const decenas = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
        const centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

        if (numero === 0) return esParteDeMayor ? "" : "cero";
        if (numero < 10) return esMoneda && numero === 1 ? "un" : unidades[numero];
        if (numero < 20) return especiales[numero - 10];

        if (numero < 100) {
            let decena = Math.floor(numero / 10);
            let unidad = numero % 10;
            let textoDecena = decenas[decena];

            // Caso especial para números entre 21 y 29 (excepto el 20)
            if (decena === 2 && unidad > 0) {
                switch (unidad) {
                    case 1:
                        return "veintiún"; // Se utiliza "veintiún" cuando precede a un sustantivo
                    case 2:
                        return "veintidós";
                    case 3:
                        return "veintitrés";
                    case 4:
                        return "veinticuatro";
                    case 5:
                        return "veinticinco";
                    case 6:
                        return "veintiséis";
                    case 7:
                        return "veintisiete";
                    case 8:
                        return "veintiocho";
                    case 9:
                        return "veintinueve";
                }
            }

            // Para otros números menores a 100
            if (unidad === 1) {
                return (numero === 21 ? "veintiún" : textoDecena + " y un");
            }
            return textoDecena + (unidad !== 0 ? " y " + unidades[unidad] : "");
        }

        if (numero < 1000) {
            if (numero === 100) return "cien";
            let centena = Math.floor(numero / 100);
            let resto = numero % 100;
            return centenas[centena] + (resto > 0 ? " " + numeroALetras(resto, true, esMoneda) : "");
        }

        if (numero < 1000000) {
            let miles = Math.floor(numero / 1000);
            let resto = numero % 1000;
            let textoMiles = miles === 1 ? "mil" : numeroALetras(miles, true, true) + " mil";
            return textoMiles + (resto > 0 ? " " + numeroALetras(resto, true, esMoneda) : "");
        }

        if (numero < 1000000000) {
            let millones = Math.floor(numero / 1000000);
            let resto = numero % 1000000;
            let textoMillones = millones === 1 ? "un millón" : numeroALetras(millones, true, true) + " millones";
            let conDe = (resto === 0) ? " de" : "";
            return textoMillones + conDe + (resto > 0 ? " " + numeroALetras(resto, true, esMoneda) : "");
        }

        if (numero < 1000000000000) {
            let milesDeMillones = Math.floor(numero / 1000000000);
            let resto = numero % 1000000000;
            let textoMilesDeMillones = milesDeMillones === 1 ? "mil millones" : numeroALetras(milesDeMillones, true, true) + " mil millones";
            let conDe = (resto === 0) ? " de" : "";
            return textoMilesDeMillones + conDe + (resto > 0 ? " " + numeroALetras(resto, true, esMoneda) : "");
        }

        if (numero < 1000000000000000) {
            let billones = Math.floor(numero / 1000000000000);
            let resto = numero % 1000000000000;
            let textoBillones = billones === 1 ? "un billón" : numeroALetras(billones, true, true) + " billones";
            let conDe = (resto === 0) ? " de" : "";
            return textoBillones + conDe + (resto > 0 ? " " + numeroALetras(resto, true, esMoneda) : "");
        }

        return "Número fuera de rango";
    }

    function convertirNumeroAMoneda(numero) {
        let parteEntera = Math.floor(numero);
        let parteDecimal = Math.round((numero - parteEntera) * 100);

        const monedaSingular = "peso";
        const monedaPlural = "pesos";

        let textoNumero = numeroALetras(parteEntera, false, true).trim();
        let monedaTexto = (parteEntera === 1) ? monedaSingular : monedaPlural;
        let centavosTexto = parteDecimal > 0 ? ` con ${numeroALetras(parteDecimal, false, true)} centavos` : "";

        return `${capitalizar(textoNumero)} ${monedaTexto}${centavosTexto} ($${new Intl.NumberFormat("es-CO", { minimumFractionDigits: 2 }).format(numero)}) M/L.`;
    }

    return {
        convertirNumeroAMoneda,
        capitalizar,
        numeroALetras
    };
})();
