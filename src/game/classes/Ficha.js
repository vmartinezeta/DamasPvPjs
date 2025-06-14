import { Espacio } from "./Espacio.js"
import { FichaFactory } from "./FichaFactory.js"
import { SuperFicha } from "./SuperFicha.js"

export class Ficha extends FichaFactory {
    constructor(id, nombre) {
        super(nombre)
        this.id = id
    }

    subir(nombre) {
        return new SuperFicha(this.id, nombre)
    }

    bajar(nombre) {
        return new Espacio(nombre)
    }
}