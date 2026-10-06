import { Link } from 'react-router-dom';
import SideTabs from '../components/SideTabs.jsx';
import CvButton from '../components/CvButton.jsx';
import Carousel from '../components/Carousel.jsx';
import LazyImage from '../components/LazyImage.jsx';
import {
  profile,
  availability,
  locationText,
  technologies,
  homeCarousel,
  sphereImage,
} from '../data/content.js';
import './Home.css';

export default function Home() {
  return (
    <div className="frame home">
      {/* ───── Tarjeta principal (morada) ───── */}
      <section className="home__profile card" aria-label="Sobre mí">
        <Link to="/" className="home__about">
          <span aria-hidden="true">◈</span> Sobre mí
        </Link>

        <SideTabs className="home__tabs" />
        <SideTabs className="home__tabs-mobile side-tabs--horizontal" />

        {/* Círculo rosa + retrato recortado solo por abajo: la cabeza sobresale */}
        <div className="home__photo-wrap">
          <span className="home__photo-circle" aria-hidden="true">
            <span className="home__photo-disc" />
            <span className="home__photo-ring" />
          </span>
          <div className="home__photo-clip">
            <LazyImage
              image={profile.photo}
              sizes="(max-width: 760px) 70vw, 280px"
              priority
              fit="contain"
              position="bottom"
              className="home__photo"
            />
          </div>
        </div>

        <h1 className="home__name">
          <span className="home__greeting">{profile.greeting}</span>
          <span>{profile.firstName}</span>
          <span>{profile.lastName}</span>
        </h1>

        <div className="home__profile-footer">
          <a href={`mailto:${profile.email}`} className="home__email">
            {profile.email}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </a>
          <CvButton size={96} />
        </div>
      </section>

      {/* ───── Título ───── */}
      <header className="home__title">
        <p className="big-title" aria-hidden="true">
          Portafolio
        </p>
        <p className="home__role">{profile.role}</p>
      </header>

      {/* ───── Carrusel ───── */}
      <Carousel
        images={homeCarousel}
        sizes="(max-width: 760px) 92vw, 560px"
        priority
        autoplay={5000}
        label="Trabajos destacados"
        className="home__carousel"
      />

      {/* ───── Disponibilidad + ubicación ───── */}
      <div className="home__stats">
        <div
          className={`home__stat home__stat--teal card corner ${
            availability.available ? 'is-available' : 'is-unavailable'
          }`}
        >
          <span className="home__status-dot" aria-hidden="true" />
          <span className="home__stat-text">
            {availability.available ? availability.availableText : availability.unavailableText}
          </span>
        </div>
        <div className="home__stat home__stat--violet card corner">
          <span className="home__stat-text">{locationText}</span>
        </div>
      </div>

      {/* ───── Contacto (gris) ───── */}
      <a href={`mailto:${profile.email}`} className="home__contact card corner">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12h14m0 0l-6-6m6 6l-6 6" />
        </svg>
        <span>Trabajemos juntos</span>
      </a>

      {/* ───── Tecnologías (negra + amarilla) ───── */}
      <section className="home__tech card" aria-labelledby="tech-title">
        <LazyImage
          image={sphereImage}
          sizes="(max-width: 760px) 84px, 240px"
          position="center 70%"
          className="home__sphere"
        />
        <div className="home__tech-card corner">
          <h2 id="tech-title">
            Tecnologías
          </h2>
          <ul className="home__tech-list">
            {technologies.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
