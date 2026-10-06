/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENIDO DEL PORTAFOLIO
 *  Edita este archivo para cambiar textos, imágenes y proyectos.
 *  Para usar tus propias imágenes, colócalas en /public/images y
 *  reemplaza `placeholder(...)` por `local(...)` (ver images.js).
 * ─────────────────────────────────────────────────────────────
 */
// eslint-disable-next-line no-unused-vars
import { placeholder, local } from './images.js';

export const profile = {
  greeting: 'Hola, soy',
  firstName: 'Azul',
  lastName: 'Montalvo',
  role: 'Desarrolladora FrontEnd & Creative',
  email: 'montalvoazul5@gmail.com',
  cvUrl: '/cv/CV.pdf', // Sustituye el archivo en /public/cv/CV.pdf
  cvFileName: 'CV-Jon-Daniel.pdf',
  // PNG con fondo transparente: la cabeza sobresale del círculo como en el diseño.
  photo: local('retrato_ilustracion.png', 800, 1000, 'Retrato ilustrado de Jon Daniel', false),
};

/*
 * Disponibilidad (tarjeta turquesa).
 * Se controla con la variable VITE_DISPONIBLE del archivo .env (true / false).
 * Si no existe la variable, se muestra como disponible.
 * Tras editar .env, reinicia `npm run dev` (o vuelve a desplegar el sitio).
 */
export const availability = {
  available: import.meta.env.VITE_DISPONIBLE !== 'false',
  availableText: 'Disponible para proyectos',
  unavailableText: 'Sin disponibilidad por ahora',
};

/** Ubicación (tarjeta morada). */
export const locationText = 'Ubicación: México / Remoto';

export const technologies = [
  'Canva',
  'Illustrator',
  'Photoshop',
  'ReactJS',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
];

/** Carrusel de la página de inicio (la tarjeta del flamenco). */
export const homeCarousel = [
  // Medidas reales de cada archivo; el carrusel mantiene su tamaño sin importar la proporción
  local('homeCarousel/trakko', 1200, 675, 'Imagen de Marca del Software Trakko'),
  local('homeCarousel/techscape', 1200, 675, 'Portada Techscape: el futuro de la innovación'),
  local('homeCarousel/power-factor', 1080, 1080, 'Logotipo de Power Factor'),
  local('homeCarousel/blue-haus-studio', 801, 800, 'Personaje de Blue Haus Radio'),
];

/** Imagen decorativa de la tarjeta negra. */
// Generada con `npm run images` desde imagenes-originales/card-decor.jpg.
// Alt vacío a propósito: es decorativa.
export const sphereImage = local('card-decor', 640, 960, '');

/* ─────────────────────────  BRANDING  ───────────────────────── */

/*
 * Campos opcionales de cada proyecto:
 *   link:      'https://...'   → muestra un botón en el modal del proyecto
 *   linkLabel: 'Ver en Behance' → texto del botón (por defecto: 'Ver proyecto')
 *   coverFit:  'contain'        → muestra la portada completa en la tarjeta (sin recortar);
 *                                 útil para banners muy anchos o logotipos
 *   coverBg:   '#000000'        → color de relleno alrededor de la portada (tarjeta y modal)
 */
