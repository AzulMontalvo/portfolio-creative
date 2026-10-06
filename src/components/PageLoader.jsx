import './PageLoader.css';

/** Loader que se muestra mientras se descarga el código de una página. */
export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__dot" />
      <span className="page-loader__dot" />
      <span className="page-loader__dot" />
      <span className="sr-only">Cargando…</span>
    </div>
  );
}
