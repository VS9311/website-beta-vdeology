import codecs

html_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/code.html'
with codecs.open(html_path, 'r', 'utf-8') as f:
    html = f.read()

# 1. Founder Entry Classes
html = html.replace('class="story-portrait-wrapper reveal-on-scroll"', 'class="story-portrait-wrapper cine-founder-portrait"')
html = html.replace('class="story-founder-name reveal-on-scroll"', 'class="story-founder-name cine-founder-name"')
html = html.replace('class="story-roles reveal-on-scroll"', 'class="story-roles cine-founder-desc"')
html = html.replace('class="story-mission reveal-on-scroll"', 'class="story-mission cine-founder-desc"')

# 2. Grid Classes
html = html.replace('class="story-column-premium reveal-on-scroll"', 'class="story-column-premium cine-grid-col"')
html = html.replace('class="story-column-premium reveal-on-scroll" style="transition-delay: 0.1s;"', 'class="story-column-premium cine-grid-col"')
html = html.replace('class="story-column-premium reveal-on-scroll" style="transition-delay: 0.2s;"', 'class="story-column-premium cine-grid-col"')

# 3. Every Field Has Its Masters
old_statement = """            <div class="story-statement reveal-on-scroll">
                <h2>Every field has its masters.</h2>
                <h2 class="story-statement-highlight">The challenge is making the world pay attention.</h2>
            </div>"""
new_statement = """            <div class="story-statement cine-masters-trigger">
                <div class="cine-mask-wrapper"><h2 class="cine-mask-line cine-masters-l1" style="margin:0;">Every field has</h2></div>
                <div class="cine-mask-wrapper"><h2 class="cine-mask-line cine-masters-l2" style="margin:0;">its masters.</h2></div>
                <h2 class="story-statement-highlight cine-masters-sub">The challenge is making the world pay attention.</h2>
            </div>"""
html = html.replace(old_statement, new_statement)

# 4. Final CTA Section
old_cta_left = """            <div class="final-cta-left reveal-on-scroll">
                <h2 class="final-cta-headline">
                    LET'S BUILD<br>SOMETHING<br>WORTH<br>REMEMBERING.
                </h2>
                <p class="final-cta-subtext">If you're building something meaningful,<br>I'd love to hear about it.</p>
            </div>"""
new_cta_left = """            <div class="final-cta-left cine-cta-trigger">
                <h2 class="final-cta-headline">
                    <div class="cine-mask-wrapper"><span class="cine-mask-line cine-cta-l1">LET'S BUILD</span></div>
                    <div class="cine-mask-wrapper"><span class="cine-mask-line cine-cta-l2">SOMETHING</span></div>
                    <div class="cine-mask-wrapper"><span class="cine-mask-line cine-cta-l3">WORTH</span></div>
                    <div class="cine-mask-wrapper"><span class="cine-mask-line cine-cta-l4">REMEMBERING.</span></div>
                </h2>
                <p class="final-cta-subtext cine-cta-sub">If you're building something meaningful,<br>I'd love to hear about it.</p>
            </div>"""
html = html.replace(old_cta_left, new_cta_left)

# CTA Right
html = html.replace('class="final-cta-right reveal-on-scroll" style="transition-delay: 0.1s;"', 'class="final-cta-right cine-cta-form-trigger"')
html = html.replace('class="final-cta-info"', 'class="final-cta-info cine-cta-info"')

with codecs.open(html_path, 'w', 'utf-8') as f:
    f.write(html)
print("HTML updated successfully.")
