document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  const colorBindings = [
    {
      boxSelector: '[data-color-key="charcoal"]',
      inputId: 'picker-charcoal',
      cssVar: '--text-main',
      hexLabelId: 'hex-charcoal',
      defaultVal: '#111215'
    },
    {
      boxSelector: '[data-color-key="white"]',
      inputId: 'picker-white',
      cssVar: '--bg-surface',
      hexLabelId: 'hex-white',
      extraVar: '--bg-page',
      defaultVal: '#FFFFFF'
    },
    {
      boxSelector: '[data-color-key="silver"]',
      inputId: 'picker-silver',
      cssVar: '--bg-silver',
      hexLabelId: 'hex-silver',
      extraVar: '--silver-tint',
      defaultVal: '#DCE1E7'
    },
    {
      boxSelector: '[data-color-key="clay"]',
      inputId: 'picker-clay',
      cssVar: '--accent-clay',
      hexLabelId: 'hex-clay',
      defaultVal: '#9E3E28'
    }
  ];

  colorBindings.forEach(({ boxSelector, inputId, cssVar, hexLabelId, extraVar, defaultVal }) => {
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

  // Reset to Defaults Button Handler
  const resetBtn = document.getElementById('resetColorsBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      colorBindings.forEach(({ boxSelector, inputId, cssVar, hexLabelId, extraVar, defaultVal }) => {
        const box = document.querySelector(boxSelector);
        const input = document.getElementById(inputId);
        const label = document.getElementById(hexLabelId);
        const swatch = box ? box.querySelector('.spec-swatch-color') : null;

        if (input) input.value = defaultVal;
        root.style.setProperty(cssVar, defaultVal);
        if (extraVar) root.style.setProperty(extraVar, defaultVal);
        if (swatch) swatch.style.background = defaultVal;
        if (label) {
          const titles = {
            'hex-charcoal': 'Primary Text',
            'hex-white': 'Surface Light',
            'hex-silver': 'Structural Walls',
            'hex-clay': 'Live Status Mark'
          };
          label.textContent = `${defaultVal} · ${titles[hexLabelId] || ''}`;
        }
      });
    });
  }
});