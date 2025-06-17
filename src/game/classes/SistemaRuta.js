import { GeneradorTrayectoria } from "./GeneradorTrayectoria"
import { Ruta } from "./Ruta"

export class SistemaRuta {
    constructor(cuadricula, celda) {
        this.cuadricula = cuadricula
        this.celda = celda
    }

    generar() {
        const trayectorias = []
        for(const sistema of this.celda.ficha.sistemaVision.toArray()) {
            for (const vector of sistema.toArray()) {
                const generador = new GeneradorTrayectoria(this.cuadricula, this.celda.clone(), null, vector)
                const trayectoria = generador.generar()
                if (trayectoria) {
                    trayectorias.push(trayectoria)
                }
            }
        }
        return trayectorias.map(t => new Ruta(t.segmentos))
    }
}