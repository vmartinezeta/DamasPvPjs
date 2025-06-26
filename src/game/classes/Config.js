export const configDamas = {
    reglas: "colombia",
    forzarCaptura: false,
    forzarCapturaMax: false,
    habilitarAnimacion: true,
    musicaFondoAutomatica: true
}


export const ReglaDamas = {
    INTERNACIONAL: "Internacional",
    ESPANYOLAS: "Españolas",
    ITALIANAS: "Italianas",
    toArray: function() {
        return Object.values(this).filter(value=> typeof value !== "function")
    }
}

