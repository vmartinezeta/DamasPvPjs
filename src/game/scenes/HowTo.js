import { configDamas} from '../classes/Config'
import { EventBus } from '../EventBus'
import { Scene } from 'phaser'


export class HowTo extends Scene {

    constructor() {
        super('HowTo')
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background')

        EventBus.emit('current-scene-ready', this)
    }

    howTo() {
        this.scene.start('MainMenu');
    } 

    updateConfig(nuevaConfig) {
        const mainMenu = this.scene.manager.getScene("MainMenu")
        if (!mainMenu) return
        mainMenu.configuracion = nuevaConfig
    }
}