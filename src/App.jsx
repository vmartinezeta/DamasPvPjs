import { useRef, useState } from 'react'
import { PhaserGame } from './game/PhaserGame'
import CentroControl from './Components/CentroControl'
import Configuracion from './Components/Configuracion'
import { useGame } from './context/GameContext'
import { configDamas } from './game/classes/Config'


function App() {
    const phaserRef = useRef()
    const [scene, setScene] = useState(null)
    const {configuracion, setConfiguracion} = useGame()

    const currentScene = (scene) => {
        setScene(scene)    
        if (scene.scene.key === "Game") return
        configurar()
    }

    const configurar = () => {
        const config = JSON.parse(localStorage.getItem('configuracionDamas') || "{}")
        if (configuracion && generateKey(config) === generateKey(configuracion)&&generateKey(config)!=="") {
            setConfiguracion(config)
        } else {
            localStorage.removeItem('configuracionDamas')
            localStorage.setItem('configuracionDamas', JSON.stringify(configuracion))
            setConfiguracion(configDamas)
        }
    }
    
    const generateKey = (obj) => {
        return Object.keys(obj).join("")
    }

    return <div className="app">
        <div className="centro">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            {
                scene && scene.scene.key==="HowTo" && <Configuracion />
            }  
        </div>
        <div>
            <CentroControl scene={scene} />
        </div>
    </div>
}

export default App