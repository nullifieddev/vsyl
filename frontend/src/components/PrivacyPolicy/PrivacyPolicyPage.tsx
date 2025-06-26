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
  // Fetch privacy policy content from Sanity
  const policy = await fetchSanity<any>(`*[_type == "privacyPolicy" && locale == "${locale}"][0]{ title, body }`);
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
