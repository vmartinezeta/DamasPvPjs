import { Celda } from "./Celda.js"
import { Punto } from "./Punto.js"
import { Vacio } from "./Vacio.js"

export class Cuadricula {
    constructor(negro, blanco, espacio) {
        this.celdas = []
        let estaVacio = true
        for (let i = 0; i < 8; i++) {
            const linea = []
            for (let j = 0; j < 8; j++) {
                if (i < 3 && !estaVacio) {
                    linea.push(new Celda(negro, new Punto(i, j)))
                } else if (i > 2 && i < 5 && !estaVacio) {
                    linea.push(new Celda(espacio, new Punto(i, j)))
                } else if (i > 4 && !estaVacio) {
                    linea.push(new Celda(blanco, new Punto(i, j)))
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
        const { x, y } = celda.origen
        this.celdas[x][y] = celda
    }

    fromXY(x, y) {
        return this.celdas[x][y]
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

}