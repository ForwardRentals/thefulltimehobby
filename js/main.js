// ===========================================
// THE FULL TIME HOBBY - Main JavaScript
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // Hero slideshow
    initHeroSlideshow();

    // Navigation scroll effect
    initNavScroll();

    // Mobile menu toggle
    initMobileMenu();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Portfolio filtering (if on work page)
    initPortfolioFilters();

    // Form handling
    initContactForm();

    // Fade in animations on scroll
    initScrollAnimations();

    // Stats counter animation
    initStatsCounter();

    // Parallax effects
    initParallax();

    // Text reveal animation
    initTextReveal();

    // Magnetic hover effect on buttons
    initMagneticButtons();

    // Image tilt effect on gallery
    initImageTilt();
});

// Hero Slideshow with smooth transitions
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 7000; // 7 seconds per slide

    function nextSlide() {
        const prevSlide = currentSlide;

        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;

        // Add active class to new slide first (crossfade)
        slides[currentSlide].classList.add('active');

        // Remove active from previous slide after brief delay
        setTimeout(() => {
            slides[prevSlide].classList.remove('active');
        }, 100);
    }

    // Start the slideshow
    setInterval(nextSlide, slideInterval);
}

// Parallax effect on hero content
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const heroScroll = document.querySelector('.hero-scroll');

    if (!heroContent) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.4;

        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));

            if (heroScroll) {
                heroScroll.style.opacity = 1 - (scrolled / 300);
            }
        }
    });
}

// Text reveal animation on load
function initTextReveal() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroCta = document.querySelector('.hero-cta');

    if (heroTagline) {
        heroTagline.style.opacity = '0';
        heroTagline.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTagline.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTagline.style.opacity = '1';
            heroTagline.style.transform = 'translateY(0)';
        }, 300);
    }

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 600);
    }

    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 900);
    }

    if (heroCta) {
        heroCta.style.opacity = '0';
        heroCta.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroCta.style.transition = 'opacity 1s ease, transform 1s ease';
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 1200);
    }
}

// Navigation scroll effect
function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Portfolio filtering
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (!filterBtns.length || !portfolioItems.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = '';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // For now, we'll use Formspree or similar service
        // Replace YOUR_FORM_ID with actual Formspree form ID
        try {
            const response = await fetch(form.action || 'https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.innerHTML = `
                    <div class="form-success">
                        <h3>Message Sent!</h3>
                        <p>Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
                    </div>
                `;
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('There was an error sending your message. Please try again or email directly.');
        }
    });
}

// Stats counter animation
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    // Different durations for each counter so they finish at different times
    const durations = [2800, 3500, 4200, 3100];

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const index = Array.from(counters).indexOf(counter);
                const duration = durations[index] || 3500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function for smooth animation
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentValue = Math.floor(easeOutQuart * target);

                    counter.textContent = currentValue.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                }

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.featured-item, .portfolio-item, .stat-item').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
}

// Magnetic hover effect on buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Image tilt effect on gallery and portfolio items
function initImageTilt() {
    const items = document.querySelectorAll('.gallery-item, .portfolio-item');

    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in-element.visible {
        opacity: 1;
        transform: translateY(0);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .form-success {
        text-align: center;
        padding: 3rem;
    }

    .form-success h3 {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 1rem;
    }

    .form-success p {
        color: #888;
    }
`;
document.head.appendChild(style);
