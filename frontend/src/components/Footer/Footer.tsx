import styles from './Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.globalFooter}>
			<div className={styles.footerContainer}>
				<div className={styles.footerSocial}>
					<a href='#'>Instagram</a>
					<a href='#'>Youtube</a>
				</div>
				<div className={styles.footerCenter}>
					<div className={styles.equinoxSymbol}>⊕</div>
					<div>© 2024 Edurne Ferrero</div>
				</div>
				<div className={styles.footerLegal}>
					<a href='#'>Política de Privacidad</a>
				</div>
			</div>
		</footer>
	);
}
