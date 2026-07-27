// ===== RESPONSIVE MEDIA SWITCHING =====
(function() {
    function setResponsiveVideos() {
        const isMobile = window.innerWidth < 768;
        const iframes = document.querySelectorAll('.responsive-iframe');
        
        iframes.forEach(iframe => {
            const desktopSrc = iframe.getAttribute('data-desktop-src');
            const mobileSrc = iframe.getAttribute('data-mobile-src');
            const targetSrc = isMobile ? mobileSrc : desktopSrc;
            
            // Only update src if it changed, to prevent visible reloads during normal resizing
            if (iframe.src !== targetSrc) {
                iframe.src = targetSrc;
            }
        });
    }

    // Run immediately before DOM finishes rendering
    setResponsiveVideos();
    
    // Update on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setResponsiveVideos, 250);
    });
})();

// ===== SHARED CONSTANTS =====
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';



// ===== HERO LETTER HOVER =====
(function () {
    const titleEl = document.getElementById('hero-title');
    if (!titleEl) return;

    const text = titleEl.textContent.trim();
    titleEl.innerHTML = '';

    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'hero-letter';
        // Non-breaking space preserves kerning gaps
        span.textContent = char === ' ' ? '\u00A0' : char;

        // Alternate micro-rotation direction per letter — restrained, editorial
        const rotDeg = i % 2 === 0 ? 1.2 : -1.2;

        span.addEventListener('mouseenter', () => {
            // Lift: gentle spring — slight ease-over without bounce
            span.style.transition = 'transform 380ms cubic-bezier(0.34, 1.08, 0.64, 1)';
            span.style.transform  = `translateY(-8px) rotate(${rotDeg}deg)`;
        });

        span.addEventListener('mouseleave', () => {
            // Settle: smooth deceleration — feels weighted, not mechanical
            span.style.transition = 'transform 650ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            span.style.transform  = 'translateY(0px) rotate(0deg)';
        });

        titleEl.appendChild(span);
    });
})();

// ===== HERO PARALLAX & SCROLL TRANSITIONS =====
(function() {
    const heroSection = document.getElementById('hero-section');
    const heroVideo = document.getElementById('hero-video');
    const heroContent = document.getElementById('hero-content');
    const filmGrain = document.getElementById('film-grain');

    if (!heroSection) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollYOffset = 0;
    let scrollOpacity = 1;

    // Track mouse over the hero section
    heroSection.addEventListener('mousemove', (e) => {
        // Normalize coordinates from -1 to 1
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    // Handle scroll values
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = window.innerHeight; // 100vh reference
        
        if (scrolled <= maxScroll * 1.5) {
            const progress = scrolled / maxScroll;
            scrollYOffset = progress * 150; // Move up to 150px
            scrollOpacity = Math.max(0, 1 - (progress * 1.2)); // Smooth fade out
            
            // Video darkens as you scroll
            if (heroVideo) {
                const currentBrightness = Math.max(0.2, 0.9 - (progress * 0.7));
                heroVideo.style.filter = `contrast(1.1) brightness(${currentBrightness}) saturate(0.9)`;
            }
        }
    }, { passive: true });

    // Render loop for smooth lerping
    function animateParallax() {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Video: max 15px movement
        if (heroVideo) {
            heroVideo.style.transform = `scale(1.05) translate(${targetX * 15}px, ${targetY * 15}px)`;
        }
        
        // Grain: moves inversely for depth
        if (filmGrain) {
            filmGrain.style.transform = `translate(${targetX * -8}px, ${targetY * -8}px)`;
        }
        
        // Typography: minimal stable movement + scroll offset
        if (heroContent) {
            heroContent.style.transform = `translate(${targetX * 3}px, calc(${targetY * 3}px - ${scrollYOffset}px))`;
            heroContent.style.opacity = scrollOpacity;
        }

        requestAnimationFrame(animateParallax);
    }
    animateParallax();
})();

// ===== HERO NAME & INITIAL REVEALS =====
(function() {
    // Reveal handler for mask-reveal elements
    const reveals = document.querySelectorAll('.mask-reveal');
    reveals.forEach(el => {
        const inner = el.querySelector('.mask-reveal-inner');
        const delay = parseInt(el.dataset.revealDelay || 0);
        setTimeout(() => {
            if (inner) inner.classList.add('revealed');
        }, delay);
    });
})();

// ===== SCROLL INDICATOR =====
(function() {
    const indicator = document.getElementById('scroll-indicator');
    if (!indicator) return;
    window.addEventListener('scroll', () => {
        indicator.style.opacity = window.scrollY > 80 ? '0' : '1';
        indicator.style.pointerEvents = window.scrollY > 80 ? 'none' : 'auto';
    }, { passive: true });
})();

// ===== CINEMATIC SHOWCASE MULTI-ROW SCROLL WITH MOMENTUM =====
(function() {
    const outer = document.getElementById('showcase-outer');
    if (!outer) return;

    let currentProgress = 0;
    let targetProgress = 0;
    const lerpFactor = 0.08; // smooth easing factor for premium glide feel

    function calcTargetProgress() {
        const rect = outer.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;

        const scrollPercent = (viewportHeight - elementTop) / (viewportHeight + elementHeight);
        targetProgress = Math.max(0, Math.min(1, scrollPercent));
    }

    window.addEventListener('scroll', calcTargetProgress, { passive: true });
    calcTargetProgress();
    currentProgress = targetProgress;

    function animateRows() {
        currentProgress += (targetProgress - currentProgress) * lerpFactor;

        // Travel range: 25% of viewport width is an elegant displacement range
        const travelRange = window.innerWidth * 0.25;

        const topTranslateX = (currentProgress - 0.5) * travelRange;
        const bottomTranslateX = (0.5 - currentProgress) * travelRange;

        const topTrack = document.getElementById('showcase-track-top');
        const bottomTrack = document.getElementById('showcase-track-bottom');

        if (topTrack) {
            topTrack.style.transform = `translateX(${topTranslateX}px) translateZ(0)`;
        }
        if (bottomTrack) {
            bottomTrack.style.transform = `translateX(${bottomTranslateX}px) translateZ(0)`;
        }
        requestAnimationFrame(animateRows);
    }
    requestAnimationFrame(animateRows);
})();

// ===== SCROLL REVEAL (IntersectionObserver) =====
(function() {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.querySelectorAll(':scope > .reveal-on-scroll'));
                const index = siblings.indexOf(entry.target);
                const staggerDelay = index >= 0 ? index * 80 : 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, staggerDelay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
})();

// ===== 18. TEXT REVEAL MASK (Editorial) =====
(function() {
    const masks = document.querySelectorAll('.text-reveal-mask');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    masks.forEach(mask => observer.observe(mask));
})();

// ===== WORD-BY-WORD MISSION REVEAL =====
(function() {
    const container = document.getElementById('mission-text');
    if (!container) return;

    const text = container.dataset.mission;
    const words = text.split(' ');

    // Build word-mask elements
    words.forEach((word, i) => {
        const mask = document.createElement('span');
        mask.className = 'word-mask';

        const inner = document.createElement('span');
        inner.className = 'word-inner';

        // Highlight key words in orange
        const highlights = ['obsessed', 'storytelling', 'craft,', 'video.'];
        if (highlights.includes(word.toLowerCase()) || highlights.includes(word)) {
            inner.style.color = '#E8521A';
        }

        inner.textContent = word;
        mask.appendChild(inner);
        container.appendChild(mask);
    });

    // Observe and stagger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const wordMasks = container.querySelectorAll('.word-mask');
                wordMasks.forEach((mask, i) => {
                    setTimeout(() => {
                        mask.classList.add('in-view');
                    }, i * 50); // 50ms stagger per word
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(container);
})();

// ===== 21. ACCORDION EXPAND =====
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const isOpen = content.classList.contains('open');

    // Close all others
    document.querySelectorAll('.accordion-content.open').forEach(el => {
        el.classList.remove('open');
        el.previousElementSibling.classList.remove('open');
    });

    if (!isOpen) {
        content.classList.add('open');
        btn.classList.add('open');
    }
}

// ===== 22. CONTACT FORM STATES =====
// Web3Forms — sends submissions to vsdev.design@gmail.com
const WEB3FORMS_KEY = '5fe46ccf-0bfc-418f-8342-76ac8a454b28';

async function handleFormSubmit(e) {
    e.preventDefault();
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    const btn     = document.getElementById('form-submit-btn');

    const name    = document.getElementById('form-name').value.trim();
    const email   = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Disable button while sending
    btn.textContent = 'SENDING…';
    btn.disabled = true;

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: `New Project Enquiry from ${name}`,
                from_name: name,
                email,
                message
            })
        });

        const data = await res.json();

        if (data.success) {
            // Animate form out, show success
            form.style.opacity = '0';
            form.style.transform = 'translateY(-10px)';
            form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            setTimeout(() => {
                form.style.display = 'none';
                success.classList.add('show');
            }, 400);
        } else {
            alert(data.message || 'Submission failed. Please try again.');
            btn.textContent = 'SUBMIT';
            btn.disabled = false;
        }
    } catch (err) {
        alert('Network error. Please check your connection and try again.');
        btn.textContent = 'SUBMIT';
        btn.disabled = false;
    }
}


// ===== 3. CUSTOM CURSOR =====
(function() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Lerp the ring toward the dot
    function animateRing() {
        ringX += (mouseX - ringX) * 0.10;
        ringY += (mouseY - ringY) * 0.10;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover detection on interactive elements
    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], .cursor-pointer, .group';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
            ring.classList.add('hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) {
            ring.classList.remove('hover');
        }
    });

    // Click effect
    document.addEventListener('mousedown', () => { dot.classList.add('click'); });
    document.addEventListener('mouseup', () => { dot.classList.remove('click'); });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });
})();

// ===== 4. SCROLL PROGRESS BAR =====
(function() {
    const bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    }, { passive: true });
})();

