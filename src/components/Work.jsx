import { ASSETS } from '../assets';
import Tag from './Tag';
import styles from './Work.module.css';

export const PROJECTS = [
  {
    id: 'bchex',
    title: 'Bchex',
    desc: (
      <>
        Slashed manual handling and enabling Bchex to complete most background
        checks <strong>2x faster</strong> in just 12-14 hours, which took over 24
        hours before.
      </>
    ),
    tags: ['UX Research', 'Stakeholder Management', 'User Testing', 'System Design'],
    category: 'HR & Compliance',
    bg: 'var(--card-purple)',
    image: ASSETS.bchexCard,
    layout: 'full',
    imgStyle: { borderRadius: 16 },
  },
  {
    id: 'autilent',
    title: 'Autilent',
    desc: 'A data-driven platform designed to make roads safer and fleets smarter.',
    tags: ['UX Research', 'Competitor Analysis', 'System Design', 'Design Audit', 'User Journey Mapping'],
    category: 'Automotive',
    bg: 'var(--card-blue)',
    image: ASSETS.autilentCard,
    layout: 'half',
    imgStyle: { left: 207, top: 333, width: 688, height: 458 },
  },
  {
    id: 'xpendless',
    title: 'Xpendless',
    desc: (
      <>
        QDB Hackathon winner in 2024 and raised <strong>6 Million SAR</strong> fundings
      </>
    ),
    tags: ['UX Research', 'Competitor Analysis', 'System Design', 'Branding', 'Design Audit'],
    category: 'Financial Technology',
    bg: 'var(--card-green)',
    image: ASSETS.xpendlessCard,
    layout: 'half',
    imgStyle: { left: 308, top: 341, width: 330, height: 544, borderRadius: 26 },
  },
];

export function ProjectCard({ project, onOpen, imgStyleOverride }) {
  const { id, title, desc, tags, category, bg, image, layout, imgStyle } = project;
  const isFull = layout === 'full';
  const resolvedStyle = imgStyleOverride ? { ...imgStyle, ...imgStyleOverride } : imgStyle;

  return (
    <div
      className={`${styles.card} ${isFull ? styles.cardFull : styles.cardHalf}`}
      style={{ background: bg }}
      onClick={() => onOpen(id)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title} case study`}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpen(id)}
    >
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={`${styles.desc} ${!isFull ? styles.descNarrow : ''}`}>{desc}</p>
        <div className={styles.tags}>
          {tags.map(t => <Tag key={t} small={!isFull}>{t}</Tag>)}
        </div>
        <span className={styles.category}>{category}</span>
      </div>
      <img
        className={[
          isFull ? styles.imgFull : styles.imgHalf,
          styles[`img_${id}`] || '',
        ].join(' ')}
        style={!isFull ? {
          left: resolvedStyle.left,
          top: resolvedStyle.top,
          width: resolvedStyle.width,
          height: resolvedStyle.height,
          borderRadius: resolvedStyle?.borderRadius,
        } : {
          borderRadius: resolvedStyle?.borderRadius,
        }}
        src={image}
        alt={`${title} screenshot`}
      />
    </div>
  );
}

export default function Work({ onOpen }) {
  const full = PROJECTS.find(p => p.layout === 'full');
  const halves = PROJECTS.filter(p => p.layout === 'half');

  return (
    <section id="work" className={styles.work}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Design with <strong>impact</strong></h2>
        <p className={styles.sectionSub}>Recent work</p>
      </div>
      <div className={styles.cards}>
        <ProjectCard project={full} onOpen={onOpen} />
        <div className={styles.row}>
          {halves.map(p => <ProjectCard key={p.id} project={p} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}
