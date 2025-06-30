import PrivacyPolicyContent from '@/components/PrivacyPolicy/PrivacyPolicyContent';

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: '#F8F6F2', minHeight: '100vh', padding: '4rem 0 6rem 0' }}>
      <PrivacyPolicyContent locale="es" />
    </main>
  );
}
