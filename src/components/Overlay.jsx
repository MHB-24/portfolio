import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ASSETS } from '../assets';
import Tag from './Tag';
import { ProjectCard, PROJECTS } from './Work';
import styles from './Overlay.module.css';

/* ── Case study data ──────────────────────────────────────── */
const STUDIES = {
  bchex: {
    title: 'Bchex',
    badge: 'HR & Compliance',
    headline: 'Fast, accurate background checks for employees, volunteers, and vendors',
    tags: ['UX Research', 'Stakeholder Management', 'User Testing', 'System Design'],
    body: (
      <>
        <p>
          Bchex faced an industry-wide bottleneck where manual data entry and fragmented
          record-searching forced organizations to choose between operational speed and
          workplace safety. For employees and volunteers, the "background check gap"
          meant lost wages and delayed starts; for employers, it meant losing top talent
          to competitors who could move faster.
        </p>
        <br />
        <p>
          <strong>Solution:</strong> Designed an AI-powered assessment experience that
          feels natural and effortless for users. Automated AI-generated reports were
          clearly structured around critical insights to enable faster, informed actions.
        </p>
        <br />
        <p>
          <strong>The Impact:</strong> Instant Onboarding — slashed manual handling,
          enabling Bchex to complete most background checks <strong>2x faster</strong>{' '}
          in just 12-14 hours. Bchex stopped being a hurdle in the hiring process and
          became the catalyst for it.
        </p>
      </>
    ),
    imagesCustom: 'bchex',
    next: 'autilent',
    nextBg: 'var(--card-blue)',
  },

  autilent: {
    title: 'Autilent',
    badge: 'Automotive',
    headline: 'A data-driven platform designed to make roads safer and fleets smarter.',
    tags: ['UX Research', 'Competitor Analysis', 'System Design', 'Design Audit', 'User Journey Mapping'],
    body: (
      <>
        <p>
          In the MENA region, unique road conditions—from extreme heat to high-density
          urban traffic—create a high-risk environment for commercial fleets. Traditional
          dash-cams are passive observers; they record accidents but do nothing to prevent
          them. For fleet operators, the "safety gap" results in rising insurance
          premiums, regulatory fines, and preventable loss of life.
        </p>
        <br />
        <p>
          <strong>Solution:</strong> An "AI co-pilot" experience that transforms raw AI
          data into clear, actionable insights — an intuitive command center helping fleet
          managers identify driver fatigue, distraction, and lane departures in real time.
        </p>
        <br />
        <p>
          <strong>The Impact:</strong> By moving from passive recording to active AI
          detection, Autilent provides in-cab alerts that reduce human-error accidents by
          identifying high-risk behaviors in milliseconds.
        </p>
      </>
    ),
    imagesCustom: 'autilent',
    next: 'xpendless',
    nextBg: 'var(--card-green)',
  },

  xpendless: {
    title: 'Xpendless',
    badge: 'Financial Technology',
    headline: 'Fast, Simple Expense Management for Modern Teams',
    subHeadline: (
      <>
        <strong>QDB Hackathon winner in 2024</strong> and raised{' '}
        <strong>6 Million SAR</strong> fundings
      </>
    ),
    tags: ['UX Research', 'Competitor Analysis', 'System Design', 'Branding', 'Design Audit'],
    body: (
      <>
        <p>
          Manual expense tracking, slow approvals, and scattered financial data created
          friction for employees and finance teams, leading to delays, errors, and poor
          spending visibility.
        </p>
        <br />
        <p>
          <strong>Solution:</strong> Designed a streamlined expense management experience
          that automates receipt capture, approvals, and reporting through intuitive flows,
          real-time tracking, and smart budget controls.
        </p>
        <br />
        <p><strong>The Impact:</strong></p>
        <ul>
          <li>Reduced friction in expense submission and approvals.</li>
          <li>Faster reimbursements and clearer financial visibility.</li>
          <li>Improved policy compliance through smart UX and automation.</li>
          <li>A smoother, more scalable financial workflow for growing teams.</li>
        </ul>
      </>
    ),
    imagesCustom: true,
    next: 'autilent',
    nextBg: 'var(--card-blue)',
  },
};


