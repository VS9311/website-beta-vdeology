import codecs

html_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/code.html'
with codecs.open(html_path, 'r', 'utf-8') as f:
    lines = f.readlines()

cta_start = -1
cta_end = -1
footer_start = -1
footer_end = -1

for i, line in enumerate(lines):
    if '<!-- Interstitial Break 02 -->' in line and cta_start == -1:
        cta_start = i
    if '</main>' in line and cta_start != -1 and cta_end == -1:
        cta_end = i
    if '<!-- Shared Footer -->' in line and footer_start == -1:
        footer_start = i
    if '</footer>' in line and footer_start != -1 and footer_end == -1:
        footer_end = i

print(f"CTA: {cta_start} to {cta_end}")
print(f"Footer: {footer_start} to {footer_end}")

if -1 in [cta_start, cta_end, footer_start, footer_end]:
    print("Could not find blocks. Aborting.")
    exit(1)

cta_html = """        <!-- ═══════════════════════════════════════════════════════════
             FINAL CTA SECTION
        ═══════════════════════════════════════════════════════════ -->
        <section class="final-cta-section" id="contact">
            <div class="final-cta-left reveal-on-scroll">
                <h2 class="final-cta-headline">
                    LET'S BUILD<br>SOMETHING<br>WORTH<br>REMEMBERING.
                </h2>
                <p class="final-cta-subtext">If you're building something meaningful,<br>I'd love to hear about it.</p>
            </div>
            
            <div class="final-cta-right reveal-on-scroll" style="transition-delay: 0.1s;">
                <form class="final-cta-form" id="contact-form" onsubmit="handleFormSubmit(event)">
                    <div class="final-cta-input-group">
                        <label>YOUR NAME</label>
                        <input type="text" required />
                    </div>
                    <div class="final-cta-input-group">
                        <label>YOUR EMAIL</label>
                        <input type="email" required />
                    </div>
                    <div class="final-cta-input-group">
                        <label>TELL ME ABOUT YOUR PROJECT</label>
                        <textarea rows="5" required></textarea>
                    </div>
                    <button type="submit" class="final-cta-submit">SUBMIT</button>
                </form>

                <div class="form-success flex-col items-center justify-center text-center py-16 gap-6" id="form-success" style="display: none;">
                    <div class="checkmark">
                        <span class="material-symbols-outlined text-white text-4xl">check</span>
                    </div>
                    <h3 class="font-headline font-bold text-3xl uppercase text-white mt-4">Message Sent</h3>
                </div>

                <div class="final-cta-info">
                    <div class="final-cta-info-block">
                        <span class="final-cta-info-label">CONTACT</span>
                        <a href="mailto:vsdev.design@gmail.com" class="final-cta-info-value">vsdev.design@gmail.com</a>
                    </div>
                    <div class="final-cta-info-block">
                        <span class="final-cta-info-label">LOCATION</span>
                        <span class="final-cta-info-value">London, UK</span>
                    </div>
                    <div class="final-cta-info-block">
                        <span class="final-cta-info-label">LINKS</span>
                        <a href="https://www.linkedin.com/in/vishnu-sreedev/" target="_blank" class="final-cta-info-value">LinkedIn</a>
                    </div>
                    <p class="final-cta-availability">Vdeology works with a limited number of projects each quarter.</p>
                </div>
            </div>
        </section>
"""

footer_html = """    <!-- ═══════════════════════════════════════════════════════════
         MINIMAL FOOTER
    ═══════════════════════════════════════════════════════════ -->
    <footer class="minimal-footer">
        <div class="minimal-footer-content reveal-on-scroll">
            <span>VDEOLOGY</span>
            <span class="minimal-footer-divider">/</span>
            <span>London, UK</span>
            <span class="minimal-footer-divider">/</span>
            <a href="mailto:vsdev.design@gmail.com">vsdev.design@gmail.com</a>
            <span class="minimal-footer-divider">/</span>
            <a href="https://www.linkedin.com/in/vishnu-sreedev/" target="_blank">LinkedIn</a>
            <span class="minimal-footer-divider">/</span>
            <span>© 2026</span>
        </div>
    </footer>
"""

new_content = lines[:cta_start] + [cta_html] + lines[cta_end:footer_start] + [footer_html] + lines[footer_end+1:]

with codecs.open(html_path, 'w', 'utf-8') as f:
    f.writelines(new_content)
    
print("HTML updated successfully.")
