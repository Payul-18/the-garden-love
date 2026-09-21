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
  // Capa lejana: matas pequeñas al ras de la colina más alta
  ['2%',  '31%', 20, 0, 4.2], ['9%',  '29%', 17, 0, 5.1], ['16%', '32%', 19, 0, 4.6],
  ['23%', '30%', 16, 0, 5.6], ['30%', '31%', 20, 0, 4.4], ['37%', '29%', 17, 0, 5.3],
  ['44%', '32%', 18, 0, 4.8], ['51%', '30%', 16, 0, 5.8], ['58%', '31%', 19, 0, 4.1],
  ['65%', '29%', 17, 0, 5.5], ['72%', '32%', 20, 0, 4.9], ['79%', '30%', 16, 0, 5.2],
  ['86%', '31%', 18, 0, 4.3], ['93%', '29%', 17, 0, 5.7],

  // Capa media
  ['1%',  '22%', 26, 1, 4.0], ['8%',  '20%', 23, 1, 5.4], ['15%', '23%', 27, 1, 4.5],
  ['22%', '21%', 22, 1, 5.9], ['29%', '22%', 25, 1, 4.3], ['36%', '20%', 24, 1, 5.2],
  ['43%', '23%', 28, 1, 4.9], ['50%', '21%', 22, 1, 5.6], ['57%', '22%', 26, 1, 4.2],
  ['64%', '20%', 23, 1, 5.0], ['71%', '23%', 27, 1, 4.7], ['78%', '21%', 24, 1, 5.5],
  ['85%', '22%', 25, 1, 4.4], ['92%', '20%', 22, 1, 5.8],

  // Capa cercana: matas grandes y densas pegadas al borde inferior
  ['0%',  '9%',  34, 2, 3.8], ['7%',  '6%',  31, 2, 5.0], ['14%', '10%', 36, 2, 4.4],
  ['21%', '7%',  30, 2, 5.5], ['28%', '9%',  35, 2, 4.1], ['35%', '6%',  33, 2, 5.7],
  ['42%', '10%', 37, 2, 4.7], ['49%', '7%',  31, 2, 5.3], ['56%', '9%',  34, 2, 4.0],
  ['63%', '6%',  32, 2, 5.6], ['70%', '10%', 36, 2, 4.5], ['77%', '7%',  30, 2, 5.1],
  ['84%', '9%',  35, 2, 4.8], ['91%', '6%',  33, 2, 5.4], ['96%', '10%', 32, 2, 4.2],

  // Segunda fila cercana, intercalada: es lo que da espesura
  ['4%',  '3%',  38, 2, 4.6], ['18%', '2%',  40, 2, 5.2], ['32%', '4%',  36, 2, 4.0],
  ['46%', '2%',  39, 2, 5.5], ['60%', '3%',  37, 2, 4.3], ['74%', '2%',  41, 2, 5.0],
  ['88%', '4%',  38, 2, 4.9],
]

export default function Pasto({ ambiente = 'dia' }) {
  const verdes = VERDES[ambiente] ?? VERDES.dia

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {MATAS.map(([izq, abajo, ancho, capa, ritmo], i) => (
        <div key={i} style={{
          position: 'absolute', left: izq, bottom: abajo, isolation: 'isolate',
          width: ancho, height: ancho * 0.6,
          transformOrigin: 'bottom center',
          animation: `pastoMece ${ritmo}s ease-in-out infinite`,
          // Retardos irregulares: si ondearan a la vez parecería una ola.
          animationDelay: `${-(i * 0.37) % 5}s`,
          opacity: capa === 0 ? 0.42 : capa === 1 ? 0.52 : 0.62,
        }}>
          {/* Sombra al pie: sin ella las briznas parecen pegadas al fondo
              en vez de salir de la tierra. Es lo que da el relieve. */}
          <div style={{
            position: 'absolute', left: '50%', bottom: -2,
            width: ancho * 0.9, height: ancho * 0.16, marginLeft: -ancho * 0.45,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${verdes[2]} 0%, transparent 70%)`,
            opacity: 0.5,
          }} />
          <Mata color={verdes[capa]} ancho={ancho} alto={ancho * 0.6} briznas={capa === 2 ? 7 : capa === 1 ? 5 : 3} />
        </div>
      ))}
    </div>
  )
}
