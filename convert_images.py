import os
import re
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

total_orig = 0
total_webp = 0

for img_path in images:
    if os.path.exists(img_path):
        orig_size = os.path.getsize(img_path)
        total_orig += orig_size
        
        # Output path
        dir_name = os.path.dirname(img_path)
        base_name = os.path.basename(img_path)
        name, ext = os.path.splitext(base_name)
        webp_path = os.path.join(dir_name, name + '.webp')
        
        with Image.open(img_path) as img:
            # Convert RGBA to RGB for JPEG-style webp save if needed
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                img.save(webp_path, "WEBP", quality=80)
            else:
                img.save(webp_path, "WEBP", quality=80)
                
        new_size = os.path.getsize(webp_path)
        total_webp += new_size
        
        print(f"Converted {base_name}: {orig_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({(orig_size-new_size)/orig_size*100:.1f}%)")
    else:
        print(f"NOT FOUND: {img_path}")

print("\n--- RESULTS ---")
print(f"Original total size: {total_orig/1024/1024:.2f} MB")
print(f"WebP total size: {total_webp/1024/1024:.2f} MB")
print(f"Estimated savings: {(total_orig-total_webp)/total_orig*100:.1f}%")
