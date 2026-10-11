/* ==========================================================================
   FEATURES.JS — interactive UI features: theme toggle, nav dock, command
   palette, certifications filmstrip, project tabs/cert modal/copy/vCard,
   the project showcase (preview float + case-study modal), and section
   focus. Requires core.js (PortfolioPerf + I18N) loaded first.
   Consolidated from: theme.js, nav.js, command-palette.js, filmstrip.js,
   interactions.js, project-showcase.js, section-focus.js
   (skills-chips.js was removed along with the old physics/hex/circuit
   skills designs — the current Proficiency Index writes its skill names
   directly via data-i18n, no <br>-joined chip parsing needed any more.)
   ========================================================================== */

/* ============================================================================
   1. THEME.JS — light/dark toggle with circular blur-wipe transition
   ============================================================================ */

/* ==========================================================================
   THEME TOGGLE — circular blur-wipe transition
   Instead of crossfading colors, a radial clip-path + backdrop-filter
   pulse expands outward from the toggle button so the new theme
   "resolves into focus" rather than fading in.
   ========================================================================== */
(function () {
  function init() {
    const body = document.body;
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    const veil = document.getElementById('theme-transition-veil');
    if (!toggles.length) return;

    const stored = localStorage.getItem('theme');
    if (stored === 'light') body.classList.add('light-mode');
    const pulseEl = document.getElementById('page-blur-pulse');

    function fireWipe(originEl) {
      if (!veil) return;
      // Simple mode rule (Item 1): theme still switches instantly, but
      // the animated blur-wipe veil effect is skipped entirely.
      if (document.documentElement.getAttribute('data-mode') === 'simple') return;
      const rect = originEl ? originEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: 40, width: 0, height: 0 };
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      veil.style.setProperty('--tx', x + 'px');
      veil.style.setProperty('--ty', y + 'px');
      veil.classList.remove('wiping');
      void veil.offsetWidth; // restart the clip-path transition
      veil.classList.add('wiping');
      setTimeout(() => veil.classList.remove('wiping'), 650);

      // Brief static blur pulse — two paints, not an animated blur value
      if (pulseEl) {
        pulseEl.classList.add('pulsing');
        setTimeout(() => pulseEl.classList.remove('pulsing'), 180);
      }
    }

    function toggleTheme(originEl) {
      fireWipe(originEl);
      const isLight = body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      document.dispatchEvent(new CustomEvent('themechange', { detail: { light: isLight } }));
    }

    toggles.forEach(btn => btn.addEventListener('click', () => toggleTheme(btn)));

    window.PortfolioTheme = { toggle: toggleTheme, isLight: () => body.classList.contains('light-mode') };
  }

  document.addEventListener('DOMContentLoaded', init);
})();

/* ============================================================================
   2. NAV.JS — floating dock nav: scroll-spy, condense, lang dropdown, keyboard nav
   ============================================================================ */

/* ==========================================================================
   FLOATING DOCK NAV
   ========================================================================== */
