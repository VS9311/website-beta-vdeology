import codecs

js_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/js/main.js'

js = """
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
"""

with codecs.open(js_path, 'a', 'utf-8') as f:
    f.write(js)
print("JS for masters label animation appended.")
