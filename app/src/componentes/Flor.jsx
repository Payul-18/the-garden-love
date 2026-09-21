/**
 * Flor — la ilustración SVG de una flor.
 *
 * Un solo dibujo por especie, pintado con las variables de color que recibe.
 * El tallo y la cabeza se mecen por separado y con ritmos distintos: por eso
 * el jardín parece vivo aunque nadie lo toque.
 *
 * Props:
 *   tipo        girasol | rosa | tulipan | margarita | clavel
 *   p/pd/pl/c/cd  colores del pétalo, su sombra, su luz, el centro y su sombra
 *   tallo/hoja/hojaD  los verdes
 *   soloCabeza  true durante el florecimiento, donde el tallo se dibuja aparte
 *   dur/delay   duración y retardo del vaivén, para desincronizar las flores
 *   fx          filtro CSS extra (de noche, el brillo propio de la flor)
 */

// Los pétalos se generan por rotación para no repetir 18 veces el mismo path.
const GIRASOL_FONDO = [0, 41, 80, 119, 161, 200, 240, 281, 320]
const GIRASOL_FRENTE = [20, 60, 100, 141, 180, 221, 260, 300, 340]
const MARGARITA_FONDO = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
const MARGARITA_FRENTE = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345]
const ROSA_FONDO = [0, 74, 146, 216, 288]
const ROSA_MEDIO = [36, 112, 188, 262]

// Motas del centro del girasol: dan textura de semillas sin ser un patrón rígido.
const SEMILLAS = [
  [54, 72, 0.6], [62, 70, 0.6], [58, 78, 0.6], [66, 76, 0.6],
  [52, 81, 0.6], [62, 86, 0.6], [69, 83, 0.5], [55, 89, 0.5],
]

