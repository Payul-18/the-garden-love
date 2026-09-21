import { useEffect, useRef, useState } from 'react'
import Casillas from './Casillas'

/**
 * PanelCodigo — la hoja inferior donde ella escribe el código de la tarjetita.
 *
 * Cerrado es solo un botón, para que el jardín se vea entero. Abierto sube
 * desde abajo y deja las seis casillas al alcance del pulgar.
 */
export default function PanelCodigo({ abierto, sinFlores, shakeAnim, onAbrir, onCerrar, onSembrar }) {
  const [codigo, setCodigo] = useState(['', '', '', '', '', ''])
  const [enviando, setEnviando] = useState(false)
  const caja = useRef(null)
  const listo = codigo.every((d) => d !== '')

  // Al abrir, el teclado aparece solo en la primera casilla.
  useEffect(() => {
    if (!abierto) { setCodigo(['', '', '', '', '', '']); return }
    const id = setTimeout(() => caja.current?.querySelector('input')?.focus(), 120)
    return () => clearTimeout(id)
  }, [abierto])

  const sembrar = async () => {
    if (!listo || enviando) return
    setEnviando(true)
    const ok = await onSembrar(codigo.join(''))
    setEnviando(false)
    if (!ok) setCodigo(['', '', '', '', '', ''])
  }

  if (!abierto) {
    return (
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 20px 34px',
        display: 'flex', justifyContent: 'center',
        background: 'linear-gradient(180deg,rgba(40,28,16,0) 0%,rgba(40,28,16,.45) 70%)',
      }}>
        <button onClick={onAbrir} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '16px 26px', border: 'none',
          borderRadius: 30, cursor: 'pointer', fontFamily: 'Nunito,sans-serif', fontWeight: 800,
          fontSize: 18, color: '#fffaea',
          background: 'linear-gradient(180deg,#8ed167 0%,#5fa244 60%,#528f3b 100%)',
          textShadow: '0 2px 4px rgba(40,70,30,.6)',
          boxShadow: '0 6px 0 #3f7a2e, 0 10px 22px rgba(0,0,0,.4)',
          animation: 'latido 2.6s ease-in-out infinite',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 3V17M3 10H17" stroke="#fffaea" strokeWidth="2.6" strokeLinecap="round" /></svg>
          Agregar flor
        </button>
      </div>
    )
  }

  return (
    <div ref={caja} style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px 26px',
      background: 'linear-gradient(180deg,rgba(74,50,28,0) 0%,rgba(74,50,28,.72) 22%,rgba(56,37,20,.92) 100%)',
      borderRadius: '30px 30px 0 0', boxShadow: '0 -10px 30px rgba(0,0,0,.35)',
      animation: 'sheetUp .42s cubic-bezier(.2,1.2,.4,1) both',
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onCerrar} style={{
          border: 'none', background: 'rgba(255,240,210,.16)', width: 34, height: 34,
          borderRadius: '50%', cursor: 'pointer', color: '#ffeec9',
          fontFamily: 'Nunito,sans-serif', fontSize: 18, fontWeight: 700, lineHeight: 1,
        }}>×</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ fontFamily: 'Caveat,cursive', fontSize: 23, color: '#ffeec9', textAlign: 'center' }}>
          {sinFlores ? 'Escribe los 6 dígitos de tu primera flor' : '¿Llegó una flor nueva? Escribe sus 6 dígitos'}
        </div>

        <Casillas valores={codigo} onCambio={setCodigo} onEnter={sembrar} shakeAnim={shakeAnim} />

        {listo ? (
          <button onClick={sembrar} disabled={enviando} style={{
            width: '100%', maxWidth: 300, padding: '15px 20px', border: 'none', borderRadius: 26,
            cursor: enviando ? 'wait' : 'pointer', fontFamily: 'Nunito,sans-serif', fontWeight: 800,
            fontSize: 18, color: '#fffaea', opacity: enviando ? .75 : 1,
            background: 'linear-gradient(180deg,#8ed167 0%,#5fa244 60%,#528f3b 100%)',
            textShadow: '0 2px 4px rgba(40,70,30,.6)',
            boxShadow: '0 6px 0 #3f7a2e, 0 10px 22px rgba(0,0,0,.4)',
            animation: enviando ? 'none' : 'latido 2.2s ease-in-out infinite',
          }}>{enviando ? 'Sembrando…' : 'Sembrar esta flor'}</button>
        ) : (
          <div style={{
            width: '100%', maxWidth: 300, padding: '15px 20px', borderRadius: 26, textAlign: 'center',
            fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: 18, color: 'rgba(255,250,234,.45)',
            background: 'linear-gradient(180deg,rgba(150,160,140,.35),rgba(96,106,88,.35))',
            boxShadow: 'inset 0 2px 0 rgba(255,255,255,.1)',
          }}>Sembrar esta flor</div>
        )}
      </div>
    </div>
  )
}
