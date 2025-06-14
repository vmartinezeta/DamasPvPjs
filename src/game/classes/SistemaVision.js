import { Punto } from "./Punto"

export class SistemaVision {
    constructor() {
        this.sistema = []
        this.sistema.push(new SubSistemaVision(
            "FRONTAL",
            new Punto(-1, 1),
            new Punto(1, 1),
            true
        ))
        this.sistema.push(new SubSistemaVision(
            "TRASERA",
            new Punto(-1, -1),
            new Punto(1, -1)
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


export class SubSistemaVision {
    constructor(nombre, izq, der, abilitado) {
        this.nombre = nombre
        this.abilitado = abilitado || false
        this.sistema = []
        this.sistema.push(izq)
        this.sistema.push(der)
    }
}