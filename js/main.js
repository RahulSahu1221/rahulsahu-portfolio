/* ==========================================================================
   MAIN.JS — small glue logic (keyboard-focus visibility, footer year,
   last-updated stamp, local time indicator). All major features
   self-initialize in core.js / features.js / effects.js.
   Loads LAST, after every other bundle.
   ========================================================================== */

/* ==========================================================================
   MAIN — small glue logic; all major features self-initialize in their
   own modules (i18n.js, theme.js, nav.js, command-palette.js, etc.)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Keyboard-focus visibility: only show focus rings for keyboard users
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  // Footer year, if a placeholder exists
  const yearEl = document.querySelector('[data-current-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Last-updated stamp, sourced from the document's own file timestamp — zero config
  const lastUpdatedEl = document.getElementById('last-updated');
  if (lastUpdatedEl && document.lastModified) {
    const d = new Date(document.lastModified);
    if (!isNaN(d)) {
      const formatted = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      lastUpdatedEl.textContent = formatted;
    }
  }

  // NOTE: dynamic "RS" monogram favicon removed — replaced with a real
  // static image (see the <link rel="icon"> tag in index.html). This
  // function used to overwrite the favicon on load and on every theme
  // switch, which would have silently replaced the real favicon with the
  // old generated monogram the moment the user toggled dark/light mode.

  // Shared telemetry computation — both the footer's full readout and the
  // dock's compact one derive from this single JST-overlap calculation,
  // so the two never have a chance to disagree with each other.
  function getJstTelemetry() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    let jstHour;
    try {
      jstHour = parseInt(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo', hour: '2-digit', hour12: false }), 10);
    } catch (e) { jstHour = null; }
    const overlap = jstHour !== null && jstHour >= 9 && jstHour < 18;
    return { timeStr, tz, overlap };
  }

  // Timezone-aware local time indicator, shown in the footer
  function updateLocalTime() {
    const el = document.getElementById('local-time');
    if (!el) return;
    const { timeStr, tz, overlap } = getJstTelemetry();
    el.textContent = timeStr + (tz ? ' · ' + tz.split('/').pop().replace('_', ' ') : '');
    el.title = overlap ? 'Currently within Japan business hours (JST)' : 'Outside Japan business hours (JST)';
    el.classList.toggle('jp-overlap', overlap);
  }

  // Compact version in the dock nav — always visible, not just in the
  // footer — an honest, live readout rather than a decorative flourish,
  // fitting the instrumentation theme the rest of the site already has
  // (the Education ledger's telemetry footer, the achievement "verified"
  // badges) into one place that's actually always on screen.
  function updateDockTelemetry() {
    const wrap = document.getElementById('dock-telemetry');
    const el = document.getElementById('dock-local-time');
    if (!wrap || !el) return;
    const { timeStr, overlap } = getJstTelemetry();
    el.textContent = timeStr;
    wrap.classList.toggle('jp-overlap', overlap);
    wrap.title = overlap ? 'Currently within Japan business hours (JST)' : 'Outside Japan business hours (JST)';
  }

  updateLocalTime();
  updateDockTelemetry();
  setInterval(() => { updateLocalTime(); updateDockTelemetry(); }, 60000);

  // Force every Quick Answers <details> open for printing, then restore
  // whatever state each one was actually in once printing is done — a
  // pure-CSS override of closed <details> content isn't reliable across
  // browsers, so this uses the standard beforeprint/afterprint approach.
  let qaStateBeforePrint = null;
  window.addEventListener('beforeprint', () => {
    const items = document.querySelectorAll('.qa-item');
    qaStateBeforePrint = Array.from(items).map(el => el.open);
    items.forEach(el => { el.open = true; });
  });
  window.addEventListener('afterprint', () => {
    if (!qaStateBeforePrint) return;
    document.querySelectorAll('.qa-item').forEach((el, i) => { el.open = qaStateBeforePrint[i]; });
    qaStateBeforePrint = null;
  });
});
