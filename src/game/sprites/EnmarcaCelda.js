// export class EnmarcaCelda extends Phaser.GameObjects.Graphics {
//     /**
//      * 
//      * @param {Phaser.Scene} scene - Escena de Phaser
//      * @param {Object} config - Configuración de los bordes
//      * @param {number} [config.cartesianOriginX=0] - Origen X en coordenadas cartesianas
//      * @param {number} [config.cartesianOriginY=0] - Origen Y en coordenadas cartesianas
//      * @param {number} [config.width=scene.scale.width] - Ancho del área
//      * @param {number} [config.height=scene.scale.height] - Alto del área
//      * @param {number} [config.lineWidth=1] - Grosor de la línea
//      * @param {number} [config.color=0xffffff] - Color de los bordes (hexadecimal)
//      * @param {number} [config.alpha=1] - Transparencia
//      * @param {boolean} [config.drawAxes=false] - Si dibuja los ejes X e Y
//      */
//     constructor(scene, config = {}) {
//         super(scene)

//         this.scene = scene
//         this.cartesianOrigin = {
//             x: config.cartesianOriginX || 0,
//             y: config.cartesianOriginY || 0
//         };
//         this.width = config.width || scene.scale.width;
//         this.height = config.height || scene.scale.height;
//         this.lineWidth = config.lineWidth || 1;
//         this.color = config.color !== undefined ? config.color : 0xffffff;
//         this.alpha = config.alpha !== undefined ? config.alpha : 1;
//         this.drawAxes = config.drawAxes || false;
//         this.setScale(.75)
//         // Posición en el mundo de Phaser (pantalla)
//         this.setPosition(0, 0);
        
//         // Añadir a la escena
//         scene.add.existing(this);
        
//         // Dibujar los bordes
//         this.drawBorders();
//     }
    
//     drawBorders() {
//         // Limpiar gráficos previos
//         this.clear();
        
//         // Convertir el origen cartesiano a coordenadas de pantalla
//         // (teniendo en cuenta que (0,0) en Graphics es su esquina superior izquierda)
//         const screenOriginX = this.width / 2 + this.cartesianOrigin.x;
//         const screenOriginY = this.height / 2 - this.cartesianOrigin.y;
        
//         // Coordenadas de los bordes en espacio cartesiano
//         const left = -screenOriginX;
//         const right = this.width - screenOriginX;
//         const top = -screenOriginY;
//         const bottom = this.height - screenOriginY;
        
//         // Dibujar el rectángulo de bordes
//         this.lineStyle(this.lineWidth, this.color, this.alpha);
//         this.strokeRect(
//             left,
//             top,
//             right - left,
//             bottom - top
//         );
        
//         // Dibujar ejes si está habilitado
//         if (this.drawAxes) {
//             // Eje X (en rojo)
//             this.lineStyle(1, 0xff0000, 0.5);
//             this.beginPath();
//             this.moveTo(left, -screenOriginY);
//             this.lineTo(right, -screenOriginY);
//             this.strokePath();
            
//             // Eje Y (en azul)
//             this.lineStyle(1, 0x0000ff, 0.5);
//             this.beginPath();
//             this.moveTo(screenOriginX, top);
//             this.lineTo(screenOriginX, bottom);
//             this.strokePath();
//         }
//     }
    
//     // Método para convertir coordenadas cartesianas a coordenadas de pantalla
//     cartesianToScreen(x, y) {
//         return {
//             x: this.width / 2 + x - this.cartesianOrigin.x,
//             y: this.height / 2 - y + this.cartesianOrigin.y
//         };
//     }
    
//     // Método para convertir coordenadas de pantalla a cartesianas
//     screenToCartesian(x, y) {
//         return {
//             x: x - this.width / 2 + this.cartesianOrigin.x,
//             y: this.height / 2 - y + this.cartesianOrigin.y
//         };
//     }
    
//     // Métodos para actualizar propiedades
//     setCartesianOrigin(x, y) {
//         this.cartesianOrigin.x = x;
//         this.cartesianOrigin.y = y;
//         this.drawBorders();
//         return this;
//     }
    
//     setSize(width, height) {
//         this.width = width;
//         this.height = height;
//         this.drawBorders();
//         return this;
//     }
    
//     setLineStyle(lineWidth, color, alpha) {
//         this.lineWidth = lineWidth;
//         this.color = color;
//         this.alpha = alpha;
//         this.drawBorders();
//         return this;
//     }
    
//     setDrawAxes(draw) {
//         this.drawAxes = draw;
//         this.drawBorders();
//         return this;
//     }
// }

export class EnmarcaCelda extends Phaser.GameObjects.Graphics {
    constructor(scene, config = {}) {
        super(scene);
        
        this.scene = scene;
        this.originX = config.x || 0;
        this.originY = config.y || 0;
        this.width = config.width || scene.scale.width;
        this.height = config.height || scene.scale.height;
        this.lineWidth = config.lineWidth || 1;
        this.color = config.color !== undefined ? config.color : 0xffffff;
        this.alpha = config.alpha !== undefined ? config.alpha : 1;
        this.setScale(.75)
        // Añadir a la escena
        scene.add.existing(this);
        
        // Dibujar los bordes
        this.drawBorders();
    }
    
    drawBorders() {
        // Limpiar gráficos previos
        this.clear();
        
        // Establecer estilo de línea
        this.lineStyle(this.lineWidth, this.color, this.alpha);
        
        // Convertir coordenadas cartesianas a coordenadas de pantalla de Phaser
        const screenOriginX = this.width / 2 + this.originX;
        const screenOriginY = this.height / 2 - this.originY;
        
        // Dibujar los bordes del área visible
        const left = -this.originX;
        const right = this.width - this.originX;
        const top = this.originY;
        const bottom = this.originY - this.height;
        
        // Dibujar rectángulo (bordes)
        this.strokeRect(
            this.originX,
            this.originY,
            this.width,
            this.height
        );
        
        // // Opcional: dibujar ejes X e Y
        // this.lineStyle(1, 0xff0000, 0.5);
        // // Eje X
        // this.beginPath();
        // this.moveTo(left, screenOriginY);
        // this.lineTo(right, screenOriginY);
        // this.strokePath();
        // // Eje Y
        // this.beginPath();
        // this.moveTo(screenOriginX, top);
        // this.lineTo(screenOriginX, bottom);
        // this.strokePath();
    }
    
    // Métodos para actualizar propiedades
    setOrigin(x, y) {
        this.originX = x;
        this.originY = y;
        this.drawBorders();
        return this;
    }
    
    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.drawBorders();
        return this;
    }
    
    setLineStyle(lineWidth, color, alpha) {
        this.lineWidth = lineWidth;
        this.color = color;
        this.alpha = alpha;
        this.drawBorders();
        return this;
    }
}