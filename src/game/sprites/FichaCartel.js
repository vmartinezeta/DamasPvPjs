import Phaser from "phaser"

export class FichaCartel extends Phaser.GameObjects.Sprite{
    constructor(scene, origen, texture) {
        super(scene, origen.x, origen.y, texture)
        this.scene = scene
        this.texture = texture        
        // Añadir el sprite a la escena
        scene.add.existing(this)
        scene.physics.world.enable(this)
        this.body.setAllowGravity(false)
        // Configurar propiedades del sprite
        this.setOrigin(0.5, 0.5); // Centrar el punto de origen
        this.setScale(.8); // Escalar el sprite

    }

}