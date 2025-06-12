import { JugadorFactory } from "./JugadorFactory.js"
import { SuperFicha } from "./SuperFicha.js"

// movimiento corto
// movimiento largo cuando se tiene privilegio
export class Jugador extends JugadorFactory {
    constructor(id, ficha) {
        super(id, ficha)
    }

    hacerMovimiento(cuadricula, destino) {
        if (this.bloqueado) return
        if (this.ficha instanceof SuperFicha) {
            // tiene privilegio
            // validación
        }
        const final = destino.clone()
        const principio = this.origen.clone()
        const punto = principio.origen
        principio.origen = final.origen
        cuadricula.updateCelda(principio)
        final.origen = punto
        cuadricula.updateCelda(final)
    }

    hacerMovConKO(cuadricula, destino) {
        this.hacerMovimiento(cuadricula, destino)
        const ficha = destino.ficha
        destino.ficha = ficha.bajar()
        cuadricula.updateCelda(destino)
    }
}
