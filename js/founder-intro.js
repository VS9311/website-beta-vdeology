// ═══════════════════════════════════════════════════════════
//  FOUNDER INTRODUCTION MODAL — Cinematic Editorial Component
//  Non-destructive addition. Zero impact on existing scripts.
// ═══════════════════════════════════════════════════════════
(function () {
    'use strict';

    // ── DOM References ──
    const overlay   = document.getElementById('founder-intro-overlay');
    const card      = document.querySelector('.fi-card');
    const closeBtn  = document.getElementById('fi-close-btn');
    const playBtn   = document.getElementById('fi-play-btn');
    const skipBtn   = document.getElementById('fi-skip-btn');
    const videoWrap = document.querySelector('.fi-video-wrap');
    const iframe    = document.getElementById('fi-video-iframe');
    const contWrap  = document.querySelector('.fi-continue-wrap');
    const contBtn   = document.getElementById('fi-continue-btn');

    if (!overlay) return;

    // ── State ──
    let savedScrollY = 0;
    let isOpen       = false;
    let videoStarted = false;

    // Bunny embed base URL (autoplay enabled, NOT muted so browser requires user gesture)
    const BUNNY_SRC = 'https://player.mediadelivery.net/embed/680285/a4512582-1951-4bc0-b003-a63324465707?autoplay=true&loop=true&muted=true&preload=true&responsive=true';

    // ── OPEN ──
    function open() {
        if (isOpen) return;
        isOpen = true;

        // Save scroll position
        savedScrollY = window.scrollY;

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Reset state for fresh open
        overlay.classList.remove('fi-video-active');
        if (contWrap) contWrap.classList.remove('fi-continue-visible');
        if (iframe)   iframe.removeAttribute('src');
        videoStarted = false;

        // Show overlay
        overlay.classList.add('fi-visible');

        // Move focus into the modal
        requestAnimationFrame(() => {
            if (closeBtn) closeBtn.focus();
        });
    }

    // ── CLOSE ──
    function close(preventScrollReset = false) {
        if (!isOpen) return;
        isOpen = false;

        // Hide overlay
        overlay.classList.remove('fi-visible');
        overlay.classList.remove('fi-video-active');

        // Stop video playback
        if (iframe) iframe.removeAttribute('src');

        // Reset continue button
        if (contWrap) contWrap.classList.remove('fi-continue-visible');
        videoStarted = false;

        // Restore body scroll
        document.body.style.overflow = '';

        // Restore scroll position after CSS transition completes
        if (!preventScrollReset) {
            setTimeout(() => {
                window.scrollTo({ top: savedScrollY, behavior: 'instant' });
            }, 750);
        }
    }

    // ── WATCH INTRODUCTION (start video) ──
    function startVideo() {
        if (videoStarted) return;
        videoStarted = true;

        // Close the popup and scroll to the existing Founder Introduction section
        close(true);

        
        const ethosVideoSection = document.getElementById('ethos-founder-video');
        if (ethosVideoSection) {
            setTimeout(() => {
                ethosVideoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }

    // ── EVENT: Close button ──
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            close();
        });
    }

    // ── EVENT: Play button ──
    if (playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            startVideo();
        });
    }

    // ── EVENT: Skip button (Continue to Website) ──
    if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
            e.preventDefault();
            close();
        });
    }

    // ── EVENT: Continue Exploring (post-video) ──
    if (contBtn) {
        contBtn.addEventListener('click', (e) => {
            e.preventDefault();
            close();
        });
    }

    // ── EVENT: Backdrop click ──
    overlay.addEventListener('click', (e) => {
        // Only close if clicking the backdrop itself, not the card or video
        if (e.target === overlay || e.target.classList.contains('fi-backdrop') || e.target.classList.contains('fi-content')) {
            close();
        }
    });

    // ── EVENT: ESC key ──
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            close();
        }
    });

    // ── FOCUS TRAP ──
    overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !isOpen) return;

        const focusable = overlay.querySelectorAll(
            'button:not([disabled]):not([style*="display:none"]):not([style*="display: none"]), ' +
            'a[href]:not([disabled]), ' +
            '[tabindex]:not([tabindex="-1"]):not([disabled])'
        );
        // Filter to only visible elements
        const visible = Array.from(focusable).filter(el => {
            return el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden';
        });

        if (visible.length === 0) return;

        const first = visible[0];
        const last  = visible[visible.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // ── Bunny Player postMessage listener (video end detection) ──
    window.addEventListener('message', (e) => {
        if (!isOpen || !videoStarted) return;

        // Bunny Stream sends postMessage events for player state
        try {
            let data = e.data;
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            // Bunny player sends { event: 'videoEnd' } or { event: 'ended' }
            if (data && (data.event === 'videoEnd' || data.event === 'ended' || data.event === 'end')) {
                showContinue();
            }
        } catch (_) {
            // Not a JSON message — ignore
        }
    });

    // Fallback: show "Continue Exploring" after a reasonable video duration
    // The founder intro is typically 1-3 minutes. We use a generous fallback.
    let continueTimer = null;

    function showContinue() {
        if (contWrap && !contWrap.classList.contains('fi-continue-visible')) {
            contWrap.classList.add('fi-continue-visible');
        }
    }

    // When video starts, set a fallback timer
    const originalStartVideo = startVideo;
    // We patch startVideo inline above, so we use an observer approach:
    const videoObserver = new MutationObserver(() => {
        if (overlay.classList.contains('fi-video-active') && videoStarted) {
            // Clear any previous timer
            if (continueTimer) clearTimeout(continueTimer);
            // Show continue button after 3 minutes as a safe fallback
            continueTimer = setTimeout(() => {
                if (isOpen && videoStarted) {
                    showContinue();
                }
            }, 180000); // 3 minutes
            videoObserver.disconnect();
        }
    });
    videoObserver.observe(overlay, { attributes: true, attributeFilter: ['class'] });

    // ── EXPOSE GLOBAL FUNCTION ──
    window.openFounderIntro = open;

    // ── AUTO-OPEN VIA URL PARAMETER ──
    (function checkAutoOpen() {
        const params = new URLSearchParams(window.location.search);
        const shouldOpen = params.get('intro') === 'true' || params.get('video') === 'intro';

        if (shouldOpen) {
            // Wait for homepage to finish loading, then reveal
            setTimeout(() => {
                open();
            }, 600);
        }
    })();

})();
