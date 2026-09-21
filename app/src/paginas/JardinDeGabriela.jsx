import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Jardin from '../componentes/Jardin'
import Florecimiento from '../componentes/Florecimiento'
import FichaFlor from '../componentes/FichaFlor'
import Portada from '../componentes/Portada'
import Mensaje from '../componentes/Mensaje'
import PanelCodigo from '../componentes/PanelCodigo'
import { ambienteActual } from '../lib/ambiente'
import { prepararFlor } from '../lib/colores'
import { canjearCodigo, verJardin } from '../lib/supabase'
import { fraseAlSembrar } from '../lib/frases'

const NOMBRE_ELLA = import.meta.env.VITE_NOMBRE_ELLA ?? 'Gabichi'
const LLAVE = import.meta.env.VITE_LLAVE_JARDIN ?? ''

/** La animación de florecimiento dura esto antes de devolverla al jardín. */
const DURACION_BLOOM = 5200

export default function JardinDeGabriela() {
  const [pantalla, setPantalla] = useState('portada')   // portada | jardin | bloom
  const [flores, setFlores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [anioVisible, setAnioVisible] = useState(new Date().getFullYear())
  const [sel, setSel] = useState(null)                   // flor abierta en la ficha
  const [nueva, setNueva] = useState(null)               // flor que está floreciendo
  const [resaltada, setResaltada] = useState(null)       // flor a la que hay que ir
  const [msg, setMsg] = useState({ texto: '', tono: 'aviso' })
  const [shake, setShake] = useState(0)
  const [panel, setPanel] = useState(false)
  const [ambiente, setAmbiente] = useState(ambienteActual())

  const tMsg = useRef(null)
  const tBloom = useRef(null)

  // El ambiente sigue a la hora real: se revisa cada minuto, así el jardín
  // pasa de día a atardecer y a noche aunque ella deje la página abierta.
  useEffect(() => {
    const id = setInterval(() => setAmbiente(ambienteActual()), 60000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => () => { clearTimeout(tMsg.current); clearTimeout(tBloom.current) }, [])

  const decir = useCallback((texto, tono = 'aviso') => {
    clearTimeout(tMsg.current)
    setMsg({ texto, tono })
    // Cinco segundos y medio: da tiempo a leer una frase escrita a mano
    // sin que el aviso se quede estorbando la vista del jardín.
    tMsg.current = setTimeout(() => setMsg({ texto: '', tono }), 5500)
  }, [])

  // Las flores se cargan una sola vez, al entrar. Antes de la llave no hace
  // falta pedir nada al servidor.
  const cargar = useCallback(async () => {
    try {
      const filas = await verJardin()
      setFlores(filas.map((f, i) => prepararFlor(f, i)))
      if (filas.length) {
        const anios = filas.map((f) => Number(f.fecha_regalo.slice(0, 4)))
        setAnioVisible(Math.max(...anios))
      }
    } catch {
      decir('El jardín tarda en despertar… ¿revisas tu conexión?', 'error')
    } finally {
      setCargando(false)
    }
  }, [decir])

  const entrar = useCallback((llaveEscrita) => {
    if (llaveEscrita !== LLAVE) {
      setShake((s) => s + 1)
      decir('Esa llave todavía no abre… ¿revisas tu tarjetita?', 'error')
      return false
    }
    setMsg({ texto: '', tono: 'aviso' })
    setPantalla('jardin')
    cargar()
    return true
  }, [cargar, decir])

  const sembrar = useCallback(async (codigo) => {
    let r
    try {
      r = await canjearCodigo(codigo)
    } catch {
      setShake((s) => s + 1)
      decir('El jardín no respondió… ¿lo intentas de nuevo?', 'error')
      return false
    }

    if (r.estado === 'no_existe') {
      setShake((s) => s + 1)
      decir('Esa semilla no germinó… ¿revisas el código?', 'error')
      return false
    }

    if (r.estado === 'ya_canjeada') {
      setShake((s) => s + 1)
      decir('Esta flor ya está en tu jardín 🌷')
      // En vez de quedarse en el error, el jardín la lleva hasta esa flor.
      setAnioVisible(Number(r.fecha_regalo.slice(0, 4)))
      setPanel(false)
      setResaltada(r.id)
      setTimeout(() => setResaltada(null), 3600)
      return true
    }

    // Canje bueno: florece.
    const cuantasHabia = flores.length
    const flor = prepararFlor(r, cuantasHabia)
    setNueva({ ...flor, cuantasHabia })
    setSel(null)
    setPanel(false)
    setMsg({ texto: '', tono: 'aviso' })
    setPantalla('bloom')

    clearTimeout(tBloom.current)
    tBloom.current = setTimeout(() => {
      setFlores((prev) => [...prev, flor])
      setAnioVisible(Number(flor.fecha_regalo.slice(0, 4)))
      setPantalla('jardin')
      decir('Tu jardín tiene una flor nueva 🌻')
    }, DURACION_BLOOM)

    return true
  }, [decir, flores.length])

  // Las flores se agrupan por año y solo se ve un año a la vez: así el jardín
  // puede crecer indefinidamente sin apelotonarse.
  const anios = useMemo(() => {
    const set = new Set(flores.map((f) => Number(f.fecha_regalo.slice(0, 4))))
    set.add(new Date().getFullYear())
    return [...set].sort((a, b) => a - b)
  }, [flores])

  const floresDelAnio = useMemo(() => {
    const brillo = ambiente === 'noche' ? 'drop-shadow(0 0 8px rgba(255,236,170,.9))' : 'none'
    return flores
      .filter((f) => Number(f.fecha_regalo.slice(0, 4)) === anioVisible)
      .map((f) => ({ ...f, fx: brillo }))
  }, [flores, anioVisible, ambiente])

  // El jardín vacío no dice siempre lo mismo. "Tu primera flor" solo es
  // verdad una vez; después, un año recién empezado necesita otra frase.
  const textoVacio = flores.length === 0
    ? 'La tierra está lista y esperando.\nSiembra aquí tu primera flor 🌱'
    : `Todavía no hay nada plantado en ${anioVisible}.\nEste año también va a florecer 🌱`

  const conteo = flores.length === 0
    ? 'todavía sin flores'
    : flores.length === 1 ? '1 flor guardada' : `${flores.length} flores guardadas`

  const ambienteTxt = { dia: 'Día', atardecer: 'Atardecer', noche: 'Noche' }[ambiente]
  const shakeAnim = shake ? `tiembla .5s ease ${shake}` : 'none'

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#0d1410' }}>

      {pantalla === 'portada' && (
        <Portada
          nombreElla={NOMBRE_ELLA}
          ambiente={ambiente}
          msg={msg.texto}
          shakeAnim={shakeAnim}
          onEntrar={entrar}
        />
      )}

      {pantalla === 'jardin' && (
        <div style={{ position: 'absolute', inset: 0, animation: 'apareceSuave .6s ease both' }}>
          <Jardin
            ambiente={ambiente}
            flores={floresDelAnio}
            zocalo={panel ? '244px' : '112px'}
            resaltada={resaltada}
            onTocarFlor={setSel}
            textoVacio={textoVacio}
          />

          <Encabezado
            nombreElla={NOMBRE_ELLA}
            conteo={cargando ? 'despertando el jardín…' : conteo}
            ambienteTxt={ambienteTxt}
            anios={anios}
            anioVisible={anioVisible}
            onCambiarAnio={setAnioVisible}
          />

          <Mensaje texto={msg.texto} tono={msg.tono} abajo={panel ? 286 : 130} />

          <PanelCodigo
            abierto={panel}
            sinFlores={flores.length === 0}
            shakeAnim={shakeAnim}
            onAbrir={() => setPanel(true)}
            onCerrar={() => setPanel(false)}
            onSembrar={sembrar}
          />

          {sel && <FichaFlor flor={sel} onCerrar={() => setSel(null)} />}
        </div>
      )}

      {pantalla === 'bloom' && nueva && (
        <Florecimiento flor={nueva} ambiente={ambiente} />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Encabezado({ nombreElla, conteo, ambienteTxt, anios, anioVisible, onCambiarAnio }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, padding: '22px 22px 30px',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      background: 'linear-gradient(180deg,rgba(10,18,14,.42),rgba(10,18,14,0))',
      pointerEvents: 'none',
    }}>
      <div>
        <div style={{ fontFamily: "'Berkshire Swash',serif", fontSize: 23, color: '#fff6e0', textShadow: '0 2px 8px rgba(0,0,0,.55)' }}>
          El jardín de {nombreElla}
        </div>
        <div style={{ fontFamily: 'Caveat,cursive', fontSize: 19, color: '#ffeec9', opacity: .92 }}>{conteo}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <div style={{
          fontFamily: 'Nunito,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '.14em',
          textTransform: 'uppercase', color: '#fff3dc', background: 'rgba(20,30,22,.4)',
          border: '1px solid rgba(255,240,200,.28)', padding: '6px 10px', borderRadius: 999,
        }}>{ambienteTxt}</div>

        {/* Un año a la vez. Solo aparece el selector si hay más de uno. */}
        <div style={{ display: 'flex', gap: 5, pointerEvents: 'auto' }}>
          {anios.map((a) => (
            <button
              key={a}
              onClick={() => onCambiarAnio(a)}
              style={{
                fontFamily: 'Nunito,sans-serif', fontSize: 12, fontWeight: 800, letterSpacing: '.08em',
                color: a === anioVisible ? '#fff1d4' : 'rgba(255,241,212,.6)',
                background: a === anioVisible
                  ? 'linear-gradient(180deg,#a9763f,#7d5227)'
                  : 'rgba(40,30,18,.45)',
                padding: '4px 10px', borderRadius: 6, transform: 'rotate(3deg)', cursor: 'pointer',
                boxShadow: a === anioVisible ? '0 3px 0 rgba(60,36,14,.55), 0 6px 12px rgba(0,0,0,.28)' : 'none',
                border: '1px solid rgba(255,224,170,.35)',
              }}
            >{a}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

