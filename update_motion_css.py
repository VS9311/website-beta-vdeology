import codecs

css_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/css/main.css'

css_content = """
/* ═══════════════════════════════════════════════════════════
   CINEMATIC MOTION REFINEMENT
═══════════════════════════════════════════════════════════ */
:root {
    --cine-ease: cubic-bezier(0.25, 1, 0.5, 1);
}

/* Base Mask Setup */
.cine-mask-wrapper {
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    line-height: 1; /* Match the font line height to prevent clipping */
}
.cine-mask-wrapper .cine-mask-line {
    display: block;
    transform: translateY(100%);
    opacity: 0;
    transition: transform 1.2s var(--cine-ease), opacity 1.2s var(--cine-ease);
}
.cine-mask-wrapper .cine-mask-line.is-revealed {
    transform: translateY(0);
    opacity: 1;
}

/* 1. Founder Section */
.cine-founder-portrait {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1.2s var(--cine-ease), transform 1.2s var(--cine-ease);
    will-change: transform, opacity;
}
.cine-founder-portrait.is-revealed {
    opacity: 1;
    transform: translateY(0);
}
.cine-founder-name, .cine-founder-desc {
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 1s var(--cine-ease), transform 1s var(--cine-ease);
}
.cine-founder-name.is-revealed, .cine-founder-desc.is-revealed {
    opacity: 1;
    transform: translateY(0);
}

/* 2. Grid Columns */
.cine-grid-col {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.9s var(--cine-ease), transform 0.9s var(--cine-ease);
}
.cine-grid-col.is-revealed {
    opacity: 1;
    transform: translateY(0);
}

/* 3. Masters Statement */
.cine-masters-sub {
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 1s var(--cine-ease), transform 1s var(--cine-ease);
}
.cine-masters-sub.is-revealed {
    opacity: 1;
    transform: translateY(0);
}

/* 4. Final CTA */
.cine-cta-sub {
    opacity: 0;
    transition: opacity 1s var(--cine-ease);
}
.cine-cta-sub.is-revealed {
    opacity: 1;
}

/* Override existing final CTA headline to support flex/block masks */
.final-cta-headline {
    display: flex;
    flex-direction: column;
    gap: 0;
}
.final-cta-headline .cine-mask-wrapper {
    margin-bottom: -0.1em; /* Adjust tight line spacing if necessary */
    padding-bottom: 0.1em; /* Prevent descender clipping */
}
.final-cta-headline .cine-mask-line {
    transform: translateY(50px);
}

/* CTA Form & Info */
.final-cta-form, .form-success {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s var(--cine-ease), transform 1s var(--cine-ease);
}
.final-cta-form.is-revealed, .form-success.is-revealed {
    opacity: 1;
    transform: translateY(0);
}

.cine-cta-info {
    opacity: 0;
    transition: opacity 1.2s var(--cine-ease);
}
.cine-cta-info.is-revealed {
    opacity: 1;
}
"""

with codecs.open(css_path, 'a', 'utf-8') as f:
    f.write(css_content)

print('CSS appended successfully.')
