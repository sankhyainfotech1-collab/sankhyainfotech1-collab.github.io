/* ===== MOBILE MENU FUNCTIONALITY ===== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '✕';
            } else {
                menuToggle.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    }
    
    // Navbar scroll effect (works on all pages)
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Prevent body scroll when mobile menu is open
    if (navLinks) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (navLinks.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        
        observer.observe(navLinks, { attributes: true });
    }
    
    // Touch-friendly hover effects for mobile
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.solution-card, .web3-feature, .about-card, .mr-card');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
    
    // Optimize canvas for mobile devices
    function optimizeCanvasForMobile() {
        const canvases = document.querySelectorAll('canvas');
        
        if (window.innerWidth <= 768) {
            canvases.forEach(canvas => {
                // Reduce canvas quality on mobile for better performance
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    canvas.style.imageRendering = 'optimizeSpeed';
                }
            });
        }
    }
    
    optimizeCanvasForMobile();
    window.addEventListener('resize', optimizeCanvasForMobile);
    
    // Smooth scroll for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 60; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Optimize scroll animations for mobile
    if (window.innerWidth <= 768) {
        const reveals = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        reveals.forEach(el => revealObserver.observe(el));
    }
});

// Handle orientation change
window.addEventListener('orientationchange', function() {
    // Close mobile menu on orientation change
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '☰';
        }
    }
    
    // Reload canvas backgrounds
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
});

// Prevent zoom on double tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add viewport height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
