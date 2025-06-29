import { GeneradorTrayectoria } from "./GeneradorTrayectoria"
import { Ruta } from "./Ruta"
import { Segmento } from "./Segmento"
import { Ficha } from "./Ficha"
import { SuperFicha } from "./SuperFicha"

export class SistemaRuta {
    constructor(cuadricula, celda) {
        this.cuadricula = cuadricula
        this.celda = celda
        this.trayectorias = []
    }

    generar() {
        this.trayectorias = []
        for(const sistema of this.celda.ficha.sistemaVision.toArray()) {
            for (const vector of sistema.toArray()) {
                const generador = new GeneradorTrayectoria(this.cuadricula, this.celda.clone(), null, vector)
                const trayectoria = generador.generar()
                if (trayectoria) {
                    this.trayectorias.push(trayectoria)
                }

            }
        }

        
        let trayectoria = this.trayectorias.find(t => !t.final)

        while (trayectoria) {
            const {segmentos, subVector} = trayectoria
            let i = 0
            for(; i<segmentos.length; i++) {
                const s = segmentos[i]
                const sistema = this.celda.ficha.sistemaVision
                const panorama = sistema.toArray().find(s => s.fromVector(subVector))
                const desdePrimerKO = segmentos.findIndex( s => s instanceof Segmento)
                if (this.celda.ficha instanceof SuperFicha && i>= desdePrimerKO) {
                    this.ramificar(s, subVector, panorama.getAdyacente(subVector))
                } else if (this.celda.ficha instanceof Ficha && s instanceof Segmento){
                    this.ramificar(s, subVector, panorama.getAdyacente(subVector))
                }
            }

            if (i === segmentos.length) {
                trayectoria.final = true
            }
            trayectoria = this.trayectorias.find(t => !t.final)
        }
        // unir todas las rutas
        return this.trayectorias.filter(t => t.vector === null).map(t => new Ruta(t.segmentos))
    }

    ramificar(s, vector, subVector) {
        const celda = s.last().clone()
        celda.ficha = this.celda.ficha
        const generador = new GeneradorTrayectoria(this.cuadricula, celda, vector, subVector)
        const trayectoria = generador.generar()
        if (trayectoria && trayectoria.puedeGirar()) {
            this.trayectorias.push(trayectoria)
        }        
    }
}