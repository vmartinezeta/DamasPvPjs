import { Espacio } from "./Espacio"
import { Ficha } from "./Ficha"
import { SegmentoFactory } from "./SegmentoFactory"

export class MiniSegmento extends SegmentoFactory {
    constructor(celdas) {
        super(celdas)
    }

    isValido() {
        if(this.celdas.length !== 2) {
            return false
        }

        const celda = this.celdas[this.celdas.length-1]
        if (!(celda.ficha instanceof Espacio)) {
            return false
        }
        return true
    }

    isOpuesta() {
        if(this.celdas.length !== 2) {
            return false
        }

        const der = this.celdas[0]
        const izq = this.celdas[1]
        if (der.ficha instanceof Ficha && der.ficha.id === izq.ficha.id) {
            return false
        }
        return true
    }
}
