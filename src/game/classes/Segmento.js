import { Espacio } from "./Espacio"
import { Ficha } from "./Ficha"

export class Segmento {
    constructor(celdas) {
        this.celdas = celdas
    }
}

export class SegmentoCorto extends Segmento {
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


export class SegmentoLargo extends Segmento{
    constructor(celdas) {
        super(celdas)
    }

    valido() {
        if (this.celdas.length !== 3) {
            return false
        }
        const corto = new SegmentoCorto(this.celdas.filter((_, idx)=> idx<2))
        if (!corto.isOpuesta()) {
            return false
        }

        const celda = this.celda.pop()
        if (!(celda.ficha instanceof Espacio)) {
            return false
        }
        return true
    }
}
