import codecs

css_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/css/main.css'

css_content = """
/* ── Premium Editorial Grid ── */
.story-grid-premium {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    margin-bottom: clamp(100px, 15vh, 200px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 1024px) {
    .story-grid-premium {
        grid-template-columns: repeat(3, 1fr);
    }
}

.story-column-premium {
    padding: clamp(40px, 6vh, 80px) 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 1024px) {
    .story-column-premium {
        border-bottom: none;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        padding: clamp(60px, 8vh, 120px) clamp(32px, 4vw, 60px);
    }
    .story-column-premium:first-child {
        padding-left: 0;
    }
    .story-column-premium:last-child {
        border-right: none;
        padding-right: 0;
    }
}

.story-col-title-premium {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 40px;
    text-transform: uppercase;
}

.story-item-premium {
    padding-top: 32px;
    padding-bottom: 32px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.story-item-premium:first-of-type {
    border-top: none;
    padding-top: 0;
}

.story-item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 12px;
}

.story-item-meta {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
}

.story-item-index {
    font-family: 'General Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.3);
}

.story-item-title {
    font-family: 'General Sans', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    margin: 0 0 16px 0;
    text-transform: uppercase;
}

.story-item-desc {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
}
"""

with codecs.open(css_path, 'a', 'utf-8') as f:
    f.write(css_content)

print('CSS appended successfully.')
