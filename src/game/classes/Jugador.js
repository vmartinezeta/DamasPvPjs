import { Ficha } from "./Ficha.js"
import { JugadorFactory } from "./JugadorFactory.js"


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
    }

    hacerMovConKO(cuadricula, ruta) {
        const celdas = ruta.celdas
        for(const celda of celdas) {
            const ficha = celda.ficha
            if (ficha instanceof Ficha && this.ficha.id !== ficha.id) {
                const nuevo = celda.clone()
                nuevo.ficha = ficha.bajar("ficha-espacio")
                cuadricula.updateCelda(nuevo)
            }
        }

        const destino = celdas[celdas.length-1]
        this.hacerMovimiento(cuadricula, destino)
    }

    
}