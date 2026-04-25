import urllib.request
import json
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
data = json.dumps({'query': query, 'variables': {'search': 'Hinata Hyuuga'}}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json', 'User-agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    result = json.loads(response.read().decode('utf-8'))
    img_url = result['data']['Character']['image']['large']
    print('Found URL:', img_url)
    urllib.request.urlretrieve(img_url, 'public/gacha/hinata.jpg')
    print('Downloaded hinata.jpg')
except Exception as e:
    print('Error:', e)
