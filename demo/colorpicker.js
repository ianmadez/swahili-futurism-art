document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  const themePalettes = {
    swahili: {
      charcoal: { val: '#111215', name: 'Matte Charcoal', meta: '#111215 · Primary Text' },
      white:    { val: '#FFFFFF', name: 'Pure White',      meta: '#FFFFFF · Surface Light' },
      silver:   { val: '#DCE1E7', name: 'Silver Plaster',  meta: '#DCE1E7 · Structural Walls' },
      clay:     { val: '#9E3E28', name: 'Terracotta',      meta: '#9E3E28 · Live Status Mark' }
    },
    zanzalu: {
      charcoal: { val: '#012350', name: 'Midnight Navy',   meta: '#012350 · Primary Titling' },
      white:    { val: '#FFFFFF', name: 'Surface White',   meta: '#FFFFFF · Card Surface' },
      silver:   { val: '#029BBD', name: 'Ocean Cyan',      meta: '#029BBD · Structural Accent' },
      clay:     { val: '#F2415D', name: 'Punch Coral',     meta: '#F2415D · Live Key Action' }
    }
  };

  let currentTheme = 'swahili';

  const colorBindings = [
    {
      key: 'charcoal',
      boxSelector: '[data-color-key="charcoal"]',
      inputId: 'picker-charcoal',
      cssVar: '--text-main',
      hexLabelId: 'hex-charcoal'
    },
    {
      key: 'white',
      boxSelector: '[data-color-key="white"]',
      inputId: 'picker-white',
      cssVar: '--bg-surface',
      hexLabelId: 'hex-white'
    },
    {
      key: 'silver',
      boxSelector: '[data-color-key="silver"]',
      inputId: 'picker-silver',
      cssVar: '--bg-silver',
      hexLabelId: 'hex-silver',
      extraVar: '--silver-tint'
    },
    {
      key: 'clay',
      boxSelector: '[data-color-key="clay"]',
      inputId: 'picker-clay',
      cssVar: '--accent-clay',
      hexLabelId: 'hex-clay'
    }
  ];

  function applyTheme(themeName) {
    currentTheme = themeName;
    root.setAttribute('data-theme', themeName);

    // Sync all toggle buttons on page
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      if (btn.getAttribute('data-theme-val') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (themeName === 'zanzalu') {
      root.style.setProperty('--bg-page', '#fdfad9');
      root.style.setProperty('--bg-plaster', '#f4f0cb');
      root.style.setProperty('--bg-surface', '#FFFFFF');
      root.style.setProperty('--text-main', '#012350');
      root.style.setProperty('--text-muted', '#303030');
      root.style.setProperty('--border-subtle', '#e4e0ba');
      root.style.setProperty('--border-strong', '#029bbd');
      root.style.setProperty('--accent-clay', '#f2415d');
    } else {
      root.style.setProperty('--bg-page', '#F4F5F7');
      root.style.setProperty('--bg-plaster', '#EAECEF');
      root.style.setProperty('--bg-surface', '#FFFFFF');
      root.style.setProperty('--text-main', '#111215');
      root.style.setProperty('--text-muted', '#676D77');
      root.style.setProperty('--border-subtle', '#D8DDE4');
      root.style.setProperty('--border-strong', '#B8C0CB');
      root.style.setProperty('--accent-clay', '#9E3E28');
    }

    // Refresh Tab 3 Swatch Cards
    const palette = themePalettes[themeName];
    colorBindings.forEach(({ key, boxSelector, inputId, hexLabelId }) => {
      const token = palette[key];
      const box = document.querySelector(boxSelector);
      const input = document.getElementById(inputId);
      const label = document.getElementById(hexLabelId);
      const nameEl = box ? box.querySelector('.swatch-name') : null;
      const swatch = box ? box.querySelector('.spec-swatch-color') : null;

      if (input) input.value = token.val;
      if (swatch) swatch.style.background = token.val;
      if (nameEl) nameEl.textContent = token.name;
      if (label) label.textContent = token.meta;
    });
  }

  // Interactive Live Color Inputs
  colorBindings.forEach(({ boxSelector, inputId, cssVar, hexLabelId, extraVar }) => {
    const box = document.querySelector(boxSelector);
    const input = document.getElementById(inputId);
    const label = document.getElementById(hexLabelId);
    const swatch = box ? box.querySelector('.spec-swatch-color') : null;

    if (input && box) {
      input.addEventListener('input', (e) => {
        const val = e.target.value.toUpperCase();
        root.style.setProperty(cssVar, val);
        if (extraVar) root.style.setProperty(extraVar, val);
        if (swatch) swatch.style.background = val;
        if (label) label.textContent = `${val} · Custom`;
      });
    }
  });

  // Global & In-Page Theme Button Handlers
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const selected = btn.getAttribute('data-theme-val');
      applyTheme(selected);
    });
  });

  // Reset Button
  const resetBtn = document.getElementById('resetColorsBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      applyTheme(currentTheme);
    });
  }
});