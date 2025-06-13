import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { FichaCartel } from '../sprites/FichaCartel'
import { Punto } from '../classes/Punto'
import { Cuadricula } from '../classes/Cuadricula'
import { Ficha } from '../classes/Ficha'
import { Espacio } from '../classes/Espacio'
import { Vacio } from '../classes/Vacio'

export class Game extends Scene {
    constructor() {
        super('Game')
        this.tablero = null
    }

    create() {
        this.add.image(512, 384, 'background')
        this.physics.world.setBounds(0, 0, 1024, 600 )
        this.add.sprite(150, 0, 'tablero').setOrigin(0)
        this.tablero = this.add.group()
        this.redibujarTablero()
        // const cartel = new FichaCartel(this, new Punto(150+42+84*3,35), "ficha-roja")
        this.input.mouse.disableContextMenu()

        this.keyboard = this.input.keyboard.createCursorKeys()

        EventBus.emit('current-scene-ready', this);
    }

    redibujarTablero() {
        const negro = new Ficha("ficha-roja")
        const blanca = new Ficha("ficha-amarilla")
        const espacio = new Espacio("ficha-espacio")
        const cuadricula = new Cuadricula(negro, blanca, espacio)
        const celdas = cuadricula.celdas

        for(let i=0;i<8; i++) {
            for (let j=0; j<8;j++) {
                const celda = celdas[i][j]
                if (celda instanceof Vacio) continue
                const ficha = celda.ficha
                const x = 84*j + 192
                const y = 75*i + 38
                this.tablero.add(new FichaCartel(this, new Punto(x, y), ficha.nombre))
            }
        }
    }
    
    changeScene() {
        this.scene.start('MainMenu');  
    } 
}