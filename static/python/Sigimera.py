#!/usr/bin/env python3
import requests
import json 

params = (
    ('auth_token', 'H1jjhqxMHTo7zr9L7qDC'),
)

response = requests.get('https://api.sigimera.org/v1/crises', params=params)
# print(response.json())
jlist = response.json()
count = 0
indx = []
for i in jlist:
    count = count + 1
    for j in i["gn_parentCountry"]:
        if(j == "india"):
            indx.append(count)

# print(indx)

for i in indx:
    crisis_population = jlist[i-1]["crisis_population"]
    crisis_alertLevel = jlist[i-1]["crisis_alertLevel"]
    dc_description = jlist[i-1]["dc_description"]
    # print(crisis_population)
    print(dc_description)
    if (crisis_alertLevel == "Orange"):
        print("Medium risk event")
    if (crisis_alertLevel == "Green"):
        print("Low risk event")
    if (crisis_alertLevel == "Red"):
        print("High risk event")
# with open('Sigemera.json', 'w') as outfile:
#     json.dump(response.json(), outfile)