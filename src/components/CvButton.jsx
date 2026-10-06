import { useId } from 'react';
import { profile } from '../data/content.js';
import './CvButton.css';

/** Botón circular negro con texto giratorio que descarga el CV. */
export default function CvButton({ size = 104, className = '' }) {
  const text = 'DESCARGAR CV • DESCARGAR CV • ';
  const pathId = `cv-circle-${useId().replace(/:/g, '')}`;
  return (
    <a
      href={profile.cvUrl}
      download={profile.cvFileName}
      className={`cv-btn ${className}`}
      style={{ '--size': `${size}px` }}
      aria-label="Descargar CV en PDF"
    >
      <svg className="cv-btn__ring" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <path id={pathId} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text>
          <textPath href={`#${pathId}`}textLength="230">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="cv-btn__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" />
        </svg>
      </span>
    </a>
  );
}
