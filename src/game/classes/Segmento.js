import { Espacio } from "./Espacio"
import { MiniSegmento } from "./MiniSegmento"
import { SegmentoFactory } from "./SegmentoFactory"

export class Segmento extends SegmentoFactory{
    constructor(celdas) {
        super(celdas)
    }

    isValido() {
        if (this.celdas.length !== 3) {
            return false
        }

        const corto = new MiniSegmento(this.celdas.filter((_, idx)=> idx<2))
        if (corto.isValido() && !corto.isOpuesta()) {
            return false
        }

        const celda = this.celdas[this.celdas.length-1]
        return celda.ficha instanceof Espacio
    }

    last() {
        return this.celdas[this.celdas.length-1]
    }
}