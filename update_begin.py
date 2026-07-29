import os

with open('css/critical.css', 'r', encoding='utf-8') as f:
    critical_css = f.read()

with open('begin.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Fonts optimization
# Inter/Plex Mono
target_gfonts = """    <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&amp;family=Inter:wght@400;500&amp;display=swap"
        rel="stylesheet" />"""
replace_gfonts = """    <link rel="preload" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&amp;family=Inter:wght@400;500&amp;display=swap" as="style" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&amp;family=Inter:wght@400;500&amp;display=swap" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&amp;family=Inter:wght@400;500&amp;display=swap" /></noscript>"""
html = html.replace(target_gfonts, replace_gfonts)

# General Sans
target_fs = """    <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet" />"""
replace_fs = """    <link rel="preload" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" as="style" />
    <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" /></noscript>"""
html = html.replace(target_fs, replace_fs)

# Material Symbols
target_ms = """    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet" />"""
replace_ms = """    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" as="style" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" /></noscript>"""
html = html.replace(target_ms, replace_ms)

# 2. Inject Critical CSS and defer main.css
target_css = """    <link rel="stylesheet" href="css/main.css" />"""
replace_css = f"""    <style id="critical-css">
{critical_css}
    </style>
    <link rel="preload" href="css/main.css" as="style" />
    <link rel="stylesheet" href="css/main.css" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="css/main.css" /></noscript>"""
html = html.replace(target_css, replace_css)

with open('begin.html', 'w', encoding='utf-8') as f:
    f.write(html)
