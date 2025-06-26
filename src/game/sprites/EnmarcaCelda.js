import Phaser from "phaser"

export class EnmarcaCelda extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y) {
        super(scene)
        this.lineStyle(4, 0x00ff00)
        this.strokeRect(x, y, 100, 100)
        this.setScale(.75)
    }
}