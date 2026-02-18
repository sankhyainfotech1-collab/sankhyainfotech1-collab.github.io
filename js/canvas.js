/**
 * canvas.js — animated grid background + mouse cursor glow
 * Used on: ALL pages (index after-hero, defence, aerospace, energy, mr-solutions, investor)
 *
 * ─────────────────────────────────────────────────────────────
 *  TO CHANGE THE CURSOR HIGHLIGHT — edit ONLY these values:
 * ─────────────────────────────────────────────────────────────
 */
const CANVAS_CONFIG = {
  // Grid
  GRID_SPACING:    60,                          // px between grid lines
  GRID_COLOR:      'rgba(120, 160, 255, 0.10)', // grid line colour + opacity

  // Mouse glow circle
  GLOW_RADIUS:     180,                         // px — size of the glow circle
  GLOW_COLOR_CORE: 'rgba(100, 140, 255, 0.18)', // colour at centre of glow
  GLOW_COLOR_MID:  'rgba(100, 140, 255, 0.08)', // colour at 50% radius
  GLOW_COLOR_EDGE: 'rgba(100, 140, 255, 0.00)', // colour at edge (keep transparent)
  GLOW_LERP:       0.10,                        // 0.01 = very slow follow · 1.0 = instant

  // Grid scroll speed
  SCROLL_SPEED:    0.15,                        // px per frame — how fast lines drift
};
/* ─────────────────────────────────────────────────────────────── */

(() => {
  /* ── Which canvas element to target ── */
  // index page uses #mr-tech-bg inside .after-hero (absolute positioned)
  // all other pages use #mr-tech-bg fixed to viewport
  const canvas = document.getElementById('mr-tech-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const isFixed = getComputedStyle(canvas).position === 'fixed';

  /* ── Sizing ── */
  function resize() {
    if (isFixed) {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    } else {
      // absolute canvas inside .after-hero wrapper
      const wrapper = canvas.parentElement;
      canvas.width  = wrapper ? wrapper.offsetWidth  : window.innerWidth;
      canvas.height = wrapper ? wrapper.offsetHeight : window.innerHeight;
    }
  }

  resize();
  window.addEventListener('resize', resize);

  /* ── Mouse tracking ── */
  let mouseX  = canvas.width  / 2;
  let mouseY  = canvas.height / 2;
  let targetX = mouseX;
  let targetY = mouseY;

  document.addEventListener('mousemove', e => {
    if (isFixed) {
      // Fixed canvas: mouse coords are already viewport-relative
      targetX = e.clientX;
      targetY = e.clientY;
    } else {
      // Absolute canvas: subtract canvas offset from page
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    }
  });

  /* ── Grid scroll offset ── */
  let offset = 0;

  /* ── Draw frame ── */
  function draw() {
    const { GRID_SPACING, GRID_COLOR, GLOW_RADIUS,
            GLOW_COLOR_CORE, GLOW_COLOR_MID, GLOW_COLOR_EDGE } = CANVAS_CONFIG;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Grid lines */
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth   = 1;

    for (let x = offset % GRID_SPACING; x < canvas.width; x += GRID_SPACING) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = offset % GRID_SPACING; y < canvas.height; y += GRID_SPACING) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    /* Cursor glow — drawn as arc so it's always a perfect circle */
    const glow = ctx.createRadialGradient(
      mouseX, mouseY, 0,
      mouseX, mouseY, GLOW_RADIUS
    );
    glow.addColorStop(0,   GLOW_COLOR_CORE);
    glow.addColorStop(0.5, GLOW_COLOR_MID);
    glow.addColorStop(1,   GLOW_COLOR_EDGE);

    ctx.beginPath();
    ctx.arc(mouseX, mouseY, GLOW_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
  }

  /* ── Animation loop ── */
  function animate() {
    /* Smooth lerp — glow trails mouse softly */
    mouseX += (targetX - mouseX) * CANVAS_CONFIG.GLOW_LERP;
    mouseY += (targetY - mouseY) * CANVAS_CONFIG.GLOW_LERP;

    offset += CANVAS_CONFIG.SCROLL_SPEED;
    if (offset >= CANVAS_CONFIG.GRID_SPACING) offset = 0;

    draw();
    requestAnimationFrame(animate);
  }

  animate();
})();
