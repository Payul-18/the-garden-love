/**
 * Orden de apilado de la interfaz.
 *
 * Está en un solo sitio porque los números sueltos se contradicen: basta
 * poner un z-index alto en un componente para que tape los controles de
 * otro y deje de responder al dedo. Cualquier capa nueva se añade aquí.
 */
export const CAPAS = {
  fondo: 0,      // cielo, pasto y animales
  flores: 3,     // el prado con las flores
  encabezado: 20,
  panel: 30,     // la hoja del código: por encima de las flores
  mensaje: 40,   // los avisos, por encima del panel
  ficha: 50,     // la carta de la flor, por encima de todo
}
