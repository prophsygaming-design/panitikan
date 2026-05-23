/* ============================================================
   PANTIKAN PALINPUNAN – Modern page.js with GSAP
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Force Dark Mode
    document.documentElement.classList.add('dark');

    // 2. Mobile Menu
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });

    // 3. Navbar Scrolled State
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('nav-scrolled');
            header.classList.remove('py-4');
            header.classList.add('py-2');
        } else {
            header.classList.remove('nav-scrolled');
            header.classList.add('py-4');
            header.classList.remove('py-2');
        }
    }, { passive: true });

    // 4. GSAP Animations
    // Ensure GSAP and ScrollTrigger are loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Entrance
        const heroTl = gsap.timeline();
        heroTl.to('.hero-elem', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.2
        });

        // Hero Parallax using GSAP ScrollTrigger
        gsap.to('.parallax-bg', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: "#tahanan",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Section Headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%",
                    once: true
                }
            });
        });

        // Cards Stagger Animation (triggered per section for optimal performance and exact timing)
        const cardContainers = ['#kahulugan', '#tagapaglikha'];
        cardContainers.forEach(containerId => {
            const container = document.querySelector(containerId);
            if (container) {
                const cards = container.querySelectorAll('.card-elem');
                if (cards.length > 0) {
                    gsap.fromTo(cards, 
                        { y: 60, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            stagger: 0.15,
                            scrollTrigger: {
                                trigger: container,
                                start: "top 75%",
                                once: true
                            }
                        }
                    );
                }
            }
        });

        // Timeline Elements Animation
        gsap.utils.toArray('.timeline-elem').forEach((elem, i) => {
            const xOffset = i % 2 === 0 ? -50 : 50;
            gsap.from(elem, {
                x: xOffset,
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 80%",
                    once: true
                }
            });
        });
    }

    // 5. Handle smooth scroll to anchor when landing on the page (e.g., returning from a subpage)
    if (window.location.hash) {
        const hash = window.location.hash;
        // Wait for entrance animations and layout calculations to complete
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                // Refresh ScrollTrigger to calculate exact DOM heights
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }

                // Offset calculation to clear the sticky navigation header
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 350);
    }
});

// Refresh ScrollTrigger when resources are fully loaded and on page restoration (bfcache)
window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});
window.addEventListener('pageshow', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});