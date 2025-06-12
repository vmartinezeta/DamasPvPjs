import { useRef, useState } from 'react'
import { PhaserGame } from './game/PhaserGame'
import { useGame } from './context/GameContext'
import "./estilos.css"


function App    () {
    const [centroControl, setCentroControl] = useState({ play: false, salir: true })
    const phaserRef = useRef();
    const { onToggleMusica } = useGame()


    const changeScene = () => {
        const scene = phaserRef.current.scene
        if (scene) {
            scene.changeScene()
        }
    }

    const play = () => {
        const scene = phaserRef.current.scene
        if (scene && scene.scene.key === "MainMenu") {
            scene.play()
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {
        if (scene.scene.key === "MainMenu") {
            setCentroControl({ play: false, salir: true })
        } else if (scene.scene.key === "Game" ) {
            setCentroControl({ play: true, salir: false })
        }
    }

    return (
        <div id="app">
            <div className="centro">
                <PhaserGame ref={phaserRef} currentActiveScene={(scene) => {
                    currentScene(scene)
                }} />
            </div>
            <div>
                <div>
                    <button disabled={centroControl.play} className="button" onClick={play}>Play</button>
                </div>
                <div>
                    <button disabled={centroControl.salir} className="button" onClick={changeScene}>Salir</button>
                </div>
                <div>
                    <button className="button" onClick={() => onToggleMusica()}>Toggle Musíca</button>
                </div>
            </div>
        </div>
    )
}

export default App