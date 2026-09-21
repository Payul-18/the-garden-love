import { useEffect, useRef, useState } from 'react'
import Flor from './Flor'
import Animales from './Animales'

/**
 * Jardin — el escenario donde viven las flores.
 *
 * Dibuja el cielo, el suelo y toda la vida ambiental (nubes, aves, mariposas,
 * estrellas, luciérnagas) según el ambiente que le llega, y debajo coloca la
 * fila de flores. El ambiente no lo decide este componente: se lo pasan.
 *
 * Props:
 *   ambiente    dia | atardecer | noche
 *   flores      las flores ya preparadas (con colores y tiempos)
 *   zocalo      espacio que hay que dejar libre abajo para el panel del código
 *   resaltada   id de la flor a la que hay que ir (código ya canjeado)
 *   onTocarFlor qué hacer al tocar una flor
 *   textoVacio  qué decir cuando no hay flores. En null no dice nada: sirve
 *               para cuando el jardín es solo el fondo de otra escena.
 */
// Las flores crecieron un 20%: de 118 a 142 de alto. El ancho lo reparte
// la cuadrícula entre cuatro columnas.
const ALTO_FLOR = 142

export default function Jardin({
  ambiente = 'dia',
  flores = [],
  zocalo = '0px',
  resaltada = null,
  onTocarFlor = () => {},
  textoVacio = null,
}) {
  const fila = useRef(null)
  const [tocada, setTocada] = useState(null)
  const vacio = flores.length === 0 && textoVacio

  // Cuando ella escribe un código que ya canjeó, el jardín va hasta esa flor
  // en lugar de darle un error. Es la regla "esta flor ya está en tu jardín".
  useEffect(() => {
    if (!resaltada || !fila.current) return
    const destino = fila.current.querySelector(`[data-flor="${resaltada}"]`)
    if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [resaltada])

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', background: '#9fdcf7' }}>

      {ambiente === 'dia' && <CieloDia />}
      {ambiente === 'atardecer' && <CieloAtardecer />}
      {ambiente === 'noche' && <CieloNoche />}

      {/* Habitantes del prado: van detrás de las flores y no se pueden tocar */}
      <Animales ambiente={ambiente} />

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: zocalo,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        gap: 4, padding: '0 12px 14px',
      }}>

        {vacio && <TierraVacia texto={textoVacio} />}

        {/* Cuadrícula de cuatro por fila. Se ven tres filas completas y,
            si el año tiene más de doce flores, el prado se desplaza hacia
            abajo: siguen entrando cuatro por fila. */}
        <div ref={fila} className="sin-barra" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2px 4px',
          alignItems: 'end',
          maxHeight: ALTO_FLOR * 3 + 8,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0 2px 2px',
        }}>
          {flores.map((f, i) => (
            <div
              key={f.id}
              data-flor={f.id}
              onClick={() => {
                // La flor salta antes de abrir su carta: el gesto se siente
                // respondido aunque la ficha tarde un instante en subir.
                setTocada(f.id)
                setTimeout(() => setTocada(null), 420)
                setTimeout(() => onTocarFlor(f), 170)
              }}
              style={{
                height: ALTO_FLOR, cursor: 'pointer', position: 'relative',
                transition: 'transform .2s',
                animation: resaltada === f.id
                  ? 'resalta 1.6s ease 2'
                  : tocada === f.id
                    ? 'florTocada .42s cubic-bezier(.2,1.4,.4,1)'
                    // Al abrir el jardín las flores brotan por turno.
                    : `floreceEnFila .55s cubic-bezier(.2,1.3,.4,1) ${Math.min(i, 11) * 0.06}s both`,
              }}
            >
              <Flor
                tipo={f.tipo} p={f.p} pd={f.pd} pl={f.pl} c={f.c} cd={f.cd}
                tallo={f.tallo} hoja={f.hoja} hojaD={f.hojaD}
                dur={f.dur} delay={f.delay} fx={f.fx}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 30,
        background: 'linear-gradient(180deg,rgba(0,0,0,0),rgba(20,30,15,.28))',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

/* ------------------------------------------------------------------
   El estado vacío. No es un error ni una carencia: es tierra preparada.
------------------------------------------------------------------ */
function TierraVacia({ texto }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, paddingBottom: 16 }}>
      <svg width="190" height="64" viewBox="0 0 190 64" style={{ overflow: 'visible' }}>
        <ellipse cx="60" cy="46" rx="42" ry="13" fill="#6b4630" opacity="0.9" />
        <ellipse cx="60" cy="43" rx="36" ry="10" fill="#8a5b3c" />
        <ellipse cx="136" cy="50" rx="34" ry="10" fill="#6b4630" opacity="0.85" />
        <ellipse cx="136" cy="48" rx="28" ry="8" fill="#8a5b3c" />
        <circle cx="44" cy="42" r="1.8" fill="#5a3823" />
        <circle cx="72" cy="45" r="1.6" fill="#5a3823" />
        <circle cx="128" cy="49" r="1.6" fill="#5a3823" />
        <path d="M60 42C58 34 60 28 64 24C66 30 64 38 60 42Z" fill="#6fc05e" />
        <path d="M60 42C60 36 57 32 52 30C52 36 56 40 60 42Z" fill="#8ad36f" />
        <g style={{ animation: 'jBrillo 3.2s ease-in-out infinite', transformOrigin: '64px 18px', transformBox: 'view-box' }}>
          <path d="M64 10L66 17L73 19L66 21L64 28L62 21L55 19L62 17Z" fill="#fff3c0" />
        </g>
        <g style={{ animation: 'jBrillo 4s ease-in-out infinite', animationDelay: '-1.4s', transformOrigin: '150px 24px', transformBox: 'view-box' }}>
          <path d="M150 18L151.4 22.6L156 24L151.4 25.4L150 30L148.6 25.4L144 24L148.6 22.6Z" fill="#ffe9a3" />
        </g>
      </svg>
      <div style={{
        fontFamily: 'Caveat,cursive', fontSize: 25, lineHeight: 1.25, color: '#fff8e8',
        textAlign: 'center', textShadow: '0 2px 8px rgba(30,40,25,.55)', maxWidth: 280,
        whiteSpace: 'pre-line',
      }}>{texto}</div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Suelo: las tres capas de césped, compartidas por los tres ambientes
   con distinta paleta.
------------------------------------------------------------------ */
function Suelo({ c1, c2, c3, base }) {
  return (
    <>
      <svg viewBox="0 0 375 220" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: '62%' }}>
        <path d="M0 78C70 40 120 96 190 70C260 44 320 84 375 60L375 220L0 220Z" fill={c1} />
        <path d="M0 116C60 92 130 128 200 108C270 88 330 120 375 104L375 220L0 220Z" fill={c2} />
        <path d="M0 150C70 132 140 162 210 146C280 130 330 152 375 142L375 220L0 220Z" fill={c3} />
      </svg>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '26%', background: base }} />
    </>
  )
}

