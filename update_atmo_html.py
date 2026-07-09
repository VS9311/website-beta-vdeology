import codecs

html_path = 'e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/code.html'
with codecs.open(html_path, 'r', 'utf-8') as f:
    content = f.read()

# ── CARD 1: DISCOVER ──
content = content.replace(
    '''                    <div class="influence-card-img-wrapper">\r\n                        <img src="file:///C:/Users/Windows%2010/.gemini/antigravity-ide/brain/16b62456-e972-4e6e-b017-e907937ca5da/discover_strategy_session_1780993821183.png" alt="Strategy Session" class="influence-card-img" />\r\n                    </div>\r\n                    <div class="influence-card-content">\r\n                        <span class="influence-chapter">CHAPTER I</span>''',
    '''                    <div class="atmo-panel atmo-discover">
                        <div class="atmo-grain"></div>
                        <div class="atmo-gradient"></div>
                        <div class="atmo-particles" id="atmo-particles-1"></div>
                    </div>
                    <div class="influence-card-content">
                        <span class="influence-chapter">CHAPTER I</span>'''
)

# ── CARD 2: SHAPE ──
content = content.replace(
    '''                    <div class="influence-card-img-wrapper">\r\n                        <img src="file:///C:/Users/Windows%2010/.gemini/antigravity-ide/brain/16b62456-e972-4e6e-b017-e907937ca5da/shape_editing_suite_1780993835213.png" alt="Editing Suite" class="influence-card-img" />\r\n                    </div>''',
    '''                    <div class="atmo-panel atmo-shape">
                        <div class="atmo-grain"></div>
                        <div class="atmo-gradient"></div>
                        <div class="atmo-particles" id="atmo-particles-2"></div>
                    </div>'''
)

# ── CARD 3: CREATE ──
content = content.replace(
    '''                    <div class="influence-card-img-wrapper">\r\n                        <img src="file:///C:/Users/Windows%2010/.gemini/antigravity-ide/brain/16b62456-e972-4e6e-b017-e907937ca5da/create_podcast_set_1780993848512.png" alt="Podcast Set" class="influence-card-img" />\r\n                    </div>\r\n                    <div class="influence-card-content">\r\n                        <span class="influence-chapter">CHAPTER III</span>''',
    '''                    <div class="atmo-panel atmo-create">
                        <div class="atmo-grain"></div>
                        <div class="atmo-gradient"></div>
                        <div class="atmo-particles" id="atmo-particles-3"></div>
                    </div>
                    <div class="influence-card-content">
                        <span class="influence-chapter">CHAPTER III</span>'''
)

# ── CARD 4: MULTIPLY ──
content = content.replace(
    '''                    <div class="influence-card-img-wrapper">\r\n                        <img src="file:///C:/Users/Windows%2010/.gemini/antigravity-ide/brain/16b62456-e972-4e6e-b017-e907937ca5da/multiply_media_hub_1780993860641.png" alt="Media Hub" class="influence-card-img" />\r\n                    </div>''',
    '''                    <div class="atmo-panel atmo-multiply">
                        <div class="atmo-grain"></div>
                        <div class="atmo-gradient"></div>
                        <div class="atmo-particles" id="atmo-particles-4"></div>
                    </div>'''
)

with codecs.open(html_path, 'w', 'utf-8') as f:
    f.write(content)
print("HTML updated — images replaced with atmospheric panels.")
