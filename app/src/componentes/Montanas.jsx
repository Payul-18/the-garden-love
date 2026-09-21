/**
 * Montañas — el horizonte del jardín.
 *
 * Tres planos a distinta distancia: cordillera nevada al fondo, montañas
 * medias, y un bosque de pinos al pie. Cada plano es más claro y más azul
 * cuanto más lejos está, que es como se ve la distancia de verdad.
 *
 * Lo que evita que el paisaje se vea "por partes" es el pie del bloque:
 * termina en un degradado hacia el color del césped, de modo que el bosque
 * no se apoya sobre una línea recta sino que se disuelve en el prado.
 */

const PALETA = {
  dia: {
    lejos: '#9dbfe3', lejosLuz: '#bdd8f2', nieveLejos: '#f6fbff',
    medio: '#79a3cb', medioLuz: '#9bc0e2', nieveMedio: '#ffffff',
    bosque: '#3d7050', bosqueLuz: '#4d8a5d', bosqueHondo: '#2f5b41',
    tronco: '#43352a', bruma: '#cfe6f7', suelo: '#7fc46a',
  },
  atardecer: {
    lejos: '#b98ead', lejosLuz: '#d6aac1', nieveLejos: '#ffeadb',
    medio: '#8f6489', medioLuz: '#ab809f', nieveMedio: '#ffdcc4',
    bosque: '#4b5240', bosqueLuz: '#5d6449', bosqueHondo: '#3a4033',
    tronco: '#362e24', bruma: '#e9a98f', suelo: '#8a6b58',
  },
  noche: {
    lejos: '#3a4173', lejosLuz: '#4c548d', nieveLejos: '#d0d8f7',
    medio: '#2a2f58', medioLuz: '#383f70', nieveMedio: '#aeb8e4',
    bosque: '#1b323f', bosqueLuz: '#243d4b', bosqueHondo: '#142731',
    tronco: '#132029', bruma: '#3c4a72', suelo: '#26324f',
  },
}

/** Un pino: tres faldones y su tronquito. */
function Pino({ x, y, alto, color, luz, tronco }) {
  const a = alto
  const ancho = a * 0.6
  return (
    <g>
      <rect x={x - a * 0.04} y={y - a * 0.1} width={a * 0.08} height={a * 0.14} fill={tronco} />
      <path d={`M${x} ${y - a} L${x + ancho / 2} ${y - a * 0.52} L${x - ancho / 2} ${y - a * 0.52} Z`} fill={luz} />
      <path d={`M${x} ${y - a * 0.82} L${x + ancho * 0.58} ${y - a * 0.28} L${x - ancho * 0.58} ${y - a * 0.28} Z`} fill={color} />
      <path d={`M${x} ${y - a * 0.58} L${x + ancho * 0.66} ${y - a * 0.06} L${x - ancho * 0.66} ${y - a * 0.06} Z`} fill={color} />
    </g>
  )
}

// Dos hileras de bosque: la de atrás más pequeña y hundida, la de delante
// más alta. Con una sola hilera se ve una valla; con dos, espesura.
const PINOS_FONDO = [
  [4, 30], [22, 40], [40, 26], [57, 36], [74, 44], [92, 31], [110, 38],
  [128, 26], [146, 42], [164, 33], [182, 29], [200, 39], [218, 27],
  [236, 37], [254, 44], [272, 30], [290, 38], [308, 28], [326, 41], [344, 32], [364, 28],
]
const PINOS_FRENTE = [
  [-4, 46], [14, 58], [32, 40], [50, 52], [68, 64], [86, 45], [104, 56],
  [122, 41], [140, 60], [158, 48], [176, 43], [194, 57], [212, 42],
  [230, 54], [248, 63], [266, 46], [284, 55], [302, 43], [320, 59], [338, 47], [358, 52], [374, 44],
]

