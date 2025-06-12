import { FichaFactory } from "./FichaFactory.js"

export class SuperFicha extends FichaFactory {
    constructor(nombre) {
        super(nombre)
        this.reina = true
    }

}