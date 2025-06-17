import { FichaDireccional } from "./FichaDireccional"

export class SuperFicha extends FichaDireccional {
    constructor(id, nombre, sistemaVision) {
        super(id, nombre, sistemaVision)
        this.reina = true
    }

}