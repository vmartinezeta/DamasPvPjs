import { createContext, useContext, useState } from 'react'
import useSound from 'use-sound'
import urlSound from "../audio/musica-fondo.mp3"
import PropTypes from "prop-types"


const GameContext = createContext()

export const useGame = () => {
    const context = useContext(GameContext)
    if (!context) {
        throw new TypeError()
    }
    return context
}


export function GameProvider({ children }) {
    const [play, { stop }] = useSound(urlSound, { loop: true })
    const [toggleMusica, setToggleMusica] = useState(false)
    const [configuracion, setConfiguracion] = useState({
        reglas: "internacional",
        forzarCaptura: false,
        forzarCapturaMax: false,
        habilitarAnimacion: true,
        musicaFondoAutomatica: true
    })

    const onToggleMusica = () => {
        const toggle = !toggleMusica
        if (toggle) {
            play()
        } else {
            stop()
        }

        setToggleMusica(toggle)
    }

    const updateConfig = (evento) => {
        const nuevo = { ...configuracion }
        if (evento.target.name in nuevo && evento.target.name!=="reglas") {
            nuevo[evento.target.name] = !nuevo[evento.target.name]
        } else if(evento.target.name in nuevo && evento.target.name==="reglas"){
            nuevo[evento.target.name] = evento.target.value
        }

        setConfiguracion(nuevo)
    }

    return <GameContext.Provider value={{
        configuracion,
        onToggleMusica,
        play,
        setToggleMusica,
        updateConfig
    }}>
        {children}
    </GameContext.Provider>
}


GameProvider.propTypes = {
    children: PropTypes.node
}