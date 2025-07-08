export class JugadorFactory {
    constructor(ficha) {
        this.ficha = ficha
        this.bloqueado = false
        this.origen = null
        this.empate = false
        this.movimientosSinCaptura = 0
        this.cantidadMax = 25
    }
}