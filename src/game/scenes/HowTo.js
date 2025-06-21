import { EventBus } from '../EventBus'
import { Scene } from 'phaser'


export class HowTo extends Scene {

    constructor() {
        super('HowTo')
        this.configuracion = null
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background')

        EventBus.emit('current-scene-ready', this)
    }

    howTo() {
        this.scene.start('MainMenu');
    } 

    setConfig(config) {
        this.configuracion = config
        console.log("phaser", config)
    }
}