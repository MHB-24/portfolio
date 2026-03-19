/**
 * Smooth-scroll to a target element with a custom duration and easing.
 * @param {Element} target  - DOM element to scroll to
 * @param {number}  duration - scroll duration in ms (default 1200)
 * @param {number}  offset   - px to subtract from final position (for fixed nav)
 */
export function smoothScrollTo(target, duration = 1200, offset = 90) {
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + start - offset;
  const distance = end - start;
  let startTime = null;

  function easeInOutQuint(t) {
    return t < 0.5
      ? 16 * t * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 5) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutQuint(progress);

    window.scrollTo(0, start + distance * ease);

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
