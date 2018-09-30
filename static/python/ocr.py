#!/usr/bin/env python3
import requests
import time
from io import BytesIO
import json
import os
import sys 

subscription_key = "16b288d801ab4e2e9aca1d572901da6a"
assert subscription_key

def ocr_mic(image_path):
    s = ""
    vision_base_url = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/"

    text_recognition_url = vision_base_url + "recognizeText"
    image_data = open(image_path, "rb").read()

    headers = {'Ocp-Apim-Subscription-Key': subscription_key,
                'Content-Type': 'application/octet-stream'}
    params  = {'mode': 'Printed'}
    response = requests.post(
        text_recognition_url, headers=headers, params=params, data=image_data)
    response.raise_for_status()
    operation_url = response.headers["Operation-Location"]
    analysis = {}
    poll = True
    while (poll):
        response_final = requests.get(
            response.headers["Operation-Location"], headers=headers)
        analysis = response_final.json()
        time.sleep(1)
        if ("recognitionResult" in analysis):
            poll= False 
        if ("status" in analysis and analysis['status'] == 'Failed'):
            poll= False
    # with open('Azureocr.json', 'w') as outfile:
    #     json.dump(analysis, outfile)
    for i in analysis["recognitionResult"]["lines"]:
        s += i["text"] + " "
    print(s)
    exit()


