# Portafolio — React + Vite

```bash
npm install
npm run dev      # desarrollo
npm run build    # producción (carpeta dist/)
```

## Editar contenido

Todo el contenido está en **`src/data/content.js`**: perfil, estadísticas, tecnologías,
carruseles y proyectos de Branding, Diseño y Desarrollo Web.

- **CV**: reemplaza `public/cv/CV.pdf`.
- **Imágenes** (optimización automática):
  1. Copia los originales (PNG/JPG, sin espacios ni acentos en el nombre) a
     `imagenes-originales/<carpeta>/`, p. ej. `imagenes-originales/design/`.
  2. Ejecuta `npm run images` (o `npm run images -- design` para una sola carpeta).
     Se generan versiones WebP de 480, 800 y 1200 px en `public/images/<carpeta>/`.
  3. El script imprime las líneas `local('design/nombre', ancho, alto, '...')` con las
     medidas reales: pégalas en `src/data/content.js` y escribe una descripción.

  Los originales quedan fuera de `public/`, así no se publican archivos pesados.
  Si solo tienes un archivo ya optimizado en `public/images/`:
  `local('archivo.webp', ancho, alto, 'Alt', false)`.

## Rutas

| Ruta              | Página         |
| ----------------- | -------------- |
| `/`               | Inicio         |
| `/branding`       | Branding       |
| `/diseno`         | Diseño         |
| `/desarrollo-web` | Desarrollo Web |

> Al desplegar (Netlify, Vercel, etc.) configura la redirección SPA para que todas las
> rutas sirvan `index.html`.

## Rendimiento

- Loader tipo *skeleton* en cada imagen y *fade-in* al cargar (`LazyImage`).
- `loading="lazy"`, `decoding="async"`, `srcset`/`sizes` y `fetchpriority` en imágenes clave.
- Los carruseles solo montan la imagen actual y sus vecinas.
- Cada página se descarga bajo demanda (code splitting con `React.lazy`).
