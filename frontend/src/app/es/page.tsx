import Image from 'next/image';
import React from 'react';
import styles from '../[locale]/Home.module.css';

export default function HomeEs() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>
            El Primer Aliento
          </h1>
          <p>
            Un refugio para mentes que buscan respirar, cuestionar y florecer. Aquí, la transformación comienza con un solo aliento: el tuyo.
          </p>
        </div>
        <div className={styles.heroImageBlock}>
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Luz dorada atravesando hojas, evocando calma y claridad"
            className={styles.heroImage}
            width={480}
            height={600}
            priority
          />
        </div>
      </section>
    </main>
  );
}