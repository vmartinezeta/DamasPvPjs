import { Celda } from "./Celda.js"
import { Punto } from "./Punto.js"
import { Ubicacion } from "./Ubicacion.js"
import { Vacio } from "./Vacio.js"

export class Cuadricula {
    constructor(negro, blanco, espacio, origen, separacion) {
        this.origen = origen
        this.separacion =separacion        
        this.celdas = []
        let estaVacio = true
        for (let i = 0; i < 8; i++) {
            const linea = []
            for (let j = 0; j < 8; j++) {
                const x = separacion * j + origen.x
                const y = separacion * i + origen.y
                if (i < 3 && !estaVacio) {
                    linea.push(new Celda(negro.clone(), new Ubicacion(new Punto(i, j), new Punto(x, y) )))
                } else if (i > 2 && i < 5 && !estaVacio) {
                    linea.push(new Celda(espacio, new Ubicacion(new Punto(i, j), new Punto(x, y))))
                } else if (i > 4 && !estaVacio) {
                    linea.push(new Celda(blanco.clone(), new Ubicacion(new Punto(i, j), new Punto(x, y))))
                } else {
                    linea.push(new Vacio())
                }
                estaVacio = !estaVacio
            }
            estaVacio = !estaVacio
            this.celdas.push(linea)
        }
    }

    updateCelda(celda) {
        const { x, y } = celda.ubicacion.virtual
        this.celdas[x][y] = celda
    }

    fromXY(x, y) {
        return this.celdas[x][y]
    }

    fromPunto(origen) {
        return this.fromXY(origen.x, origen.y)
    }

    toArray() {
        const celdas = []
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                celdas.push(this.fromXY(i, j))
            }
        }
        return celdas
    }

    rotarMatriz180() {
        const nuevaMatriz = Array(8).fill().map(() => Array(8).fill(null))
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const celda = this.celdas[y][x]
                const i = 7-y
                const j = 7-x
                const x1 = this.separacion * j + this.origen.x
                const y1 = this.separacion * i + this.origen.y
                celda.ubicacion = new Ubicacion(new Punto(i, j), new Punto(x1, y1))
                nuevaMatriz[i][j] = celda
            }
        }
        
        this.celdas = nuevaMatriz
    }

}