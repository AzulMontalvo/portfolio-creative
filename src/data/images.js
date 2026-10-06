/**
 * Ayudantes para describir imágenes de forma optimizada.
 *
 * Cada imagen es un objeto { src, srcSet?, width, height, alt }.
 *  - width/height evitan saltos de diseño (CLS) mientras la imagen carga.
 *  - srcSet permite al navegador elegir el tamaño justo para cada pantalla.
 */

const WIDTHS = [480, 800, 1200];

/**
 * Imagen de ejemplo (picsum.photos) en WebP con varias resoluciones.
 * Sustitúyelas por las tuyas con `local()`.
 */
export function placeholder(seed, width = 1200, height = 800, alt = '', opts = '') {
  const ratio = height / width;
  const url = (w) =>
    `https://picsum.photos/seed/${seed}/${w}/${Math.round(w * ratio)}.webp${opts}`;
  return {
    src: url(800),
    srcSet: WIDTHS.map((w) => `${url(w)} ${w}w`).join(', '),
    width,
    height,
    alt,
  };
}

/**
 * Imagen propia ubicada en /public/images.
 *
 * Recomendación: exporta cada imagen en WebP o AVIF a varios anchos con el
 * sufijo del ancho, p. ej.  flamingo-480.webp, flamingo-800.webp, flamingo-1200.webp
 * y usa:  local('flamingo', 1200, 800, 'Flamenco de papel')
 *
 * Si solo tienes un archivo, usa  local('flamingo.webp', 1200, 800, 'alt', false)
 */
export function local(name, width, height, alt = '', responsive = true) {
  if (!responsive) return { src: `/images/${name}`, width, height, alt };
  return {
    src: `/images/${name}-800.webp`,
    srcSet: WIDTHS.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', '),
    width,
    height,
    alt,
  };
}
