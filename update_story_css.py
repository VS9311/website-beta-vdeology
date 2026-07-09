import codecs

css_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/css/main.css'

css_content = """
/* ═══════════════════════════════════════════════════════════
   THE STORY BEHIND VDEOLOGY
═══════════════════════════════════════════════════════════ */
.story-section {
    padding: clamp(80px, 15vh, 200px) clamp(24px, 6vw, 120px);
    background-color: #050505;
    position: relative;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* ── Hero / Intro ── */
.story-hero {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(60px, 10vw, 120px);
    margin-bottom: clamp(100px, 15vh, 200px);
    align-items: center;
}

@media (min-width: 1024px) {
    .story-hero {
        grid-template-columns: 5fr 6fr;
    }
}

.story-portrait-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: 4px;
}

.story-portrait {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1) brightness(0.9);
    transform: scale(1.05);
    transition: transform 1.5s cubic-bezier(0.2, 0.9, 0.3, 1), filter 1.5s ease;
}

.story-portrait-wrapper.is-revealed .story-portrait {
    transform: scale(1);
}

.story-portrait-wrapper:hover .story-portrait {
    filter: grayscale(0%) contrast(1.05) brightness(0.95);
    transform: scale(1.02);
}

.story-founder-name {
    font-family: 'General Sans', sans-serif;
    font-size: clamp(3.5rem, 8vw, 8rem);
    font-weight: 700;
    line-height: 0.9;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    margin: 0 0 24px 0;
}

.story-roles {
    font-family: 'Inter', sans-serif;
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    font-weight: 300;
    letter-spacing: 0.1em;
    color: #A0A0A0;
    margin-bottom: clamp(40px, 8vh, 80px);
    text-transform: uppercase;
}

.story-mission {
    font-family: 'Inter', sans-serif;
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    font-weight: 300;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    max-width: 600px;
}

.story-mission p {
    margin-bottom: 24px;
}

.story-mission-highlight {
    color: #FFFFFF;
    font-weight: 400;
    font-family: 'General Sans', sans-serif;
}

/* ── Editorial Grid ── */
.story-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 60px;
    margin-bottom: clamp(100px, 15vh, 200px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: clamp(60px, 10vh, 120px);
}

@media (min-width: 768px) {
    .story-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
    }
}

.story-col-title {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 40px;
    text-transform: uppercase;
}

.story-col-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
}

.story-list-item-strong {
    color: #FFFFFF;
    font-weight: 500;
    margin-top: 16px;
}
.story-list-item-strong:first-child {
    margin-top: 0;
}

.story-spacer {
    height: 32px;
}

.story-col-list--builds li {
    font-family: 'General Sans', sans-serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: #FFFFFF;
    margin-bottom: 16px;
    line-height: 1.2;
}

/* ── Journey Timeline ── */
.story-journey {
    display: flex;
    justify-content: center;
    margin-bottom: clamp(100px, 15vh, 200px);
}

.story-timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.story-timeline-item {
    padding: 24px 0;
}

.story-timeline-year {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 12px;
}

.story-timeline-event {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.8);
}

.story-timeline-event--final {
    font-family: 'General Sans', sans-serif;
    font-size: 2rem;
    font-weight: 500;
    color: #FFFFFF;
}

.story-timeline-arrow {
    font-family: 'Inter', sans-serif;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.2);
    margin: 8px 0;
}

/* ── Founder Statement ── */
.story-statement {
    text-align: center;
    max-width: 1000px;
    margin: 0 auto;
    padding: clamp(60px, 10vh, 120px) 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.story-statement h2 {
    font-family: 'General Sans', sans-serif;
    font-size: clamp(2.5rem, 5vw, 5rem);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
}

.story-statement-highlight {
    color: #FFFFFF !important;
}
"""

with codecs.open(css_path, 'a', 'utf-8') as f:
    f.write(css_content)

print('CSS appended successfully.')
