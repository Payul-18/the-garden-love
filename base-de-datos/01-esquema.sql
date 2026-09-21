-- ============================================================
-- The Garden Love — Esquema de base de datos
--
-- Ejecutar en Supabase: SQL Editor -> New query -> pegar -> Run.
-- El archivo es idempotente: se puede volver a ejecutar sin romper nada
-- ni perder las flores ya creadas.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Tabla de flores
-- ------------------------------------------------------------
-- Una fila = una flor regalada. Se crea desde el panel de Jean (ya con su
-- codigo) y pasa a "canjeada" cuando Gabriela lo escribe en su jardin.
create table if not exists public.flores (
  id            uuid primary key default gen_random_uuid(),
  codigo        text not null unique,       -- 6 digitos: los 2 ultimos son el anio
  nombre        text not null,              -- nombre propio: "Nuestra fecha especial"
  tipo          text not null,              -- especie: girasol, rosa, tulipan, margarita, clavel
  color         text not null,              -- independiente de la especie
  dedicatoria   text not null,
  de_parte_de   text not null,
  fecha_regalo  date not null,
  canjeada      boolean not null default false,
  canjeada_en   timestamptz,
  creada_en     timestamptz not null default now()
);

create index if not exists flores_codigo_idx on public.flores (codigo);
create index if not exists flores_fecha_idx  on public.flores (fecha_regalo);

-- ------------------------------------------------------------
-- 2. Seguridad
-- ------------------------------------------------------------
-- RLS activado SIN ninguna policy = nadie toca la tabla directamente, ni
-- siquiera con la anon key que viaja en el navegador. Todo el acceso pasa
-- por las funciones de mas abajo, que son SECURITY DEFINER y exponen
-- exactamente lo necesario y nada mas.
alter table public.flores enable row level security;

-- Clave del panel de administracion, en una tabla igual de bloqueada:
-- desde el navegador es completamente invisible.
create table if not exists public.config (
  clave  text primary key,
  valor  text not null
);
alter table public.config enable row level security;

-- La clave real NO vive en este archivo, porque el repositorio es publico.
-- Se guarda ejecutando aparte 02-clave-admin.sql (ver el .ejemplo de al lado),
-- y debe coincidir con VITE_CLAVE_ADMIN del .env de la app.
insert into public.config (clave, valor)
values ('clave_admin', 'sin-configurar')
on conflict (clave) do nothing;

-- ------------------------------------------------------------
-- 3. Generador de codigos
-- ------------------------------------------------------------
-- Seis digitos numericos, donde los DOS ULTIMOS son el anio del regalo:
--   071126 -> flor del anio 2026
-- Son solo numeros por dos razones: en el celular abre el teclado numerico,
-- y escritos a mano no hay forma de confundir una letra con otra.
drop function if exists public.generar_codigo();
drop function if exists public.generar_codigo(date);

create or replace function public.generar_codigo(p_fecha date)
returns text
language plpgsql
as $$
declare
  sufijo  text := to_char(p_fecha, 'YY');
  intento text;
begin
  loop
    -- Cuatro digitos libres (0000-9999) mas el anio.
    intento := lpad(floor(random() * 10000)::int::text, 4, '0') || sufijo;
    exit when not exists (select 1 from public.flores where codigo = intento);
  end loop;
  return intento;
end;
$$;

-- ------------------------------------------------------------
-- 4. Normalizador de codigos
-- ------------------------------------------------------------
-- Gabriela puede escribir "07 11 26" o "071126": todo se reduce a la misma
-- forma antes de buscar, para que un espacio de mas no arruine el momento.
create or replace function public.normalizar_codigo(p_codigo text)
returns text
language sql
immutable
as $$
  select regexp_replace(coalesce(p_codigo, ''), '[^0-9]', '', 'g');
$$;

-- ------------------------------------------------------------
-- 5. CANJEAR (lo usa Gabriela)
-- ------------------------------------------------------------
-- Recibe un codigo suelto y devuelve UNA flor o un estado. Nunca permite
-- listar la tabla: sin el codigo exacto no devuelve absolutamente nada.
-- Estados: 'ok' | 'ya_canjeada' | 'no_existe'
create or replace function public.canjear_codigo(p_codigo text)
returns table (
  estado        text,
  id            uuid,
  nombre        text,
  tipo          text,
  color         text,
  dedicatoria   text,
  de_parte_de   text,
  fecha_regalo  date
)
security definer
set search_path = public
language plpgsql
as $$
declare
  f public.flores%rowtype;
begin
  select * into f
  from public.flores
  where public.normalizar_codigo(codigo) = public.normalizar_codigo(p_codigo);

  if not found then
    return query select 'no_existe'::text, null::uuid, null::text, null::text,
                        null::text, null::text, null::text, null::date;
    return;
  end if;

  if f.canjeada then
    -- Ya esta en el jardin: el frontend la busca y hace scroll hasta ella.
    return query select 'ya_canjeada'::text, f.id, f.nombre, f.tipo, f.color,
                        f.dedicatoria, f.de_parte_de, f.fecha_regalo;
    return;
  end if;

  update public.flores
  set canjeada = true, canjeada_en = now()
  where flores.id = f.id;

  return query select 'ok'::text, f.id, f.nombre, f.tipo, f.color,
                      f.dedicatoria, f.de_parte_de, f.fecha_regalo;
