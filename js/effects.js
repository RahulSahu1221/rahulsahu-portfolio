/* ==========================================================================
   EFFECTS.JS — ambient/visual effects: cursor, glass blobs, hero metaball,
   ambient network canvas + sparkle cursor trail, scroll-driven reveal/parallax/
   tilt/counters, experience wire timeline, contact watermark, skills physics
   cloud. Requires core.js loaded first. Must load AFTER features.js (see
   physics-cloud.js section header re: skills-chips.js ordering).
   Consolidated from: cursor.js, blobs.js, metaball.js, canvas-effects.js,
   scroll-animations.js, wire-timeline.js, contact-watermark.js, physics-cloud.js
   ========================================================================== */

/* ============================================================================
   1. CURSOR.JS — adaptive cursor: precision dot + spring-damped ring
   ============================================================================ */

/* ==========================================================================
   ADAPTIVE CURSOR
   - A small dot tracks the pointer with zero lag (for precision).
   - A translucent ring trails it using a real critically-damped spring
     (not a linear lerp) — this is what makes it feel expensive rather
     than "cursor-follower tutorial #4".
   - Ring squashes/stretches slightly along its direction of travel,
     proportional to velocity — same idea iOS uses for scroll bounce.
   - Hovering any [data-cursor-label] element grows the ring into a soft
     pill and shows that label; hovering plain interactive elements just
     grows the ring. No color gimmicks, no blend-mode tricks.
   ========================================================================== */
(function () {
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  // Simple mode rule (Item 1): the custom cursor never initializes here.
  // The OS pointer is restored by a CSS override in responsive.css, and
  // the .cursor/.cursor-ring elements are hidden by the same rule — so
  // returning early here is safe, nothing is left half-set-up.
  if (document.documentElement.getAttribute('data-mode') === 'simple') return;
  const perf = window.PortfolioPerf;

  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  const label = document.getElementById('cursorLabel');
  if (!dot || !ring) return;

  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my, vx = 0, vy = 0;
  const K = 0.16;   // spring stiffness
  const D = 0.72;   // damping

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function frame() {
    dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;

    const fx = (mx - rx) * K;
    const fy = (my - ry) * K;
    vx = (vx + fx) * D;
    vy = (vy + fy) * D;
    rx += vx; ry += vy;

    const speed = Math.min(Math.hypot(vx, vy), 18);
    const angle = Math.atan2(vy, vx) * (180 / Math.PI);
    const stretch = 1 + speed * 0.018;
    const squash = 1 - speed * 0.012;

    ring.style.transform = `translate3d(${rx - ring.offsetWidth / 2}px, ${ry - ring.offsetHeight / 2}px, 0) rotate(${angle}deg) scale(${stretch}, ${squash})`;
  }
  perf.subscribe(frame);

  let currentTarget = null;
  function findLabelTarget(el) {
    return el && el.closest ? el.closest('[data-cursor-label]') : null;
  }
  function findInteractiveTarget(el) {
    return el && el.closest ? el.closest('a, button, [data-magnetic], .cmdk-item') : null;
  }

  document.addEventListener('mouseover', e => {
    const labelTarget = findLabelTarget(e.target);
    const interactiveTarget = findInteractiveTarget(e.target);
    if (labelTarget) {
      currentTarget = labelTarget;
      ring.classList.add('ring-label');
      ring.classList.remove('ring-hover');
      if (label) label.textContent = labelTarget.getAttribute('data-cursor-label') || '';
    } else if (interactiveTarget) {
      currentTarget = interactiveTarget;
      ring.classList.add('ring-hover');
      ring.classList.remove('ring-label');
    }
  });
  document.addEventListener('mouseout', e => {
    const stillLabel = findLabelTarget(e.relatedTarget);
    const stillInteractive = findInteractiveTarget(e.relatedTarget);
    if (!stillLabel && !stillInteractive) {
      ring.classList.remove('ring-hover', 'ring-label');
      currentTarget = null;
    }
  });
  document.addEventListener('mousedown', () => ring.classList.add('ring-press'));
  document.addEventListener('mouseup', () => ring.classList.remove('ring-press'));
})();

/* ============================================================================
   2. BLOBS.JS — irregular liquid-glass decorative shapes
   ============================================================================ */

/* ==========================================================================
   GLASS BLOBS — irregular, liquid-glass decorative shapes.
   Each blob is an SVG circle pushed through feTurbulence + feDisplacementMap
   to break its outline into an organic, non-circular silhouette, with an
   inner highlight and soft rim to read as glass rather than a blurred dot.

   Fix: the blob layer is `position: fixed; inset: 0; overflow: hidden`
   (a full-viewport overlay, by design — cheap, always-on ambient backdrop).
   The previous blob positions assumed the layer scrolled with the page
   (one spec used top: 130vh), so most of them were silently clipped by
   the fixed container and never actually rendered. Positions below are
   all within the visible viewport, and instead of relying on scroll to
   "reveal" different blobs, each blob now visibly reacts to BOTH the
   mouse (parallax) and scroll position (bounded oscillating drift) on
   top of its own slow autonomous motion — three motion sources layered
   together, which is what actually reads as "floating".
   ========================================================================== */
(function () {
  function makeBlob({ id, size, hue1, hue2, top, left, right, bottom, seed }) {
    const highlightX = size * 0.34, highlightY = size * 0.3;
    return `
    <div class="glass-blob" data-blob-id="${id}" style="width:${size}px;height:${size}px;${top !== undefined ? `top:${top};` : ''}${left !== undefined ? `left:${left};` : ''}${right !== undefined ? `right:${right};` : ''}${bottom !== undefined ? `bottom:${bottom};` : ''}">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo-${id}" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="${seed}" result="noise">
              <animate attributeName="baseFrequency" dur="34s" values="0.010;0.018;0.010" repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="34" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <radialGradient id="fill-${id}" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="${hue1}" stop-opacity="0.55"/>
            <stop offset="60%" stop-color="${hue2}" stop-opacity="0.22"/>
            <stop offset="100%" stop-color="${hue2}" stop-opacity="0.04"/>
          </radialGradient>
          <radialGradient id="hl-${id}" cx="35%" cy="30%" r="30%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <g filter="url(#goo-${id})">
          <circle cx="100" cy="100" r="82" fill="url(#fill-${id})" stroke="rgba(255,255,255,0.18)" stroke-width="1.4"/>
        </g>
        <circle cx="${highlightX}" cy="${highlightY}" r="${size * 0.16}" fill="url(#hl-${id})"/>
      </svg>
    </div>`;
  }

  function init() {
    const layer = document.getElementById('glass-blob-layer');
    if (!layer) return;
    // Simple mode rule (Item 1): skip building the blobs entirely — they
    // use animated SVG filters (feTurbulence/feDisplacementMap) which,
    // unlike a plain canvas, keep animating even while hidden with CSS,
    // so returning here before any of that is created is the only way
    // to actually stop the cost, not just hide the result.
    if (document.documentElement.getAttribute('data-mode') === 'simple') return;
    const perf = window.PortfolioPerf;

    // Session-unique variation: each blob's turbulence seed is randomized
    // per page load, so no two visits render pixel-identical background art.
    const allSpecs = [
      { id: 'a', size: 380, hue1: '#c8a96e', hue2: '#4a9eff', top: '4vh',  left: '-3vw',  seed: Math.floor(Math.random()*100), mouseDepth: 16, scrollAmp: 34, scrollFreq: 0.0011, scrollDir: 1,  phase: 0.0 },
      { id: 'b', size: 300, hue1: '#4a9eff', hue2: '#c8a96e', top: '56vh', right: '-2vw', seed: Math.floor(Math.random()*100), mouseDepth: 10, scrollAmp: 26, scrollFreq: 0.0014, scrollDir: -1, phase: 1.4 },
      { id: 'c', size: 230, hue1: '#a78bfa', hue2: '#4a9eff', top: '30vh', left: '26vw',  seed: Math.floor(Math.random()*100), mouseDepth: 20, scrollAmp: 40, scrollFreq: 0.0009, scrollDir: 1,  phase: 2.8 },
      { id: 'd', size: 270, hue1: '#c8a96e', hue2: '#34d399', bottom: '2vh', right: '10vw', seed: Math.floor(Math.random()*100), mouseDepth: 8,  scrollAmp: 22, scrollFreq: 0.0016, scrollDir: -1, phase: 4.2 },
    ];
    const specs = perf && perf.tier === 'low' ? allSpecs.slice(0, 2) : allSpecs;
    layer.innerHTML = specs.map(makeBlob).join('');

    const blobs = Array.from(layer.querySelectorAll('.glass-blob')).map((el, i) => ({ el, spec: specs[i] }));

    let mx = 0, my = 0; // normalized -0.5..0.5
    document.addEventListener('mousemove', e => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    });

    let t = 0;
    function frame(ts, dt) {
      t += 0.003 * (dt / 16.7);
      const sy = window.scrollY;
      blobs.forEach(({ el, spec }, i) => {
        // 1) slow autonomous drift (organic idle motion)
        const ax = Math.sin(t + i * 2.1) * 16;
        const ay = Math.cos(t * 0.8 + i * 1.7) * 14;
        // 2) mouse parallax (deeper blobs move more — real depth cue)
        const mxOff = mx * spec.mouseDepth;
        const myOff = my * spec.mouseDepth * 0.7;
        // 3) bounded, oscillating scroll reactivity (never drifts away permanently)
        const scrollOff = Math.sin(sy * spec.scrollFreq + spec.phase) * spec.scrollAmp * spec.scrollDir;
        el.style.transform = `translate3d(${ax + mxOff}px, ${ay + myOff + scrollOff}px, 0)`;
      });
    }
    if (perf && !perf.reducedMotion) perf.subscribe(frame, { heavy: true });
  }

  document.addEventListener('DOMContentLoaded', init);
})();

