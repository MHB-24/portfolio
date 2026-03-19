import { useEffect } from 'react';

/**
 * Custom smooth scroll — intensity 20 / 100.
 *
 * Usage:
 *   useSmoothScroll()          → smooth-scrolls the whole page (window)
 *   useSmoothScroll(ref)       → smooth-scrolls the element the ref points to
 *
 * How it works:
 *  - Each wheel tick adds (deltaY × INTENSITY) to a virtual target position.
 *  - Every animation frame we lerp currentY toward targetY by LERP_FACTOR.
 *  - Page variant pauses automatically while an overlay has locked body scroll.
 */

const INTENSITY   = 2.00;  // 200 / 100
const LERP_FACTOR = 0.063; // 0.045 + 40% increase

export default function useSmoothScroll(elRef = null) {
  useEffect(() => {
    /* ── helpers ── */
    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

    const getEl    = () => elRef ? elRef.current : null;
    const isEl     = () => Boolean(elRef);

    const getScrollY = () => isEl() ? getEl()?.scrollTop  ?? 0 : window.scrollY;
    const getMaxY    = () => isEl()
      ? (getEl()?.scrollHeight ?? 0) - (getEl()?.clientHeight ?? 0)
      : document.documentElement.scrollHeight - window.innerHeight;

    const applyScrollY = (y) => {
      if (isEl()) { if (getEl()) getEl().scrollTop = y; }
      else         { window.scrollTo(0, y); }
    };

    /* ── state ── */
    let targetY  = getScrollY();
    let currentY = getScrollY();
    let rafId;
    let ticking  = false;

    /* ── animation loop ── */
    const loop = () => {
      const dist = targetY - currentY;

      if (Math.abs(dist) < 0.5) {
        currentY = targetY;
        applyScrollY(currentY);
        ticking = false;
        return;
      }

      currentY += dist * LERP_FACTOR;
      applyScrollY(currentY);
      rafId = requestAnimationFrame(loop);
    };

    /* ── wheel handler ── */
    const onWheel = (e) => {
      // Page scroll: skip while overlay is locking the body
      if (!isEl() && document.body.style.overflow === 'hidden') return;

      e.preventDefault();
      e.stopPropagation();

      targetY = clamp(targetY + e.deltaY * INTENSITY, 0, getMaxY());

      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    /* ── sync on external scroll (keyboard, touch, programmatic) ── */
    const onScroll = () => {
      if (!ticking) {
        targetY  = getScrollY();
        currentY = getScrollY();
      }
    };

    /* ── attach listeners ── */
    const target = isEl() ? getEl() : window;
    if (!target) return;

    target.addEventListener('wheel',  onWheel,  { passive: false });
    target.addEventListener('scroll', onScroll, { passive: true  });

    return () => {
      target.removeEventListener('wheel',  onWheel);
      target.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  // Re-run when the ref's element becomes available (overlay opens)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elRef?.current]);
}
