/**
 * Mensaje — los avisos cariñosos del jardín.
 *
 * Nunca son errores secos, pero sí tienen que leerse a la primera y sobre
 * cualquier fondo: el jardín de día es claro, el de noche oscuro, y encima
 * puede estar abierto el panel del código. Por eso el globo es opaco, con
 * borde propio, y se dibuja por encima de todo lo demás.
 */

// Cada mensaje tiene su tono. El de error no es rojo de sistema: es un
// terracota cálido, para que corregir el código no se sienta como fallar.
const TONOS = {
  aviso:  { fondo: '#fff8ec', borde: 'rgba(150,104,52,.35)', texto: '#5a3310' },
  error:  { fondo: '#fff1e8', borde: 'rgba(170,92,60,.38)',  texto: '#8a3f22' },
  logro:  { fondo: '#f2fbe6', borde: 'rgba(96,140,64,.38)',  texto: '#33621f' },
}

export default function Mensaje({ texto, tono = 'aviso', abajo = 130 }) {
  if (!texto) return null
  const t = TONOS[tono] ?? TONOS.aviso

  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, bottom: abajo,
      display: 'flex', justifyContent: 'center',
      pointerEvents: 'none',
      // Por encima del panel del código y de cualquier capa del jardín.
      zIndex: 40,
    }}>
      <div style={{
        maxWidth: 340,
        padding: '14px 22px',
        borderRadius: '24px 24px 26px 22px',
        background: t.fondo,
        border: `2px solid ${t.borde}`,
        // Doble sombra: una pegada que despega el globo del fondo, y otra
        // amplia y oscura que lo recorta incluso sobre el jardín de día.
        boxShadow: '0 4px 0 rgba(122,84,44,.18), 0 10px 30px rgba(0,0,0,.45)',
        animation: 'toastIn .45s cubic-bezier(.2,1.3,.4,1) both',
      }}>
        <div style={{
          fontFamily: 'Caveat,cursive',
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 1.3,
          color: t.texto,
          textAlign: 'center',
        }}>{texto}</div>
      </div>
    </div>
  )
}
