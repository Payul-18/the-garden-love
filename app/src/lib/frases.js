/**
 * Las frases que el jardín le dice a ella.
 *
 * Se separan del código porque son la voz del regalo, no lógica: aquí es
 * donde hay que venir a cambiar el tono, no a los componentes.
 */

/** La primera vez no se repite nunca. Merece su propia frase. */
const PRIMERA = 'Tu jardín acaba de nacer 🌱'

/**
 * A partir de la segunda, la frase cambia cada vez. Que el jardín diga
 * siempre lo mismo lo vuelve un sistema; que varíe lo vuelve alguien.
 */
const SIGUIENTES = [
  'Uy… llegó otra sorpresa 🌷',
  'Tu jardín crece, igual que lo nuestro 🌿',
  'Otra flor que ya no se marchita 🌻',
  'Alguien estaba pensando en ti 💛',
  'Una más para no olvidar este día 🌸',
  'Tu jardín tiene una flor nueva 🌼',
  'Y todavía queda mucho por plantar 🌱',
  'Esta también se queda para siempre ✨',
]

// Última frase mostrada, para no repetirla dos veces seguidas.
let ultima = -1

/**
 * Elige qué decir al terminar de florecer.
 * @param {number} cuantasHabia  flores que ya tenía antes de esta
 */
export function fraseAlSembrar(cuantasHabia) {
  if (cuantasHabia === 0) return PRIMERA
  // Se sortea entre todas menos la anterior: así el azar nunca repite
  // la misma frase dos veces seguidas, que es lo que delataría el truco.
  const opciones = SIGUIENTES.map((_, i) => i).filter((i) => i !== ultima)
  ultima = opciones[Math.floor(Math.random() * opciones.length)]
  return SIGUIENTES[ultima]
}

/** Lo que se lee bajo el nombre mientras la flor termina de abrirse. */
export function fraseDeFlorecimiento(cuantasHabia) {
  return cuantasHabia === 0
    ? 'la primera flor de tu jardín'
    : 'acaba de florecer en tu jardín'
}
