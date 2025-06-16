import Phaser from "phaser"
import { Vacio } from "../classes/Vacio";
import { FichaCartel } from "./FichaCartel";

export default class Tablero extends Phaser.GameObjects.Container {
    constructor(scene, origen, cuadricula) {
        super(scene, origen.x, origen.y)
        this.cuadricula = cuadricula
        this.scene = scene
        scene.add.existing(this); // Añade el container a la escena
        // En el constructor de tu clase TableroDamas:

        // Configuración
        this.cellSize = 100; // Tamaño de cada celda
        this.anguloActual = 0; // Ángulo de rotación inicial
        this.jugadorActual = 'blanco'; // Turno inicial
        this.setScale(.75)
        // Matriz lógica (8x8): null = vacío, 'blanco'/'negro' = fichas
        this.matrizLogica = this.crearMatrizInicial();

        // Elementos visuales
        this.celdas = []; // Referencias a los sprites de celdas
        this.fichas = []; // Referencias a los sprites de fichas

        // Inicializar
        this.crearTableroVisual();
        this.crearFichasIniciales();

        // // Después de añadir todas las celdas/fichas:
        this.setSize(8 * this.cellSize, 8 * this.cellSize); // Ancho = 8 celdas * tamaño
    }

    // --- MÉTODOS PRINCIPALES ---
    crearMatrizInicial() {
        const matriz = Array(8).fill().map(() => Array(8).fill(null));
        // Fichas negras (arriba en estado inicial)
        for (let y = 0; y < 3; y++) {
            for (let x = (y % 2); x < 8; x += 2) {
                matriz[y][x] = 'negro';
            }
        }

        // Fichas blancas (abajo en estado inicial)
        for (let y = 5; y < 8; y++) {
            for (let x = (y % 2); x < 8; x += 2) {
                matriz[y][x] = 'blanco';
            }
        }

        return matriz;
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
                    (x + y) % 2 === 0 ? 0xFFFFFF : 0x000000
                )
                celda.setOrigin(0)
                celda.on('pointerdown', () => this.onCeldaClick(x, y));
                this.add(celda); // Añade al Container
                this.celdas[y][x] = celda;
            }
        }
    }

    crearFichasIniciales() {
        for (const celda of this.cuadricula.toArray().filter(c => !(c instanceof Vacio))) {
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
            const origen = celda.origen
            const cartel = this.fichas.find(f => f.getData(origen.toString()))
            const x = 100 * celda.origen.y + 50
            const y = 100 * celda.origen.x + 50
            this.scene.tweens.add({
                targets: cartel,
                x: x,
                y: y,
                duration: 300,
                ease: 'Power2'
            });
        }
     
    }

}