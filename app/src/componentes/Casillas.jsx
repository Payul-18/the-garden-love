import { useRef } from 'react'

/**
 * Casillas — los recuadros donde se escribe un código dígito a dígito.
 *
 * No son inputs de formulario: son piedritas de jardín. El foco salta solo al
 * siguiente al escribir, y retrocede al borrar, para que ella no tenga que
 * tocar cada casilla en el celular.
 */

// Bordes irregulares: cada casilla es un poco distinta, como una piedra real.
const FORMAS = [
  '48% 52% 46% 54% / 56% 44% 58% 42%',
  '52% 48% 54% 46% / 44% 58% 42% 56%',
  '46% 54% 50% 50% / 58% 42% 56% 44%',
  '54% 46% 48% 52% / 46% 56% 44% 54%',
  '50% 50% 44% 56% / 54% 46% 56% 44%',
  '44% 56% 52% 48% / 58% 42% 54% 46%',
]

export default function Casillas({ valores, onCambio, onEnter, grandes = false, shakeAnim = 'none' }) {
  const refs = useRef([])

  const escribir = (i, texto) => {
    const v = (texto || '').replace(/[^0-9]/g, '').slice(-1)
    const siguiente = valores.slice()
    siguiente[i] = v
    onCambio(siguiente)
    if (v && i < valores.length - 1) refs.current[i + 1]?.focus()
  }

  const tecla = (i, e) => {
    if (e.key === 'Backspace' && !valores[i] && i > 0) refs.current[i - 1]?.focus()
    if (e.key === 'Enter') onEnter?.()
  }

  // Si pega el código completo desde WhatsApp, se reparte solo entre casillas.
  const pegar = (e) => {
    const texto = (e.clipboardData.getData('text') || '').replace(/[^0-9]/g, '')
    if (!texto) return
    e.preventDefault()
    const siguiente = valores.map((_, i) => texto[i] ?? '')
    onCambio(siguiente)
    refs.current[Math.min(texto.length, valores.length - 1)]?.focus()
  }

  const ancho = grandes ? 66 : 46
  const alto = grandes ? 72 : 54
  const fuente = grandes ? 32 : 24

  return (
    <div style={{ display: 'flex', gap: grandes ? 14 : 7, animation: shakeAnim }}>
      {valores.map((v, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          value={v}
          maxLength={1}
          inputMode="numeric"
          autoComplete="off"
          onChange={(e) => escribir(i, e.target.value)}
          onKeyDown={(e) => tecla(i, e)}
          onPaste={pegar}
          onFocus={(e) => e.target.select()}
          style={{
            width: ancho, height: alto, border: 'none', outline: 'none', textAlign: 'center',
            fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: fuente, color: '#5a3a1c',
            background: 'radial-gradient(120% 130% at 32% 24%,#f8e6c2 0%,#e6c490 52%,#c79a61 100%)',
            borderRadius: FORMAS[i % FORMAS.length],
            boxShadow: 'inset 0 -7px 12px rgba(120,76,32,.35), inset 0 7px 10px rgba(255,255,255,.6), 0 7px 16px rgba(0,0,0,.4)',
            transition: 'transform .18s, box-shadow .18s',
          }}
        />
      ))}
    </div>
  )
}
