import { useGame } from "../context/GameContext"


function Configuracion() {
    const { configuracion, updateConfig } = useGame()


    return <div className="contenedor">
        <div className="control">
            <h2 className="control__titulo">Configuración</h2>
            <form className="control__form">
                <div className="grupo">
                    <label htmlFor="reglas">Reglas:</label>
                    <select name="reglas" onChange={updateConfig} id="reglas">
                        <option value="Internacionales">Internacionales</option>
                        <option value="Españolas">Españolas</option>
                        <option value="Italianas">Italianas</option>
                    </select>
                </div>
                <div className="opciones-container">
                    <div className="opcion-checkbox">
                        <input onChange={updateConfig} name="forzarCaptura" type="checkbox" id="forzar-captura" />
                        <label htmlFor="forzar-captura">Forzar captura</label>
                    </div>
                    <div className="opcion-checkbox">
                        <input onChange={updateConfig} name="forzarCapturaMax" type="checkbox" id="forzar-captura-maxima" />
                        <label htmlFor="forzar-captura-maxima">Forzar captura maxima</label>
                    </div>
                    <div className="opcion-checkbox">
                        <input onChange={updateConfig} name="habilitarAnimacion" type="checkbox" id="habilitar-animacion" value={configuracion.habilitarAnimacion} defaultChecked={configuracion.habilitarAnimacion} />
                        <label htmlFor="habilitar-animacion">Habilitar animación</label>
                    </div>
                    <div className="opcion-checkbox">
                        <input onChange={updateConfig} name="musicaFondoAutomatica" type="checkbox" id="habilitar-musica-fondo" value={configuracion.musicaFondoAutomatica} defaultChecked={configuracion.musicaFondoAutomatica} />
                        <label htmlFor="habilitar-musica-fondo">Música de fondo automatica</label>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

export default Configuracion