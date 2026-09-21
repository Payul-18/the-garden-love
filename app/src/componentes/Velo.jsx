/**
 * Velo — la cortina que cubre el cambio de escena.
 *
 * Sin él, pasar de la portada al jardín es un corte seco: una pantalla
 * desaparece y otra aparece. El velo cubre con una luz cálida, la pantalla
 * cambia por debajo, y se retira. Nunca se ve el salto.
 *
 * fase: 'cubriendo' | 'descubriendo' | null
 */

export const DURACION_CUBRE = 520
export const DURACION_DESCUBRE = 640

// Chispas repartidas sin simetría: una retícula se notaría.
const CHISPAS = [
  ['18%', '22%', 9, '0ms'], ['34%', '72%', 6, '60ms'], ['52%', '14%', 8, '30ms'],
  ['46%', '86%', 5, '110ms'], ['68%', '38%', 7, '80ms'], ['78%', '64%', 6, '140ms'],
  ['26%', '50%', 5, '170ms'], ['62%', '8%', 6, '50ms'],
]

export default function Velo({ fase }) {
  if (!fase) return null
  const cubriendo = fase === 'cubriendo'

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 60, pointerEvents: 'none',
        animation: `${cubriendo ? 'veloCubre' : 'veloDescubre'} ${cubriendo ? DURACION_CUBRE : DURACION_DESCUBRE}ms ${cubriendo ? 'ease-in' : 'ease-out'} both`,
      }}
    >
      {/* Luz cálida que nace del centro, como el sol entre las hojas */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(75% 55% at 50% 48%, #fff4d4 0%, #f7d99c 34%, #c79a5e 62%, #6d4a2c 100%)',
      }} />

      {CHISPAS.map(([top, left, tam, delay], i) => (
        <div key={i} style={{
          position: 'absolute', top, left, width: tam, height: tam, borderRadius: '50%',
          background: '#fffdf2', boxShadow: `0 0 ${tam + 8}px ${tam / 2}px rgba(255,246,214,.9)`,
          animation: `veloChispa ${cubriendo ? DURACION_CUBRE : DURACION_DESCUBRE}ms ease-out ${delay} both`,
        }} />
      ))}
    </div>
  )
}