// ===== 5. GLASSMORPHISM NAVBAR =====
(function() {
    const nav = document.getElementById('main-nav');
    const THRESHOLD = 60;
    window.addEventListener('scroll', () => {
        if (window.scrollY > THRESHOLD) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
})();

// ===== 6. LIVE CITY CLOCKS =====
(function() {
    const cities = [
        { id: 'clock-london',  tz: 'Europe/London' },
        { id: 'clock-newyork', tz: 'America/New_York' },
        { id: 'clock-dubai',   tz: 'Asia/Dubai' },
        { id: 'clock-tokyo',   tz: 'Asia/Tokyo' }
    ];

    function updateClocks() {
        const now = new Date();
        cities.forEach(city => {
            const el = document.getElementById(city.id);
            if (!el) return;
            const timeStr = now.toLocaleTimeString('en-GB', {
                timeZone: city.tz,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            el.textContent = timeStr;
        });
    }

    updateClocks();
    setInterval(updateClocks, 1000);
})();

// ===== PROJECT DETAIL OVERLAY — FULLSCREEN CINEMATIC =====
let _overlayScrollY = 0; // saved scroll position
let _currentProjectIndex = 0;
let _currentProjectTab = 'projects';

function populateProjectData(item) {
    if (!item) return;

    const brandNameEl = document.getElementById('project-panel-brand-name');
    const hugeTitleEl  = document.getElementById('project-panel-huge-title');
    const metaEl    = document.getElementById('project-panel-meta');
    const briefEl   = document.getElementById('project-panel-brief');
    const challengeEl = document.getElementById('project-panel-challenge');
    const solutionEl  = document.getElementById('project-panel-solution');
    const outcomeEl   = document.getElementById('project-panel-outcome');
    const scopeEl     = document.getElementById('project-panel-scope');
    const deliverablesEl = document.getElementById('project-panel-deliverables');

    // Populate brand & huge title
    if (brandNameEl) brandNameEl.textContent = item.brandName || item.title.split(' ')[0];
    if (hugeTitleEl) hugeTitleEl.innerHTML = item.hugeTitle || item.title;

    // Metadata
    if (metaEl) metaEl.textContent = item.meta || '';
    // Use innerHTML for rich content formatting
    if (briefEl) briefEl.innerHTML = item.brief || item.desc || '';
    if (challengeEl) challengeEl.innerHTML = item.challenge || '';
    if (solutionEl) solutionEl.innerHTML = item.solution || '';
    if (outcomeEl) outcomeEl.innerHTML = item.outcome || '';
    if (deliverablesEl) deliverablesEl.innerHTML = item.deliverables || '';

    // --- Image-Only Hero (e.g. KATANA) vs Video Hero ---
    const videoHero = document.getElementById('project-panel-video-hero');
    const videoSource = document.getElementById('project-panel-video-hero-source');
    const playOverlay = document.getElementById('video-play-overlay');
    const imgHero = document.getElementById('project-panel-img-hero');

    if (item.imageOnly) {
        // Show image, hide video + play overlay
        if (videoHero) videoHero.style.display = 'none';
        if (playOverlay) playOverlay.style.display = 'none';
        if (imgHero) {
            imgHero.src = item.heroImage || item.img || '';
            imgHero.alt = item.title;
            imgHero.style.display = 'block';
        }
    } else {
        // Show video, hide image
        if (imgHero) imgHero.style.display = 'none';
        if (videoHero) videoHero.style.display = 'block';
        if (playOverlay) playOverlay.style.display = 'none';
        if (videoHero) {
            videoHero.src = item.video || '';
            if (playOverlay) playOverlay.classList.remove('playing');
        }
    }

    // --- Optional Profile Image (e.g. Alfred Konuwa) ---
    const profileWrap = document.getElementById('project-panel-profile');
    const profileImg = document.getElementById('project-panel-profile-img');
    if (item.profileImg) {
        if (profileImg) {
            profileImg.src = item.profileImg;
            profileImg.alt = item.title;
        }
        if (profileWrap) profileWrap.style.display = 'flex';
    } else {
        if (profileWrap) profileWrap.style.display = 'none';
    }

    // --- Gallery / deliverable images ---
    const galEl = document.getElementById('project-panel-deliverable-images');
    const delSection = document.getElementById('section-deliverables');
    if (galEl) {
        galEl.innerHTML = '';
        const imgs = (item.deliverableImages || '').split(',').map(s => s.trim()).filter(Boolean);
        if (imgs.length) {
            imgs.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = item.title;
                img.className = 'deliverable-img';
                galEl.appendChild(img);
            });
            if (delSection) delSection.style.display = 'block';
        } else {
            if (delSection) delSection.style.display = 'none';
        }
    }

    // --- Hide sections that have no content ---
    const sectionMap = [
        { id: 'section-brief',     content: item.brief || item.desc || '' },
        { id: 'section-challenge', content: item.challenge || '' },
        { id: 'section-solution',  content: item.solution || '' },
        { id: 'section-outcome',   content: item.outcome || '' },
    ];
    sectionMap.forEach(({ id, content }) => {
        const section = document.getElementById(id);
        if (section) {
            section.style.display = content.trim() ? 'block' : 'none';
        }
    });

    // --- Build scope tags ---
    if (scopeEl) {
        scopeEl.innerHTML = '';
        const scopeItems = (item.scope || '').split(',');
        scopeItems.forEach(scopeItem => {
            if (!scopeItem.trim()) return;
            const li = document.createElement('li');
            li.textContent = scopeItem.trim();
            scopeEl.appendChild(li);
        });
    }
}

function openProjectPanel(btn) {
    const card = btn.closest('.showcase-card') || btn.closest('.tilt-card');
    if (!card) return;

    const title = card.dataset.projectTitle;
    const tabKey = 'projects';
    _currentProjectTab = tabKey;

    const items = WORK_TAB_DATA[tabKey] || [];
    _currentProjectIndex = items.findIndex(item => item.title === title);
    if (_currentProjectIndex === -1) {
        // Fallback search across all tabs
        for (const key of Object.keys(WORK_TAB_DATA)) {
            const idx = WORK_TAB_DATA[key].findIndex(item => item.title === title);
            if (idx !== -1) {
                _currentProjectTab = key;
                _currentProjectIndex = idx;
                break;
            }
        }
    }

    const item = WORK_TAB_DATA[_currentProjectTab][_currentProjectIndex];
    if (!item) return;

    // Save scroll position so we can restore it on close
    _overlayScrollY = window.scrollY;

    // Populate data
    populateProjectData(item);

    // Scroll panel to top then open
    const panel = document.getElementById('project-panel');
    if (panel) panel.scrollTop = 0;

    // Show overlay
    const overlay = document.getElementById('project-overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectPanel() {
    const overlay = document.getElementById('project-overlay');
    overlay.classList.remove('active');

    // Stop video playback
    const videoHero = document.getElementById('project-panel-video-hero');
    if (videoHero) { videoHero.src = ''; }

    // Re-enable scroll first so restoration works
    document.body.style.overflow = '';

    // After the CSS fade completes, restore scroll position
    setTimeout(() => {
        window.scrollTo({ top: _overlayScrollY, behavior: 'instant' });
    }, 750);
}

function loadNextProject() {
    const items = WORK_TAB_DATA[_currentProjectTab] || [];
    if (items.length === 0) return;

    _currentProjectIndex = (_currentProjectIndex + 1) % items.length;
    const nextItem = items[_currentProjectIndex];

    const panelBody = document.querySelector('.project-panel-body');
    const mediaHero = document.querySelector('.project-panel-media-hero');

    if (panelBody) {
        panelBody.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        panelBody.style.opacity = '0';
        panelBody.style.transform = 'translateY(15px)';
    }
    if (mediaHero) {
        mediaHero.style.transition = 'opacity 0.3s ease';
        mediaHero.style.opacity = '0';
    }

    setTimeout(() => {
        populateProjectData(nextItem);
        const panel = document.getElementById('project-panel');
        if (panel) panel.scrollTop = 0;

        if (panelBody) {
            panelBody.style.opacity = '1';
            panelBody.style.transform = 'translateY(0)';
        }
        if (mediaHero) {
            mediaHero.style.opacity = '1';
        }
    }, 300);
}

function playHeroVideo() {
    const videoHero = document.getElementById('project-panel-video-hero');
    if (videoHero) {
        // iframe video handles its own play
    }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectPanel();
});

// ===== WORK TABS — DATA-DRIVEN CARDS =====
const WORK_TAB_DATA = {
    projects: [
        // ===== TOP ROW =====
        // 1. A FOOL'S JOURNEY (new — top left)
        {
            title: 'A FOOL\'S JOURNEY',
            brandName: 'A FOOL\'S JOURNEY',
            hugeTitle: 'A FOOL\'S<br>JOURNEY.',
            video: 'https://player.mediadelivery.net/embed/680285/e4aefa1b-121d-4ff0-a385-cac8e0e3ef6b?autoplay=true&loop=true&muted=true&preload=true&responsive=true',
            category: '01 / PERSONAL DOCUMENTARY',
            shortDesc: 'A self-directed cinematic exploration of philosophy, faith, identity, and the search for meaning',
            meta: 'Personal Documentary / Visual Essay Brand',
            brief: 'A Fool\'s Journey is a personal visual essay demonstrating how abstract ideas can be translated into emotionally resonant stories through thoughtful writing, strong editorial direction, and cinematic execution. The project serves as both a personal reflection and a proof of concept for narrative-driven filmmaking that prioritises meaning over spectacle.<br><br>Rather than producing a conventional travel film, the project used the journey itself as a narrative framework to explore deeper questions around identity, faith, creativity, and self-awareness.',
            challenge: 'The project presented several unique creative challenges:<br><br>\u2022 Transforming deeply personal experiences into a story that could resonate universally.<br>\u2022 Creating a compelling narrative without interviews, actors, or a traditional documentary structure.<br>\u2022 Producing cinematic visuals while travelling solo.<br>\u2022 Maintaining audience engagement through narration and atmosphere rather than plot-driven events.<br>\u2022 Exploring abstract concepts such as consciousness, purpose, faith, and identity through visual storytelling.<br><br>The goal was to create a film that felt intimate and authentic while remaining accessible to a broader audience.',
            solution: 'The project was approached as a hybrid between a documentary, travel film, and philosophical visual essay. Rather than documenting events chronologically, the narrative was structured around internal transformation.<br><br>Creative decisions included:<br><br>\u2022 First-person reflective narration.<br>\u2022 Self-shot cinematography and travel footage.<br>\u2022 Symbolic visual language using landscapes, nature, architecture, light, and solitude.<br>\u2022 Essay-style storytelling inspired by philosophical and documentary filmmaking.<br>\u2022 Sound design and pacing designed to support contemplation and emotional immersion.<br>\u2022 Editorial structure based on the archetypal hero\'s journey and the concept of self-discovery.<br><br>The film intentionally prioritised emotional truth over factual documentation, allowing visuals and narration to work together as a personal journal.',
            outcome: 'The result was a deeply personal film that expanded beyond travel content into a broader exploration of creativity, faith, and self-understanding.<br><br>The project became an important milestone in developing a distinctive storytelling voice \u2014 one that combines philosophy, documentary filmmaking, and cinematic visual language.<br><br>More importantly, it demonstrated how meaningful stories can be created with limited resources, using authenticity, strong editorial direction, and intentional visual design rather than large production budgets.<br><br><strong>Key Takeaway:</strong> A Fool\'s Journey demonstrates how abstract ideas can be translated into emotionally resonant stories through thoughtful writing, strong editorial direction, and cinematic execution. The project serves as both a personal reflection and a proof of concept for narrative-driven filmmaking that prioritises meaning over spectacle.',
            scope: 'Documentary Filmmaking,Visual Essay Development,Editorial Direction,Narrative Structure,Philosophical Storytelling,Creative Writing,Voiceover Writing,Travel Cinematography,Self-Shooting Production,Sound Design,Colour Grading,Personal Branding,Creative Direction,Solo Production Workflow,DIY Filmmaking',
            img: 'Project%20card%20thymnails/Foolss_Journey_project%20card%20thumbnail.jpg'
        },
        // 2. SPORTSKEEDA WRESTLING (rewritten — top)
        {
            title: 'SPORTSKEEDA WRESTLING',
            brandName: 'SPORTSKEEDA',
            hugeTitle: 'SPORTSKEEDA.<br>WRESTLING.',
            video: 'https://player.mediadelivery.net/embed/680285/2a1f8b7e-54d6-48cf-8af6-8c0d2ac6ceb8?autoplay=true&loop=true&muted=true&preload=true&responsive=true',
            category: '02 / SPORTS MEDIA',
            shortDesc: 'Scaling a digital media brand to 50M+ views through editorial strategy, documentary storytelling and audience growth',
            meta: 'Senior Video Editor and Content Strategist \u00b7 Sportskeeda Pvt. Ltd. \u00b7 India \u00b7 August 2022 to November 2025',
            brief: 'As Senior Video Editor and Content Strategist at Sportskeeda Wrestling, I played a key role in building and scaling one of the company\'s fastest-growing video content divisions across YouTube, Facebook, Instagram, TikTok, Snapchat, and emerging digital platforms.<br><br>Over a three-year period, my responsibilities evolved far beyond editing. I became involved in content strategy, audience development, scripting, production systems, editorial direction, platform optimization, and performance analysis.<br><br>Working within one of the world\'s largest sports media publishers, I helped transform wrestling news, analysis, and documentary storytelling into a high-performance content ecosystem capable of publishing daily while maintaining broadcast-level quality standards.<br><br>The result was measurable audience growth, stronger viewer retention, and millions of hours of watch time across platforms.',
            challenge: 'When I joined the team, the YouTube channel had approximately 30,000 subscribers. The challenge was not simply to produce videos but to build a scalable content operation capable of competing in one of the most saturated entertainment categories online.<br><br>The objectives included:<br><br>\u2022 Growing subscribers and audience loyalty.<br>\u2022 Increasing watch time and engagement.<br>\u2022 Maintaining daily publishing schedules.<br>\u2022 Creating content for multiple platforms simultaneously.<br>\u2022 Establishing a recognizable visual identity.<br>\u2022 Delivering under fast-moving news cycles.<br>\u2022 Producing long-form and short-form content at scale without sacrificing quality.<br><br>Success required building systems that could sustain growth over the long term rather than relying on individual viral moments.',
            solution: 'I developed and managed a comprehensive production workflow spanning editorial planning, scripting, production, publishing, optimization, and performance review.<br><br><strong>Editorial Strategy:</strong> Story selection and trend analysis, audience research, documentary and feature development, script writing and narrative structuring, platform-specific content packaging.<br><br><strong>Audience Retention Engineering:</strong> Hook development and opening sequences, viewer retention frameworks, narrative pacing systems, engagement-driven visual storytelling.<br><br><strong>Production \u0026 Creative:</strong> Long-form documentary editing, short-form content creation, motion graphics and branding, thumbnail systems, sound design and finishing, multi-platform asset production.<br><br><strong>Workflow Innovation:</strong> To support increasing content volume, I integrated repeatable production systems and AI-assisted workflows where appropriate, enabling faster turnaround times while maintaining quality and consistency.<br><br><strong>Featured Project \u2014 The Rise and Fall of Matt Riddle:</strong><br>One of the channel\'s most successful long-form documentary projects explored the career of former UFC fighter and WWE superstar Matt Riddle. The documentary followed Riddle\'s journey from adversity and professional setbacks to becoming one of wrestling\'s most popular modern performers before examining the controversies that ultimately altered the trajectory of his career. Rather than focusing solely on wrestling events, the project approached the subject as a character-driven documentary exploring ambition, resilience, success, public perception, and personal accountability. The final project generated over 500,000 views and became one of the channel\'s strongest-performing documentary releases.',
            outcome: 'Over the course of the engagement, the channel experienced significant growth across multiple performance indicators.<br><br><strong>Growth Metrics:</strong><br>\u2022 Grew YouTube subscribers from 30,000 to 180,000.<br>\u2022 Generated over 50 million views.<br>\u2022 Produced 2,055,431+ hours of watch time.<br>\u2022 Increased engagement by more than 200%.<br>\u2022 Achieved 70\u201380% retention on short-form content.<br>\u2022 Achieved 60\u201370% retention on long-form content.<br>\u2022 Consistently outperformed platform averages across multiple content formats.<br><br>Beyond the numbers, the project established repeatable editorial systems, stronger audience loyalty, and scalable production workflows capable of supporting sustained growth.<br><br><strong>Key Takeaway:</strong> This project demonstrates the ability to build and scale content ecosystems that combine editorial strategy, documentary storytelling, audience psychology, and production execution.',
            scope: 'Content Strategy,Documentary Storytelling,Editorial Direction,Script Writing,Audience Growth,Audience Retention Strategy,Long-Form Video Editing,Short-Form Content Production,Motion Graphics,Brand Systems Development,Thumbnail Design,Cross-Platform Publishing,Analytics \u0026 Performance Optimisation,AI-Assisted Production Workflows,Media Operations',
            img: 'img/sportskeeda_wrestling.jpg'
        },
        // 3. THE COACH (rewritten — top)
        {
            title: 'THE COACH',
            brandName: 'THE COACH',
            hugeTitle: 'THE COACH.<br>THE FIGHT FOR<br>BRITISH WRESTLING.',
            video: 'https://player.mediadelivery.net/embed/680285/057faf4d-e26c-480a-b9e0-d96a8d5e21fc?autoplay=true&loop=true&muted=true&preload=true&responsive=true',
            category: '03 / DOCUMENTARY',
            shortDesc: 'An award-winning feature documentary chronicling one man\'s fight to preserve British wrestling',
            meta: 'Feature Documentary \u00b7 Solo Production \u00b7 UK \u00b7 2024',
            brief: 'The Coach: The Fight for British Wrestling is a feature-length documentary following veteran wrestling coach Jon Owens, a retired police officer and lifelong wrestler who has dedicated more than three decades to teaching wrestling to young people in Kent, England.<br><br>At a time when British wrestling continues to face declining participation, funding challenges, and diminishing public visibility, Jon remains committed to preserving the sport\'s traditions while mentoring the next generation.<br><br>Produced entirely as a solo filmmaker, the documentary explores themes of legacy, service, discipline, mentorship, and community through the story of one man fighting to keep a culture alive.',
            challenge: 'The project was developed and produced without a crew, production company, or external funding. Every stage of production was managed independently, creating several challenges:<br><br>\u2022 Capturing a feature-length documentary as a single operator.<br>\u2022 Maintaining professional production standards across multiple filming days.<br>\u2022 Building trust with documentary subjects while simultaneously managing technical production.<br>\u2022 Structuring a compelling narrative from extensive observational footage.<br>\u2022 Balancing intimate personal storytelling with broader cultural themes.<br>\u2022 Completing post-production, sound, color, and delivery without external support.<br><br>The challenge was not simply documenting events but uncovering a story that could resonate with audiences beyond the wrestling community.',
            solution: 'The documentary was approached as a character-driven story rather than a sports film. While wrestling served as the backdrop, the core narrative focused on Jon Owens\' lifelong commitment to helping others and preserving a tradition he believed was worth fighting for.<br><br>As a solo filmmaker, I was responsible for every stage of production:<br><br><strong>Development \u0026 Research:</strong> Subject research, story development, documentary planning, interview preparation.<br><br><strong>Production:</strong> Directing, cinematography, audio recording, location management, interview execution, observational documentary filming.<br><br><strong>Post-Production:</strong> Narrative editing, story structuring, archival integration, color grading, sound design, music selection, final delivery.<br><br>In addition to the feature documentary itself, I produced promotional trailers, social media assets, and marketing content designed to build anticipation ahead of release.<br><br><strong>The Story:</strong> At the heart of the film is Jon Owens\' belief that wrestling is about far more than competition. For over thirty years, he has offered free wrestling instruction to young people throughout Kent, using sport as a vehicle for discipline, confidence, and personal development. Ultimately, The Coach is not a film about wrestling. It is a film about purpose.',
            outcome: 'The completed documentary was selected as a finalist at the Serbest International Film Festival, providing international recognition for an independently produced project created without institutional support.<br><br>The film also generated significant engagement within the British wrestling and martial arts communities, helping bring attention to Jon\'s work and the wider conversation surrounding the future of British wrestling.<br><br>Beyond the festival recognition, the project demonstrated the ability to independently develop, produce, and deliver a feature-length documentary from concept to completion.<br><br><strong>Key Takeaway:</strong> The Coach demonstrates the ability to independently lead complex documentary projects from concept to final delivery. By combining research, storytelling, cinematography, editing, and creative direction within a single production workflow, the project transformed a local story into a universally relatable film about mentorship, legacy, and the enduring value of service to others.',
            scope: 'Documentary Direction,Documentary Research,Story Development,Cinematography,Interview Production,Audio Recording,Narrative Editing,Documentary Storytelling,Colour Grading,Sound Design,Post-Production Supervision,Promotional Content Production,Solo Filmmaking,Creative Direction',
            img: 'img/the_coach_documentary.jpg'
        },
        // 4. VIDEOGRAPHES PARIS (new — top right)
        {
            title: 'VIDEOGRAPHES PARIS',
            brandName: 'VIDEOGRAPHES',
            hugeTitle: 'VIDEOGRAPHES.<br>PARIS.',
            video: 'https://player.mediadelivery.net/embed/680285/72f7842c-7db0-46e9-bf43-ae1631b5e9f5?autoplay=true&loop=true&muted=true&preload=true&responsive=true',
            category: '04 / WEDDING FILMMAKING',
            shortDesc: 'Collaborating remotely with a Paris-based wedding filmmaking studio to deliver cinematic wedding films',
            meta: 'Post-Production \u0026 Wedding Film Editing \u00b7 Videographes \u00b7 Paris, France',
            brief: 'For over seven months, I worked as a remote post-production editor for Videographes, a wedding filmmaking studio based in Paris, France.<br><br>This collaboration demonstrates the ability to integrate into an established international production team, uphold professional quality standards, and craft emotionally engaging films that resonate with audiences across cultures and markets.<br><br>Working across multiple projects required balancing narrative structure, pacing, music selection, sound design, and color consistency while maintaining the refined aesthetic expected within the luxury wedding market.',
            challenge: 'Wedding filmmaking presents a unique editorial challenge. Unlike traditional commercial projects, each film must preserve authentic emotion while remaining visually elegant and engaging.<br><br>The objective was to:<br><br>\u2022 Transform large volumes of raw footage into cohesive cinematic narratives.<br>\u2022 Maintain consistency across multiple projects and client deliverables.<br>\u2022 Adapt to different couples, locations, cultures, and event styles while preserving the studio\'s creative identity.<br>\u2022 Deliver edits remotely while collaborating across countries and time zones.<br>\u2022 Meet professional delivery standards within demanding production schedules.',
            solution: 'My role extended beyond simply assembling footage. Each project required a storytelling-first editorial workflow:<br><br>\u2022 Reviewing and organizing extensive multi-camera footage.<br>\u2022 Identifying emotional story beats and narrative anchors.<br>\u2022 Building cinematic pacing through music, rhythm, and visual sequencing.<br>\u2022 Refining transitions and visual flow to create seamless viewing experiences.<br>\u2022 Applying colour balancing and finishing techniques to maintain brand consistency.<br>\u2022 Collaborating closely with the studio founders to align edits with their creative vision and client expectations.<br><br>The goal was always to create films that felt timeless, emotionally authentic, and visually refined.',
            outcome: 'Over the course of the collaboration, I contributed to the post-production of multiple wedding films and brand-focused projects for a European audience.<br><br>The experience strengthened my ability to:<br><br>\u2022 Edit long-form emotional narratives.<br>\u2022 Work within established brand systems.<br>\u2022 Deliver professional client work remotely.<br>\u2022 Balance documentary realism with cinematic presentation.<br>\u2022 Maintain consistency across high-volume production pipelines.<br><br>The collaboration also provided valuable experience working within the luxury wedding filmmaking space, where storytelling, emotion, and attention to detail are essential.<br><br><strong>Key Takeaway:</strong> This collaboration demonstrates the ability to integrate into an established international production team, uphold professional quality standards, and craft emotionally engaging films that resonate with audiences across cultures and markets.',
            scope: 'Wedding Film Editing,Documentary Storytelling,Narrative Construction,Editorial Direction,Remote Creative Collaboration,Colour Correction,Colour Grading,Sound Design,Music Synchronisation,Long-Form Video Editing,Client Delivery Workflows,Creative Problem Solving,Post-Production Management',
            img: 'Project%20card%20thymnails/videographesprojectcardthumbnail.jpg'
        },
        // ===== BOTTOM ROW =====
        // 5. HIP HOP HEAVYWEIGHTS (new — bottom left)
        {
            title: 'HIP HOP HEAVYWEIGHTS',
            brandName: 'HIP HOP HEAVYWEIGHTS',
            hugeTitle: 'HIP HOP.<br>HEAVYWEIGHTS.',
            video: 'https://player.mediadelivery.net/embed/680285/45264ed1-c504-47c3-908f-893197223a60?autoplay=true&loop=true&muted=true&preload=true&responsive=true',
            category: '05 / EDITORIAL MEDIA',
            shortDesc: 'Supporting the growth of a research-driven media channel exploring hip-hop and professional wrestling through documentaries',
            meta: 'Editorial Development \u0026 Long-Form Video Production',
            brief: 'Hip Hop Heavyweights is a long-form video essay platform founded by Noel Chingunji, a London-based filmmaker and television development professional with experience across independent production companies and major streaming platforms, including Netflix.<br><br>The channel explores storytelling, culture, character archetypes, and media history through deeply researched and editorially driven video essays.<br><br>Over the course of our collaboration, I contributed across multiple stages of production, helping transform complex research and unfinished concepts into polished, audience-focused content. My involvement extended beyond traditional editing and evolved into an editorial partnership supporting channel development, visual identity, and content delivery.',
            challenge: 'Long-form analytical content presents a unique set of creative and production challenges. Unlike conventional entertainment content, success depends on maintaining audience engagement while communicating complex ideas, historical context, and layered arguments.<br><br>The channel required the following:<br><br>\u2022 Structuring research-heavy scripts into compelling narratives.<br>\u2022 Maintaining viewer retention across extended runtimes.<br>\u2022 Creating visual systems capable of supporting analysis-driven storytelling.<br>\u2022 Developing a recognizable visual identity across multiple projects.<br>\u2022 Rescuing and completing unfinished productions when previous workflows broke down.<br>\u2022 Building production consistency while maintaining a high editorial standard.<br><br>The goal was to create content that felt intellectually substantial while remaining entertaining and accessible.',
            solution: 'My role evolved beyond post-production into a hybrid editorial and creative support position. Responsibilities included:<br><br>\u2022 Long-form video editing.<br>\u2022 Narrative restructuring and pacing improvements.<br>\u2022 Editorial problem-solving on stalled or unfinished productions.<br>\u2022 Motion graphics integration.<br>\u2022 Thumbnail and graphic asset creation.<br>\u2022 Visual identity development.<br>\u2022 Sound design and music integration.<br>\u2022 Platform-ready delivery and optimization.<br><br>In several instances, I stepped into projects that had stalled during production and helped bring them across the finish line by rebuilding structure, refining pacing, and establishing a clearer editorial direction.<br><br><strong>Featured Project:</strong> One notable project explored the remarkable parallels between two defining cultural rivalries: Tupac Shakur and The Notorious B.I.G. vs Stone Cold Steve Austin and The Rock. The video examined how these iconic figures embodied anti-establishment archetypes that defined an entire generation, drawing comparisons between hip-hop culture and professional wrestling\'s Attitude Era. The challenge was translating a large volume of research into a compelling visual narrative capable of sustaining engagement while delivering meaningful analysis.',
            outcome: 'The collaboration helped establish a stronger editorial foundation for the channel while improving production efficiency and content consistency.<br><br>Through a combination of editing, creative problem-solving, and visual development, projects were successfully delivered that may otherwise have remained unfinished.<br><br>Most importantly, the collaboration demonstrated the value of combining editorial thinking with post-production expertise to solve problems beyond the edit timeline.<br><br><strong>Key Takeaway:</strong> This project demonstrates the ability to operate beyond the role of editor and contribute as an editorial partner. By combining storytelling, research interpretation, visual design, and post-production problem solving, the collaboration helped transform complex ideas into engaging long-form content while supporting the long-term development of a growing media brand.',
            scope: 'Editorial Development,Long-Form Video Editing,Visual Essay Production,Narrative Structure,Research-Based Storytelling,Motion Graphics,Thumbnail Design,Graphic Design,Sound Design,Creative Direction,Audience Retention Strategy,Post-Production Supervision,Content Packaging,YouTube Publishing Systems,Cross-Platform Media Production',
            img: 'Project%20card%20thymnails/Hip_Hop_Heavyweights_Projectcardthumbnail.jpg'
        },
        // 6. FIGHT PUNDIT LEAGUE (rewritten — bottom)
        {
            title: 'FIGHT PUNDIT LEAGUE',
            brandName: 'FIGHT PUNDIT',
            hugeTitle: 'FIGHT PUNDIT.<br>LEAGUE.',
            video: 'https://player.mediadelivery.net/embed/680285/868159b4-474f-4999-b8ad-6c62ec82935b?autoplay=true&loop=true&muted=true&preload=true&responsive=true',
            category: '06 / COMBAT SPORTS MEDIA',
            shortDesc: 'Building a modern combat sports brand through cinematic storytelling and editorial strategy',
            meta: 'Creative Director and Lead Editor \u00b7 Fight Pundit \u00b7 India \u00b7 2025 to Present',
            brief: 'Fight Pundit League is a competitive submission grappling promotion based in Bangalore, India, bringing together athletes from some of the region\'s leading Brazilian Jiu-Jitsu and combat sports academies.<br><br>As Creative Director and Lead Editor, my role focused on transforming the league from a competition into a media property. The objective was to establish a distinctive visual identity, create deeper audience engagement, and position the promotion as a modern combat sports brand through cinematic storytelling, athlete-focused narratives, and platform-native content.<br><br>Rather than simply documenting matches, the goal was to create emotional investment in the athletes, gyms, and rivalries that defined the league.',
            challenge: 'Combat sports exists within one of the most competitive content environments online. Audiences are constantly exposed to highlight reels, fight clips, and event coverage competing for attention across social media platforms.<br><br>The challenge was to:<br><br>\u2022 Differentiate Fight Pundit from traditional event coverage.<br>\u2022 Build audience investment in athletes and storylines.<br>\u2022 Create content capable of engaging both dedicated grappling practitioners and casual viewers.<br>\u2022 Maintain consistent output around live events and evolving competition narratives.<br>\u2022 Develop a recognizable visual identity that reflected the professionalism of the league.<br><br>The objective was not simply visibility but creating a brand experience that audiences would remember.',
            solution: 'The project was approached from a storytelling-first perspective. Rather than focusing exclusively on competition footage, content was designed to highlight the personalities, preparation, sacrifices, and motivations behind the athletes.<br><br><strong>Editorial Strategy:</strong> Narrative-driven content development, athlete-focused storytelling, competition storyline construction, event promotion and audience anticipation.<br><br><strong>Content Production:</strong> Cinematic promotional videos, athlete profile features, event trailers, documentary-style content, social-first content packages.<br><br><strong>Brand Development:</strong> Motion graphics systems, typography frameworks, visual identity development, trailer-inspired editing structures, sound design systems.<br><br><strong>Workflow Innovation:</strong> To support the fast-paced nature of event production, AI-assisted workflows and rapid iteration systems were integrated into the production process, enabling higher output without compromising creative quality.<br><br><strong>Featured Project \u2014 Road to the Finals:</strong><br>One of the league\'s flagship storytelling initiatives was the production of Road to the Finals, a documentary-style mini-series designed to elevate audience investment ahead of the championship event. The project followed athletes through their preparation, training environments, and competitive journeys, providing audiences with a deeper understanding of the people behind the competition. By combining competition footage, training camp coverage, gym culture, interviews, and narrative storytelling, the series transformed a sporting event into an ongoing story.',
            outcome: 'The collaboration helped establish Fight Pundit\'s visual and editorial identity as a modern combat sports promotion.<br><br>Key achievements included:<br><br>\u2022 Creation of a cohesive visual brand system.<br>\u2022 Development of athlete-focused storytelling formats.<br>\u2022 Consistent production of platform-native content.<br>\u2022 Stronger audience engagement through narrative-driven media.<br>\u2022 Enhanced presentation of league events and promotional campaigns.<br>\u2022 Increased accessibility for audiences beyond the core grappling community.<br><br>Most importantly, the project demonstrated how storytelling can transform a sporting competition into a media brand.<br><br><strong>Key Takeaway:</strong> Fight Pundit demonstrates how cinematic storytelling, athlete-focused narratives, and strong editorial systems can elevate a sports promotion beyond event coverage and into a recognizable media brand.',
            scope: 'Creative Direction,Sports Storytelling,Documentary Production,Narrative Editing,Event Promotion,Trailer Production,Motion Graphics,Brand Identity Development,Audience Retention Strategy,Sound Design,Social Media Content Strategy,Athlete Storytelling,Editorial Direction,AI-Assisted Production Workflows',
            img: 'img/fight_pundit_league.jpg'
        },
        // 7. KATANA (rewritten — bottom, IMAGE ONLY)
        {
            title: 'KATANA',
            brandName: 'KATANA',
            hugeTitle: 'ONE STRIKE.<br>ONE MEANING.',
            imageOnly: true,
            heroImage: 'videos/Katana_embedded%20_pic.png',
            category: '07 / BRAND DEVELOPMENT',
            shortDesc: 'Building a combat sports brand rooted in identity, discipline and culture',
            meta: 'Creative Director \u0026 Project Manager \u00b7 Katana \u00b7 Combat Sports Brand',
            brief: 'Katana was conceived as more than a combat sports company. The vision was to create a scalable brand ecosystem capable of operating across multiple divisions, including fight promotion, athlete management, premium combat equipment, apparel, and media.<br><br>Inspired by martial arts philosophy and the symbolism of the katana blade, the project aimed to establish a modern combat sports brand that balanced performance, discipline, identity, and cultural authenticity.<br><br>As Creative Director and Project Manager, I led the development of the brand from concept to execution, creating the strategic foundation, visual identity, and design systems required to support long-term growth.',
            challenge: 'The client possessed a strong vision but lacked the strategic and visual infrastructure required to transform that vision into a recognizable brand.<br><br>Several challenges emerged:<br><br>\u2022 No unified visual identity.<br>\u2022 No consistent positioning across business divisions.<br>\u2022 No scalable design framework.<br>\u2022 No established brand voice.<br>\u2022 No product visualization system.<br>\u2022 No guidelines for future expansion.<br><br>The objective was to create a brand capable of functioning across multiple touchpoints while remaining authentic to combat sports culture. The identity needed to feel timeless but contemporary, minimal but powerful, premium without becoming generic, and commercial without losing authenticity.',
            solution: 'The project began with a strategic exploration of combat sports culture, martial arts philosophy, and premium athletic brands. The symbolic qualities of the katana blade became the foundation of the brand\'s identity:<br><br><strong>Precision:</strong> Every visual element was designed to communicate clarity, intention, and purpose.<br><strong>Discipline:</strong> The system embraced restraint rather than excess, favoring simplicity and confidence over visual noise.<br><strong>Permanence:</strong> The identity was designed to remain relevant as the company expanded into future business verticals.<br><br><strong>Brand Positioning:</strong> A central philosophy was developed around the concept: One Strike. One Meaning. This became more than a tagline \u2014 it served as the strategic foundation for the brand\'s voice, visual language, and overall market positioning.<br><br><strong>Identity Development:</strong> A complete visual identity system was designed, including primary logo system, secondary logo suite, typography hierarchy, color architecture, brand voice framework, visual composition rules, and brand application guidelines.<br><br><strong>Product \u0026 Merchandise Development:</strong> Beyond branding, the project expanded into product visualization and merchandise development. Creative direction was established for boxing gloves, hand wraps, performance apparel, promotional graphics, marketing assets, and future equipment lines.',
            deliverableImages: 'img/katana_brand_06.png,img/katana_brand_03.png,img/katana_brand_04.png,img/katana_brand_05.jpg,img/katana_product_01.jpg,img/katana_product_02.jpg',
            outcome: 'The project transformed Katana from an abstract concept into a fully realized brand platform capable of supporting future growth across multiple divisions.<br><br>Key outcomes included:<br><br>\u2022 Creation of a complete brand identity system.<br>\u2022 Development of scalable design guidelines.<br>\u2022 Establishment of a distinctive visual language.<br>\u2022 Alignment of product, promotion, and brand philosophy.<br>\u2022 Foundation for future merchandise and equipment launches.<br>\u2022 Positioning within the premium combat sports market.<br><br>Most importantly, the project established a framework capable of growing alongside the business while maintaining a consistent and recognisable identity.<br><br><strong>Key Takeaway:</strong> Katana demonstrates the ability to transform an idea into a scalable brand ecosystem. By combining strategic positioning, creative direction, identity design, and product thinking, the project established a foundation capable of supporting growth across media, merchandise, athlete management, and combat sports promotion while maintaining a cohesive cultural identity.',
            scope: 'Brand Strategy,Creative Direction,Project Management,Visual Identity Design,Brand Positioning,Logo Design,Typography Systems,Design Systems,Merchandise Branding,Product Visualisation,Marketing Design,Art Direction,Brand Guidelines,Combat Sports Branding',
            img: 'videos/Katana_embedded%20_pic.png'
        },
        // 8. ALFRED KONUWA x FORBES (new — bottom right)
        {
            title: 'ALFRED KONUWA \u00d7 FORBES',
            brandName: 'ALFRED KONUWA',
            hugeTitle: 'ALFRED KONUWA.<br>\u00d7 FORBES.',
            video: 'https://player.mediadelivery.net/embed/680285/61c4581c-3113-4740-99b0-247467c0fd73?autoplay=true&loop=true&muted=true&preload=true&responsive=true',
            category: '08 / CREATOR MEDIA',
            shortDesc: 'Building a scalable content engine for a Forbes contributor, comedian and wrestling media personality',
            meta: 'Editorial Direction \u0026 Content Systems \u00b7 Alfred Konuwa \u00b7 Forbes Contributor',
            profileImg: 'img/alfred_konuwa_profile.jpg',
            brief: 'Alfred Konuwa is a nationally syndicated sportswriter, Forbes contributor, stand-up comedian, broadcaster, and one of the most recognizable voices covering professional wrestling today.<br><br>Known for combining sports journalism, comedy, and cultural commentary, Alfred has built a distinctive media brand spanning YouTube, social media, live appearances, and digital publishing.<br><br>My role extended beyond traditional video editing into developing the visual systems, editorial workflows, and production infrastructure required to support a consistent, high-frequency content operation.<br><br>Working across long-form YouTube videos, social media assets, motion graphics, and branded content, I helped establish a repeatable framework that strengthened both production efficiency and audience recognition.',
            challenge: 'Alfred\'s content occupies a unique space between journalism, entertainment, comedy, and wrestling analysis. The challenge was to create a production system capable of:<br><br>\u2022 Supporting frequent weekly publishing.<br>\u2022 Maintaining a consistent visual identity across platforms.<br>\u2022 Delivering high-energy entertainment while preserving journalistic credibility.<br>\u2022 Improving audience retention throughout long-form commentary videos.<br>\u2022 Creating reusable design systems for future growth.<br>\u2022 Managing fast turnaround schedules without sacrificing quality.<br><br>Unlike traditional editing projects, success depended not only on producing individual videos but on creating a sustainable content ecosystem.',
            solution: 'My involvement evolved into a hybrid editorial and creative partnership focused on both content execution and long-term scalability.<br><br>Responsibilities included:<br><br>\u2022 Long-form video editing.<br>\u2022 Motion graphics design.<br>\u2022 Visual branding development.<br>\u2022 Narrative pacing and retention optimization.<br>\u2022 Thumbnail and promotional asset creation.<br>\u2022 Graphic design systems.<br>\u2022 Multi-platform content adaptation.<br>\u2022 Workflow optimization and template development.<br><br>To improve production efficiency, I created reusable visual frameworks and branding assets that could be deployed across YouTube, X, Facebook, TikTok, and other distribution channels. This reduced production friction while creating stronger audience recognition and a more cohesive brand identity.<br><br><strong>Featured Project \u2014 MJF\'s WWE Obsession Is No Accident:</strong><br>One of the featured projects explored the fascinating business psychology behind Maxwell Jacob Friedman (MJF) and his public relationship with WWE while remaining one of All Elite Wrestling\'s biggest stars. The video examined MJF\'s difficult upbringing and \'villain origin story,\' his admiration for WWE\'s biggest performers, his strategic positioning within the wrestling industry, the psychology of personal branding, and the business value of controversy and public attention. Through pacing, visual storytelling, graphics, sound design, and careful structuring, the final piece transformed a complex industry discussion into an accessible and entertaining story.',
            outcome: 'The collaboration helped establish a more scalable and recognizable content operation while improving the efficiency of weekly production.<br><br>Key contributions included:<br><br>\u2022 Creation of reusable visual asset systems.<br>\u2022 Consistent editorial standards across projects.<br>\u2022 Stronger brand recognition through repeatable design frameworks.<br>\u2022 Improved viewer engagement through retention-focused editing.<br>\u2022 Faster production workflows through template-based systems.<br>\u2022 Reliable delivery of weekly content under demanding schedules.<br><br>Most importantly, the project demonstrated how thoughtful editorial systems can support the growth of a modern creator-led media brand.<br><br><strong>Key Takeaway:</strong> This collaboration demonstrates the ability to operate beyond the role of editor and contribute as a creative systems partner. By combining editorial strategy, visual branding, motion design, and production infrastructure, I helped support a creator whose work spans journalism, entertainment, and digital media while building scalable systems designed for long-term growth.',
            scope: 'Editorial Direction,Long-Form Video Editing,Audience Retention Strategy,Motion Graphics Design,Visual Identity Systems,YouTube Content Production,Brand Development,Content Packaging,Narrative Structuring,Sound Design,Multi-Platform Media Production,Graphic Design,Creative Strategy,Creator Economy Media',
            img: 'Project%20card%20thymnails/AlfredKonuwaxForbes_Project%20card%20thumbnail.jpg'
        }
    ]
};

function renderWorkCards(tabKey) {
    const trackTop = document.getElementById('showcase-track-top');
    const trackBottom = document.getElementById('showcase-track-bottom');
    if (!trackTop || !trackBottom) return;

    const items = WORK_TAB_DATA[tabKey] || [];
    trackTop.style.opacity = '0';
    trackBottom.style.opacity = '0';
    trackTop.style.transition = 'opacity 0.3s ease';
    trackBottom.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        trackTop.innerHTML = '';
        trackBottom.innerHTML = '';

        // Split items into top and bottom rows
        const half = Math.ceil(items.length / 2);
        const topItems = items.slice(0, half);
        const bottomItems = items.slice(half);

        function createCardElement(item) {
            const card = document.createElement('div');
            card.className = 'showcase-card';
            card.dataset.projectTitle    = item.title;
            card.dataset.projectCategory = item.category;
            card.dataset.projectDesc              = item.desc || '';
            card.dataset.projectScope             = item.scope || '';
            card.dataset.projectBrief             = item.brief || '';
            card.dataset.projectChallenge         = item.challenge || '';
            card.dataset.projectSolution          = item.solution || '';
            card.dataset.projectDeliverables      = item.deliverables || '';
            card.dataset.projectDeliverableImages = item.deliverableImages || '';
            card.dataset.projectOutcome           = item.outcome || '';
            card.dataset.projectMeta              = item.meta || '';
            card.innerHTML = `
                <div class="showcase-card-inner">
                    <img src="${item.img}" alt="${item.title}" />
                    <div class="card-overlay"></div>
                    <div class="card-content">
                        <div class="card-number">${item.category}</div>
                        <h3 class="card-title">${item.title}</h3>
                        <div class="card-desc">${item.shortDesc}</div>
                    </div>
                    <button class="card-btn magnetic-btn" onclick="openProjectPanel(this)">
                        <span class="material-symbols-outlined">arrow_outward</span>
                    </button>
                </div>`;
            return card;
        }

        topItems.forEach(item => {
            trackTop.appendChild(createCardElement(item));
        });

        bottomItems.forEach(item => {
            trackBottom.appendChild(createCardElement(item));
        });

        // Re-init magnetic on new cards
        initMagneticBtns();

        trackTop.style.opacity = '1';
        trackBottom.style.opacity = '1';
    }, 300);
}

