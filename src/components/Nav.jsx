import { useState, useEffect, useRef } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';
import styles from './Nav.module.css';

const LINKS = [
  { label: 'Home',       href: '#hero' },
  { label: 'Work',       href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'About',      href: '#about' },
  { label: 'Contact Me', href: '#contact' },
];

export default function Nav() {
  const [active, setActive] = useState('hero');
  const pillRef = useRef(null);

  useEffect(() => {
    const OFFSET = 80; // px below the navbar to use as the trigger line

    const update = () => {
      const sections = Array.from(document.querySelectorAll('section[id]'));
      if (!sections.length) return;

      // Walk sections from bottom to top; first one whose top is above the
      // trigger line is the "active" section.
      let current = sections[0].id;
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= OFFSET) {
          current = sec.id;
        }
      }
      setActive(current);
    };

    update(); // run immediately on mount
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Scroll active link to the centre of the pill whenever active changes
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const activeLink = pill.querySelector(`.${styles.active}`);
    if (!activeLink) return;
    const scrollTarget =
      activeLink.offsetLeft - pill.offsetWidth / 2 + activeLink.offsetWidth / 2;
    pill.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  }, [active]);

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) smoothScrollTo(target, 1200, 90);
  };

  return (
    <nav className={styles.wrap} aria-label="Main navigation">
      <div className={styles.pill} ref={pillRef}>
        {LINKS.map(({ label, href }) => {
          const sec = href.replace('#', '');
          const isActive = sec === active;
          return (
            <a
              key={label}
              href={href}
              className={`${styles.link} ${isActive ? styles.active : ''}`}
              onClick={e => handleClick(e, href)}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