(function () {
  function init() {
    const dock = document.getElementById('dock');
    const links = Array.from(document.querySelectorAll('.dock-links a'));
    const indicator = document.getElementById('dock-indicator');
    const sections = links
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    function movePill(link) {
      if (!link || !indicator || !dock) return;
      const linkRect = link.getBoundingClientRect();
      const dockRect = dock.querySelector('.dock-links').getBoundingClientRect();
      indicator.style.setProperty('--pill-w', linkRect.width + 'px');
      indicator.style.setProperty('--pill-x', (linkRect.left - dockRect.left) + 'px');
      indicator.classList.add('visible');
    }

    function setActive(link) {
      links.forEach(a => a.classList.toggle('active', a === link));
      movePill(link);
    }

    // Scroll-spy
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          const link = links.find(a => a.getAttribute('href') === id);
          if (link) setActive(link);
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));

    // Condense dock on scroll down, expand on scroll up.
    // Bug fixed here: the pill previously only repositioned on scroll/resize,
    // so switching condensed state (which changes every link's width) or
    // switching language (different text widths per language) left the
    // active pill visibly misaligned until the next scroll-spy trigger.
    // Both now explicitly re-run movePill() after their layout settles.
    let lastY = window.scrollY;
    let condensed = false;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (!dock) { lastY = y; return; }
      const shouldCondense = y > 120 && y > lastY;
      const shouldExpand = y < lastY;
      if (shouldCondense && !condensed) {
        dock.classList.add('condensed'); condensed = true;
        requestAnimationFrame(() => requestAnimationFrame(realign));
      } else if (shouldExpand && condensed) {
        dock.classList.remove('condensed'); condensed = false;
        requestAnimationFrame(() => requestAnimationFrame(realign));
      }
      lastY = y;
    }, { passive: true });

    function realign() {
      const active = links.find(a => a.classList.contains('active'));
      if (active) movePill(active);
    }
    document.addEventListener('langchange', () => requestAnimationFrame(() => requestAnimationFrame(realign)));
    // Fonts loading late can also silently resize link labels — realign once webfonts settle.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(realign);

    // Nav link jumps — plain smooth scroll. (Previously this used a custom
    // full-screen wipe overlay with a chain of setTimeouts; rapid or
    // interrupted clicks could leave it stuck with pointer-events:all,
    // silently blocking all clicks on the page. Native scrollIntoView is
    // robust and the section-level reveal animations already carry the
    // visual interest during the scroll.)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const targetId = a.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    window.addEventListener('resize', () => {
      const activeLink = links.find(a => a.classList.contains('active'));
      if (activeLink) movePill(activeLink);
    });

    // Language dropdown
    const langBtn = document.getElementById('lang-switch-btn');
    const langMenu = document.getElementById('lang-menu');
    if (langBtn && langMenu) {
      langBtn.addEventListener('click', e => { e.stopPropagation(); langMenu.classList.toggle('open'); });
      document.addEventListener('click', e => { if (!langMenu.contains(e.target) && e.target !== langBtn) langMenu.classList.remove('open'); });
    }

    // Initial pill position once layout settles. Multiple safety-net
    // retries: web fonts (Inter etc.) can finish loading/swapping after
    // this first measurement, silently changing link widths and leaving
    // the indicator sized against stale (fallback-font) dimensions —
    // document.fonts.ready normally covers this, but re-checking a couple
    // more times shortly after catches any late layout settling too.
    setTimeout(() => { const first = links[0]; if (first) setActive(first); }, 300);
    setTimeout(realign, 700);
    setTimeout(realign, 1500);

    // Keyboard section navigation — Up/Down glides between sections when
    // focus isn't in a text field, a command palette isn't open, etc.
    const allSectionEls = Array.from(document.querySelectorAll('section[id]'));
    document.addEventListener('keydown', e => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      const palette = document.getElementById('cmdk-backdrop');
      if (palette && palette.classList.contains('open')) return;
      e.preventDefault();
      const y = window.scrollY + innerHeight * 0.3;
      let idx = allSectionEls.findIndex(s => s.offsetTop > y);
      if (idx === -1) idx = allSectionEls.length - 1;
      if (e.key === 'ArrowUp') idx = Math.max(0, idx - 2);
      const target = allSectionEls[Math.max(0, idx)];
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();

/* ============================================================================
   3. COMMAND-PALETTE.JS — Cmd/Ctrl+K palette
   ============================================================================ */

/* ==========================================================================
   COMMAND PALETTE — ⌘K / Ctrl+K
   ========================================================================== */
(function () {
  function buildItems() {
    const t = (window.PORTFOLIO_I18N[I18N.current] || window.PORTFOLIO_I18N.en).cmdk;
    const iconResume = '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
    const iconProjects = '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';
    const iconGithub = '<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>';
    const iconLinkedin = '<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>';
    const iconMail = '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>';
    const iconSun = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    const iconGlobe = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
    const iconFocus = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>';
    const iconArrow = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    const iconContent = '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>';

    // Content search — built fresh each time the palette opens, from
    // whatever's actually in the DOM right now (project rows, skill rows,
    // cert cards), rather than a hand-maintained duplicate list. Typing
    // "Proteus" surfaces the real projects and skill row that mention it,
    // reusing exactly the same click-through / scroll-highlight behavior
    // those already have elsewhere on the page — no new interaction to
    // maintain, just a new door into it.
    const contentItems = [];
    document.querySelectorAll('.project-row[data-project]').forEach(row => {
      const titleEl = row.querySelector('.project-row-title');
      if (!titleEl) return;
      contentItems.push({ group: t.groupContent, label: titleEl.textContent.trim(), icon: iconContent, action: () => row.click() });
    });
    document.querySelectorAll('.skill-row').forEach(row => {
      const nameEl = row.querySelector('.skill-row-name');
      if (!nameEl) return;
      contentItems.push({
        group: t.groupContent, label: nameEl.textContent.trim(), icon: iconContent,
        action: () => {
          row.scrollIntoView({ behavior: 'smooth', block: 'center' });
          row.classList.add('skill-row-highlight');
          setTimeout(() => row.classList.remove('skill-row-highlight'), 1800);
        }
      });
    });
    document.querySelectorAll('.filmstrip-card[data-cert-image]').forEach(card => {
      const titleEl = card.querySelector('.cert-title');
      if (!titleEl) return;
      contentItems.push({ group: t.groupContent, label: titleEl.textContent.trim(), icon: iconContent, action: () => card.click() });
    });

    return [
      { group: t.groupActions, label: t.resume, icon: iconResume, action: () => window.ResumeModal && window.ResumeModal.open() },
      { group: t.groupActions, label: t.viewProjects, icon: iconProjects, action: () => jump('#projects') },
      { group: t.groupActions, label: t.github, icon: iconGithub, action: () => window.open('https://github.com/RahulSahu1221', '_blank') },
      { group: t.groupActions, label: t.linkedin, icon: iconLinkedin, action: () => window.open('https://www.linkedin.com/in/rahul-sahu-eee/', '_blank') },
      { group: t.groupActions, label: t.email, icon: iconMail, action: () => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=sahurahuloc@gmail.com', '_blank', 'noopener,noreferrer') },
      { group: t.groupActions, label: t.toggleTheme, icon: iconSun, action: () => window.PortfolioTheme && window.PortfolioTheme.toggle() },
      { group: t.groupActions, label: t.switchLang, icon: iconGlobe, action: () => document.getElementById('lang-menu')?.classList.toggle('open') },
      { group: t.groupActions, label: t.focusMode, icon: iconFocus, action: () => document.body.classList.toggle('focus-mode') },
      { group: t.groupNavigate, label: t.goAbout, icon: iconArrow, action: () => jump('#about') },
      { group: t.groupNavigate, label: t.goExperience, icon: iconArrow, action: () => jump('#experience') },
      { group: t.groupNavigate, label: t.goEducation, icon: iconArrow, action: () => jump('#education') },
      { group: t.groupNavigate, label: t.goSkills, icon: iconArrow, action: () => jump('#skills') },
      { group: t.groupNavigate, label: t.goProjects, icon: iconArrow, action: () => jump('#projects') },
      { group: t.groupNavigate, label: t.goCerts, icon: iconArrow, action: () => jump('#certifications') },
      { group: t.groupNavigate, label: t.goContact, icon: iconArrow, action: () => jump('#contact') },
      ...contentItems,
    ];
  }

  function jump(sel) {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function init() {
    const backdrop = document.getElementById('cmdk-backdrop');
    const input = document.getElementById('cmdk-input');
    const list = document.getElementById('cmdk-list');
    if (!backdrop || !input || !list) return;

    let items = buildItems();
    let selected = 0;

    function render(filter) {
      const t = (window.PORTFOLIO_I18N[I18N.current] || window.PORTFOLIO_I18N.en).cmdk;
      const q = (filter || '').trim().toLowerCase();
      const filtered = items.filter(it => it.label.toLowerCase().includes(q));
      list.innerHTML = '';
      if (!filtered.length) {
        list.innerHTML = `<div class="cmdk-empty">${t.noResults}</div>`;
        return;
      }
      let lastGroup = null;
      filtered.forEach((it, i) => {
        if (it.group !== lastGroup) {
          const label = document.createElement('div');
          label.className = 'cmdk-group-label';
          label.textContent = it.group;
          list.appendChild(label);
          lastGroup = it.group;
        }
        const row = document.createElement('div');
        row.className = 'cmdk-item' + (i === selected ? ' selected' : '');
        row.innerHTML = `${it.icon}<span class="cmdk-item-label">${highlightMatch(it.label, q)}</span>`;
        row.addEventListener('click', () => { it.action(); close(); });
        row.addEventListener('mouseenter', () => { selected = i; updateSelection(); });
        list.appendChild(row);
      });
    }

    function highlightMatch(label, q) {
      if (!q) return label;
      const idx = label.toLowerCase().indexOf(q);
      if (idx === -1) return label;
      return label.slice(0, idx) + '<mark class="cmdk-match">' + label.slice(idx, idx + q.length) + '</mark>' + label.slice(idx + q.length);
    }

    function updateSelection() {
      Array.from(list.querySelectorAll('.cmdk-item')).forEach((el, i) => el.classList.toggle('selected', i === selected));
    }

    function open() {
      items = buildItems();
      selected = 0;
      render('');
      backdrop.classList.add('open');
      input.value = '';
      setTimeout(() => input.focus(), 60);
    }
    function close() { backdrop.classList.remove('open'); }

    document.addEventListener('keydown', e => {
      const isK = e.key === 'k' || e.key === 'K';
      if ((e.metaKey || e.ctrlKey) && isK) { e.preventDefault(); backdrop.classList.contains('open') ? close() : open(); }
      if (e.key === 'Escape') close();
      if (!backdrop.classList.contains('open')) return;
      const visible = list.querySelectorAll('.cmdk-item');
      if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(selected + 1, visible.length - 1); updateSelection(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); selected = Math.max(selected - 1, 0); updateSelection(); }
      if (e.key === 'Enter') {
        e.preventDefault();
        const filtered = items.filter(it => it.label.toLowerCase().includes(input.value.trim().toLowerCase()));
        if (filtered[selected]) { filtered[selected].action(); close(); }
      }
    });

    input.addEventListener('input', () => { selected = 0; render(input.value); });
    backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
    document.querySelectorAll('[data-cmdk-open]').forEach(btn => btn.addEventListener('click', open));
    document.addEventListener('langchange', () => { items = buildItems(); if (backdrop.classList.contains('open')) render(input.value); });
  }

  document.addEventListener('DOMContentLoaded', init);
})();

/* ============================================================================
   4. FILMSTRIP.JS — certifications autonomous ping-pong marquee
   ============================================================================ */

/* ==========================================================================
   CERTIFICATIONS FILMSTRIP — autonomous ping-pong marquee.
   x tracks how far the track has shifted left, from 0 (first card's left
   edge flush with the viewport's left edge) up to scrollDistance (last
   card's right edge flush with the viewport's right edge). dir flips at
   both bounds. Paused while hovered/focused so text stays readable, and
   auto-paused off-screen for free via PortfolioPerf's {el} gating.
   Disabled on touch/narrow viewports and prefers-reduced-motion — CSS
   swaps the viewport to a native swipeable scroller in both cases.
   ========================================================================== */
(function () {
  const perf = window.PortfolioPerf;
  const section = document.getElementById('certifications');
  const viewport = section && section.querySelector('.filmstrip-viewport');
  const track = document.getElementById('filmstrip-track');
  const progressFill = document.getElementById('filmstrip-progress-fill');
  if (!section || !viewport || !track || !perf) return;

  const SPEED = 34; // px per second

  function autoplayActive() {
    return window.innerWidth > 900 && !perf.reducedMotion;
  }

  let scrollDistance = 0;
  let x = 0;
  let dir = 1; // 1 = drifting right-to-left (x increasing), -1 = drifting left-to-right

  function measure() {
    if (!autoplayActive()) {
      track.style.transform = '';
      if (progressFill) progressFill.style.width = '0%';
      return;
    }
    scrollDistance = Math.max(track.scrollWidth - viewport.clientWidth, 0);
    x = Math.min(x, scrollDistance);
  }

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 200); });

  // Thumbnails loading late change track.scrollWidth — remeasure once they settle.
  track.querySelectorAll('img').forEach(img => {
    if (img.complete) return;
    img.addEventListener('load', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 60); }, { once: true });
  });

  let paused = false;
  track.addEventListener('mouseenter', () => { paused = true; });
  track.addEventListener('mouseleave', () => { paused = false; });
  track.addEventListener('focusin', () => { paused = true; });
  track.addEventListener('focusout', () => { paused = false; });

  /* ---------- Keyboard accessibility ----------
     BUG FIX: the cards had no tabindex at all, so Tab skipped over the
     whole filmstrip — a keyboard user could not reach, open, or scroll
     any certificate here. Making each card a real, focusable, Enter/
     Space-activatable control, then giving the already-focused track
     Left/Right arrow-key scrolling — the keyboard equivalent of the
     wheel/drag override just below. */
  const cards = Array.from(track.querySelectorAll('.filmstrip-card'));
  const CARD_STEP = (cards[0] ? cards[0].getBoundingClientRect().width : 360) + 28; // card width + track's gap
  cards.forEach(card => {
    if (!card.hasAttribute('tabindex')) card.tabIndex = 0;
    if (!card.hasAttribute('role')) card.setAttribute('role', 'button');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });
  track.addEventListener('keydown', e => {
    if (!autoplayActive() || scrollDistance <= 0) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); x = Math.min(x + CARD_STEP, scrollDistance); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); x = Math.max(x - CARD_STEP, 0); }
  });

  /* ---------- Manual override: scroll-wheel ----------
     While hovering (already paused above), the wheel/trackpad now moves
     the filmstrip directly instead of doing nothing. deltaX covers
     trackpads with horizontal swipe; deltaY covers plain mouse wheels —
     using whichever is larger means either input device works. The
     browser already reports a bigger delta for a faster scroll, so
     feeding that straight into x is what makes speed match how hard you
     scroll, with no artificial cap in between. */
  viewport.addEventListener('wheel', e => {
    if (!autoplayActive() || scrollDistance <= 0) return;
    // Only take over the wheel when there's actually somewhere to go —
    // otherwise leave normal page scrolling alone.
    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    x = Math.min(Math.max(x + delta, 0), scrollDistance);
  }, { passive: false });

  /* ---------- Manual override: click-and-drag ----------
     Grab-and-pull scrolling: the strip follows the cursor 1:1 while the
     mouse button is held down, same feel as dragging a native touch
     scroller. dragMoved tracks total distance so a genuine drag doesn't
     also trigger a card's "open certificate" click when released. */
  let dragging = false;
  let dragMoved = 0;
  let dragStartClientX = 0;
  let dragStartX = 0;

  track.addEventListener('mousedown', e => {
    if (!autoplayActive() || scrollDistance <= 0) return;
    dragging = true;
    dragMoved = 0;
    dragStartClientX = e.clientX;
    dragStartX = x;
    track.classList.add('dragging');
    e.preventDefault(); // stops text selection while dragging
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const delta = dragStartClientX - e.clientX; // drag left -> content moves left
    dragMoved = Math.max(dragMoved, Math.abs(delta));
    x = Math.min(Math.max(dragStartX + delta, 0), scrollDistance);
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove('dragging');
  });

  // A real drag (more than a few px) shouldn't also open the certificate
  // that happened to be under the cursor when the mouse was released.
  // Capture phase runs before each card's own click listener, so
  // stopping it here cleanly cancels that click everywhere below.
  track.addEventListener('click', e => {
    if (dragMoved > 6) { e.stopPropagation(); e.preventDefault(); }
  }, true);

  function frame(ts, dt) {
    if (!autoplayActive() || scrollDistance <= 0) return;
    if (!paused && !dragging) {
      x += dir * SPEED * (dt / 1000);
      if (x >= scrollDistance) { x = scrollDistance; dir = -1; } // last card's right edge hit the viewport's right edge
      if (x <= 0) { x = 0; dir = 1; } // first card's left edge hit the viewport's left edge
    }
    track.style.transform = `translate3d(${-x}px, 0, 0)`;
    if (progressFill) progressFill.style.width = (scrollDistance ? (x / scrollDistance) * 100 : 0) + '%';
  }

  document.addEventListener('DOMContentLoaded', () => {
    measure();
    perf.subscribe(frame, { el: section });
  });
})();
/* ============================================================================
   5. INTERACTIONS.JS — project tabs, certificate modal, copy buttons, vCard download
   ============================================================================ */

