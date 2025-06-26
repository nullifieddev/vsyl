// BlogPostPage: SSG, Sanity data, feature image, metadata, related articles, a11y, design philosophy
import { fetchSanity } from '@/lib/sanity';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
import styles from './BlogPostPage.module.css';
import { HorizontalLine } from '@/components/HorizontalLine/HorizontalLine';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';

export interface BlogPostPageProps {
  params: { slug: string; locale: 'es' | 'en' };
}

export async function generateStaticParams() {
  // Fetch all published post slugs for SSG
  const locales = ['es', 'en'];
  let params: { slug: string; locale: string }[] = [];
  for (const locale of locales) {
    const posts = await fetchSanity<{ slug: { current: string } }[]>(`*[_type == "post" && locale == "${locale}" && publishingControls.published == true]{ slug }`);
    params = params.concat(posts.map((p) => ({ slug: p.slug.current, locale })));
  }
  return params;
}

export async function generateMetadata({ params }: { params: { slug: string; locale: 'es' | 'en' } }): Promise<Metadata> {
  const post = await fetchSanity<any>(`*[_type == "post" && slug.current == "${params.slug}" && locale == "${params.locale}" && publishingControls.published == true][0]{ title, excerpt, featureImage }`);
  return {
    title: post?.title || '',
    description: post?.excerpt || '',
    openGraph: post?.featureImage?.asset?.url ? { images: [{ url: post.featureImage.asset.url }] } : undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = params;
  // Fetch post
  const post = await fetchSanity<any>(`*[_type == "post" && slug.current == "${slug}" && locale == "${locale}" && publishingControls.published == true][0]{
    title, excerpt, body, featureImage, categories[]->{_id, title, color}, author, publishedAt, locale
  }`);
  if (!post) notFound();

  // Fetch related articles (same category, exclude current)
  const related = post.categories?.length
    ? await fetchSanity<any[]>(`*[_type == "post" && locale == "${locale}" && publishingControls.published == true && references("${post.categories[0]._id}") && slug.current != "${slug}"] | order(publishedAt desc)[0...3]{ title, slug, excerpt, featureImage, categories[]->{title, color}, author, publishedAt, locale }`)
    : [];

  return (
    <main className={styles.postMain} aria-labelledby="blog-post-heading">
      <article className={styles.postArticle}>
        <header className={styles.header}>
          <h1 id="blog-post-heading" className={styles.heading}>{post.title}</h1>
          <HorizontalLine className={styles.horizon} />
          <div className={styles.meta}>
            <span>{post.author}</span>
            <span>·</span>
            <span>{new Date(post.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {post.categories?.[0] && (
              <span className={styles.category} style={{ borderColor: post.categories[0].color || 'var(--color-accent, #C86A43)' }}>{post.categories[0].title}</span>
            )}
          </div>
        </header>
        {post.featureImage?.asset?.url && (
          <div className={styles.featureImageWrap}>
            <Image
              src={post.featureImage.asset.url}
              alt={post.featureImage.alt || post.title}
              width={900}
              height={540}
              className={styles.featureImage}
              priority
            />
          </div>
        )}
        <section className={styles.bodySection}>
          {/* TODO: Render blockContent with portable text renderer */}
          <div className={styles.bodyRaw}>{post.body}</div>
        </section>
      </article>
      {related.length > 0 && (
        <aside className={styles.relatedAside} aria-label={locale === 'es' ? 'Artículos relacionados' : 'Related articles'}>
          <h2 className={styles.relatedHeading}>{locale === 'es' ? 'Artículos relacionados' : 'Related articles'}</h2>
          <ul className={styles.relatedList}>
            {related.map((rel) => (
              <li key={rel.slug.current}>
                <ArticleCard
                  slug={rel.slug.current}
                  title={rel.title}
                  excerpt={rel.excerpt}
                  category={rel.categories[0]}
                  author={rel.author}
                  date={rel.publishedAt}
                  imageUrl={rel.featureImage?.asset?.url}
                  imageAlt={rel.featureImage?.alt || rel.title}
                  locale={locale}
                />
              </li>
            ))}
          </ul>
        </aside>
      )}
    </main>
  );
}
