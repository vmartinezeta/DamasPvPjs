import Phaser from "phaser"
import { Vacio } from "../classes/Vacio"
import { FichaCartel } from "./FichaCartel"
import { Celda } from "../classes/Celda"
import { Espacio } from "../classes/Espacio"

export default class Tablero extends Phaser.GameObjects.Container {
    constructor(scene, origen, cuadricula) {
        super(scene, origen.x, origen.y)
        this.scene = scene
        this.origen = origen
        this.cuadricula = cuadricula
        this.cellSize = 100
        this.angle = 0
        this.anguloFinal = 180
        this.setScale(3/4)
        
        this.celdas = []
        this.fichas = []
        this.graficos = []
        
        this.crearTableroVisual()
        this.crearFichasIniciales()
        scene.add.existing(this)
    }

    crearTableroVisual() {
        // Crea las celdas del tablero (como hijos del Container)
        for (let y = 0; y < 8; y++) {
            this.celdas[y] = [];
            for (let x = 0; x < 8; x++) {
                const celda = this.scene.add.rectangle(
                    x * this.cellSize,
                    y * this.cellSize,
                    this.cellSize - 2,
                    this.cellSize - 2,
                    (x + y) % 2 === 0 ? 0xffffff : 0x000000
                )
                celda.setOrigin(0)
                // celda.on('pointerdown', () => this.onCeldaClick(x, y));
                this.add(celda); // Añade al Container
                this.celdas[y][x] = celda
            }
        }
    }

    crearFichasIniciales() {
        for (const celda of this.cuadricula.toArray().filter(c => c instanceof Celda)) {
            const ficha = new FichaCartel(this.scene, celda)
            this.fichas.push(ficha)
            this.add(ficha)
        }
    }

    rotar() {
        this.cuadricula.rotarMatriz180()

        this.scene.tweens.add({
            targets: this,
            angle: this.angle + this.anguloFinal,
            duration: 1000,
            ease: 'Sine.InOut',
            onComplete: () => {
                this.actualizarFichas()
                this.redibujar()
            }
        })
    }

    actualizarFichas() {
        for (const celda of this.cuadricula.toArray().filter(c => !(c instanceof Vacio))) {
            const origen = celda.ubicacion.virtual
            const cartel = this.fichas.find(f => f.key === origen.toString())
            const { x, y } = celda.ubicacion.fisica
            this.scene.tweens.add({
                targets: cartel,
                x,
                y,
                duration: 300,
                ease: 'Power2'
            });
        }

    }

    bloquearOponentes(jugadorActual) {
        this.fichas.forEach(sprite => {
            if (sprite.celda.ficha.id !== jugadorActual.ficha.id
                || sprite.celda.ficha instanceof Espacio
            ) {
                sprite.disableInteractive(); // Bloqueo físico
            } else {
                sprite.setInteractive(); // Asegurar que las propias estén activas
            }
        })
    }

    habilitarRutas(rutas) {
        for(const r of rutas) {
            this.habilitarRuta(r)
        }
    }

    habilitarRuta(ruta) {
        for (const c of ruta.getEspaciosDestino()) {
            const {virtual} = c.ubicacion
            const sprite = this.fichas.find(f => f.key === virtual.toString())
            if (sprite) {
                  sprite.setInteractive()
            }
        }
    }

    marcarRutas(rutas) {
        for(const r of rutas) {
            for(const c of r.celdas) {
                this.marcarCelda(c)
            }
        }
    }

    marcarCelda(celda) {
        const {x, y} = celda.ubicacion.fisica
        const grafico = this.scene.add.graphics()
        grafico.lineStyle(4, 0x00ff00)
        grafico.strokeRect(x+400, y-6, 100, 100)
        grafico.setScale(.75)
        this.graficos.push(grafico)
    }

    redibujar() {
        for(const g of this.graficos) {
            g.destroy()
        }
        this.graficos = []

        for(const s of this.fichas) {
            s.destroy()
        }
        this.fichas = []
        this.angle = 0        
        this.crearFichasIniciales()
    }
}