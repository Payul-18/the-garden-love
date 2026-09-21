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
  dia:       ['#4f8a55', '#417a4a', '#356540'],
  atardecer: ['#4e6142', '#3f5135', '#31402a'],
  noche:     ['#1a3c3b', '#143130', '#0e2524'],
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
  // Capa lejana: al ras de la colina más alta, nunca por encima del 32%
  ['3%',  '31%', 22, 0, 4.2], ['14%', '29%', 19, 0, 5.1], ['27%', '32%', 20, 0, 4.6],
  ['41%', '30%', 17, 0, 5.6], ['55%', '31%', 22, 0, 4.4], ['68%', '29%', 19, 0, 5.3],
  ['81%', '32%', 21, 0, 4.8], ['92%', '30%', 18, 0, 5.8],

  // Capa media
  ['7%',  '21%', 28, 1, 4.0], ['21%', '19%', 25, 1, 5.4], ['36%', '22%', 27, 1, 4.5],
  ['52%', '20%', 23, 1, 5.9], ['64%', '22%', 28, 1, 4.3], ['78%', '19%', 25, 1, 5.2],
  ['89%', '21%', 22, 1, 4.9],

  // Capa cercana, pegada al borde inferior
  ['2%',  '8%',  36, 2, 3.8], ['17%', '6%',  33, 2, 5.0], ['33%', '9%',  38, 2, 4.4],
  ['49%', '7%',  31, 2, 5.5], ['63%', '9%',  36, 2, 4.1], ['76%', '6%',  35, 2, 5.7],
  ['88%', '8%',  33, 2, 4.7],
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
          opacity: capa === 0 ? 0.42 : capa === 1 ? 0.52 : 0.62,
        }}>
          <Mata color={verdes[capa]} ancho={ancho} alto={ancho * 0.6} briznas={capa === 2 ? 5 : 3} />
        </div>
      ))}
    </div>
  )
}
