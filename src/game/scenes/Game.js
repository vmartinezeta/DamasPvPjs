import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { FichaCartel } from '../sprites/FichaCartel'
import { Cuadricula } from '../classes/Cuadricula'
import { Ficha } from '../classes/Ficha'
import { Espacio } from '../classes/Espacio'
import { Vacio } from '../classes/Vacio'
import { Jugador } from '../classes/Jugador'
import { SuperFicha } from '../classes/SuperFicha'

export class Game extends Scene {
    constructor() {
        super('Game')
        this.cuadricula = null
        this.tablero = null
        this.jugador1 = null
        this.jugador2 = null
        this.jugadorActual = null
        this.empate = false
    }

    create() {
        this.add.image(512, 384, 'background')
        this.physics.world.setBounds(0, 0, 1024, 600)
        this.add.sprite(150, 0, 'tablero').setOrigin(0)

        const negro = new Ficha("ficha-roja")
        const blanca = new Ficha("ficha-amarilla")
        const espacio = new Espacio("ficha-espacio")
        this.cuadricula = new Cuadricula(negro, blanca, espacio)
        this.jugador1 = new Jugador(1, negro)
        this.jugador2 = new Jugador(2, blanca)
        this.jugadorActual = this.jugador1

        this.tablero = this.add.group()
        this.redibujarTablero()

        this.input.mouse.disableContextMenu()

        this.keyboard = this.input.keyboard.createCursorKeys()

        this.input.on('gameobjectdown', this.onPieceClicked, this)

        EventBus.emit('current-scene-ready', this);
    }

    onPieceClicked(_, gameObject) {
        const celda = gameObject.celda
        if ((!this.jugadorActual.origen && celda.ficha instanceof Espacio)
            || (this.jugadorActual.ficha.nombre !== celda.ficha.nombre && !(celda.ficha instanceof Espacio))
        ) {
            return
        }

        gameObject.setTint(0x00ff00)
        if (this.jugadorActual.id === 1 && !this.jugador1.origen) {
            this.jugador1.origen = celda
        } else if (this.jugadorActual.id === 1 && this.jugador1.origen) {
            this.colocacion1(celda)
        } else if (this.jugadorActual.id === 2 && !this.jugador2.origen) {
            this.jugador2.origen = celda
        } else if (this.jugadorActual.id === 2 && this.jugador2.origen) {
            this.colocacion2(celda)
        }
    }

    cambiarTurno() {
        if (this.jugadorActual.id === this.jugador1.id) {
            this.jugadorActual = this.jugador2
        } else {
            this.jugadorActual = this.jugador1
        }
    }

    colocacion1(celda) {
        this.jugador1.hacerMovimiento(this.cuadricula, celda)
        this.cambiarTurno()
        this.redibujarTablero()
        this.jugador1.origen = null
    }

    colocacion2(celda) {
        this.jugador2.hacerMovimiento(this.cuadricula, celda)
        this.cambiarTurno()
        this.redibujarTablero()
        this.jugador2.origen = null
    }

    redibujarTablero() {
        if (this.tablero) {
            this.tablero.destroy()
            this.tablero = this.add.group()
        }

        for (const celda of this.cuadricula.toArray().filter(c => !(c instanceof Vacio))) {
            // const ficha = celda.ficha
            this.tablero.add(new FichaCartel(this, celda))
        }

    }

    finalizo() {
        return this.jugadorActual.bloqueado
            || this.findBy(this.jugador1.ficha.nombre).length === 0
            || this.findBy(this.jugador2.ficha.nombre).length === 0
            || this.empate
    }

    findBy(nombre) {
        return this.cuadricula.toArray().filter(({ ficha }) => ficha instanceof Ficha || ficha instanceof SuperFicha).filter(({ ficha }) => ficha.nombre === nombre)
    }

    changeScene() {
        this.scene.start('MainMenu');
    }
}