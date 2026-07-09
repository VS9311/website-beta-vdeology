import codecs

css_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/css/main.css'

css = """
/* ═══════════════════════════════════════════════════════════
   ATMOSPHERIC MOTION PANELS — Methodology Cards
   Visual-only layer. Does NOT modify stacking/overlap/scroll.
═══════════════════════════════════════════════════════════ */

/* Base Panel — occupies same flex slot as the old img-wrapper */
.atmo-panel {
    flex: 1;
    position: relative;
    overflow: hidden;
    min-height: 200px;
}

/* ── Film Grain (shared across all cards) ── */
.atmo-grain {
    position: absolute;
    inset: -20%;
    width: 140%;
    height: 140%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.04;
    animation: atmo-grain-drift 8s steps(10) infinite;
    pointer-events: none;
    z-index: 3;
}
@keyframes atmo-grain-drift {
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

/* ── Gradient Light Layer ── */
.atmo-gradient {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0.6;
}

/* ── Particle Layer ── */
.atmo-particles {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
}

/* ═══════════ CARD-SPECIFIC THEMES ═══════════ */

/* ── DISCOVER: Scanning / Searching light ── */
.atmo-discover {
    background: #0a0a0c;
}
.atmo-discover .atmo-gradient {
    background: radial-gradient(ellipse 80% 60% at 30% 50%, rgba(40, 50, 70, 0.5) 0%, transparent 70%),
                radial-gradient(ellipse 60% 80% at 75% 60%, rgba(25, 35, 55, 0.3) 0%, transparent 60%);
    animation: atmo-discover-scan 18s ease-in-out infinite alternate;
}
@keyframes atmo-discover-scan {
    0%   { background-position: 0% 50%, 100% 50%; opacity: 0.5; }
    33%  { background-position: 20% 30%, 80% 70%; opacity: 0.65; }
    66%  { background-position: 40% 60%, 60% 40%; opacity: 0.55; }
    100% { background-position: 10% 45%, 90% 55%; opacity: 0.6; }
}

/* ── SHAPE: Structured, tighter rhythm ── */
.atmo-shape {
    background: #0e0e10;
}
.atmo-shape .atmo-gradient {
    background: linear-gradient(160deg, rgba(35, 35, 40, 0.6) 0%, transparent 50%),
                linear-gradient(340deg, rgba(25, 25, 30, 0.4) 0%, transparent 60%);
    animation: atmo-shape-pulse 14s ease-in-out infinite alternate;
}
@keyframes atmo-shape-pulse {
    0%   { opacity: 0.5; transform: scale(1); }
    50%  { opacity: 0.7; transform: scale(1.02); }
    100% { opacity: 0.5; transform: scale(1); }
}

/* ── CREATE: Slightly more energetic ── */
.atmo-create {
    background: #080810;
}
.atmo-create .atmo-gradient {
    background: radial-gradient(circle at 50% 50%, rgba(50, 40, 60, 0.4) 0%, transparent 60%),
                radial-gradient(circle at 20% 80%, rgba(30, 25, 45, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(35, 30, 50, 0.2) 0%, transparent 50%);
    animation: atmo-create-bloom 12s ease-in-out infinite alternate;
}
@keyframes atmo-create-bloom {
    0%   { opacity: 0.5; transform: scale(1) rotate(0deg); }
    50%  { opacity: 0.75; transform: scale(1.03) rotate(0.5deg); }
    100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
}

/* ── MULTIPLY: Wide, expansive diffusion ── */
.atmo-multiply {
    background: #0a0c0e;
}
.atmo-multiply .atmo-gradient {
    background: radial-gradient(ellipse 120% 100% at 50% 50%, rgba(30, 40, 50, 0.35) 0%, transparent 70%),
                linear-gradient(to right, rgba(20, 25, 35, 0.2) 0%, transparent 40%, transparent 60%, rgba(20, 25, 35, 0.2) 100%);
    animation: atmo-multiply-expand 22s ease-in-out infinite alternate;
}
@keyframes atmo-multiply-expand {
    0%   { opacity: 0.45; transform: scale(1); }
    33%  { opacity: 0.6; transform: scale(1.04); }
    66%  { opacity: 0.5; transform: scale(1.02); }
    100% { opacity: 0.45; transform: scale(1); }
}

/* ── Micro light particles (CSS-only dots) ── */
.atmo-particles::before,
.atmo-particles::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    filter: blur(1px);
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
.atmo-particles::before {
    width: 3px;
    height: 3px;
    top: 30%;
    left: 25%;
    animation: atmo-dot-drift-a 20s infinite alternate;
}
.atmo-particles::after {
    width: 2px;
    height: 2px;
    top: 60%;
    left: 65%;
    animation: atmo-dot-drift-b 16s infinite alternate;
}
@keyframes atmo-dot-drift-a {
    0%   { transform: translate(0, 0); opacity: 0.06; }
    25%  { transform: translate(15px, -10px); opacity: 0.1; }
    50%  { transform: translate(-8px, 12px); opacity: 0.04; }
    75%  { transform: translate(20px, 5px); opacity: 0.09; }
    100% { transform: translate(-5px, -8px); opacity: 0.06; }
}
@keyframes atmo-dot-drift-b {
    0%   { transform: translate(0, 0); opacity: 0.05; }
    33%  { transform: translate(-12px, 8px); opacity: 0.08; }
    66%  { transform: translate(10px, -15px); opacity: 0.04; }
    100% { transform: translate(5px, 12px); opacity: 0.07; }
}

/* ── Override light card theme for atmospheric panels ── */
.influence-card--light .atmo-panel {
    /* Light cards now use dark atmospheric panels for consistency */
}
.influence-card--light {
    background-color: #0c0c0e;
    color: #FFFFFF;
}
.influence-card--light .influence-chapter { color: rgba(255, 255, 255, 0.5); }
.influence-card--light .influence-desc { color: rgba(255, 255, 255, 0.75); }
.influence-card--light .influence-outputs-label { color: rgba(255, 255, 255, 0.4); }

/* ── Responsive: panel stacks above text on mobile ── */
@media (max-width: 900px) {
    .atmo-panel {
        min-height: 180px;
        max-height: 30vh;
    }
}
"""

with codecs.open(css_path, 'a', 'utf-8') as f:
    f.write(css)
print("Atmospheric CSS appended.")
