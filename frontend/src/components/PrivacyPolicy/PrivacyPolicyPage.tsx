// PrivacyPolicyPage: SSG, Sanity data, a11y, design philosophy
import { fetchSanity } from '@/lib/sanity';
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
  const policy = await fetchSanity<any>(
    `*[_type == "privacyPolicy" && locale == "${locale}"][0]{
      title: select(locale == 'es' => title_es, title_en),
      body: select(locale == 'es' => body_es, body_en)
    }`
  );
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
