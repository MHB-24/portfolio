import { useState, useEffect } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { label: 'Work',       href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

export default function Nav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const OFFSET = 80;
    const update = () => {
      const sections = Array.from(document.querySelectorAll('section[id]'));
      if (!sections.length) return;
      let current = sections[0].id;
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= OFFSET) current = sec.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) smoothScrollTo(el, 1200, 90);
  };

  return (
    <nav className={styles.wrap} aria-label="Main navigation">
      <a
        href="#hero"
        className={styles.brand}
        onClick={e => scrollTo(e, '#hero')}
      >
        Hadi Babar
      </a>
      <div className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => {
          const sec = href.replace('#', '');
          return (
            <a
              key={label}
              href={href}
              className={`${styles.link} ${sec === active ? styles.active : ''}`}
              onClick={e => scrollTo(e, href)}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
