import { useState } from "react"
import Intro from "./Intro"
import { GameProvider } from "../context/GameContext"


export default function IntroConEfecto() {
    const [abierto, setAbierto] = useState(true)

    const toggle = () => {
        setAbierto(!abierto)
    }

    return <GameProvider >
        <Intro abierto={abierto} toggle={toggle} />
    </GameProvider>
}