function Nube({ top, dur, delay, ancho, alto, color = '#ffffff', opacidad, sombra }) {
  return (
    <div style={{ position: 'absolute', top, left: 0, right: 0, height: alto + 12, animation: `jNube ${dur}s linear infinite`, animationDelay: delay }}>
      <div style={{ width: ancho, height: alto, borderRadius: 999, background: color, opacity: opacidad, boxShadow: sombra }} />
    </div>
  )
}

function Mariposa({ top, dur, delay, escala = 1, alaA, alaB }) {
  return (
    <div style={{ position: 'absolute', top, left: 0, right: 0, animation: `jMariposa ${dur}s ease-in-out infinite`, animationDelay: delay }}>
      <svg width={26 * escala} height={20 * escala} viewBox="0 0 26 20" style={{ overflow: 'visible' }}>
        <g style={{ animation: 'jAla .24s ease-in-out infinite', transformOrigin: '13px 10px', transformBox: 'view-box' }}>
          <path d="M13 10C8 1 1 2 2 8C3 14 9 13 13 10Z" fill={alaA} />
          <path d="M13 10C18 1 25 2 24 8C23 14 17 13 13 10Z" fill={alaB} />
        </g>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------
   Día · 00:00–15:00
------------------------------------------------------------------ */
function CieloDia() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#5fc0f0 0%,#8fd8f7 38%,#c4ecfb 66%,#e8f7e4 82%)' }} />
      <div style={{
        position: 'absolute', top: 46, right: 38, width: 84, height: 84, borderRadius: '50%',
        background: 'radial-gradient(circle at 42% 38%,#fffdf0 0%,#ffe9a0 46%,rgba(255,220,130,.35) 70%,rgba(255,220,130,0) 100%)',
        animation: 'jSol 6s ease-in-out infinite',
      }} />

      <Nube top={74} dur={52} delay="0s" ancho={96} alto={28} opacidad={.92} sombra="26px -12px 0 -3px #fff, -22px -6px 0 -6px #fff, 0 8px 18px rgba(80,140,180,.18)" />
      <Nube top={150} dur={78} delay="-30s" ancho={70} alto={22} opacidad={.8} sombra="20px -9px 0 -3px #fff, -16px -4px 0 -5px #fff" />
      <Nube top={38} dur={96} delay="-58s" ancho={58} alto={14} opacidad={.55} sombra="16px -6px 0 -4px #fff" />
      <Nube top={216} dur={112} delay="-14s" ancho={64} alto={13} opacidad={.42} sombra="18px -5px 0 -4px #fff" />
      <Nube top={258} dur={88} delay="-70s" ancho={50} alto={12} opacidad={.5} sombra="14px -5px 0 -4px #fff" />

      <div style={{ position: 'absolute', top: 112, left: 0, right: 0, animation: 'jAve 34s linear infinite' }}>
        <svg width="86" height="30" viewBox="0 0 86 30" style={{ overflow: 'visible', opacity: .55 }}>
          <g style={{ animation: 'jAleteo 1.1s ease-in-out infinite', transformOrigin: '14px 10px', transformBox: 'view-box' }}><path d="M2 12C7 6 11 6 14 11C17 6 21 6 26 12" stroke="#3f5f7a" strokeWidth="2" fill="none" strokeLinecap="round" /></g>
          <g style={{ animation: 'jAleteo 1.3s ease-in-out infinite', animationDelay: '-.3s', transformOrigin: '46px 20px', transformBox: 'view-box' }}><path d="M36 22C40 17 43 17 46 21C49 17 52 17 56 22" stroke="#3f5f7a" strokeWidth="1.8" fill="none" strokeLinecap="round" /></g>
          <g style={{ animation: 'jAleteo 1.2s ease-in-out infinite', animationDelay: '-.6s', transformOrigin: '72px 8px', transformBox: 'view-box' }}><path d="M64 10C67 6 70 6 72 9C74 6 77 6 80 10" stroke="#3f5f7a" strokeWidth="1.6" fill="none" strokeLinecap="round" /></g>
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 186, left: 0, right: 0, animation: 'jAve 46s linear infinite', animationDelay: '-24s' }}>
        <svg width="64" height="22" viewBox="0 0 64 22" style={{ overflow: 'visible', opacity: .4 }}>
          <g style={{ animation: 'jAleteo 1.4s ease-in-out infinite', transformOrigin: '12px 9px', transformBox: 'view-box' }}><path d="M2 11C6 6 9 6 12 10C15 6 18 6 22 11" stroke="#3f5f7a" strokeWidth="1.7" fill="none" strokeLinecap="round" /></g>
          <g style={{ animation: 'jAleteo 1.6s ease-in-out infinite', animationDelay: '-.5s', transformOrigin: '44px 16px', transformBox: 'view-box' }}><path d="M36 18C39 14 42 14 44 17C46 14 49 14 52 18" stroke="#3f5f7a" strokeWidth="1.5" fill="none" strokeLinecap="round" /></g>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: '34%', left: '14%', width: 5, height: 5, borderRadius: '50%', background: '#fff8d8', boxShadow: '0 0 7px 2px rgba(255,248,216,.7)', animation: 'jPolen 12s linear infinite' }} />
      <div style={{ position: 'absolute', bottom: '30%', left: '56%', width: 4, height: 4, borderRadius: '50%', background: '#fffbe8', boxShadow: '0 0 6px 2px rgba(255,248,216,.6)', animation: 'jPolen 15s linear infinite', animationDelay: '-6s' }} />
      <div style={{ position: 'absolute', bottom: '38%', left: '82%', width: 4, height: 4, borderRadius: '50%', background: '#fff8d8', boxShadow: '0 0 6px 2px rgba(255,248,216,.55)', animation: 'jPolen 17s linear infinite', animationDelay: '-11s' }} />

      <Mariposa top={198} dur={17} delay="0s" alaA="#ff9ec4" alaB="#ffc2dc" />
      <Mariposa top={268} dur={23} delay="-9s" escala={0.85} alaA="#ffd98a" alaB="#ffe9b8" />

      <Suelo c1="#7fc46a" c2="#63b158" c3="#4f9c49" base="linear-gradient(180deg,rgba(79,156,73,0) 0%,#47903f 55%,#3a7c35 100%)" />
    </>
  )
}

