/* ═══════════════════════════════════════════════════════════
   BEGIN PAGE — "Before we begin..."
   Minimal JavaScript: reveal animations, cursor, nav scroll
   ═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Gentle Scroll Reveal ───────────────────────────────
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    document.querySelectorAll('.begin-reveal').forEach((el) => {
        revealObserver.observe(el);
    });

    // ─── Custom Cursor ──────────────────────────────────────
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (dot && ring) {
        let mouseX = 0,
            mouseY = 0;
        let ringX = 0,
            ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Click effect
        document.addEventListener('mousedown', () => dot.classList.add('click'));
        document.addEventListener('mouseup', () => dot.classList.remove('click'));

        // Hover expansion on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, [role="button"]');
        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
        });
    }

    // ─── Scroll Progress Bar ────────────────────────────────
    const progressBar = document.getElementById('scroll-progress');

    if (progressBar) {
        window.addEventListener(
            'scroll',
            () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                progressBar.style.width = progress + '%';
            },
            { passive: true }
        );
    }

    // ─── Nav Glassmorphism on Scroll ────────────────────────
    const nav = document.getElementById('main-nav');

    if (nav) {
        let lastScrollY = 0;

        window.addEventListener(
            'scroll',
            () => {
                lastScrollY = window.scrollY;
                if (lastScrollY > 60) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            },
            { passive: true }
        );
    }

    // ─── Accordion Logic ────────────────────────────────────
    const accordions = document.querySelectorAll('.begin-accordion-item');

    accordions.forEach(accordion => {
        const trigger = accordion.querySelector('.begin-accordion-trigger');
        const content = accordion.querySelector('.begin-accordion-content');
        const icon = accordion.querySelector('.begin-accordion-icon');

        trigger.addEventListener('click', () => {
            const isExpanded = accordion.classList.contains('expanded');

            // Close all
            accordions.forEach(acc => {
                acc.classList.remove('expanded');
                acc.querySelector('.begin-accordion-trigger').setAttribute('aria-expanded', 'false');
                acc.querySelector('.begin-accordion-icon').textContent = '+';
                const accContent = acc.querySelector('.begin-accordion-content');
                accContent.style.maxHeight = '0';
                accContent.style.opacity = '0';
            });

            // Open clicked if it wasn't already expanded
            if (!isExpanded) {
                accordion.classList.add('expanded');
                trigger.setAttribute('aria-expanded', 'true');
                icon.textContent = '–';
                // Use scrollHeight for dynamic max-height
                content.style.maxHeight = content.scrollHeight + 100 + 'px';
                content.style.opacity = '1';
            }
        });
    });

    // ─── Video Autoplay on Scroll ───────────────────────────
    const onboardingVideo = document.getElementById('onboarding-video');
    const unmuteOverlay   = document.getElementById('video-unmute-overlay');

    if (onboardingVideo) {
        // Step 1: Play muted when video scrolls into view
        const videoObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (onboardingVideo.tagName === 'VIDEO') {
                            onboardingVideo.muted = true;
                            onboardingVideo.play().then(() => {
                                observer.unobserve(onboardingVideo);
                            }).catch((err) => {
                                console.warn("Autoplay prevented by browser:", err);
                            });
                        } else if (onboardingVideo.tagName === 'IFRAME') {
                            onboardingVideo.src = onboardingVideo.getAttribute('data-src');
                            if (unmuteOverlay) unmuteOverlay.style.display = 'none';
                            observer.unobserve(onboardingVideo);
                        }
                    }
                });
            },
            { threshold: 0.3 } // Trigger when 30% visible
        );
        videoObserver.observe(onboardingVideo);

        // Step 2: Unmute when overlay is clicked
        if (unmuteOverlay) {
            unmuteOverlay.addEventListener('click', (e) => {
                if (onboardingVideo.tagName !== 'VIDEO') return;
                e.stopPropagation(); // prevent triggering other clicks
                onboardingVideo.muted = false;
                
                // Hide the overlay completely
                unmuteOverlay.style.opacity = '0';
                setTimeout(() => {
                    unmuteOverlay.style.display = 'none';
                }, 400);

                // If paused, start playing
                if (onboardingVideo.paused) {
                    onboardingVideo.play();
                }
            });
        }
    }
})();
