# Drive to the target (coding)

Excellent work!  With your fine sleuthing skills, you managed to find a picture of the handsome creature with its pet biped.  At last friends and companionship may be near!

Like all inhabitants of this world, you spend an inordinate amount of time on the site, stalking and comparing your life to that of others. The first thought that springs to your mind is "Why haven't I ever been to Mauritius on holiday?" followed swiftly by "What is a Mauritius anyway?" But after a while and with language successfully deciphered, you've made contact with the lifeform in the picture, you have a "date"? You're given the address of where to meet your potential interest. "1 Banana way, beware of the glass." An odd address, especially that last part. So how do you get there?  You land your ship and begin to search.

https://drivetothetarget.web.ctfcompetition.com

### Solution

```python
#!/usr/bin/env python2

from bs4 import BeautifulSoup
import requests
import time
import sys

# states
TO_FAST = 'this is too fast'
GETTING_AWAY = 'You are getting away'
GETTING_CLOSER = 'You are getting closer'

DIRECTION = (
  (0,  1),   # Up
  (0, -1),   # Down
  (1,  0),   # Right
  (-1, 0)    # Left
)

# config
lat = 51.6498
lon = 0.0982
token = 'gAAAAABdTnjvGP_njo6tGzI-SY-ykJAWuuReE1EE2yp0XGfIF_CaHWVeQcXQ6kBccESMx-UUAtV2X8ExP9bE0hWUM_7-GggX7LHHiMz8PslldhSv-M0DJL56FsepQ52HcMDkRHMRYfFi'
speed = 0.0001

# lat = 51.5935
# lon = -0.1930
# token = 'gAAAAABdTY2MMVqpsP5FFbDhM8J6yD__is4Kz1anpPgCSOP0medn-ymUdAjEEBxFob4OfSxFFkHxhOljLbWUTAiuEWg03u7cCgudfL6n6NiedZoi-sE457zCVXMnvOmsVMUH_1QrxTOX'


def do_move(lat, lon, token):
  host = 'https://drivetothetarget.web.ctfcompetition.com/'
  payload = {
    'lat': '%.4f' % lat,
    'lon': '%.4f' % lon,
    'token': '%s' % token
  }

  r = requests.get(host, params=payload)
  soup = BeautifulSoup(r.text, 'html.parser')
  response = soup.find_all('p')[1].get_text().encode('utf-8')
  lat = float(soup.find('input', {'name': 'lat'}).get('value'))
  lon = float(soup.find('input', {'name': 'lon'}).get('value'))
  # overwrite
  token = soup.find('input', {'name': 'token'}).get('value').encode('utf-8')

  state = None

  if TO_FAST in response:
    state = TO_FAST
  elif GETTING_AWAY in response:
    state = GETTING_AWAY
  elif GETTING_CLOSER in response:
    state = GETTING_CLOSER
  else:
    print r.text.encode('utf-8')
    sys.exit(0)

  print '%.4f %.4f %s %s' % (lat, lon, response, token)
  return (state, lat, lon, token)


if __name__ == '__main__':
  state = None
  i = 0

  while True:
    lat = lat + DIRECTION[i % 4][0] * speed  # Up or Down
    lon = lon + DIRECTION[i % 4][1] * speed  # Right or Left

    state, lat, lon, token = do_move(lat, lon, token)

    if state == TO_FAST:
      time.sleep(0.4)
      continue

    if state == GETTING_AWAY:
      i += 1
      time.sleep(0.1)
      continue

    if state == GETTING_CLOSER:
      time.sleep(0.3)
      continue

```


```
51.4923 -0.1930 You went 11m at a speed of 30km/h. You are getting closer… gAAAAABdTZKUMFXgmmNVzS6lJlecfnzeVbl8hcM7W3H2LCxs4MaGvRxTTGYiH8VUNYH95mKxzwq9MOkqrvIFQCgsX3FJQN4UYpr8KMLlK-VnU4O2Bfmm-ue2ooxP0vtVU1vejXTqHuYt
51.4923 -0.1930 Woa, were about to move at 53km/h, this is too fast! gAAAAABdTZKUMFXgmmNVzS6lJlecfnzeVbl8hcM7W3H2LCxs4MaGvRxTTGYiH8VUNYH95mKxzwq9MOkqrvIFQCgsX3FJQN4UYpr8KMLlK-VnU4O2Bfmm-ue2ooxP0vtVU1vejXTqHuYt
51.4922 -0.1930 You went 11m at a speed of 22km/h. You are getting closer… gAAAAABdTZKWPtq6EuOYJhDN3jo_GT1Bj1NuLeGKJ2ihRNxVCCuRea8yts_5KNmObv0Alvt4l2TzSivUb279TYGSbqLWODhM5JZI5J8Gyu2oCJoMD6TOWqOSLbu_uv0nobUk1zjjFRIQ
<!doctype html>
<html>
  <head>
    <link href="/static/style.css" type="text/css" rel="stylesheet"/>
    <title>Driving to the target</title>
  </head>
  <h1>Driving to the target</h1>
   <body>
     <p>Hurry up, don't be late for you rendez-vous!
      <form method="get" action="/">
        <fieldset>
        <legend>Pick your direction</legend>
         <input type="number" name="lat" value="51.4921" min="-90" max="90" step="0.0001">
         <input type="number" name="lon" value="-0.193" min="-180" max="180" step="0.0001">
         <input style="display: none" name="token" value="gAAAAABdTZKX_4tvOIU24D1O9Hsi6XkJmLNzqJILY8-bBMHTYGHySQhPJdBZr8F4I5dWUi30kpVaK_EZkVDgBpVf2NZdXdOL1mbjmdkT_ZWN9AHffY06c8wwsMZGChvZQuvmNOKCcYao">
         <button type="submit">go</button>
        </fieldset>
      </form>
      <p>Congratulations, you made it, here is the flag:  CTF{Who_is_Tardis_Ormandy}</p>
   </body>
</html>

```

**FLAG: CTF{Who_is_Tardis_Ormandy}**