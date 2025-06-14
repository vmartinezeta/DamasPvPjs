import App from "../App"

// eslint-disable-next-line react/prop-types
function Intro({abierto, toggle}) {
    if (abierto) {
    return <div className="intro intro__animado">
            <div className="intro intro__centrado">
                <div className="intro__main">
                    <div className="intro__control">
                        <h1 className="intro__titulo">Damas PvP</h1>
                        <div className="intro__control__input">
                            <button className="intro__control__button" onClick={toggle}>Continuar</button>
                        </div>
                    </div>
                </div>
                <div className="creditos">
                    <h1 className="creditos__titulo">
                        &copy; Víctor Martínez
                        <span></span>
                    </h1>
                </div>
            </div>
        </div>
    }

    return <App />
}

export default Intro