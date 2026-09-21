# The Garden Love 🌻

Un jardín virtual que florece con cada flor real regalada.

Cada flor física va acompañada de una tarjetita con un código de 6 dígitos
escrito a mano. Al escribirlo en la web, la flor brota del suelo, florece y
queda guardada para siempre en el jardín, junto con su dedicatoria.

## Estructura

```
Proyecto Flores/
├── app/              Aplicación React (Vite)
├── base-de-datos/    Esquema SQL de Supabase
├── diseño/           Prototipo original de Claude Design
└── docs/             Entrevista y decisiones de producto
```

## Cómo funciona

**El jardín** (`/`) — Se entra con una llave de 4 dígitos. Dentro, un prado
que cambia con la hora real del dispositivo: día, atardecer y noche, cada uno
con su propia vida (nubes, mariposas, luciérnagas). Las flores se agrupan por
año y se muestra uno a la vez.

**El panel** (ruta secreta, definida en `VITE_RUTA_ADMIN`) — Se crea cada flor
y se obtiene el código para la tarjetita. Permite corregir o borrar una flor
incluso después de canjeada; el código nunca cambia, porque la tarjetita ya
está entregada.

## Puesta en marcha

1. Ejecutar `base-de-datos/01-esquema.sql` en el SQL Editor de Supabase.
2. Copiar `app/.env.example` como `app/.env` y rellenar los valores.
3. Instalar y arrancar:

```bash
cd app
npm install
npm run dev
```

## Seguridad

La tabla tiene RLS activado **sin ninguna policy**: la anon key que viaja en
el navegador no puede leer ni escribir ninguna tabla directamente. Todo el
acceso pasa por funciones `SECURITY DEFINER` que exponen lo justo:

- `canjear_codigo(codigo)` — devuelve una sola flor, y solo si se conoce su
  código exacto. No permite listar nada.
- `ver_jardin()` — devuelve las flores ya canjeadas, **nunca los códigos**,
  para que no se pueda adelantar una sorpresa aún no entregada.
- Las funciones de administración exigen una clave guardada en una tabla
  igualmente bloqueada.

## Stack

React · Vite · Supabase (PostgreSQL) · Vercel
