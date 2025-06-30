// frontend/components/Header/Header.tsx

"use client"; // CRITICAL: This makes it a Client Component

import styles from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getStaticEquivalentPath } from '@/lib/localeUtils';

// A better, unified data structure for navigation links
const navLinks = {
  es: [
    { href: '/es', label: 'Inicio' },
    { href: '/es/blog', label: 'Blog' },
    { href: '/es/coaching', label: 'Coaching' },
    { href: '/es/sobre-mi', label: 'Sobre mí' },
  ],
  en: [
    { href: '/en', label: 'Home' },
    { href: '/en/blog', label: 'Blog' },
    { href: '/en/coaching', label: 'Coaching' },
    { href: '/en/about', label: 'About' },
  ]
};

// We pass the locale from the parent component now
export default function Header({ locale }: { locale: 'es' | 'en' }) {
  const pathname = usePathname();

  // Determine the current locale from the URL, not just the prop
  const currentLocale = pathname.split('/')[1] === 'en' ? 'en' : 'es';
  const otherLocale = currentLocale === 'en' ? 'es' : 'en';

  const currentLinks = navLinks[currentLocale] || navLinks.es;

  // Helper: Replace only the first segment (locale) in the path
  function getEquivalentPath(path: string, from: string, to: string) {
    const segments = path.split('/');
    if (segments[1] === from) {
      if (segments.length === 2 || (segments.length === 3 && segments[2] === '')) {
        return `/${to}`;
      }
      segments[1] = to;
      return segments.join('/') || '/';
    }
    return `/${to}`;
  }

  // Use robust static mapping for locale switcher (handles privacy policy, about, etc)
  const switcherHref = getStaticEquivalentPath(pathname, currentLocale);
  const switcherLabel = otherLocale.toUpperCase();

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <Link href={`/${currentLocale}/about`} className={styles.logo} aria-label="Edurne Ferrero Home">
          <span className={styles.logoText}>Edurne Ferrero</span>
        </Link>
      </div>
      <nav className={styles.nav} aria-label="Main Navigation">
        <ul className={styles.navList}>
          {currentLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={pathname === link.href ? styles.active : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className={styles.localeNav} aria-label="Language Switcher">
        <Link href={switcherHref} className={styles.localeSwitcher} prefetch={false}>
          {switcherLabel}
        </Link>
      </nav>
    </header>
  );
}