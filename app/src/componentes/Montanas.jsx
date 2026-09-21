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

        {/* --- Cordillera del fondo, nevada y bien alta --- */}
        <path d="M0 270 L30 96 L58 148 L98 34 L134 118 L164 70 L196 132 L234 44 L270 126 L306 62 L338 134 L375 88 L375 270Z"
              fill={c.lejos} />
        <path d="M98 34 L134 118 L114 118 Z" fill={c.lejosLuz} />
        <path d="M234 44 L270 126 L250 126 Z" fill={c.lejosLuz} />
        <path d="M306 62 L338 134 L320 134 Z" fill={c.lejosLuz} />
        <path d="M164 70 L196 132 L178 132 Z" fill={c.lejosLuz} />

        {/* Nieve: borde dentado, como se derrite de verdad */}
        <path d="M98 34 L116 66 L109 61 L103 70 L96 63 L89 71 L82 66Z" fill={c.nieveLejos} />
        <path d="M234 44 L251 76 L244 71 L238 80 L231 72 L225 80 L218 76Z" fill={c.nieveLejos} />
        <path d="M306 62 L320 90 L314 85 L309 93 L303 86 L298 93 L292 90Z" fill={c.nieveLejos} />
        <path d="M164 70 L178 98 L172 93 L167 101 L161 94 L156 101 L150 98Z" fill={c.nieveLejos} />
        <path d="M30 96 L42 118 L37 114 L32 121 L27 115 L22 121 L18 118Z" fill={c.nieveLejos} />

        {/* --- Montañas medias --- */}
        <path d="M0 270 L42 152 L82 200 L128 138 L174 194 L218 146 L264 198 L310 158 L352 202 L375 176 L375 270Z"
              fill={c.medio} />
        <path d="M128 138 L174 194 L150 194 Z" fill={c.medioLuz} />
        <path d="M218 146 L264 198 L240 198 Z" fill={c.medioLuz} />
        <path d="M128 138 L142 164 L136 160 L130 168 L124 161 L118 168 L113 164Z" fill={c.nieveMedio} />
        <path d="M218 146 L232 172 L226 168 L220 176 L214 169 L209 176 L203 172Z" fill={c.nieveMedio} />
        <path d="M310 158 L321 180 L316 177 L311 184 L306 178 L301 184 L297 180Z" fill={c.nieveMedio} />

        {/* Bruma entre las montañas y el bosque: da la distancia */}
        <rect x="0" y="176" width="375" height="46" fill={c.bruma} opacity=".5" />

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