function switchWorkTab(tabKey, btn) {
    document.querySelectorAll('.work-tab').forEach(t => {
        t.classList.remove('active');
        t.className = t.className.replace('bg-primary', '').trim();
        if (!t.classList.contains('border')) {
            t.classList.add('border', 'border-white/10');
        }
    });
    btn.classList.add('active');
    renderWorkCards(tabKey);
}

// Reusable init functions for dynamically added cards
function initTiltCards() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        const inner = card.querySelector('.tilt-card-inner');
        const glare = card.querySelector('.glare');
        if (!inner) return;

        // Premium restrained values: max 5deg (was 16deg), deep perspective handled in CSS
        const MAX_TILT = 5;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            // Slow, smooth — no rapid transition override
            inner.style.transition = 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            inner.style.transform = `rotateX(${((cy - y) / cy) * MAX_TILT}deg) rotateY(${((x - cx) / cx) * MAX_TILT}deg) scale(1.01)`;

            if (glare) {
                glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.07), transparent 65%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            // Slow settle back — premium weighted feel
            inner.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            inner.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            if (glare) glare.style.opacity = '0';
        });

        card.addEventListener('mouseenter', () => {
            if (glare) glare.style.opacity = '1';
        });
    });
}

function initScrambleHover() {
    document.querySelectorAll('.scramble-hover').forEach(el => {
        if (el._scrambleInit) return;
        el._scrambleInit = true;
        const orig = el.dataset.text || el.textContent;
        let iv = null;
        el.addEventListener('mouseenter', () => {
            if (iv) clearInterval(iv);
            let p = 0;
            el.textContent = orig.split('').map(c => c===' '?' ':CHARS[Math.floor(Math.random()*CHARS.length)]).join('');
            iv = setInterval(() => {
                p += 0.5; const lk = Math.floor(p); let r = '';
                for (let i=0;i<orig.length;i++) r += orig[i]===' '?' ':(i<lk?orig[i]:CHARS[Math.floor(Math.random()*CHARS.length)]);
                el.textContent = r;
                if (lk >= orig.length) { clearInterval(iv); iv=null; el.textContent=orig; }
            }, 28);
        });
        el.addEventListener('mouseleave', () => { if(iv){clearInterval(iv);iv=null;} el.textContent=orig; });
    });
}

