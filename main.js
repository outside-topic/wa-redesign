document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Swiper Initialization - Featured Courses
    const courseSwiper = new Swiper('.course-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        }
    });

    // 3. Swiper Initialization - Testimonials
    const testiSwiper = new Swiper('.testi-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
        }
    });

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // 5. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    const heroTl = gsap.timeline();
    heroTl.from('.hero-title', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' })
          .from('.hero-text', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.hero-actions .btn', { opacity: 0, y: 20, duration: 0.6, stagger: 0.2, ease: 'power3.out' }, '-=0.4')
          .from('.hero-image', { opacity: 0, x: 50, duration: 1, ease: 'power3.out' }, '-=0.8');

    // Section Titles Fade In
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
            },
            opacity: 0,
            y: 30,
            duration: 0.8
        });
    });

    // Stats Counter Animation
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        ScrollTrigger.create({
            trigger: statsSection,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                const counters = document.querySelectorAll('.counter-val');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: 'power2.out'
                    });
                });
            }
        });
    }

    // Fade In Up for Cards/Items
    const animateElements = ['.why-item', '.cat-card', '.faculty-card', '.blog-card'];
    animateElements.forEach(selector => {
        gsap.utils.toArray(selector).forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: (i % 4) * 0.1 // Staggering effect per row roughly
            });
        });
    });
});
