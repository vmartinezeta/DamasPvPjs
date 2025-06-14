import { FichaFactory } from "./FichaFactory.js"

export class SuperFicha extends FichaFactory {
    constructor(id, nombre, sistemaVision) {
        super(nombre)
        this.id = id
        this.sistemaVision = sistemaVision
        this.reina = true
    }

}