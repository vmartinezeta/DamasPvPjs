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
        this.turnoCartel = null
    }

    create() {
        this.add.image(512, 384, 'background')
        this.physics.world.setBounds(0, 0, 1024, 600)
        this.add.sprite(250, 0, 'tablero').setOrigin(0)

        const negro = new Ficha(1, "ficha-roja")
        const blanca = new Ficha(2, "ficha-amarilla")
        const espacio = new Espacio("ficha-espacio")
        this.cuadricula = new Cuadricula(negro, blanca, espacio)
        this.jugador1 = new Jugador(1, negro)
        this.jugador2 = new Jugador(2, blanca)
        this.jugadorActual = this.jugador1


        this.add.sprite(60, 100, negro.nombre).setOrigin(0.5)
        this.add.sprite(160, 100, blanca.nombre).setOrigin(0.5)
        this.add.text(60, 100, this.findBy(1).length, {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5).setDepth(100)

        this.add.text(160, 100, this.findBy(1).length, {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5).setDepth(100)

        this.add.text(60, 260, "Turno: ", {
            fontFamily: 'Arial Black', fontSize: 26, color: '#ffffff',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5).setDepth(100)
        
        this.turnoCartel = this.add.sprite(160, 260, this.jugadorActual.ficha.nombre).setOrigin(0.5)

        this.tablero = this.add.group()
        this.redibujarTablero()

        this.input.mouse.disableContextMenu()

        this.keyboard = this.input.keyboard.createCursorKeys()

        this.input.on('gameobjectdown', this.hacerMovimiento, this)

        EventBus.emit('current-scene-ready', this);
    }

    hacerMovimiento(_, gameObject) {
        if (!this.jugadorActual.origen) {
            this.iniciarMovimiento(gameObject)
        } else {
            this.finalizarMovimiento(gameObject)
        }
    }

    iniciarMovimiento(gameObject) {
        const celda = gameObject.celda
        if (celda.ficha instanceof Espacio
            || (celda.ficha instanceof Ficha && this.jugadorActual.ficha.id !== celda.ficha.id)) {
            return
        }

        gameObject.setTint(0x00ff00)
        celda.activa = !celda.activa
        this.jugadorActual.origen = celda
    }

    finalizarMovimiento(gameObject) {
        const celda = gameObject.celda

        if (celda.activa) {
            return this.cancelarMovimiento(gameObject)
        }

        if (!(celda.ficha instanceof Espacio)) {
            return
        }

        this.jugadorActual.hacerMovimiento(this.cuadricula, celda)
        this.redibujarTablero()
        celda.activa = !celda.activa
        this.jugadorActual.origen = null
        this.cambiarTurno()
        this.turnoCartel.destroy()
        this.turnoCartel = this.add.sprite(160, 260, this.jugadorActual.ficha.nombre).setOrigin(0.5)
    }

    cancelarMovimiento(gameObject) {
        gameObject.clearTint()
        const celda = gameObject.celda
        celda.activa = !celda.activa
        this.jugadorActual.origen = null
    }

    cambiarTurno() {
        if (this.jugadorActual.id === this.jugador1.id) {
            this.jugadorActual = this.jugador2
        } else {
            this.jugadorActual = this.jugador1
        }
    }

    redibujarTablero() {
        if (this.tablero) {
            this.tablero.destroy()
            this.tablero = this.add.group()
        }
        for (const celda of this.cuadricula.toArray().filter(c => !(c instanceof Vacio))) {
            console.log(celda)
            this.tablero.add(new FichaCartel(this, celda))
        }

    }

    finalizo() {
        return this.jugadorActual.bloqueado
            || this.findBy(this.jugador1.ficha.id).length === 0
            || this.findBy(this.jugador2.ficha.id).length === 0
            || this.empate
    }

    findBy(id) {
        return this.cuadricula.toArray()
            .filter(({ ficha }) => ficha instanceof Ficha || ficha instanceof SuperFicha).filter(({ ficha }) => ficha.id === id)
    }

    changeScene() {
        this.scene.start('MainMenu');
    }

    desabilitarOponentes() {
        this.tablero.forEach(sprite => {
            if (sprite.celda.ficha.nombre !== this.jugadorActual.ficha.nombre) {
                sprite.disableInteractive(); // Bloqueo físico
            } else {
                sprite.setInteractive(); // Asegurar que las propias estén activas
            }
        })
    }

}