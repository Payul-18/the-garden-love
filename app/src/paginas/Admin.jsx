import { useCallback, useEffect, useState } from 'react'
import Flor from '../componentes/Flor'
import { COLORES, TIPOS, describirFlor, prepararFlor } from '../lib/colores'
import { borrarFlor, crearFlor, editarFlor, listarFlores } from '../lib/supabase'

/**
 * Admin — el panel privado de Jean, en una ruta secreta.
 *
 * Aquí se crea cada flor y se obtiene el código que va escrito a mano en la
 * tarjetita. También permite corregir una flor ya canjeada: el código nunca
 * cambia, porque la tarjetita ya está entregada.
 */

const HOY = new Date().toISOString().slice(0, 10)

const VACIO = {
  nombre: '', tipo: 'girasol', color: 'amarillo',
  dedicatoria: '', deParteDe: 'Jean', fechaRegalo: HOY,
}

export default function Admin() {
  const [form, setForm] = useState(VACIO)
  const [editando, setEditando] = useState(null)
  const [codigoNuevo, setCodigoNuevo] = useState(null)
  const [flores, setFlores] = useState([])
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  const recargar = useCallback(async () => {
    try {
      setFlores(await listarFlores())
      setError('')
    } catch (e) {
      setError(`No pude leer las flores: ${e.message}`)
    }
  }, [])

  useEffect(() => { recargar() }, [recargar])

  const cambiar = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }))

  const guardar = async (e) => {
    e.preventDefault()
    if (ocupado) return
    setOcupado(true)
    setError('')
    try {
      if (editando) {
        await editarFlor(editando, form)
        setEditando(null)
        setForm(VACIO)
      } else {
        const r = await crearFlor(form)
        setCodigoNuevo(r.codigo)
        setForm({ ...VACIO, deParteDe: form.deParteDe })
      }
      await recargar()
    } catch (err) {
      setError(err.message)
    } finally {
      setOcupado(false)
    }
  }

  const empezarEdicion = (f) => {
    setEditando(f.id)
    setCodigoNuevo(null)
    setForm({
      nombre: f.nombre, tipo: f.tipo, color: f.color, dedicatoria: f.dedicatoria,
      deParteDe: f.de_parte_de, fechaRegalo: f.fecha_regalo,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const eliminar = async (f) => {
    const aviso = f.canjeada
      ? `"${f.nombre}" ya está en el jardín de ella. Si la borras, desaparece de su jardín. ¿Seguro?`
      : `¿Borrar "${f.nombre}"? El código ${f.codigo} dejará de funcionar.`
    if (!window.confirm(aviso)) return
    try {
      await borrarFlor(f.id)
      await recargar()
    } catch (err) {
      setError(err.message)
    }
  }

  const vista = prepararFlor({ ...form, color: form.color })

  return (
    <div style={S.pagina}>
      <div style={S.centro}>

        <div style={S.cabecera}>
          <div>
            <div style={S.sobretitulo}>Panel privado</div>
            <h1 style={S.titulo}>El jardinero</h1>
          </div>
          <a href="/" style={S.enlace}>Ver el jardín →</a>
        </div>

        {error && <div style={S.error}>{error}</div>}

        {codigoNuevo && (
          <div style={S.tarjetaCodigo}>
            <div style={S.codigoEtiqueta}>Escribe este código en la tarjetita</div>
            <div style={S.codigoGrande}>{codigoNuevo}</div>
            <button onClick={() => setCodigoNuevo(null)} style={S.botonSuave}>Listo, ya lo anoté</button>
          </div>
        )}

        <div style={S.columnas}>
          <form onSubmit={guardar} style={S.formulario}>
            <h2 style={S.subtitulo}>{editando ? 'Corrigiendo una flor' : 'Nueva flor'}</h2>

            <Campo etiqueta="Nombre propio" ayuda="Lo que ella verá en grande: «Nuestra fecha especial»">
              <input required value={form.nombre} onChange={cambiar('nombre')} style={S.input} placeholder="Nuestra fecha especial" />
            </Campo>

            <div style={S.fila}>
              <Campo etiqueta="Especie">
                <select value={form.tipo} onChange={cambiar('tipo')} style={S.input}>
                  {Object.entries(TIPOS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </Campo>
              <Campo etiqueta="Color">
                <select value={form.color} onChange={cambiar('color')} style={S.input}>
                  {Object.keys(COLORES).map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </Campo>
            </div>

            <Campo etiqueta="Dedicatoria" ayuda="Lo más importante de la ficha. Se respetan los saltos de línea.">
              <textarea required rows={5} value={form.dedicatoria} onChange={cambiar('dedicatoria')} style={{ ...S.input, resize: 'vertical', lineHeight: 1.6 }} />
            </Campo>

            <div style={S.fila}>
              <Campo etiqueta="De parte de">
                <input required value={form.deParteDe} onChange={cambiar('deParteDe')} style={S.input} />
              </Campo>
              <Campo etiqueta="Fecha del regalo">
                <input required type="date" value={form.fechaRegalo} onChange={cambiar('fechaRegalo')} style={S.input} />
              </Campo>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <button type="submit" disabled={ocupado} style={S.boton}>
                {ocupado ? 'Guardando…' : editando ? 'Guardar los cambios' : 'Generar el código'}
              </button>
              {editando && (
                <button type="button" onClick={() => { setEditando(null); setForm(VACIO) }} style={S.botonSuave}>
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div style={S.previsualizacion}>
            <div style={S.sobretitulo}>Así se va a ver</div>
            <div style={S.marcoFlor}>
              <Flor tipo={vista.tipo} p={vista.p} pd={vista.pd} pl={vista.pl} c={vista.c} cd={vista.cd}
                    tallo={vista.tallo} hoja={vista.hoja} hojaD={vista.hojaD} dur={4.6} />
            </div>
            <div style={{ fontFamily: 'Caveat,cursive', fontSize: 22, color: '#ffeec9', textAlign: 'center' }}>
              {describirFlor(form.tipo, form.color)}
            </div>
          </div>
        </div>

        <h2 style={{ ...S.subtitulo, marginTop: 46 }}>
          Flores creadas <span style={{ opacity: .5, fontWeight: 400 }}>({flores.length})</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {flores.length === 0 && <div style={{ opacity: .6 }}>Todavía no has creado ninguna flor.</div>}

          {flores.map((f) => (
            <div key={f.id} style={S.tarjetaFlor}>
              <div style={{ width: 44, height: 68, flex: '0 0 auto' }}>
                {(() => { const v = prepararFlor(f)
                  return <Flor tipo={v.tipo} p={v.p} pd={v.pd} pl={v.pl} c={v.c} cd={v.cd}
                               tallo={v.tallo} hoja={v.hoja} hojaD={v.hojaD} dur={5} /> })()}
              </div>

              <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={S.codigoChip}>{f.codigo}</span>
                  <span style={f.canjeada ? S.chipCanjeada : S.chipPendiente}>
                    {f.canjeada ? 'en su jardín' : 'esperando'}
                  </span>
                </div>
                <div style={{ fontFamily: "'Berkshire Swash',serif", fontSize: 19, marginTop: 6, color: '#fff3d4' }}>{f.nombre}</div>
                <div style={{ fontSize: 13, opacity: .65 }}>
                  {describirFlor(f.tipo, f.color)} · {f.fecha_regalo} · de {f.de_parte_de}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flex: '0 0 auto' }}>
                <button onClick={() => empezarEdicion(f)} style={S.botonMini}>Editar</button>
                <button onClick={() => eliminar(f)} style={{ ...S.botonMini, color: '#ffb4b4', borderColor: 'rgba(255,150,150,.3)' }}>Borrar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Campo({ etiqueta, ayuda, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: '1 1 0', minWidth: 0 }}>
      <span style={S.etiqueta}>{etiqueta}</span>
      {children}
      {ayuda && <span style={{ fontSize: 12, opacity: .5 }}>{ayuda}</span>}
    </label>
  )
}

const S = {
  pagina: {
    position: 'fixed', inset: 0, overflowY: 'auto',
    background: 'radial-gradient(120% 80% at 50% 0%,#1b2a20 0%,#0f1713 60%,#0b110e 100%)',
    color: '#efe6d3', fontFamily: 'Nunito,system-ui,sans-serif', padding: '36px 20px 80px',
  },
  centro: { maxWidth: 940, margin: '0 auto' },
  cabecera: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 26 },
  sobretitulo: { fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8fae8f' },
  titulo: { fontFamily: "'Berkshire Swash',serif", fontSize: 40, margin: '6px 0 0', color: '#fff3d4', fontWeight: 400 },
  subtitulo: { fontFamily: "'Berkshire Swash',serif", fontSize: 24, color: '#fff3d4', fontWeight: 400, margin: '0 0 14px' },
  enlace: { color: '#ffd98a', textDecoration: 'none', fontWeight: 700, fontSize: 14 },
  error: { padding: '12px 16px', borderRadius: 12, background: 'rgba(180,70,70,.18)', border: '1px solid rgba(255,140,140,.3)', color: '#ffc9c9', marginBottom: 18, fontSize: 14 },
  columnas: { display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'flex-start' },
  formulario: { flex: '1 1 420px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 16, padding: 24, borderRadius: 22, background: 'rgba(255,246,222,.05)', border: '1px solid rgba(255,246,222,.12)' },
  previsualizacion: { flex: '0 1 220px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', padding: 18, borderRadius: 22, background: 'linear-gradient(180deg,#22332a,#16241d)' },
  marcoFlor: { width: 150, height: 230 },
  fila: { display: 'flex', gap: 14, flexWrap: 'wrap' },
  etiqueta: { fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: '#8fae8f', fontWeight: 700 },
  input: { width: '100%', padding: '11px 13px', borderRadius: 12, border: '1px solid rgba(255,246,222,.18)', background: 'rgba(12,20,15,.6)', color: '#f4ecda', fontSize: 15, outline: 'none' },
  boton: { padding: '14px 22px', border: 'none', borderRadius: 16, cursor: 'pointer', fontWeight: 800, fontSize: 15, color: '#fffaea', background: 'linear-gradient(180deg,#8ed167 0%,#5fa244 60%,#528f3b 100%)', boxShadow: '0 4px 0 #3f7a2e' },
  botonSuave: { padding: '12px 18px', borderRadius: 14, cursor: 'pointer', fontWeight: 700, fontSize: 14, color: '#e6dcc6', background: 'rgba(255,246,222,.08)', border: '1px solid rgba(255,246,222,.2)' },
  botonMini: { padding: '7px 12px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 13, color: '#e6dcc6', background: 'rgba(255,246,222,.07)', border: '1px solid rgba(255,246,222,.18)' },
  tarjetaCodigo: { padding: '22px 24px', borderRadius: 22, background: 'linear-gradient(180deg,#fff6e6,#ffe9cf)', color: '#7a4520', marginBottom: 22, textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,.4)' },
  codigoEtiqueta: { fontFamily: 'Caveat,cursive', fontSize: 22 },
  codigoGrande: { fontSize: 46, fontWeight: 800, letterSpacing: '.22em', margin: '8px 0 14px', color: '#5a3a1c' },
  tarjetaFlor: { display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 16, background: 'rgba(255,246,222,.05)', border: '1px solid rgba(255,246,222,.1)', flexWrap: 'wrap' },
  codigoChip: { fontFamily: 'Nunito,monospace', fontWeight: 800, fontSize: 17, letterSpacing: '.14em', color: '#ffd98a' },
  chipCanjeada: { fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 999, background: 'rgba(120,200,120,.16)', color: '#a8e6a8' },
  chipPendiente: { fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: 999, background: 'rgba(255,220,140,.14)', color: '#ffd98a' },
}
