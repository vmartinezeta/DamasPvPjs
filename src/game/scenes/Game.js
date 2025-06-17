import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { Cuadricula } from '../classes/Cuadricula'
import { Ficha } from '../classes/Ficha'
import { Espacio } from '../classes/Espacio'
import { Jugador } from '../classes/Jugador'
import { SuperFicha } from '../classes/SuperFicha'
import Resume from '../sprites/Resume'
import Tablero from '../sprites/Tablero'
import { Punto } from '../classes/Punto'
import TableroTurno from '../sprites/TableroTurno'
import { SistemaVision } from '../classes/SistemaVision'

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

        const sistema = new SistemaVision()
        const negro = new Ficha(1, "ficha-roja", sistema)
        const blanca = new Ficha(2, "ficha-amarilla", sistema.rotar())
        const espacio = new Espacio("ficha-espacio")
        this.cuadricula = new Cuadricula(negro, blanca, espacio, new Punto(50, 50), 100)
        this.jugador1 = new Jugador(negro)
        this.jugador2 = new Jugador(blanca)
        this.jugadorActual = this.jugador2

        this.resume = new Resume(this, new Punto(60, 100), 12, 12)

        this.tableroTurno = new TableroTurno(this, new Punto(160, 260), this.jugadorActual.ficha.id)
        this.tablero = new Tablero(this, new Punto(300, 0), this.cuadricula)

        this.cameras.main.setBounds(0, 0, 800, 600); // Ajusta al tamaño del juego

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
        celda.activa = !celda.activa
        this.jugadorActual.origen = null
        this.cambiarTurno()
        this.tablero.rotar(() => {
            this.tablero = new Tablero(this, new Punto(300, 0), this.cuadricula)
        })

        this.tableroTurno.updateTablero(this.jugadorActual.ficha.id)
    }

    cancelarMovimiento(gameObject) {
        gameObject.clearTint()
        const celda = gameObject.celda
        celda.activa = !celda.activa
        this.jugadorActual.origen = null
    }

    cambiarTurno() {
        if (this.jugadorActual.ficha.id === this.jugador1.ficha.id) {
            this.jugadorActual = this.jugador2
        } else {
            this.jugadorActual = this.jugador1
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