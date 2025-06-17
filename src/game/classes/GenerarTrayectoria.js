import { Ficha } from "./Ficha"
import { MiniSegmento } from "./MiniSegmento"
import { Punto } from "./Punto"
import { Segmento } from "./Segmento"
import { SuperFicha } from "./SuperFicha"
import { Trayectoria } from "./Trayectoria"

export class GenerarTrayectorias {
    constructor(cuadricula, celda, vector) {
        this.cuadricula = cuadricula
        this.celda = celda
        this.vector = vector
        this.trayectorias = []
    }

    siguientePunto(origen, vector) {
        const x = origen.x + vector.x
        const y = origen.y + vector.y
        return new Punto(x, y)
    }

    generar() {
        const celdas = []
        celdas.push(this.celda)
        celdas.push(this.cuadricula.fromPunto(this.siguientePunto(this.celda.origen, this.vector)))
        let segmento = new MiniSegmento(celdas)
        const segmentos = []

        if (this.celda.ficha instanceof SuperFicha) {
            // con privilegios
        } else if (this.celda.ficha instanceof Ficha) {
            while (segmento.isValido() || (segmento instanceof MiniSegmento && segmento.isOpuesta())) {
                if (segmentos.length === 0 && segmento instanceof MiniSegmento) {
                    segmentos.push(segmento)
                    break
                }

                if (segmento instanceof Segmento) {
                    segmentos.push(segmento)
                    const ultimo = segmento.celdas[2].clone()
                    ultimo.ficha = this.celda.ficha
                    const celdas = []
                    celdas.push(ultimo)
                    celdas.push(this.cuadricula.fromPunto(this.siguientePunto(ultimo.origen, this.vector)))
                    segmento = new MiniSegmento(celdas)
                }

                if (!segmento.isValido()) {
                    celdas.push(this.cuadricula.fromPunto(this.siguientePunto(celdas[1].origen, this.vector)))
                    segmento = new Segmento(celdas)
                }
            }

            if (segmentos.length > 0) {
                this.trayectorias.push(new Trayectoria(null, this.vector, null, segmentos))
            }
        }

        return this.trayectorias
    }
}