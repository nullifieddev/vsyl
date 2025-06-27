import SampleButton from '@/components/SampleButton';

export default async function LocaleRootPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // You can customize this content as needed for your home page
  return (
    <div style={{ padding: '4rem 2vw', minHeight: '60vh' }}>
      <h1 style={{ textAlign: 'center', fontFamily: 'var(--font-lora, Lora, serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>
        {locale === 'es' ? 'Inicio' : 'Home'}
      </h1>
      <h2 style={{ fontFamily: 'var(--font-lora, Lora, serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>
        {locale === 'es' ? 'Bienvenida al Santuario Inquebrantable' : 'Welcome to the Unapologetic Sanctuary'}
      </h2>
      <p style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '1.2rem', marginBottom: '2rem' }}>
        {locale === 'es'
          ? 'Explora artículos, recursos y reflexiones para tu viaje interior.'
          : 'Explore articles, resources, and reflections for your inner journey.'}
      </p>
      <SampleButton label={locale === 'es' ? 'Descubrir más' : 'Discover more'} />
    </div>
  );
}
