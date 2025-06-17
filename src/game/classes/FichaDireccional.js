import { FichaFactory } from "./FichaFactory"

export class FichaDireccional extends FichaFactory {
    constructor(id, nombre, sistemaVision) {
        super(nombre)
        this.id = id
        this.sistemaVision = sistemaVision        
    }
}