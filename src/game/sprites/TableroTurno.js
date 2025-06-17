import Phaser from "phaser"

export default class TableroTurno extends Phaser.GameObjects.Group {
    constructor(scene, origen, fichaId) {
        super(scene)
        this.fichas = []

        scene.add.text(origen.x-100, origen.y, "Turno: ", {
            fontFamily: 'Arial Black', fontSize: 26, color: '#ffffff',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5).setDepth(100)

        this.blanca = this.create(origen.x, origen.y, "ficha-amarilla").setOrigin(0.5)
        this.fichas.push(this.blanca)
        this.add(this.blanca)

        this.negra = this.create(origen.x, origen.y, "ficha-roja").setOrigin(0.5)
        this.fichas.push(this.negra)
        this.add(this.negra)

        this.updateTablero(fichaId)

        scene.physics.add.existing(this, true)
    }

    updateTablero(fichaId) {
        const id = fichaId === 2 ? 0 : 1
        this.fichas[id].visible = true
        this.fichas[+!id].visible = !this.fichas[id].visible
    }
}