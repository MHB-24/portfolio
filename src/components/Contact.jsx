import { ASSETS } from '../assets';
import styles from './Contact.module.css';
import ReactionGame from './ReactionGame';

const WORDS = ['meaningful', 'impactful', 'interactive', 'profitable'];

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      {/* Static headline */}
      <div className={styles.ctaBlock}>
        <span>Let's make </span>
        <br />
        <span>something</span>
      </div>

      {/* Animated cycling word */}
      <div className={styles.animWrap}>
        <div className={styles.animTrack}>
          {[...WORDS, WORDS[0]].map((w, i) => (
            <span key={i} className={styles.word}>{w}</span>
          ))}
        </div>
      </div>

      {/* Contact links */}
      <div className={styles.links}>
        <a href="mailto:hadibabar2001@gmail.com" className={styles.link}>
          <img src={ASSETS.emailIcon} alt="Email" width={31} height={27} />
          hadibabar2001@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/hadi-babar/"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ASSETS.linkedinIcon} alt="LinkedIn" width={30} height={30} />
          Hadi Babar
        </a>
      </div>

      <ReactionGame />

      <footer className={styles.footer}>
        <p>© 2026 Hadi Babar. UX that actually works.</p>
      </footer>
    </section>
  );
}
