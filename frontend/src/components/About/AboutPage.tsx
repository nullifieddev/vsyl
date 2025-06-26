// AboutPage: SSG, Sanity data, portrait, story, values, a11y, design philosophy
import { fetchSanity } from '@/lib/sanity';
import styles from './AboutPage.module.css';
import { HorizontalLine } from '@/components/HorizontalLine/HorizontalLine';
import Image from 'next/image';

export interface AboutPageProps {
  params: { locale: 'es' | 'en' };
}

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = params;
  // Fetch about content from Sanity
  const about = await fetchSanity<any>(`*[_type == "about" && locale == "${locale}"][0]{ title, body, portrait { asset->{url}, alt }, values[] }`);
  if (!about) return null;

  return (
    <main className={styles.aboutMain} aria-labelledby="about-heading">
      <section className={styles.heroSection}>
        <div className={styles.textCol}>
          <h1 id="about-heading" className={styles.heading}>{about.title}</h1>
          <HorizontalLine className={styles.horizon} />
          <div className={styles.body}>{about.body}</div>
        </div>
        {about.portrait?.asset?.url && (
          <div className={styles.portraitWrap}>
            <Image
              src={about.portrait.asset.url}
              alt={about.portrait.alt || about.title}
              width={420}
              height={540}
              className={styles.portrait}
              priority
            />
          </div>
        )}
      </section>
      {about.values?.length > 0 && (
        <section className={styles.valuesSection} aria-label={locale === 'es' ? 'Valores' : 'Values'}>
          <h2 className={styles.valuesHeading}>{locale === 'es' ? 'Valores' : 'Values'}</h2>
          <ul className={styles.valuesList}>
            {about.values.map((val: string, i: number) => (
              <li key={i} className={styles.valueItem}>{val}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
