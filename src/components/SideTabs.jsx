import { NavLink } from 'react-router-dom';
import './SideTabs.css';

export const sections = [
  { to: '/branding', label: 'Branding' },
  { to: '/diseno', label: 'Diseño' },
  { to: '/desarrollo-web', label: 'Desarrollo Web' },
];

/** Pestañas verticales (texto girado) que enlazan a cada sección. */
export default function SideTabs({ className = '' }) {
  return (
    <nav className={`side-tabs ${className}`} aria-label="Secciones">
      <ul>
        {sections.map((s) => (
          <li key={s.to}>
            <NavLink
              to={s.to}
              className={({ isActive }) => `side-tabs__link ${isActive ? 'is-active' : ''}`}
            >
              {s.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
