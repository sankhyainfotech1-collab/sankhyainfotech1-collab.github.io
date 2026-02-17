/**
 * app.js — shared logic for every page
 *
 * Covers:
 *  • Body fade-in on load
 *  • Navbar scroll glass effect
 *  • Mobile menu open/close
 *  • Scroll reveal (.reveal → .active via IntersectionObserver)
 *  • Solution card cursor glow (--x / --y CSS vars)
 *  • Reduced-motion respect
 */

/* ── Body fade-in ── */
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

document.addEventListener('DOMContentLoaded', () => {

  /* ── Reduced motion ── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--ease-spring', 'linear');
    document.documentElement.style.setProperty('--ease-smooth', 'linear');
  }

  /* ── Navbar scroll glass effect ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load in case page is already scrolled
  }

  /* ── Mobile menu ── */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    const OPEN_ICON  = '☰';
    const CLOSE_ICON = '✕';

    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.textContent = isOpen ? CLOSE_ICON : OPEN_ICON;
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.textContent = OPEN_ICON;
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.textContent = OPEN_ICON;
        document.body.style.overflow = '';
      }
    });

    // Close on orientation change
    window.addEventListener('orientationchange', () => {
      navLinks.classList.remove('active');
      menuToggle.textContent = OPEN_ICON;
      document.body.style.overflow = '';
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    });
  }

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ── Solution card cursor glow (--x / --y) ── */
  document.querySelectorAll('.solution-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - r.left}px`);
      card.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Viewport height fix for mobile browsers ── */
  const setVh = () =>
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  setVh();
  window.addEventListener('resize', setVh, { passive: true });

});
