export class Celda {
    constructor(ficha, origen) {
        this.ficha = ficha
        this.origen = origen
        this.activa = false
    }

    clone() {
        return new Celda(this.ficha, this.origen)
    }
}
