import { useEffect, useRef, useState } from 'react';
import './LazyImage.css';

/**
 * Imagen optimizada con loader (skeleton) mientras carga.
 *  - loading="lazy" + decoding="async": no bloquea la carga inicial.
 *  - priority: para imágenes visibles al abrir la página (eager + fetchpriority alta).
 *  - eager: descarga inmediata sin prioridad alta (p. ej. diapositivas vecinas).
 *  - srcSet/sizes: el navegador descarga solo la resolución necesaria.
 *  - width/height: reserva el espacio y evita saltos de diseño.
 */
export default function LazyImage({
  image,
  sizes = '100vw',
  priority = false,
  eager = false,
  fit = 'cover',
  position = 'center',
  className = '',
  imgClassName = '',
  style,
  alt,
}) {
  const [status, setStatus] = useState('loading');
  const imgRef = useRef(null);

  // Si la imagen ya está en caché, onLoad puede no dispararse tras la hidratación.
  useEffect(() => {
    setStatus('loading');
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setStatus('loaded');
  }, [image?.src]);

  if (!image) return null;

  return (
    <div
      className={`lazy-img lazy-img--${status} ${className}`}
      style={{ aspectRatio: `${image.width} / ${image.height}`, ...style }}
    >
      {status !== 'loaded' && (
        <span className="lazy-img__skeleton" aria-hidden="true">
          {status === 'error' && <span className="lazy-img__error">Imagen no disponible</span>}
        </span>
      )}
      <img
        ref={imgRef}
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.srcSet ? sizes : undefined}
        width={image.width}
        height={image.height}
        alt={alt ?? image.alt ?? ''}
        loading={priority || eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : 'auto'}
        draggable="false"
        className={imgClassName}
        style={{ objectFit: fit, objectPosition: position }}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
}
