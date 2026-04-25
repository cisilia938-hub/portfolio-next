import urllib.request
import re
req = urllib.request.Request('https://majotabitabi.fandom.com/wiki/Elaina', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
print(match.group(1) if match else 'not found')
