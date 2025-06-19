export class DamasAI {
    constructor(dificultad = 'intermedia') {
        this.dificultad = dificultad;
    }

    // Detectar si el oponente puede capturar nuestras piezas
    detectarAmenazas(tablero, jugador) {
        const amenazas = [];
        const oponente = jugador === 1 ? 2 : 1;

        for (let x = 0; x < tablero.length; x++) {
            for (let y = 0; y < tablero[x].length; y++) {
                const pieza = tablero[x][y];

                if (pieza && pieza.jugador === oponente) {
                    // Verificar si esta pieza enemiga puede capturar alguna nuestra
                    const capturasPosibles = this.obtenerCapturasPosibles(tablero, {x, y});
                    
                    capturasPosibles.forEach(captura => {
                        const [xDestino, yDestino] = captura.destino;
                        const [xCapturada, yCapturada] = captura.capturada;
                        
                        // Verificar si la pieza a capturar es nuestra
                        if (tablero[xCapturada][yCapturada]?.jugador === jugador) {
                            amenazas.push({
                                atacante: {x, y},
                                victima: {x: xCapturada, y: yCapturada},
                                destino: {x: xDestino, y: yDestino}
                            });
                        }
                    });
                }
            }
        }
        
        return amenazas;
    }

    obtenerCapturasPosibles(tablero, posicion) {
        const {x, y} = posicion;
        const pieza = tablero[x][y];
        const capturas = [];
        
        if (!pieza) return capturas;
        
        // Direcciones de captura (depende si es dama o peón)
        const direcciones = pieza.esDama ? 
            [{dx: 1, dy: 1}, {dx: 1, dy: -1}, {dx: -1, dy: 1}, {dx: -1, dy: -1}] :
            (pieza.jugador === 1 ? 
                [{dx: 1, dy: 1}, {dx: 1, dy: -1}] : 
                [{dx: -1, dy: 1}, {dx: -1, dy: -1}]);
        
        for (const dir of direcciones) {
            const xIntermedia = x + dir.dx;
            const yIntermedia = y + dir.dy;
            const xDestino = x + 2 * dir.dx;
            const yDestino = y + 2 * dir.dy;
            
            if (this.esPosicionValida(xDestino, yDestino)) {
                const piezaIntermedia = tablero[xIntermedia][yIntermedia];
                const casillaDestino = tablero[xDestino][yDestino];
                
                if (piezaIntermedia && piezaIntermedia.jugador !== pieza.jugador && !casillaDestino) {
                    capturas.push({
                        destino: [xDestino, yDestino],
                        capturada: [xIntermedia, yIntermedia]
                    });
                }
            }
        }
        
        return capturas;
    }

    esPosicionValida(x, y) {
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }
}


export class Damas {
    // ... código anterior ...

    generarMovimientoDefensivo(tablero, jugador) {
        const amenazas = this.detectarAmenazas(tablero, jugador);
        console.log(amenazas)
        // Si hay amenazas, priorizar defender
    }
}


class DamasGame {
    // ... código anterior ...

    verificarAmenazaSobreFicha(x, y, tablero) {
        const ficha = tablero[x][y];
        if (!ficha) return null;

        const jugador = ficha.jugador;
        const oponente = jugador === 1 ? 2 : 1;
        const direcciones = ficha.esDama ? 
            [{dx: 1, dy: 1}, {dx: 1, dy: -1}, {dx: -1, dy: 1}, {dx: -1, dy: -1}] :
            (jugador === 1 ? 
                [{dx: -1, dy: 1}, {dx: -1, dy: -1}] : // Peones avanzan hacia arriba (jugador 1)
                [{dx: 1, dy: 1}, {dx: 1, dy: -1}]);  // Peones avanzan hacia abajo (jugador 2)

        for (const dir of direcciones) {
            const xAtras = x - dir.dx;
            const yAtras = y - dir.dy;
            const xDestino = x - 2 * dir.dx;
            const yDestino = y - 2 * dir.dy;

            if (this.esPosicionValida(xAtras, yAtras) && 
                this.esPosicionValida(xDestino, yDestino)) {
                const fichaAtras = tablero[xAtras][yAtras];
                const casillaDestino = tablero[xDestino][yDestino];

                if (fichaAtras && fichaAtras.jugador === oponente && !casillaDestino) {
                    return {
                        atacante: {x: xAtras, y: yAtras},
                        destino: {x: xDestino, y: yDestino},
                        victima: {x, y}
                    };
                }
            }
        }

        return null; // No hay amenaza inmediata
    }
}


class DamasGame {
    // ... código anterior ...

