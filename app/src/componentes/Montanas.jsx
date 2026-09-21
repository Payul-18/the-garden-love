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
            Macizos anchos con laderas desiguales, hombros y cumbres
            secundarias: una montaña real casi nunca es simétrica, y esa
            asimetría es lo que la hace creíble. */}
        <path d="M0 270 L0 142 C14 134 26 122 38 104 L60 58 L74 84 L92 50 L108 92
                 C118 108 128 104 140 90 L166 36 L184 74 L198 54 L214 100
                 C226 116 238 110 250 92 L274 44 L292 82 L308 58 L324 102
                 C336 118 350 112 362 98 L375 70 L375 270Z" fill={c.lejos} />

        {/* Caras iluminadas: la luz entra por la derecha, igual en todas */}
        <path d="M92 50 L108 92 L98 92 Z" fill={c.lejosLuz} />
        <path d="M166 36 L184 74 L172 74 Z" fill={c.lejosLuz} />
        <path d="M274 44 L292 82 L280 82 Z" fill={c.lejosLuz} />
        <path d="M60 58 L74 84 L66 84 Z" fill={c.lejosLuz} />
        <path d="M198 54 L214 100 L204 100 Z" fill={c.lejosLuz} />
        <path d="M308 58 L324 102 L314 102 Z" fill={c.lejosLuz} />

        {/* Nieve en TODAS las cumbres. Baja por las vaguadas y se retira
            en las aristas, que es como se derrite de verdad. */}
        <path d="M166 36 L184 74 L177 68 L172 80 L166 70 L160 82 L153 70 L148 76 L156 56Z" fill={c.nieveLejos} />
        <path d="M92 50 L108 92 L102 85 L97 95 L92 84 L86 94 L80 84 L84 68Z" fill={c.nieveLejos} />
        <path d="M274 44 L292 82 L286 76 L281 87 L275 77 L269 88 L263 77 L268 60Z" fill={c.nieveLejos} />
        <path d="M60 58 L74 84 L69 79 L65 89 L60 80 L55 90 L50 80 L54 69Z" fill={c.nieveLejos} />
        <path d="M198 54 L214 100 L208 93 L203 104 L198 93 L192 104 L186 92 L191 72Z" fill={c.nieveLejos} />
        <path d="M308 58 L324 102 L318 95 L313 106 L308 95 L302 106 L296 94 L301 76Z" fill={c.nieveLejos} />

        {/* Aristas: las líneas que separan una ladera de otra */}
        <path d="M166 36 L162 84 M92 50 L88 96 M274 44 L270 90 M198 54 L194 102 M308 58 L304 106"
              fill="none" stroke={c.lejosLuz} strokeWidth="1.2" opacity=".5" />

        {/* --- Cordillera media ---
            Sube respecto de antes: sus cumbres quedaban casi a ras del
            bosque y parecían montículos, no montañas. */}
        <path d="M0 270 L0 172 C22 164 42 170 62 154 L96 106 L116 142 L138 120 L160 158
                 C176 174 192 168 208 150 L236 112 L258 150 L276 128 L298 164
                 C314 178 332 174 348 156 L375 134 L375 270Z" fill={c.medio} />
        <path d="M96 106 L116 142 L106 142 Z" fill={c.medioLuz} />
        <path d="M236 112 L258 150 L246 150 Z" fill={c.medioLuz} />
        <path d="M138 120 L160 158 L150 158 Z" fill={c.medioLuz} />
        <path d="M348 156 L375 134 L375 158 Z" fill={c.medioLuz} />

        {/* También nevadas: antes solo dos de las cinco tenían nieve */}
        <path d="M96 106 L116 142 L110 136 L105 146 L99 137 L93 147 L88 137 L91 122Z" fill={c.nieveMedio} />
        <path d="M236 112 L258 150 L252 144 L246 154 L240 144 L234 154 L228 144 L232 128Z" fill={c.nieveMedio} />
        <path d="M138 120 L160 158 L154 152 L149 162 L143 152 L137 162 L131 151 L134 136Z" fill={c.nieveMedio} />
        <path d="M276 128 L298 164 L292 158 L287 168 L281 158 L276 166 L270 156 L272 142Z" fill={c.nieveMedio} />

        {/* --- Lomas del pie: enlazan las montañas con el prado llano --- */}
        <path d="M0 270 L0 216 C28 210 54 216 82 210 C110 204 132 211 162 206
                 C192 201 212 208 242 204 C272 200 294 206 324 203
                 C348 200 362 205 375 203 L375 270Z" fill={c.medio} opacity=".55" />

        {/* Bruma entre las montañas y el bosque: da la distancia */}
        <rect x="0" y="178" width="375" height="50" fill={c.bruma} opacity=".5" />

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
