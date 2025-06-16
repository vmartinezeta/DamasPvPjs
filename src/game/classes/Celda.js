export class Celda {
    constructor(ficha, ubicacion, activa) {
        this.ficha = ficha
        this.ubicacion = ubicacion
        this.activa = activa || false
    }

    clone() {
        return new Celda(this.ficha, this.ubicacion, this.activa)
    }
}
