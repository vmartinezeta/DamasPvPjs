import { Ficha } from "./Ficha"
import { Punto } from "./Punto"
import { SegmentoCorto, SegmentoLargo } from "./Segmento"
import { SuperFicha } from "./SuperFicha"


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
        let segmento = new SegmentoCorto(celdas)
        const segmentos = []

        if (this.celda.ficha instanceof SuperFicha) {
            // con privilegios
        } else if (this.celda.ficha instanceof Ficha) {
            while (segmento.isValido() || (segmento instanceof SegmentoCorto && segmento.isOpuesta())) {
                if (segmentos.length === 0 && segmento instanceof SegmentoCorto) {
                    segmentos.push(segmento)
                    break
                }

                if (segmento instanceof SegmentoLargo) {
                    segmentos.push(segmento)
                    const ultimo = segmento.celdas[2].clone()
                    ultimo.ficha = this.celda.ficha
                    const celdas = []
                    celdas.push(ultimo)
                    celdas.push(this.cuadricula.fromPunto(this.siguientePunto(ultimo.origen, this.vector)))
                    segmento = new SegmentoCorto(celdas)
                }

                if (!segmento.isValido()) {
                    celdas.push(this.cuadricula.fromPunto(this.siguientePunto(celdas[1].origen, this.vector)))
                    segmento = new SegmentoLargo(celdas)
                }
            }

            if (segmentos.length > 0) {
                this.trayectorias.push(new Trayectoria(null, this.vector, null, segmentos))
            }
        }

        return this.trayectorias
    }
}


export class Trayectoria {
    constructor(vector, subVector, celdaGiro, segmentos, final) {
        this.vector = vector
        this.subVector = subVector
        this.celdaGiro = celdaGiro
        this.segmentos = segmentos
        this.final = final || false
    }
}


export class Ruta {
    constructor(segmentos) {
        this.segmentos = segmentos
        this.celdas = []
        this.totalKO = 0
        this.hacer()
    }

    hacer() {
        for (const s of this.segmentos) {
            if (s instanceof SegmentoLargo) {
                this.totalKO++
            }

            if (this.celdas.length === 0) {
                this.celdas = [...s.celdas]
            } else {
                this.celdas = [...this.this.celdas, ...s.celdas.shift()]
            }
        }
    }

    tieneKO() {
        this.totalKO > 0
    }
}