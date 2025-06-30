import '../globals.css';
import type { Metadata } from 'next';
import { Lora, Montserrat } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const lora = Lora({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-lora' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Edurne Ferrero',
  description: 'Un refugio para mentes que buscan respirar, cuestionar y florecer.',
};

export default function LocaleLayout({ children, params }: { children: React.ReactNode, params: { locale: 'es' | 'en' } }) {
  return (
    <html lang={params.locale} className={`${lora.variable} ${montserrat.variable}`}>
      <body>
        <Header locale={params.locale} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
