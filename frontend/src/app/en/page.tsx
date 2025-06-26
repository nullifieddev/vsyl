import type { Metadata } from 'next';
import styles from '../page.module.css';
import SampleButton from '../../components/SampleButton';

export const metadata: Metadata = {
  title: 'Edurne Ferrero | The Unapologetic Sanctuary',
  description: 'Welcome to Edurne Ferrero’s digital sanctuary. Mind coaching, blog, and resources for your inner balance.'
};

export default function HomeEn() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome to the Unapologetic Sanctuary</h1>
        <p>Explore articles, resources, and reflections for your inner journey.</p>
        <SampleButton label="Discover more" />
      </main>
    </div>
  );
}
