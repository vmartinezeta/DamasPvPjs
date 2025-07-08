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
                const celdas = s.celdas.slice()
                celdas.shift()
                this.celdas = [...this.celdas, ...celdas]
            }
        }
    }

    tieneKO() {
        return this.totalKO > 0
    }

    getEspaciosDestino() {
        const celdas = []
        for (let i = this.segmentos.length-1; i>=0; i--) {
            const actual = this.segmentos[i]
            if (actual instanceof Segmento) {
                celdas.push(actual.celdas[actual.celdas.length - 1])
                return celdas
            }
            celdas.push(actual.celdas[actual.celdas.length - 1])
        }
        return celdas
    }
}