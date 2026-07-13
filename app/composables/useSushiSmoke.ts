// Canvas-based hot-food smoke: soft wisps rising from the sushi with
// layered sine turbulence, drawn as elongated radial gradients.

interface Particle {
  x0: number;
  y: number;
  vy: number;
  drift: number;
  age: number;
  life: number;
  size: number;
  growth: number;
  alpha: number;
  elong: number;
  rot: number;
  rotV: number;
  a1: number;
  a2: number;
  w1: number;
  w2: number;
  p1: number;
  p2: number;
}

export interface SmokeHandle {
  start(): void;
  stop(): void;
}

export function createSushiSmoke(
  canvas: HTMLCanvasElement,
  target: HTMLElement
): SmokeHandle {
  const ctx = canvas.getContext("2d");
  let raf = 0;
  let running = false;
  let inView = true;
  let last = 0;
  let spawnCarry = 0;
  let particles: Particle[] = [];
  let W = 0;
  let H = 0;
  let emitX = 0;
  let emitY = 0;
  let spread = 40;

  function measure() {
    const crect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = crect.width;
    H = crect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    const t = target.getBoundingClientRect();
    // The nigiri sits in the lower-left of the photo; emit from its top ridge
    emitX = t.left - crect.left + t.width * 0.33;
    emitY = t.top - crect.top + t.height * 0.6;
    spread = t.width * 0.07;
  }

  function spawn() {
    const puff = Math.random() < 0.25;
    particles.push({
      x0: emitX + (Math.random() - 0.5) * 2 * spread,
      y: emitY + (Math.random() - 0.5) * 10,
      vy: 26 + Math.random() * 26,
      drift: (Math.random() - 0.5) * 9,
      age: 0,
      life: 3.5 + Math.random() * 3,
      size: puff ? 22 + Math.random() * 14 : 9 + Math.random() * 8,
      growth: puff ? 16 + Math.random() * 8 : 10 + Math.random() * 9,
      alpha: puff ? 0.045 + Math.random() * 0.02 : 0.09 + Math.random() * 0.05,
      elong: puff ? 1.05 : 1.5 + Math.random() * 0.8,
      rot: (Math.random() - 0.5) * 0.9,
      rotV: (Math.random() - 0.5) * 0.25,
      a1: 10 + Math.random() * 16,
      a2: 4 + Math.random() * 7,
      w1: 0.5 + Math.random() * 0.5,
      w2: 1.4 + Math.random() * 1.1,
      p1: Math.random() * Math.PI * 2,
      p2: Math.random() * Math.PI * 2,
    });
  }

  function frame(now: number) {
    if (!running || !ctx) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    // ~7 wisps per second, capped
    spawnCarry += dt * 7;
    while (spawnCarry >= 1 && particles.length < 42) {
      spawnCarry -= 1;
      spawn();
    }
    spawnCarry = Math.min(spawnCarry, 2);

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    particles = particles.filter((p) => {
      p.age += dt;
      if (p.age >= p.life || p.y < -80) return false;

      p.vy *= 1 - 0.04 * dt;
      p.y -= p.vy * dt;
      p.rot += p.rotV * dt;

      const k = p.age / p.life;
      const swell = k * (2 - k); // spreads more as it rises
      const x =
        p.x0 +
        p.drift * p.age +
        Math.sin(p.age * p.w1 + p.p1) * p.a1 * swell +
        Math.sin(p.age * p.w2 + p.p2) * p.a2 * swell;

      const fadeIn = Math.min(1, p.age / (p.life * 0.18));
      const out = Math.max(0, (p.age - p.life * 0.45) / (p.life * 0.55));
      const alpha = p.alpha * fadeIn * (1 - out * out);
      if (alpha <= 0.002) return true;

      const r = p.size + p.growth * p.age;
      ctx.save();
      ctx.translate(x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(0.6, p.elong);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
      g.addColorStop(0, `rgba(216, 222, 232, ${alpha})`);
      g.addColorStop(0.5, `rgba(210, 217, 229, ${alpha * 0.35})`);
      g.addColorStop(1, "rgba(205, 212, 226, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return true;
    });

    raf = requestAnimationFrame(frame);
  }

  function resume() {
    if (!running || !inView || raf) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function pause() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  const onResize = () => measure();
  // Don't burn frames while the hero is scrolled out of view
  const io = new IntersectionObserver(([entry]) => {
    inView = !!entry?.isIntersecting;
    if (inView) resume();
    else pause();
  });

  return {
    start() {
      if (running) return;
      running = true;
      measure();
      window.addEventListener("resize", onResize);
      io.observe(canvas);
      resume();
    },
    stop() {
      running = false;
      pause();
      window.removeEventListener("resize", onResize);
      io.disconnect();
      particles = [];
      ctx?.clearRect(0, 0, W, H);
    },
  };
}
