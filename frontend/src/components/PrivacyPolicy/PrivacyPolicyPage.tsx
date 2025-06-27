// PrivacyPolicyPage: SSG, Sanity data, a11y, design philosophy
import { fetchSanityData } from '@/lib/sanity.fetch';
import styles from './PrivacyPolicyPage.module.css';

export interface PrivacyPolicyPageProps {
  params: { locale: 'es' | 'en' };
}

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = params;
  // Fetch privacy policy content from Sanity (fetch only fields for the current locale)
  const policy = await fetchSanityData({ type: 'post', locale });
  if (!policy) return null;

  return (
    <main className={styles.policyMain} aria-labelledby="privacy-policy-heading">
      <h1 id="privacy-policy-heading" className={styles.heading}>{policy.title}</h1>
      <section className={styles.bodySection}>
        <div className={styles.body}>{policy.body}</div>
      </section>
    </main>
  );
}
