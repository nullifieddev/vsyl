import type { Metadata } from "next";
import { Lora, Montserrat } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-lora",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Edurne Ferrero | The Unapologetic Sanctuary",
    template: "%s | Edurne Ferrero",
  },
  description:
    "A digital sanctuary for mind coaching, blog, and resources by Edurne Ferrero.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${lora.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body style={{ background: "var(--color-bg, #F8F6F2)", color: "var(--color-text, #2E3D32)", minHeight: "100vh" }}>
        <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
        <main id="main-content" tabIndex={-1} role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
