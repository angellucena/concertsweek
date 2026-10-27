# 🎵 Concerts Week — Agenda Semanal de Música en Vivo

**Concerts Week** es un sitio web estático de 5 páginas para consultar la cartelera de conciertos, festivales y recitales en vivo en Argentina. Tiene una estética *nightlife* con paleta neón, componentes de Bootstrap, animaciones y diseño 100% responsivo (mobile, tablet y desktop).

---

## 🔗 Enlaces del proyecto

* **Repositorio público (GitHub):** https://github.com/angellucena/concertsweek
* **Sitio desplegado (Vercel / Netlify):** https://concertsweek.netlify.app/

---

## 🛠️ Tecnologías

* **HTML5 semántico:** `header`, `nav`, `main`, `section`, `article`, `figure`, `figcaption`, `footer`, con indentación por jerarquía.
* **SEO on-page:** `<title>`, `meta description` y `meta keywords` únicos en cada página, Open Graph básico, datos estructurados `MusicEvent` (JSON-LD) en la cartelera y `alt` descriptivo en todas las imágenes.
* **SCSS con arquitectura de partials** (`main.scss` solo contiene `@use`):
  variables, nesting, mixins con parámetros (`flex-layout`, `grid-columns`, `transition-smooth`, `neon-text`, `glass-surface`, `gradient-text`, `tablet`/`desktop`/`wide`), `@extend` con placeholders (`%card-base`, `%section-box`, `%form-field-base`, `%badge-base`, `%chip-base`, `%icon-bubble`).
* **Bootstrap 5.3.3 (CDN):** navbar responsiva con menú hamburguesa (estilada desde SCSS), carruseles, acordeón de preguntas frecuentes y sistema de grillas.
* **Animaciones:**
  * Nativas en SCSS: `@keyframes` (`equalizer` del logo, `marquee`, `ripple`, `floatY`, `shine`, `popIn`, `drawCheck`, `pulseGlow`, `captionRise`…) y `transition` en botones, tarjetas, enlaces y galería.
  * Librería externa: **AOS** (`data-aos`) en todas las páginas.
* **JavaScript vanilla** (`assets/js/main.js`): header con sombra y barra de progreso, botón volver arriba, filtros de la agenda (género, ciudad y búsqueda), filtro y "Ver más" en la galería, cuenta regresiva y formulario de contacto con confirmación animada.
* **Responsividad:** enfoque mobile-first con media queries (576px, 768px, 1024px y 1400px), sin scroll horizontal.
* **Diseño "Black Stage":** fondo negro profundo en capas, acentos neón violeta/rosa/cian e imágenes en blanco y negro que recuperan el color al pasar el mouse.
* **Google Fonts:** Outfit (títulos) e Inter (texto).

---

## 🎤 Contenido

* **Cartelera:** 36 shows y festivales en Argentina (octubre 2026 – marzo 2027) con filtros por género y ciudad. Fuentes: agendas y ticketeras públicas consultadas el 20/10/2026. Las fechas pueden cambiar: confirmar siempre en el canal oficial de la productora.
* **Galería:** shows históricos por género con frase del artista (tomadas de la prensa argentina) o "dato del show" cuando no hay una cita verificada. Las fotos son ilustrativas del ambiente de un recital.
* **Sobre nosotros:** la línea de tiempo del proyecto es narrativa y editable.

---

## 📁 Estructura

```
├── index.html
├── pages/
│   ├── conciertos.html
│   ├── nosotros.html
│   ├── galeria.html
│   └── contacto.html
├── scss/
│   ├── main.scss            ← solo @use
│   ├── utilities/           ← _variables, _mixins, _extends
│   ├── base/                ← _base, _tipografia, _animaciones
│   ├── layout/              ← _header, _logo, _nav, _footer
│   └── components/          ← _buttons, _cards, _carousel, _gallery, _agenda, _about, _support, _forms
├── styles/
│   └── styles.css           ← CSS compilado
└── assets/
    ├── img/                 ← afiches y fotografías (.webp)
    ├── icons/               ← favicon e íconos de redes (.svg)
    └── js/                  ← main.js (interacciones)
```

---

## ⚙️ Compilar el SCSS

```bash
npx sass scss/main.scss styles/styles.css
# o en modo watch:
npx sass --watch scss/main.scss:styles/styles.css
```

---

## 🚀 Despliegue

El sitio es 100% estático (no requiere build), por lo que se despliega tal cual:

* **Vercel:** *Add New → Project* → importar el repo → *Framework Preset: Other* → dejar vacío el *Build Command* y el *Output Directory* → *Deploy*.
* **Netlify:** *Add new site → Import an existing project* → elegir el repo → dejar vacío el *Build command* y usar `.` como *Publish directory* → *Deploy*.

Todas las rutas son relativas (`assets/...` en la raíz y `../assets/...` dentro de `pages/`), por lo que cargan igual en producción.
