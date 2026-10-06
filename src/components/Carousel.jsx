import { useCallback, useEffect, useRef, useState } from 'react';
import LazyImage from './LazyImage.jsx';
import './Carousel.css';

/**
 * Carrusel de imágenes con flechas, indicadores, teclado y gestos táctiles.
 * Para no descargar todo de golpe, solo monta la imagen actual y sus vecinas;
 * el resto se carga cuando el usuario se acerca a ellas.
 */
export default function Carousel({
  images,
  sizes = '100vw',
  priority = false,
  autoplay = 0,
  label = 'Galería',
  fit = 'cover',
  className = '',
}) {
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0, 1, images.length - 1]));
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const total = images.length;

  const go = useCallback(
    (next) => {
      const i = (next + total) % total;
      setIndex(i);
      setVisited((prev) => {
        const s = new Set(prev);
        s.add(i);
        s.add((i + 1) % total);
        s.add((i - 1 + total) % total);
        return s;
      });
    },
    [total],
  );

  useEffect(() => {
    if (!autoplay || paused || total < 2) return undefined;
    const id = setInterval(() => go(index + 1), autoplay);
    return () => clearInterval(id);
  }, [autoplay, paused, index, go, total]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  };

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section
      className={`carousel ${className}`}
      aria-roledescription="carrusel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((img, i) => (
          <div
            className="carousel__slide"
            key={img.src}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${total}`}
            aria-hidden={i !== index}
          >
            {visited.has(i) ? (
              <LazyImage
                image={img}
                sizes={sizes}
                priority={priority && i === 0}
                // Solo se montan la actual y sus vecinas: se descargan ya para
                // que al avanzar la imagen esté lista.
                eager
                fit={fit}
                className="carousel__img"
              />
            ) : (
              <div className="carousel__img lazy-img" />
            )}
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--prev"
            onClick={() => go(index - 1)}
            aria-label="Imagen anterior"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--next"
            onClick={() => go(index + 1)}
            aria-label="Imagen siguiente"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="carousel__dots">
            {images.map((img, i) => (
              <button
                type="button"
                key={img.src}
                className={`carousel__dot ${i === index ? 'is-active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
