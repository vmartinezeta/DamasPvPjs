import { JugadorFactory } from "./JugadorFactory.js"


export class Jugador extends JugadorFactory {
    constructor(id, ficha) {
        super(id, ficha)
    }

    hacerMovimiento(cuadricula, destino) {
        if (this.bloqueado) return
        const final = destino.clone()
        const principio = this.origen.clone()
        const ubicacion = principio.ubicacion
        principio.ubicacion = final.ubicacion
        cuadricula.updateCelda(principio)
        final.ubicacion = ubicacion
        cuadricula.updateCelda(final)
    }

    hacerMovConKO(cuadricula, destino) {
        this.hacerMovimiento(cuadricula, destino)
        const ficha = destino.ficha
        destino.ficha = ficha.bajar()
        cuadricula.updateCelda(destino)
    }

    
}