/* ── Autilent image layout — 3 composite images ─────────────
   1. Map Overview  (composite: ocean bg + map UI)
   2. Live View     (composite: dark card + screen)
   3. Get Trip Reports (composite: dark card + screen)
────────────────────────────────────────────────────────────── */
const BELIEFS = [
  { name: 'Safety First, Always',       desc: "Safety is not just a feature; it's our foundation. We prioritize the well-being of drivers, passengers, and communities, ensuring every journey is secure." },
  { name: 'Innovation with Purpose',    desc: 'We harness innovation to solve real-world challenges, driving every Autilent technological advance with a purpose to enhance road safety.' },
  { name: 'User Empowerment',           desc: 'Autilent empowers fleet managers and drivers through a user-centric platform, ensuring a seamless and empowering experience.' },
  { name: 'Transparency and Integrity', desc: 'We cultivate a culture of transparency and integrity, fostering trust internally and externally with clients, partners, and team members.' },
  { name: 'Continuous Improvement',     desc: "We thrive on the belief that there's always room for improvement. Autilent evolves with the ever-changing landscape of technology and road safety." },
  { name: 'Community Centric Approach', desc: 'Our vision extends beyond individuals to actively contribute to a safer, more connected community through responsible road practices.' },
];

function AutilentImages() {
  return (
    <>
      {/* 1 — Map Overview composite */}
      <img
        className={styles.ovImg}
        style={{ height: 471 }}
        src={ASSETS.atMapOverview}
        alt="Autilent – Map Overview"
      />

      {/* 2 — Live View composite */}
      <img
        className={styles.ovImg}
        style={{ height: 471 }}
        src={ASSETS.atLiveView}
        alt="Autilent – Live View"
      />

      {/* 3 — Rooted Beliefs */}
      <div className={styles.atBeliefs}>
        <div className={styles.atBeliefsInner}>
          <div>
            <p className={styles.atBeliefsTitle}>Rooted Beliefs Shaping Our Journey</p>
            <p className={styles.atBeliefsSubtitle}>
              Our values serve as the compass guiding every decision, innovation, and interaction.
              They are the bedrock of our identity, shaping the way we operate and engage with our community.
            </p>
          </div>
          <div className={styles.atBeliefGrid}>
            {BELIEFS.map(b => (
              <div key={b.name} className={styles.atBeliefCard}>
                <p className={styles.atBeliefName}>{b.name}</p>
                <p className={styles.atBeliefDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 — Get Trip Reports composite */}
      <img
        className={styles.ovImg}
        style={{ height: 471 }}
        src={ASSETS.atGetTrip}
        alt="Autilent – Get Trip Reports"
      />
    </>
  );
}

/* ── Bchex custom image layout ──────────────────────────────
   Layout (all 471px tall):
   1. Laptop — Policy Matrices          [full width]
   2. Desktop — Review / Assessment     [full width]
   3. Mobile Dispute  +  Mobile Review  [side by side]
   4. Laptop — Dashboard                [full width]
────────────────────────────────────────────────────────────── */
function BchexImages() {
  return (
    <>
      {/* Row 1 — Laptop: Policy Matrices */}
      <img
        className={styles.ovImg}
        style={{ height: 471 }}
        src={ASSETS.bxLaptop1}
        alt="Bchex – Policy Matrices"
      />

      {/* Row 2 — Review Assessment Chat (user-provided) */}
      <div className={styles.imgFitBox}>
        <img
          src={ASSETS.bxReviewChat}
          alt="Bchex – Review Assessment Chat"
          className={styles.imgFit}
        />
      </div>

      {/* Row 3 — Mobile side-by-side (combined composite image) */}
      <img
        className={styles.ovImg}
        style={{ height: 471 }}
        src={ASSETS.bxMobileRow}
        alt="Bchex – Mobile screens"
      />

      {/* Row 4 — Laptop: Dashboard */}
      <img
        className={styles.ovImg}
        style={{ height: 471 }}
        src={ASSETS.bxLaptop2}
        alt="Bchex – Dashboard"
      />
    </>
  );
}

/* ── Xpendless custom image layout ─────────────────────────── */
function XpendlessImages() {
  return (
    <>
      {/* Image 1 — Green laptop hero (full width) */}
      <img
        className={styles.ovImg}
        style={{ height: 471 }}
        src={ASSETS.xpHero}
        alt="Xpendless – Dashboard overview"
      />

      {/* Images 2 + 3 — My Cards & Corporate Card Expense (side-by-side) */}
      <div className={styles.imgRow}>
        <div className={styles.imgDark}>
          <img src={ASSETS.xpPhone} alt="Xpendless – My Cards" />
        </div>
        <div className={styles.imgDark}>
          <img src={ASSETS.xpCorpExpense} alt="Xpendless – Corporate Card Expense" />
        </div>
      </div>

      {/* Image 4 — Sarvesh's Card desktop (user-provided) */}
      <img
        className={styles.ovImg}
        style={{ height: 471 }}
        src={ASSETS.xpSarveshCard}
        alt="Xpendless – Sarvesh's Card"
      />
    </>
  );
}

/* ── Main Overlay component ─────────────────────────────────── */
export default function Overlay({ activeId, onClose, onSwitch }) {
  const innerRef = useRef(null);
  const lenisRef = useRef(null);
  const panelRef = useRef(null);

  // Remove fullscreen class when popup closes or switches
  useEffect(() => {
    if (panelRef.current) panelRef.current.classList.remove(styles.fullscreen);
  }, [activeId]);

  // Lenis smooth scroll on the popup panel
  useEffect(() => {
    const el = innerRef.current;
    if (!el || !activeId) return;

    const lenis = new Lenis({
      wrapper:         el,
      content:         el.firstElementChild,
      lerp:            0.05,
      duration:        1.8,
      smoothWheel:     true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      overscroll:      false,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);

    // Go fullscreen when scrolled down, back to normal when scrolled to top
    lenis.on('scroll', ({ scroll }) => {
      if (!panelRef.current) return;
      if (scroll > 40) {
        panelRef.current.classList.add(styles.fullscreen);
      } else {
        panelRef.current.classList.remove(styles.fullscreen);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [activeId]);

  // Reset scroll when overlay switches
  useEffect(() => {
    if (innerRef.current) innerRef.current.scrollTop = 0;
  }, [activeId]);

  // Keyboard close
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = activeId ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeId]);

  const study = activeId ? STUDIES[activeId] : null;
  const nextId = study?.next;
  const nextProject = nextId ? PROJECTS.find(p => p.id === nextId) : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${activeId ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`${styles.panel} ${activeId ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={study ? `${study.title} case study` : ''}
      >
        {/* Close button — lives on the panel, not inside the scroll container */}
        {study && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}

        <div className={styles.inner} ref={innerRef}>
          {study && (
            <>
              {/* Two-column layout */}
              <div className={styles.body}>
                {/* Left sticky panel */}
                <div className={styles.left}>
                  <div className={styles.header}>
                    <span className={styles.projTitle}>{study.title}</span>
                    <span className={styles.badge}>{study.badge}</span>
                  </div>

                  <div>
                    <p className={styles.headline}>{study.headline}</p>
                    {study.subHeadline && (
                      <p className={styles.subHeadline}>{study.subHeadline}</p>
                    )}
                    <div className={styles.tags}>
                      {study.tags.map(t => <Tag key={t} small className={styles.ovTag}>{t}</Tag>)}
                    </div>
                  </div>

                  <div className={styles.bodyText}>{study.body}</div>
                </div>

                {/* Right scrollable images */}
                <div className={styles.right}>
                  {study.imagesCustom === 'bchex' ? (
                    <BchexImages />
                  ) : study.imagesCustom === 'autilent' ? (
                    <AutilentImages />
                  ) : study.imagesCustom ? (
                    <XpendlessImages />
                  ) : (
                    study.images.map((src, i) => (
                      <img
                        key={i}
                        className={styles.ovImg}
                        style={{ height: study.imageHeights[i] }}
                        src={src}
                        alt={`${study.title} screenshot ${i + 1}`}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* More Case Studies */}
              {nextProject && (
                <div className={styles.more}>
                  <div className={styles.moreTitle}>More Case Studies</div>
                  <ProjectCard
                    project={nextProject}
                    onOpen={onSwitch}
                    imgStyleOverride={
                      activeId === 'bchex'    ? { left: 721 } :
                      activeId === 'autilent' ? { left: 934 } :
                      activeId === 'xpendless' && window.matchMedia('(min-width: 769px)').matches ? { left: 721 } :
                      undefined
                    }
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
