import { CeldaFactory } from "./CeldaFactory.js"

export class Celda extends CeldaFactory {
    constructor(ficha, ubicacion, activa) {
        super(ubicacion)
        this.ficha = ficha
        this.activa = activa || false
    }

    clone() {
        return new Celda(this.ficha, this.ubicacion, this.activa)
    }
}
