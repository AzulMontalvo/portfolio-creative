import { Link } from 'react-router-dom';
import SideTabs from './SideTabs.jsx';
import CvButton from './CvButton.jsx';
import LazyImage from './LazyImage.jsx';
import { profile } from '../data/content.js';
import './PageLayout.css';

/**
 * Plantilla para las páginas internas: mantiene el riel morado con las
 * pestañas verticales y el gran título con la esquina ⌝ de la portada.
 */
export default function PageLayout({ title, intro, accent = 'var(--violet)', children }) {
  return (
    <div className="frame page">
      <aside className="page__rail card">
        <Link to="/" className="page__home" aria-label="Volver al inicio">
          <LazyImage
            image={profile.photo}
            sizes="56px"
            priority
            fit="contain"
            className="page__avatar"
          />
        </Link>
        <SideTabs className="page__tabs" />
        <SideTabs className="page__tabs-mobile side-tabs--horizontal" />
        <CvButton size={74} className="page__cv" />
      </aside>

      <main className="page__main">
        <header className="page__header">
          <Link to="/" className="page__back">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            Inicio
          </Link>
          <h1 className="big-title page__title">{title}</h1>
          {intro && (
            <p className="page__intro">
              <span className="page__intro-dot" style={{ background: accent }} />
              {intro}
            </p>
          )}
        </header>
        {children}
      </main>
    </div>
  );
}
