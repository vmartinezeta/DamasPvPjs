import { Punto } from "./Punto"
import { Panorama } from "./Panorama"

export class SistemaVision {
    constructor() {
        this.sistema = []
        this.sistema.push(new Panorama(
            "FRONTAL",
            new Punto(1, 1),
            new Punto(1, -1),
            true
        ))

        this.sistema.push(new Panorama(
            "TRASERA",
            new Punto(-1, -1),
            new Punto(-1, 1)            
        ))
    }

    fromInt(index) {
        return this.sistema[index]
    }

    habilitar(index) {
        this.sistema[index].abilitado = true
    }

    desabilitarTodo() {
        for(const sistema of this.sistema) {
            sistema.abilitado = false
        }
    }

    habilitarTodo() {
        for(const sistema of this.sistema) {
            sistema.abilitado = true
        }
    }

    rotar() {
        const nuevo = this.clone()
        nuevo.sistema = nuevo.sistema.reverse()
        nuevo.desabilitarTodo()
        nuevo.habilitar(0)
        const nombre = nuevo.fromInt(0).nombre
        nuevo.fromInt(0).nombre = nuevo.fromInt(1).nombre
        nuevo.fromInt(1).nombre = nombre
        return nuevo
    }

    toArray() {
        return this.sistema.filter(sistema => sistema.abilitado)
    }

    clone() {
        return new SistemaVision()
    }
}