import os
from PIL import Image

images = [
    'images/founder-portrait.jpg',
    'Project card thymnails/Foolss_Journey_project card thumbnail.jpg',
    'img/sportskeeda_wrestling.jpg',
    'img/the_coach_documentary.jpg',
    'Project card thymnails/videographesprojectcardthumbnail.jpg',
    'Project card thymnails/Hip_Hop_Heavyweights_Projectcardthumbnail.jpg',
    'img/fight_pundit_league.jpg',
    'videos/Katana_embedded _pic.png',
    'img/katana_brand_06.png',
    'img/katana_brand_03.png',
    'img/katana_brand_04.png',
    'img/katana_brand_05.jpg',
    'img/katana_product_01.jpg',
    'img/katana_product_02.jpg',
    'img/alfred_konuwa_profile.jpg',
    'Project card thymnails/AlfredKonuwaxForbes_Project card thumbnail.jpg'
]

print("Image Dimensions:")
for img_path in images:
    if os.path.exists(img_path):
        with Image.open(img_path) as img:
            print(f"{img_path}: {img.size[0]}x{img.size[1]}")
    else:
        print(f"NOT FOUND: {img_path}")
