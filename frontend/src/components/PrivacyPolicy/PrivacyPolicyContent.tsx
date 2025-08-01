import React from 'react';

interface PrivacyPolicyContentProps {
  locale: 'es' | 'en';
}

export default function PrivacyPolicyContent({ locale }: PrivacyPolicyContentProps) {
  const safeLocale = locale === 'es' ? 'es' : 'en';
  const content = {
    title: safeLocale === 'es' ? 'Política de Privacidad' : 'Privacy Policy',
    sections: [
      {
        heading: safeLocale === 'es' ? '1. Introducción' : '1. Introduction',
        body: safeLocale === 'es'
          ? `En The Unapologetic Sanctuary, nos tomamos muy en serio la privacidad de tus datos. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.`
          : `At The Unapologetic Sanctuary, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.`
      },
      {
        heading: safeLocale === 'es' ? '2. Datos que Recopilamos' : '2. Data We Collect',
        body: safeLocale === 'es'
          ? `Podemos recopilar información como tu nombre, dirección de correo electrónico y cualquier dato que proporciones al suscribirte a nuestro boletín o al ponerte en contacto con nosotros.`
          : `We may collect information such as your name, email address, and any data you provide when subscribing to our newsletter or contacting us.`
      },
      {
        heading: safeLocale === 'es' ? '3. Uso de la Información' : '3. Use of Information',
        body: safeLocale === 'es'
          ? `Utilizamos tus datos únicamente para responder a tus consultas, enviarte comunicaciones relacionadas con nuestros servicios y mejorar tu experiencia en el sitio.`
          : `We use your data solely to respond to your inquiries, send you communications related to our services, and improve your experience on the site.`
      },
      {
        heading: safeLocale === 'es' ? '4. Compartir Información' : '4. Sharing Information',
        body: safeLocale === 'es'
          ? `No compartimos tu información personal con terceros, salvo que sea requerido por ley.`
          : `We do not share your personal information with third parties except as required by law.`
      },
      {
        heading: safeLocale === 'es' ? '5. Tus Derechos' : '5. Your Rights',
        body: safeLocale === 'es'
          ? `Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. Para ejercer estos derechos, contáctanos a través de la información proporcionada en el sitio.`
          : `You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us using the information provided on the site.`
      },
      {
        heading: safeLocale === 'es' ? '6. Cambios en la Política' : '6. Changes to This Policy',
        body: safeLocale === 'es'
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
          color: '#2E3D32', // Force correct readable text color for heading
        }}
      >
        {content.title}
      </h1>
      <section
        style={{
          maxWidth: 700,
          margin: '0 auto',
          fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
          fontSize: '1.1rem',
          lineHeight: 1.7,
          color: '#2E3D32', // Force correct readable text color for body
        }}
      >
        {content.sections && content.sections.length > 0 ? (
          content.sections.map((section, idx) => (
            <article key={idx} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem', color: '#2E3D32' }}>{section.heading}</h2>
              <p style={{ margin: 0, color: '#2E3D32' }}>{section.body}</p>
            </article>
          ))
        ) : (
          <p style={{ color: 'red' }}>No sections found.</p>
        )}
      </section>
    </main>
  );
}
