export class SubSistemaVision {
    constructor(nombre, izq, der, abilitado) {
        this.nombre = nombre
        this.abilitado = abilitado || false
        this.sistema = []
        this.sistema.push(izq)
        this.sistema.push(der)
    }

    toArray() {
        return this.sistema
    }
}