/* ============================================================================
   3. METABALL.JS — hero section liquid-glass metaball canvas
   ============================================================================ */

/* ==========================================================================
   METABALL BLOB — liquid-glass background object for the hero section.
   Same goo technique as before (blur+contrast fusion of soft circles),
   but now: capped canvas resolution and blur radius on lower-tier devices,
   paused entirely when the hero is off-screen, and driven by the shared
   ticker instead of its own rAF loop — this was the single heaviest
   effect on the page, so it gets the most aggressive scaling.
   ========================================================================== */
(function () {
  const canvas = document.getElementById('metaball-canvas');
  if (!canvas) return;
  // Simple mode rule (Item 1): no metaball canvas setup at all in this mode.
  if (document.documentElement.getAttribute('data-mode') === 'simple') return;
  const ctx = canvas.getContext('2d');
  const perf = window.PortfolioPerf;
  const supportsFilter = 'filter' in ctx;
  let w, h;
  const dpr = perf.tier === 'high' ? Math.min(window.devicePixelRatio || 1, 1.6) : 1;
  const blurFactor = perf.tier === 'low' ? 0.028 : perf.tier === 'mid' ? 0.036 : 0.045;
  let mx = 0.7, my = 0.5, tmx = 0.7, tmy = 0.5;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = Math.round(rect.width * dpr);
    h = canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200); });

  document.addEventListener('mousemove', e => {
    tmx = e.clientX / window.innerWidth;
    tmy = e.clientY / window.innerHeight;
  });

  const balls = [
    { a: 0.0, spd: 0.31, rx: 0.20, ry: 0.16, rr: 0.15 },
    { a: 1.4, spd: 0.23, rx: 0.14, ry: 0.20, rr: 0.11 },
    { a: 2.6, spd: 0.27, rx: 0.17, ry: 0.12, rr: 0.09 },
    { a: 4.2, spd: 0.19, rx: 0.11, ry: 0.15, rr: 0.07 },
  ];
  const activeBalls = perf.tier === 'low' ? balls.slice(0, 3) : balls;

  function colors() {
    const cs = getComputedStyle(document.body);
    return {
      accent: cs.getPropertyValue('--accent').trim() || '#c8a96e',
      accent2: cs.getPropertyValue('--accent2').trim() || '#4a9eff',
      light: document.body.classList.contains('light-mode'),
    };
  }

  function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${alpha})`;
  }

  let t = 0;
  function frame(ts, dt) {
    if (!w || !h) return;
    t += 0.006 * (dt / 16.7);
    mx += (tmx - mx) * 0.03; my += (tmy - my) * 0.03;
    const { accent, accent2, light } = colors();
    const cx = w * (0.5 + (mx - 0.5) * 0.18);
    const cy = h * (0.5 + (my - 0.5) * 0.18);
    const baseR = Math.min(w, h);

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    if (supportsFilter) ctx.filter = 'blur(' + (baseR * blurFactor) + 'px) contrast(24)';

    activeBalls.forEach((b, i) => {
      const ang = t * b.spd + b.a;
      const bx = cx + Math.cos(ang) * baseR * b.rx + Math.sin(t * 0.4 + i) * baseR * 0.02;
      const by = cy + Math.sin(ang * 1.3) * baseR * b.ry;
      const r = baseR * b.rr * (1 + 0.08 * Math.sin(t * 1.7 + i * 2));
      ctx.beginPath();
      ctx.fillStyle = i % 2 === 0 ? accent : accent2;
      ctx.arc(bx, by, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    const tint = ctx.createLinearGradient(0, 0, w, h);
    tint.addColorStop(0, hexToRgba(accent, light ? 0.30 : 0.34));
    tint.addColorStop(1, hexToRgba(accent2, light ? 0.20 : 0.26));
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, w, h);

    const hl = ctx.createRadialGradient(cx - baseR * 0.06, cy - baseR * 0.08, 0, cx, cy, baseR * 0.34);
    hl.addColorStop(0, 'rgba(255,255,255,0.35)');
    hl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hl;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  document.addEventListener('DOMContentLoaded', () => {
    resize();
    perf.subscribe(frame, { el: canvas, heavy: true });
  });
})();

/* ============================================================================
   4. CANVAS-EFFECTS.JS — ambient network graph + sparkling star cursor trail
   ============================================================================ */

/* ==========================================================================
   CANVAS EFFECTS — ambient network graph, cursor sparkle trail
   All three now subscribe to the shared PortfolioPerf ticker instead of
   running their own requestAnimationFrame loop, and pause automatically
   when their canvas is off-screen. Particle counts scale down on lower-tier
   devices so nothing is dropped — just lighter.
   ========================================================================== */

/* ---------- Ambient network graph (fixed full-page backdrop) ---------- */
(function () {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  // Simple mode rule (Item 1): the ambient network canvas is replaced by
  // a plain static CSS gradient (see responsive.css) — skip its whole
  // setup, including the resize/mousemove listeners it would otherwise
  // attach for the rest of the page's life.
  if (document.documentElement.getAttribute('data-mode') === 'simple') return;
  const ctx = canvas.getContext('2d');
  const perf = window.PortfolioPerf;
  let w, h, nodes = [];
  const COUNT = perf.tier === 'low' ? 26 : perf.tier === 'mid' ? 40 : 60;
  const DIST = 200;
  let mx = innerWidth / 2, my = innerHeight / 2;

  function resize() { w = canvas.width = innerWidth; h = canvas.height = innerHeight; nodes = Array.from({ length: COUNT }, () => new Node()); }
  window.addEventListener('resize', debounce(resize, 200));
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

  class Node {
    constructor() { this.x = Math.random() * w; this.y = Math.random() * h; this.vx = (Math.random() - 0.5) * 0.25; this.vy = (Math.random() - 0.5) * 0.25; this.r = Math.random() * 1.4 + 0.8; }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < -50) this.x = w + 50; if (this.x > w + 50) this.x = -50;
      if (this.y < -50) this.y = h + 50; if (this.y > h + 50) this.y = -50;
    }
  }

  function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${alpha})`;
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    const isLight = document.body.classList.contains('light-mode');
    const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#c8a96e';
    const ox = (mx - w / 2) * 0.015, oy = (my - h / 2) * 0.015;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DIST) {
          ctx.strokeStyle = hexToRgba(accent, (1 - dist / DIST) * (isLight ? 0.07 : 0.15));
          ctx.beginPath();
          ctx.moveTo(nodes[i].x + ox, nodes[i].y + oy);
          ctx.lineTo(nodes[j].x + ox, nodes[j].y + oy);
          ctx.stroke();
        }
      }
      nodes[i].update();
      ctx.beginPath();
      ctx.arc(nodes[i].x + ox, nodes[i].y + oy, nodes[i].r, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(accent, isLight ? 0.35 : 0.55);
      ctx.fill();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    resize();
    perf.subscribe(frame, { heavy: true });
  });
})();

