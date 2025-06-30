// localeUtils.ts
// Utility to map current path to equivalent path in the other locale
import { fetchSanityData } from './sanity.fetch';

// Static mapping for non-dynamic pages
const staticPageMap: Record<string, { es: string; en: string }> = {
  '/es': { es: '/es', en: '/en' },
  '/en': { es: '/es', en: '/en' },
  '/es/blog': { es: '/es/blog', en: '/en/blog' },
  '/en/blog': { es: '/es/blog', en: '/en/blog' },
  '/es/coaching': { es: '/es/coaching', en: '/en/coaching' },
  '/en/coaching': { es: '/es/coaching', en: '/en/coaching' },
  '/es/sobre-mi': { es: '/es/sobre-mi', en: '/en/about' },
  '/en/about': { es: '/es/sobre-mi', en: '/en/about' },
  '/es/politica-de-privacidad': { es: '/es/politica-de-privacidad', en: '/en/privacy-policy' },
  '/en/privacy-policy': { es: '/es/politica-de-privacidad', en: '/en/privacy-policy' },
};

// Helper to check if a path is a blog post
function isBlogPostPath(path: string) {
  return /^\/(es|en)\/blog\/.+/.test(path) && !/\/blog\/page\//.test(path);
}

// Helper to check if a path is a paginated blog archive
function isBlogArchivePage(path: string) {
  return /^\/(es|en)\/blog\/page\/[0-9]+$/.test(path);
}

// Main function to get equivalent path
export async function getEquivalentPath(currentPath: string, currentLocale: 'es' | 'en'): Promise<string> {
  const otherLocale = currentLocale === 'en' ? 'es' : 'en';
  // Static pages
  if (staticPageMap[currentPath]) {
    return staticPageMap[currentPath][otherLocale];
  }
  // Blog archive pagination
  if (isBlogArchivePage(currentPath)) {
    const pageNum = currentPath.match(/page\/(\d+)/)?.[1] || '1';
    return `/${otherLocale}/blog/page/${pageNum}`;
  }
  // Blog post detail
  if (isBlogPostPath(currentPath)) {
    const slug = currentPath.split('/').pop();
    // Check if the slug exists in the other locale
    const exists = await fetchSanityData({ type: 'post', slug, locale: otherLocale });
    if (exists) {
      return `/${otherLocale}/blog/${slug}`;
    } else {
      // Fallback to blog archive in other locale
      return `/${otherLocale}/blog`;
    }
  }
  // Fallback: homepage in other locale
  return `/${otherLocale}`;
}

// Client-safe static mapping for static pages (no async, no Sanity)
export function getStaticEquivalentPath(currentPath: string, currentLocale: 'es' | 'en'): string {
  const otherLocale = currentLocale === 'en' ? 'es' : 'en';
  if (staticPageMap[currentPath]) {
    return staticPageMap[currentPath][otherLocale];
  }
  // Fallback: homepage in other locale
  return `/${otherLocale}`;
}
