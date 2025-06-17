import { Espacio } from "./Espacio"
import { Ficha } from "./Ficha"
import { SegmentoFactory } from "./SegmentoFactory"

export class MiniSegmento extends SegmentoFactory {
    constructor(celdas) {
        super(celdas)
    }

    valido() {
        if(this.celdas.length !== 2) {
            return false
        }

        const celda = this.celdas.pop()
        if (!(celda.ficha instanceof Espacio)) {
            return false
        }
        return true
    }

    isOpuesta() {
        if(this.celdas.length !== 2) {
            return false
        }

        const der = this.celdas.pop()
        const izq = this.celdas.pop()
        if (der.ficha instanceof Ficha && der.ficha.id === izq.ficha.id) {
            return false
        }
        return true
    }
}
