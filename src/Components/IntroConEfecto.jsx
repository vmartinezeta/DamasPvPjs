import { useState } from "react"
import { GameProvider } from "../context/GameContext"
import Intro from "./Intro"


export default function IntroConEfecto() {
    const [abierto, setAbierto] = useState(true)

    const toggle = () => {
        setAbierto(!abierto)
    }

    return <GameProvider>
        <Intro abierto={abierto} toggle={toggle} />
    </GameProvider>
}