export const brandingProjects = [
  {
    id: 'power-factor',
    title: 'Power Factor',
    client: 'Power Factor',
    year: 2026,
    category: 'Branding',
    summary: 'Identidad funcional para negocio de venta de suplementación deportiva semanal.',
    description:
      'Desarrollo de identidad visual para Power Factor, un emprendimiento que permite comprar dosis semanales de suplementos originales sin realizar desembolsos gigantes. El proyecto abarca logotipo, paleta cromática, diseño de landing page y estrategia visual para redes sociales.',
    deliverables: ['Logotipo', 'Paleta de color', 'Iconografía', 'Redes Sociales'],
    colors: ['#f5f4f1', '#e2e0d9', '#ffbf00', '#0a0a0a'],
    cover: local('branding/power-factor', 1080, 1080, 'Logotipo de Power Factor: letra P blanca con cápsula amarilla'),
    coverBg: '#0a0a0a',
    link: 'https://drive.google.com/file/d/1mPKSDtfew9aMf186uEe3nwRrGGQpmguK/view?usp=sharing',
    linkLabel: 'Ver Manual Completo',
  },
  {
    id: 'mision-tres-sesenta',
    title: 'Misión 360',
    client: 'Misión 360',
    year: 2026,
    category: 'Logotipo',
    summary: 'Creación de logotipo para identidad en redes sociales.',
    description:
      'Diseño de logotipo y paleta de colores para redes sociales de Misión 360, un proyecto escolar que promueve actividades para salir de la rutina y añadir algo nuevo a tu día.',
    deliverables: ['Logotipo', 'Paleta de color', 'Voz de marca'],
    colors: ['#f7f7f7', '#ebb800', '#524b31', '#1c1c1a'],
    cover: local('branding/mision-tres-sesenta', 768, 769, 'Logotipo de Misión 360 con letras blancas sobre círculo negro'),
    coverFit: 'contain',
    coverBg: '#ffffff',    
  },
  {
    id: 'vanta',
    title: 'Vanta',
    client: 'Vanta - Barra Móvil',
    year: 2025,
    category: 'Identidad visual',
    summary: 'Marca de servicio de barra de bebidas alcohólicas para eventos.',
    description:
      'Identidad seria y elegante para un negocio que ofrece servicio de barra de bebidas alcohólicas para eventos. Incluye logotipo con una variación, paleta de colores y tipografías.',
    deliverables: ['Logotipo', 'Paleta de color', 'Tipografía', 'Identidad Visual'],
    colors: ['#f2e8d5', '#6b4d73', '#4d3273', '#401d3d', '#170826'],
    cover: local('branding/vanta', 5697, 2997, 'Logotipo de Vanta sobre fotografía de cócteles'),
    coverBg: '#ffffff',
    link: 'https://drive.google.com/file/d/1-DChP_7aPQ7kTJHFGVh-YIHhDBifW8K8/view?usp=sharing',
    linkLabel: 'Ver Más',
  },
  {
    id: 'blue-haus',
    title: 'Blue Haus Radio',
    client: 'Marca Personal',
    year: 2024,
    category: 'Branding',
    summary: 'Diseño de logotipo y personaje para marca personal.',
    description:
      'Diseño de logotipo y personaje de submarca para identidad de marca personal.',
    deliverables: ['Logotipo', 'Paleta de color', 'Personaje'],
    colors: ['#f4f1ea', '#001b4c', '#b97600', '#1a1c22'],
    cover: local('branding/blue-haus-studio', 800, 800, 'Logotipo tipográfico de Blue Haus Studio en azul marino'),
    coverBg: '#ffffff',
    link: 'https://drive.google.com/file/d/1m1FuDZqdmbiXCN961Mr-kLBfcPbz9uE7/view?usp=sharing',
    linkLabel: 'Ver Manual Completo',
  },
  {
    id: 'trakko',
    title: 'Trakko',
    client: 'Trakko',
    year: 2025,
    category: 'Identidad visual',
    summary: 'Logotipo para software de conteo de repeticiones de ejercicios en tiempo real.',
    description:
      'Diseño de logotipo y elementos mínimos de publicidad para el software  Trakko, una herramienta de apoyo para el entrenamiento físico que utiliza inteligencia artificial para contar repeticiones de ejercicios en tiempo real, a partir de los movimientos captados por la cámara del dispositivo',
    deliverables: ['Logotipo', 'Iconografía', 'Publicidad', 'Manual de Usuario'],
    colors: ['#f38a00', '#d6c7b0','#1f1f1f'],
    cover: local('branding/trakko', 1920, 1080, 'Logotipo de Trakko sobre barra de pesas: «Cada repetición cuenta»'),
    coverBg: '#1a1a1a',
  },
  {
    id: 'club-ganga',
    title: 'Club Ganga',
    client: 'Club Ganga',
    year: 2026,
    category: 'Logotipo',
    summary: 'Redes Sociales enfocadas a promocion descuentos en plataformas de e-commerce.',
    description:
      'Diseño de logotipo para redes sociales enfocadas a la difusión de descuentos de productos en plataformas de e-commerce.',
    deliverables: ['Logotipo', 'Portada para Redes Sociales', 'Ilustración'],
    colors: ['#ffea32','#1f1f1f'],
    cover: local('branding/club-ganga', 851, 315, 'Portada de redes sociales de Club Ganga con logotipo y ofertas'),
    coverFit: 'contain',
    coverBg: '#0b0b0b',
  },
];

/* ──────────────────────────  DISEÑO  ────────────────────────── */

