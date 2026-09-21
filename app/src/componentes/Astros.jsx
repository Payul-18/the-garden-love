/**
 * Astros — el sol, la luna y las estrellas.
 *
 * Antes eran círculos con un degradado. Ahora tienen capas: halo que late,
 * rayos que giran despacio, destellos que orbitan. La gracia está en que
 * cada capa se mueva a su ritmo: si giraran juntas se vería el truco.
 */

/** Estrella de cuatro puntas, la forma de "brillo" de los cuentos. */
export function Chispa({ tam = 16, color = '#fff6d2', opacidad = 1 }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 16 16" style={{ display: 'block', opacity: opacidad, overflow: 'visible' }}>
      <path d="M8 0C8.6 4.6 11.4 7.4 16 8C11.4 8.6 8.6 11.4 8 16C7.4 11.4 4.6 8.6 0 8C4.6 7.4 7.4 4.6 8 0Z" fill={color} />
    </svg>
  )
}

/* ------------------------------------------------------------------
   Sol
------------------------------------------------------------------ */
// Doce rayos: los largos y los cortos se alternan, como en los cuentos.
const RAYOS = Array.from({ length: 12 }, (_, i) => ({ angulo: i * 30, largo: i % 2 ? 0.62 : 1 }))

export function Sol({ tam = 97 }) {
  return (
    <div style={{ position: 'relative', width: tam, height: tam }}>

      {/* Resplandor de fondo, que respira */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: tam * 2.6, height: tam * 2.6, marginLeft: -tam * 1.3, marginTop: -tam * 1.3,
        borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(255,236,160,.5) 0%,rgba(255,216,120,.22) 38%,rgba(255,210,110,0) 70%)',
        animation: 'haloLate 7s ease-in-out infinite',
      }} />

      {/* Corona de rayos, girando muy despacio */}
      <div style={{
        position: 'absolute', inset: 0,
        animation: 'rayosGiran 90s linear infinite',
      }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {RAYOS.map(({ angulo, largo }) => (
            <path
              key={angulo}
              d={`M100 ${76 - 56 * largo} L107 72 L93 72 Z`}
              fill="#ffe9a6"
              opacity={largo === 1 ? 0.85 : 0.55}
              transform={`rotate(${angulo} 100 100)`}
            />
          ))}
        </svg>
      </div>

      {/* Segunda corona en sentido contrario: el brillo nunca se repite igual */}
      <div style={{ position: 'absolute', inset: '12%', animation: 'rayosGiranAlReves 140s linear infinite' }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {RAYOS.map(({ angulo }) => (
            <path key={angulo} d="M100 34 L104 66 L96 66 Z" fill="#fff3c8" opacity=".4"
                  transform={`rotate(${angulo + 15} 100 100)`} />
          ))}
        </svg>
      </div>

      {/* El disco */}
      <div style={{
        position: 'absolute', inset: '18%', borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 32%,#fffef5 0%,#fff2bd 34%,#ffd979 68%,#ffbe52 100%)',
        boxShadow: '0 0 26px 8px rgba(255,220,140,.55), inset -6px -8px 18px rgba(230,150,50,.35)',
        animation: 'jSol 6s ease-in-out infinite',
      }} />

      {/* Destellos que orbitan el disco */}
      {[0, 120, 240].map((a, i) => (
        <div key={a} style={{
          position: 'absolute', left: '50%', top: '50%', width: 0, height: 0,
          animation: `orbita ${18 + i * 5}s linear infinite`,
          animationDelay: `${-i * 4}s`,
        }}>
          <div style={{ transform: `rotate(${a}deg) translateX(${tam * 0.72}px)` }}>
            <div style={{ animation: 'chispaLate 3.4s ease-in-out infinite', animationDelay: `${-i * 1.1}s` }}>
              <Chispa tam={11 - i * 2} color="#fffbe8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------
   Luna
------------------------------------------------------------------ */
export function Luna({ tam = 62 }) {
  return (
    <div style={{ position: 'relative', width: tam, height: tam }}>

      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: tam * 3, height: tam * 3, marginLeft: -tam * 1.5, marginTop: -tam * 1.5,
        borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(226,232,255,.34) 0%,rgba(200,210,255,.13) 40%,rgba(190,200,255,0) 70%)',
        animation: 'haloLate 9s ease-in-out infinite',
      }} />

      {/* Anillo tenue que gira: le da presencia sin robar protagonismo */}
      <div style={{ position: 'absolute', inset: '-26%', animation: 'rayosGiran 120s linear infinite' }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(226,232,255,.22)"
                  strokeWidth="1" strokeDasharray="3 9" />
        </svg>
      </div>

      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 36% 32%,#fffdf4 0%,#f6f1d8 46%,#ded6b8 82%,#c8bfa0 100%)',
        boxShadow: '0 0 22px 6px rgba(240,244,255,.4), inset -5px -6px 14px rgba(120,120,150,.3)',
        animation: 'jSol 9s ease-in-out infinite',
      }}>
        {/* Cráteres */}
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <ellipse cx="38" cy="40" rx="11" ry="10" fill="#d9d2b8" opacity=".55" />
          <ellipse cx="62" cy="58" rx="8" ry="7" fill="#d9d2b8" opacity=".45" />
          <ellipse cx="46" cy="70" rx="6" ry="5" fill="#d9d2b8" opacity=".4" />
          <ellipse cx="68" cy="32" rx="5" ry="4.5" fill="#d9d2b8" opacity=".35" />
        </svg>
      </div>

      {[20, 150, 275].map((a, i) => (
        <div key={a} style={{
          position: 'absolute', left: '50%', top: '50%', width: 0, height: 0,
          animation: `orbita ${26 + i * 7}s linear infinite`, animationDelay: `${-i * 6}s`,
        }}>
          <div style={{ transform: `rotate(${a}deg) translateX(${tam * 0.95}px)` }}>
            <div style={{ animation: 'chispaLate 4.2s ease-in-out infinite', animationDelay: `${-i * 1.4}s` }}>
              <Chispa tam={10 - i * 2} color="#eef2ff" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------
   Estrellas
   Mezcla de puntos y de chispas de cuatro puntas: solo puntos se ve
   plano, solo chispas se ve recargado.
------------------------------------------------------------------ */
const ESTRELLAS = [
  // [arriba, izquierda, tamaño, ¿chispa?, duración, retardo]
  ['2%',  '44%', 3,  false, 3.5, '-.9s'], ['12%', '8%',  11, true,  4.6, '-2.2s'],
  ['19%', '92%', 3,  false, 3.3, '-1.3s'], ['34%', '70%', 9,  true,  4.8, '-3.4s'],
  ['43%', '52%', 3,  false, 3.7, '-.5s'],  ['48%', '28%', 4,  false, 5.2, '-4.1s'],
  ['56%', '78%', 12, true,  4.2, '-2.8s'], ['65%', '42%', 3,  false, 3.4, '-1.7s'],
  ['69%', '10%', 4,  false, 4.9, '-3.9s'], ['73%', '88%', 8,  true,  4.4, '-.2s'],
  ['6%',  '60%', 4,  false, 3.2, '0s'],    ['16%', '78%', 13, true,  4.1, '-1s'],
  ['29%', '34%', 3,  false, 2.8, '-.6s'],  ['39%', '86%', 4,  false, 3.6, '-2s'],
  ['4%',  '22%', 3,  false, 4.4, '-1.6s'], ['51%', '16%', 10, true,  3.9, '-2.6s'],
  ['23%', '50%', 3,  false, 3.1, '-.3s'],  ['60%', '66%', 3,  false, 5,   '-3s'],
  ['9%',  '36%', 8,  true,  4.7, '-1.9s'], ['31%', '16%', 3,  false, 3.8, '-2.4s'],
  ['46%', '96%', 9,  true,  5.1, '-.8s'],  ['67%', '26%', 3,  false, 4.3, '-3.6s'],
]

export function Estrellas() {
  return (
    <div style={{ position: 'absolute', top: '3%', left: 0, right: 0, height: '44%' }}>
      {ESTRELLAS.map(([arriba, izq, tam, esChispa, dur, retardo], i) => (
        <div key={i} style={{
          position: 'absolute', top: arriba, left: izq,
          animation: `${esChispa ? 'chispaTitila' : 'jTwinkle'} ${dur}s ease-in-out infinite`,
          animationDelay: retardo,
        }}>
          {esChispa
            ? <Chispa tam={tam} color={i % 3 === 0 ? '#fff6d2' : '#e6ecff'} />
            : <div style={{ width: tam, height: tam, borderRadius: '50%', background: i % 2 ? '#fff' : '#dfe6ff' }} />}
        </div>
      ))}
    </div>
  )
}
