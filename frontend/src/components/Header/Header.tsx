import styles from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getEquivalentPath } from '../../lib/localeUtils';

const navLinks = [
  { href: '/es', label: 'Inicio', locale: 'es' },
  { href: '/es/blog', label: 'Blog', locale: 'es' },
  { href: '/es/coaching', label: 'Coaching', locale: 'es' },
  { href: '/es/sobre-mi', label: 'Sobre mí', locale: 'es' },
];

const navLinksEn = [
  { href: '/en', label: 'Home', locale: 'en' },
  { href: '/en/blog', label: 'Blog', locale: 'en' },
  { href: '/en/coaching', label: 'Coaching', locale: 'en' },
  { href: '/en/about', label: 'About', locale: 'en' },
];

function getLocale(path: string) {
  if (path.startsWith('/en')) return 'en';
  return 'es';
}

export default function Header() {
  const pathname = usePathname();
  const locale = getLocale(pathname || '/es');
  const links = locale === 'en' ? navLinksEn : navLinks;
  const otherLocale = locale === 'en' ? 'es' : 'en';
  const [switcherHref, setSwitcherHref] = useState(locale === 'en' ? '/es' : '/en');

  useEffect(() => {
    async function resolveEquivalent() {
      const eqPath = await getEquivalentPath(pathname, locale);
      setSwitcherHref(eqPath);
    }
    resolveEquivalent();
  }, [pathname, locale]);

  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <Link href={locale === 'en' ? '/en' : '/es'} className={styles.logo} aria-label="Edurne Ferrero Home">
          <span className={styles.logoText}>Edurne Ferrero</span>
          <span className={styles.sanctuary}>Sanctuary</span>
        </Link>
      </div>
      <nav className={styles.nav} aria-label="Main Navigation">
        <ul className={styles.navList}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={pathname === link.href ? styles.active : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.localeSwitcher}>
        <Link href={switcherHref} locale={false} className={styles.switcherBtn} aria-label={locale === 'en' ? 'Cambiar a Español' : 'Switch to English'}>
          {locale === 'en' ? 'ES' : 'EN'}
        </Link>
      </div>
    </header>
  );
}
