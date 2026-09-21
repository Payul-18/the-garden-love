/**
 * Pasto — las matas de hierba que le dan relieve al suelo.
 *
 * Sin ellas el prado es un degradado liso y se nota que es un fondo. Las
 * matas se reparten a distintas alturas y tamaños: las de abajo son más
 * grandes y oscuras (están cerca), las de arriba pequeñas y claras (están
 * lejos). Todas se mecen, cada una a su ritmo.
 */

// Verdes de cada ambiente, del más lejano al más cercano.
export const VERDES = {
  dia:       ['#6fbb5e', '#57a94e', '#428b3d'],
  atardecer: ['#61764a', '#4e6339', '#3c4f2c'],
  noche:     ['#1f4a46', '#183d3a', '#11302f'],
}

/** Una mata: tres o cinco briznas que salen del mismo punto. */
export function Mata({ color, ancho = 30, alto = 18, briznas = 5 }) {
  const medio = ancho / 2
  const hojas = Array.from({ length: briznas }, (_, i) => {
    // Las briznas se abren en abanico desde el centro hacia los lados.
    const t = briznas === 1 ? 0 : (i / (briznas - 1)) * 2 - 1
    const puntaX = medio + t * medio * 0.95
    const puntaY = alto * (1 - Math.abs(t) * 0.42)
    const curvaX = medio + t * medio * 0.35
    return `M${medio} ${alto} Q${curvaX} ${alto - puntaY * 0.62} ${puntaX} ${alto - puntaY}`
  })

  return (
    <svg viewBox={`0 0 ${ancho} ${alto}`} style={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}>
      {hojas.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color}
              strokeWidth={ancho * 0.075} strokeLinecap="round" />
      ))}
    </svg>
  )
}

/**
 * Reparto de matas por el suelo. Están escritas a mano y no generadas al
 * azar a propósito: así el prado se ve igual en cada visita y no "baila"
 * cada vez que la pantalla se repinta.
 *
 *   [izquierda, altura desde abajo, ancho, capa (0 lejos · 2 cerca), ritmo]
 */
const MATAS = [
  ['3%',  '41%', 26, 0, 4.2], ['14%', '39%', 22, 0, 5.1], ['27%', '42%', 24, 0, 4.6],
  ['41%', '40%', 20, 0, 5.6], ['55%', '41%', 26, 0, 4.4], ['68%', '39%', 22, 0, 5.3],
  ['81%', '42%', 25, 0, 4.8], ['92%', '40%', 21, 0, 5.8],

  ['7%',  '30%', 34, 1, 4.0], ['21%', '28%', 30, 1, 5.4], ['36%', '31%', 32, 1, 4.5],
  ['52%', '29%', 28, 1, 5.9], ['64%', '31%', 34, 1, 4.3], ['78%', '28%', 30, 1, 5.2],
  ['89%', '30%', 26, 1, 4.9],

  ['2%',  '17%', 44, 2, 3.8], ['17%', '15%', 40, 2, 5.0], ['33%', '18%', 46, 2, 4.4],
  ['49%', '16%', 38, 2, 5.5], ['63%', '18%', 44, 2, 4.1], ['76%', '15%', 42, 2, 5.7],
  ['88%', '17%', 40, 2, 4.7],
]

export default function Pasto({ ambiente = 'dia' }) {
  const verdes = VERDES[ambiente] ?? VERDES.dia

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {MATAS.map(([izq, abajo, ancho, capa, ritmo], i) => (
        <div key={i} style={{
          position: 'absolute', left: izq, bottom: abajo,
          width: ancho, height: ancho * 0.6,
          transformOrigin: 'bottom center',
          animation: `pastoMece ${ritmo}s ease-in-out infinite`,
          // Retardos irregulares: si ondearan a la vez parecería una ola.
          animationDelay: `${-(i * 0.37) % 5}s`,
          opacity: capa === 0 ? 0.75 : capa === 1 ? 0.88 : 1,
        }}>
          <Mata color={verdes[capa]} ancho={ancho} alto={ancho * 0.6} briznas={capa === 2 ? 5 : 3} />
        </div>
      ))}
    </div>
  )
}
