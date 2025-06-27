// BlogArchivePage: SSG, Sanity data, category filter, pagination, a11y, design philosophy
import { fetchSanityData } from '@/lib/sanity.fetch';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter';
import styles from './BlogArchivePage.module.css';
import { HorizontalLine } from '@/components/HorizontalLine/HorizontalLine';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

const PAGE_SIZE = 6;

export interface BlogArchivePageProps {
  params: { page: string; locale: 'es' | 'en' };
  searchParams?: { category?: string };
}

// Add a type for posts
interface BlogPost {
  title: string;
  slug: { current: string };
  excerpt?: string;
  featureImage?: { asset?: { url?: string }; alt?: string };
  categories: { _id: string; title: string; color?: string }[];
  author?: string;
  publishedAt?: string;
  locale: string;
}

// Map backend category to UI Category type
function mapToUICategory(cat: { _id: string; title?: string; color?: string }): import('../CategoryFilter/CategoryFilter').Category {
  return {
    id: cat._id,
    title: cat.title || '',
    color: cat.color,
  };
}

export async function generateStaticParams() {
  // Fetch post count per locale for SSG
  const locales = ['es', 'en'];
  const params: { page: string; locale: string }[] = [];
  for (const locale of locales) {
    const posts = await fetchSanityData({ type: 'post', locale, all: true });
    const count = posts.length;
    const totalPages = Math.ceil(count / PAGE_SIZE);
    for (let i = 1; i <= totalPages; i++) {
      params.push({ page: String(i), locale });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { page: string; locale: 'es' | 'en' } }): Promise<Metadata> {
  return {
    title: params.locale === 'es' ? `Archivo del Blog · Página ${params.page}` : `Blog Archive · Page ${params.page}`,
    description: params.locale === 'es' ? 'Explora todos los artículos del blog de Edurne Ferrero.' : 'Browse all blog articles by Edurne Ferrero.'
  };
}

export default async function BlogArchivePage({ params, searchParams }: BlogArchivePageProps & { searchParams?: Promise<{ category?: string }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const { page, locale } = params;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const category = resolvedSearchParams.category || null;

  // Fetch categories (fetch only the title for the current locale)
  const categoriesRaw = await fetchSanityData({ type: 'category' }) as { _id: string; title?: string; color?: string }[];
  const categories = categoriesRaw.map(mapToUICategory);

  // Fetch posts for the current locale
  const posts = await fetchSanityData({ type: 'post', locale, all: true }) as BlogPost[];

  // Filter posts by category if needed
  const filteredPosts = category
    ? posts.filter((post: BlogPost) => post.categories && post.categories.some((cat) => cat._id === category))
    : posts;

  // Paginate
  const totalPosts = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));
  if (currentPage > totalPages) notFound();
  const paginatedPosts: BlogPost[] = filteredPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // a11y: main landmark, nav for pagination, nav for categories
  return (
    <main className={styles.archiveMain} aria-labelledby="blog-archive-heading">
      <h1 id="blog-archive-heading" className={styles.heading}>
        {locale === 'es' ? 'Archivo del Blog' : 'Blog Archive'}
      </h1>
      <HorizontalLine className={styles.horizon} />
      <CategoryFilter
        categories={categories}
        selected={category}
        label={locale === 'es' ? 'Filtrar por categoría' : 'Filter by category'}
      />
      <section className={styles.articlesSection}>
        {paginatedPosts.length === 0 ? (
          <p className={styles.emptyMsg}>{locale === 'es' ? 'No hay artículos en esta categoría.' : 'No articles in this category.'}</p>
        ) : (
          <ul className={styles.articlesList}>
            {paginatedPosts.map((post: BlogPost) => (
              <li key={post.slug.current}>
                <ArticleCard
                  slug={post.slug.current}
                  title={post.title}
                  excerpt={post.excerpt || ''}
                  category={mapToUICategory(post.categories[0])}
                  author={post.author || ''}
                  date={post.publishedAt || ''}
                  imageUrl={post.featureImage?.asset?.url || ''}
                  imageAlt={post.featureImage?.alt || post.title}
                  locale={locale}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
      <nav className={styles.paginationNav} aria-label={locale === 'es' ? 'Paginación del blog' : 'Blog pagination'}>
        <ul className={styles.paginationList}>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1}>
              <Link
                href={`/${locale}/blog/page/${i + 1}${category ? `?category=${category}` : ''}`}
                aria-current={currentPage === i + 1 ? 'page' : undefined}
                className={currentPage === i + 1 ? styles.activePage : ''}
              >
                {i + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
