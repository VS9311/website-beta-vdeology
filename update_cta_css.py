import codecs

css_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/css/main.css'

css_content = """
/* ═══════════════════════════════════════════════════════════
   FINAL CTA SECTION
═══════════════════════════════════════════════════════════ */
.final-cta-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(80px, 12vw, 160px);
    padding: clamp(80px, 15vh, 200px) clamp(24px, 6vw, 120px);
    background-color: #050505;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

@media (min-width: 1024px) {
    .final-cta-section {
        grid-template-columns: 5fr 4fr;
    }
}

.final-cta-headline {
    font-family: 'General Sans', sans-serif;
    font-size: clamp(3.5rem, 8vw, 9rem);
    font-weight: 700;
    line-height: 0.85;
    letter-spacing: -0.04em;
    color: #FFFFFF;
    margin: 0 0 60px 0;
    text-transform: uppercase;
}

.final-cta-subtext {
    font-family: 'Inter', sans-serif;
    font-size: clamp(1.2rem, 1.5vw, 1.6rem);
    font-weight: 300;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
}

.final-cta-form {
    display: flex;
    flex-direction: column;
    gap: 48px;
    margin-bottom: 80px;
}

.final-cta-input-group label {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.4);
    display: block;
    margin-bottom: 12px;
}

.final-cta-input-group input,
.final-cta-input-group textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 8px 0 16px 0;
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    color: #FFFFFF;
    outline: none;
    transition: border-color 0.3s ease;
    resize: none;
}

.final-cta-input-group input:focus,
.final-cta-input-group textarea:focus {
    border-color: #FFFFFF;
}

.final-cta-submit {
    align-self: flex-start;
    background: transparent;
    border: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: #FFFFFF;
    text-transform: uppercase;
    cursor: pointer;
    padding: 0;
    position: relative;
    transition: color 0.3s ease;
}
.final-cta-submit::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #FFFFFF;
    transform: scaleX(1);
    transform-origin: left;
    transition: transform 0.3s ease;
}
.final-cta-submit:hover::after {
    transform: scaleX(0);
    transform-origin: right;
}

.final-cta-info {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 60px;
}

.final-cta-info-block {
    margin-bottom: 32px;
}

.final-cta-info-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.4);
    display: block;
    margin-bottom: 8px;
}

.final-cta-info-value {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 300;
    color: #FFFFFF;
    text-decoration: none;
    transition: color 0.3s ease;
}

a.final-cta-info-value:hover {
    color: rgba(255, 255, 255, 0.6);
}

.final-cta-availability {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.3);
    margin-top: 60px;
}

/* ═══════════════════════════════════════════════════════════
   MINIMAL FOOTER
═══════════════════════════════════════════════════════════ */
.minimal-footer {
    width: 100%;
    padding: clamp(32px, 5vh, 60px) clamp(24px, 6vw, 120px);
    background-color: #030303;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.minimal-footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 16px;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
}

.minimal-footer-content a {
    color: rgba(255, 255, 255, 0.3);
    text-decoration: none;
    transition: color 0.3s ease;
}

.minimal-footer-content a:hover {
    color: #FFFFFF;
}

.minimal-footer-divider {
    color: rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
    .minimal-footer-content {
        justify-content: space-between;
    }
}
"""

with codecs.open(css_path, 'a', 'utf-8') as f:
    f.write(css_content)

print('CSS appended successfully.')
