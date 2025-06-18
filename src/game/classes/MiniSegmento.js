import { Espacio } from "./Espacio"
import { SegmentoFactory } from "./SegmentoFactory"

export class MiniSegmento extends SegmentoFactory {
    constructor(celdas) {
        super(celdas)
    }

    isValido() {
        if (this.celdas.length !== 2) {
            return false
        }

        const der = this.celdas[1]      
        if(der.ficha instanceof Espacio) {
            return true
        }

        return this.isOpuesta()
    }

    isOpuesta() {
        if (this.celdas.length !== 2) {
            return false
        }

        const der = this.celdas[0]
        const izq = this.celdas[1]

        if (izq.ficha instanceof Espacio) {
            return false
        }

        if (der.ficha.id === izq.ficha.id) {
            return false
        }

        return true
    }
}
