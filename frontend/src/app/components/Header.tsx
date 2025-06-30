import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Edurne Ferrero</span>
      <nav className={`${styles.mainNav} main-nav`} aria-label="Main navigation">
        <a href="/es/blog" className={styles.navLink}>Blog</a>
        <a href="/es/sobre-mi" className={styles.navLink}>Sobre mí</a>
        <a href="/es/coaching" className={styles.navLink}>Coaching</a>
      </nav>
      <div className={styles.langSwitcher + ' lang-switcher'} aria-label="Selector de idioma">
        <span className={styles.active + ' active'} aria-current="page">ES</span>
        <span>|</span>
        <a href="/en" className={styles.lang}>EN</a>
      </div>
    </header>
  );
}
