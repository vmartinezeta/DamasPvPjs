export class JugadorFactory {
    constructor(id, ficha) {
        this.id = id
        this.ficha = ficha
        this.bloqueado = false
        this.origen = null
    }
}