export default function Flor({
  tipo = 'girasol',
  p = '#ffc93c', pd = '#eda428', pl = '#ffe6a3', c = '#7a4a1f', cd = '#543012',
  tallo = '#4e9a4a', hoja = '#59ad53', hojaD = '#3c8038',
  soloCabeza = false, dur = 4.4, delay = 0, fx = 'none',
}) {
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
      <g style={vaiven}>

        {!soloCabeza && (
          <g>
            <path d="M60 200C56 172 65 146 60 104" fill="none" stroke={tallo} strokeWidth="7" strokeLinecap="round" />
            <path d="M59 196C56 172 64 148 60 112" fill="none" stroke={hojaD} strokeWidth="2" strokeLinecap="round" opacity="0.45" />
            <path d="M60 158C42 148 26 152 19 166C33 178 52 176 60 158Z" fill={hoja} />
            <path d="M57 159C45 160 32 163 22 168" fill="none" stroke={hojaD} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
            <path d="M62 130C80 118 97 123 102 138C87 149 70 146 62 130Z" fill={hoja} />
            <path d="M65 131C77 130 90 133 99 139" fill="none" stroke={hojaD} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          </g>
        )}

        <g style={cabeceo}>

          {tipo === 'girasol' && (
            <g>
              {GIRASOL_FONDO.map((a) => (
                <path key={`gf${a}`} d="M60 78C46 60 43 30 60 20C77 30 74 60 60 78Z" fill={pd} transform={`rotate(${a} 60 78)`} />
              ))}
              {GIRASOL_FRENTE.map((a) => (
                <path key={`gp${a}`} d="M60 78C49 63 46 38 60 28C74 38 71 63 60 78Z" fill={p} stroke={pd} strokeWidth="0.7" transform={`rotate(${a} 60 78)`} />
              ))}
              <path d="M60 50C54 56 52 64 53 70" fill="none" stroke={pl} strokeWidth="2.4" strokeLinecap="round" opacity="0.65" transform="rotate(20 60 78)" />
              <path d="M60 50C54 56 52 64 53 70" fill="none" stroke={pl} strokeWidth="2.4" strokeLinecap="round" opacity="0.65" transform="rotate(300 60 78)" />
              <circle cx="60" cy="78" r="23" fill={cd} />
              <circle cx="59" cy="77" r="19" fill={c} />
              {SEMILLAS.map(([x, y, o], i) => (
                <circle key={`s${i}`} cx={x} cy={y} r="1.7" fill={cd} opacity={o} />
              ))}
              <ellipse cx="51" cy="68" rx="9" ry="6" fill="#ffffff" opacity="0.2" transform="rotate(-24 51 68)" />
              <path d="M43 88C48 95 58 99 68 96" fill="none" stroke="#000000" strokeWidth="2.4" strokeLinecap="round" opacity="0.12" />
            </g>
          )}

          {tipo === 'rosa' && (
            <g>
              {ROSA_FONDO.map((a) => (
                <path key={`rf${a}`} d="M60 96C40 90 32 68 42 54C52 44 70 46 74 60C78 74 70 90 60 96Z" fill={pd} transform={`rotate(${a} 60 84)`} />
              ))}
              {ROSA_MEDIO.map((a) => (
                <path key={`rm${a}`} d="M60 92C46 86 41 70 49 60C56 52 69 54 72 64C75 74 69 87 60 92Z" fill={p} transform={`rotate(${a} 60 82)`} />
              ))}
              <path d="M60 86C51 82 47 72 53 65C59 59 69 62 70 70C71 78 66 84 60 86Z" fill={pl} />
              <path d="M60 80C55 78 53 72 57 69C61 66 66 69 65 73C64 77 61 79 58 78" fill="none" stroke={pd} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
              <path d="M52 62C56 57 63 56 68 60" fill="none" stroke={pl} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <path d="M44 92C50 100 70 100 76 92C72 104 48 104 44 92Z" fill={hojaD} />
            </g>
          )}

          {tipo === 'tulipan' && (
            <g>
              <path d="M60 100C40 96 31 72 36 44C43 56 51 61 60 61C69 61 77 56 84 44C89 72 80 96 60 100Z" fill={pd} />
              <path d="M60 100C46 94 40 72 43 47C49 58 54 62 60 62C60 74 60 88 60 100Z" fill={p} />
              <path d="M60 100C50 90 47 66 52 45C57 57 63 57 68 45C73 66 70 90 60 100Z" fill={pl} />
              <path d="M57 56C55 70 55 86 58 97" fill="none" stroke={pd} strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
              <path d="M66 52C69 66 69 84 65 96" fill="none" stroke={pd} strokeWidth="1.6" strokeLinecap="round" opacity="0.35" />
              <ellipse cx="51" cy="70" rx="5" ry="12" fill="#ffffff" opacity="0.16" transform="rotate(-8 51 70)" />
            </g>
          )}

          {tipo === 'margarita' && (
            <g>
              {MARGARITA_FONDO.map((a) => (
                <path key={`mf${a}`} d="M60 82C52 70 50 44 60 31C70 44 68 70 60 82Z" fill={pd} transform={`rotate(${a} 60 82)`} />
              ))}
              {MARGARITA_FRENTE.map((a) => (
                <path key={`mp${a}`} d="M60 82C53 70 51 45 60 33C69 45 67 70 60 82Z" fill={p} transform={`rotate(${a} 60 82)`} />
              ))}
              <circle cx="60" cy="82" r="13" fill={cd} />
              <circle cx="59" cy="81" r="10" fill={c} />
              <ellipse cx="55" cy="77" rx="4" ry="3" fill="#ffffff" opacity="0.28" />
            </g>
          )}

          {tipo === 'clavel' && (
            <g>
              <path d="M60 98C34 94 26 70 34 54C39 63 45 58 48 50C52 61 57 55 60 48C63 55 68 61 72 50C75 58 81 63 86 54C94 70 86 94 60 98Z" fill={pd} />
              <g transform="translate(60 98) scale(0.8) translate(-60 -98)">
                <path d="M60 98C34 94 26 70 34 54C39 63 45 58 48 50C52 61 57 55 60 48C63 55 68 61 72 50C75 58 81 63 86 54C94 70 86 94 60 98Z" fill={p} />
              </g>
              <g transform="translate(60 96) scale(0.55) translate(-60 -96)">
                <path d="M60 98C34 94 26 70 34 54C39 63 45 58 48 50C52 61 57 55 60 48C63 55 68 61 72 50C75 58 81 63 86 54C94 70 86 94 60 98Z" fill={pl} />
              </g>
              <path d="M48 96C52 106 68 106 72 96C74 110 46 110 48 96Z" fill={hojaD} />
              <path d="M46 72C50 78 54 82 60 84" fill="none" stroke={pl} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            </g>
          )}

        </g>
      </g>
    </svg>
  )
}
