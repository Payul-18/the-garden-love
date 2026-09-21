import { useId } from 'react'

/**
 * Flor — la ilustración SVG de una flor.
 *
 * Cada especie está dibujada siguiendo su forma real: el girasol tiene
 * brácteas y semillas en espiral de Fibonacci, la rosa un corazón en
 * espiral con sépalos, el tulipán seis tépalos en copa, la margarita
 * pétalos desiguales, y el clavel el borde dentado y el cáliz tubular
 * que lo distinguen. Lo que no se copia de la realidad es el acabado:
 * sigue siendo ilustración de cuento, no una fotografía.
 *
 * El tallo y la cabeza se mecen por separado y con ritmos distintos: por
 * eso el jardín parece vivo aunque nadie lo toque.
 */

/* ------------------------------------------------------------------
   Semillas del girasol
   Se reparten con el ángulo áureo (137.5°), que es como se ordenan de
   verdad en el capítulo de la flor. Una retícula se vería artificial.
------------------------------------------------------------------ */
const SEMILLAS = (() => {
  const puntos = []
  for (let i = 0; i < 68; i++) {
    const r = 2.4 * Math.sqrt(i)
    if (r > 18) break
    const a = i * 137.508 * (Math.PI / 180)
    puntos.push([
      +(60 + r * Math.cos(a)).toFixed(2),
      +(78 + r * Math.sin(a)).toFixed(2),
      +(0.95 + r * 0.045).toFixed(2),
    ])
  }
  return puntos
})()

// Pétalo del girasol: lanceolado y con la muesca del extremo.
const PETALO_GIRASOL = 'M60 76 C50 60 48 38 55 23 L60 29 L65 23 C72 38 70 60 60 76Z'
const PETALO_GIRASOL_INT = 'M60 76 C52 62 50 44 56 32 L60 37 L64 32 C70 44 68 62 60 76Z'
const ANGULOS_13 = Array.from({ length: 13 }, (_, i) => +(i * (360 / 13)).toFixed(1))
const ANGULOS_13_INT = ANGULOS_13.map((a) => +(a + 13.8).toFixed(1))
const BRACTEAS = Array.from({ length: 9 }, (_, i) => +(i * 40 + 20).toFixed(1))

// Margarita: longitudes ligeramente desiguales, como las de verdad.
const PETALOS_MARGARITA = Array.from({ length: 21 }, (_, i) => ({
  angulo: +(i * (360 / 21)).toFixed(1),
  escala: +(0.88 + ((i * 7) % 5) * 0.055).toFixed(3),
}))

const ROSA_EXT = [0, 72, 144, 216, 288]
const ROSA_MED = [36, 108, 180, 252, 324]