/* ------------------------------------------------------------------
   Atardecer · 15:00–18:00
------------------------------------------------------------------ */
function CieloAtardecer() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#4b2f6e 0%,#8c4a7a 28%,#e0697a 52%,#ff9c63 72%,#ffc98c 88%)' }} />
      <div style={{
        position: 'absolute', bottom: '33%', left: '50%', marginLeft: -70, width: 140, height: 140, borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 50%,#fff3c8 0%,#ffcf7a 38%,rgba(255,158,94,.4) 62%,rgba(255,140,90,0) 100%)',
        animation: 'jSol 7s ease-in-out infinite',
      }} />

      <Nube top={96} dur={74} delay="0s" ancho={104} alto={20} color="#ffb9a6" opacidad={.75} sombra="30px -8px 0 -4px #ffc7b0, -24px -4px 0 -7px #ff9f96" />
      <Nube top={158} dur={96} delay="-40s" ancho={80} alto={16} color="#ffd0b0" opacidad={.6} sombra="22px -7px 0 -4px #ffd8bb" />

      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, animation: 'jAve 40s linear infinite' }}>
        <svg width="96" height="34" viewBox="0 0 96 34" style={{ overflow: 'visible', opacity: .62 }}>
          <g style={{ animation: 'jAleteo 1.2s ease-in-out infinite', transformOrigin: '16px 12px', transformBox: 'view-box' }}><path d="M2 14C8 7 13 7 16 13C19 7 24 7 30 14" stroke="#4a2f45" strokeWidth="2.2" fill="none" strokeLinecap="round" /></g>
          <g style={{ animation: 'jAleteo 1.45s ease-in-out infinite', animationDelay: '-.4s', transformOrigin: '52px 24px', transformBox: 'view-box' }}><path d="M40 26C45 20 49 20 52 25C55 20 59 20 64 26" stroke="#4a2f45" strokeWidth="2" fill="none" strokeLinecap="round" /></g>
          <g style={{ animation: 'jAleteo 1.3s ease-in-out infinite', animationDelay: '-.8s', transformOrigin: '82px 8px', transformBox: 'view-box' }}><path d="M72 10C76 5 79 5 82 9C85 5 88 5 92 10" stroke="#4a2f45" strokeWidth="1.8" fill="none" strokeLinecap="round" /></g>
        </svg>
      </div>

      <Mariposa top={212} dur={26} delay="0s" escala={0.85} alaA="#ffd28a" alaB="#ffb27a" />

      <Suelo c1="#8a6b58" c2="#6c7a4e" c3="#55693f" base="linear-gradient(180deg,rgba(85,105,63,0) 0%,#4c6038 55%,#3d4f2e 100%)" />

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(255,170,90,0) 40%,rgba(255,160,90,.22) 100%)', pointerEvents: 'none' }} />
    </>
  )
}

