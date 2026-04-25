import os
import re
import time
import json
import urllib.request
import urllib.error

gacha_data_path = "src/components/gachaData.ts"
public_gacha_dir = "public/gacha"

if not os.path.exists(public_gacha_dir):
    os.makedirs(public_gacha_dir)

with open(gacha_data_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract IDs and names
characters = re.findall(r'id:\s*"([^"]+)",\s*name:\s*"([^"]+)",', content)

opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
urllib.request.install_opener(opener)

def get_anilist_image(name):
    query = '''
    query ($search: String) {
      Character(search: $search) {
        image {
          large
        }
      }
    }
    '''
    url = 'https://graphql.anilist.co'
    data = json.dumps({'query': query, 'variables': {'search': name}}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    
    try:
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode('utf-8'))
        return result['data']['Character']['image']['large']
    except Exception as e:
        print(f"Failed to find {name} on AniList: {e}")
        return None

new_content = content

for char_id, char_name in characters:
    local_filename = f"{char_id}.jpg"
    local_path = os.path.join(public_gacha_dir, local_filename)
    
    if not os.path.exists(local_path) or os.path.getsize(local_path) < 1000:
        print(f"Fetching {char_name}...")
        img_url = get_anilist_image(char_name)
        if img_url:
            try:
                urllib.request.urlretrieve(img_url, local_path)
                print(f"Downloaded {char_name} -> {local_path}")
            except Exception as e:
                print(f"Failed to download {img_url}: {e}")
        time.sleep(0.7) # Respect rate limits
    
    # Update gachaData.ts to ensure it points to the correct local file
    # We already changed it to /gacha/ID.jpg in the previous script, but we were using MAL IDs.
    # We need to rewrite the imageUrl line for this character.
    # Let's do a regex replacement for this character's block
    # Actually, the simplest way is to replace the imageUrl in the file
    
    # regex to find the imageUrl line immediately after the name/rarity/series of this character
    # Since we can't easily do block replacement in python without full parsing, let's just 
    # find the block and replace it.

# To properly fix the URLs in gachaData.ts since we changed them to MAL IDs earlier,
# let's just rewrite the URLs to use the char_id.
for char_id, char_name in characters:
    # find the block roughly
    block_pattern = f'id: "{char_id}",\s*name: "{char_name}",.*?imageUrl:\s*"([^"]+)"'
    match = re.search(block_pattern, new_content, re.DOTALL)
    if match:
        old_url = match.group(1)
        new_url = f"/gacha/{char_id}.jpg"
        new_content = new_content.replace(f'"{old_url}"', f'"{new_url}"')

with open(gacha_data_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("AniList download complete!")
