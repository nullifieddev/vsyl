import styles from './ArticleCard.module.css';
import Link from 'next/link';
import Image from 'next/image';

export interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: { title: string; color?: string };
  author: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  locale?: 'es' | 'en';
}

export default function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  author,
  date,
  imageUrl,
  imageAlt,
  locale = 'es',
}: ArticleCardProps) {
  const href = `/${locale}/blog/${slug}`;
  return (
    <article className={styles.card}>
      <Link href={href} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={420}
          height={260}
          className={styles.image}
          priority={false}
        />
      </Link>
      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.category} style={{ color: category.color || 'var(--color-accent, #C86A43)' }}>{category.title}</span>
          <span className={styles.dot} aria-hidden="true">•</span>
          <span className={styles.author}>{author}</span>
          <span className={styles.dot} aria-hidden="true">•</span>
          <span className={styles.date}>{date}</span>
        </div>
        <h2 className={styles.title}>
          <Link href={href}>{title}</Link>
        </h2>
        <p className={styles.excerpt}>{excerpt}</p>
        <Link href={href} className={styles.readMore} aria-label={`Leer más sobre ${title}`}>
          {locale === 'en' ? 'Read more' : 'Leer más'}
        </Link>
      </div>
    </article>
  );
}
