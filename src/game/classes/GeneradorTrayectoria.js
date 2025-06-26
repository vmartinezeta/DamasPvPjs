import { Ficha } from "./Ficha"
import { MiniSegmento } from "./MiniSegmento"
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

    generar() {
        if (this.celda.ficha instanceof SuperFicha) {
            return this.movimientoReina()
        } else if (this.celda.ficha instanceof Ficha) {
            return this.movimientoNormal()
        }
        throw new TypeError("No es permitido el movimiento")
    }

    movimientoReina() { 
        let celdas = []
        celdas.push(this.celda)
        let siguientePunto = this.cuadricula.siguientePunto(this.celda.ubicacion.virtual, this.subVector)
        if (this.cuadricula.contiene(siguientePunto)) {
            celdas.push(this.cuadricula.fromPunto(siguientePunto))
        }

        let segmento = new MiniSegmento(celdas)
        const segmentos = []
        while (segmento.isValido()) {

            if (segmento instanceof Segmento) {
                segmentos.push(segmento)
                const ultimo = segmento.celdas[2].clone()
                ultimo.ficha = this.celda.ficha
                celdas = []
                celdas.push(ultimo)
                siguientePunto = this.cuadricula.siguientePunto(ultimo.ubicacion.virtual, this.subVector)
                if (this.cuadricula.contiene(siguientePunto)) {
                    celdas.push(this.cuadricula.fromPunto(siguientePunto))
                }
                segmento = new MiniSegmento(celdas)
            }

            if (segmento instanceof MiniSegmento && segmento.isOpuesta()) {
                siguientePunto = this.cuadricula.siguientePunto(celdas[1].ubicacion.virtual, this.subVector)
                if (this.cuadricula.contiene(siguientePunto)) {
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

    movimientoNormal() {
        let celdas = []
        celdas.push(this.celda)
        let siguientePunto = this.cuadricula.siguientePunto(this.celda.ubicacion.virtual, this.subVector)
        if (this.cuadricula.contiene(siguientePunto)) {
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
                siguientePunto = this.cuadricula.siguientePunto(ultimo.ubicacion.virtual, this.subVector)
                if (this.cuadricula.contiene(siguientePunto)) {
                    celdas.push(this.cuadricula.fromPunto(siguientePunto))
                }
                segmento = new MiniSegmento(celdas)
            }

            if (segmento instanceof MiniSegmento && segmento.isOpuesta()) {
                siguientePunto = this.cuadricula.siguientePunto(celdas[1].ubicacion.virtual, this.subVector)
                if (this.cuadricula.contiene(siguientePunto)) {
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