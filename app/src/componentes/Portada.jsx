import { useState } from 'react'
import Jardin from './Jardin'
import Casillas from './Casillas'
import Mensaje from './Mensaje'

/**
 * Portada — lo primero que ve ella.
 *
 * No es un login: es la portada del regalo. El título entra letra a letra y
 * después queda respirando. Detrás se ve el jardín desenfocado, con el color
 * de la hora real, como una puerta entreabierta.
 */

const TITULO_1 = 'The Garden'.split('')
const TITULO_2 = 'Love'.split('')

// Chispas que flotan sobre la portada.
const CHISPAS = [
  ['12%', '6%', 7, 9, '0s'], ['34%', '82%', 5, 11, '-4s'], ['52%', '18%', 6, 13, '-7s'],
  ['66%', '68%', 5, 10, '-2s'], ['78%', '38%', 4, 12, '-9s'],
]

export default function Portada({ nombreElla, ambiente, msg, shakeAnim, onEntrar }) {
  const [digitos, setDigitos] = useState(['', '', '', ''])
  const listo = digitos.every((d) => d !== '')

  const intentar = () => {
    if (!listo) return
    const ok = onEntrar(digitos.join(''))
    if (!ok) setDigitos(['', '', '', ''])
  }

  return (
    <div style={{ position: 'absolute', inset: 0, animation: 'apareceSuave .6s ease both', overflow: 'hidden' }}>

      {/* El mismo jardín de siempre, desenfocado: se intuye lo que hay detrás. */}
      <div style={{ position: 'absolute', inset: '-6%', filter: 'blur(6px) saturate(1.08)' }}>
        <Jardin ambiente={ambiente} flores={[]} zocalo="0px" />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,20,14,.5) 0%,rgba(12,22,16,.22) 42%,rgba(8,16,12,.6) 100%)' }} />

      {CHISPAS.map(([top, left, tam, dur, delay], i) => (
        <div key={i} style={{
          position: 'absolute', top, left, width: tam, height: tam, borderRadius: '50%',
          background: '#fff3c0', boxShadow: `0 0 ${tam + 5}px 4px rgba(255,236,170,.55)`,
          animation: `flotar ${dur}s ease-in-out infinite`, animationDelay: delay,
        }} />
      ))}

      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between', padding: '74px 26px 46px',
      }}>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            position: 'absolute', top: 6, left: '50%', marginLeft: -130, width: 260, height: 170,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(255,226,150,.5) 0%,rgba(255,210,120,.14) 48%,rgba(255,210,120,0) 72%)',
            animation: 'brilloTitulo 5s ease-in-out infinite', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', animation: 'respira 6s ease-in-out infinite', textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Berkshire Swash',serif", fontSize: 46, lineHeight: 1.05, color: '#fff8e4',
              textShadow: '0 2px 0 #c07c2e, 0 4px 0 #8d5719, 0 8px 16px rgba(0,0,0,.55), 0 0 24px rgba(255,214,130,.45)',
            }}>
              {TITULO_1.map((ch, i) => (
                ch === ' '
                  ? <span key={i} style={{ display: 'inline-block', width: 16 }} />
                  : <span key={i} style={{
                      display: 'inline-block',
                      animation: `letraPop .75s cubic-bezier(.22,1.5,.4,1) both`,
                      animationDelay: `${.05 + i * .07}s`,
                    }}>{ch}</span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: -4 }}>
              <Rama />
              <div style={{
                fontFamily: "'Berkshire Swash',serif", fontSize: 64, lineHeight: 1, color: '#fff8e4',
                textShadow: '0 3px 0 #c07c2e, 0 6px 0 #8d5719, 0 10px 20px rgba(0,0,0,.55), 0 0 30px rgba(255,214,130,.5)',
              }}>
                {TITULO_2.map((ch, i) => (
                  <span key={i} style={{
                    display: 'inline-block',
                    animation: `letraPop .8s cubic-bezier(.22,1.5,.4,1) both`,
                    animationDelay: `${.76 + i * .08}s`,
                  }}>{ch}</span>
                ))}
              </div>
              <Rama invertida />
            </div>

            <Destello estilo={{ top: -6, right: -6 }} tam={16} dur="3.4s" />
            <Destello estilo={{ bottom: 6, left: -10 }} tam={12} dur="4.2s" delay="-1.6s" color="#ffe6a8" />
          </div>

          <div style={{
            fontFamily: 'Caveat,cursive', fontSize: 25, color: '#ffeec9', marginTop: 10,
            textShadow: '0 2px 8px rgba(0,0,0,.6)', animation: 'fadeUp 1s ease 1.2s both',
          }}>para {nombreElla}, con todo mi cariño</div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          {msg && <Mensaje texto={msg} tono="error" abajo={210} />}

          <div style={{ fontFamily: 'Caveat,cursive', fontSize: 24, color: '#fff3dc', textShadow: '0 2px 8px rgba(0,0,0,.65)' }}>
            Escribe tu llave de 4 dígitos
          </div>

          <Casillas valores={digitos} onCambio={setDigitos} onEnter={intentar} grandes shakeAnim={shakeAnim} />

          {listo ? (
            <button onClick={intentar} style={{
              width: '100%', maxWidth: 304, padding: '18px 20px', border: 'none', borderRadius: 30,
              cursor: 'pointer', fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: 19,
              letterSpacing: '.02em', color: '#fffaea',
              background: 'linear-gradient(180deg,#8ed167 0%,#5fa244 60%,#528f3b 100%)',
              textShadow: '0 2px 4px rgba(40,70,30,.6)',
              boxShadow: '0 6px 0 #3f7a2e, 0 10px 22px rgba(0,0,0,.4)',
              animation: 'latido 2.2s ease-in-out infinite',
            }}>Entrar a tu jardín</button>
          ) : (
            <div style={{
              width: '100%', maxWidth: 304, padding: '18px 20px', borderRadius: 30, textAlign: 'center',
              fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: 19, color: 'rgba(255,250,234,.5)',
              background: 'linear-gradient(180deg,rgba(150,160,140,.45),rgba(96,106,88,.45))',
              boxShadow: 'inset 0 2px 0 rgba(255,255,255,.12), 0 4px 0 rgba(60,70,55,.4)',
            }}>Entrar a tu jardín</div>
          )}
        </div>
      </div>
    </div>
  )
}

function Rama({ invertida = false }) {
  return (
    <svg width="34" height="26" viewBox="0 0 34 26" style={{ flex: '0 0 auto', transform: invertida ? 'scaleX(-1)' : 'none' }}>
      <path d="M33 19C24 23 12 22 4 14" stroke="#7fc46a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M20 19C17 13 11 11 6 12C8 18 14 21 20 19Z" fill="#8ad36f" />
      <path d="M28 18C28 13 24 9 19 9C20 15 24 18 28 18Z" fill="#6fb85e" />
    </svg>
  )
}

function Destello({ estilo, tam, dur, delay = '0s', color = '#fff3c0' }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 16 16" style={{
      position: 'absolute', ...estilo,
      animation: `destello ${dur} ease-in-out infinite`, animationDelay: delay,
    }}>
      <path d="M8 0L9.6 6.4L16 8L9.6 9.6L8 16L6.4 9.6L0 8L6.4 6.4Z" fill={color} />
    </svg>
  )
}
