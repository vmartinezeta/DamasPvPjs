import { FichaDireccional } from "./FichaDireccional"

export class SuperFicha extends FichaDireccional {
    constructor(id, nombre, sistemaVision) {
        super(id, nombre, sistemaVision)
    }    

    bajar(nombre) {
        return new Espacio(nombre)
    }
}