import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class MainMenu extends Scene {

    constructor() {
        super('MainMenu')
        this.configuracion = null
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background')

        this.add.text(500, 140, "Menu principal", {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5).setDepth(100)        

        EventBus.emit('current-scene-ready', this)
    }

    updateConfig(nuevaConfig) {
        this.configuracion = nuevaConfig
    }

    play() {
        this.scene.start('Game')
    }

    howTo() {
        this.scene.start('HowTo')
    }

    changeScene() {
        this.scene.start('MainMenu')
    } 
}