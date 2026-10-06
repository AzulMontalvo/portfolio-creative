import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PageLoader from './components/PageLoader.jsx';
import Home from './pages/Home.jsx';

// Cada sección se descarga solo cuando se visita (code splitting).
const Branding = lazy(() => import('./pages/Branding.jsx'));
const Design = lazy(() => import('./pages/Design.jsx'));
const WebDev = lazy(() => import('./pages/WebDev.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/branding" element={<Branding />} />
          <Route path="/diseno" element={<Design />} />
          <Route path="/desarrollo-web" element={<WebDev />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
