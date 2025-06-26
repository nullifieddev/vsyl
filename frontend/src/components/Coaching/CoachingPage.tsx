// CoachingPage: SSG, Sanity data, coaching philosophy, offer, portrait, a11y, design philosophy
import { fetchSanity } from '@/lib/sanity';
import styles from './CoachingPage.module.css';
import { HorizontalLine } from '@/components/HorizontalLine/HorizontalLine';
import Image from 'next/image';

export interface CoachingPageProps {
  params: { locale: 'es' | 'en' };
}

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default async function CoachingPage({ params }: CoachingPageProps) {
  const { locale } = params;
  // Fetch coaching content from Sanity
  const coaching = await fetchSanity<any>(`*[_type == "coaching" && locale == "${locale}"][0]{ title, intro, offer, portrait { asset->{url}, alt } }`);
  if (!coaching) return null;

  return (
    <main className={styles.coachingMain} aria-labelledby="coaching-heading">
      <section className={styles.heroSection}>
        <div className={styles.textCol}>
          <h1 id="coaching-heading" className={styles.heading}>{coaching.title}</h1>
          <HorizontalLine className={styles.horizon} />
          <div className={styles.intro}>{coaching.intro}</div>
        </div>
        {coaching.portrait?.asset?.url && (
          <div className={styles.portraitWrap}>
            <Image
              src={coaching.portrait.asset.url}
              alt={coaching.portrait.alt || coaching.title}
              width={420}
              height={540}
              className={styles.portrait}
              priority
            />
          </div>
        )}
      </section>
      {coaching.offer && (
        <section className={styles.offerSection} aria-label={locale === 'es' ? 'Oferta de coaching' : 'Coaching Offer'}>
          <h2 className={styles.offerHeading}>{locale === 'es' ? 'Oferta de coaching' : 'Coaching Offer'}</h2>
          <div className={styles.offerBody}>{coaching.offer}</div>
        </section>
      )}
    </main>
  );
}