/* ---------- Sparkling Star Cursor + Mouse-Attracting Particles ---------- */
(function() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  // Simple mode rule (Item 1): same treatment as the other canvases above.
  if (document.documentElement.getAttribute('data-mode') === 'simple') return;
  const perf = window.PortfolioPerf;
  if (perf.reducedMotion) return;
  const ctx = canvas.getContext('2d');
  
  let W, H;
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Scale star count based on device tier
  const STAR_COUNT = perf.tier === 'low' ? 50 : perf.tier === 'mid' ? 85 : 120;
  const stars = [];

  class Star {
    constructor(fromMouse) {
      this.reset(fromMouse);
    }
    reset(fromMouse) {
      if (fromMouse) {
        this.x = mouseX + (Math.random() - 0.5) * 40;
        this.y = mouseY + (Math.random() - 0.5) * 40;
      } else {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
      }
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.radius = Math.random() * 1.4 + 0.4;
      this.maxRadius = this.radius * 4.5;
      this.alpha = Math.random() * 0.5 + 0.15;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.attractDist = 110 + Math.random() * 70;
      this.sparkling = false;
      this.sparkAlpha = 0;
      this.sparkSize = 0;
      this.sparkDecay = 0;
    }
    update(t) {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;

      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < this.attractDist && dist > 0) {
        const force = (1 - dist / this.attractDist) * 0.06;
        this.vx += dx / dist * force;
        this.vy += dy / dist * force;
        const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (spd > 1.8) { this.vx = this.vx / spd * 1.8; this.vy = this.vy / spd * 1.8; }
        
        if (dist < 55 && !this.sparkling && Math.random() < 0.12) {
          this.sparkling = true;
          this.sparkAlpha = 1;
          this.sparkSize = this.maxRadius;
          this.sparkDecay = 0.04 + Math.random() * 0.04;
        }
      } else {
        this.vx *= 0.97;
        this.vy *= 0.97;
      }

      if (this.sparkling) {
        this.sparkAlpha -= this.sparkDecay;
        this.sparkSize *= 0.92;
        if (this.sparkAlpha <= 0) this.sparkling = false;
      }
      this.twinklePhase += this.twinkleSpeed;
    }
    draw(isLight) {
      const twinkle = 0.5 + 0.5 * Math.sin(this.twinklePhase);
      const a = this.alpha * (0.6 + 0.4 * twinkle);
      const r = this.radius * (0.85 + 0.3 * twinkle);
      const gold = isLight ? '160,120,64' : '200,169,110';

      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${gold},${a})`;
      ctx.fill();

      if (twinkle > 0.5) {
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 4);
        grd.addColorStop(0, `rgba(${gold},${a * 0.35})`);
        grd.addColorStop(1, `rgba(${gold},0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      if (this.sparkling && this.sparkAlpha > 0) {
        const sa = this.sparkAlpha;
        const ss = this.sparkSize;
        ctx.save();
        ctx.globalAlpha = sa;
        ctx.strokeStyle = `rgba(${gold},${sa})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(this.x - ss, this.y); ctx.lineTo(this.x + ss, this.y);
        ctx.moveTo(this.x, this.y - ss); ctx.lineTo(this.x, this.y + ss);
        const d = ss * 0.6;
        ctx.moveTo(this.x - d, this.y - d); ctx.lineTo(this.x + d, this.y + d);
        ctx.moveTo(this.x + d, this.y - d); ctx.lineTo(this.x - d, this.y + d);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, ss * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,200,${sa})`;
        ctx.fill();
        ctx.restore();
      }
    }
  }

  for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star(false));

  let lastMX = mouseX, lastMY = mouseY, spawnAccum = 0;
  document.addEventListener('mousemove', e => {
    const spd = Math.sqrt((e.clientX - lastMX) ** 2 + (e.clientY - lastMY) ** 2);
    spawnAccum += spd * 0.015;
    lastMX = e.clientX; lastMY = e.clientY;
    mouseX = e.clientX; mouseY = e.clientY;
  });

  let t = 0;
  function frame(ts, dt) {
    ctx.clearRect(0, 0, W, H);
    t += 0.001 * dt;
    const isLight = document.body.classList.contains('light-mode');

    if (spawnAccum > 1) {
      spawnAccum -= 1;
      const s = stars.find(st => !st.sparkling && Math.sqrt((st.x-mouseX)**2+(st.y-mouseY)**2) > 200);
      if (s) {
        s.x = mouseX + (Math.random() - 0.5) * 20;
        s.y = mouseY + (Math.random() - 0.5) * 20;
        s.vx = (Math.random() - 0.5) * 1.5;
        s.vy = (Math.random() - 0.5) * 1.5;
        s.sparkling = true;
        s.sparkAlpha = 0.9;
        s.sparkSize = s.maxRadius * 1.2;
        s.sparkDecay = 0.05 + Math.random() * 0.03;
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].update(t);
      const di = Math.sqrt((stars[i].x - mouseX) ** 2 + (stars[i].y - mouseY) ** 2);
      if (di < 160) {
        for (let j = i + 1; j < stars.length; j++) {
          const dj = Math.sqrt((stars[j].x - mouseX) ** 2 + (stars[j].y - mouseY) ** 2);
          if (dj < 160) {
            const d = Math.sqrt((stars[i].x - stars[j].x) ** 2 + (stars[i].y - stars[j].y) ** 2);
            if (d < 90) {
              const a = (1 - d / 90) * 0.12 * (1 - di / 160);
              ctx.beginPath();
              ctx.strokeStyle = isLight ? `rgba(160,120,64,${a})` : `rgba(200,169,110,${a})`;
              ctx.lineWidth = 0.6;
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              ctx.stroke();
            }
          }
        }
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].draw(isLight);
    }
  }

  // Connects the logic to your new shared performance ticker
  perf.subscribe(frame, { heavy: true });
})();
/* ============================================================================
   5. SCROLL-ANIMATIONS.JS — section reveals, stagger, scroll-glass, counters, tilt, parallax, timelines
   ============================================================================ */

