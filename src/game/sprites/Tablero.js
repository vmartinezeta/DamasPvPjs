import Phaser from "phaser"
import { Vacio } from "../classes/Vacio"
import { FichaCartel } from "./FichaCartel"
import { Celda } from "../classes/Celda"
import { Espacio } from "../classes/Espacio"

export default class Tablero extends Phaser.GameObjects.Container {
    constructor(scene, origen, cuadricula) {
        super(scene, origen.x, origen.y)
        this.cuadricula = cuadricula
        this.scene = scene
        scene.add.existing(this) // Añade el container a la escena
        // En el constructor de tu clase TableroDamas:

        // Configuración
        this.cellSize = 100; // Tamaño de cada celda
        this.anguloActual = 0; // Ángulo de rotación inicial
        this.setScale(.75)
        // Matriz lógica (8x8): null = vacío, 'blanco'/'negro' = fichas

        // Elementos visuales
        this.celdas = []; // Referencias a los sprites de celdas
        this.fichas = []; // Referencias a los sprites de fichas

        // Inicializar
        this.crearTableroVisual()
        this.crearFichasIniciales()
        // // Después de añadir todas las celdas/fichas:
        this.setSize(8 * this.cellSize, 8 * this.cellSize); // Ancho = 8 celdas * tamaño
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

    rotar(callback) {
        this.cuadricula.rotarMatriz180()

        this.scene.tweens.add({
            targets: this,
            angle: this.angle + 180,
            duration: 1000,
            ease: 'Sine.InOut',
            onComplete: () => {
                this.actualizarPosicionesFichas()
                callback()
            }
        });
    }

    actualizarPosicionesFichas() {
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

    habilitarRuta(ruta) {
        for (const c of ruta.celdas) {
            const {virtual} = c.ubicacion
            const sprite = this.fichas.find(f => f.key === virtual.toString())
            if (sprite) {
                  sprite.setInteractive()
            }
        }
    }
}