export const designCarousel = [
  // Generadas con `npm run images` desde imagenes-originales/design
  local('design/techscape', 1920, 1080, 'Portada Techscape: el futuro de la innovación, TechVision Labs'),
  local('design/burro-azul', 6912, 3456, 'Banner de El Burro Azul, burritos caseros, con mascota de burro'),
  local('design/trakko', 1920, 1080, 'Banner de Trakko con barra de pesas: «Cada repetición cuenta»'),
];

// Solo imágenes: las tarjetas de diseño no llevan texto (el alt es para accesibilidad).
// Si una imagen es parte de una colección, agrégale el link así:
//   { ...local('design/nombre', 1080, 1350, 'Alt'), collection: 'https://...' }
// y aparecerá el ícono de colección en su tarjeta.
export const designProjects = [
  local('design/burguer-club-poster', 1080, 1350, 'Póster Burguer Club'),
      {
    ...local('design/juego-cartas', 1080, 1350, 'Juego de Mesa de Cartas'),
    collection: 'https://drive.google.com/drive/folders/1ESUyntOskXkJtGl2xE7Ak9y1gJhcvU2I?usp=sharing',
  },
  local('design/photoshoot-poster', 1080, 1350, 'Póster de sesión fotográfica'),
  local('design/instagram-cafeteria', 1080, 1080, 'Publicación de Instagram para cafetería'),
  local('design/poster-gym-motivation', 1080, 1350, 'Póster de motivación para gimnasio'),
  local('design/portada-libro', 1414, 2000, 'Portada de libro «Estimulación cognitiva para adultos»'),
  local('design/new-cupcake-flavor', 1080, 1350, 'Póster «New cupcake flavor» con cupcake de vainilla'),
    {
    ...local('design/poker-parejas', 1080, 1350, 'Poker para Parejas'),
    collection: 'https://drive.google.com/drive/folders/1E5wz_QgKrzFxfIqrVG-SYOFGYgXmNUop?usp=sharing',
  },
  local('design/were-open', 1080, 1920, 'Historia de Instagram «We’re open»'),
  local('design/instagram-recap', 1080, 1920, 'Historia de Instagram con resumen'),
];

/* ──────────────────────  DESARROLLO WEB  ────────────────────── */

/*
 * Campos opcionales de cada proyecto:
 *   inDevelopment: true    → muestra el ícono «En desarrollo» con su leyenda
 *   statusNote: '...'      → texto de la leyenda
 *                            (por defecto: 'Proyecto en desarrollo. Por ahora solo
 *                            está disponible el repositorio.')
 */
export const webProjects = [
  {
    id: 'power-factor-dev',
    title: 'Power Factor — Landing Page',
    description: 'Landing Page informativa para la marca Power Factor, dedicada a la venta de suplementos alimenticios para deportistas en presentaciones semanales.',
    stack: ['React', 'Vite', 'CSS', 'JavaScript'],
    url: 'https://powerfactormx.vercel.app/',
    linkLabel: 'Ver sitio',
    image: local('webdev/power-factor-dev', 1337, 595, 'Captura de la landing page de Power Factor'),
  },
  {
    id: 'measurio',
    title: 'Measurio',
    description: 'Aplicación web auxiliar en la conversión de unidades de medición para cocinar, hornear, etc.',
    stack: ['React', 'HTML', 'CSS', 'TypeScript', 'JavaScript'],
    url: 'https://measurio.vercel.app/',
    linkLabel: 'Ver demo',
    image: local('webdev/measurio', 1337, 597, 'Captura de Measurio, conversor de unidades de cocina'),
  },
  {
    id: 'mision-tres-sesenta-dev',
    title: 'Misión 360 — Sitio Web',
    description: 'Demo para proyecto  escolar que promueve actividades para salir de la rutina y añadir algo nuevo a tu día. ',
    stack: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://mision360.vercel.app/',
    linkLabel: 'Ver demo',
    image: local('webdev/mision-tres-sesenta-dev', 1337, 597, 'Captura del sitio de Misión 360 con la misión del día'),
  },
  {
    id: 'verbo-culto',
    title: 'Verbo Culto',
    description: 'Aplicación interactiva para consultar, descubrir y aprender nuevas palabras, facilitando la exploración y ampliación del vocabulario.',
    stack: ['Next.js', 'TypeScript', 'JavaScript', '.NET'],
    url: 'https://github.com/AzulMontalvo/dictionary-app.git',
    linkLabel: 'Ver repositorio',
    image: local('webdev/verbo-culto', 1337, 596, 'Captura de Verbo Culto, buscador de palabras y definiciones'),
    inDevelopment: true,
  },
];
