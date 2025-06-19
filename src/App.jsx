import { useRef, useState } from 'react'
import { PhaserGame } from './game/PhaserGame'
import CentroControl from './Components/CentroControl'
import Configuracion from './Components/Configuracion'


function App() {
    const phaserRef = useRef()
    const [scene, setScene] = useState(null)

    const currentScene = (scene) => {
        setScene(scene)    
    }

    return <div className="app">
        <div className="centro">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            {
                scene && scene.scene.key==="HowTo" && <Configuracion />
            }      
        </div>
        <div>
            <CentroControl scene={scene} currentScene={currentScene} />
        </div>
    </div>
}

export default App