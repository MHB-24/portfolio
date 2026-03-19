import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <h2 className={styles.title}>About</h2>
      <p className={styles.desc}>
        UX designer. Problem solver.{' '}
        <strong>Padel</strong> kick-smash trainee.{' '}
        <strong>CSGO</strong> grinder.{' '}
        <strong>FC</strong> tryhard. always chasing performance and precision
        on screen and off.
      </p>
    </section>
  );
}
