import Jardin from './Jardin'
import Flor from './Flor'

/**
 * Florecimiento — el momento emocional del aplicativo.
 *
 * La secuencia está coreografiada con retardos encadenados:
 *   0.4s  el tallo se dibuja desde la tierra hacia arriba
 *   1.35s brota la primera hoja
 *   1.75s brota la segunda
 *   2.05s aparece el capullo, que a los 2.6s se desvanece
 *   2.45s los pétalos se abren
 *   2.9s  estallan las chispas
 *   3.4s  aparece el nombre de la flor
 * Al terminar (5.2s) la pantalla devuelve a ella al jardín, ya con la flor.
 */

// Ocho chispas repartidas en círculo alrededor de la flor.
const CHISPAS = [
  [8, '#fff6cc', 0, 1.4, 2.9], [6, '#ffe9a3', 45, 1.5, 3], [7, '#fff6cc', 90, 1.3, 2.95],
  [5, '#ffeab0', 135, 1.6, 3.05], [8, '#fff6cc', 180, 1.4, 2.92], [6, '#ffe9a3', 225, 1.5, 3.1],
  [7, '#fff6cc', 270, 1.35, 2.98], [5, '#ffeab0', 315, 1.55, 3.02],
]

export default function Florecimiento({ flor, ambiente }) {
  return (
    <div style={{ position: 'absolute', inset: 0, animation: 'apareceSuave .6s ease both' }}>

      {/* El jardín de fondo, sin flores: toda la atención va al brote. */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Jardin ambiente={ambiente} flores={[]} zocalo="0px" />
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(58% 34% at 50% 66%,rgba(255,240,196,.28) 0%,rgba(10,18,14,.35) 58%,rgba(8,14,11,.7) 100%)',
      }} />

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, height: 420, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 250, height: 420 }}>

          <svg viewBox="0 0 250 420" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            {/* La tierra se abre */}
            <ellipse cx="125" cy="404" rx="74" ry="17" fill="#5f3d27" opacity=".95" />
            <ellipse cx="125" cy="399" rx="62" ry="13" fill="#85583a" />
            <circle cx="96" cy="398" r="2" fill="#5a3823" />
            <circle cx="148" cy="402" r="1.8" fill="#5a3823" />

            {/* El tallo se dibuja solo, de abajo hacia arriba */}
            <path
              d="M125 398C120 340 132 290 125 236" fill="none" stroke="#4e9a4a" strokeWidth="9" strokeLinecap="round"
              strokeDasharray="180" strokeDashoffset="180"
              style={{ animation: 'dibujarTallo 1.5s ease-out .4s forwards' }}
            />

            <g style={{ animation: 'hojaPop .6s cubic-bezier(.2,1.4,.4,1) 1.35s both', transformOrigin: '124px 336px', transformBox: 'view-box' }}>
              <path d="M124 336C100 322 72 328 62 346C82 362 112 358 124 336Z" fill="#59ad53" />
              <path d="M120 338C104 341 84 345 68 350" stroke="#3c8038" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".7" />
            </g>

            <g style={{ animation: 'hojaPop .6s cubic-bezier(.2,1.4,.4,1) 1.75s both', transformOrigin: '127px 292px', transformBox: 'view-box' }}>
              <path d="M127 292C151 276 182 282 192 300C170 318 140 314 127 292Z" fill="#59ad53" />
              <path d="M131 294C148 296 168 300 186 305" stroke="#3c8038" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".7" />
            </g>

            {/* El capullo: aparece y se abre paso a los pétalos */}
            <g style={{ animation: 'hojaPop .55s cubic-bezier(.2,1.4,.4,1) 2.05s both, desvanecer .45s ease 2.6s forwards', transformOrigin: '125px 236px', transformBox: 'view-box' }}>
              <path d="M125 236C112 226 110 204 125 192C140 204 138 226 125 236Z" fill="#6fb85e" />
              <path d="M118 230C116 216 119 204 125 196" stroke="#3c8038" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".6" />
            </g>
          </svg>

          {/* La cabeza de la flor se abre sobre el tallo ya dibujado */}
          <div style={{
            position: 'absolute', left: 33, top: 116, width: 184, height: 307,
            transformOrigin: '50% 39%',
            animation: 'petalosAbren 1.2s cubic-bezier(.2,1.45,.35,1) 2.45s both',
          }}>
            <div style={{
              position: 'absolute', left: '50%', top: '39%', marginLeft: -80, marginTop: -80,
              width: 160, height: 160, borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(255,238,180,.4) 0%,rgba(255,226,140,.14) 46%,rgba(255,226,140,0) 72%)',
              animation: 'aureola 3.4s ease-in-out infinite',
            }} />
            <Flor
              tipo={flor.tipo} soloCabeza
              p={flor.p} pd={flor.pd} pl={flor.pl} c={flor.c} cd={flor.cd}
              dur={4}
            />
          </div>

          <div style={{ position: 'absolute', left: '50%', top: 110, width: 0, height: 0 }}>
            {CHISPAS.map(([tam, color, angulo, dur, delay], i) => (
              <div key={i} style={{
                position: 'absolute', width: tam, height: tam, margin: -tam / 2, borderRadius: '50%',
                background: color, boxShadow: `0 0 ${tam + 3}px 3px rgba(255,235,160,.75)`,
                '--a': `${angulo}deg`,
                animation: `chispa ${dur}s ease-out ${delay}s both`,
              }} />
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 66,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        animation: 'fadeUp 1s ease 3.4s both', padding: '0 24px', textAlign: 'center',
      }}>
        <div style={{ fontFamily: "'Berkshire Swash',serif", fontSize: 27, color: '#fff6e0', textShadow: '0 2px 10px rgba(0,0,0,.6)' }}>
          {flor.nombre}
        </div>
        <div style={{ fontFamily: 'Caveat,cursive', fontSize: 23, color: '#ffeec9', textShadow: '0 2px 8px rgba(0,0,0,.6)' }}>
          acaba de florecer en tu jardín
        </div>
      </div>
    </div>
  )
}
