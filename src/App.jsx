import { useState, useCallback, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import Overlay from './components/Overlay';

/* Pause / resume Lenis whenever the overlay is open */
function LenisOverlaySync({ active }) {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    active ? lenis.stop() : lenis.start();
  }, [lenis, active]);
  return null;
}

export default function App() {
  const [activeOverlay, setActiveOverlay] = useState(null);

  const openOverlay   = useCallback(id => setActiveOverlay(id),   []);
  const closeOverlay  = useCallback(()  => setActiveOverlay(null), []);
  const switchOverlay = useCallback(id => setActiveOverlay(id),   []);

  return (
    <ReactLenis
      root
      options={{
        lerp:        0.05,   // smoothness (lower = silkier)
        duration:    1.8,    // scroll animation duration in seconds
        smoothWheel: true,   // smooth mouse-wheel scroll
        wheelMultiplier: 1,  // wheel intensity — 1 = normal
        touchMultiplier: 2,  // touch scroll multiplier
      }}
    >
      {/* Pause Lenis while an overlay is open so they don't conflict */}
      <LenisOverlaySync active={!!activeOverlay} />

      <Nav />

      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        <Hero />
        <Work onOpen={openOverlay} />
        <Experience />
        <About />
        <Contact />
      </div>

      <Overlay
        activeId={activeOverlay}
        onClose={closeOverlay}
        onSwitch={switchOverlay}
      />
    </ReactLenis>
  );
}