/* ==========================================================================
   SCROLL ANIMATIONS — spatial section reveals, staggered card entrances,
   scroll-glass edge blur, counters, spring-based card tilt, parallax.
   Parallax now runs on the shared PortfolioPerf ticker instead of its own
   loop. Scroll-glass no longer measures every card on every scroll frame —
   only cards currently flagged "near an edge" by an IntersectionObserver
   get a getBoundingClientRect() call, so cost scales with what's near the
   fold, not with total card count.
   ========================================================================== */
(function () {
  const perf = window.PortfolioPerf;
  const lerp = (a, b, f) => a + (b - a) * f;

  function initSpatialSections() {
    const sections = document.querySelectorAll('.section-spatial');
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.remove('out');
          el.classList.add('in');
        } else if (el.classList.contains('in')) {
          // Only play the "recede" exit once it's actually been seen —
          // otherwise sections below the fold would exit-animate on load.
          el.classList.remove('in');
          el.classList.add('out');
        }
      });
    }, { threshold: 0.12 });
    sections.forEach(s => io.observe(s));
  }

  function initStagger() {
    const els = document.querySelectorAll('[data-anim]');
    els.forEach(el => {
      const delay = el.getAttribute('data-delay');
      if (delay !== null) el.style.transitionDelay = delay + 'ms';
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.remove('out');
          el.classList.add('in');
        } else if (el.classList.contains('in')) {
          el.classList.remove('in');
          el.classList.add('out');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
  }

  /* Scroll-glass: only cards within ~180px of the viewport top/bottom edge
     are measured per scroll frame. Everything else is either fully clear
     (blur = 0, set once) or not yet relevant. */
  function initScrollGlass() {
    const cards = Array.from(document.querySelectorAll('.scroll-glass'));
    if (!cards.length) return;
    const nearEdge = new Set();

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) nearEdge.add(entry.target);
        else { nearEdge.delete(entry.target); entry.target.style.setProperty('--scroll-blur', '0px'); }
      });
    }, { rootMargin: '-0px 0px -0px 0px', threshold: buildThresholds() });

    function buildThresholds() { const t = []; for (let i = 0; i <= 20; i++) t.push(i / 20); return t; }
    cards.forEach(c => io.observe(c));

    let ticking = false;
    function measure() {
      const vh = innerHeight, zone = 140;
      nearEdge.forEach(card => {
        const r = card.getBoundingClientRect();
        const edge = Math.min(r.top, vh - r.bottom);
        const proximity = Math.max(0, 1 - Math.max(edge, 0) / zone);
        card.style.setProperty('--scroll-blur', (proximity * 10).toFixed(1) + 'px');
      });
      ticking = false;
    }
    document.addEventListener('scroll', () => {
      if (ticking || nearEdge.size === 0) return;
      ticking = true;
      requestAnimationFrame(measure);
    }, { passive: true });
  }

  function initCounters() {
    document.querySelectorAll('.stat-val, .counter-num').forEach(el => { el.dataset.originalText = el.textContent.trim(); });
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (!entry.isIntersecting || el.dataset.animating === 'true') { if (!entry.isIntersecting) el.dataset.animating = 'false'; return; }
        el.dataset.animating = 'true';
        const match = el.dataset.originalText.match(/^(\D*)(\d*\.?\d+)(\D*)$/);
        if (!match) return;
        const [, prefix, numStr, suffix] = match;
        const target = parseFloat(numStr);
        const isFloat = numStr.includes('.');
        let start = null;
        function frame(t) {
          if (!start) start = t;
          const p = Math.min((t - start) / 1000, 1);
          const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          const cur = target * ease;
          el.textContent = `${prefix}${isFloat ? cur.toFixed(2) : Math.floor(cur)}${suffix}`;
          if (p < 1) requestAnimationFrame(frame); else el.textContent = el.dataset.originalText;
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.stat-val, .counter-num').forEach(el => io.observe(el));
  }

  /* iOS-flavored tilt: gentle, spring-eased on release, capped rotation so
     it reads as "responsive material" rather than a gimmicky 3D flip. */
  function initTilt() {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.project-card, .cert-card, .exp-card, .bento-tile').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rotX = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -3.5;
        const rotY = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 3.5;
        card.style.transition = 'transform 0.12s linear';
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)';
        card.style.transform = '';
      });
      // iOS-style press feedback
      card.addEventListener('mousedown', () => { card.style.transition = 'transform 0.15s cubic-bezier(0.4,0,0.2,1)'; card.style.transform += ' scale(0.98)'; });
      card.addEventListener('mouseup', () => { card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'; card.style.transform = card.style.transform.replace(' scale(0.98)', ''); });
    });
  }

  function initHeroPhotoTilt() {
    const heroImg = document.querySelector('.hero-photo');
    const hero = document.querySelector('.hero');
    if (!heroImg || !hero) return;
    hero.addEventListener('mousemove', e => {
      const x = (innerWidth / 2 - e.clientX) / 45;
      const y = (innerHeight / 2 - e.clientY) / 45;
      heroImg.style.transform = `translate(${x}px, ${y}px) scale(1.00)`;
    });
  }

  /* Hero photo — scroll-triggered arrive/recede, layered on top of the
     one-time load-in keyframe and the continuous float (both untouched). */
  function initHeroScrollLayer() {
    const wrap = document.querySelector('.hero-photo-wrap');
    const heroSection = document.querySelector('.hero');
    if (!wrap || !heroSection) return;
    let everSeen = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          wrap.classList.remove('hero-receded');
          everSeen = true;
        } else if (everSeen) {
          wrap.classList.add('hero-receded');
        }
      });
    }, { threshold: 0.15 });
    io.observe(heroSection);
  }

  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    const railFill = document.getElementById('scroll-rail-fill');
    if (!bar && !railFill) return;
    // The top bar hands off entirely to native CSS scroll-driven
    // animation where supported (see the @supports block in main.css) —
    // zero JS involvement, runs on the compositor thread instead of the
    // main thread. Feature-detected rather than assumed, so browsers
    // without support keep getting the exact same JS-driven behavior as
    // before. The side rail keeps using JS either way (it animates
    // `height`, a layout property that scroll-driven animation isn't
    // well suited to), so this migration is deliberately scoped to just
    // the one element that's a clean fit.
    const barIsNative = !!(bar && window.CSS && CSS.supports && CSS.supports('animation-timeline', 'scroll()'));
    let ticking = false;
    document.addEventListener('scroll', () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const p = max > 0 ? scrollY / max : 0;
        if (bar && !barIsNative) bar.style.transform = `scaleX(${p})`;
        if (railFill) railFill.style.height = (p * 100) + '%';
        ticking = false;
      });
    }, { passive: true });
  }

  /* Parallax — now a single ticker subscriber instead of its own loop */
  function initParallax() {
    const line = document.getElementById('energy-flow-line');
    const grid = document.getElementById('bg-depth-grid');
    let scaleY = 0, gx = 0, gy = 0, mx = innerWidth / 2, my = innerHeight / 2;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function frame() {
      const max = document.documentElement.scrollHeight - innerHeight;
      scaleY = lerp(scaleY, max > 0 ? scrollY / max : 0, 0.1);
      if (line) line.style.transform = `scaleY(${scaleY})`;
      gx = lerp(gx, (mx / innerWidth - 0.5) * -30, 0.05);
      gy = lerp(gy, (my / innerHeight - 0.5) * -30, 0.05);
      if (grid) grid.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
    }
    perf.subscribe(frame);
  }

  /* NOTE (bug audit): initThreadLine() and the .thread-line / .thread-line-fill
     CSS in components.css were leftover code from an earlier Experience
     section design. That design was replaced by the wire-timeline system
     directly below (real ids: #wire-timeline / #wire-fill / #wire-pulse),
     but the old function was never deleted — it silently did nothing on
     every page load because #experience-thread and #thread-fill never
     existed in the HTML. Removed here; see components.css and
     responsive.css for the matching CSS removal.

     initEduTimeline() and initSparkline() were removed for the same
     reason in an earlier pass — the Academic Journey vertical timeline +
     static sparkline no longer exist. Their replacement, the Horizon
     Waveform's interactive crosshair, lives in its own module below
     (see "9. SPEC-LEDGER-WAVEFORM.JS"). */

  document.addEventListener('DOMContentLoaded', () => {
    initSpatialSections();
    initStagger();
    initScrollGlass();
    initCounters();
    initTilt();
    initHeroPhotoTilt();
    initHeroScrollLayer();
    initScrollProgress();
    initParallax();
  });
})();

