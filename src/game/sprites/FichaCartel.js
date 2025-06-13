import Phaser from "phaser"

export class FichaCartel extends Phaser.GameObjects.Sprite{
    constructor(scene, celda) {
        super(scene, 84 * celda.origen.y + 192, 75 * celda.origen.x + 38, celda.ficha.nombre)
        this.scene = scene
        this.texture = celda.ficha.nombre
        this.celda = celda

        scene.add.existing(this)
        scene.physics.world.enable(this)
        this.body.setAllowGravity(false)

        this.setOrigin(0.5, 0.5)
        this.setScale(.8)
        this.setInteractive()        
    }

}