    obtenerOportunidadesCaptura(tablero, jugador) {
        const oportunidades = [];
        
        for (let x = 0; x < tablero.length; x++) {
            for (let y = 0; y < tablero[x].length; y++) {
                const ficha = tablero[x][y];
                
                if (ficha && ficha.jugador === jugador) {
                    const capturas = this.obtenerCapturasParaFicha(tablero, x, y);
                    if (capturas.length > 0) {
                        oportunidades.push({
                            ficha: {x, y},
                            capturas: capturas
                        });
                    }
                }
            }
        }
        
        // Ordenar por la mejor oportunidad (captura de dama primero, luego peones)
        oportunidades.sort((a, b) => {
            const valorA = Math.max(...a.capturas.map(c => c.piezaCapturada.esDama ? 3 : 1));
            const valorB = Math.max(...b.capturas.map(c => c.piezaCapturada.esDama ? 3 : 1));
            return valorB - valorA;
        });
        
        return oportunidades;
    }

    obtenerCapturasParaFicha(tablero, x, y) {
        const ficha = tablero[x][y];
        if (!ficha) return [];
        
        const capturas = [];
        const direcciones = ficha.esDama ? 
            [{dx: 1, dy: 1}, {dx: 1, dy: -1}, {dx: -1, dy: 1}, {dx: -1, dy: -1}] :
            (ficha.jugador === 1 ? 
                [{dx: 1, dy: 1}, {dx: 1, dy: -1}] : 
                [{dx: -1, dy: 1}, {dx: -1, dy: -1}]);
        
        for (const dir of direcciones) {
            const xIntermedia = x + dir.dx;
            const yIntermedia = y + dir.dy;
            const xDestino = x + 2 * dir.dx;
            const yDestino = y + 2 * dir.dy;
            
            if (this.esPosicionValida(xIntermedia, yIntermedia) && 
                this.esPosicionValida(xDestino, yDestino)) {
                const fichaIntermedia = tablero[xIntermedia][yIntermedia];
                const casillaDestino = tablero[xDestino][yDestino];
                
                if (fichaIntermedia && 
                    fichaIntermedia.jugador !== ficha.jugador && 
                    !casillaDestino) {
                    capturas.push({
                        destino: {x: xDestino, y: yDestino},
                        piezaCapturada: fichaIntermedia,
                        esSecuencia: this.verificarCapturaMultiple(tablero, xDestino, yDestino)
                    });
                }
            }
        }
        
        return capturas;
    }

    verificarCapturaMultiple(tablero, x, y) {
        // Verificar si desde la nueva posición se pueden hacer más capturas
        const ficha = tablero[x][y]; // Asumiendo que la ficha ya se movió aquí
        if (!ficha) return false;
        
        const direcciones = ficha.esDama ? 
            [{dx: 1, dy: 1}, {dx: 1, dy: -1}, {dx: -1, dy: 1}, {dx: -1, dy: -1}] :
            (ficha.jugador === 1 ? 
                [{dx: 1, dy: 1}, {dx: 1, dy: -1}] : 
                [{dx: -1, dy: 1}, {dx: -1, dy: -1}]);
        
        for (const dir of direcciones) {
            const xIntermedia = x + dir.dx;
            const yIntermedia = y + dir.dy;
            const xDestino = x + 2 * dir.dx;
            const yDestino = y + 2 * dir.dy;
            
            if (this.esPosicionValida(xIntermedia, yIntermedia)) {
                const fichaIntermedia = tablero[xIntermedia][yIntermedia];
                if (fichaIntermedia && 
                    fichaIntermedia.jugador !== ficha.jugador && 
                    this.esPosicionValida(xDestino, yDestino) && 
                    !tablero[xDestino][yDestino]) {
                    return true;
                }
            }
        }
        
        return false;
    }
}


class GameScene extends Phaser.Scene {
    // ... código anterior ...

    onFichaMovida(fichaMovida, nuevaPos) {
        // 1. Verificar si la ficha movida está en peligro
        const amenaza = this.damasGame.verificarAmenazaSobreFicha(
            nuevaPos.x, nuevaPos.y, this.tablero
        );
        
        if (amenaza) {
            this.mostrarAlertaAmenaza(amenaza);
        }
        
        // 2. Verificar oportunidades de captura para el jugador actual
        const oportunidades = this.damasGame.obtenerOportunidadesCaptura(
            this.tablero, 
            this.jugadorActual
        );
        
        if (oportunidades.length > 0) {
            this.resaltarOportunidades(oportunidades);
        }
        
        // 3. Verificar si el movimiento actual es parte de una captura múltiple
        if (this.capturaEnCurso) {
            const puedeSeguirCapturando = this.damasGame.verificarCapturaMultiple(
                this.tablero,
                nuevaPos.x,
                nuevaPos.y
            );
            
            if (!puedeSeguirCapturando) {
                this.capturaEnCurso = false;
                this.cambiarTurno();
            }
        }
    }

