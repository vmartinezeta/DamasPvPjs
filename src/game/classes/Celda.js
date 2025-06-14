export class Celda {
    constructor(ficha, origen, activa) {
        this.ficha = ficha
        this.origen = origen
        this.activa = activa || false
    }

    clone() {
        return new Celda(this.ficha, this.origen, this.activa)
    }
}
