import { useState } from "react";
import App from "../App";
import { GameProvider } from "../context/GameContext";


export default function Intro() {
    const [abierto, setAbierto] = useState(false)

    const toggle = () => {
        setAbierto(!abierto)
    }

    return <GameProvider>
        {!abierto && <div className="intro" >
            <div className="intro__control">
                <h1 className="intro__titulo">Damas PvP</h1>            
                <div className="intro__control__input">
                    <button className="intro__control__button" onClick={toggle}>Continuar</button>
                </div>
            </div>
        </div>}
        {abierto && <App />}
    </GameProvider>
}
