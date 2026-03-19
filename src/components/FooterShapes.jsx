import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;

/* ── colours ─────────────────────────────────────── */
const Y = '#F7C624';   // yellow
const P = '#EF3FA1';   // pink
const G = '#7AD64B';   // green

/* ── shape definitions ───────────────────────────── */
const DEFS = [
  { id:  0, type: 'arc',   color: Y, r: 58,  lw: 28, sa: Math.PI * 0.5, span: Math.PI },
  { id:  1, type: 'bar',   color: P, w: 118, h: 38 },
  { id:  2, type: 'dot',   color: P, r: 17 },
  { id:  3, type: 'cross', color: P, arm: 84, thick: 28 },
  { id:  4, type: 'bar',   color: Y, w: 94,  h: 32 },
  { id:  5, type: 'arc',   color: G, r: 70,  lw: 32, sa: Math.PI * 0.5, span: Math.PI },
  { id:  6, type: 'cross', color: G, arm: 68, thick: 24 },
  { id:  7, type: 'arc',   color: G, r: 54,  lw: 26, sa: 0,              span: Math.PI * 1.5 },
  { id:  8, type: 'arc',   color: Y, r: 48,  lw: 24, sa: Math.PI * 0.3, span: Math.PI * 1.1 },
  { id:  9, type: 'dot',   color: P, r: 21 },
  { id: 10, type: 'arc',   color: G, r: 42,  lw: 22, sa: Math.PI * 0.5, span: Math.PI * 1.3 },
];

/* ── physics body factory ────────────────────────── */
function makeBody(def, x, y) {
  const base = { isStatic: true, friction: 0.6, restitution: 0.25, frictionAir: 0.025, label: String(def.id) };
  if (def.type === 'dot')   return Bodies.circle(x, y, def.r, base);
  if (def.type === 'arc')   return Bodies.circle(x, y, def.r, base);
  if (def.type === 'bar')   return Bodies.rectangle(x, y, def.w, def.h, base);
  if (def.type === 'cross') {
    return Body.create({
      ...base,
      parts: [
        Bodies.rectangle(x, y, def.arm, def.thick),
        Bodies.rectangle(x, y, def.thick, def.arm),
      ],
    });
  }
  return Bodies.circle(x, y, 40, base);
}

/* ── canvas drawing ──────────────────────────────── */
function drawShape(ctx, def, x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  switch (def.type) {
    case 'dot':
      ctx.beginPath();
      ctx.arc(0, 0, def.r, 0, Math.PI * 2);
      ctx.fillStyle = def.color;
      ctx.fill();
      break;

    case 'bar':
      ctx.fillStyle = def.color;
      ctx.beginPath();
      ctx.roundRect(-def.w / 2, -def.h / 2, def.w, def.h, def.h / 2);
      ctx.fill();
      break;

    case 'arc':
      ctx.beginPath();
      ctx.arc(0, 0, def.r, def.sa, def.sa + def.span);
      ctx.strokeStyle = def.color;
      ctx.lineWidth = def.lw;
      ctx.lineCap = 'round';
      ctx.stroke();
      break;

    case 'cross':
      ctx.fillStyle = def.color;
      ctx.beginPath();
      ctx.roundRect(-def.arm / 2, -def.thick / 2, def.arm, def.thick, def.thick / 2);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(-def.thick / 2, -def.arm / 2, def.thick, def.arm, def.thick / 2);
      ctx.fill();
      break;

    default: break;
  }
  ctx.restore();
}

/* ── component ───────────────────────────────────── */
export default function FooterShapes() {
  const canvasRef  = useRef(null);
  const triggered  = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const ctx    = canvas.getContext('2d');

    const W = parent.offsetWidth;
    const H = parent.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    /* engine */
    const engine = Engine.create({ gravity: { y: 2.8 } });
    const world  = engine.world;

    /* boundaries */
    Composite.add(world, [
      Bodies.rectangle(W / 2,  H + 30,  W + 100, 60,  { isStatic: true, label: 'wall' }),
      Bodies.rectangle(-30,    H / 2,   60, H * 3,    { isStatic: true, label: 'wall' }),
      Bodies.rectangle(W + 30, H / 2,   60, H * 3,    { isStatic: true, label: 'wall' }),
    ]);

    /* spread shapes across width, starting above the section */
    const items = DEFS.map((def, i) => {
      const rx   = 0.05 + (i / (DEFS.length - 1)) * 0.90;
      const x    = W * rx + (Math.random() - 0.5) * 50;
      const y    = -80 - Math.random() * 320;
      const body = makeBody(def, x, y);
      Composite.add(world, body);
      return { body, def };
    });

    /* mouse drag – disable wheel capture so Lenis still scrolls */
    const mouse = Mouse.create(canvas);
    canvas.removeEventListener('wheel',         mouse.mousewheel);
    canvas.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.14, damping: 0.08, render: { visible: false } },
    });
    Composite.add(world, mc);

    /* cursor feedback */
    Matter.Events.on(mc, 'startdrag',  () => { canvas.style.cursor = 'grabbing'; });
    Matter.Events.on(mc, 'enddrag',    () => { canvas.style.cursor = 'grab'; });

    /* RAF render loop */
    let rafId;
    let last = performance.now();
    const loop = (now) => {
      rafId = requestAnimationFrame(loop);
      Engine.update(engine, Math.min(now - last, 33));
      last = now;
      ctx.clearRect(0, 0, W, H);
      items.forEach(({ body, def }) =>
        drawShape(ctx, def, body.position.x, body.position.y, body.angle)
      );
    };
    rafId = requestAnimationFrame(loop);

    /* drop on first scroll into view */
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || triggered.current) return;
      triggered.current = true;
      items.forEach(({ body }, i) => {
        setTimeout(() => {
          Body.setStatic(body, false);
          Body.setVelocity(body,        { x: (Math.random() - 0.5) * 5, y: 2 + Math.random() * 3 });
          Body.setAngularVelocity(body,  (Math.random() - 0.5) * 0.22);
        }, i * 65);
      });
    }, { threshold: 0.2 });
    obs.observe(parent);

    return () => {
      cancelAnimationFrame(rafId);
      Composite.clear(world, false);
      Engine.clear(engine);
      obs.disconnect();
      Mouse.clearSourceEvents(mouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 0,
        cursor: 'grab',
      }}
    />
  );
}
