import '../globals.css';
import type { Metadata } from 'next';
import { Lora, Montserrat } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';

const lora = Lora({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-lora' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Edurne Ferrero',
  description: 'Un refugio para mentes que buscan respirar, cuestionar y florecer.',
};

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${lora.variable} ${montserrat.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
