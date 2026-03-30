import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

const COMMENTS = [
  { key: 'comment',          src: '/comment.svg' },
  { key: 'comment-autilent', src: '/comment-autilent.svg' },
  { key: 'comment-hero',     src: '/comment-hero.svg' },
];

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const getHovered = (x, y) => {
      const target = document.elementFromPoint(x, y);
      const card = target?.closest('[data-cursor]');
      return card ? card.dataset.cursor : null;
    };

    const move = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      setHovered(getHovered(e.clientX, e.clientY));
    };

    const onScroll = () => {
      const { x, y } = mousePos.current;
      setHovered(getHovered(x, y));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <img src="/cursor.svg" alt="" width={29} height={31} />
      {COMMENTS.map(({ key, src }) => (
        <img
          key={key}
          src={src}
          alt=""
          className={`${styles.commentBubble} ${hovered === key ? styles.commentBubbleVisible : ''}`}
        />
      ))}
    </div>
  );
}
