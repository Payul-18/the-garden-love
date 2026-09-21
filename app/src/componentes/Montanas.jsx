/**
 * Montañas — el horizonte del jardín.
 *
 * Tres planos a distinta distancia: cordillera nevada al fondo, montañas
 * medias, y un bosque de pinos al pie. Cada plano es más claro y más azul
 * cuanto más lejos está, que es como se ve la distancia de verdad; sin eso
 * las capas se aplastan y parecen recortes pegados.
 *
 * La base queda por debajo de la línea de las colinas, así que se esconde
 * detrás del prado y solo asoman las cumbres.
 */

const PALETA = {
  dia: {
    lejos: '#9fc0e2', lejosLuz: '#bcd6f0', nieveLejos: '#f4faff',
    medio: '#7ea6cc', medioLuz: '#9cc0e0', nieveMedio: '#ffffff',
    bosque: '#40734f', bosqueLuz: '#4f8a5c', tronco: '#4a3a2a',
    bruma: 'rgba(200,228,248,.55)',
  },
  atardecer: {
    lejos: '#b58aaa', lejosLuz: '#d2a6bd', nieveLejos: '#ffe8d6',
    medio: '#8e6389', medioLuz: '#a87d9c', nieveMedio: '#ffd9c0',
    bosque: '#4e5440', bosqueLuz: '#5f6549', tronco: '#3b3226',
    bruma: 'rgba(255,190,150,.4)',
  },
  noche: {
    lejos: '#39406e', lejosLuz: '#4a5288', nieveLejos: '#cdd6f5',
    medio: '#2a2f55', medioLuz: '#373e6b', nieveMedio: '#aab5e0',
    bosque: '#1d3440', bosqueLuz: '#25404d', tronco: '#16222b',
    bruma: 'rgba(90,110,170,.35)',
  },
}

/** Un pino: tres faldones y su tronquito. */
function Pino({ x, y, alto, color, luz, tronco }) {
  const a = alto
  const ancho = a * 0.62
  return (
    <g>
      <rect x={x - a * 0.045} y={y - a * 0.1} width={a * 0.09} height={a * 0.14} fill={tronco} />
      <path d={`M${x} ${y - a} L${x + ancho / 2} ${y - a * 0.52} L${x - ancho / 2} ${y - a * 0.52} Z`} fill={luz} />
      <path d={`M${x} ${y - a * 0.82} L${x + ancho * 0.58} ${y - a * 0.28} L${x - ancho * 0.58} ${y - a * 0.28} Z`} fill={color} />
      <path d={`M${x} ${y - a * 0.58} L${x + ancho * 0.66} ${y - a * 0.06} L${x - ancho * 0.66} ${y - a * 0.06} Z`} fill={color} />
    </g>
  )
}

// Reparto del bosque: alturas irregulares para que no parezca un peine.
const PINOS = [
  [8, 34], [26, 46], [44, 30], [60, 40], [78, 52], [96, 36], [114, 44],
  [132, 30], [150, 48], [168, 38], [186, 33], [204, 45], [222, 31],
  [240, 42], [258, 50], [276, 35], [294, 44], [312, 32], [330, 47], [350, 37], [368, 31],
]

export default function Montanas({ ambiente = 'dia' }) {
  const c = PALETA[ambiente] ?? PALETA.dia

  return (
    <div aria-hidden="true" style={{
      position: 'absolute', left: 0, right: 0, bottom: '34%',
      pointerEvents: 'none',
    }}>
      <svg viewBox="0 0 375 210" preserveAspectRatio="xMidYMax meet"
           style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>

        {/* --- Cordillera del fondo, nevada --- */}
        <path d="M0 210 L36 118 L64 152 L104 74 L138 128 L166 96 L196 140 L232 86 L266 136 L300 100 L332 146 L375 116 L375 210Z"
              fill={c.lejos} />
        {/* Caras iluminadas: la luz viene de la derecha */}
        <path d="M104 74 L138 128 L120 128 Z" fill={c.lejosLuz} />
        <path d="M232 86 L266 136 L248 136 Z" fill={c.lejosLuz} />
        <path d="M300 100 L332 146 L316 146 Z" fill={c.lejosLuz} />

        {/* Nieve de las cumbres altas, con el borde irregular */}
        <path d="M104 74 L118 96 L112 92 L107 99 L101 93 L96 99 L90 96Z" fill={c.nieveLejos} />
        <path d="M232 86 L245 106 L239 102 L234 109 L229 103 L224 109 L219 106Z" fill={c.nieveLejos} />
        <path d="M300 100 L311 118 L306 114 L302 120 L297 115 L293 120 L289 118Z" fill={c.nieveLejos} />
        <path d="M36 118 L46 133 L42 130 L38 136 L34 131 L30 136 L27 133Z" fill={c.nieveLejos} />
        <path d="M166 96 L177 114 L172 110 L168 117 L163 111 L159 117 L155 114Z" fill={c.nieveLejos} />

        {/* --- Montañas medias --- */}
        <path d="M0 210 L48 144 L86 176 L130 132 L172 172 L214 138 L258 174 L302 148 L346 178 L375 156 L375 210Z"
              fill={c.medio} />
        <path d="M130 132 L172 172 L150 172 Z" fill={c.medioLuz} />
        <path d="M214 138 L258 174 L236 174 Z" fill={c.medioLuz} />
        <path d="M130 132 L142 150 L137 147 L132 153 L127 148 L122 153 L118 150Z" fill={c.nieveMedio} />
        <path d="M214 138 L226 156 L221 153 L216 159 L211 154 L207 159 L203 156Z" fill={c.nieveMedio} />

        {/* Bruma que separa las montañas del bosque: es lo que da distancia */}
        <rect x="0" y="150" width="375" height="42" fill={c.bruma} />

        {/* --- Bosque de pinos al pie --- */}
        {PINOS.map(([x, alto], i) => (
          <Pino key={i} x={x} y={205} alto={alto} color={c.bosque} luz={c.bosqueLuz} tronco={c.tronco} />
        ))}
      </svg>
    </div>
  )
}
