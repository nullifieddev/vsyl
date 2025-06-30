'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './Header.module.css';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { locale } = useParams() as { locale?: string };
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Edurne Ferrero</span>
      <nav className={`${styles.mainNav} main-nav`} aria-label="Main navigation">
        <a href="/es/blog" className={styles.navLink}>Blog</a>
        <a href="/es/sobre-mi" className={styles.navLink}>Sobre mí</a>
        <a href="/es/coaching" className={styles.navLink}>Coaching</a>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
