#!/usr/bin/env python

import csv
import json
import os

with open('data/deaths.csv') as f:
    rows = list(csv.reader(f))

artists = []

for row in rows[1:]:
    artist = {
        'sort': [row[1], row[0]],
        'artist_first_name': row[0],
        'artist_last_name': row[1],
        'artist_page_id': row[2],
        'dob': row[3],
        'dod': row[4],
        'known_as': row[5],
        'desc': row[6], # NEW
        'full_obit': row[7],
        'image_name': '', # See below
        'photo_credit': row[9],
        'photo_caption': row[10], # NEW
        'cue_start': 0, # See below
        'song_name': row[12]
    }

    # Extract image_name
    image_url = row[8]
    filename = image_url.split('/')[-1] 
    artist['image_name'] = os.path.splitext(filename)[0]

    # Compute cue_start in seconds
    cue_start = row[11]
    hours, mins, secs = map(int, cue_start.split(':'))
    artist['cue_start'] = (mins * 60) + secs

    artists.append(artist)

with open('www/deaths.json', 'w') as f:
    f.write(json.dumps(artists))