export default function Montanas({ ambiente = 'dia' }) {
  const c = PALETA[ambiente] ?? PALETA.dia
  const id = `fundido-${ambiente}`

  return (
    <div aria-hidden="true" style={{
      position: 'absolute', left: 0, right: 0, bottom: '25%',
      pointerEvents: 'none',
    }}>
      <svg viewBox="0 0 375 270" preserveAspectRatio="xMidYMax meet"
           style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>

        <defs>
          {/* El pie del bosque se disuelve en el color del césped: es lo
              que cose el horizonte con el prado en vez de dejar un canto. */}
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.suelo} stopOpacity="0" />
            <stop offset="55%" stopColor={c.suelo} stopOpacity=".55" />
            <stop offset="100%" stopColor={c.suelo} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* --- Macizo del fondo ---
            No son triángulos: son macizos anchos con laderas desiguales,
            hombros y cumbres secundarias. Una montaña real casi nunca es
            simétrica, y esa asimetría es lo que la hace creíble. */}
        <path d="M0 270 L0 142 C14 134 26 122 38 104 L60 58 L74 84 L92 50 L108 92
                 C118 108 128 104 140 90 L166 36 L184 74 L198 58 L214 100
                 C226 116 238 110 250 92 L274 44 L292 82 L308 62 L324 102
                 C336 118 350 112 362 98 L375 74 L375 270Z" fill={c.lejos} />

        {/* Caras iluminadas: la luz entra por la derecha, igual en todas */}
        <path d="M92 50 L108 92 L98 92 Z" fill={c.lejosLuz} />
        <path d="M166 36 L184 74 L172 74 Z" fill={c.lejosLuz} />
        <path d="M274 44 L292 82 L280 82 Z" fill={c.lejosLuz} />
        <path d="M60 58 L74 84 L66 84 Z" fill={c.lejosLuz} />

        {/* Nieve: baja por las vaguadas y se retira en las aristas, que es
            como se derrite de verdad */}
        <path d="M166 36 L184 74 L177 68 L172 80 L166 70 L160 82 L153 70 L148 76 L156 56Z" fill={c.nieveLejos} />
        <path d="M92 50 L108 92 L102 85 L97 95 L92 84 L86 94 L80 84 L84 68Z" fill={c.nieveLejos} />
        <path d="M274 44 L292 82 L286 76 L281 87 L275 77 L269 88 L263 77 L268 60Z" fill={c.nieveLejos} />
        <path d="M60 58 L74 84 L69 80 L65 89 L60 81 L55 89 L50 81 L54 70Z" fill={c.nieveLejos} />

        {/* Aristas: las líneas que separan una ladera de otra */}
        <path d="M166 36 L162 84 M92 50 L88 96 M274 44 L270 90" fill="none"
              stroke={c.lejosLuz} strokeWidth="1.2" opacity=".5" />

        {/* --- Cordillera media: más ancha, más redondeada y más baja --- */}
        <path d="M0 270 L0 190 C22 182 42 188 62 174 L96 138 L116 170 L138 152 L160 186
                 C176 200 192 194 208 178 L236 144 L258 178 L276 160 L298 192
                 C314 204 332 200 348 186 L375 166 L375 270Z" fill={c.medio} />
        <path d="M96 138 L116 170 L106 170 Z" fill={c.medioLuz} />
        <path d="M236 144 L258 178 L246 178 Z" fill={c.medioLuz} />
        <path d="M96 138 L116 170 L110 164 L105 174 L99 165 L93 175 L88 166 L91 152Z" fill={c.nieveMedio} />
        <path d="M236 144 L258 178 L252 172 L246 182 L240 172 L234 182 L228 172 L232 158Z" fill={c.nieveMedio} />

        {/* --- Lomas del pie: enlazan las montañas con el prado llano --- */}
        <path d="M0 270 L0 224 C28 218 54 224 82 218 C110 212 132 219 162 214
                 C192 209 212 216 242 212 C272 208 294 214 324 211
                 C348 208 362 213 375 211 L375 270Z" fill={c.medio} opacity=".55" />

        {/* Bruma entre las montañas y el bosque: da la distancia */}
        <rect x="0" y="186" width="375" height="48" fill={c.bruma} opacity=".5" />

        {/* --- Bosque: dos hileras --- */}
        {PINOS_FONDO.map(([x, alto], i) => (
          <Pino key={`f${i}`} x={x} y={244} alto={alto} color={c.bosqueHondo} luz={c.bosque} tronco={c.tronco} />
        ))}
        {PINOS_FRENTE.map(([x, alto], i) => (
          <Pino key={`p${i}`} x={x} y={266} alto={alto} color={c.bosque} luz={c.bosqueLuz} tronco={c.tronco} />
        ))}

        {/* El fundido al césped, por encima de todo lo anterior */}
        <rect x="0" y="212" width="375" height="58" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
