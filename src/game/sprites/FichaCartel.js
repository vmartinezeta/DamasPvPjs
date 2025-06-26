import Phaser from "phaser"

export class FichaCartel extends Phaser.GameObjects.Sprite{
    constructor(scene, celda) {
        super(scene, celda.ubicacion.fisica.x, celda.ubicacion.fisica.y, celda.ficha.nombre)
        this.scene = scene
        this.texture = celda.ficha.nombre
        this.celda = celda
        this.key = celda.ubicacion.virtual.toString()
        scene.add.existing(this)
        scene.physics.world.enable(this)
        this.body.setAllowGravity(false)

        this.setOrigin(.5)
        this.setScale(.95)
        this.setInteractive()        
    }

}