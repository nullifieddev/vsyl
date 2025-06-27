import BlogArchivePage from '@/components/BlogArchive/BlogArchivePage';

export default async function LocaleBlogPage({ params, searchParams }: { params: Promise<{ locale: string }>, searchParams?: Promise<{ category?: string }> }) {
  const { locale } = await params;
  return (
    <>
      <h1 style={{ textAlign: 'center', fontFamily: 'var(--font-lora, Lora, serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>
        Blog
      </h1>
      <BlogArchivePage params={{ page: '1', locale: locale as 'es' | 'en' }} searchParams={searchParams} />
    </>
  );
}
