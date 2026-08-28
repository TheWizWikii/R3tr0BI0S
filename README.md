# RetroBIOS // Archive — sitio estático

Página no oficial, estilo synthwave/CRT, para navegar y descargar los packs de BIOS
del proyecto [Abdess/retrobios](https://github.com/Abdess/retrobios).

No incluye ningún archivo de BIOS: cada botón de descarga apunta directamente
a los assets publicados en las *releases* oficiales de ese repositorio
(`github.com/Abdess/retrobios/releases`).

## Archivos

- `index.html` — estructura de la página
- `style.css` — estética retro (rejilla synthwave, scanlines, glitch, cartuchos)
- `data.js` — datos de cada plataforma/pack (versión, tamaños, URLs). **Edita solo este archivo** cuando salga una release nueva.
- `script.js` — animación de fondo (canvas), generación de tarjetas, buscador, tabs y botón de copiar

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (o usa uno existente) y sube estos 4 archivos a la raíz (o a una carpeta `docs/`).
2. En GitHub: **Settings → Pages**.
3. En "Build and deployment" elige **Deploy from a branch**, rama `main` y carpeta `/ (root)` (o `/docs` si los pusiste ahí).
4. Guarda. GitHub te dará una URL tipo `https://tu-usuario.github.io/tu-repo/` en 1-2 minutos.

También puedes previsualizarlo en local abriendo `index.html` directamente en el navegador,
sin necesidad de servidor.

## Actualizar cuando salga una nueva versión del pack

Abre `data.js` y cambia:

1. La constante `VERSION` (ej. `v2026.08.06` → `v2026.11.01`).
2. Los tamaños/número de archivos y nombres de ZIP de cada plataforma, copiándolos
   de la tabla que aparece en la nueva release: `github.com/Abdess/retrobios/releases/latest`.

No hace falta tocar `index.html` ni `script.js`: las tarjetas se generan solas a partir de `data.js`.

## Aviso legal

Los scripts de este sitio son tuyos para modificar libremente. Los propios archivos
de BIOS/firmware **no** son tuyos ni míos: son software de sistema de terceros. El
repositorio original los distribuye con fines de copia de seguridad personal y
compatibilidad con emuladores — revisa su [NOTICE](https://github.com/Abdess/retrobios/blob/main/NOTICE)
antes de redistribuir nada por tu cuenta.
