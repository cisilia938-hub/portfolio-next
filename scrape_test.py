import urllib.request
import re

url = "https://www.anime-planet.com/characters/top-loved"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        print(html[:500])
except Exception as e:
    print(e)