/* ============================================================================
   6. WIRE-TIMELINE.JS — experience section scroll-driven wire fill + pulse
   ============================================================================ */

/* ==========================================================================
   WIRE TIMELINE — scroll-driven fill + traveling pulse + node lighting.
   Same progressive-fill idiom as initEduTimeline()/initThreadLine() in
   scroll-animations.js: only runs while the container is on screen
   (IntersectionObserver-gated), driven by the shared PortfolioPerf ticker
   rather than its own scroll handler.
   ========================================================================== */
(function () {
  const perf = window.PortfolioPerf;
  const container = document.getElementById('wire-timeline');
  const fill = document.getElementById('wire-fill');
  const pulse = document.getElementById('wire-pulse');
  if (!container || !fill || !perf) return;

  const nodes = Array.from(container.querySelectorAll('.wire-node'));

  let inView = false;
  const io = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, { threshold: 0 });
  io.observe(container);

  function frame() {
    if (!inView) return;
    const r = container.getBoundingClientRect();
    const vh = innerHeight;
    // Same "reaches 75% down the viewport, completes over 85% of the
    // section's own height" curve as the Academic Journey timeline —
    // keeps the two scroll-linked timelines feeling like one system.
    const progress = Math.min(Math.max((vh * 0.75 - r.top) / (r.height * 0.85), 0), 1);
    fill.style.height = (progress * 100) + '%';

    if (pulse) {
      const atEdge = progress <= 0.005 || progress >= 0.995;
      pulse.style.top = (progress * 100) + '%';
      pulse.style.opacity = atEdge ? '0' : '1';
    }

    nodes.forEach(node => {
      const nodeRect = node.getBoundingClientRect();
      const nodeProgress = (nodeRect.top + nodeRect.height / 2 - r.top) / r.height;
      node.classList.toggle('lit', progress >= nodeProgress - 0.015);
    });
  }

  perf.subscribe(frame, { el: container });
})();
/* ============================================================================
   7. CONTACT-WATERMARK.JS — parallax + outline-to-fill CONTACT watermark
   ============================================================================ */

/* ==========================================================================
   CONTACT WATERMARK — parallax + outline-to-fill
   The giant "CONTACT" text drifts slower than scroll (parallax, sits at L0)
   and its gradient fill sweeps in as the section crosses the viewport,
   driven by the shared ticker rather than its own scroll handler.
   ========================================================================== */
(function () {
  const wm = document.querySelector('.contact-watermark');
  const fillEl = document.querySelector('.wm-fill');
  const section = document.getElementById('contact');
  const perf = window.PortfolioPerf;
  if (!wm || !fillEl || !section || !perf) return;

  let inView = false;
  const io = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, { threshold: 0 });
  io.observe(section);

  function frame() {
    if (!inView) return;
    const r = section.getBoundingClientRect();
    const vh = innerHeight;
    // Fill starts at 0% the instant the section's top edge enters the
    // viewport (bottom edge), and reaches 100% precisely when the
    // section's own bottom edge reaches the viewport's bottom edge —
    // i.e. by the time you've scrolled it fully into view, not some
    // point far beyond it. Previously the denominator (vh + height)
    // meant "complete" only happened well past the end of the page.
    const progress = Math.min(Math.max((vh - r.top) / r.height, 0), 1);
    fillEl.style.setProperty('--fill', (progress * 100) + '%');
    // Parallax: watermark shifts opposite to scroll at ~6% of normal speed
    const parallaxY = (r.top - vh / 2) * -0.06;
    wm.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
  }
  perf.subscribe(frame, { el: section });
})();

/* ============================================================================
   9. SKILLS-EVIDENCE.JS — link a skill row to the real project(s) that use it
   ============================================================================ */

/* ==========================================================================
   SKILLS EVIDENCE LINKS
   "Used in N projects" used to just silently jump to the first project in
   the list, skipping the rest whenever N > 1. Now it opens a small picker
   modal listing every project that uses this skill (project titles read
   live from the actual .project-row-title elements already in the DOM —
   not a second hand-typed list that could drift out of sync). Picking one
   closes the picker, then opens that project's own existing case-study
   modal — reusing it exactly as it already works, not rebuilding it.
   ========================================================================== */
(function () {
  const buttons = document.querySelectorAll('.skill-row-evidence[data-projects]');
  const modal = document.getElementById('evidence-modal');
  const panel = document.getElementById('evidence-modal-panel');
  const closeBtn = document.getElementById('evidence-modal-close');
  const list = document.getElementById('evidence-modal-list');
  if (!buttons.length || !modal || !panel || !closeBtn || !list) return;

  let lastTrigger = null;

  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastTrigger) { lastTrigger.focus({ preventScroll: true }); lastTrigger = null; }
  }

  function openProject(projectId) {
    const row = document.querySelector('.project-row[data-project="' + projectId + '"]');
    if (!row) return;
    // Close the picker first, then open the project — matches the 0.35s
    // closing transition on #evidence-modal above, so one modal visibly
    // finishes closing before the next one opens, instead of both
    // fighting for the screen at once.
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => row.click(), 350);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const ids = btn.dataset.projects.split(',').map(s => s.trim()).filter(Boolean);
      if (!ids.length) return;

      // Single project: no need to make the visitor pick from a list of one.
      if (ids.length === 1) {
        const row = document.querySelector('.project-row[data-project="' + ids[0] + '"]');
        if (row) row.click();
        return;
      }

      list.innerHTML = '';
      ids.forEach(id => {
        const titleEl = document.querySelector('.project-row[data-project="' + id + '"] .project-row-title');
        if (!titleEl) return;
        const li = document.createElement('li');
        const link = document.createElement('button');
        link.type = 'button';
        link.className = 'evidence-project-link';
        link.dataset.project = id;
        const span = document.createElement('span');
        span.textContent = titleEl.textContent.trim();
        link.appendChild(span);
        link.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>');
        link.addEventListener('click', () => openProject(id));
        li.appendChild(link);
        list.appendChild(li);
      });
      if (!list.children.length) return; // none of the ids matched a real row — fail quietly

      lastTrigger = btn;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => closeBtn.focus({ preventScroll: true }));
    });
  });

  closeBtn.addEventListener('click', close);
  document.getElementById('evidence-modal-backdrop').addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
})();

/* ============================================================================
   10. SPEC-LEDGER-WAVEFORM.JS — Academic Journey horizon waveform scrubber
   ============================================================================ */

/* ==========================================================================
   HORIZON WAVEFORM
   Edge-to-edge SVG SGPA curve. Draws itself in via stroke-dashoffset once
   scrolled into view (same idiom the old sparkline used), and tracks the
   pointer to snap a crosshair + readout to the nearest semester on hover
   (mouse) or touch. No physics, no rAF loop — pure event-driven positioning.
   ========================================================================== */
