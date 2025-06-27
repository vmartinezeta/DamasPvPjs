import { CeldaFactory } from "./CeldaFactory.js"

export class Celda extends CeldaFactory {
    constructor(ficha, ubicacion) {
        super(ubicacion)
        this.ficha = ficha
    }

    clone() {
        return new Celda(this.ficha, this.ubicacion)
    }
}
