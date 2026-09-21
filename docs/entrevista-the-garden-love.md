# The Garden Love — Resumen de entrevista de proceso

**Fecha de la entrevista:** 20 de septiembre de 2026
**Entrevistado:** Jean Serva
**Destinataria del producto:** Gabriela ("Gabichi")
**Estado:** entrevista cerrada — listo para construir

---

## 1. Objetivo del proceso

Construir **The Garden Love**, un aplicativo web de regalo personal: un **jardín virtual privado** que crece cada vez que Jean (u otra persona) le regala una flor física a Gabriela.

Mecánica central:

1. Jean regala una flor real y entrega junto a ella una **tarjetita escrita a mano con un código corto**.
2. Gabriela entra al link del jardín, introduce **la llave de acceso** y luego **el código**.
3. La flor **brota del suelo y florece** con animación, y queda **guardada para siempre** en su jardín.
4. Al tocar cualquier flor se abre su **ficha**: nombre propio, tipo, dedicatoria, de parte de quién y fecha del regalo.

No es una app de productividad: es un objeto emocional. **La calidad visual y la sensación de "pequeño videojuego mágico" son parte del requisito, no un extra.**

---

## 2. Usuario o destinatario

| Rol | Quién | Qué hace | Cómo entra |
|---|---|---|---|
| **Destinataria** | Gabriela ("Gabichi") | Ingresa códigos, mira su jardín, lee las dedicatorias | Link público + llave de aniversario |
| **Administrador** | Jean Serva | Crea flores y genera códigos, edita y borra | **URL secreta**, sin contraseña |

Dispositivo principal: **celular** (diseño mobile-first, vertical, pensado para el dedo). Debe verse bien también en laptop.
Idioma: **español** (único).

---

## 3. Flujo paso a paso

### Flujo A — Jean genera una flor (panel secreto)

1. Entra a la URL secreta (no enlazada desde ningún lado).
2. Llena el formulario:
   - **Nombre propio de la flor** (ej. "Nuestra fecha especial")
   - **Tipo/especie** (girasol, rosa, tulipán, margarita, clavel)
   - **Color**
   - **Dedicatoria** (texto libre)
   - **De parte de quién** (campo libre y editable — no siempre es Jean; puede ser su mamá, una amiga)
   - **Fecha del regalo**
3. Pulsa "Generar" → el sistema **crea el código corto** y lo muestra en pantalla.
4. Jean **escribe el código a mano** en la tarjetita y la entrega con la flor física.
5. Desde el mismo panel puede **ver, editar o borrar** cualquier flor, **incluso después de canjeada** (para corregir tipografías sin romper nada).

### Flujo B — Gabriela canjea (jardín)

1. Abre el link.
2. **Pantalla de bienvenida personalizada**: se le pide la fecha de aniversario como llave → **la llave configurada** (25 de agosto).
3. Entra al jardín. **La primera vez está completamente vacío** — nada precargado.
4. Introduce el código de la tarjetita.
5. **Animación**: del suelo brota un tallo, crece y **florece** — sensación de "desbloqueaste un personaje nuevo".
6. Se abre la **ficha de la flor** con toda la información.
7. La flor **queda permanentemente** en el jardín. El mismo efecto de brote se repite con cada flor nueva, sea la primera o la vigésima.
8. En visitas siguientes: la llave, y su jardín completo tal como lo dejó.

---

## 4. Inputs necesarios

**Del panel (por cada flor):** nombre propio · tipo/especie · color · dedicatoria · de parte de quién · fecha del regalo.

**De Gabriela:** la llave la llave configurada · el código de la tarjetita.

**Del entorno:** la **hora local del dispositivo** de Gabriela, que define el ambiente del jardín.

---

## 5. Outputs esperados

1. **Un código corto**, legible, escribible a mano.
2. **El jardín renderizado**, con todas sus flores acumuladas.
3. **La ficha de cada flor** al tocarla.
4. **La animación de florecimiento** en cada canje.

---

## 6. Reglas principales

### Códigos
- **Cortos** — deben caber cómodamente en una tarjetita escrita a mano.
- **Sin caracteres confundibles**: nada de `O`/`0`, `I`/`1`/`l`.
- **Tolerantes al ingresarlos**: ignorar mayúsculas/minúsculas y espacios sobrantes.
- **Un código = una flor.** No reutilizable para crear duplicados.

### Persistencia
- **Base de datos en la nube** (decisión explícita del usuario). El jardín debe sobrevivir a cambio de dispositivo, de navegador y a limpiar caché. Prohibido depender solo de almacenamiento local.

### Ambiente dinámico según hora local
| Franja horaria | Ambiente |
|---|---|
| 00:00 – 15:00 | **Día** — cielo celeste, sol suave, mariposas |
| 15:00 – 18:00 | **Atardecer** — tonos naranjas y dorados |
| 18:00 – 00:00 | **Noche** — fondo oscuro, luciérnagas, flores que brillan suavemente |

