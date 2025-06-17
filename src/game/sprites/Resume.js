import Phaser from "phaser"

export default class Resume extends Phaser.GameObjects.Group {
    constructor(scene, origen, totalNegras, totalBlancas) {
        super(scene)
        this.scene = scene

        const roja = this.create(origen.x, origen.y, "ficha-roja").setOrigin(0.5)
        this.add(roja)

        const amarilla = this.create(origen.x + 100, origen.y, "ficha-amarilla").setOrigin(0.5)
        this.add(amarilla)

        this.rotuloBlanco = scene.add.text(60, 100, totalBlancas, {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5).setDepth(100)

        this.rotuloNegro = scene.add.text(160, 100, totalNegras, {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5).setDepth(100)

        this.scene.physics.add.existing(this, true)
    }

    updateTablero(totalNegras, totalBlancas) {
        this.rotuloNegro.setText(totalNegras)
        this.rotuloBlanco.setText(totalBlancas)
    }
}