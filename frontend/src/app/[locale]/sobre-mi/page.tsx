import AboutPage from "@/components/About/AboutPage";
import { fetchSanityData } from "@/lib/sanity.fetch";

interface About {
  title: string;
  body?: string;
  portrait?: { asset?: { url?: string }; alt?: string };
  values?: string[];
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Only render for Spanish locale
  if (locale !== 'es') return null;
  const about = await fetchSanityData({ type: "post", locale }) as About;
  return (
    <>
      <h1 style={{ textAlign: 'center', fontFamily: 'var(--font-lora, Lora, serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>
        Sobre mí
      </h1>
      <AboutPage about={about} locale={locale} />
    </>
  );
}
