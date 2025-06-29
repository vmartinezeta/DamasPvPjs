export class Panorama {
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

    fromVector(vector) {
        return this.sistema.find( v => v.toString() === vector.toString())
    }

    getAdyacente(vector) {
        return this.sistema.find( v => v.toString() !== vector.toString())
    }
}