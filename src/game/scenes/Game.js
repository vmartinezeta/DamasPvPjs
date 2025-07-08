import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { Cuadricula } from '../classes/Cuadricula'
import { Ficha } from '../classes/Ficha'
import { Espacio } from '../classes/Espacio'
import { Jugador } from '../classes/Jugador'
import { SuperFicha } from '../classes/SuperFicha'
import { Punto } from '../classes/Punto'
import { SistemaVision } from '../classes/SistemaVision'
import { SistemaRuta } from '../classes/SistemaRuta'
import Tablero from '../sprites/Tablero'
import TableroTurno from '../sprites/TableroTurno'
import Resume from '../sprites/Resume'


export class Game extends Scene {
    constructor() {
        super('Game')
        this.cuadricula = null
        this.tablero = null
        this.jugador1 = null
        this.jugador2 = null
        this.jugadorActual = null
        this.turnoCartel = null
        this.rutas = []
    }

    create() {
        this.add.image(512, 384, 'background')
        this.physics.world.setBounds(0, 0, 1024, 600)

        const sistema = new SistemaVision()
        const negro = new Ficha(1, "roja-normal", sistema)
        const blanca = new Ficha(2, "amarilla-normal", sistema.rotar())
        const espacio = new Espacio("espacio")
        this.cuadricula = new Cuadricula(negro, blanca, espacio, new Punto(0, 6), 100)
        this.jugador1 = new Jugador(negro)
        this.jugador2 = new Jugador(blanca)
        this.jugadorActual = this.jugador2

        this.resume = new Resume(this, new Punto(60, 100), 12, 12)

        this.tableroTurno = new TableroTurno(this, new Punto(160, 260), this.jugadorActual.ficha.id)
        this.tablero = new Tablero(this, new Punto(300, 0), this.cuadricula)
        this.tablero.bloquearOponentes(this.jugador2)

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
        this.tablero.bloquearOponentes(this.jugadorActual)

        if (celda.ficha instanceof Espacio
            || ((celda.ficha instanceof Ficha || celda.ficha instanceof SuperFicha) && this.jugadorActual.ficha.id !== celda.ficha.id)) {
            return
        }

        const sistema = new SistemaRuta(this.cuadricula, celda)
        this.rutas = sistema.generar()

        this.tablero.marcarRutas(this.rutas)
        this.tablero.habilitarRutas(this.rutas)

        this.jugadorActual.origen = celda
    }

    finalizarMovimiento(gameObject) {
        let celda = gameObject.celda
        const nuevo = celda.clone()

        if ((celda.ficha instanceof Ficha || celda.ficha instanceof SuperFicha)
            && celda.ficha.isIgual(this.jugadorActual.ficha.id)) {
            return this.terminarMovimiento()
        }

        const ruta = this.rutas.find(r => r.getEspaciosDestino().map(c => c.ubicacion.virtual.toString()).includes(celda.ubicacion.virtual.toString()))
        if (ruta.tieneKO()) {
            this.jugadorActual.hacerMovConKO(this.cuadricula, ruta, celda)
        } else {
            this.jugadorActual.hacerMovimiento(this.cuadricula, celda)            
        }

        if (this.cuadricula.estaEnLimiteHorizontal(nuevo.ubicacion.virtual)) {
            this.coronar(nuevo)
        }

        this.terminarMovimiento()
        this.cambiarTurno()        

        const mainMenu = this.scene.manager.getScene("MainMenu")
        const config = mainMenu.configuracion
        if (config && config.habilitarAnimacion) {
            this.tablero.rotar(() => {
                this.tablero.redibujar()
            })
        } else {
            this.tablero.redibujar()
        }

        this.resume.updateTablero(this.findBy(1).length, this.findBy(2).length)
        this.tableroTurno.updateTablero(this.jugadorActual.ficha.id)
    }

    terminarMovimiento() {
        this.tablero.redibujar()
        this.rutas = []
        this.jugadorActual.origen = null
        // if (this.rutas.length === 0) {
        //     this.jugadorActual.bloqueado = true
        // }
        if (this.jugador1.movimientosSinCaptura === this.jugador2.movimientosSinCaptura && this.jugadorActual.cantidadMax===this.jugadorActual.movimientosSinCaptura) {
            this.jugadorActual.empate = true            
        }

        if (this.finalizoJuego()) {
            if (!this.jugadorActual.bloqueado && this.jugadorActual.id === this.jugador1.id
                || !this.jugadorActual.bloqueado && this.jugadorActual.id === this.jugador2.id
                || !this.jugadorActual.empate
                || this.findBy(1).length === 0
                || this.findBy(2).length === 0 
            ) {
                console.log("Haz ganado")
            } else if (this.jugadorActual.empate) {
                console.log("empataron")
            }
        }
    }

    coronar(celda) {
        const ficha = this.jugadorActual.ficha
        if (ficha.isIgual(1)) {
            celda.ficha = ficha.subir("roja-reina")
        } else if (ficha.isIgual(2)) {
            celda.ficha = ficha.subir("amarilla-reina")
        }

        this.cuadricula.updateCelda(celda)
    }

    cambiarTurno() {
        if (this.jugadorActual.ficha.id === this.jugador1.ficha.id) {
            this.jugadorActual = this.jugador2
        } else {
            this.jugadorActual = this.jugador1
        }
    }

    finalizoJuego() {
        return this.jugadorActual.bloqueado
            || this.findBy(this.jugador1.ficha.id).length === 0
            || this.findBy(this.jugador2.ficha.id).length === 0
            || this.jugadorActual.empate
    }

    findBy(id) {
        return this.cuadricula.toArray()
            .filter(({ ficha }) => ficha instanceof Ficha || ficha instanceof SuperFicha).filter(({ ficha }) => ficha.id === id)
    }

    changeScene() {
        this.scene.start('MainMenu');
    }

}