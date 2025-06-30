import { type Locale } from "@/lib/localeUtils";

export default function PrivacyPolicyPage({ params }: { params: { locale: Locale } }) {
  const content = {
    title: params.locale === "es" ? "Política de Privacidad" : "Privacy Policy",
    sections: [
      {
        heading: params.locale === "es" ? "1. Introducción" : "1. Introduction",
        body: params.locale === "es"
          ? `En The Unapologetic Sanctuary, nos tomamos muy en serio la privacidad de tus datos. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.`
          : `At The Unapologetic Sanctuary, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.`
      },
      {
        heading: params.locale === "es" ? "2. Datos que Recopilamos" : "2. Data We Collect",
        body: params.locale === "es"
          ? `Podemos recopilar información como tu nombre, dirección de correo electrónico y cualquier dato que proporciones al suscribirte a nuestro boletín o al ponerte en contacto con nosotros.`
          : `We may collect information such as your name, email address, and any data you provide when subscribing to our newsletter or contacting us.`
      },
      {
        heading: params.locale === "es" ? "3. Uso de la Información" : "3. Use of Information",
        body: params.locale === "es"
          ? `Utilizamos tus datos únicamente para responder a tus consultas, enviarte comunicaciones relacionadas con nuestros servicios y mejorar tu experiencia en el sitio.`
          : `We use your data solely to respond to your inquiries, send you communications related to our services, and improve your experience on the site.`
      },
      {
        heading: params.locale === "es" ? "4. Compartir Información" : "4. Sharing Information",
        body: params.locale === "es"
          ? `No compartimos tu información personal con terceros, salvo que sea requerido por ley.`
          : `We do not share your personal information with third parties except as required by law.`
      },
      {
        heading: params.locale === "es" ? "5. Tus Derechos" : "5. Your Rights",
        body: params.locale === "es"
          ? `Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. Para ejercer estos derechos, contáctanos a través de la información proporcionada en el sitio.`
          : `You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us using the information provided on the site.`
      },
      {
        heading: params.locale === "es" ? "6. Cambios en la Política" : "6. Changes to This Policy",
        body: params.locale === "es"
          ? `Nos reservamos el derecho de modificar esta política de privacidad. Cualquier cambio será publicado en esta página.`
          : `We reserve the right to modify this privacy policy. Any changes will be posted on this page.`
      }
    ]
  };

  return (
    <main aria-labelledby="privacy-policy-heading">
      <h1
        id="privacy-policy-heading"
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-lora, Lora, serif)',
          fontSize: '2.5rem',
          marginBottom: '2rem',
        }}
      >
        {content.title}
      </h1>
      <section style={{ maxWidth: 700, margin: '0 auto', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontSize: '1.1rem', lineHeight: 1.7 }}>
        {content.sections.map((section, idx) => (
          <article key={idx} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem', color: '#2E3D32' }}>{section.heading}</h2>
            <p style={{ margin: 0, color: '#2E3D32' }}>{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
