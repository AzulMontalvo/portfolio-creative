import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout.jsx';
import Carousel from '../components/Carousel.jsx';
import LazyImage from '../components/LazyImage.jsx';
import { designCarousel, designProjects } from '../data/content.js';
import './Design.css';

export default function Design() {
  const [zoomed, setZoomed] = useState(null);

  useEffect(() => {
    if (!zoomed) return undefined;
    const onKey = (e) => e.key === 'Escape' && setZoomed(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [zoomed]);

  return (
    <PageLayout
      title="Diseño"
      intro="Pósters, editorial, redes sociales e ilustración."
      accent="var(--teal)"
    >
      <Carousel
        images={designCarousel}
        sizes="(max-width: 760px) 92vw, 1100px"
        priority
        autoplay={6000}
        label="Diseños destacados"
        fit="contain"
        className="design__hero"
      />

      {/* Tarjetas solo con imagen (sin texto visible) */}
      <ul className="design__grid">
        {designProjects.map((img) => (
          <li key={img.src} className="design__item">
            <button
              type="button"
              className="design__card card"
              onClick={() => setZoomed(img)}
              aria-label={`Ampliar: ${img.alt}`}
            >
              <LazyImage
                image={img}
                sizes="(max-width: 560px) 92vw, (max-width: 1000px) 45vw, 340px"
              />
            </button>

            {/* Solo si la imagen pertenece a una colección: ícono que se
                expande al pasar el cursor y lleva a la colección completa */}
            {img.collection && (
              <a
                href={img.collection}
                target="_blank"
                rel="noopener noreferrer"
                className="design__collection"
                aria-label={`Ver colección completa: ${img.alt}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="8" y="8" width="12" height="12" rx="2.5" />
                  <path d="M16 4H6.5A2.5 2.5 0 0 0 4 6.5V16" />
                </svg>
                <span className="design__collection-label">Ver colección completa</span>
              </a>
            )}
          </li>
        ))}
      </ul>

      {zoomed && (
        <div
          className="design__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.alt}
          onClick={() => setZoomed(null)}
        >
          <LazyImage
            image={zoomed}
            sizes="90vw"
            priority
            fit="contain"
            className="design__lightbox-img"
            style={{
              width: `min(1100px, 100%, calc((100vh - 48px) * ${zoomed.width / zoomed.height}))`,
            }}
          />
          <button type="button" className="design__lightbox-close" aria-label="Cerrar">
            ✕
          </button>
        </div>
      )}
    </PageLayout>
  );
}
