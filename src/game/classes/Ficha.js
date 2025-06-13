import { Espacio } from "./Espacio.js"
import { FichaFactory } from "./FichaFactory.js"
import { SuperFicha } from "./SuperFicha.js"

export class Ficha extends FichaFactory {
    constructor(id, nombre) {
        super(id, nombre)
    }

    subir(nombre) {
        return new SuperFicha(nombre)
    }

    bajar(nombre) {
        return new Espacio(nombre)
    }
}