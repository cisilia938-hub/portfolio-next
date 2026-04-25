import re
import os

content = open('src/components/gachaData.ts', encoding='utf-8').read()
matches = re.findall(r'"imageUrl":\s*"/gacha/([^"]+)"', content)
missing = []
for m in matches:
    if not os.path.exists(os.path.join('public', 'gacha', m)):
        missing.append(m)

print(f'Total matches: {len(matches)}')
print(f'Missing images: {missing}')
