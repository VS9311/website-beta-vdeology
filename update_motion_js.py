import codecs

js_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/js/main.js'

js_content = """
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
"""

with codecs.open(js_path, 'a', 'utf-8') as f:
    f.write(js_content)

print('JS appended successfully.')
