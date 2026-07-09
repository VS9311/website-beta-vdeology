import codecs

css_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/css/main.css'

css = """
/* ═══════════════════════════════════════════════════════════
   CINEMATIC VIDEO PANELS — Methodology Cards
═══════════════════════════════════════════════════════════ */

.influence-card-video-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;
    min-height: 200px;
    background-color: #0c0c0e; /* Deep fallback */
}

/* ── Video Element ── */
.influence-card-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    animation: influence-video-scale 14s ease-in-out infinite alternate;
}

@keyframes influence-video-scale {
    0% { transform: scale(1.0); }
    100% { transform: scale(1.05); }
}

/* ── Directional Gradient Overlay ── */
.influence-video-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    /* Soft directional gradient, ensuring it blends with the dark/light card themes */
    background: linear-gradient(to right, rgba(0, 0, 0, 0.45) 0%, transparent 40%, transparent 60%, rgba(0, 0, 0, 0.3) 100%);
}

/* ── Vignette ── */
.influence-video-vignette {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
}

/* ── Film Grain Texture ── */
.influence-video-grain {
    position: absolute;
    inset: -20%;
    width: 140%;
    height: 140%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.05;
    animation: influence-video-grain-drift 8s steps(10) infinite;
    pointer-events: none;
    z-index: 3;
}

@keyframes influence-video-grain-drift {
    0%   { transform: translate(0, 0); }
    10%  { transform: translate(-2%, -3%); }
    20%  { transform: translate(3%, 1%); }
    30%  { transform: translate(-1%, 4%); }
    40%  { transform: translate(4%, -2%); }
    50%  { transform: translate(-3%, 2%); }
    60%  { transform: translate(2%, -4%); }
    70%  { transform: translate(-4%, 1%); }
    80%  { transform: translate(1%, 3%); }
    90%  { transform: translate(3%, -1%); }
    100% { transform: translate(0, 0); }
}

/* Responsive constraints */
@media (max-width: 900px) {
    .influence-card-video-wrapper {
        min-height: 180px;
        max-height: 30vh;
    }
}
"""

with codecs.open(css_path, 'a', 'utf-8') as f:
    f.write(css)
print("Video CSS appended.")
