import { Espacio } from "./Espacio.js"
import { FichaFactory } from "./FichaFactory.js"
import { SuperFicha } from "./SuperFicha.js"

export class Ficha extends FichaFactory {
    constructor(id, nombre, sistemaVision) {
        super(nombre)
        this.id = id
        this.sistemaVision = sistemaVision
    }

    subir(nombre) {
        this.sistemaVision.habilitarTodo()
        return new SuperFicha(this.id, nombre, this.sistemaVision)
    }

    bajar(nombre) {
        return new Espacio(nombre)
    }

    clone() {
        return new Ficha(this.id, this.nombre, this.sistemaVision)
    }
}