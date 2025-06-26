import styles from './Footer.module.css';
import Link from 'next/link';

const socialLinks = [
	{
		href: 'https://www.instagram.com/edurneferrero',
		label: 'Instagram',
		icon: (
			<svg
				width='24'
				height='24'
				fill='none'
				viewBox='0 0 24 24'
				aria-hidden='true'
			>
				<rect
					width='20'
					height='20'
					x='2'
					y='2'
					rx='6'
					stroke='#C86A43'
					strokeWidth='1.5'
				/>
				<circle cx='12' cy='12' r='5' stroke='#C86A43' strokeWidth='1.5' />
				<circle cx='17.2' cy='6.8' r='1.2' fill='#C86A43' />
			</svg>
		),
	},
	{
		href: 'https://www.facebook.com/edurneferrero',
		label: 'Facebook',
		icon: (
			<svg
				width='24'
				height='24'
				fill='none'
				viewBox='0 0 24 24'
				aria-hidden='true'
			>
				<rect
					width='20'
					height='20'
					x='2'
					y='2'
					rx='6'
					stroke='#C86A43'
					strokeWidth='1.5'
				/>
				<path
					d='M15.5 8.5h-1.2c-.3 0-.3.1-.3.3v1.2h1.5l-.2 1.7h-1.3V18h-2.1v-6.3h-1.1v-1.7h1.1v-1.1c0-1.1.7-2.1 2.2-2.1h1.2v1.6z'
					fill='#C86A43'
				/>
			</svg>
		),
	},
];

function EquinoxSymbol() {
	// "Perfectly imperfect" horizontal line motif
	return (
		<svg
			width='80'
			height='12'
			viewBox='0 0 80 12'
			fill='none'
			aria-hidden='true'
			className={styles.equinox}
		>
			<path
				d='M2 6 Q 20 2, 40 6 T 78 6'
				stroke='#A1A19B'
				strokeWidth='2.5'
				strokeLinecap='round'
				fill='none'
			/>
			<circle cx='40' cy='6' r='2.5' fill='#C86A43' />
		</svg>
	);
}

export default function Footer() {
	// Determine locale from pathname for privacy policy link
	let locale = 'es';
	if (typeof window !== 'undefined') {
		locale = window.location.pathname.startsWith('/en') ? 'en' : 'es';
	}
	const privacyHref =
		locale === 'en'
			? '/en/privacy-policy'
			: '/es/politica-de-privacidad';
	return (
		<footer className={styles.footer}>
			<div className={styles.equinoxWrap}>
				<EquinoxSymbol />
			</div>
			<div className={styles.socials}>
				{socialLinks.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						target='_blank'
						rel='noopener noreferrer'
						aria-label={link.label}
						className={styles.socialLink}
					>
						{link.icon}
					</Link>
				))}
			</div>
			<div className={styles.meta}>
				<span>&copy; {new Date().getFullYear()} Edurne Ferrero</span>
				<span className={styles.separator}>|</span>
				<span>Unapologetic Sanctuary</span>
				<span className={styles.separator}>|</span>
				<Link href={privacyHref} className={styles.privacyLink}>
					{locale === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}
				</Link>
			</div>
		</footer>
	);
}
