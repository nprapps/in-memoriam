#!/usr/bin/env python

import csv
import requests

with open('data/deaths.csv') as f:
    rows = list(csv.reader(f))

for row in rows[1:]:
    image_url = row[8]
    filename = image_url.split('/')[-1] 

    print 'Fetching %s' % filename
    response = requests.get(image_url)

    with open('mugs/%s' % filename, 'wb') as f:
        f.write(response.content)

    
