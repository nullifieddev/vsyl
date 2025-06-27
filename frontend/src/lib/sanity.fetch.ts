// src/lib/sanity.fetch.ts
import path from 'path';
import fs from 'fs/promises';
import { fetchSanity } from './sanity';

const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';
// Change mockDir to be relative to the project root (frontend/)
const mockDir = path.resolve(process.cwd(), 'mock-data');

async function readMockJson(filename: string) {
  const filePath = path.join(mockDir, filename);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

// --- Types for posts and categories ---
interface PostCategory {
  _id: string;
  title: string;
  color?: string;
}
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featureImage?: { asset?: { url?: string }; alt?: string };
  categories: PostCategory[];
  author?: string;
  publishedAt?: string;
  locale: string;
  publishingControls?: {
    published: boolean;
    isSpanishPublished?: boolean;
    isEnglishPublished?: boolean;
  };
}
interface Category {
  _id: string;
  title: string;
  color?: string;
}

export async function fetchSanityData({
  type,
  slug,
  locale,
  all = false,
  relatedToCategoryId,
  excludeSlug,
  slugsOnly = false
}: {
  type: 'post' | 'category';
  slug?: string;
  locale?: string;
  all?: boolean;
  relatedToCategoryId?: string;
  excludeSlug?: string;
  slugsOnly?: boolean;
}) {
  if (USE_MOCK_DATA) {
    if (type === 'post') {
      const posts: Post[] = await readMockJson('posts.json');
      if (relatedToCategoryId) {
        // Related posts: same category, exclude current, match locale
        return posts.filter((p: Post) =>
          p.locale === locale &&
          p.categories?.some((c: PostCategory) => c._id === relatedToCategoryId) &&
          p.slug.current !== excludeSlug
        ).slice(0, 3);
      }
      if (slugsOnly) {
        return posts.filter((p: Post) => (!locale || p.locale === locale)).map((p: Post) => ({ slug: p.slug }));
      }
      if (all) {
        return locale ? posts.filter((p: Post) => p.locale === locale) : posts;
      }
      if (slug) {
        return posts.find((p: Post) => p.slug.current === slug && (!locale || p.locale === locale)) || null;
      }
      return null;
    }
    if (type === 'category') {
      const categories: Category[] = await readMockJson('categories.json');
      return categories;
    }
  } else {
    // Live Sanity API
    if (type === 'post') {
      if (relatedToCategoryId) {
        return await fetchSanity(`*[_type == \"post\" && locale == \"${locale}\" && publishingControls.published == true${
          locale === 'es' ? ' && publishingControls.isSpanishPublished == true' : ''
        }${
          locale === 'en' ? ' && publishingControls.isEnglishPublished == true' : ''
        } && references(\"${relatedToCategoryId}\") && slug.current != \"${excludeSlug}\"] | order(publishedAt desc)[0...3]{ title: select(locale == 'es' => title_es, title_en), slug, excerpt, featureImage, categories[]->{title: select(locale == 'es' => title_es, title_en), color}, author, publishedAt, locale }`);
      }
      if (slugsOnly) {
        return await fetchSanity(`*[_type == \"post\"${locale ? ` && locale == \"${locale}\"` : ''} && publishingControls.published == true]{ slug }`);
      }
      if (all) {
        return await fetchSanity(`*[_type == \"post\"${locale ? ` && locale == \"${locale}\"` : ''}]`);
      }
      if (slug) {
        return await fetchSanity(`*[_type == \"post\" && slug.current == \"${slug}\"${locale ? ` && locale == \"${locale}\"` : ''} && publishingControls.published == true][0]{ title, excerpt, featureImage, categories, author, publishedAt, locale, content, slug }`);
      }
    }
    if (type === 'category') {
      return await fetchSanity(`*[_type == \"category\"]`);
    }
  }
  return null;
}
