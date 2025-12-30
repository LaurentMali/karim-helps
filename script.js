/* ========================================
   KARIM HELPS - JAVASCRIPT
   ======================================== */

// ========================================
// INIT AOS (Animate On Scroll)
// ========================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ========================================
// STICKY HEADER ON SCROLL
// ========================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// HERO SLIDER
// ========================================
const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
const heroDotsContainer = document.getElementById('heroDots');

let currentHeroSlide = 0;
let heroSlideInterval;

// Create dots
heroSlides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('hero-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToHeroSlide(index));
    heroDotsContainer.appendChild(dot);
});

const heroDots = document.querySelectorAll('.hero-dot');

function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        heroDots[i].classList.remove('active');
    });

    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    currentHeroSlide = index;
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
}

function prevHeroSlide() {
    currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
}

function goToHeroSlide(index) {
    showHeroSlide(index);
    resetHeroInterval();
}

function resetHeroInterval() {
    clearInterval(heroSlideInterval);
    heroSlideInterval = setInterval(nextHeroSlide, 5000);
}

// Event listeners
heroNext.addEventListener('click', () => {
    nextHeroSlide();
    resetHeroInterval();
});

heroPrev.addEventListener('click', () => {
    prevHeroSlide();
    resetHeroInterval();
});

// Auto-play
heroSlideInterval = setInterval(nextHeroSlide, 5000);

// Pause on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => clearInterval(heroSlideInterval));
heroSection.addEventListener('mouseleave', () => {
    heroSlideInterval = setInterval(nextHeroSlide, 5000);
});

// ========================================
// COUNTER ANIMATION (Impact Stats)
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString('de-DE');
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString('de-DE') + '+';
            }
        };

        updateCounter();
    });

    counterAnimated = true;
}

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.impact-stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================================
// TESTIMONIALS SLIDER
// ========================================
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialDotsContainer = document.getElementById('testimonialDots');

let currentTestimonial = 0;
let testimonialInterval;

// Create dots
testimonialItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    testimonialDotsContainer.appendChild(dot);
});

const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
    testimonialItems.forEach((item, i) => {
        item.classList.remove('active');
        testimonialDots[i].classList.remove('active');
    });

    testimonialItems[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    showTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    showTestimonial(index);
    resetTestimonialInterval();
}

function resetTestimonialInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 6000);
}

// Auto-play testimonials
testimonialInterval = setInterval(nextTestimonial, 6000);

// Pause on hover
const testimonialsSection = document.querySelector('.testimonials-slider');
if (testimonialsSection) {
    testimonialsSection.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    testimonialsSection.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 6000);
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for empty anchors or just #
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ========================================
// CARD HOVER EFFECTS (Additional)
// ========================================
const actionCards = document.querySelectorAll('.action-card');

actionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// ========================================
// LAZY LOADING IMAGES (Optional Enhancement)
// ========================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ========================================
// PRELOADER (Optional - uncomment if you add a preloader)
// ========================================
/*
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
*/

// ========================================
// FORM VALIDATION (If you add contact forms)
// ========================================
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Add your form validation logic here
        const formData = new FormData(form);

        // Example: Send to server or show success message
        console.log('Form submitted:', Object.fromEntries(formData));

        // Show success message (you can customize this)
        alert('Vielen Dank für deine Nachricht!');
        form.reset();
    });
});

// ========================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ========================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.classList.add('scroll-top-btn');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0,184,148,0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 6px 20px rgba(0,184,148,0.4)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(0,184,148,0.3)';
});

// ========================================
// CONSOLE LOG (Remove in production)
// ========================================
console.log('Karim Helps Website loaded successfully! 🚀');
console.log('Developed with ❤️');

// ========================================
// PERFORMANCE MONITORING (Optional)
// ========================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
}