function initMagneticBtns() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        if (btn._magneticInit) return;
        btn._magneticInit = true;
        btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.35}px, ${(e.clientY-r.top-r.height/2)*0.35}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
    });
}

// Initial render & behavior initialization
renderWorkCards('projects');
initTiltCards();
initScrambleHover();
initMagneticBtns();

// Widescreen Video Hero Playback Overlay Auto-toggles
(function() {
    const videoHero = document.getElementById('project-panel-video-hero');
    if (videoHero) {
        videoHero.addEventListener('play', () => {
            const overlay = document.getElementById('video-play-overlay');
            if (overlay) overlay.classList.add('playing');
        });
        videoHero.addEventListener('pause', () => {
            const overlay = document.getElementById('video-play-overlay');
            if (overlay) overlay.classList.remove('playing');
        });
        videoHero.addEventListener('ended', () => {
            const overlay = document.getElementById('video-play-overlay');
            if (overlay) overlay.classList.remove('playing');
        });
    }
})();

// ===== EVERY FIELD HAS ITS MASTERS — Scroll-Driven Identity Sequence =====
(function () {
    const section = document.getElementById('masters-section');
    const viewport = document.getElementById('masters-viewport');
    if (!section || !viewport) return;

    const bgLayers = viewport.querySelectorAll('.masters-bg-layer');
    const cards    = viewport.querySelectorAll('.masters-card');
    const progressSegments = viewport.querySelectorAll('.masters-progress-segment');
    const TOTAL_STEPS = 5; // ATHLETES, FOUNDERS, EDUCATORS, CREATORS, STORYTELLERS

    let currentStep = -1;

    function updateStep(newStep) {
        if (newStep === currentStep) return;
        currentStep = newStep;

        // Crossfade background layers
        bgLayers.forEach((layer, i) => {
            if (i === newStep) {
                layer.classList.add('masters-bg-layer--active');
            } else {
                layer.classList.remove('masters-bg-layer--active');
            }
        });

        // Crossfade title cards
        cards.forEach((card, i) => {
            if (i === newStep) {
                card.classList.add('masters-card--active');
            } else {
                card.classList.remove('masters-card--active');
            }
        });

        // Update progress segments
        progressSegments.forEach((segment, i) => {
            if (i <= newStep) {
                segment.classList.add('masters-progress-segment--active');
            } else {
                segment.classList.remove('masters-progress-segment--active');
            }
        });
    }

    function onScroll() {
        const rect = section.getBoundingClientRect();
        const sectionTop = -rect.top;
        const vh = window.innerHeight;
        const stepHeight = vh * 0.15; // 15vh per step for ultra-responsive transitions

        // Ensure step 0 is active right as we hit the section
        if (sectionTop < 0) {
            updateStep(0);
            return;
        }
        
        // Before or after the section
        if (sectionTop > TOTAL_STEPS * stepHeight + vh) {
            updateStep(TOTAL_STEPS - 1);
            return;
        }

        // Calculate step based on highly sensitive scroll depth
        const step = Math.min(TOTAL_STEPS - 1, Math.max(0, Math.floor(sectionTop / stepHeight)));
        updateStep(step);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial state
})();

// ===== FROM MASTERY TO INFLUENCE — Pinned Stacked Cards =====
(function () {
    const section = document.getElementById('influence-section');
    if (!section) return;

    const cards = Array.from(section.querySelectorAll('.influence-card'));
    const TOTAL_CARDS = cards.length;
    
    // Smooth scroll interpolation state
    let targetProgress = 0;
    let currentProgress = 0;
    let isAnimating = false;

    // The final stacked Y offsets (vh)
    const TARGET_Y = [0, 2, 4, 6];

    // Premium cinematic ease applied to scroll mapping
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function render() {
        // Continuous buttery lerp. 0.08 responsiveness connects firmly to scroll
        currentProgress += (targetProgress - currentProgress) * 0.08;

        cards.forEach((card, i) => {
            if (i === 0) {
                card.style.transform = `translateY(0vh)`;
                if (currentProgress >= 0) card.classList.add('is-active', 'is-revealed');
                return;
            }

            // Cards 1, 2, 3 overlap slightly or play sequentially
            // Map 0 -> 1 progress into individual segments for each card
            const segmentSize = 1.0 / (TOTAL_CARDS - 1); // 0.333
            const start = (i - 1) * segmentSize;
            
            let localP = 0;
            if (currentProgress > start) {
                localP = Math.min(1, (currentProgress - start) / segmentSize);
            }

            const easedP = easeInOutCubic(localP);
            const y = 120 - (120 - TARGET_Y[i]) * easedP;
            
            card.style.transform = `translateY(${y}vh)`;
            
            // Trigger internal text reveals when card is moving into place
            if (localP > 0.4) {
                card.classList.add('is-active', 'is-revealed');
            } else {
                card.classList.remove('is-active', 'is-revealed');
            }
        });

        // Continue render loop if not fully settled
        if (Math.abs(targetProgress - currentProgress) > 0.001) {
            requestAnimationFrame(render);
        } else {
            isAnimating = false;
        }
    }

    function onScroll() {
        const rect = section.getBoundingClientRect();
        const sectionTop = -rect.top;
        const scrollHeight = window.innerHeight * 2.0; // matches the 200vh spacer exactly
        
        let p = 0;
        if (sectionTop > 0) {
            p = Math.min(1, sectionTop / scrollHeight);
        }

        targetProgress = p;

        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(render);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initialize state
})();

// ===== CINEMATIC MOTION SEQUENCER =====
(function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // 1. Founder Portrait -> Name -> Desc
                if (el.classList.contains('cine-founder-portrait')) {
                    el.classList.add('is-revealed');
                    setTimeout(() => {
                        document.querySelector('.cine-founder-name')?.classList.add('is-revealed');
                    }, 250);
                    setTimeout(() => {
                        document.querySelectorAll('.cine-founder-desc').forEach(d => d.classList.add('is-revealed'));
                    }, 500);
                    observer.unobserve(el);
                }

                // 2. Editorial Grid
                if (el.classList.contains('cine-grid-col')) {
                    const siblings = Array.from(document.querySelectorAll('.cine-grid-col'));
                    const index = siblings.indexOf(el);
                    setTimeout(() => {
                        el.classList.add('is-revealed');
                    }, index * 150);
                    observer.unobserve(el);
                }

                // 3. Every Field Has Its Masters
                if (el.classList.contains('cine-masters-trigger')) {
                    setTimeout(() => document.querySelector('.cine-masters-l1')?.classList.add('is-revealed'), 0);
                    setTimeout(() => document.querySelector('.cine-masters-l2')?.classList.add('is-revealed'), 200);
                    setTimeout(() => document.querySelector('.cine-masters-sub')?.classList.add('is-revealed'), 600);
                    observer.unobserve(el);
                }

                // 4. Final CTA
                if (el.classList.contains('cine-cta-trigger')) {
                    setTimeout(() => document.querySelector('.cine-cta-l1')?.classList.add('is-revealed'), 0);
                    setTimeout(() => document.querySelector('.cine-cta-l2')?.classList.add('is-revealed'), 150);
                    setTimeout(() => document.querySelector('.cine-cta-l3')?.classList.add('is-revealed'), 300);
                    setTimeout(() => document.querySelector('.cine-cta-l4')?.classList.add('is-revealed'), 450);
                    setTimeout(() => document.querySelector('.cine-cta-sub')?.classList.add('is-revealed'), 900);
                    observer.unobserve(el);
                }

                // 5. Final CTA Form & Info
                if (el.classList.contains('cine-cta-form-trigger')) {
                    setTimeout(() => document.querySelector('.final-cta-form')?.classList.add('is-revealed'), 300);
                    setTimeout(() => document.querySelector('.cine-cta-info')?.classList.add('is-revealed'), 600);
                    observer.unobserve(el);
                }
            }
        });
    }, { threshold: 0.15 });

    // Observe triggers
    const triggers = document.querySelectorAll('.cine-founder-portrait, .cine-grid-col, .cine-masters-trigger, .cine-cta-trigger, .cine-cta-form-trigger');
    triggers.forEach(el => observer.observe(el));
})();

