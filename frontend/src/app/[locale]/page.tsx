import Image from 'next/image';
import SampleButton from '@/components/SampleButton';
import styles from './Home.module.css';

export default async function LocaleRootPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroText}>
          <h1>
            {locale === 'es' ? 'Vive Salvaje y Libre' : 'Live Wild and Free'}
          </h1>
          <p className={styles.subtitle}>
            {locale === 'es' ? 'Mind Coach & Guía Intuitiva' : 'Mind Coach & Intuitive Guide'}
          </p>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="https://images.unsplash.com/photo-1542848149-158ab7aa48a1?q=80&w=2070&auto=format&fit=crop"
            alt="Edurne Ferrero, golden hour portrait"
            width={900}
            height={1200}
            style={{ width: '100%', height: 'auto', borderRadius: '18px', objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
