import Phaser from "phaser"

export default class Resume extends Phaser.GameObjects.Group {
    constructor(scene, children, config, totalNegras, totalBlancas) {
        super(scene, children, config)
        this.scene = scene

        scene.add.text(60, 100, totalBlancas, {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5).setDepth(100)

        scene.add.text(160, 100, totalNegras, {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5).setDepth(100)


        this.scene.physics.add.existing(this, true)
    }

}