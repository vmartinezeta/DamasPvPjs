import { FichaFactory } from "./FichaFactory"
import { Espacio } from "./Espacio"

export class FichaDireccional extends FichaFactory {
    constructor(id, nombre, sistemaVision) {
        super(nombre)
        this.id = id
        this.sistemaVision = sistemaVision        
    }
    
    bajar(nombre) {
        return new Espacio(nombre)
    }

    isIgual(id) {
        return this.id === id
    }    
}