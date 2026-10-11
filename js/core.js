/* ==========================================================================
   CORE.JS — shared performance ticker (window.PortfolioPerf) + i18n engine
   (window.I18N / window.PORTFOLIO_I18N consumer). Must load AFTER
   data/translations.js and BEFORE every other bundle — everything else
   reads window.PortfolioPerf and/or I18N synchronously at parse time.
   Consolidated from: perf.js, i18n.js
   ========================================================================== */

/* ============================================================================
   1. PERF.JS — shared rAF ticker + device tier heuristic
   ============================================================================ */

/* ==========================================================================
   PERFORMANCE CORE
   - One shared requestAnimationFrame loop. Every animated module subscribes
     instead of running its own rAF loop — this alone removes most of the
     "several independent loops fighting for the main thread" jank.
   - Subscribers can be tagged with an element; when that element leaves
     the viewport its callback is automatically skipped (still subscribed,
     just not run) until it's visible again.
   - A simple device tier (low / mid / high) lets modules scale down
     particle counts / canvas resolution on weaker hardware without
     dropping the feature entirely.
   ========================================================================== */
window.PortfolioPerf = (function () {
  const subscribers = new Map(); // id -> { fn, el, active }
  let id = 0;
  let running = false;
  let last = 0;

  // ---- Adaptive safety net ------------------------------------------------
  // If the page genuinely can't keep up, quietly drop the heaviest decorative
  // effects — background canvases, glass blobs and large blur (the cheap water
  // motion keeps running) — instead of letting the machine run flat out. One-way for
  // the session (no flapping back and forth). Subscribers opt in with
  // { heavy: true }; CSS reacts to html[data-perf="low"].
  // Only a genuinely struggling page trips this: ~12fps or worse, sustained
  // for 9+ seconds, after an 8s warm-up, ignoring suspended/background frames.
  // Opt-out for testing: add ?fx=full to the URL (or localStorage portfolio_fx = "full").
  let netOff = false;
  try { netOff = /[?&]fx=full\b/.test(location.search) || localStorage.getItem('portfolio_fx') === 'full'; } catch (e) { /* ignore */ }
  const WINDOW_MS = 3000, SLOW_AVG_MS = 80, WARMUP_MS = 8000, STREAK_NEEDED = 3, SUSPEND_MS = 1500;
  let winTime = 0, winFrames = 0, slowStreak = 0, skipFrames = 0, winSuspended = false;
  const bootTime = performance.now();
  // Coming back to a hidden/occluded tab produces giant frame gaps — not a sign of load.
  document.addEventListener('visibilitychange', () => { winTime = 0; winFrames = 0; slowStreak = 0; winSuspended = false; if (!document.hidden) skipFrames = 8; });
  function monitor(ts, dt) {
    if (netOff || result.degraded || document.hidden) { winTime = 0; winFrames = 0; return; }
    if (skipFrames > 0) { skipFrames--; return; }
    if (ts - bootTime < WARMUP_MS) return;
    if (dt > SUSPEND_MS) winSuspended = true;
    winTime += Math.min(dt, 500); winFrames++;
    if (winTime >= WINDOW_MS) {
      const bad = !winSuspended && (winTime / winFrames) > SLOW_AVG_MS;
      slowStreak = bad ? slowStreak + 1 : 0;
      winTime = 0; winFrames = 0; winSuspended = false;
      if (slowStreak >= STREAK_NEEDED) degrade();
    }
  }
  function degrade() {
    result.degraded = true;
    result.tier = 'low';
    document.documentElement.setAttribute('data-perf', 'low');
    document.dispatchEvent(new CustomEvent('perfdegrade'));
  }

  function tick(ts) {
    const dt = last ? ts - last : 16.7;
    last = ts;
    monitor(ts, dt);
    subscribers.forEach(sub => {
      if (sub.active && !(sub.heavy && result.degraded)) sub.fn(ts, dt);
    });
    requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      subscribers.forEach(sub => {
        if (sub.el === entry.target) sub.active = entry.isIntersecting;
      });
    });
  }, { rootMargin: '100px' });

  function subscribe(fn, opts) {
    const key = ++id;
    const el = opts && opts.el;
    const heavy = !!(opts && opts.heavy);
    subscribers.set(key, { fn, el, heavy, active: !el });
    if (el) io.observe(el);
    return function unsubscribe() {
      subscribers.delete(key);
      if (el) io.unobserve(el);
    };
  }

  document.addEventListener('visibilitychange', () => {
    subscribers.forEach(sub => { if (document.hidden) sub._wasActive = sub.active; });
  });

  // ---- Device tier heuristic ----
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tier = 'high';
  if (cores <= 4 || mem <= 4) tier = 'mid';
  if (cores <= 2 || mem <= 2) tier = 'low';
  if (reducedMotion) tier = 'low';

  // Adaptive network awareness — a slow or metered connection drops to the
  // lightest tier too, independent of how capable the hardware itself is.
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    const slow = conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType);
    if (slow) tier = 'low';
    if (conn.addEventListener) {
      conn.addEventListener('change', () => {
        const nowSlow = conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType);
        if (nowSlow) result.tier = 'low';
      });
    }
  }

  start();

  const result = { subscribe, tier, reducedMotion, degraded: false, dpr: Math.min(window.devicePixelRatio || 1, tier === 'high' ? 2 : 1.4) };
  return result;
})();

