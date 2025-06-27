export class FichaDamas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, color) {
        super(scene, x, y, `${color}-normal`)

        this.scene = scene;
        this.color = color;
        this.esReina = false;

        // Añade el sprite a la escena y lo hace interactivo
        scene.add.existing(this)
        this.setInteractive()
        
        // Configura propiedades comunes
        this.setOrigin(0)
        this.setScale(0.8) // Ajusta según necesidad
    }

    convertirEnReina() {
        if (!this.esReina) {
            this.setTexture(`${this.color}-reina`);
            this.esReina = true;
            this.mostrarEfectoConversion();
        }
    }

    mostrarEfectoConversion() {
        // Efecto visual al convertirse en reina
        this.scene.tweens.add({
            targets: this,
            scaleX: { from: 0.8, to: 1 },
            scaleY: { from: 0.8, to: 1 },
            duration: 300,
            ease: 'Back.out',
            onComplete: () => {
                console.log("works")
                // this._transformandose = false;
                // particulas.destroy(); // Limpieza
            }
        });

        // Efecto de brillo
        this.scene.tweens.add({
            targets: this,
            alpha: { from: 0.8, to: 1.5 },
            duration: 200,
            yoyo: true
        })        
    }
}