// ===== FOUNDER PARALLAX =====
(function() {
    const portrait = document.querySelector('.story-portrait');
    const content = document.querySelector('.story-intro');
    if (!portrait || !content) return;

    window.addEventListener('scroll', () => {
        const rect = portrait.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top < viewportHeight && rect.bottom > 0) {
            // Element is in view
            const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
            // Parallax values: extremely subtle as requested
            const portraitOffset = (progress - 0.5) * 6; // max ~3px movement
            const contentOffset = (progress - 0.5) * -3; // max ~1.5px movement
            
            portrait.style.transform = `translateY(${portraitOffset}px)`;
            content.style.transform = `translateY(${contentOffset}px)`;
        }
    }, { passive: true });
})();

// ===== ETHOS CINEMATIC INTERLUDE — Scroll Reveal + Video Playback =====
(function () {
    const section = document.getElementById('ethos');
    if (!section) return;

    // Headline lines: staggered mask wipe
    const lines = section.querySelectorAll('.ethos-mask-line');
    const videoCol = section.querySelector('.ethos-video-col');

    const headlineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            lines.forEach((line, i) => {
                setTimeout(() => line.classList.add('is-revealed'), i * 160);
            });
            // Founder video fades in shortly after headline begins
            setTimeout(() => videoCol && videoCol.classList.add('is-revealed'), 500);
            headlineObserver.disconnect();
        });
    }, { threshold: 0.25 });

    const col = section.querySelector('.ethos-headline-col');
    if (col) headlineObserver.observe(col);

    // ── Scroll-triggered video playback with sound ──
    const video = document.getElementById('ethos-founder-video-el');
    const soundOverlay = document.getElementById('ethos-sound-overlay');
    const pauseIndicator = document.getElementById('ethos-pause-indicator');
    const playIndicator = document.getElementById('ethos-play-indicator');
    if (!video) return;

    // Player controls elements
    const vpControls    = document.getElementById('vp-controls');
    const vpPlayBtn     = document.getElementById('vp-play-btn');
    const vpIconPlay    = document.getElementById('vp-icon-play');
    const vpIconPause   = document.getElementById('vp-icon-pause');
    const vpTimeCurrent = document.getElementById('vp-time-current');
    const vpTimeDuration= document.getElementById('vp-time-duration');
    const vpSeek        = document.getElementById('vp-seek');
    const vpSeekProgress= document.getElementById('vp-seek-progress');
    const vpSeekBuffered= document.getElementById('vp-seek-buffered');
    const vpSeekThumb   = document.getElementById('vp-seek-thumb');
    const vpMuteBtn     = document.getElementById('vp-mute-btn');
    const vpIconVol     = document.getElementById('vp-icon-vol');
    const vpIconMuted   = document.getElementById('vp-icon-muted');

    let hasStarted = false;
    let soundUnlocked = false;
    let isDragging = false;

    // ── Helpers ──
    function flashIndicator(el) {
        el.classList.add('is-visible');
        setTimeout(() => el.classList.remove('is-visible'), 400);
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    function syncPlayPauseIcon() {
        if (!vpIconPlay || !vpIconPause) return;
        if (video.paused) {
            vpIconPlay.style.display = '';
            vpIconPause.style.display = 'none';
        } else {
            vpIconPlay.style.display = 'none';
            vpIconPause.style.display = '';
        }
    }

    function syncMuteIcon() {
        if (!vpIconVol || !vpIconMuted) return;
        if (video.muted) {
            vpIconVol.style.display = 'none';
            vpIconMuted.style.display = '';
        } else {
            vpIconVol.style.display = '';
            vpIconMuted.style.display = 'none';
        }
    }

    function updateProgress() {
        if (!video.duration || isDragging) return;
        const pct = (video.currentTime / video.duration) * 100;
        if (vpSeekProgress) vpSeekProgress.style.width = pct + '%';
        if (vpSeekThumb) vpSeekThumb.style.left = pct + '%';
        if (vpTimeCurrent) vpTimeCurrent.textContent = formatTime(video.currentTime);
    }

    function updateBuffered() {
        if (!video.duration || !vpSeekBuffered) return;
        if (video.buffered.length > 0) {
            const buffEnd = video.buffered.end(video.buffered.length - 1);
            vpSeekBuffered.style.width = (buffEnd / video.duration) * 100 + '%';
        }
    }

    // ── Seek bar: click to seek ──
    function seekToPosition(e) {
        if (!video.duration) return;
        const rect = vpSeek.getBoundingClientRect();
        let pct = (e.clientX - rect.left) / rect.width;
        pct = Math.max(0, Math.min(1, pct));
        video.currentTime = pct * video.duration;
        if (vpSeekProgress) vpSeekProgress.style.width = (pct * 100) + '%';
        if (vpSeekThumb) vpSeekThumb.style.left = (pct * 100) + '%';
        if (vpTimeCurrent) vpTimeCurrent.textContent = formatTime(video.currentTime);
    }

    if (vpSeek) {
        vpSeek.addEventListener('mousedown', (e) => {
            isDragging = true;
            vpSeek.classList.add('is-dragging');
            seekToPosition(e);
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            seekToPosition(e);
        });
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            vpSeek.classList.remove('is-dragging');
        });
        // Touch support
        vpSeek.addEventListener('touchstart', (e) => {
            isDragging = true;
            vpSeek.classList.add('is-dragging');
            seekToPosition(e.touches[0]);
            e.preventDefault();
        }, { passive: false });
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            seekToPosition(e.touches[0]);
        }, { passive: true });
        document.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            vpSeek.classList.remove('is-dragging');
        });
    }

    // ── Video events → update UI ──
    if (video.tagName === 'VIDEO') {
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('progress', updateBuffered);
        video.addEventListener('loadedmetadata', () => {
            if (vpTimeDuration) vpTimeDuration.textContent = formatTime(video.duration);
        });
        video.addEventListener('play', syncPlayPauseIcon);
        video.addEventListener('pause', syncPlayPauseIcon);
    }

    // ── Play/Pause button ──
    if (vpPlayBtn) {
        vpPlayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }

    // ── Mute toggle button ──
    if (vpMuteBtn) {
        vpMuteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            syncMuteIcon();
        });
    }

    // ── Scroll into view → start playing ──
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true;
                if (video.tagName === 'VIDEO') {
                    video.muted = true;
                    syncMuteIcon();
                    video.play().then(() => {
                        syncPlayPauseIcon();
                        if (soundOverlay) soundOverlay.style.display = 'flex';
                    }).catch(() => {});
                } else if (video.tagName === 'IFRAME') {
                    video.src = video.getAttribute('data-src');
                    // Hide custom UI as iframe has its own controls
                    if (vpControls) vpControls.style.display = 'none';
                    if (soundOverlay) soundOverlay.style.display = 'none';
                }
            }
        });
    }, { threshold: 0.3 });

    videoObserver.observe(video);

    // ── Sound overlay click → unmute ──
    if (soundOverlay) {
        soundOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = false;
            soundUnlocked = true;
            soundOverlay.classList.add('is-hidden');
            syncMuteIcon();
            if (video.paused) video.play();
        });
    }

    // ── Click video → toggle pause/play ──
    video.addEventListener('click', () => {
        if (video.tagName !== 'VIDEO') return;
        if (!soundUnlocked) return;
        if (video.paused) {
            video.play();
            if (playIndicator) flashIndicator(playIndicator);
        } else {
            video.pause();
            if (pauseIndicator) flashIndicator(pauseIndicator);
        }
    });
})();

