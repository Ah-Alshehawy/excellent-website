/**
 * Excellent Franchise Management Co.
 * Main JavaScript File
 * Unified script for all pages
 */

// =======================
// Year Update
// =======================
document.addEventListener('DOMContentLoaded', function () {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// =======================
// Mobile Menu Toggle
// =======================
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const menuToggle = document.querySelector('.menu-toggle');

    if (nav) {
        nav.classList.toggle('active');

        // Add animation to hamburger menu
        if (menuToggle) {
            menuToggle.classList.toggle('active');
        }
    }
}


// Menu now only closes when clicking the toggle button again
// Removed auto-close on outside click and link click for better UX


// =======================
// Intersection Observer for Scroll Animations
// =======================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counters if they exist in this section
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out quartic
                    const ease = 1 - Math.pow(1 - progress, 4);

                    const current = Math.floor(ease * target);
                    counter.innerText = current + (counter.innerText.includes('+') ? '+' : '');

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target + (counter.getAttribute('data-target').includes('+') ? '+' : '');
                    }
                }

                requestAnimationFrame(update);
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', function () {
    // Add animation to common elements
    const elementsToAnimate = document.querySelectorAll(
        '.section-header, .capability-card, .service-card, .value-card, ' +
        '.brand-highlight, .two-column > div, .bullet-list, .contact-item, ' +
        '.hero-card, .stats-grid, .contact-form'
    );

    elementsToAnimate.forEach(el => {
        if (!el.classList.contains('animate-on-scroll')) {
            el.classList.add('animate-on-scroll');
        }
        observer.observe(el);
    });

    // Add stagger class to grids
    document.querySelectorAll('.capabilities-grid, .services-grid, .values-grid, .stats-grid').forEach(grid => {
        if (!grid.classList.contains('stagger-children')) {
            grid.classList.add('stagger-children');
        }
    });
});

// =======================
// Header Scroll Effect
// =======================
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// =======================
// Back to Top Button
// =======================
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Back to Top Click Event
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =======================
// Smooth Scroll for Anchor Links
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =======================
// Form Enhancement (if contact form exists)
// =======================
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Add your form submission logic here
        // For now, just show an alert
        alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');

        // Reset form
        this.reset();
    });
}

// =======================
// Add Loading Animation for Images
// =======================
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';

            img.addEventListener('load', function () {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            });
        }
    });
});

// =======================
// Performance: Lazy Loading for Background Images
// =======================
if ('IntersectionObserver' in window) {
    const lazyBackgrounds = document.querySelectorAll('.lazy-bg');

    const lazyBgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bg = entry.target;
                const bgImage = bg.getAttribute('data-bg');

                if (bgImage) {
                    bg.style.backgroundImage = `url('${bgImage}')`;
                    bg.classList.remove('lazy-bg');
                }

                lazyBgObserver.unobserve(bg);
            }
        });
    });

    lazyBackgrounds.forEach(bg => {
        lazyBgObserver.observe(bg);
    });
}

// =======================
// IMAGE CAROUSEL
// =======================
let slideIndex = 1;

function moveCarousel(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');

    if (!slides.length) return;

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex - 1].classList.add('active');
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-play carousel
let autoplayInterval;
function startAutoplay() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        autoplayInterval = setInterval(() => {
            moveCarousel(1);
        }, 3500); // Change slide every 3.5 seconds (medium speed)
    }
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.image-carousel');
    if (carousel) {
        showSlide(slideIndex);
        startAutoplay();

        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            startAutoplay();
        });
    }
});