    mostrarAlertaAmenaza(amenaza) {
        const {x, y} = amenaza.victima;
        const grafico = this.add.graphics();
        grafico.lineStyle(4, 0xff0000, 1);
        grafico.strokeRect(x * 64, y * 64, 64, 64);
        
        this.time.delayedCall(2000, () => {
            grafico.destroy();
        });
    }

    resaltarOportunidades(oportunidades) {
        // Resaltar las mejores 3 oportunidades
        oportunidades.slice(0, 3).forEach(op => {
            const {x, y} = op.ficha;
            const grafico = this.add.graphics();
            grafico.lineStyle(4, 0x00ff00, 1);
            grafico.strokeRect(x * 64, y * 64, 64, 64);
            
            this.time.delayedCall(2000, () => {
                grafico.destroy();
            });
        });
    }
}


class DamasGame {
    // ... código anterior ...

    verificarVictoria(tablero) {
        const fichasJugador1 = this.contarFichas(tablero, 1);
        const fichasJugador2 = this.contarFichas(tablero, 2);
        
        if (fichasJugador1 === 0 || !this.tieneMovimientosValidos(tablero, 1)) {
            return { ganador: 2, razon: fichasJugador1 === 0 ? "Sin fichas" : "Sin movimientos" };
        }
        
        if (fichasJugador2 === 0 || !this.tieneMovimientosValidos(tablero, 2)) {
            return { ganador: 1, razon: fichasJugador2 === 0 ? "Sin fichas" : "Sin movimientos" };
        }
        
        return null; // No hay ganador aún
    }

    contarFichas(tablero, jugador) {
        let count = 0;
        for (const fila of tablero) {
            for (const celda of fila) {
                if (celda && celda.jugador === jugador) {
                    count++;
                }
            }
        }
        return count;
    }

    tieneMovimientosValidos(tablero, jugador) {
        for (let x = 0; x < tablero.length; x++) {
            for (let y = 0; y < tablero[x].length; y++) {
                const ficha = tablero[x][y];
                if (ficha && ficha.jugador === jugador) {
                    const movimientos = this.obtenerMovimientosValidos(tablero, x, y);
                    if (movimientos.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}


function mostrarSugerencia() {
    const mejorMovimiento = this.ia.obtenerMejorMovimiento(this.tablero, this.jugadorActual);
    if (mejorMovimiento) {
        // Dibujar flecha o efecto visual desde origen a destino
    }
}



class GameScene extends Phaser.Scene {
    preload() {
        // Carga un sprite temporal para debugging
        this.load.image('debug', 'assets/debug.png');
    }

    resaltarProblema(posicion, mensaje) {
        const sprite = this.add.sprite(posicion.x * 64 + 32, posicion.y * 64 + 32, 'debug');
        sprite.setTint(0xff0000); // Rojo para errores
        
        const texto = this.add.text(
            posicion.x * 64, 
            posicion.y * 64 - 20, 
            mensaje, 
            { fontSize: '12px', fill: '#ff0000' }
        );
        
        this.time.delayedCall(3000, () => {
            sprite.destroy();
            texto.destroy();
        });
    }
}

// Uso cuando detectes un estado inválido:
if (!movimientoValido) {
    this.resaltarProblema(
        {x: ficha.x, y: ficha.y}, 
        "¡Movimiento inválido!"
    );
}


// En tu escena Phaser:
if (this.input.keyboard.checkDown(Phaser.Input.Keyboard.KeyCodes.F3)) {
    console.log("Estado actual:", JSON.stringify(this.tablero));
    this.mostrarCoordenadas = !this.mostrarCoordenadas; // Alternar visibilidad
}



this.historialMovimientos = [];

// Al hacer un movimiento:
this.historialMovimientos.push({
    turno: this.jugadorActual,
    desde: {x, y},
    hacia: {nx, ny},
    timestamp: Date.now()
});


function checkReglasVioladas() {
    const errors = [];
    
    // Ejemplo: Verificar si hay capturas obligatorias ignoradas
    const capturasPosibles = this.obtenerTodasCapturas(this.jugadorActual);
    if (capturasPosibles.length > 0 && !this.ultimoMovimientoFueCaptura) {
        errors.push("¡Error de reglas: Captura obligatoria no realizada!");
    }
    
    return errors;
}


function exportGameState() {
    return {
        tablero: this.tablero.map(fila => [...fila]),
        jugadorActual: this.jugadorActual,
        historial: [...this.historialMovimientos],
        timestamp: Date.now()
    };
}

// Para guardar en consola cuando ocurra un error:
console.error("Estado al fallar:", JSON.stringify(this.exportGameState()));