import { Ficha } from "./Ficha"
import { MiniSegmento } from "./MiniSegmento"
import { Punto } from "./Punto"
import { Segmento } from "./Segmento"
import { SuperFicha } from "./SuperFicha"
import { Trayectoria } from "./Trayectoria"


export class GeneradorTrayectoria {
    constructor(cuadricula, celda, vector, subVector) {
        this.cuadricula = cuadricula
        this.celda = celda
        this.vector = vector
        this.subVector = subVector
    }

    siguientePunto(origen, subVector) {
        const x = origen.x + subVector.x
        const y = origen.y + subVector.y
        return new Punto(x, y)
    }

    generar() {
        if (this.celda.ficha instanceof SuperFicha) {
            return this.movimientoReina()
        } else if (this.celda.ficha instanceof Ficha) {
            return this.movimientoNormal()
        }
        throw new TypeError("No es permitido el movimiento")
    }

    movimientoReina() {}

    movimientoNormal() {
        const celdas = []
        celdas.push(this.celda)
        celdas.push(this.cuadricula.fromPunto(this.siguientePunto(this.celda.ubicacion.virtual, this.subVector)))
        let segmento = new MiniSegmento(celdas)
        const segmentos = []
        while (segmento.isValido() || (segmento instanceof MiniSegmento && segmento.isOpuesta())) {
            if (segmento instanceof MiniSegmento) {
                if (!segmentos.length) {
                    segmentos.push(segmento)
                }
                break
            }

            if (segmento instanceof Segmento) {
                segmentos.push(segmento)
                const ultimo = segmento.celdas[2].clone()
                ultimo.ficha = this.celda.ficha
                const celdas = []
                celdas.push(ultimo)
                celdas.push(this.cuadricula.fromPunto(this.siguientePunto(ultimo.ubicacion.virtual, this.subVector)))
                segmento = new MiniSegmento(celdas)
            }

            if (segmento.isValido() && segmento.isOpuesta()) {
                celdas.push(this.cuadricula.fromPunto(this.siguientePunto(celdas[1].ubicacion.virtual, this.subVector)))
                segmento = new Segmento(celdas)
            }
        }
        
        if (!segmentos.length) {
            return null
        }
        return new Trayectoria(this.vector, this.subVector, this.vector?this.celda:null, segmentos)
    }
}