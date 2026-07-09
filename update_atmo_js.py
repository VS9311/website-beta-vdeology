import codecs

js_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/js/main.js'

js = """
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
"""

with codecs.open(js_path, 'a', 'utf-8') as f:
    f.write(js)
print("Parallax JS appended.")
