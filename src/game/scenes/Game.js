import { Scene } from 'phaser'
import { EventBus } from '../EventBus'

export class Game extends Scene {
    constructor() {
        super('Game')
    }

    create() {
        this.add.image(512, 384, 'background')
        this.physics.world.setBounds(0, 0, 1024, 600 )

        // this.physics.add.collider(this.player, this.vidaGroup,  this.collideVida, null, this)

        this.input.mouse.disableContextMenu()

        this.keyboard = this.input.keyboard.createCursorKeys()

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene() {
        this.scene.start('MainMenu');  
    } 
}