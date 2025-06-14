import { FichaFactory } from "./FichaFactory.js"

export class SuperFicha extends FichaFactory {
    constructor(id, nombre) {
        super(nombre)
        this.id = id
        this.reina = true
    }

}