import CoachingPage from "@/components/Coaching/CoachingPage";
import { fetchSanityData } from "@/lib/sanity.fetch";

interface Coaching {
  title: string;
  intro?: string;
  portrait?: { asset?: { url?: string }; alt?: string };
  offer?: string;
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = await fetchSanityData({ type: "post", locale, all: true }) as Coaching[];
  const coaching = posts && posts.length > 0 ? posts[0] : null;
  return (
    coaching ? (
      <>
        <h1 style={{ textAlign: 'center', fontFamily: 'var(--font-lora, Lora, serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>
          Coaching
        </h1>
        <CoachingPage coaching={coaching} locale={locale as 'es' | 'en'} />
      </>
    ) : null
  );
}