(function () {
  const wrap = document.getElementById('horizon-waveform');
  const svg = document.getElementById('horizon-svg');
  const line = svg && svg.querySelector('.horizon-line');
  const pointsG = svg && svg.querySelector('.horizon-points');
  const crosshair = svg && svg.querySelector('.horizon-crosshair');
  const crosshairDot = svg && svg.querySelector('.horizon-crosshair-dot');
  const readout = document.getElementById('horizon-readout');
  const axis = document.getElementById('horizon-axis');
  if (!wrap || !svg || !line || !pointsG) return;

  const values = (wrap.dataset.sgpa || '').split(',').map(Number).filter(n => !isNaN(n));
  const labels = (wrap.dataset.labels || '').split(',');
  if (values.length < 2) return;

  const VB_W = 600, VB_H = 120, PAD_Y = 16;
  const min = Math.min(...values), max = Math.max(...values);
  const range = (max - min) || 1;

  function xFor(i) { return (i / (values.length - 1)) * VB_W; }
  function yFor(v) { return VB_H - PAD_Y - ((v - min) / range) * (VB_H - PAD_Y * 2); }

  const coords = values.map((v, i) => ({ x: xFor(i), y: yFor(v), v, label: labels[i] || '' }));

  line.setAttribute('points', coords.map(c => `${c.x},${c.y}`).join(' '));
  pointsG.innerHTML = coords.map(c => `<circle cx="${c.x.toFixed(2)}" cy="${c.y.toFixed(2)}"></circle>`).join('');
  if (axis) axis.innerHTML = coords.map(c => `<span>${c.label}</span>`).join('');

  // Scroll-triggered draw-in
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) line.style.strokeDashoffset = '0';
  }, { threshold: 0.35 });
  io.observe(svg);

  const circleEls = () => Array.from(pointsG.querySelectorAll('circle'));

  function nearestTo(relX) {
    let nearest = coords[0], nearestDist = Infinity;
    coords.forEach(c => {
      const d = Math.abs(c.x - relX);
      if (d < nearestDist) { nearestDist = d; nearest = c; }
    });
    return nearest;
  }

  function showAt(clientX) {
    const rect = svg.getBoundingClientRect();
    if (!rect.width) return;
    const relX = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1) * VB_W;
    const nearest = nearestTo(relX);
    crosshair.setAttribute('x1', nearest.x);
    crosshair.setAttribute('x2', nearest.x);
    crosshairDot.setAttribute('cx', nearest.x);
    crosshairDot.setAttribute('cy', nearest.y);
    circleEls().forEach((el, i) => el.classList.toggle('horizon-point-hovered', coords[i] === nearest));
    if (readout) {
      readout.style.left = ((nearest.x / VB_W) * 100) + '%';
      readout.textContent = `${nearest.label} \u00b7 SGPA ${nearest.v.toFixed(2)}`;
    }
    wrap.classList.add('hovering');
  }

  function hide() {
    wrap.classList.remove('hovering');
    circleEls().forEach(el => el.classList.remove('horizon-point-hovered'));
  }

  svg.addEventListener('mousemove', e => showAt(e.clientX));
  svg.addEventListener('mouseleave', hide);
  svg.addEventListener('touchstart', e => { if (e.touches[0]) showAt(e.touches[0].clientX); }, { passive: true });
  svg.addEventListener('touchmove', e => { if (e.touches[0]) showAt(e.touches[0].clientX); }, { passive: true });
  svg.addEventListener('touchend', hide);
})();

/* ============================================================================
   11. BENTO-SPOTLIGHT.JS — Recognition bento tile cursor-following border light
   ============================================================================ */

/* ==========================================================================
   BENTO BORDER SPOTLIGHT
   Sets --spot-x/--spot-y custom properties per tile on pointer move; the
   actual gradient + masking lives entirely in CSS (.bento-tile::after in
   features.css). No animation loop — just a cheap style write on move.
   ========================================================================== */
(function () {
  const tiles = document.querySelectorAll('.bento-tile');
  if (!tiles.length) return;
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  tiles.forEach(tile => {
    tile.addEventListener('mousemove', e => {
      const r = tile.getBoundingClientRect();
      tile.style.setProperty('--spot-x', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
      tile.style.setProperty('--spot-y', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
    });
    // Glide the light back to center on leave (see the @property registration
    // in features.css) so re-hovering the same tile starts from a sensible
    // position rather than wherever the cursor happened to leave from.
    tile.addEventListener('mouseleave', () => {
      tile.style.setProperty('--spot-x', '50%');
      tile.style.setProperty('--spot-y', '50%');
    });
  });
})();

/* ============================================================================
   10. SKILLS-TECH-TAG-LINK.JS — project tech-tags link back to their skill row
   ============================================================================ */

/* ==========================================================================
   BIDIRECTIONAL SKILLS <-> PROJECTS
   The Skills evidence buttons already link forward (skill -> project). This
   is the reverse direction: a project's tech-tags, inside its case-study
   modal, link back to the matching Proficiency Index row. Scoped to only
   the 2 tags that genuinely have a real match ("Arduino"/"Arduino Uno" and
   "Proteus") — Control Systems' evidence came from project *description*
   text, not a tech-tag, so it's deliberately left out here rather than
   faked. Uses delegated listeners (not a DOMContentLoaded query) because
   case-study content lives in <template> tags and is only cloned into the
   real DOM when a project row is opened.
   ========================================================================== */
(function () {
  const ALIASES = [
    { skillId: 'skill-t10', match: /arduino/i },
    { skillId: 'skill-t9', match: /proteus/i },
  ];
  function matchFor(tag) {
    const text = tag.textContent.trim();
    return ALIASES.find(a => a.match.test(text));
  }

  document.addEventListener('mouseover', e => {
    const tag = e.target.closest('.case-tech .tech-tag');
    if (!tag || tag.dataset.techChecked) return;
    tag.dataset.techChecked = '1';
    if (matchFor(tag)) tag.classList.add('tech-tag-linked');
  });

  document.addEventListener('click', e => {
    const tag = e.target.closest('.case-tech .tech-tag.tech-tag-linked');
    if (!tag) return;
    const hit = matchFor(tag);
    const target = hit && document.getElementById(hit.skillId);
    if (!target) return;
    // Reuse the case modal's own real close button rather than
    // duplicating its close logic.
    document.getElementById('case-modal-close')?.click();
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('skill-row-highlight');
      setTimeout(() => target.classList.remove('skill-row-highlight'), 1800);
    }, 260);
  });
})();

/* ============================================================================
   11. HERO-ROLE-ROTATOR.JS — typewriter cycle between real identity facets
   ============================================================================ */

/* ==========================================================================
   ROLE ROTATOR
   Cycles the hero title between the several real facets of the person's
   identity — engineer, student, Japan-track, embedded-systems — instead
   of showing only one at a time. First phrase is whatever i18n already
   put there (data-i18n="hero.title"); the rest come from a pipe-separated
   list on data-rotate-extra, set the same way (data-i18n-attr), so a
   language switch updates every phrase correctly, not just the visible one.
   Fully skipped under prefers-reduced-motion — the element just keeps
   showing its first, static phrase, exactly as if this script didn't
   exist. Not tied to the shared perf.js ticker: this is a low-frequency,
   cheap DOM text update, not a per-frame animation.
   ========================================================================== */
