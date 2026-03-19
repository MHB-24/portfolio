import { ASSETS } from '../assets';
import { smoothScrollTo } from '../utils/smoothScroll';
import styles from './Hero.module.css';

const scrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) smoothScrollTo(el, 1200, 90);
};

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.textGroup}>
        <h1 className={styles.title}>
          Pretty <strong>UI</strong> is common,<br />
          thoughtful <strong>UX</strong> isn't
        </h1>

        <div className={styles.ctaRow}>
          <button className={styles.ctaPrimary} onClick={() => scrollTo('#work')}>
            I bring both to the table
          </button>
          <button className={styles.ctaOutline} onClick={() => scrollTo('#contact')}>
            Get in touch
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4.5 13.5L13.5 4.5M13.5 4.5H6.75M13.5 4.5V11.25" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <img
        className={styles.photo}
        src={ASSETS.heroImage}
        alt="Hadi Babar"
      />
    </section>
  );
}
