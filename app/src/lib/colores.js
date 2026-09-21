/**
 * Paleta de las flores.
 *
 * Regla de diseño: la ILUSTRACIÓN y el COLOR son independientes. Cada especie
 * es un solo dibujo SVG que se pinta con estas cinco variables, así una misma
 * rosa puede ser roja, blanca, rosada o amarilla sin dibujar nada nuevo.
 *
 *   p  = pétalo          pd = pétalo oscuro (sombra)
 *   pl = pétalo claro    c  = centro          cd = centro oscuro
 */

export const VERDE = { tallo: '#4e9a4a', hoja: '#59ad53', hojaD: '#3c8038' }

export const COLORES = {
  amarillo: { p: '#ffc93c', pd: '#eda428', pl: '#ffe6a3', c: '#7a4a1f', cd: '#543012' },
  naranja:  { p: '#ff9a3c', pd: '#e0742a', pl: '#ffd39a', c: '#6b3a18', cd: '#4a2610' },
  rojo:     { p: '#e2455c', pd: '#b32a45', pl: '#f78a9b', c: '#ffd9df', cd: '#a52440' },
  rosado:   { p: '#f27aa8', pd: '#cf4c86', pl: '#ffb7d2', c: '#ffffff', cd: '#cf4c86' },
  blanco:   { p: '#fffaf0', pd: '#e9dcc4', pl: '#ffffff', c: '#ffd24a', cd: '#e8a72c' },
  carmin:   { p: '#e1546a', pd: '#b23450', pl: '#ff96a8', c: '#ffffff', cd: '#b23450' },
  lila:     { p: '#b98ae0', pd: '#8f61bd', pl: '#dcc2f5', c: '#ffffff', cd: '#8f61bd' },
}

/** Especies disponibles. Añadir una nueva solo exige dibujarla en Flor.jsx. */
export const TIPOS = {
  girasol:   'Girasol',
  rosa:      'Rosa',
  tulipan:   'Tulipán',
  margarita: 'Margarita',
  clavel:    'Clavel',
}

export const NOMBRES_COLOR = {
  amarillo: 'amarillo', naranja: 'naranja', rojo: 'roja', rosado: 'rosado',
  blanco: 'blanca', carmin: 'carmín', lila: 'lila',
}

/**
 * "Girasol amarillo" / "Rosa roja": concuerda el adjetivo con el género de la
 * especie, para que la ficha no diga cosas como "Rosa amarillo".
 */
export function describirFlor(tipo, color) {
  const especie = TIPOS[tipo] ?? tipo
  const femenina = tipo === 'rosa' || tipo === 'margarita'
  const adj = { amarillo: 'amarill', naranja: 'naranj', rojo: 'roj', rosado: 'rosad',
                blanco: 'blanc', carmin: 'carmín', lila: 'lila' }[color]
  if (!adj) return especie
  if (color === 'carmin' || color === 'lila') return `${especie} ${adj}`
  if (color === 'naranja') return `${especie} naranja`
  return `${especie} ${adj}${femenina ? 'a' : 'o'}`
}

/**
 * Convierte una fila de la base de datos en el objeto que consumen los
 * componentes visuales: mezcla los colores de la paleta y reparte duraciones
 * y retardos distintos para que las flores no se mezan todas al mismo tiempo.
 */
export function prepararFlor(fila, indice = 0) {
  const paleta = COLORES[fila.color] ?? COLORES.amarillo
  return {
    ...fila,
    ...paleta,
    ...VERDE,
    dur: 3.8 + (indice % 4) * 0.5,
    delay: (indice % 5) * 0.35,
  }
}