end;
$$;

-- ------------------------------------------------------------
-- 6. VER EL JARDIN (lo usa Gabriela)
-- ------------------------------------------------------------
-- Devuelve solo las flores YA canjeadas, y nunca los codigos: asi nadie
-- puede adelantarse a una sorpresa que todavia no fue entregada.
create or replace function public.ver_jardin()
returns table (
  id            uuid,
  nombre        text,
  tipo          text,
  color         text,
  dedicatoria   text,
  de_parte_de   text,
  fecha_regalo  date
)
security definer
set search_path = public
language sql
as $$
  select id, nombre, tipo, color, dedicatoria, de_parte_de, fecha_regalo
  from public.flores
  where canjeada = true
  order by fecha_regalo asc, creada_en asc;
$$;

-- ------------------------------------------------------------
-- 7. FUNCIONES DEL PANEL (las usa Jean)
-- ------------------------------------------------------------
create or replace function public.verificar_clave(p_clave text)
returns void
security definer
set search_path = public
language plpgsql
as $$
begin
  if p_clave is null or p_clave <> (select valor from public.config where clave = 'clave_admin') then
    raise exception 'no autorizado';
  end if;
end;
$$;

-- Crear una flor. Devuelve el codigo que va escrito en la tarjetita.
create or replace function public.admin_crear_flor(
  p_clave        text,
  p_nombre       text,
  p_tipo         text,
  p_color        text,
  p_dedicatoria  text,
  p_de_parte_de  text,
  p_fecha_regalo date
)
returns table (id uuid, codigo text)
security definer
set search_path = public
language plpgsql
as $$
declare
  nuevo_codigo text;
  nuevo_id     uuid;
begin
  perform public.verificar_clave(p_clave);
  nuevo_codigo := public.generar_codigo(p_fecha_regalo);

  insert into public.flores (codigo, nombre, tipo, color, dedicatoria, de_parte_de, fecha_regalo)
  values (nuevo_codigo, p_nombre, p_tipo, p_color, p_dedicatoria, p_de_parte_de, p_fecha_regalo)
  returning flores.id into nuevo_id;

  return query select nuevo_id, nuevo_codigo;
end;
$$;

create or replace function public.admin_listar_flores(p_clave text)
returns setof public.flores
security definer
set search_path = public
language plpgsql
as $$
begin
  perform public.verificar_clave(p_clave);
  return query select * from public.flores order by creada_en desc;
end;
$$;

-- Editar una flor, incluso despues de canjeada (corregir tipografias).
-- El codigo NUNCA cambia: la tarjetita ya esta escrita y entregada.
create or replace function public.admin_editar_flor(
  p_clave        text,
  p_id           uuid,
  p_nombre       text,
  p_tipo         text,
  p_color        text,
  p_dedicatoria  text,
  p_de_parte_de  text,
  p_fecha_regalo date
)
returns void
security definer
set search_path = public
language plpgsql
as $$
begin
  perform public.verificar_clave(p_clave);
  update public.flores
  set nombre = p_nombre,
      tipo = p_tipo,
      color = p_color,
      dedicatoria = p_dedicatoria,
      de_parte_de = p_de_parte_de,
      fecha_regalo = p_fecha_regalo
  where flores.id = p_id;
end;
$$;

create or replace function public.admin_borrar_flor(p_clave text, p_id uuid)
returns void
security definer
set search_path = public
language plpgsql
as $$
begin
  perform public.verificar_clave(p_clave);
  delete from public.flores where flores.id = p_id;
end;
$$;

-- ------------------------------------------------------------
-- 8. Permisos
-- ------------------------------------------------------------
-- El rol anonimo (el del navegador) solo puede EJECUTAR estas funciones.
-- No puede leer ni escribir ninguna tabla directamente.
revoke all on public.flores from anon, authenticated;
revoke all on public.config from anon, authenticated;

grant execute on function public.canjear_codigo(text)      to anon, authenticated;
grant execute on function public.ver_jardin()              to anon, authenticated;
grant execute on function public.admin_crear_flor(text, text, text, text, text, text, date) to anon, authenticated;
grant execute on function public.admin_listar_flores(text) to anon, authenticated;
grant execute on function public.admin_editar_flor(text, uuid, text, text, text, text, text, date) to anon, authenticated;
grant execute on function public.admin_borrar_flor(text, uuid) to anon, authenticated;

-- Internas: nadie las llama desde fuera.
revoke execute on function public.verificar_clave(text)  from anon, authenticated;
revoke execute on function public.generar_codigo(date)   from anon, authenticated;