(function () {
  const el = document.querySelector('.hero-title');
  const perf = window.PortfolioPerf;
  if (!el || (perf && perf.reducedMotion)) return;

  const TYPE_MS = 45, DELETE_MS = 28, HOLD_MS = 2200, GAP_MS = 500;
  let phrases = [];
  let phraseIndex = 0;
  let timer = null;

  function getPhrases() {
    const first = el.textContent.trim();
    const extra = (el.getAttribute('data-rotate-extra') || '').split('|').map(s => s.trim()).filter(Boolean);
    return [first, ...extra];
  }

  function schedule(fn, ms) {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  }

  function typePhrase(text, i, cb) {
    if (document.hidden) { schedule(() => typePhrase(text, i, cb), 200); return; }
    el.textContent = text.slice(0, i);
    if (i < text.length) schedule(() => typePhrase(text, i + 1, cb), TYPE_MS);
    else cb();
  }
  function deletePhrase(text, i, cb) {
    if (document.hidden) { schedule(() => deletePhrase(text, i, cb), 200); return; }
    el.textContent = text.slice(0, i);
    if (i > 0) schedule(() => deletePhrase(text, i - 1, cb), DELETE_MS);
    else cb();
  }

  function cycle() {
    phrases = getPhrases();
    if (phrases.length < 2) return; // nothing to rotate to — leave the static text alone
    const current = phrases[phraseIndex];
    typePhrase(current, 0, () => {
      schedule(() => {
        deletePhrase(current, current.length, () => {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          schedule(cycle, GAP_MS);
        });
      }, HOLD_MS);
    });
  }

  // Re-read phrases (they change per language) and restart the cycle
  // cleanly whenever the language changes, rather than mixing old and
  // new text mid-animation.
  document.addEventListener('langchange', () => {
    clearTimeout(timer);
    phraseIndex = 0;
    phrases = getPhrases();
    el.textContent = phrases[0];
    schedule(cycle, HOLD_MS);
  });

  document.addEventListener('DOMContentLoaded', () => {
    phrases = getPhrases();
    if (phrases.length < 2) return;
    schedule(cycle, HOLD_MS);
  });
})();

/* ============================================================================
   12. MAGNETIC-HOVER.JS — primary CTAs pull subtly toward the cursor
   ============================================================================ */

/* ==========================================================================
   MAGNETIC HOVER
   Applied only to the primary hero/resume/contact CTAs (data-magnetic) —
   not every button on the site, which would dilute it into noise. Uses
   the shared PortfolioPerf ticker like every other continuous effect
   here, so it pauses automatically when off-screen and respects the
   same device-tier/reduced-motion gating as everything else. Skipped
   entirely on touch devices, where there's no hover to be magnetic to.
   ========================================================================== */
(function () {
  const perf = window.PortfolioPerf;
  if (!perf || perf.reducedMotion) return;
  // Simple mode rule (Item 1): magnetic pull is off; buttons stay as
  // plain, ordinary buttons with normal CSS hover states only.
  if (document.documentElement.getAttribute('data-mode') === 'simple') return;
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  const targets = Array.from(document.querySelectorAll('[data-magnetic]'));
  if (!targets.length) return;

  const state = targets.map(el => ({ el, tx: 0, ty: 0, x: 0, y: 0, active: false }));

  state.forEach(s => {
    s.el.addEventListener('mousemove', e => {
      const r = s.el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      const maxPull = 10;
      s.tx = Math.max(-maxPull, Math.min(maxPull, relX * 0.28));
      s.ty = Math.max(-maxPull, Math.min(maxPull, relY * 0.28));
      s.active = true;
    });
    s.el.addEventListener('mouseleave', () => {
      s.tx = 0; s.ty = 0;
    });
  });

  perf.subscribe((ts, dt) => {
    const f = Math.min(1, (dt / 16.7) * 0.22);
    state.forEach(s => {
      s.x += (s.tx - s.x) * f;
      s.y += (s.ty - s.y) * f;
      s.el.style.transform = (Math.abs(s.x) > 0.05 || Math.abs(s.y) > 0.05)
        ? `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`
        : '';
    });
  });
})();

/* ============================================================================
   13. EASTER-EGG.JS — Konami code, opt-in and invisible by default
   ============================================================================ */

/* ==========================================================================
   EASTER EGG
   Classic Konami code (↑↑↓↓←→←→BA). Fully self-contained — no cmdk
   entry, no visible hint anywhere, so it can never affect the "recruiter
   scans in 20 seconds" case. Only someone who already knows to try it
   will ever see it. Content is deliberately short and easy to find/edit
   (see the i18n key easterEgg.message) since it's a personal note, not
   something safe for an AI to author with invented specifics.
   ========================================================================== */
(function () {
  const SEQUENCE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let progress = 0;
  let toastEl = null;

  function showToast() {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.id = 'easter-egg-toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    const table = (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N[document.documentElement.getAttribute('lang') || 'en']) || {};
    const msg = (table.easterEgg && table.easterEgg.message) || 'You found it. Thanks for looking closely.';
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove('show'), 5000);
  }

  document.addEventListener('keydown', e => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    progress = (key === SEQUENCE[progress]) ? progress + 1 : (key === SEQUENCE[0] ? 1 : 0);
    if (progress === SEQUENCE.length) {
      progress = 0;
      showToast();
    }
  });
})();

/* ============================================================================
   14. DEEP-LINKING.JS — shareable URLs for projects, certs, and the resume
   ============================================================================ */

/* ==========================================================================
   DEEP LINKING
   Reads a URL hash on load and opens the matching modal by calling .click()
   on the real trigger element — the same reuse pattern as
   skills-evidence.js and skills-tech-tag-link.js, so none of the existing
   open()/close() logic in features.js is touched, wrapped, or duplicated.
   Writes the hash on open via a delegated click listener (doesn't need to
   know which internal function ran, just that a known trigger was
   clicked), and clears it on close via a MutationObserver watching each
   modal's own "open" class — this catches every close path (Escape,
   backdrop click, the close button, or anything else) without needing to
   hook each one individually.
   Uses history.replaceState, not pushState, so opening/closing modals
   doesn't spam the browser's back button with every click — the hash
   updates, but it isn't a new history entry.
   ========================================================================== */
(function () {
  function setHash(value) {
    try {
      const url = value ? '#' + value : location.pathname + location.search;
      history.replaceState(null, '', url);
    } catch (e) { /* History API unavailable for some reason — not fatal, deep-linking just won't persist */ }
  }

  document.addEventListener('click', e => {
    const projectRow = e.target.closest('.project-row[data-project]');
    if (projectRow) { setHash('project-' + projectRow.dataset.project); return; }

    const certCard = e.target.closest('.filmstrip-card[data-cert-image]');
    if (certCard) {
      const cards = Array.from(document.querySelectorAll('[data-cert-image]'));
      const idx = cards.indexOf(certCard);
      if (idx !== -1) setHash('cert-' + (idx + 1));
      return;
    }

    if (e.target.closest('#hero-resume-btn, #dock-resume-btn')) { setHash('resume'); }
  });

  ['case-modal', 'certModal', 'resume-modal'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    // Walks each individual mutation's true before/after state rather
    // than just the batch's net before/after — a modal that's opened
    // and closed synchronously back-to-back (both mutations landing in
    // the same microtask flush) still gets its close correctly detected,
    // instead of being missed because the batch's start and end state
    // happen to match (started closed, ended closed, net "no change").
    new MutationObserver(mutations => {
      for (let i = 0; i < mutations.length; i++) {
        const hadOpen = (mutations[i].oldValue || '').split(/\s+/).includes('open');
        const hasOpenAfter = (i + 1 < mutations.length)
          ? (mutations[i + 1].oldValue || '').split(/\s+/).includes('open')
          : el.classList.contains('open');
        if (hadOpen && !hasOpenAfter) { setHash(null); break; }
      }
    }).observe(el, { attributes: true, attributeFilter: ['class'], attributeOldValue: true });
  });

  function openFromHash() {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    if (hash === 'resume') { window.ResumeModal && window.ResumeModal.open(); return; }

    const projectMatch = hash.match(/^project-(p\d+)$/);
    if (projectMatch) {
      const row = document.querySelector('.project-row[data-project="' + projectMatch[1] + '"]');
      if (row) row.click();
      return;
    }
    const certMatch = hash.match(/^cert-(\d+)$/);
    if (certMatch) {
      const cards = document.querySelectorAll('[data-cert-image]');
      const card = cards[parseInt(certMatch[1], 10) - 1];
      if (card) card.click();
    }
  }

  // A small delay so this runs after the rest of DOMContentLoaded-gated
  // init (project rows, cert cards) is settled — same deferred-init
  // margin already used elsewhere in this codebase.
  document.addEventListener('DOMContentLoaded', () => setTimeout(openFromHash, 300));
})();

