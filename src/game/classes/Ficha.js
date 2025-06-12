import { Espacio } from "./Espacio.js"
import { FichaFactory } from "./FichaFactory.js"
import { SuperFicha } from "./SuperFicha.js"

export class Ficha extends FichaFactory {
    constructor(nombre) {
        super(nombre)
    }

    subir() {
        return new SuperFicha(this.nombre)
    }

    bajar(nombre) {
        return new Espacio(nombre)
    }
}