import codecs

js_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/js/main.js'

js = """
// ===== ETHOS CINEMATIC INTERLUDE — Scroll Reveal =====
(function () {
    const section = document.getElementById('ethos');
    if (!section) return;

    // Headline lines: staggered mask wipe
    const lines = section.querySelectorAll('.ethos-mask-line');
    const labelEl = section.querySelector('.ethos-label');
    const bodyEl  = section.querySelector('.ethos-body');

    const headlineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            lines.forEach((line, i) => {
                setTimeout(() => line.classList.add('is-revealed'), i * 160);
            });
            // Ethos text staggered after headline
            setTimeout(() => labelEl && labelEl.classList.add('is-revealed'), 400);
            setTimeout(() => bodyEl  && bodyEl.classList.add('is-revealed'),  600);
            headlineObserver.disconnect();
        });
    }, { threshold: 0.25 });

    const col = section.querySelector('.ethos-headline-col');
    if (col) headlineObserver.observe(col);
})();
"""

with open(js_path, 'a', encoding='utf-8') as f:
    f.write(js)
print("JS appended.")
