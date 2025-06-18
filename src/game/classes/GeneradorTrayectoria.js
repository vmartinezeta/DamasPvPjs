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

    isValido(origen) {
        return (origen.x >= 0 && origen.x < 8)
            && (origen.y >= 0 && origen.y < 8)
    }

    generar() {
        if (this.celda.ficha instanceof SuperFicha) {
            return this.movimientoReina()
        } else if (this.celda.ficha instanceof Ficha) {
            return this.movimientoNormal()
        }
        throw new TypeError("No es permitido el movimiento")
    }

    movimientoReina() { }

    movimientoNormal() {
        let celdas = []
        celdas.push(this.celda)
        let siguientePunto = this.siguientePunto(this.celda.ubicacion.virtual, this.subVector)
        if (this.isValido(siguientePunto)) {
            celdas.push(this.cuadricula.fromPunto(siguientePunto))
        }

        let segmento = new MiniSegmento(celdas)
        const segmentos = []
        while (segmento.isValido()) {
            if (segmento instanceof MiniSegmento && !segmento.isOpuesta()) {
                if (!segmentos.length) {
                    segmentos.push(segmento)
                }
                break
            }

            if (segmento instanceof Segmento) {
                segmentos.push(segmento)
                const ultimo = segmento.celdas[2].clone()
                ultimo.ficha = this.celda.ficha
                celdas = []
                celdas.push(ultimo)
                siguientePunto = this.siguientePunto(ultimo.ubicacion.virtual, this.subVector)
                if (this.isValido(siguientePunto)) {
                    celdas.push(this.cuadricula.fromPunto(siguientePunto))
                }
                segmento = new MiniSegmento(celdas)
            }

            if (segmento instanceof MiniSegmento && segmento.isOpuesta()) {
                siguientePunto = this.siguientePunto(celdas[1].ubicacion.virtual, this.subVector)
                if (this.isValido(siguientePunto)) {
                    celdas.push(this.cuadricula.fromPunto(siguientePunto))
                }
                segmento = new Segmento(celdas)
            }
        }

        if (!segmentos.length) {
            return null
        }
        return new Trayectoria(this.vector, this.subVector, this.vector ? this.celda : null, segmentos)
    }
}