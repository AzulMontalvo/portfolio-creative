import PageLayout from '../components/PageLayout.jsx';
import LazyImage from '../components/LazyImage.jsx';
import { webProjects } from '../data/content.js';
import './WebDev.css';

const DEFAULT_STATUS_NOTE =
  'Proyecto en desarrollo. Por ahora solo está disponible el repositorio.';

export default function WebDev() {
  return (
    <PageLayout
      title="Desarrollo Web"
      intro="Sitios y aplicaciones rápidas, accesibles y bien construidas."
      accent="var(--yellow)"
    >
      <ul className="web-grid">
        {webProjects.map((p) => (
          <li key={p.id} className={`web-card card ${p.inDevelopment ? 'is-in-dev' : ''}`}>
            {/* Solo si el proyecto sigue en desarrollo: ícono con leyenda al
                pasar el cursor (o al tocarlo / enfocarlo con el teclado) */}
            {p.inDevelopment && (
              <span
                className="web-card__status"
                tabIndex={0}
                aria-label="En desarrollo"
                aria-describedby={`status-${p.id}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3.6 17.4a1.4 1.4 0 0 0 2 2l5.7-5.7a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z" />
                </svg>
                <span className="web-card__tooltip" role="tooltip" id={`status-${p.id}`}>
                  <strong>En desarrollo</strong>
                  {p.statusNote || DEFAULT_STATUS_NOTE}
                </span>
              </span>
            )}

            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="web-card__preview"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className="web-card__bar">
                <i />
                <i />
                <i />
              </span>
              <LazyImage image={p.image} sizes="(max-width: 760px) 92vw, 540px" />
            </a>

            <div className="web-card__body">
              <h2 className="web-card__title">{p.title}</h2>
              <p className="web-card__desc">{p.description}</p>

              <ul className="web-card__stack" aria-label="Stack utilizado">
                {p.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="web-card__link"
              >
                {p.linkLabel}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