/* ------------------------------------------------------------------
   Noche · 18:00–00:00
------------------------------------------------------------------ */
const ESTRELLAS = [
  [6, '44%', 2, '#fff', 3.5, '-.9s'], [40, '8%', 3, '#dfe6ff', 4.6, '-2.2s'],
  [62, '92%', 2, '#fff', 3.3, '-1.3s'], [112, '70%', 3, '#ffeec9', 4.8, '-3.4s'],
  [142, '52%', 2, '#fff', 3.7, '-.5s'], [158, '28%', 3, '#dfe6ff', 5.2, '-4.1s'],
  [184, '78%', 2, '#fff', 4.2, '-2.8s'], [214, '42%', 3, '#ffeec9', 3.4, '-1.7s'],
  [228, '10%', 2, '#fff', 4.9, '-3.9s'], [240, '88%', 3, '#dfe6ff', 4.4, '-.2s'],
  [20, '60%', 3, '#fff', 3.2, '0s'], [52, '78%', 4, '#ffeec9', 4.1, '-1s'],
  [96, '34%', 3, '#fff', 2.8, '-.6s'], [130, '86%', 3, '#dfe6ff', 3.6, '-2s'],
  [12, '22%', 2, '#fff', 4.4, '-1.6s'], [168, '16%', 3, '#ffeec9', 3.9, '-2.6s'],
  [74, '50%', 2, '#fff', 3.1, '-.3s'], [198, '66%', 2, '#dfe6ff', 5, '-3s'],
]