export default function Flor({
  tipo = 'girasol',
  p = '#ffc93c', pd = '#eda428', pl = '#ffe6a3', c = '#7a4a1f', cd = '#543012',
  tallo = '#4e9a4a', hoja = '#59ad53', hojaD = '#3c8038',
  soloCabeza = false, dur = 4.4, delay = 0, fx = 'none',
}) {
  // Los degradados necesitan identificadores únicos: con varias flores en
  // pantalla, ids repetidos harían que todas usaran el color de la primera.
  const uid = useId().replace(/:/g, '')
  const gPetalo = `pt-${uid}`
  const gCentro = `ct-${uid}`
  const gTallo = `tl-${uid}`

  const vaiven = {
    animation: `florSway ${dur}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    transformOrigin: '60px 198px',
    transformBox: 'view-box',
    filter: fx,
  }

  const cabeceo = {
    animation: `florHead ${dur}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    transformOrigin: '60px 104px',
    transformBox: 'view-box',
  }

  return (
    <svg
      viewBox="0 0 120 200"
      preserveAspectRatio="xMidYMax meet"
      style={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}
    >
      <defs>
        {/* La luz entra por arriba a la izquierda, igual en toda la flor */}
        <linearGradient id={gPetalo} x1="0.25" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stopColor={pl} />
          <stop offset="48%" stopColor={p} />
          <stop offset="100%" stopColor={pd} />
        </linearGradient>
        <radialGradient id={gCentro} cx="0.38" cy="0.34" r="0.72">
          <stop offset="0%" stopColor={c} />
          <stop offset="70%" stopColor={c} />
          <stop offset="100%" stopColor={cd} />
        </radialGradient>
        <linearGradient id={gTallo} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={hojaD} />
          <stop offset="40%" stopColor={tallo} />
          <stop offset="100%" stopColor={hojaD} />
        </linearGradient>
      </defs>

      <g style={vaiven}>

        {!soloCabeza && (
          <g>
            {/* Tallo con nervadura y hojas con su nervio central */}
            <path d="M60 200C56 172 65 146 60 104" fill="none" stroke={`url(#${gTallo})`} strokeWidth="7.5" strokeLinecap="round" />
            <path d="M58.5 196C55.5 172 63.5 148 59.5 112" fill="none" stroke={hojaD} strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />

            <path d="M60 158C42 147 24 150 17 165C32 179 53 177 60 158Z" fill={hoja} />
            <path d="M60 158C46 152 31 153 21 161C34 170 51 169 60 158Z" fill={hojaD} opacity="0.28" />
            <path d="M57 159C45 160 31 163 20 167" fill="none" stroke={hojaD} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <path d="M48 160L44 156M40 161L37 157M33 163L31 159" stroke={hojaD} strokeWidth="1" strokeLinecap="round" opacity="0.5" />

            <path d="M62 130C81 117 99 122 104 137C88 150 69 147 62 130Z" fill={hoja} />
            <path d="M62 130C76 125 92 127 101 134C87 141 70 140 62 130Z" fill={hojaD} opacity="0.24" />
            <path d="M65 131C78 130 92 133 101 139" fill="none" stroke={hojaD} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <path d="M74 131L78 127M82 133L85 129M90 135L93 131" stroke={hojaD} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          </g>
        )}

        <g style={cabeceo}>

          {/* ---------------- GIRASOL ---------------- */}
          {tipo === 'girasol' && (
            <g>
              {/* Brácteas verdes: asoman entre los pétalos, como en la real */}
              {BRACTEAS.map((a) => (
                <path key={`b${a}`} d="M60 78C54 66 53 50 60 42C67 50 66 66 60 78Z"
                      fill={hojaD} opacity="0.75" transform={`rotate(${a} 60 78)`} />
              ))}
              {ANGULOS_13.map((a) => (
                <path key={`g1${a}`} d={PETALO_GIRASOL} fill={pd} transform={`rotate(${a} 60 78)`} />
              ))}
              {ANGULOS_13_INT.map((a) => (
                <path key={`g2${a}`} d={PETALO_GIRASOL_INT} fill={`url(#${gPetalo})`}
                      stroke={pd} strokeWidth="0.5" transform={`rotate(${a} 60 78)`} />
              ))}
              {/* Nervios de los pétalos de delante */}
              {[13.8, 96, 180, 262].map((a) => (
                <path key={`n${a}`} d="M60 70C58 60 58 48 60 38" fill="none" stroke={pl}
                      strokeWidth="1.5" strokeLinecap="round" opacity="0.5" transform={`rotate(${a} 60 78)`} />
              ))}

              <circle cx="60" cy="78" r="21.5" fill={cd} />
              <circle cx="60" cy="78" r="19.5" fill={`url(#${gCentro})`} />
              {/* Corona de flósculos: el anillo suelto del borde del disco */}
              <circle cx="60" cy="78" r="18" fill="none" stroke={pd} strokeWidth="2.6" opacity="0.32" />
              {SEMILLAS.map(([x, y, r], i) => (
                <circle key={`s${i}`} cx={x} cy={y} r={r} fill={cd} opacity={0.32 + (i % 4) * 0.13} />
              ))}
              <ellipse cx="52" cy="69" rx="8" ry="5.4" fill="#ffffff" opacity="0.16" transform="rotate(-26 52 69)" />
              <path d="M44 87C49 95 59 99 69 96" fill="none" stroke="#000000" strokeWidth="2.6" strokeLinecap="round" opacity="0.1" />
            </g>
          )}

          {/* ---------------- ROSA ---------------- */}
          {tipo === 'rosa' && (
            <g>
              {/* Sépalos: las puntas verdes que sujetan la flor */}
              <path d="M44 94C38 100 34 108 35 116C42 112 46 104 46 96Z" fill={hojaD} />
              <path d="M76 94C82 100 86 108 85 116C78 112 74 104 74 96Z" fill={hojaD} />
              <path d="M60 100C58 108 58 114 60 120C62 114 62 108 60 100Z" fill={hojaD} />

              {/* Pétalos externos, anchos y vueltos hacia fuera */}
              {ROSA_EXT.map((a) => (
                <g key={`re${a}`} transform={`rotate(${a} 60 82)`}>
                  <path d="M60 100C36 95 24 74 32 55C39 39 62 37 71 52C80 67 74 92 60 100Z" fill={pd} />
                  <path d="M60 97C40 92 30 74 37 58C43 45 62 44 69 56C76 69 71 90 60 97Z" fill={p} opacity="0.55" />
                  {/* Borde enrollado del pétalo */}
                  <path d="M33 56C40 43 61 42 69 54" fill="none" stroke={pl} strokeWidth="2.6" strokeLinecap="round" opacity="0.55" />
                </g>
              ))}

              {/* Pétalos medios */}
              {ROSA_MED.map((a) => (
                <g key={`rm${a}`} transform={`rotate(${a} 60 82)`}>
                  <path d="M60 94C44 89 36 73 43 60C49 49 64 49 70 60C76 71 70 89 60 94Z" fill={`url(#${gPetalo})`} />
                  <path d="M44 60C50 51 64 51 69 60" fill="none" stroke={pl} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                </g>
              ))}

              {/* Corazón en espiral: lo que hace que una rosa sea una rosa */}
              <path d="M60 88C50 84 45 74 50 66C55 58 67 60 69 68C71 76 67 85 60 88Z" fill={pl} />
              <path d="M60 84C53 81 50 74 54 69C58 64 66 66 67 72C68 78 65 82 60 84Z" fill={p} opacity="0.85" />
              <path d="M62 80C57 79 54 75 56 71C58 68 63 69 64 72C65 75 64 79 62 80Z" fill={pd} opacity="0.75" />
              <path d="M62 77C59 77 57 75 58 73C59 71 62 72 62 74" fill="none" stroke={pd} strokeWidth="1.8" strokeLinecap="round" />
              <path d="M52 68C56 63 65 63 68 69" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.3" />
            </g>
          )}

          {/* ---------------- TULIPÁN ---------------- */}
          {tipo === 'tulipan' && (
            <g>
              {/* Tres tépalos traseros, con la punta hacia fuera */}
              <path d="M60 104C36 99 28 72 33 38C36 52 41 60 48 62L52 36C56 50 58 56 60 56Z" fill={pd} />
              <path d="M60 104C84 99 92 72 87 38C84 52 79 60 72 62L68 36C64 50 62 56 60 56Z" fill={pd} />
              {/* Tépalo central, el más iluminado */}
              <path d="M60 104C47 97 41 74 44 44C49 57 54 62 60 62C66 62 71 57 76 44C79 74 73 97 60 104Z" fill={`url(#${gPetalo})`} />
              {/* Tépalos laterales de delante */}
              <path d="M60 104C50 94 46 70 50 46C54 58 57 62 60 63C60 77 60 92 60 104Z" fill={p} opacity="0.65" />
              <path d="M60 104C70 94 74 70 70 46C66 58 63 62 60 63C60 77 60 92 60 104Z" fill={pl} opacity="0.5" />
              {/* Pliegues */}
              <path d="M53 56C51 70 51 88 55 101" fill="none" stroke={pd} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              <path d="M67 56C69 70 69 88 65 101" fill="none" stroke={pd} strokeWidth="1.5" strokeLinecap="round" opacity="0.38" />
              <path d="M60 64C60 78 60 92 60 102" fill="none" stroke={pd} strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
              <ellipse cx="50" cy="72" rx="4.6" ry="12" fill="#ffffff" opacity="0.18" transform="rotate(-8 50 72)" />
            </g>
          )}

          {/* ---------------- MARGARITA ---------------- */}
          {tipo === 'margarita' && (
            <g>
              {PETALOS_MARGARITA.map(({ angulo, escala }) => (
                <g key={`ms${angulo}`} transform={`rotate(${angulo} 60 82)`}>
                  <path d={`M60 82C53 70 51 ${(82 - 44 * escala).toFixed(1)} 60 ${(82 - 52 * escala).toFixed(1)}C69 ${(82 - 44 * escala).toFixed(1)} 67 70 60 82Z`} fill={pd} />
                </g>
              ))}
              {PETALOS_MARGARITA.map(({ angulo, escala }) => (
                <g key={`mp${angulo}`} transform={`rotate(${angulo + 8} 60 82)`}>
                  <path d={`M60 82C54 70 52 ${(82 - 42 * escala).toFixed(1)} 60 ${(82 - 49 * escala).toFixed(1)}C68 ${(82 - 42 * escala).toFixed(1)} 66 70 60 82Z`}
                        fill={`url(#${gPetalo})`} stroke={pd} strokeWidth="0.35" />
                  <path d={`M60 76C59 66 59 ${(82 - 40 * escala).toFixed(1)} 60 ${(82 - 45 * escala).toFixed(1)}`}
                        fill="none" stroke={pd} strokeWidth="0.7" opacity="0.28" />
                </g>
              ))}
              {/* El centro es una cúpula, no un disco plano */}
              <circle cx="60" cy="82" r="12.5" fill={cd} />
              <circle cx="60" cy="82" r="11" fill={`url(#${gCentro})`} />
              {[[56,78,1.5],[63,78,1.3],[59,83,1.4],[66,83,1.2],[54,84,1.2],[61,87,1.3],[68,80,1.1],[52,80,1.1]].map(([x,y,r],i) => (
                <circle key={`md${i}`} cx={x} cy={y} r={r} fill={cd} opacity="0.4" />
              ))}
              <ellipse cx="55" cy="77" rx="4" ry="2.8" fill="#ffffff" opacity="0.3" />
            </g>
          )}

          {/* ---------------- CLAVEL ---------------- */}
          {tipo === 'clavel' && (
            <g>
              {/* Cáliz tubular: el rasgo que más distingue al clavel */}
              <path d="M50 96C50 106 50 116 52 122C56 125 64 125 68 122C70 116 70 106 70 96Z" fill={hoja} />
              <path d="M50 96C50 106 50 116 52 122C54 116 54 106 54 96Z" fill={hojaD} opacity="0.55" />
              <path d="M50 98C53 94 57 96 58 100M70 98C67 94 63 96 62 100" fill="none" stroke={hojaD} strokeWidth="1.6" strokeLinecap="round" />

              {/* Tres coronas de pétalos con el borde dentado */}
              <path d="M60 100C31 96 22 70 31 51C36 61 42 55 45 46C50 58 55 51 57 43C58 51 60 47 60 40C60 47 62 51 63 43C65 51 70 58 75 46C78 55 84 61 89 51C98 70 89 96 60 100Z" fill={pd} />
              <g transform="translate(60 100) scale(0.82) translate(-60 -100)">
                <path d="M60 100C31 96 22 70 31 51C36 61 42 55 45 46C50 58 55 51 57 43C58 51 60 47 60 40C60 47 62 51 63 43C65 51 70 58 75 46C78 55 84 61 89 51C98 70 89 96 60 100Z" fill={`url(#${gPetalo})`} />
              </g>
              <g transform="translate(60 98) scale(0.58) translate(-60 -98)">
                <path d="M60 100C31 96 22 70 31 51C36 61 42 55 45 46C50 58 55 51 57 43C58 51 60 47 60 40C60 47 62 51 63 43C65 51 70 58 75 46C78 55 84 61 89 51C98 70 89 96 60 100Z" fill={pl} />
              </g>
              <g transform="translate(60 96) scale(0.33) translate(-60 -96)">
                <path d="M60 100C31 96 22 70 31 51C36 61 42 55 45 46C50 58 55 51 57 43C58 51 60 47 60 40C60 47 62 51 63 43C65 51 70 58 75 46C78 55 84 61 89 51C98 70 89 96 60 100Z" fill={c} opacity="0.85" />
              </g>
              <path d="M44 70C49 77 54 82 60 85" fill="none" stroke={pl} strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
              <path d="M76 70C71 77 66 82 60 85" fill="none" stroke={pd} strokeWidth="1.6" strokeLinecap="round" opacity="0.35" />
            </g>
          )}

        </g>
      </g>
    </svg>
  )
}
