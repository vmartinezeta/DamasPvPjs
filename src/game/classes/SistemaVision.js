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

    add(sistema) {
        this.sistema.push(sistema)
    }

    rotar() {
        const clone = this.clone()
        clone.sistema = []
        clone.add(new Panorama(
            "FRONTAL",
            new Punto(-1, -1),
            new Punto(-1, 1),
            true       
        ))

        clone.add(new Panorama(
            "TRASERA",
            new Punto(1, 1),
            new Punto(1, -1)
        ))
        return clone
    }

    toArray() {
        return this.sistema.filter(sistema => sistema.abilitado)
    }

    clone() {
        return new SistemaVision()
    }
}