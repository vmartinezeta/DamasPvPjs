import { Segmento } from "./Segmento"

export class Ruta {
    constructor(segmentos) {
        this.segmentos = segmentos
        this.celdas = []
        this.totalKO = 0
        this.hacer()
    }

    hacer() {
        for (const s of this.segmentos) {
            if (s instanceof Segmento) {
                this.totalKO++
            }

            if (this.celdas.length === 0) {
                this.celdas = [...s.celdas]
            } else {
                const celdas = s.celdas
                celdas.shift()
                this.celdas = [...this.celdas, ...celdas]
            }
        }
    }

    tieneKO() {
        return this.totalKO > 0
    }

    lastCelda() {
        return this.celdas[this.celdas.length-1]
    }
}