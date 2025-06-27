import { Ruta } from "./Ruta"

export class Trayectoria {
    constructor(vector, subVector, celdaGiro, segmentos, final) {
        this.vector = vector
        this.subVector = subVector
        this.celdaGiro = celdaGiro
        this.segmentos = segmentos
        this.final = final || false
    }

    puedeGirar() {
        const ruta = new Ruta(this.segmentos)
        return ruta.tieneKO()
    }

    getBrotes() {
        return this.segmentos
    }
}