import codecs

html_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/code.html'
with codecs.open(html_path, 'r', 'utf-8') as f:
    lines = f.readlines()

# Find start and end by comment markers
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if 'id="ethos"' in line and start_idx == -1:
        start_idx = i
    if start_idx != -1 and '</section>' in line and i > start_idx:
        end_idx = i
        break

print(f"Ethos section: lines {start_idx+1} to {end_idx+1}")

if start_idx == -1 or end_idx == -1:
    print("Could not find block.")
    exit(1)

NEW_SECTION = '''        <!-- ═══════════════════════════════════════════════════════════
             HERO → WORK CINEMATIC INTERLUDE
        ═══════════════════════════════════════════════════════════ -->
        <section class="ethos-interlude" id="ethos">

            <!-- Inner Container -->
            <div class="ethos-inner">

                <!-- LEFT: Staggered headline reveal -->
                <div class="ethos-headline-col" id="ethos-headline-col">
                    <h2 class="ethos-headline">
                        <div class="ethos-mask-wrap"><span class="ethos-mask-line ethos-line-1">EVERY FRAME</span></div>
                        <div class="ethos-mask-wrap"><span class="ethos-mask-line ethos-line-2">SHOULD MOVE</span></div>
                        <div class="ethos-mask-wrap"><span class="ethos-mask-line ethos-line-3">SOMETHING.</span></div>
                    </h2>
                </div>

                <!-- RIGHT: Studio Ethos text blocks -->
                <div class="ethos-text-col">
                    <div class="ethos-label ethos-stagger-1">STUDIO ETHOS</div>
                    <p class="ethos-body ethos-stagger-2">
                        Vdeology is a founder-led creative studio focused on cinematic storytelling, editorial visuals, and narrative-driven post-production across documentaries, creator brands, sports media, and digital platforms.
                    </p>
                </div>

            </div>

            <!-- ── CONTINUOUS TESTIMONIAL MARQUEE ── -->
            <div class="ethos-marquee-section">
                <!-- Fade edges -->
                <div class="ethos-marquee-fade ethos-marquee-fade--left"></div>
                <div class="ethos-marquee-fade ethos-marquee-fade--right"></div>

                <div class="ethos-marquee-track" id="ethos-marquee-track">
                    <!-- Strip A -->
                    <div class="ethos-marquee-strip">
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"The level of care behind every frame was obvious from day one."</p>
                            <div class="ethos-quote-author">Marcus Klein</div>
                            <div class="ethos-quote-role">Elite Boxing Federation</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"It felt less like hiring an editor and more like building something together."</p>
                            <div class="ethos-quote-author">Jordan Reyes</div>
                            <div class="ethos-quote-role">Project X100</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"The storytelling completely changed how our audience engaged with the content."</p>
                            <div class="ethos-quote-author">The Tech Archive</div>
                            <div class="ethos-quote-role">YouTube · 1.2M Subscribers</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"Vdeology didn't just edit our footage — they found the story inside it."</p>
                            <div class="ethos-quote-author">Riya Menon</div>
                            <div class="ethos-quote-role">Founder, Kova Athletics</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"Every deliverable exceeded what we imagined. The attention to pacing is unreal."</p>
                            <div class="ethos-quote-author">Daniel Owens</div>
                            <div class="ethos-quote-role">Head of Content, Arclight Media</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"Our channel's watch time grew 3x in the first quarter. The work speaks for itself."</p>
                            <div class="ethos-quote-author">Sarah Lin</div>
                            <div class="ethos-quote-role">Creator · 420K Subscribers</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"The emotional weight they brought to our documentary changed the room every screening."</p>
                            <div class="ethos-quote-author">James Okafor</div>
                            <div class="ethos-quote-role">Director, The Pursuit Series</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                    </div>
                    <!-- Strip B: seamless clone for infinite loop -->
                    <div class="ethos-marquee-strip" aria-hidden="true">
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"The level of care behind every frame was obvious from day one."</p>
                            <div class="ethos-quote-author">Marcus Klein</div>
                            <div class="ethos-quote-role">Elite Boxing Federation</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"It felt less like hiring an editor and more like building something together."</p>
                            <div class="ethos-quote-author">Jordan Reyes</div>
                            <div class="ethos-quote-role">Project X100</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"The storytelling completely changed how our audience engaged with the content."</p>
                            <div class="ethos-quote-author">The Tech Archive</div>
                            <div class="ethos-quote-role">YouTube · 1.2M Subscribers</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"Vdeology didn't just edit our footage — they found the story inside it."</p>
                            <div class="ethos-quote-author">Riya Menon</div>
                            <div class="ethos-quote-role">Founder, Kova Athletics</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"Every deliverable exceeded what we imagined. The attention to pacing is unreal."</p>
                            <div class="ethos-quote-author">Daniel Owens</div>
                            <div class="ethos-quote-role">Head of Content, Arclight Media</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"Our channel's watch time grew 3x in the first quarter. The work speaks for itself."</p>
                            <div class="ethos-quote-author">Sarah Lin</div>
                            <div class="ethos-quote-role">Creator · 420K Subscribers</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                        <div class="ethos-quote-card">
                            <p class="ethos-quote-text">"The emotional weight they brought to our documentary changed the room every screening."</p>
                            <div class="ethos-quote-author">James Okafor</div>
                            <div class="ethos-quote-role">Director, The Pursuit Series</div>
                        </div>
                        <div class="ethos-quote-divider"></div>
                    </div>
                </div>
            </div>

            <!-- Soft gradient bridge into Work section -->
            <div class="ethos-bridge-gradient"></div>

        </section>\n'''

new_lines = lines[:start_idx] + [NEW_SECTION] + lines[end_idx+1:]
with codecs.open(html_path, 'w', 'utf-8') as f:
    f.writelines(new_lines)
print("HTML replaced successfully.")