const LUCIERNAGAS = [
  ['18%', '12%', 6, '#ffe9a3', 7, '0s'], ['30%', '36%', 5, '#fff3b8', 9, '-3s'],
  ['24%', '62%', 6, '#ffe9a3', 8, '-5s'], ['40%', '80%', 5, '#fff3b8', 10, '-1.5s'],
  ['12%', '48%', 5, '#ffe9a3', 8.5, '-6.5s'], ['34%', '22%', 4, '#fff3b8', 11, '-8s'],
  ['52%', '70%', 4, '#ffe9a3', 12, '-4s'], ['46%', '30%', 5, '#fff3b8', 13, '-10s'],
]

function CieloNoche() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#0a1130 0%,#1b1a4a 34%,#38265f 62%,#5b3b6e 84%)' }} />
      <div style={{
        position: 'absolute', top: 150, left: 38, width: 58, height: 58, borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 34%,#fffdf0 0%,#f3ecc9 52%,rgba(243,236,201,.25) 72%,rgba(243,236,201,0) 100%)',
        animation: 'jSol 9s ease-in-out infinite',
      }} />

      <Nube top={106} dur={120} delay="-40s" ancho={96} alto={14} color="#6b5f9a" opacidad={.45} sombra="26px -6px 0 -4px #6b5f9a, -20px -3px 0 -6px #5b5188" />
      <Nube top={236} dur={150} delay="0s" ancho={74} alto={12} color="#7a6aa8" opacidad={.32} sombra="20px -5px 0 -4px #7a6aa8" />

      <div style={{ position: 'absolute', top: 76, right: 26, width: 88, height: 2, borderRadius: 2, background: 'linear-gradient(90deg,rgba(255,255,255,0),#fff8e0)', transformOrigin: '100% 50%', animation: 'jFugaz 14s linear infinite' }} />
      <div style={{ position: 'absolute', top: 190, right: -10, width: 64, height: 2, borderRadius: 2, background: 'linear-gradient(90deg,rgba(255,255,255,0),#e8f0ff)', transformOrigin: '100% 50%', animation: 'jFugaz 21s linear infinite', animationDelay: '-9s' }} />

      <div style={{ position: 'absolute', top: 34, left: 0, right: 0, height: 250 }}>
        {ESTRELLAS.map(([top, left, tam, color, dur, delay], i) => (
          <div key={i} style={{
            position: 'absolute', top, left, width: tam, height: tam, borderRadius: '50%', background: color,
            animation: `jTwinkle ${dur}s ease-in-out infinite`, animationDelay: delay,
          }} />
        ))}
      </div>

      <Suelo c1="#26324f" c2="#1e3a46" c3="#1a4440" base="linear-gradient(180deg,rgba(26,68,64,0) 0%,#163a38 55%,#11302f 100%)" />

      {LUCIERNAGAS.map(([bottom, left, tam, color, dur, delay], i) => (
        <div key={i} style={{
          position: 'absolute', bottom, left, width: tam, height: tam, borderRadius: '50%', background: color,
          boxShadow: `0 0 ${tam + 5}px 3px rgba(255,233,163,.6)`,
          animation: `jLuci ${dur}s ease-in-out infinite`, animationDelay: delay,
        }} />
      ))}
    </>
  )
}
