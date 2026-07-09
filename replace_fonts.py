import re

with open('e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/code.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace tailwind config font families
content = re.sub(r'\"headline\": \[\"Anton\"\],', '\"headline\": [\"General Sans\", \"sans-serif\"],', content)
content = re.sub(r'\"body\": \[\"DM Sans\"\],', '\"body\": [\"Inter\", \"sans-serif\"],', content)
content = re.sub(r'\"label\": \[\"DM Sans\"\],', '\"label\": [\"General Sans\", \"sans-serif\"],', content)
content = re.sub(r'\"serif\": \[\"Playfair Display\"\],', '\"serif\": [\"General Sans\", \"sans-serif\"],', content)

# 1. Strip 'italic' class globally
content = re.sub(r'\bitalic\b\s*', '', content)

# 2. Add font-bold to font-headline (since Anton was naturally bold)
content = re.sub(r'\bfont-headline\b(?!\s+font-(?:bold|semibold|medium|black))', 'font-headline font-bold', content)

# 3. Add font-semibold to font-label
content = re.sub(r'\bfont-label\b(?!\s+font-(?:bold|semibold|medium|black))', 'font-label font-semibold', content)

# 4. Replace inline font bracket classes
content = re.sub(r'font-\[\'Anton\'\]', 'font-general font-bold', content)
content = re.sub(r'font-\[\'DM_Sans\'\]', 'font-inter', content)
content = re.sub(r'font-\[\'Playfair_Display\'\]', 'font-general font-semibold', content)

with open('e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/code.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Now apply similar logic to main.css
with open('e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/css/main.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

css_content = re.sub(r"font-family:\s*'Anton',\s*sans-serif;", "font-family: 'General Sans', sans-serif; font-weight: 700;", css_content)
css_content = re.sub(r"font-family:\s*'DM Sans',\s*sans-serif;", "font-family: 'Inter', sans-serif;", css_content)
css_content = re.sub(r"font-family:\s*'Playfair Display',\s*serif;", "font-family: 'General Sans', sans-serif; font-weight: 600;", css_content)

# Strip any italic from css
css_content = re.sub(r'font-style:\s*italic;', 'font-style: normal;', css_content)

with open('e:/stitch_vdeology_studios_home/Vdeology_Studios_Transfer/css/main.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print('Success')