/* ============================================================================
   2. I18N.JS — language engine (EN/JA/HI)
   ============================================================================ */

/* ==========================================================================
   I18N ENGINE
   - Default language on first load / reload: English (per spec).
   - Persists the user's later choice to localStorage for return visits.
   - Reads window.PORTFOLIO_I18N (data/translations.js), applies by
     dot-path key found in each element's [data-i18n] attribute.
   ========================================================================== */
const I18N = (() => {
  const DICT = window.PORTFOLIO_I18N || {};
  const SUPPORTED = ['en', 'ja', 'hi'];
  const STORAGE_KEY = 'portfolio_lang';

  function getInitialLang() {
    // Spec: English is primary on first open / reload, EXCEPT when the URL
    // itself specifies a language (?lang=ja) — this is what makes deep
    // links and hreflang alternates to a specific language actually work,
    // rather than pointing search engines/shared links at a URL that
    // silently ignores the parameter and falls back to English anyway.
    // A URL-specified language does not overwrite the stored preference —
    // it's a one-time override for this visit only.
    try {
      const urlLang = new URLSearchParams(window.location.search).get('lang');
      if (SUPPORTED.includes(urlLang)) return urlLang;
    } catch (e) { /* fall through */ }
    // localStorage can throw (SecurityError) when the page is opened as a
    // local file:// URL, in private/incognito mode with storage disabled,
    // or in an iframe with storage blocked — none of that should be able
    // to take the whole translation pipeline down with it.
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* fall through to 'en' */ }
    return SUPPORTED.includes(stored) ? stored : 'en';
  }

  function resolve(path, langObj) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), langObj);
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    const table = DICT[lang] || DICT.en;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', 'ltr');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = resolve(key, table);
      if (val === undefined) return;
      el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      // format: data-i18n-attr="title:dock.theme,placeholder:cmdk.placeholder"
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        const val = resolve(key, table);
        if (val !== undefined) el.setAttribute(attr, val);
      });
    });

    // Marquee (array of strings) — rebuild the scrolling strip
    const marqueeEl = document.getElementById('marquee-track');
    if (marqueeEl && Array.isArray(table.marquee)) {
      const items = table.marquee;
      const build = () => items.map(t => `<span>${t}</span><span class="accent">◆</span>`).join('');
      marqueeEl.innerHTML = build() + build();
    }

    document.querySelectorAll('.lang-menu button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    const langBtnLabel = document.getElementById('lang-current-label');
    if (langBtnLabel) langBtnLabel.textContent = lang.toUpperCase();

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* language still applies this session, just won't persist */ }
    applyLang(lang);
  }

  function init() {
    applyLang(getInitialLang());
    document.querySelectorAll('.lang-menu button[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        setLang(btn.dataset.lang);
        document.getElementById('lang-menu')?.classList.remove('open');
      });
    });
  }

  return { init, setLang, applyLang, get current() { return document.documentElement.getAttribute('lang') || 'en'; } };
})();

document.addEventListener('DOMContentLoaded', I18N.init);

/* ============================================================================
   3. MODE.JS — Simple / Enhanced visual mode toggle
   ============================================================================ */

/* ==========================================================================
   MODE ENGINE
   The actual on/off decision for decorative effects is already made by the
   inline script at the top of <head> (it sets data-mode on <html> before
   this file even loads, so there is zero flash of effects). This module
   only has two jobs:
     1) Expose window.PortfolioMode so effects.js/features.js can check
        `window.PortfolioMode.current` if they need to (most of them just
        read the `data-mode` attribute directly — either way works).
     2) Wire up the dock nav button: clicking it flips the stored choice
        and reloads the page. Reloading (instead of trying to start/stop
        seven different animation loops live) is a deliberate choice — it
        guarantees a clean state with no half-initialized effects, at the
        cost of one page refresh.
   ========================================================================== */
const MODE = (() => {
  const STORAGE_KEY = 'portfolio_mode';

  function current() {
    return document.documentElement.getAttribute('data-mode') || 'simple';
  }

  function isReducedMotion() {
    return document.documentElement.getAttribute('data-reduce-motion') === 'true';
  }

  function toggle() {
    // Reduced-motion always wins — this button should be hidden in that
    // case (see init() below), but this is a second safety check in case
    // something still manages to trigger a click.
    if (isReducedMotion()) return;
    const next = current() === 'enhanced' ? 'simple' : 'enhanced';
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* private browsing — mode just won't persist across reload */ }
    location.reload();
  }

  function init() {
    const btn = document.getElementById('mode-toggle-btn');
    if (!btn) return;

    // Rule: the toggle does not appear at all when the OS/browser has
    // reduced-motion turned on — that accessibility setting is not meant
    // to be optional for the visitor to override.
    if (isReducedMotion()) {
      btn.style.display = 'none';
      return;
    }

    btn.setAttribute('aria-pressed', current() === 'enhanced' ? 'true' : 'false');
    btn.addEventListener('click', toggle);
  }

  return { init, toggle, current };
})();

window.PortfolioMode = MODE;
document.addEventListener('DOMContentLoaded', MODE.init);