/* ==========================================================================
   PROJECT TABS + CERTIFICATE MODAL
   ========================================================================== */
(function () {
  function initProjectTabs() {
    const tabs = Array.from(document.querySelectorAll('.project-tab'));
    const panels = document.querySelectorAll('.project-panel');
    const indicator = document.getElementById('project-tab-indicator');
    const wrap = document.querySelector('.project-tabs');

    function moveIndicator(tab) {
      if (!indicator || !wrap || !tab) return;
      const tabRect = tab.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      indicator.style.setProperty('--tab-w', tabRect.width + 'px');
      indicator.style.setProperty('--tab-x', (tabRect.left - wrapRect.left) + 'px');
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        tab.classList.add('active');
        moveIndicator(tab);
        const target = tab.dataset.tab;
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
      });
    });

    // Position on load and keep it correct across resizes / language swaps
    const initial = () => moveIndicator(tabs.find(t => t.classList.contains('active')));
    setTimeout(initial, 50);
    window.addEventListener('resize', initial);
    document.addEventListener('langchange', () => setTimeout(initial, 50));
  }

  function initCertModal() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('certPrev');
    const nextBtn = document.getElementById('certNext');
    if (!modal || !modalImg) return;

    const cards = Array.from(document.querySelectorAll('[data-cert-image]'));
    let index = 0;
    let zoomed = false;

    function show(i) {
      index = (i + cards.length) % cards.length;
      zoomed = false;
      modalImg.classList.remove('zoomed');
      modalImg.src = cards[index].getAttribute('data-cert-image');
    }
    function open(i) {
      show(i);
      modal.style.display = 'flex';
      requestAnimationFrame(() => modal.classList.add('open'));
    }
    function close() {
      modal.classList.remove('open');
      setTimeout(() => { modal.style.display = 'none'; }, 200);
    }

    cards.forEach((card, i) => card.addEventListener('click', () => open(i)));
    closeBtn && closeBtn.addEventListener('click', close);
    prevBtn && prevBtn.addEventListener('click', e => { e.stopPropagation(); show(index - 1); });
    nextBtn && nextBtn.addEventListener('click', e => { e.stopPropagation(); show(index + 1); });
    modal.addEventListener('click', e => { if (e.target === modal) close(); });

    // Click/tap the image to toggle a simple zoom (a lightweight stand-in
    // for pinch-zoom that also works with mouse on desktop)
    modalImg.addEventListener('click', e => {
      e.stopPropagation();
      zoomed = !zoomed;
      modalImg.classList.toggle('zoomed', zoomed);
    });

    document.addEventListener('keydown', e => {
      if (modal.style.display !== 'flex') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'ArrowLeft') show(index - 1);
    });

    // Swipe left/right on mobile to move between certificates
    let touchStartX = 0;
    modal.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    modal.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  function initCopyButtons() {
    document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const text = btn.getAttribute('data-copy');
        const done = () => {
          btn.classList.add('copied');
          setTimeout(() => btn.classList.remove('copied'), 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(done);
        } else {
          const ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch (err) {}
          document.body.removeChild(ta);
          done();
        }
      });
    });
  }

  // NOTE: the "Save Contact" (.vcf download) feature was removed at the
  // user's request — the button that triggered it (id="add-to-contacts")
  // no longer exists in index.html; that spot in the Contact section now
  // links to the GitHub profile instead.

  document.addEventListener('DOMContentLoaded', () => {
    initProjectTabs();
    initCertModal();
    initCopyButtons();
  });
})();