/* ============================================================================
   11. KEYBOARD-NAV.JS — global scroll + section-jump shortcuts
   ============================================================================ */

/* ==========================================================================
   GLOBAL KEYBOARD SHORTCUTS
   Arrow Up/Down scroll the page; single letter keys jump straight to a
   section. Both stay completely out of the way whenever:
     - any modal is open (checked before this file even loads any modal —
       cmdk's own Up/Down result navigation, the cert modal's Left/Right
       image nav, and the filmstrip's own Left/Right scroll all keep
       working exactly as they already do, undisturbed)
     - focus is inside a text input, textarea, select, or contenteditable
       (so typing "s" in the command palette search box, for instance,
       never accidentally jumps the page to the Skills section)
     - any modifier key (Ctrl/Cmd/Alt) is held, so OS and browser
       shortcuts are never intercepted
   ========================================================================== */
(function () {
  const SECTION_KEYS = {
    a: 'about', x: 'experience', e: 'education', s: 'skills',
    p: 'projects', c: 'certifications', m: 'contact'
  };
  const MODAL_IDS = ['certModal', 'case-modal', 'resume-modal', 'evidence-modal', 'cmdk-backdrop'];

  function isTyping() {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
  }
  function isModalOpen() {
    return MODAL_IDS.some(id => {
      const el = document.getElementById(id);
      return el && el.classList.contains('open');
    });
  }

  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (isTyping() || isModalOpen()) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      window.scrollBy({ top: -window.innerHeight * 0.85, behavior: 'smooth' });
      return;
    }

    const key = e.key.toLowerCase();
    const sectionId = SECTION_KEYS[key];
    if (sectionId) {
      const target = document.getElementById(sectionId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
})();


/* ==========================================================================
   WATER SURFACE — everything gently floats, and a touch sends a ripple.
   - Idle: every outermost card/block bobs a few pixels with a tiny tilt, each
     on its own slow rhythm. Driven by the Web Animations API on the
     individual `translate`/`rotate` properties — these are *added on top of*
     whatever CSS animations/transitions an element already has (hero
     entrance, scroll-reveal, tilt…), never replacing them. (An earlier
     CSS-class version replaced the element's own `animation` and could leave
     things like the hero text invisible.) Only on-screen elements animate.
   - Touch: a click/tap sends two expanding ripple rings from the pointer and
     a soft "dip" wave through nearby cards (delayed by distance); hovering a
     card gives it a small dip.
   - Enhanced mode only; off for reduced-motion. It deliberately keeps running
     when the adaptive safety net lowers the heavy effects (it is cheap).
   ========================================================================== */
(function () {
  const root = document.documentElement;
  if (root.getAttribute('data-mode') === 'simple') return;
  if (root.getAttribute('data-reduce-motion') === 'true') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!Element.prototype.animate) return;

  const SEL = [
    '.glass-l1', '.glass-l2', '.glass-l3', '.wire-card', '.project-row', '.filmstrip-card',
    '.bento-tile', '.contact-link', '.edu-card', '.skill-row', '.lang-pill', '.qa-item',
    '.availability-pill', '.currently-chip',
    '.hero-left', '.section-title', '.contact-tagline', '.contact-sub', '.stat', '.btn-primary', '.btn-outline'
  ].join(',');

  const rand = (a, b) => a + Math.random() * (b - a);
  const targets = [];
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      const el = en.target;
      el.classList.toggle('water-on', en.isIntersecting);
      if (el._bob) { if (en.isIntersecting) el._bob.play(); else el._bob.pause(); }
    });
  }, { rootMargin: '60px' });

  function register(el) {
    if (el._water) return;
    // outermost only — nested cards just ride along with their parent
    if (el.parentElement && el.parentElement.closest(SEL)) return;
    el._water = true;
    const amp = rand(0.8, 1.2), dir = Math.random() < 0.5 ? 1 : -1;
    const ease = 'ease-in-out';
    const kf = [
      { translate: '0px 0px', rotate: '0deg', easing: ease, offset: 0 },
      { translate: (2.2 * amp) + 'px ' + (-6 * amp) + 'px', rotate: (dir * amp * 0.26) + 'deg', easing: ease, offset: 0.22 },
      { translate: (0.6 * amp) + 'px ' + (-2 * amp) + 'px', rotate: '0deg', easing: ease, offset: 0.5 },
      { translate: (-2.2 * amp) + 'px ' + (-6.5 * amp) + 'px', rotate: (-dir * amp * 0.26) + 'deg', easing: ease, offset: 0.78 },
      { translate: '0px 0px', rotate: '0deg', offset: 1 }
    ];
    const dur = rand(4.8, 7.8) * 1000;
    el._bob = el.animate(kf, { duration: dur, iterations: Infinity, delay: -rand(0, dur) });
    el._bob.pause();
    el.classList.add('water');
    targets.push(el);
    io.observe(el);
  }
  function scan() { document.querySelectorAll(SEL).forEach(register); }

  function dip(el, k, delayMs) {
    if (!el.isConnected || el._dipping) return;
    el._dipping = true;
    const a = el.animate([
      { scale: 1, offset: 0, easing: 'ease-out' },
      { scale: 1 - 0.028 * k, offset: 0.28, easing: 'ease-in-out' },
      { scale: 1 + 0.012 * k, offset: 0.6, easing: 'ease-out' },
      { scale: 1, offset: 1 }
    ], { duration: 1000, delay: delayMs });
    a.onfinish = a.oncancel = () => { el._dipping = false; };
  }

  function ripple(x, y) {
    ['', ' ring2'].forEach(extra => {
      const r = document.createElement('span');
      r.className = 'water-ripple' + extra;
      r.style.left = x + 'px'; r.style.top = y + 'px';
      r.addEventListener('animationend', () => r.remove(), { once: true });
      document.body.appendChild(r);
    });
  }

  document.addEventListener('pointerdown', e => {
    ripple(e.clientX, e.clientY);
    const RADIUS = 380;
    let n = 0;
    for (const el of targets) {
      if (!el.classList.contains('water-on')) continue;
      const b = el.getBoundingClientRect();
      const dx = (b.left + b.width / 2) - e.clientX, dy = (b.top + b.height / 2) - e.clientY;
      const d = Math.hypot(dx, dy);
      if (d > RADIUS + Math.min(b.width, b.height) / 2) continue;
      dip(el, Math.max(0.25, 1 - d / (RADIUS + 120)), d * 0.9);
      if (++n >= 14) break;
    }
  }, { passive: true });

  let lastHover = null;
  document.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    const el = e.target.closest && e.target.closest('.water');
    if (el && el !== lastHover) dip(el, 0.55, 0);
    lastHover = el;
  }, { passive: true });

  const start = () => { scan(); setTimeout(scan, 1200); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  document.addEventListener('langchange', () => setTimeout(scan, 50));
})();
