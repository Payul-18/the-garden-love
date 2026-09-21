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
              {/* Hojas del cáliz, abiertas hacia los lados */}
              <path d="M44 94C34 98 26 108 24 120C36 118 44 108 47 97Z" fill={hoja} />
              <path d="M76 94C86 98 94 108 96 120C84 118 76 108 73 97Z" fill={hoja} />
              <path d="M44 94C36 99 30 107 27 116C36 113 42 105 46 96Z" fill={hojaD} opacity=".5" />
              <path d="M76 94C84 99 90 107 93 116C84 113 78 105 74 96Z" fill={hojaD} opacity=".5" />

              {/* Sépalos pegados al capullo */}
              <path d="M47 100C43 91 42 82 44 74C48 82 50 91 50 100Z" fill={hojaD} />
              <path d="M73 100C77 91 78 82 76 74C72 82 70 91 70 100Z" fill={hojaD} />
              <path d="M60 104C58 95 58 87 60 80C62 87 62 95 60 104Z" fill={hojaD} />

              {/* Silueta del capullo */}
              <path d="M60 104C40 100 31 82 32 61C33 41 45 26 60 26C75 26 87 41 88 61C89 82 80 100 60 104Z" fill={pd} />

              {/* --- Los pétalos, en franjas VERTICALES ---
                  Cada uno baja entero desde arriba hasta la base del capullo,
                  como las hojas de una cebolla. Antes estaban dispuestos en
                  corona alrededor de un centro, y eso es una flor vista desde
                  arriba; una rosa de perfil se lee por estas costuras que
                  recorren la flor de arriba abajo. */}

              {/* Franja exterior izquierda */}
              <path d="M32 62C32 43 41 28 54 25C46 40 42 54 42 70C42 87 46 97 53 104C40 99 32 81 32 62Z" fill={p} />
              {/* Franja exterior derecha */}
              <path d="M88 62C88 43 79 28 66 25C74 40 78 54 78 70C78 87 74 97 67 104C80 99 88 81 88 62Z" fill={p} />
              <path d="M88 62C88 45 80 31 68 26C76 41 79 55 79 71C79 88 75 98 69 104C81 99 88 80 88 62Z" fill={pd} opacity=".4" />

              {/* Franja media izquierda */}
              <path d="M43 70C43 51 48 36 57 28C52 43 49 56 49 71C49 87 51 97 56 104C47 98 43 86 43 70Z" fill={`url(#${gPetalo})`} />
              {/* Franja media derecha */}
              <path d="M77 70C77 51 72 36 63 28C68 43 71 56 71 71C71 87 69 97 64 104C73 98 77 86 77 70Z" fill={`url(#${gPetalo})`} />
              <path d="M77 70C77 53 73 38 65 29C70 44 72 57 72 72C72 88 70 98 66 104C74 98 77 85 77 70Z" fill={pd} opacity=".3" />

              {/* Franja central: la más alta y la más iluminada */}
              <path d="M60 26C68 35 72 51 72 70C72 88 68 98 60 105C52 98 48 88 48 70C48 51 52 35 60 26Z" fill={pl} />
              <path d="M60 30C66 38 69 52 69 70C69 87 66 96 60 103C60 79 60 54 60 30Z" fill={p} opacity=".55" />

              {/* Costuras: las líneas verticales donde una franja monta sobre
                  la siguiente. Son las que dan el volumen del capullo. */}
              <path d="M42 70C42 53 46 38 54 27" fill="none" stroke={pd} strokeWidth="1.5" strokeLinecap="round" opacity=".45" />
              <path d="M78 70C78 53 74 38 66 27" fill="none" stroke={pd} strokeWidth="1.5" strokeLinecap="round" opacity=".45" />
              <path d="M49 71C49 55 52 41 58 30" fill="none" stroke={pd} strokeWidth="1.3" strokeLinecap="round" opacity=".35" />
              <path d="M71 71C71 55 68 41 62 30" fill="none" stroke={pd} strokeWidth="1.3" strokeLinecap="round" opacity=".35" />

              {/* Bordes rizados, arriba, donde cada franja se abre */}
              <path d="M32 58C33 42 41 29 54 25" fill="none" stroke={pl} strokeWidth="2.6" strokeLinecap="round" opacity=".6" />
              <path d="M43 64C44 48 49 36 57 28" fill="none" stroke={pl} strokeWidth="2.2" strokeLinecap="round" opacity=".5" />
              <path d="M88 58C87 42 79 29 66 25" fill="none" stroke={pl} strokeWidth="2.2" strokeLinecap="round" opacity=".35" />

              {/* El remolino del remate, pequeño y arriba del todo */}
              <path d="M60 28C55 34 53 41 56 46C59 50 65 48 65 43C65 39 62 37 60 39" fill="none"
                    stroke={pd} strokeWidth="2" strokeLinecap="round" opacity=".7" />
              <path d="M60 32C57 37 56 42 58 45" fill="none" stroke={pl} strokeWidth="1.6" strokeLinecap="round" opacity=".6" />

              {/* Luz general, vertical como la flor */}
              <ellipse cx="50" cy="58" rx="6" ry="20" fill="#ffffff" opacity=".13" transform="rotate(-8 50 58)" />
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