/* ============================================================================
   6. PROJECT-SHOWCASE.JS — cursor-follow preview + full-screen case-study modal
   ============================================================================ */

/* ==========================================================================
   PROJECT SHOWCASE — cursor-follow preview thumbnail + full-screen
   case-study modal. Each .project-row carries its own <template
   class="project-case-content"> right in the HTML — no separate JS data
   object to keep in sync. Preview follow runs on the shared PortfolioPerf
   ticker; disabled outright on touch devices (pointer: coarse), where the
   CTA is always visible instead and tapping opens the modal directly.
   ========================================================================== */
(function () {
  const perf = window.PortfolioPerf;
  const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  /* ---------- Cursor-follow preview ---------- */
  function initPreviewFollow() {
    const float = document.getElementById('project-preview-float');
    const rows = Array.from(document.querySelectorAll('.project-row[data-preview], .project-row'));
    if (!float || !rows.length || isCoarse || !perf) return;

    let tx = 0, ty = 0, x = 0, y = 0, visible = false;

    function setContent(row) {
      const src = row.getAttribute('data-preview');
      float.innerHTML = '';
      if (src) {
        const img = new Image();
        img.alt = '';
        img.onerror = () => { float.innerHTML = fallbackMarkup(); };
        img.src = src;
        float.appendChild(img);
      } else {
        float.innerHTML = fallbackMarkup();
      }
    }
    function fallbackMarkup() {
      return '<div class="preview-fallback"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>';
    }

    rows.forEach(row => {
      row.addEventListener('mouseenter', () => { setContent(row); visible = true; float.classList.add('visible'); });
      row.addEventListener('mouseleave', () => { visible = false; float.classList.remove('visible'); });
      row.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    });

    perf.subscribe((ts, dt) => {
      if (!visible) return;
      const f = Math.min(1, (dt / 16.7) * 0.18);
      x += (tx - x) * f;
      y += (ty - y) * f;
      float.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
    });
  }

  /* ---------- Full-screen case-study modal ---------- */
  function initCaseModal() {
    const modal = document.getElementById('case-modal');
    const backdrop = document.getElementById('case-modal-backdrop');
    const body = document.getElementById('case-modal-body');
    const closeBtn = document.getElementById('case-modal-close');
    const rows = document.querySelectorAll('.project-row');
    if (!modal || !body || !rows.length) return;

    let lastTrigger = null;

    function open(row) {
      const tpl = row.querySelector('template.project-case-content');
      if (!tpl) return;
      body.innerHTML = '';
      body.appendChild(tpl.content.cloneNode(true));
      // BUG FIX: <template> content is inert and lives outside the main
      // document tree, so the page's one-time i18n pass on load never
      // reaches it. That's why every project's real description/trade-off
      // text — actually present and correct in translations.js — never
      // showed up here; only the template's literal "…" placeholder did,
      // in every language. Re-running the translator now that this
      // content is actually part of the live DOM fixes it.
      if (typeof I18N !== 'undefined' && I18N.applyLang) I18N.applyLang(I18N.current);
      body.scrollTop = 0;
      lastTrigger = row;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      // BUG FIX: plain .focus() makes the browser try to scroll the
      // focused element into view — even though it's already fully
      // visible inside this fixed-position modal, some browsers still
      // nudge the page's scroll position, which is exactly what made the
      // modal appear to open "a little low" and need scrolling up to see
      // the top. preventScroll stops that unwanted scroll adjustment.
      requestAnimationFrame(() => closeBtn && closeBtn.focus({ preventScroll: true }));
    }
    function close() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (lastTrigger) { lastTrigger.focus({ preventScroll: true }); lastTrigger = null; }
    }

    rows.forEach(row => {
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      row.addEventListener('click', () => open(row));
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(row); }
      });
    });

    closeBtn && closeBtn.addEventListener('click', close);
    backdrop && backdrop.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPreviewFollow();
    initCaseModal();
  });
})();
/* ============================================================================
   8. RESUME-MODAL.JS — resume as real content, not a separate PDF
   ============================================================================ */

