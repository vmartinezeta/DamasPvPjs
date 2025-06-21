import { useEffect } from "react"
import { useGame } from "../context/GameContext"


function CentroControl({ scene }) {
    const { configuracion, onToggleMusica,play, setToggleMusica} = useGame()

    useEffect(() => {
        if (!configuracion.musicaFondoAutomatica) return
        play()
        setToggleMusica(true)
    }, [])

    useEffect(()=> {
        if (!scene) {
            return
        }
        scene.setConfig(configuracion)

        localStorage.removeItem('configuracionDamas')
        localStorage.setItem('configuracionDamas', JSON.stringify(configuracion))
    }, [configuracion])


    const changeScene = () => {
        if (scene) {
            scene.changeScene()
        }
    }

    const playGame = () => {
        if (scene && scene.scene.key === "MainMenu") {
            scene.play()
        }
    }

    if (scene && scene.scene.key === "MainMenu") {
        return <div className="centro-control">
            <div>
                <button disabled={false} className="button" onClick={playGame} >Play</button>
            </div>
            <div>
                <button className="button" onClick={() => onToggleMusica()}>Toggle Musíca</button>
            </div>
            <div>
                <button className="button" onClick={() => {
                    if (scene) {
                        scene.howTo()
                    }
                }}>Ajustes</button>
            </div>
        </div>
    } else if (scene && scene.scene.key === "Game") {
        return <div className="centro-control">
            <div>
                <button disabled={false} className="button" onClick={changeScene} >Salir</button>
            </div>
            <div>
                <button className="button" onClick={() => onToggleMusica()}>Toggle Musíca</button>
            </div>
        </div>
    } else if (scene && scene.scene.key === "HowTo") {
        return <div className="centro-control">
            <div>
                <button className="button" onClick={() => onToggleMusica()}>Toggle Musíca</button>
            </div>
            <div>
                <button className="button" onClick={() => {
                    if (scene) {
                        scene.howTo()
                    }
                }}>Ajustes</button>
            </div>
        </div>
    }
}

export default CentroControl