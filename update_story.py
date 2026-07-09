import codecs

html_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/code.html'
with codecs.open(html_path, 'r', 'utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '<!-- About Section -->' in line:
        start_idx = i
    if '<!-- Interstitial Break 02 -->' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_section = """        <!-- ═══════════════════════════════════════════════════════════
             THE STORY BEHIND VDEOLOGY
        ═══════════════════════════════════════════════════════════ -->
        <section class="story-section" id="story">
            
            <!-- Hero / Intro -->
            <div class="story-hero">
                <div class="story-portrait-wrapper reveal-on-scroll">
                    <img class="story-portrait" src="images/founder-portrait.jpg" alt="Vishnu Sreedhar - Founder" />
                </div>
                <div class="story-intro">
                    <h2 class="story-founder-name reveal-on-scroll">VISHNU SREEDHAR</h2>
                    <div class="story-roles reveal-on-scroll">Filmmaker. Strategist. Builder of Authority.</div>
                    
                    <div class="story-mission reveal-on-scroll">
                        <p>For the last six years, I've been obsessed with one question:</p>
                        <p class="story-mission-highlight">Why do some ideas capture attention while others disappear?</p>
                        <p>Vdeology was built in pursuit of that answer.</p>
                    </div>
                </div>
            </div>

            <!-- Editorial Grid -->
            <div class="story-grid">
                
                <div class="story-column reveal-on-scroll">
                    <h3 class="story-col-title">EXPERIENCE</h3>
                    <ul class="story-col-list">
                        <li class="story-list-item-strong">Sportskeeda Wrestling</li>
                        <li>30K → 180K Subscribers</li>
                        <li>50M+ Views</li>
                        <li>2M+ Watch Hours</li>
                        <li class="story-spacer"></li>
                        <li class="story-list-item-strong">Documentary Filmmaking</li>
                        <li class="story-list-item-strong">International Client Work</li>
                    </ul>
                </div>

                <div class="story-column reveal-on-scroll">
                    <h3 class="story-col-title">EXPERTISE</h3>
                    <ul class="story-col-list">
                        <li>Storytelling</li>
                        <li>Authority Building</li>
                        <li>Educational Media</li>
                        <li>Content Systems</li>
                        <li>Creative Direction</li>
                        <li>Project Management</li>
                        <li>Post-Production</li>
                        <li>Documentary Production</li>
                        <li>Audience Psychology</li>
                        <li>Brand Strategy</li>
                    </ul>
                </div>

                <div class="story-column reveal-on-scroll">
                    <h3 class="story-col-title">SELECTED BUILDS</h3>
                    <ul class="story-col-list story-col-list--builds">
                        <li>The Coach</li>
                        <li>FightPundit</li>
                        <li>Katana</li>
                        <li>Sportskeeda Wrestling</li>
                        <li>Vdeology Studios</li>
                    </ul>
                </div>

            </div>

            <!-- Journey Timeline -->
            <div class="story-journey reveal-on-scroll">
                <div class="story-timeline">
                    <div class="story-timeline-item">
                        <div class="story-timeline-year">2019</div>
                        <div class="story-timeline-event">Started editing professionally</div>
                    </div>
                    <div class="story-timeline-arrow">↓</div>
                    <div class="story-timeline-item">
                        <div class="story-timeline-event">Sportskeeda Wrestling</div>
                    </div>
                    <div class="story-timeline-arrow">↓</div>
                    <div class="story-timeline-item">
                        <div class="story-timeline-event">50M+ Views</div>
                    </div>
                    <div class="story-timeline-arrow">↓</div>
                    <div class="story-timeline-item">
                        <div class="story-timeline-event">Documentary Production</div>
                    </div>
                    <div class="story-timeline-arrow">↓</div>
                    <div class="story-timeline-item">
                        <div class="story-timeline-event">International Clients</div>
                    </div>
                    <div class="story-timeline-arrow">↓</div>
                    <div class="story-timeline-item">
                        <div class="story-timeline-event story-timeline-event--final">Vdeology Studios</div>
                    </div>
                </div>
            </div>

            <!-- Founder Statement -->
            <div class="story-statement reveal-on-scroll">
                <h2>Every field has its masters.</h2>
                <h2 class="story-statement-highlight">The challenge is making the world pay attention.</h2>
            </div>

        </section>

"""
    new_content = lines[:start_idx] + [new_section] + lines[end_idx:]
    with codecs.open(html_path, 'w', 'utf-8') as f:
        f.writelines(new_content)
    print('HTML successfully updated.')
else:
    print(f'Could not find indices: start={start_idx}, end={end_idx}')
