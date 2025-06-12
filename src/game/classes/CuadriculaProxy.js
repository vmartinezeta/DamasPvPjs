import { Ficha } from "./Ficha.js"
import { SuperFicha } from "./SuperFicha.js"

export class CuadriculaProxy {
    constructor(jugador1, jugador2, cuadricula) {
        this.jugador1 = jugador1
        this.jugador2 = jugador2
        this.cuadricula = cuadricula
        this.jugadorActual = jugador1
        this.empate = false
    }

    cambiarTurno() {
        if (this.jugadorActual.id === this.jugador1.id) {
            this.jugadorActual = this.jugador2
        } else {
            this.jugadorActual = this.jugador1
        }
    }

    colocacion1(celda) {
        this.jugador1.hacerMovimiento(this.cuadricula, celda)
    }

    colocacion2() {
        const celda = null
        this.jugador2.hacerMovimiento(this.cuadricula, celda)
    }

    finalizo() {
        return this.jugadorActual.bloqueado
        || this.findBy(this.jugador1.ficha.nombre).length === 0
        || this.findBy(this.jugador2.ficha.nombre).length === 0
        || this.empate
    }

    findBy(nombre) {
        return this.cuadricula.toArray().filter( ({ficha}) => ficha instanceof Ficha || ficha instanceof SuperFicha).filter(({ficha})=> ficha.nombre === nombre)
    }
}