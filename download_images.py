import os
import urllib.request
import re

# The content of gachaData.ts
gacha_data_path = "src/components/gachaData.ts"
public_gacha_dir = "public/gacha"

if not os.path.exists(public_gacha_dir):
    os.makedirs(public_gacha_dir)

with open(gacha_data_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract all images.weserv.nl/?url=cdn.myanimelist.net/images/characters/ID/ID.jpg
# Or cdn.myanimelist.net/images/...
urls = re.findall(r'imageUrl:\s*"([^"]+)"', content)

opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36')]
urllib.request.install_opener(opener)

for url in urls:
    # Clean the URL to get the original MAL URL
    if "weserv.nl" in url:
        real_url = "https://" + url.split("url=")[1]
    else:
        real_url = url
    
    filename = real_url.split("/")[-1]
    local_path = os.path.join(public_gacha_dir, filename)
    
    try:
        if not os.path.exists(local_path):
            print(f"Downloading {real_url} -> {local_path}")
            urllib.request.urlretrieve(real_url, local_path)
    except Exception as e:
        print(f"Failed to download {real_url}: {e}")

# Now replace the URLs in gachaData.ts to point to local files
new_content = content
for url in urls:
    if "weserv.nl" in url:
        real_url = "https://" + url.split("url=")[1]
    else:
        real_url = url
    filename = real_url.split("/")[-1]
    local_url = f"/gacha/{filename}"
    new_content = new_content.replace(f'"{url}"', f'"{local_url}"')

with open(gacha_data_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("All done!")
