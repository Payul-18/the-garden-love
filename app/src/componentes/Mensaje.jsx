/**
 * Mensaje — los avisos cariñosos del jardín.
 *
 * Acabado de vidrio líquido: difumina el jardín que queda detrás en vez de
 * taparlo, con un brillo especular arriba y un destello que lo recorre al
 * aparecer. La clase .vidrio hace el trabajo y, donde el navegador no
 * soporte el difuminado, cae a un fondo casi opaco para que nunca deje de
 * leerse. Esto último importa más que el efecto: el aviso tiene que
 * entenderse a la primera sobre el jardín de día y sobre el de noche.
 */

// Cada mensaje tiene su tono. El de error no es rojo de sistema: es un
// terracota cálido, para que corregir el código no se sienta como fallar.
const TONOS = {
  aviso: { texto: '#4a2a0c', tinte: 'rgba(255,236,196,.42)', borde: 'rgba(255,240,205,.75)' },
  error: { texto: '#7a3418', tinte: 'rgba(255,214,190,.45)', borde: 'rgba(255,222,205,.75)' },
  logro: { texto: '#2c5518', tinte: 'rgba(214,244,190,.42)', borde: 'rgba(226,248,206,.78)' },
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
      <div
        className="vidrio"
        style={{
          maxWidth: 340,
          padding: '15px 24px',
          // Radios distintos en cada esquina: el vidrio se ve soplado
          // a mano y no recortado por una máquina.
          borderRadius: '26px 26px 28px 24px',
          borderColor: t.borde,
          animation: 'toastIn .5s cubic-bezier(.2,1.3,.4,1) both',
        }}
      >
        {/* El tinte va sobre el difuminado, no en el fondo: así el color
            del tono se nota sin restarle transparencia al vidrio. */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit',
          background: t.tinte, pointerEvents: 'none',
        }} />

        <div style={{
          position: 'relative',
          fontFamily: 'Caveat,cursive',
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 1.3,
          color: t.texto,
          textAlign: 'center',
          // Un halo claro detrás de las letras: sostiene el contraste
          // aunque justo detrás del vidrio pase una flor oscura.
          textShadow: '0 1px 0 rgba(255,255,255,.75)',
        }}>{texto}</div>
      </div>
    </div>
  )
}
