import codecs

css_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/css/main.css'

css = """
/* ═══════════════════════════════════════════════════════════
   ETHOS CINEMATIC INTERLUDE
═══════════════════════════════════════════════════════════ */

/* Section wrapper */
.ethos-interlude {
    position: relative;
    width: 100%;
    background: #060608;
    margin-top: -25vh;
    padding-bottom: 0;
    z-index: 10;
    overflow: hidden;
}

/* Two-column inner grid */
.ethos-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: clamp(120px, 18vh, 220px) clamp(24px, 6vw, 80px) clamp(80px, 12vh, 140px);
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
}
@media (min-width: 1024px) {
    .ethos-inner {
        grid-template-columns: 3fr 2fr;
        gap: 80px;
        align-items: start;
    }
}

/* ── Headline Mask Reveals ── */
.ethos-headline {
    font-family: 'General Sans', sans-serif;
    font-weight: 700;
    font-size: clamp(3.5rem, 8vw, 7.5rem);
    line-height: 0.9;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #fff;
    margin: 0;
}
.ethos-mask-wrap {
    overflow: hidden;
    padding-bottom: 0.08em; /* prevent descender clipping */
}
.ethos-mask-line {
    display: block;
    transform: translateY(105%);
    opacity: 0;
    transition: transform 1.1s cubic-bezier(0.25, 1, 0.5, 1),
                opacity 0.6s ease;
}
.ethos-mask-line.is-revealed {
    transform: translateY(0);
    opacity: 1;
}
/* Per-line opacity to match original intent */
.ethos-line-1 { color: rgba(255,255,255,0.9); }
.ethos-line-2 { color: rgba(255,255,255,0.7); }
.ethos-line-3 { color: rgba(255,255,255,1);   }

/* ── Ethos Text Column ── */
.ethos-text-col {
    padding-top: clamp(0px, 2vw, 32px);
}
.ethos-label {
    font-family: 'General Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 28px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.9s cubic-bezier(0.25,1,0.5,1),
                transform 0.9s cubic-bezier(0.25,1,0.5,1);
}
.ethos-body {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.95rem, 1.1vw, 1.1rem);
    font-weight: 300;
    line-height: 1.8;
    color: rgba(255,255,255,0.5);
    max-width: 450px;
    margin: 0;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.9s cubic-bezier(0.25,1,0.5,1),
                transform 0.9s cubic-bezier(0.25,1,0.5,1);
}
.ethos-label.is-revealed,
.ethos-body.is-revealed {
    opacity: 1;
    transform: translateY(0);
}

/* ── Marquee Section ── */
.ethos-marquee-section {
    position: relative;
    width: 100%;
    padding: clamp(40px, 6vh, 80px) 0 clamp(60px, 10vh, 120px);
    overflow: hidden;
}

/* Gradient fade edges */
.ethos-marquee-fade {
    position: absolute;
    top: 0;
    bottom: 0;
    width: clamp(80px, 12vw, 200px);
    z-index: 2;
    pointer-events: none;
}
.ethos-marquee-fade--left {
    left: 0;
    background: linear-gradient(to right, #060608 0%, transparent 100%);
}
.ethos-marquee-fade--right {
    right: 0;
    background: linear-gradient(to left, #060608 0%, transparent 100%);
}

/* Track: two strips side by side, animated */
.ethos-marquee-track {
    display: flex;
    width: max-content;
    animation: ethos-scroll 55s linear infinite;
    will-change: transform;
}
.ethos-marquee-track:hover {
    animation-play-state: paused;
}

@keyframes ethos-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
}

/* Each strip */
.ethos-marquee-strip {
    display: flex;
    align-items: stretch;
    gap: 0;
    flex-shrink: 0;
}

/* Quote cards */
.ethos-quote-card {
    flex-shrink: 0;
    width: clamp(260px, 30vw, 400px);
    padding: 32px 40px;
    transition: transform 0.4s cubic-bezier(0.25,1,0.5,1),
                opacity 0.4s ease;
    opacity: 0.65;
}
.ethos-quote-card:hover {
    transform: scale(1.055);
    opacity: 1;
}
.ethos-quote-text {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.9rem, 1.05vw, 1.05rem);
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255,255,255,0.8);
    margin: 0 0 20px 0;
    font-style: italic;
}
.ethos-quote-author {
    font-family: 'General Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 4px;
}
.ethos-quote-role {
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 400;
    color: rgba(255,255,255,0.3);
}

/* Thin divider between cards */
.ethos-quote-divider {
    flex-shrink: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent 10%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 60%, transparent 90%);
    align-self: stretch;
}

/* ── Bridge gradient into Work section ── */
.ethos-bridge-gradient {
    width: 100%;
    height: 120px;
    background: linear-gradient(to bottom, transparent, #060608);
    margin-top: -1px;
}
"""

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(css)
print("CSS appended.")
