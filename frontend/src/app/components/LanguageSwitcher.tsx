'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  // Determine locale from the current path for robust client navigation
  const currentLocale = pathname?.split('/')[1] === 'en' ? 'en' : 'es';

  const getRedirectedPathname = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const switchWrapperClass = `${styles.pillSwitch} ${currentLocale === 'en' ? styles.enActive : styles.esActive}`;

  return (
    <div className={switchWrapperClass}>
      <Link href={getRedirectedPathname('es')} className={styles.switchOption}>ES</Link>
      <Link href={getRedirectedPathname('en')} className={styles.switchOption}>EN</Link>
    </div>
  );
}
