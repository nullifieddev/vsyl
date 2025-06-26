// BlogArchivePage: SSG, Sanity data, category filter, pagination, a11y, design philosophy
import { fetchSanity } from '@/lib/sanity';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
import CategoryFilter, { Category } from '@/components/CategoryFilter/CategoryFilter';
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

export async function generateStaticParams() {
  // Fetch post count per locale for SSG
  const locales = ['es', 'en'];
  const params: { page: string; locale: string }[] = [];
  for (const locale of locales) {
    const count = await fetchSanity<number>(`count(*[_type == "post" && locale == "${locale}" && publishingControls.published == true])`);
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

export default async function BlogArchivePage({ params, searchParams }: BlogArchivePageProps) {
  const { page, locale } = params;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const category = searchParams?.category || null;

  // Fetch categories
  const categories: Category[] = await fetchSanity<Category[]>(`*[_type == "category"]{ _id as id, title, color }`);

  // Build GROQ for posts
  let postQuery = `*[_type == "post" && locale == "${locale}" && publishingControls.published == true`;
  if (category) postQuery += ` && references(*[_type == 'category' && _id == "${category}"]._id)`;
  postQuery += `] | order(publishedAt desc) [${(currentPage - 1) * PAGE_SIZE}...${currentPage * PAGE_SIZE}]{
    title, slug, excerpt, featureImage, categories[]->{title, color}, author, publishedAt, locale
  }`;
  const posts = await fetchSanity<any[]>(postQuery);

  // Count total posts for pagination
  let countQuery = `count(*[_type == "post" && locale == "${locale}" && publishingControls.published == true`;
  if (category) countQuery += ` && references(*[_type == 'category' && _id == "${category}"]._id)`;
  countQuery += '])';
  const totalPosts = await fetchSanity<number>(countQuery);
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));
  if (currentPage > totalPages) notFound();

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
        onSelect={() => {}}
        label={locale === 'es' ? 'Filtrar por categoría' : 'Filter by category'}
      />
      <section className={styles.articlesSection}>
        {posts.length === 0 ? (
          <p className={styles.emptyMsg}>{locale === 'es' ? 'No hay artículos en esta categoría.' : 'No articles in this category.'}</p>
        ) : (
          <ul className={styles.articlesList}>
            {posts.map((post) => (
              <li key={post.slug.current}>
                <ArticleCard
                  slug={post.slug.current}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.categories[0]}
                  author={post.author}
                  date={post.publishedAt}
                  imageUrl={post.featureImage?.asset?.url}
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
