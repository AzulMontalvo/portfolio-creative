import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import LazyImage from './LazyImage.jsx';
import './ProjectModal.css';

/**
 * Modal centrado que "crece" desde la tarjeta de origen (animación FLIP).
 * Se cierra con el botón ✕, al hacer clic fuera o con Escape, y bloquea el
 * scroll de la página mientras está abierto.
 */
export default function ProjectModal({ project, originRect, onClose }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [hasMore, setHasMore] = useState(false);
  const closing = useRef(false);

  // ¿Queda contenido por debajo? Se recalcula al hacer scroll y cuando cambia
  // el tamaño del panel o de su contenido (p. ej. al cargar la imagen).
  useEffect(() => {
    const panel = panelRef.current;
    const update = () =>
      setHasMore(panel.scrollHeight - panel.scrollTop - panel.clientHeight > 8);
    update();
    panel.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const ro = new ResizeObserver(update);
    ro.observe(panel);
    [...panel.children].forEach((child) => ro.observe(child));
    return () => {
      panel.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      ro.disconnect();
    };
  }, []);

  const scrollMore = () => {
    const panel = panelRef.current;
    panel.scrollBy({ top: panel.clientHeight * 0.6, behavior: 'smooth' });
  };

  // El panel se centra con CSS (también al girar el celular o cambiar el tamaño
  // de la ventana). Aquí solo se anima desde el rectángulo de la tarjeta.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    // Cancelar animaciones previas para medir la posición final real.
    panel.getAnimations?.().forEach((a) => a.cancel());
    const { left, top, width: w, height: h } = panel.getBoundingClientRect();

    if (originRect && panel.animate) {
      const dx = originRect.left - left;
      const dy = originRect.top - top;
      const sx = originRect.width / w;
      const sy = originRect.height / h;
      panel.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 0.6 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      );
    }
  }, [originRect]);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    const panel = panelRef.current;
    if (panel?.animate) {
      const anim = panel.animate(
        [
          { transform: 'none', opacity: 1 },
          { transform: 'scale(0.94)', opacity: 0 },
        ],
        { duration: 180, easing: 'ease-in', fill: 'forwards' },
      );
      anim.onfinish = onClose;
    } else {
      onClose();
    }
  };

  // Escape para cerrar, bloqueo de scroll y foco en el botón de cerrar.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className="pmodal" onClick={close}>
      <article
        ref={panelRef}
        className="pmodal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`pm-${project.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="pmodal__close"
          onClick={close}
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <LazyImage
          image={project.cover}
          sizes="(max-width: 760px) 92vw, 420px"
          priority
          // En el modal la portada se ve completa, sobre su color de fondo
          fit="contain"
          style={{ background: project.coverBg || '#f3f4f9' }}
          className="pmodal__img"
        />

        <div className="pmodal__body">
          <p className="pmodal__meta">
            <span className="chip">{project.category}</span>
            <span>{project.year}</span>
          </p>
          <h2 id={`pm-${project.id}`} className="pmodal__title">
            {project.title}
          </h2>
          <p className="pmodal__client">Cliente: {project.client}</p>
          <p className="pmodal__desc">{project.description}</p>

          <h3 className="pmodal__subtitle">Entregables</h3>
          <ul className="pmodal__tags">
            {project.deliverables.map((d) => (
              <li key={d} className="chip chip--outline">
                {d}
              </li>
            ))}
          </ul>

          {project.colors?.length > 0 && (
            <>
              <h3 className="pmodal__subtitle">Paleta</h3>
              <ul className="pmodal__palette">
                {project.colors.map((c) => (
                  <li key={c} style={{ background: c }} title={c}>
                    <span className="sr-only">{c}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Solo si el proyecto tiene link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pmodal__link"
            >
              {project.linkLabel || 'Ver proyecto'}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          )}
        </div>

        {/* Indicador de "hay más contenido": fijo al fondo del panel mientras
            quede algo por ver; al llegar al final desaparece */}
        <div className={`pmodal__more ${hasMore ? 'is-visible' : ''}`} aria-hidden={!hasMore}>
          <span className="pmodal__more-fade" />
          <button
            type="button"
            className="pmodal__more-btn"
            onClick={scrollMore}
            tabIndex={hasMore ? 0 : -1}
            aria-label="Desplazarse para ver más contenido"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </article>
    </div>,
    document.body,
  );
}
