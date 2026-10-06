import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';

export default function NotFound() {
  return (
    <PageLayout title="404" intro="Esta página no existe.">
      <Link to="/" className="chip" style={{ padding: '10px 18px', fontSize: '1rem' }}>
        Volver al inicio
      </Link>
    </PageLayout>
  );
}
