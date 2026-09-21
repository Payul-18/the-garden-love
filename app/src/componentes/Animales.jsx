import { Mata, VERDES } from './Pasto'

/**
 * Animales — los habitantes del jardín.
 *
 * Están para que el prado no se sienta deshabitado cuando hay pocas flores.
 * Son decorado: no se pueden tocar y nunca tapan a las flores, porque viven
 * en la ladera, por encima de donde crecen.
 *
 * Cada uno respira, mueve la cola o las orejas a su propio ritmo. Los ritmos
 * son distintos a propósito: si todos se movieran a la vez se notaría que es
 * un bucle.
 */

/* ------------------------------------------------------------------
   Paletas por ambiente. De noche no se apagan: se vuelven más fríos
   y conservan una luz cálida en el pecho, como si les diera la luna.
------------------------------------------------------------------ */
const PALETA = {
  dia: {
    gato:   { cuerpo: '#f2a65a', claro: '#ffd9a8', oscuro: '#c97f39' },
    perro:  { cuerpo: '#c88b5e', claro: '#f0cba6', oscuro: '#9c6540' },
    ciervo: { cuerpo: '#c58a5a', claro: '#f3d3a8', oscuro: '#96603a' },
    conejo:  { cuerpo: '#f5ece0', claro: '#ffffff', oscuro: '#d4c2ad' },
    ardilla: { cuerpo: '#d9763f', claro: '#ffd7ae', oscuro: '#a9531f' },
    erizo:   { cuerpo: '#a8754e', claro: '#f0cfa8', oscuro: '#6e4527' },
    pajaro:  { cuerpo: '#5fa3d4', claro: '#ffe08a', oscuro: '#36709c' },
    trazo:  '#6b4327',
  },
  atardecer: {
    gato:   { cuerpo: '#e08a4a', claro: '#ffc98c', oscuro: '#a85f2c' },
    perro:  { cuerpo: '#b0714a', claro: '#e0ad82', oscuro: '#824f31' },
    ciervo: { cuerpo: '#b0714a', claro: '#e5bd91', oscuro: '#7d4c2c' },
    conejo:  { cuerpo: '#efd9c4', claro: '#fff0e0', oscuro: '#c2a288' },
    ardilla: { cuerpo: '#c2673a', claro: '#f0bf94', oscuro: '#8e441b' },
    erizo:   { cuerpo: '#956544', claro: '#dbb68f', oscuro: '#5e3a21' },
    pajaro:  { cuerpo: '#548fb8', claro: '#f2cb7e', oscuro: '#2f6084' },
    trazo:  '#5b3520',
  },
  noche: {
    gato:   { cuerpo: '#6a5f7e', claro: '#a294bd', oscuro: '#463e57' },
    perro:  { cuerpo: '#5f5570', claro: '#948aa8', oscuro: '#3f3850' },
    ciervo: { cuerpo: '#655a76', claro: '#9c8fb5', oscuro: '#433b52' },
    conejo:  { cuerpo: '#b9b2c9', claro: '#ded8e8', oscuro: '#8b83a0' },
    ardilla: { cuerpo: '#6d5a72', claro: '#a794ad', oscuro: '#4a3c50' },
    erizo:   { cuerpo: '#5d5165', claro: '#968aa0', oscuro: '#3d3443' },
    pajaro:  { cuerpo: '#4d5a84', claro: '#9aa4c4', oscuro: '#333d5e' },
    trazo:  '#2a2438',
  },
}

