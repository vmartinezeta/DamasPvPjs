import { Celda } from "./Celda.js";

export class Vacio extends Celda {
    constructor(origen) {
        super(null, origen || null)
    }
}