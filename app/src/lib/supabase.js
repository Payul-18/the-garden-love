import { createClient } from '@supabase/supabase-js'

// Cliente único de Supabase. La anon key está pensada para vivir en el
// navegador: la tabla tiene RLS sin policies, así que esta clave por sí sola
// no permite leer ni escribir nada. Todo pasa por las funciones RPC.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

const CLAVE_ADMIN = import.meta.env.VITE_CLAVE_ADMIN

// --- Lo que usa Gabriela -------------------------------------------------

/**
 * Canjea un código. Devuelve { estado, ...flor }.
 * estado: 'ok' | 'ya_canjeada' | 'no_existe'
 */
export async function canjearCodigo(codigo) {
  const { data, error } = await supabase.rpc('canjear_codigo', { p_codigo: codigo })
  if (error) throw error
  return data?.[0] ?? { estado: 'no_existe' }
}

/** Devuelve todas las flores ya canjeadas, ordenadas por fecha. */
export async function verJardin() {
  const { data, error } = await supabase.rpc('ver_jardin')
  if (error) throw error
  return data ?? []
}

// --- Lo que usa el panel de Jean -----------------------------------------

/** Crea una flor y devuelve { id, codigo } para escribir en la tarjetita. */
export async function crearFlor(flor) {
  const { data, error } = await supabase.rpc('admin_crear_flor', {
    p_clave: CLAVE_ADMIN,
    p_nombre: flor.nombre,
    p_tipo: flor.tipo,
    p_color: flor.color,
    p_dedicatoria: flor.dedicatoria,
    p_de_parte_de: flor.deParteDe,
    p_fecha_regalo: flor.fechaRegalo,
  })
  if (error) throw error
  return data?.[0]
}

/** Todas las flores con sus códigos, canjeadas o no. */
export async function listarFlores() {
  const { data, error } = await supabase.rpc('admin_listar_flores', { p_clave: CLAVE_ADMIN })
  if (error) throw error
  return data ?? []
}

/** Edita una flor. El código nunca cambia: la tarjetita ya está escrita. */
export async function editarFlor(id, flor) {
  const { error } = await supabase.rpc('admin_editar_flor', {
    p_clave: CLAVE_ADMIN,
    p_id: id,
    p_nombre: flor.nombre,
    p_tipo: flor.tipo,
    p_color: flor.color,
    p_dedicatoria: flor.dedicatoria,
    p_de_parte_de: flor.deParteDe,
    p_fecha_regalo: flor.fechaRegalo,
  })
  if (error) throw error
}

export async function borrarFlor(id) {
  const { error } = await supabase.rpc('admin_borrar_flor', { p_clave: CLAVE_ADMIN, p_id: id })
  if (error) throw error
}