// ===== ATMOSPHERIC PANEL PARALLAX (visual-only, does NOT touch card stacking) =====
(function () {
    const gradients = document.querySelectorAll('.atmo-gradient');
    if (!gradients.length) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        gradients.forEach((el, i) => {
            // Each panel gets a slightly different parallax factor
            const factor = 0.008 + (i * 0.003); // ~2-4px max at typical scroll depths
            const offset = scrollY * factor;
            el.style.transform = `translateY(${offset % 6}px)`;
        });
    }, { passive: true });
})();

// ===== MASTERS TYPOGRAPHY BLOCK ENTRY ANIMATION =====
(function() {
    const label = document.getElementById('masters-chapter-label');
    if (!label) return;
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            label.classList.add('is-revealed');
            observer.disconnect();
        }
    }, { threshold: 0.1 });
    
    observer.observe(label);
})();

// ===== MUSEUM GLASS EFFECT =====
(function() {
    const wrappers = document.querySelectorAll('.story-portrait-wrapper');
    wrappers.forEach(wrapper => {
        let currentX = window.innerWidth / 2;
        let currentY = window.innerHeight / 2;
        let targetX = currentX;
        let targetY = currentY;
        let isHovered = false;

        function animate() {
            if (isHovered) {
                // Lerp for smooth interpolation
                currentX += (targetX - currentX) * 0.08;
                currentY += (targetY - currentY) * 0.08;
                wrapper.style.setProperty('--mouse-x', currentX + 'px');
                wrapper.style.setProperty('--mouse-y', currentY + 'px');
                requestAnimationFrame(animate);
            }
        }

        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
        });

        wrapper.addEventListener('mouseenter', (e) => {
            isHovered = true;
            const rect = wrapper.getBoundingClientRect();
            currentX = targetX = e.clientX - rect.left;
            currentY = targetY = e.clientY - rect.top;
            wrapper.style.setProperty('--mouse-x', currentX + 'px');
            wrapper.style.setProperty('--mouse-y', currentY + 'px');
            requestAnimationFrame(animate);
        });

        wrapper.addEventListener('mouseleave', () => {
            isHovered = false;
        });
    });
})();


