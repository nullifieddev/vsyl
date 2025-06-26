import type { Metadata } from 'next';
import styles from '../page.module.css';
import SampleButton from '../../components/SampleButton';

export const metadata: Metadata = {
  title: 'Edurne Ferrero | Santuario Inquebrantable',
  description: 'Bienvenida al santuario digital de Edurne Ferrero. Coaching de mente, blog, y recursos para tu equilibrio interior.'
};

export default function HomeEs() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Bienvenida al Santuario Inquebrantable</h1>
        <p>Explora artículos, recursos y reflexiones para tu viaje interior.</p>
        <SampleButton label="Descubre más" />
      </main>
    </div>
  );
}
