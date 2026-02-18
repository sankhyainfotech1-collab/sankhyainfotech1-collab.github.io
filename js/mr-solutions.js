/**
 * mr-solutions.js — page-specific interactions for mr-solutions.html
 *
 * Covers:
 *  • Hero image + text scroll parallax
 *  • Industry block image parallax
 *  • Expertise card 3D tilt
 *  • About button magnetic effect
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hero subtle parallax (refined) ── */
  const mrHero = document.querySelector('.mr-hero');
  const mrImage = document.querySelector('.mr-hero-right img');
  const mrText = document.querySelector('.mr-hero-left');

  if (mrHero && mrImage && mrText) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = mrHero.offsetHeight;

      if (scrollY > heroHeight) return;

      // Subtle movement instead of zoom
      mrImage.style.transform = `translateY(${scrollY * 0.08}px)`;
      mrText.style.transform = `translateY(-${scrollY * 0.12}px)`;
    }, { passive: true });
  }


  /* ── Industry block image parallax ── */
  const blockImages = document.querySelectorAll('.mr-block img');

  if (blockImages.length) {
    window.addEventListener('scroll', () => {
      blockImages.forEach((img, i) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < innerHeight && rect.bottom > 0) {
          const offset = rect.top - innerHeight / 2;
          img.style.transform = `translateY(${offset * (0.15 + i * 0.05) * -0.3}px)`;
        }
      });
    }, { passive: true });
  }

  /* ── Expertise card 3D tilt ── */
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const rotX = ((e.clientY - top) / height - 0.5) * -10;
      const rotY = ((e.clientX - left) / width - 0.5) * 10;
      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
  });

  /* ── About button magnetic effect ── */
  const aboutBtn = document.querySelector('.about-btn');
  if (aboutBtn) {
    aboutBtn.addEventListener('mousemove', e => {
      const { left, top, width, height } = aboutBtn.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.3;
      const y = (e.clientY - top - height / 2) * 0.3;
      aboutBtn.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    });

    aboutBtn.addEventListener('mouseleave', () => {
      aboutBtn.style.transform = 'translate(0, 0) scale(1)';
    });
  }

});
