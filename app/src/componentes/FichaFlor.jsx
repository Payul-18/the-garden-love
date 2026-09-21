import { useState } from 'react'
import Flor from './Flor'
import { describirFlor } from '../lib/colores'

/**
 * FichaFlor — la carta que se abre al tocar una flor.
 *
 * La dedicatoria es el elemento principal: va en manuscrita, con interlineado
 * amplio, para que se lea con calma. Todo lo demás la acompaña sin competir.
 */

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

/** '2026-09-21' -> '21 de septiembre de 2026', sin depender de zonas horarias. */
function fechaLarga(iso) {
  if (!iso) return ''
  const [a, m, d] = iso.split('-').map(Number)
  return `${d} de ${MESES[m - 1]} de ${a}`
}

// Lo que tarda la carta en bajar antes de desmontarse.
const SALIDA = 340

export default function FichaFlor({ flor, onCerrar }) {
  const [saliendo, setSaliendo] = useState(false)

  // Cerrar no es desaparecer: la carta se desliza hacia abajo y recién
  // entonces se quita del árbol.
  const cerrar = () => {
    if (saliendo) return
    setSaliendo(true)
    setTimeout(onCerrar, SALIDA)
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(16,12,8,.5)', backdropFilter: 'blur(3px)',
      display: 'flex', alignItems: 'flex-end', zIndex: 10,
      animation: saliendo
        ? `fichaSale ${SALIDA}ms ease both`
        : 'apareceSuave .35s ease both',
    }}>
      <div onClick={cerrar} style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} />

      <div style={{
        position: 'relative', width: '100%', maxHeight: '92%', overflow: 'auto',
        padding: '26px 26px 34px', borderRadius: '32px 32px 0 0',
        backgroundImage: 'linear-gradient(180deg,#fdf6e8,#f7ead0)',
        boxShadow: '0 -14px 40px rgba(0,0,0,.45)',
        animation: saliendo
          ? `sheetDown ${SALIDA}ms cubic-bezier(.4,0,.8,.4) both`
          : 'sheetUp .5s cubic-bezier(.2,1.2,.4,1) both',
      }}>
        <div style={{ width: 46, height: 5, borderRadius: 99, background: 'rgba(122,84,44,.28)', margin: '0 auto 14px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', flex: '0 0 auto', width: 86, height: 132 }}>
            <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,226,150,.5),rgba(255,226,150,0) 70%)' }} />
            <Flor
              tipo={flor.tipo} p={flor.p} pd={flor.pd} pl={flor.pl} c={flor.c} cd={flor.cd}
              tallo={flor.tallo} hoja={flor.hoja} hojaD={flor.hojaD} dur={5}
            />
          </div>

          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            <div style={{ fontFamily: "'Berkshire Swash',serif", fontSize: 28, lineHeight: 1.15, color: '#6b4220' }}>
              {flor.nombre}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 8, padding: '5px 12px',
              borderRadius: 999, background: 'rgba(122,84,44,.1)', border: '1px solid rgba(122,84,44,.18)',
              fontFamily: 'Nunito,sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '.06em', color: '#8a5a2c',
            }}>{describirFlor(flor.tipo, flor.color)}</div>
          </div>
        </div>

        <div style={{ margin: '22px 0 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: '1 1 auto', height: 1, background: 'repeating-linear-gradient(90deg,rgba(122,84,44,.3) 0 6px,transparent 6px 12px)' }} />
          <svg width="14" height="14" viewBox="0 0 16 16"><path d="M8 14C4 11 1 8.6 1 5.8C1 3.7 2.6 2.2 4.6 2.2C5.9 2.2 7.2 2.9 8 4C8.8 2.9 10.1 2.2 11.4 2.2C13.4 2.2 15 3.7 15 5.8C15 8.6 12 11 8 14Z" fill="#d98a8a" /></svg>
          <div style={{ flex: '1 1 auto', height: 1, background: 'repeating-linear-gradient(90deg,rgba(122,84,44,.3) 0 6px,transparent 6px 12px)' }} />
        </div>

        <div style={{
          fontFamily: 'Caveat,cursive', fontSize: 25, lineHeight: 1.85, color: '#5c4327',
          padding: '10px 2px 4px', whiteSpace: 'pre-wrap',
        }}>{flor.dedicatoria}</div>

        <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 14 }}>
          <div style={{
            fontFamily: 'Nunito,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '.14em',
            textTransform: 'uppercase', color: '#8a5a2c',
          }}>{fechaLarga(flor.fecha_regalo)}</div>
          <div style={{ fontFamily: 'Caveat,cursive', fontSize: 27, color: '#8a5a2c', textAlign: 'right' }}>
            De {flor.de_parte_de}, con cariño
          </div>
        </div>

        <button onClick={cerrar} style={{
          marginTop: 22, width: '100%', padding: 14, border: 'none', borderRadius: 24, cursor: 'pointer',
          fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: 16, color: '#6b4220',
          background: 'linear-gradient(180deg,#ffe6b8,#f2cf95)', boxShadow: '0 4px 0 rgba(160,110,54,.5)',
        }}>Volver al jardín</button>
      </div>
    </div>
  )
}
