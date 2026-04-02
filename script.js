/* ================================================
   Muhammad Numan — Portfolio JavaScript
   Theme toggle, nav, scroll reveals, counters
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================
    // THEME TOGGLE
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);

        // Re-init icons after theme switch
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    // ==========================================
    // NAVBAR — scroll shadow + active link
    // ==========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');

    function onScroll() {
        const scrollY = window.scrollY;

        // Navbar shadow
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 400);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once

    // ==========================================
    // HAMBURGER MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinksContainer.classList.toggle('open');
            document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinksContainer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // BACK TO TOP
    // ==========================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // SCROLL REVEAL (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show everything
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // ==========================================
    // ANIMATED COUNTERS
    // ==========================================
    const counters = document.querySelectorAll('[data-count]');

    if ('IntersectionObserver' in window && counters.length) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(el => countObserver.observe(el));
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1500;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    // ==========================================
    // SKILL BARS ANIMATION
    // ==========================================
    const skillFills = document.querySelectorAll('.skill-fill');

    if ('IntersectionObserver' in window && skillFills.length) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillFills.forEach(el => skillObserver.observe(el));
    }

    // ==========================================
    // CONTACT FORM — basic client-side handling
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) return;

            // Construct mailto link as fallback
            const subject = encodeURIComponent('Portfolio Contact from ' + name);
            const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
            window.location.href = 'mailto:Mnuman1911@gmail.com?subject=' + subject + '&body=' + body;

            // Reset form
            contactForm.reset();
        });
    }

    // ==========================================
    // SMOOTH SCROLL for anchor links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