/* ==========================================================================
   RESUME MODAL
   Same open/close pattern as the cert modal (interactions.js) — a modal
   with a backdrop and a close button — reused rather than reinvented.
   Exposed as window.ResumeModal.open()/close() so the command palette's
   resume action (and anything else) can trigger it without depending on
   load order or re-querying the DOM.
   "Save as PDF" doesn't generate a file — it calls window.print() while a
   body class scopes print.css to show only this modal's content, so the
   PDF a recruiter saves is always built from the exact same markup as the
   page itself. One source of truth, not two documents that can drift.
   ========================================================================== */
(function () {
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('resume-modal-close');
  const printBtn = document.getElementById('resume-print-btn');
  const printJpBtn = document.getElementById('resume-print-jp-btn');
  const heroTrigger = document.getElementById('hero-resume-btn');
  const dockTrigger = document.getElementById('dock-resume-btn');
  if (!modal) return;

  let lastFocused = null;

  function open() {
    lastFocused = document.activeElement;
    modal.classList.add('open');
    document.body.classList.add('resume-modal-open');
    // BUG FIX: same fix as the project case-study modal — plain .focus()
    // can make the browser nudge the page's scroll position even though
    // the focused element is already fully visible in this fixed-position
    // modal. preventScroll stops that unwanted shift. Also locking body
    // scroll while open (the case-study modal already did this, this one
    // hadn't) so the page behind can't scroll out of sync with the modal.
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeBtn && closeBtn.focus({ preventScroll: true }));
  }
  function close() {
    modal.classList.remove('open');
    document.body.classList.remove('resume-modal-open');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus({ preventScroll: true });
  }

  closeBtn && closeBtn.addEventListener('click', close);
  modal.querySelector('#resume-modal-backdrop')?.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
  printBtn && printBtn.addEventListener('click', () => window.print());

  /* Bilingual PDF export: switches the whole page to Japanese just long
     enough to print, then restores whatever language the visitor actually
     had — using I18N.applyLang() (not setLang()) means this never touches
     the visitor's saved language preference in localStorage. Reuses this
     exact same resume content/print.css, not a second document. */
  printJpBtn && printJpBtn.addEventListener('click', () => {
    if (typeof I18N === 'undefined') { window.print(); return; }
    const originalLang = I18N.current;
    if (originalLang === 'ja') { window.print(); return; }
    I18N.applyLang('ja');
    function restore() {
      I18N.applyLang(originalLang);
      window.removeEventListener('afterprint', restore);
    }
    window.addEventListener('afterprint', restore);
    // Two rAFs: let the browser actually paint the Japanese text before
    // the print dialog opens, rather than printing mid-switch.
    requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
  });

  heroTrigger && heroTrigger.addEventListener('click', open);
  dockTrigger && dockTrigger.addEventListener('click', open);

  window.ResumeModal = { open, close };
})();
