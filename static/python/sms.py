#!/usr/bin/env python3
from twilio.rest import Client
# Download the helper library from https://www.twilio.com/docs/python/install


# Your Account Sid and Auth Token from twilio.com/console
account_sid = 'AC0a3831d89bd783bf5ee4b598094d8518'
auth_token = 'c56f81cfb9faf761688f22379c46e0ff'
client = Client(account_sid, auth_token)
text = ["Medium risk event. On 10/08/2018, a flood started in India, lasting until 24/09/2018 (last update). The flood caused 501 killed and 280679 displaced. ", 
    "More information regarding disaster preparedness can be found in https://www.ready.gov/floods "]

for i in text:
    # print(i)
    message = client.messages \
                    .create(
                        body=i,
                        from_='+19386666801',
                        to='+919741897619'
                    )

    print(message.sid)

# FLASH FLOOD WATCH REMAINS IN EFFECT FROM 7 AM CDT FRIDAY THROUGH SATURDAY AFTERNOON... The Flash Flood Watch continues for Portions of north central Texas and northeast Texas, including the following areas, in north central Texas, Collin, Comanche, Cooke, Dallas, Denton, Eastland, Erath, Fannin, Grayson, Hood, Hunt, Jack, Johnson, Montague, Palo Pinto, Parker, Rockwall, Somervell, Stephens, Tarrant, Wise, and Young.
#  In northeast Texas, Delta, Hopkins, and Lamar. From 7 AM CDT Friday through Saturday afternoon Showers and thunderstorms are expected to become more numerous through the day Friday and continue into Saturday. The heaviest rainfall may occur late Friday afternoon into Friday night. Rainfall totals of 2 to 5 inches will be possible especially north of I-20 towards the Red River through Saturday. Isolated heavier amounts in excess of 5 inches can be expected. PRECAUTIONARY/PREPAREDNESS ACTIONS... A Flash Flood Watch means that conditions are favorable for heavy rain which may lead to flash flooding. You should monitor the latest forecasts from the National Weather Service and be prepared to take action should Flash Flood Warnings be issued for your area. && $$",