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
            const {segmentos, vector, subVector} = trayectoria
            let i = 0
            for(; i<segmentos.length; i++) {
                const s = segmentos[i]
                if (this.celda.ficha instanceof SuperFicha
                    || segmentos.find(s => s instanceof Segmento)) {
                    this.ramificar(s, vector, subVector)
                } else if (this.celda.ficha instanceof Ficha && s instanceof Segmento){
                    this.ramificar(s,vector, subVector)
                }
            }

            if (i === segmentos.length) {
                trayectoria.final = true
            }
            trayectoria = this.trayectorias.find(t => !t.final)
        }

        return this.trayectorias.filter(t => t.vector ===null).map(t => new Ruta(t.segmentos))
    }

    ramificar(s, vector, subVector) {  
        const celda = s.last()
        const generador = new GeneradorTrayectoria(this.cuadricula, celda.clone(), vector, subVector)
        const trayectoria = generador.generar()
        if (trayectoria) {
            this.trayectorias.push(trayectoria)
        }        
    }
}