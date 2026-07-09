import codecs

html_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/code.html'
with codecs.open(html_path, 'r', 'utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '<!-- Editorial Grid -->' in line:
        start_idx = i
    if '<!-- Founder Statement -->' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_section = """            <!-- Premium Editorial Grid -->
            <div class="story-grid-premium">
                
                <!-- Column 1: EXPERIENCE -->
                <div class="story-column-premium reveal-on-scroll">
                    <h3 class="story-col-title-premium">EXPERIENCE</h3>
                    
                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <span class="story-item-meta">2019 — 2024</span>
                            <span class="story-item-index">01</span>
                        </div>
                        <h4 class="story-item-title">SPORTSKEEDA WRESTLING</h4>
                        <p class="story-item-desc">Scaled the digital presence from 30K to 180K subscribers, generating 50M+ views and over 2M watch hours through strategic content and high-retention video architecture.</p>
                    </div>

                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <span class="story-item-meta">2020 — PRESENT</span>
                            <span class="story-item-index">02</span>
                        </div>
                        <h4 class="story-item-title">DOCUMENTARY FILMMAKING</h4>
                        <p class="story-item-desc">Directed and produced long-form narrative content, blending cinematic visuals with journalistic rigor to tell culturally significant stories.</p>
                    </div>

                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <span class="story-item-meta">2021 — PRESENT</span>
                            <span class="story-item-index">03</span>
                        </div>
                        <h4 class="story-item-title">INTERNATIONAL CLIENT WORK</h4>
                        <p class="story-item-desc">Partnered with global brands and elite creators to design authority-building content pipelines and premium visual systems.</p>
                    </div>
                </div>

                <!-- Column 2: EXPERTISE -->
                <div class="story-column-premium reveal-on-scroll" style="transition-delay: 0.1s;">
                    <h3 class="story-col-title-premium">EXPERTISE</h3>
                    
                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <h4 class="story-item-title">STORYTELLING & PSYCHOLOGY</h4>
                            <span class="story-item-index">01</span>
                        </div>
                        <p class="story-item-desc">Deep understanding of audience retention, narrative tension, and the psychological triggers that transform passive viewers into loyal advocates.</p>
                    </div>

                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <h4 class="story-item-title">AUTHORITY BUILDING</h4>
                            <span class="story-item-index">02</span>
                        </div>
                        <p class="story-item-desc">Positioning brands and creators as undeniable industry leaders through high-signal content and premium positioning.</p>
                    </div>

                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <h4 class="story-item-title">CONTENT SYSTEMS</h4>
                            <span class="story-item-index">03</span>
                        </div>
                        <p class="story-item-desc">Designing scalable, data-driven production pipelines that maintain cinematic quality without sacrificing volume.</p>
                    </div>

                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <h4 class="story-item-title">POST-PRODUCTION</h4>
                            <span class="story-item-index">04</span>
                        </div>
                        <p class="story-item-desc">Advanced color grading, motion graphics, and audio design to craft an immersive, theatrical viewer experience.</p>
                    </div>
                </div>

                <!-- Column 3: SELECTED BUILDS -->
                <div class="story-column-premium reveal-on-scroll" style="transition-delay: 0.2s;">
                    <h3 class="story-col-title-premium">SELECTED BUILDS</h3>
                    
                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <h4 class="story-item-title">THE COACH</h4>
                            <span class="story-item-index">01</span>
                        </div>
                        <p class="story-item-desc">A premium educational media platform blending cinematic documentary style with tactical performance training.</p>
                    </div>

                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <h4 class="story-item-title">FIGHTPUNDIT</h4>
                            <span class="story-item-index">02</span>
                        </div>
                        <p class="story-item-desc">A deep-dive analytical channel deconstructing combat sports through high-end narrative essays and tactical breakdowns.</p>
                    </div>

                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <h4 class="story-item-title">KATANA</h4>
                            <span class="story-item-index">03</span>
                        </div>
                        <p class="story-item-desc">A proprietary workflow system developed to accelerate high-fidelity post-production for digital-first creators.</p>
                    </div>
                    
                    <div class="story-item-premium">
                        <div class="story-item-header">
                            <h4 class="story-item-title">VDEOLOGY STUDIOS</h4>
                            <span class="story-item-index">04</span>
                        </div>
                        <p class="story-item-desc">The ultimate realization of a singular vision: a hybrid studio bridging the gap between cinema and the digital landscape.</p>
                    </div>
                </div>

            </div>

"""
    new_content = lines[:start_idx] + [new_section] + lines[end_idx:]
    with codecs.open(html_path, 'w', 'utf-8') as f:
        f.writelines(new_content)
    print('HTML successfully updated.')
else:
    print(f'Could not find indices: start={start_idx}, end={end_idx}')
