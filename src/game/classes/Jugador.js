import { Ficha } from "./Ficha.js"
import { JugadorFactory } from "./JugadorFactory.js"
import { SuperFicha } from "./SuperFicha.js"


export class Jugador extends JugadorFactory {
    constructor(ficha) {
        super(ficha)
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
        this.movimientosSinCaptura ++
    }

    hacerMovConKO(cuadricula, ruta, destino) {
        const celdas = ruta.celdas
        for(const celda of celdas) {
            const ficha = celda.ficha
            if ((ficha instanceof Ficha || ficha instanceof SuperFicha) && this.ficha.id !== ficha.id) {
                const nuevo = celda.clone()
                nuevo.ficha = ficha.bajar("espacio")
                cuadricula.updateCelda(nuevo)
            }
        }

        this.hacerMovimiento(cuadricula, destino)
        this.movimientosSinCaptura = 0
    }

}