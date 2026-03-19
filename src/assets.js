// All assets now served from /public — works on Vercel

export const ASSETS = {
  // ── Hero ─────────────────────────────────────────────────────────
  heroIllustration: null,                          // removed (decorative only)
  heroImage:        '/hero-illustration.png',

  // ── Work section card thumbnails ─────────────────────────────────
  bchexCard:        '/figma-assets/bchex-card.png',
  autilentCard:     '/figma-assets/autilent-card.png',
  atMapOverviewCard: '/xp-images/at-map-overview-card.png',
  xpSarveshCardFull: '/xp-images/xp-sarvesh-card-full.png',
  xpendlessCard:    '/figma-assets/xpendless-card.png',

  // ── Experience section ───────────────────────────────────────────
  bytecorpLogo:     '/figma-assets/bytecorp-logo.png',
  designProcess:    '/figma-assets/design-process.png',
  stepLine1:        '/figma-assets/step-line-1.png',
  stepLine2:        '/figma-assets/step-line-2.png',

  // ── Contact icons ────────────────────────────────────────────────
  emailIcon:        '/figma-assets/email-icon.png',
  linkedinIcon:     '/figma-assets/linkedin-icon.png',

  // ── Overlay close button (inline SVG used directly in JSX) ───────
  closeIcon:        null,

  // ── Xpendless overlay images ─────────────────────────────────────
  xpHero:           '/figma-assets/xp-hero.png',
  xpPhone:          '/xp-images/xp-my-cards.png',
  xpCorpExpense:    '/xp-images/xp-corporate-expense.png',
  xpSarveshCard:    '/xp-images/xp-sarvesh-card.png',

  // ── Autilent overlay images ──────────────────────────────────────
  // at-map-overview.png is the full composite (ocean bg + map UI together)
  atMapOverview:    '/figma-assets/at-map-overview.png',
  atLiveView:       '/figma-assets/at-live-view.png',
  atGetTrip:        '/figma-assets/at-get-trip.png',

  // ── Bchex overlay images ─────────────────────────────────────────
  bxLaptop1:        '/figma-assets/bx-laptop1.png',
  bxReviewChat:     '/xp-images/bx-review-chat.png',
  bxMobileRow:      '/figma-assets/bx-mobile-row.png',   // combined side-by-side
  bxLaptop2:        '/figma-assets/bx-laptop2.png',
};
