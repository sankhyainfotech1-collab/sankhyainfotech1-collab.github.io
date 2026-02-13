/* ===== ENHANCED ANIMATIONS & INTERACTIONS ===== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {

    /* ===== ADD DATA-TEXT ATTRIBUTE FOR GLITCH EFFECT ===== */
    const web3Heading = document.querySelector('.web3-left h2');
    if (web3Heading) {
        const textContent = web3Heading.textContent.replace(/\s+/g, ' ').trim();
        web3Heading.setAttribute('data-text', textContent);
    }

    /* ===== SOLUTION CARDS MOUSE TRACKING ===== */
    const solutionCards = document.querySelectorAll('.solution-card');

    solutionCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    /* ===== SCROLL-TRIGGERED ANIMATIONS ===== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger special effects for specific sections
                if (entry.target.classList.contains('web3-section')) {
                    triggerWeb3Animations();
                }

                if (entry.target.classList.contains('about-premium')) {
                    triggerAboutAnimations();
                }
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.web3-section, .about-premium');
    sections.forEach(section => observer.observe(section));

    /* ===== TRIGGER WEB3 ANIMATIONS ===== */
    function triggerWeb3Animations() {
        // CSS animations will handle this automatically
        // Just ensure elements are visible
        const features = document.querySelectorAll('.web3-feature');
        features.forEach(feature => {
            feature.style.visibility = 'visible';
        });
    }

    /* ===== TRIGGER ABOUT ANIMATIONS ===== */
    function triggerAboutAnimations() {
        // CSS animations will handle this automatically
        const cards = document.querySelectorAll('.about-card');
        const btn = document.querySelector('.about-btn');

        cards.forEach(card => {
            card.style.visibility = 'visible';
        });

        if (btn) {
            btn.style.visibility = 'visible';
        }
    }

    /* ===== MAGNETIC BUTTON EFFECT ===== */
    const aboutBtn = document.querySelector('.about-btn');

    if (aboutBtn) {
        aboutBtn.addEventListener('mousemove', (e) => {
            const rect = aboutBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.3;
            const moveY = y * 0.3;

            aboutBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });

        aboutBtn.addEventListener('mouseleave', () => {
            aboutBtn.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    /* ===== STACK GRAPHIC INTERACTION ===== */
    const stackGraphic = document.querySelector('.stack-graphic');

    if (stackGraphic) {
        stackGraphic.addEventListener('click', () => {
            // Reset all animations
            stackGraphic.querySelectorAll('span').forEach(span => {
                span.style.animation = 'none';
                void span.offsetWidth; // Trigger reflow
                span.style.animation = '';
            });
        });
    }

    /* ===== REVEAL ANIMATION OBSERVER ===== */
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    /* ===== SMOOTH SCROLL ENHANCEMENT ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ===== PERFORMANCE OPTIMIZATION ===== */
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.01ms';
            el.style.transitionDuration = '0.01ms';
        });
    }

    /* ===== LOADING ANIMATION ===== */
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

});

/* ===== UTILITY FUNCTIONS ===== */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for mouse events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


/* ===== SCROLL PARALLAX FOR MR PAGE ===== */

const mrHero = document.querySelector(".mr-hero");
const mrImage = document.querySelector(".mr-hero-right img");
const mrText = document.querySelector(".mr-hero-left");

window.addEventListener("scroll", () => {
    if (!mrHero) return;

    const scrollY = window.scrollY;
    const heroHeight = mrHero.offsetHeight;

    // Only animate while hero is visible
    if (scrollY <= heroHeight) {

        // Image zoom-out effect
        const scale = 1 + scrollY * 0.0003;
        mrImage.style.transform = `scale(${scale})`;

        // Text subtle upward movement
        const translate = scrollY * 0.25;
        mrText.style.transform = `translateY(-${translate}px)`;
    }
});

/* ===== SMART PARALLAX FOR MR IMAGES ===== */

const parallaxSections = document.querySelectorAll(".mr-block img");

window.addEventListener("scroll", () => {

    parallaxSections.forEach((img, i) => {

        const rect = img.getBoundingClientRect();

        // Only animate when section is visible
        if (rect.top < window.innerHeight && rect.bottom > 0) {

            // distance from center of screen
            const offset = rect.top - window.innerHeight / 2;

            // slower, controlled movement
            const speed = 0.15 + i * 0.05;

            img.style.transform = `translateY(${offset * speed * -0.3}px)`;
        }

    });

});



/* ===== EXPERTISE CARD TILT ===== */

document.querySelectorAll(".tilt").forEach(card => {

    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y / rect.height - 0.5) * -10;
        const rotateY = (x / rect.width - 0.5) * 10;

        card.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });

});
