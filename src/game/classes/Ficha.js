import { Espacio } from "./Espacio.js"
import { FichaDireccional } from "./FichaDireccional.js"
import { SuperFicha } from "./SuperFicha.js"

export class Ficha extends FichaDireccional {
    constructor(id, nombre, sistemaVision) {
        super(id, nombre, sistemaVision)
    }

    subir(nombre) {
        this.sistemaVision.habilitarTodo()
        return new SuperFicha(this.id, nombre, this.sistemaVision)
    }

    bajar(nombre) {
        return new Espacio(nombre)
    }

    clone() {
        return new Ficha(this.id, this.nombre)
    }

}