/* ------------------------------------------------------------------
   Gato — sentado, moviendo la cola
------------------------------------------------------------------ */
function Gato({ c, trazo }) {
  return (
    <svg viewBox="0 0 62 58" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <ellipse cx="31" cy="55" rx="20" ry="3.4" fill="#000" opacity=".16" />

      {/* La cola se mece desde su nacimiento, no desde la punta */}
      <g style={{ animation: 'colaGato 2.6s ease-in-out infinite', transformOrigin: '17px 48px', transformBox: 'view-box' }}>
        <path d="M17 48C7 48 4 38 9 31" fill="none" stroke={c.cuerpo} strokeWidth="6" strokeLinecap="round" />
        <path d="M9.5 32.5C8 30 8.5 28 10 26.5" fill="none" stroke={c.claro} strokeWidth="5" strokeLinecap="round" />
      </g>

      <g style={{ animation: 'respiraAnimal 3.4s ease-in-out infinite', transformOrigin: '31px 52px', transformBox: 'view-box' }}>
        <path d="M20 52C18 42 22 33 31 33C40 33 44 42 42 52Z" fill={c.cuerpo} />
        <path d="M27 52C26 45 28 39 33 37C37 42 37 47 36 52Z" fill={c.claro} opacity=".75" />
        <ellipse cx="24" cy="51" rx="5" ry="3" fill={c.claro} />
        <ellipse cx="38" cy="51" rx="5" ry="3" fill={c.claro} />

        {/* Orejas: se sacuden de vez en cuando, como un gato de verdad */}
        <g style={{ animation: 'orejaTic 5.2s ease-in-out infinite', transformOrigin: '31px 26px', transformBox: 'view-box' }}>
          <path d="M22 24L21 12L31 18Z" fill={c.cuerpo} />
          <path d="M23.5 22L23 16L28.5 19Z" fill={c.oscuro} opacity=".6" />
          <path d="M40 24L41 12L31 18Z" fill={c.cuerpo} />
          <path d="M38.5 22L39 16L33.5 19Z" fill={c.oscuro} opacity=".6" />
        </g>

        <circle cx="31" cy="27" r="11" fill={c.cuerpo} />
        <ellipse cx="31" cy="31" rx="7" ry="5" fill={c.claro} opacity=".85" />
        <ellipse cx="26.5" cy="25.5" rx="1.7" ry="2.2" fill={trazo} />
        <ellipse cx="35.5" cy="25.5" rx="1.7" ry="2.2" fill={trazo} />
        <path d="M31 29L29.4 30.6L31 31.6L32.6 30.6Z" fill={trazo} />
        <path d="M31 31.6C31 33.4 29.4 34 28.4 33.2M31 31.6C31 33.4 32.6 34 33.6 33.2" fill="none" stroke={trazo} strokeWidth="1.1" strokeLinecap="round" />
        <path d="M22 28H16M22 30.5L16.5 32M40 28H46M40 30.5L45.5 32" stroke={trazo} strokeWidth=".9" strokeLinecap="round" opacity=".55" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
   Perro — de pie, meneando la cola
------------------------------------------------------------------ */
function Perro({ c, trazo }) {
  return (
    <svg viewBox="0 0 70 56" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <ellipse cx="35" cy="53" rx="22" ry="3.4" fill="#000" opacity=".16" />

      <g style={{ animation: 'colaPerro .9s ease-in-out infinite', transformOrigin: '18px 34px', transformBox: 'view-box' }}>
        <path d="M18 34C10 31 7 24 10 19" fill="none" stroke={c.cuerpo} strokeWidth="5.5" strokeLinecap="round" />
      </g>

      <g style={{ animation: 'respiraAnimal 3s ease-in-out infinite', transformOrigin: '35px 50px', transformBox: 'view-box' }}>
        <rect x="21" y="41" width="5.5" height="11" rx="2.7" fill={c.oscuro} />
        <rect x="30" y="41" width="5.5" height="11" rx="2.7" fill={c.cuerpo} />
        <rect x="42" y="41" width="5.5" height="11" rx="2.7" fill={c.oscuro} />
        <rect x="50" y="41" width="5.5" height="11" rx="2.7" fill={c.cuerpo} />

        <ellipse cx="36" cy="35" rx="19" ry="11" fill={c.cuerpo} />
        <ellipse cx="38" cy="39" rx="13" ry="6" fill={c.claro} opacity=".7" />

        <g style={{ animation: 'perroHusmea 7s ease-in-out infinite', transformOrigin: '48px 30px', transformBox: 'view-box' }}>
        <circle cx="54" cy="25" r="10.5" fill={c.cuerpo} />
        <ellipse cx="60" cy="28" rx="7" ry="5.5" fill={c.claro} />
        <ellipse cx="63.5" cy="27" rx="2.6" ry="2.1" fill={trazo} />
        <path d="M58 31C59.5 32.6 61.5 32.6 63 31.4" fill="none" stroke={trazo} strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="56" cy="22.5" r="1.8" fill={trazo} />

        {/* Oreja caída, que rebota al respirar */}
        <g style={{ animation: 'orejaPerro 3s ease-in-out infinite', transformOrigin: '49px 18px', transformBox: 'view-box' }}>
          <path d="M49 18C43 19 41 27 44 33C49 32 51 24 49 18Z" fill={c.oscuro} />
        </g>
        </g>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
   Ciervo — quieto, mirando el jardín
------------------------------------------------------------------ */
function Ciervo({ c, trazo }) {
  return (
    <svg viewBox="0 0 66 78" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <ellipse cx="33" cy="75" rx="21" ry="3.4" fill="#000" opacity=".16" />

      <g style={{ animation: 'respiraAnimal 4.2s ease-in-out infinite', transformOrigin: '33px 72px', transformBox: 'view-box' }}>
        <rect x="19" y="54" width="4.6" height="20" rx="2.3" fill={c.oscuro} />
        <rect x="27" y="54" width="4.6" height="20" rx="2.3" fill={c.cuerpo} />
        <rect x="38" y="54" width="4.6" height="20" rx="2.3" fill={c.oscuro} />
        <rect x="45" y="54" width="4.6" height="20" rx="2.3" fill={c.cuerpo} />

        <ellipse cx="34" cy="47" rx="17" ry="11" fill={c.cuerpo} />
        <ellipse cx="36" cy="51" rx="12" ry="5.5" fill={c.claro} opacity=".65" />
        {/* Las manchas del lomo */}
        <circle cx="30" cy="43" r="1.9" fill={c.claro} opacity=".9" />
        <circle cx="38" cy="42" r="1.7" fill={c.claro} opacity=".9" />
        <circle cx="34" cy="47" r="1.6" fill={c.claro} opacity=".8" />
        <circle cx="43" cy="46" r="1.5" fill={c.claro} opacity=".8" />

        <path d="M45 44C46 34 48 27 47 22" fill="none" stroke={c.cuerpo} strokeWidth="8" strokeLinecap="round" />

        <g style={{ animation: 'ciervoPasta 11s ease-in-out infinite', transformOrigin: '45px 26px', transformBox: 'view-box' }}>
          {/* Cuernos */}
          <path d="M43 15C41 10 39 7 36 5M43 11C40 10 38 9 36.5 7.5M51 15C53 10 55 7 58 5M51 11C54 10 56 9 57.5 7.5"
                fill="none" stroke={c.oscuro} strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="47" cy="19" rx="8.5" ry="9.5" fill={c.cuerpo} />
          <ellipse cx="49" cy="24" rx="5.5" ry="4.5" fill={c.claro} />
          <ellipse cx="38.5" cy="18" rx="3" ry="4.6" fill={c.cuerpo} transform="rotate(-24 38.5 18)" />
          <ellipse cx="55.5" cy="18" rx="3" ry="4.6" fill={c.cuerpo} transform="rotate(24 55.5 18)" />
          <circle cx="44" cy="18" r="1.6" fill={trazo} />
          <circle cx="51" cy="18" r="1.6" fill={trazo} />
          <ellipse cx="49" cy="23" rx="1.7" ry="1.3" fill={trazo} />
        </g>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
   Conejo — dando saltitos
------------------------------------------------------------------ */
function Conejo({ c, trazo }) {
  return (
    <svg viewBox="0 0 50 52" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <ellipse cx="25" cy="49" rx="14" ry="2.8" fill="#000" opacity=".15" />

      <g style={{ animation: 'saltoConejo 3.6s cubic-bezier(.3,.7,.4,1) infinite', transformOrigin: '25px 48px', transformBox: 'view-box' }}>
        <g style={{ animation: 'orejaTic 4.4s ease-in-out infinite', transformOrigin: '25px 22px', transformBox: 'view-box' }}>
          <ellipse cx="19" cy="11" rx="3.6" ry="10" fill={c.cuerpo} transform="rotate(-11 19 11)" />
          <ellipse cx="19" cy="12" rx="1.8" ry="6.5" fill="#ffb9c6" opacity=".55" transform="rotate(-11 19 12)" />
          <ellipse cx="29" cy="12" rx="3.4" ry="9" fill={c.cuerpo} transform="rotate(12 29 12)" />
          <ellipse cx="29" cy="13" rx="1.6" ry="5.8" fill="#ffb9c6" opacity=".5" transform="rotate(12 29 13)" />
        </g>

        <ellipse cx="26" cy="38" rx="13" ry="10" fill={c.cuerpo} />
        <circle cx="38" cy="42" r="4" fill={c.claro} />
        <ellipse cx="24" cy="41" rx="8" ry="5" fill={c.claro} opacity=".7" />
        <g style={{ animation: 'conejoMordisquea 3.6s ease-in-out infinite', transformOrigin: '24px 33px', transformBox: 'view-box' }}>
          <circle cx="23" cy="26" r="9.5" fill={c.cuerpo} />
          <ellipse cx="22" cy="30" rx="5.5" ry="4" fill={c.claro} opacity=".8" />
          <circle cx="18.5" cy="25" r="1.6" fill={trazo} />
          <circle cx="27" cy="25" r="1.6" fill={trazo} />
          <path d="M22.8 28.4L21.4 29.8L22.8 30.8L24.2 29.8Z" fill="#e58aa0" />
        </g>
      </g>
    </svg>
  )
}


/* ------------------------------------------------------------------
   Ardilla — sentada, con la cola levantada
------------------------------------------------------------------ */
function Ardilla({ c, trazo }) {
  return (
    <svg viewBox="0 0 54 56" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <ellipse cx="28" cy="53" rx="15" ry="2.8" fill="#000" opacity=".15" />

      {/* La cola es casi tan grande como ella: es lo que la hace ardilla */}
      <g style={{ animation: 'colaArdilla 3.2s ease-in-out infinite', transformOrigin: '18px 48px', transformBox: 'view-box' }}>
        <path d="M18 48C6 46 2 30 12 18C18 11 26 12 27 18C22 19 15 26 16 36C16.6 42 18 45 18 48Z" fill={c.cuerpo} />
        <path d="M17 44C10 38 10 27 17 20C21 16 25 16 25.6 19C20 22 15 29 16 38C16.3 41 16.7 43 17 44Z" fill={c.claro} opacity=".6" />
      </g>

      <g style={{ animation: 'respiraAnimal 2.8s ease-in-out infinite', transformOrigin: '30px 50px', transformBox: 'view-box' }}>
        <ellipse cx="31" cy="42" rx="11" ry="10" fill={c.cuerpo} />
        <ellipse cx="32" cy="45" rx="7" ry="6" fill={c.claro} opacity=".75" />
        <g style={{ animation: 'ardillaRoe 4.2s ease-in-out infinite', transformOrigin: '33px 36px', transformBox: 'view-box' }}>
          <circle cx="34" cy="28" r="9" fill={c.cuerpo} />
          <ellipse cx="38" cy="31" rx="5" ry="4" fill={c.claro} />
          <path d="M28 21L26.5 14L33 18Z" fill={c.oscuro} />
          <path d="M39 20L42 14L44 21Z" fill={c.oscuro} />
          <circle cx="37" cy="26" r="1.6" fill={trazo} />
          <circle cx="30.5" cy="26" r="1.4" fill={trazo} />
          <ellipse cx="41" cy="30" rx="1.5" ry="1.2" fill={trazo} />
          {/* La bellota que sostiene entre las patas */}
          <ellipse cx="37" cy="37" rx="3.4" ry="3" fill="#b5813f" />
          <path d="M33.8 35.6C34.6 34 39.4 34 40.2 35.6Z" fill="#7d5526" />
        </g>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
   Erizo — husmeando entre la hierba
------------------------------------------------------------------ */
function Erizo({ c, trazo }) {
  // Las púas se generan por ángulo para que salgan parejas del lomo.
  const puas = Array.from({ length: 13 }, (_, i) => {
    const a = Math.PI * (0.06 + (i / 12) * 0.88)
    const cx = 26, cy = 34, r = 15
    const x1 = cx - Math.cos(a) * r, y1 = cy - Math.sin(a) * r
    const x2 = cx - Math.cos(a) * (r + 7), y2 = cy - Math.sin(a) * (r + 7)
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`
  })

  return (
    <svg viewBox="0 0 56 46" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <ellipse cx="27" cy="43" rx="16" ry="2.6" fill="#000" opacity=".15" />
      <g style={{ animation: 'erizoHusmea 5.4s ease-in-out infinite', transformOrigin: '27px 42px', transformBox: 'view-box' }}>
        {puas.map((d, i) => (
          <path key={i} d={d} stroke={c.oscuro} strokeWidth="2.6" strokeLinecap="round" fill="none" />
        ))}
        <ellipse cx="26" cy="35" rx="16" ry="12" fill={c.cuerpo} />
        <ellipse cx="26" cy="38" rx="12" ry="7" fill={c.claro} opacity=".55" />
        <path d="M40 33C48 33 52 37 52 40C52 42 48 43 43 42C40 41.4 39 38 40 33Z" fill={c.claro} />
        <circle cx="51" cy="39.5" r="1.7" fill={trazo} />
        <circle cx="44" cy="35" r="1.5" fill={trazo} />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
   Pajarito — picoteando el suelo
------------------------------------------------------------------ */
function Pajaro({ c, trazo }) {
  return (
    <svg viewBox="0 0 38 40" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <ellipse cx="19" cy="38" rx="10" ry="2.2" fill="#000" opacity=".15" />
      <path d="M15 32V37M22 32V37" stroke={c.oscuro} strokeWidth="1.8" strokeLinecap="round" />
      <g style={{ animation: 'pajaroPicotea 3.4s ease-in-out infinite', transformOrigin: '19px 34px', transformBox: 'view-box' }}>
        <ellipse cx="19" cy="24" rx="11" ry="9.5" fill={c.cuerpo} />
        <ellipse cx="17" cy="27" rx="7" ry="5.5" fill={c.claro} opacity=".8" />
        <path d="M28 21C33 20 35 25 31 28C28 29 26 26 28 21Z" fill={c.oscuro} opacity=".8" />
        <circle cx="12" cy="17" r="7" fill={c.cuerpo} />
        <circle cx="10" cy="16" r="1.6" fill={trazo} />
        <path d="M5.5 18L0.5 20L5.5 22Z" fill="#e8a33c" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
   Colocación

   Las tres colinas del suelo forman terrazas a distintas alturas. Los
   animales se apoyan POR DEBAJO de la línea de cada terraza, nunca por
   encima: antes flotaban justo por eso. Además cada uno lleva su propia
   mata de pasto a los pies, que tapa el punto de contacto y termina de
   asentarlos en el césped.

   Los de arriba van más pequeños; los de abajo, más grandes y cerca.
------------------------------------------------------------------ */
const REPARTO = [
  // [componente, especie, izquierda, altura, ancho, pasto a los pies, retardo]
  // Todos por debajo del 30%: la colina más alta baja hasta el 39% en las
  // hondonadas, y por encima de eso quedarían en el aire.
  { Quien: Ciervo,  especie: 'ciervo',  izq: '2%',  abajo: '28%', ancho: 44, pasto: 40, capa: 0, retardo: '0s' },
  { Quien: Pajaro,  especie: 'pajaro',  izq: '44%', abajo: '29%', ancho: 22, pasto: 22, capa: 0, retardo: '-1.8s' },
  { Quien: Ardilla, especie: 'ardilla', izq: '70%', abajo: '27%', ancho: 30, pasto: 28, capa: 0, retardo: '-3.2s' },
  { Quien: Gato,    especie: 'gato',    izq: '86%', abajo: '21%', ancho: 36, pasto: 34, capa: 1, retardo: '-1.3s' },
  { Quien: Perro,   especie: 'perro',   izq: '22%', abajo: '19%', ancho: 44, pasto: 42, capa: 1, retardo: '-0.7s' },
  { Quien: Erizo,   especie: 'erizo',   izq: '55%', abajo: '17%', ancho: 34, pasto: 32, capa: 1, retardo: '-2.6s' },
  { Quien: Conejo,  especie: 'conejo',  izq: '8%',  abajo: '11%', ancho: 30, pasto: 30, capa: 2, retardo: '-2.1s' },
  { Quien: Pajaro,  especie: 'pajaro2', izq: '76%', abajo: '9%',  ancho: 26, pasto: 26, capa: 2, retardo: '-0.4s' },
]

export default function Animales({ ambiente = 'dia' }) {
  const paleta = PALETA[ambiente] ?? PALETA.dia
  const verdes = VERDES[ambiente] ?? VERDES.dia

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {REPARTO.map(({ Quien, especie, izq, abajo, ancho, pasto, capa, retardo }) => (
        <div key={especie} style={{ position: 'absolute', left: izq, bottom: abajo, width: ancho }}>

          {/* El animal, con su sombra pegada al suelo */}
          <div style={{
            position: 'relative', zIndex: 1,
            animationDelay: retardo,
            filter: ambiente === 'noche'
              ? 'drop-shadow(0 2px 6px rgba(0,0,0,.5))'
              : 'drop-shadow(0 2px 5px rgba(40,60,30,.28))',
            // Son habitantes, no protagonistas: se quedan detrás de las flores.
            opacity: ambiente === 'noche' ? 0.62 : 0.72,
          }}>
            <Quien c={paleta[especie.replace(/\d+$/, '')]} trazo={paleta.trazo} />
          </div>

          {/* La mata que come, delante de las patas: tapa el contacto con
              el suelo y da la excusa visual para que esté comiendo. */}
          <div style={{
            position: 'absolute', left: '50%', bottom: -4,
            width: pasto, height: pasto * 0.52,
            marginLeft: -pasto / 2, zIndex: 2,
            transformOrigin: 'bottom center',
            animation: 'pastoMece 3.4s ease-in-out infinite',
            animationDelay: retardo,
            opacity: 0.6,
          }}>
            <Mata color={verdes[capa]} ancho={pasto} alto={pasto * 0.52} briznas={5} />
          </div>
        </div>
      ))}
    </div>
  )
}
