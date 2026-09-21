/**
 * Orden de apilado de la interfaz.
 *
 * Está en un solo sitio porque los números sueltos se contradicen: basta
 * poner un z-index alto en un componente para que tape los controles de
 * otro y deje de responder al dedo. Cualquier capa nueva se añade aquí.
 */
export const CAPAS = {
  fondo: 0,      // cielo, montañas y pasto
  flores: 3,     // el prado con las flores
  // Los animales pasan DELANTE de los tallos. Detrás quedaban partidos
  // por ellos y recibiendo la sombra de las flores, que es imposible:
  // la sombra va en el suelo, no sobre un animal que está más cerca.
  animales: 5,
  encabezado: 20,
  panel: 30,     // la hoja del código: por encima de las flores
  mensaje: 40,   // los avisos, por encima del panel
  ficha: 50,     // la carta de la flor, por encima de todo
}