// ===== MOBILE HYBRID CAROUSEL (AUTO + TOUCH) =====
(function() {
    const wrappers = document.querySelectorAll(".showcase-row-wrapper");
    if (!wrappers.length) return;

    let autoPanReq;
    let resumeTimeout;
    let isAutoPanning = false;

    // Track state for each row
    const rows = Array.from(wrappers).map((wrapper, index) => {
        return {
            el: wrapper,
            track: wrapper.querySelector(".showcase-track"),
            speed: 0.35, 
            direction: index % 2 === 0 ? -1 : 1, // Start drifting in opposite directions
            offsetX: 0 // pure translateX offset
        };
    });

    function startAutoPan() {
        if (!isAutoPanning && window.innerWidth <= 1024) {
            isAutoPanning = true;
            autoPanReq = requestAnimationFrame(panLoop);
        }
    }

    function stopAutoPan() {
        isAutoPanning = false;
        if (autoPanReq) cancelAnimationFrame(autoPanReq);
    }

    function panLoop() {
        if (!isAutoPanning || window.innerWidth > 1024) return;
        
        rows.forEach(row => {
            if (!row.track) return;
            
            // maxScroll is the native bounds of the wrapper
            const maxScroll = row.el.scrollWidth - row.el.clientWidth;
            if (maxScroll <= 0) return;

            // Visual scroll position is native scrollLeft minus the visual translation
            const visualPos = row.el.scrollLeft - row.offsetX; 

            // Easing near the edges
            const edgeDistance = Math.min(visualPos, maxScroll - visualPos);
            let currentSpeed = row.speed;
            if (edgeDistance < 60) {
                currentSpeed = Math.max(0.05, row.speed * (edgeDistance / 60));
            }

            // offsetX represents the visual shift relative to the native scroll position
            // direction: 1 means moving track RIGHT (visual content moves left)
            row.offsetX += (currentSpeed * row.direction);

            row.track.style.transform = `translateX(${row.offsetX}px) translateZ(0)`;

            // Reverse direction seamlessly if hitting the visual bounds
            if (row.direction === -1 && visualPos >= maxScroll - 0.5) {
                row.direction = 1; 
            } else if (row.direction === 1 && visualPos <= 0.5) {
                row.direction = -1;
            }
        });

        autoPanReq = requestAnimationFrame(panLoop);
    }

    function handleInteraction() {
        if (window.innerWidth > 1024) return;
        stopAutoPan();
        clearTimeout(resumeTimeout);
        
        // BAKE THE VISUAL TRANSLATE INTO NATIVE SCROLL
        // This makes the transition to native touch perfectly seamless
        rows.forEach(row => {
            if (row.offsetX !== 0) {
                const visualPos = row.el.scrollLeft - row.offsetX;
                row.offsetX = 0;
                row.track.style.transform = `translateX(0px) translateZ(0)`;
                row.el.scrollLeft = visualPos; // Restore exact visual position natively
            }
        });
    }

    function handleInteractionEnd() {
        if (window.innerWidth > 1024) return;
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            // Decide drift direction based on current scroll position
            rows.forEach(row => {
                const maxScroll = row.el.scrollWidth - row.el.clientWidth;
                if (row.el.scrollLeft > maxScroll / 2) {
                    row.direction = 1; // drift left visually (track moves right)
                } else {
                    row.direction = -1; // drift right visually
                }
            });
            startAutoPan();
        }, 3500); 
    }

    wrappers.forEach(wrapper => {
        wrapper.addEventListener("touchstart", handleInteraction, {passive: true});
        wrapper.addEventListener("touchend", handleInteractionEnd, {passive: true});
        
        // Also capture scroll events (e.g. from native inertia or trackpad)
        wrapper.addEventListener("scroll", () => {
            if (isAutoPanning) return; // Ignore if panLoop is running
            handleInteraction();
            handleInteractionEnd(); 
        }, {passive: true});
    });

    // Start auto-motion on load
    if (window.innerWidth <= 1024) {
        setTimeout(startAutoPan, 500);
    }
})();

