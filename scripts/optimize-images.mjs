/**
 * Convierte las imágenes originales a WebP optimizado en 3 anchos.
 *
 *   imagenes-originales/design/poster.png
 *     → public/images/design/poster-480.webp
 *     → public/images/design/poster-800.webp
 *     → public/images/design/poster-1200.webp
 *
 * Uso:  npm run images            (todas las carpetas)
 *       npm run images -- design  (solo una carpeta)
 *
 * Al final imprime las líneas `local(...)` con las medidas reales,
 * listas para pegar en src/data/content.js.
 * Las imágenes ya convertidas se omiten (borra los .webp para regenerarlas).
 */
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, parse, relative, sep } from 'node:path';
import sharp from 'sharp';

const SRC = 'imagenes-originales';
const OUT = join('public', 'images');
const WIDTHS = [480, 800, 1200];
const QUALITY = 78;
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.tif', '.tiff']);

const only = process.argv[2];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXT.has(parse(entry.name).ext.toLowerCase())) yield full;
  }
}

const exists = (p) => stat(p).then(() => true, () => false);
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

const root = only ? join(SRC, only) : SRC;
if (!(await exists(root))) {
  console.error(`No existe la carpeta "${root}".`);
  process.exit(1);
}

const lines = [];
let before = 0;
let after = 0;

for await (const file of walk(root)) {
  const rel = relative(SRC, file);
  const { dir, name } = parse(rel);
  const outDir = join(OUT, dir);
  const key = [dir, name].filter(Boolean).join('/').split(sep).join('/');
  await mkdir(outDir, { recursive: true });

  const meta = await sharp(file).metadata();
  // Respeta la orientación EXIF de fotos de cámara/celular
  const rotated = meta.orientation >= 5;
  const width = rotated ? meta.height : meta.width;
  const height = rotated ? meta.width : meta.height;
  before += (await stat(file)).size;

  for (const w of WIDTHS) {
    const out = join(outDir, `${name}-${w}.webp`);
    if (!(await exists(out))) {
      await sharp(file)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(out);
    }
    if (w === 800) after += (await stat(out)).size;
  }

  console.log(`✓ ${rel}  (${width}×${height})`);
  lines.push(`  local('${key}', ${width}, ${height}, 'Descripción de la imagen'),`);
}

console.log(`\nPeso original: ${kb(before)}  →  versión de 800px en WebP: ${kb(after)}`);
console.log('\nPega en src/data/content.js (y cambia la descripción):\n');
console.log(lines.join('\n'));
