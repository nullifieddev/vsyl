import styles from './NewsletterCTA.module.css';
import { useState } from 'react';
import Button from '../Button/Button';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validateEmail(email: string) {
    return /.+@.+\..+/.test(email);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!validateEmail(email)) {
      setError('Por favor, introduce un email válido.');
      return;
    }
    // Simulate submission (replace with real API integration)
    setSubmitted(true);
  }

  return (
    <section className={styles.ctaSection} aria-labelledby="newsletter-heading">
      <div className={styles.ctaContent}>
        <h2 id="newsletter-heading" className={styles.heading}>
          Recibe inspiración y recursos en tu correo
        </h2>
        <p className={styles.subtext}>
          Suscríbete a la newsletter para recibir reflexiones, artículos y novedades del santuario. Sin spam, solo calma.
        </p>
        {submitted ? (
          <div className={styles.success} role="status">¡Gracias por suscribirte!</div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label htmlFor="newsletter-email" className={styles.label}>
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              className={styles.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-invalid={!!error}
              aria-describedby={error ? 'newsletter-error' : undefined}
            />
            <Button type="submit" className={styles.button}>
              Suscribirme
            </Button>
            {error && (
              <div id="newsletter-error" className={styles.error} role="alert">
                {error}
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
