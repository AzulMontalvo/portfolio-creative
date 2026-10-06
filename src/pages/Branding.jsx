import { useState } from 'react';
import PageLayout from '../components/PageLayout.jsx';
import LazyImage from '../components/LazyImage.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import { brandingProjects } from '../data/content.js';
import './Branding.css';

export default function Branding() {
  const [active, setActive] = useState(null); // { project, rect }

  // El modal se abre solo al hacer clic (o con Enter/Espacio desde el teclado).
  const open = (project, el) => {
    setActive({ project, rect: el.getBoundingClientRect() });
  };

  return (
    <PageLayout
      title="Branding"
      intro="Identidades de marca y logotipos. Haz clic en una tarjeta para ver el proyecto completo."
    >
      <ul className="brand-grid">
        {brandingProjects.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className={`brand-card card ${active?.project.id === p.id ? 'is-open' : ''}`}
              onClick={(e) => open(p, e.currentTarget)}
              aria-haspopup="dialog"
            >
              <LazyImage
                image={p.cover}
                sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 340px"
                fit={p.coverFit}
                style={p.coverBg ? { background: p.coverBg } : undefined}
                className="brand-card__img"
              />
              <span className="brand-card__body">
                <span className="brand-card__meta">
                  <span className="chip">{p.category}</span>
                  <span>{p.year}</span>
                </span>
                <span className="brand-card__title">{p.title}</span>
                <span className="brand-card__summary">{p.summary}</span>
                <span className="brand-card__palette" aria-hidden="true">
                  {p.colors.map((c) => (
                    <span key={c} style={{ background: c }} />
                  ))}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <ProjectModal
          key={active.project.id}
          project={active.project}
          originRect={active.rect}
          onClose={() => setActive(null)}
        />
      )}
    </PageLayout>
  );
}
