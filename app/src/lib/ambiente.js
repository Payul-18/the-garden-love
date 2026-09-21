/**
 * El jardín cambia según la hora real del dispositivo de Gabriela.
 * Esta es la única fuente de verdad de esa regla.
 */
export function ambienteActual(fecha = new Date()) {
  const hora = fecha.getHours()
  if (hora < 15) return 'dia'
  if (hora < 18) return 'atardecer'
  return 'noche'
}
