#!/usr/bin/env python3
import requests
import json 
import sys
from ocr import ocr_mic

Image = sys.argv
Image.pop(0)
Image = str(Image[0])
# Image = "After.jpg"
url = 'https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19'
files = {'images_file': open('%s'%Image,'rb')}
resp = requests.post(url, auth=('apikey', 'BrKY0JLYCkUH-7nUl3h3oYzE_psHHbcCuxlyHS_ora9H'), files=files)
s = ""
results = resp.json()
# with open('Vision.json', 'w') as outfile:
#     json.dump(results, outfile)
results = results['images'][0]['classifiers'][0]['classes']
for result in results:
    if (result["class"] == "Earthquake"):
        print("Earthquake detected")
    if (result["class"] == "floodlight"):
        print("Flood detected")
    if (result["class"] == "Wildfire"):
        print("Forestfire detected")

ocr_mic(Image)
exit()

        