### Estilo visual
- Base: **jardín ilustrado estilo cuento de hadas**, prado con césped.
- Flores: **SVG dibujadas a mano y animadas**, acabado **tipo videojuego bonito** — orgánicas, con volumen. **Explícitamente prohibido**: aspecto frío/geométrico "hecho por computadora", o pixelado.
- **El jardín debe estar vivo permanentemente**, aunque no se canjee nada: viento que mece las flores, mariposas de día, luciérnagas de noche.
- Color y especie son **independientes**: una misma ilustración de rosa se pinta roja, blanca o rosada. Esto multiplica combinaciones sin multiplicar el trabajo de dibujo.

### Organización
- Cuando el jardín crezca, las flores se agrupan **por año** (2026, 2027, …).

---

## 7. Excepciones y casos límite

| Situación | Comportamiento definido |
|---|---|
| **Código ya canjeado** | Mensaje tierno: *"Esta flor ya está en tu jardín 🌷"* + el jardín hace **scroll y zoom hasta esa flor** |
| **Código inválido** | Mensaje romántico: *"Esa semilla no germinó… ¿revisas el código?"* — nunca un error seco |
| **Error tipográfico de Jean** | **Editable y borrable** desde el panel, incluso después de canjeada |
| **Jardín lleno** | Agrupación **por años** |
| **Llave incorrecta** | (Pendiente de definir el texto — debe mantener el tono cariñoso) |
| **Sin conexión** | (Pendiente — ver riesgos) |

---

## 8. Criterios de calidad

El resultado es bueno si:

1. **Gabriela entiende qué hacer sin que nadie le explique.**
2. **El momento del brote emociona.** Es el corazón del producto.
3. **El jardín nunca se ve frío, tétrico ni vacío** — criterio literal del usuario.
4. **Funciona impecable en celular**, que es donde va a vivir.
5. **Las flores nunca se pierden**, aunque cambie de teléfono.
6. **El código es escribible a mano sin ambigüedad** y ella lo ingresa sin frustrarse.
7. **Los dibujos se ven hechos con cariño**, no generados.

---

## 9. Riesgos y decisiones pendientes

### Riesgo principal: el plazo
El usuario necesita el sistema **funcionando hoy, 20 de septiembre de 2026**, para regalar un **girasol mañana 21**.

**Priorización acordada:**
- **v1 (hoy, imprescindible):** infraestructura completa + panel + generación de códigos + pantalla de llave + jardín + canje con animación + ficha + ciclo día/atardecer/noche + **el girasol perfectamente dibujado y animado**.
- **v1.1 (días siguientes):** rosa, tulipán, margarita, clavel. El panel ya queda preparado para recibirlas.
- **Futuro:** botón de compartir (captura del jardín para WhatsApp/Instagram/Facebook) — **explícitamente fuera de la v1**.

> ⚠️ Confirmación de la priorización aún no recibida del usuario.

### Otros pendientes
- **Acceso al DNS de `janserva.com`** para configurar el subdominio (ej. `jardin.janserva.com`). Requiere acción del usuario.
- **Crear cuenta de Supabase** (plan gratuito) — no la tiene aún.
- **Texto de la pantalla de bienvenida**: cómo se le pide la llave sin arruinar la sorpresa y usando el apodo **"Gabichi"**.
- **Formato exacto de la llave**: día + mes, sin año, para que sirva siempre.
- **Comportamiento offline** y estados de carga: sin definir.
- **Aniversario real:** 25 de agosto de 2023. Mañana **no** es el aniversario — es otra ocasión especial.

---

## 10. Stack técnico definido

| Capa | Tecnología | Nota |
|---|---|---|
| Frontend | **React** | Decisión explícita del usuario, por fluidez de animaciones |
| Ilustración | **SVG animado** | Dibujado a mano, no generado |
| Base de datos | **Supabase** (plan gratuito) | Por crear |
| Hosting | **Vercel** (plan gratuito) | El usuario ya maneja GitHub |
| Dominio | Subdominio de **janserva.com** | Requiere acceso DNS |
| Costo total | **$0** | Requisito del usuario |

---

## 11. Siguiente acción recomendada

1. **Confirmar la priorización v1 / v1.1** (girasol primero, resto del catálogo después).
2. **Crear el proyecto en Supabase** y definir el esquema de la tabla de flores.
3. **Montar el esqueleto React** con la estructura de carpetas del proyecto.
4. **Construir el panel de administración** (lo primero que debe funcionar — sin él no hay códigos).
5. **Dibujar el girasol SVG** con su animación de florecimiento.
6. **Construir el jardín** con el ciclo día/atardecer/noche y las animaciones ambientales.
7. **Desplegar y configurar el subdominio.**
8. **Probar el flujo completo de punta a punta** con un código real antes de escribir la tarjetita.
