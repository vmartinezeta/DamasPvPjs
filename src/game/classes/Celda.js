export class Celda {
    constructor(ficha, origen) {
        this.ficha = ficha
        this.origen = origen
    }

    clone() {
        return new Celda(this.ficha, this.origen)
    }
}
