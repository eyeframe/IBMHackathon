#!/usr/bin/env python3
import smtplib
import sys
import mimetypes
from email.mime.multipart import MIMEMultipart
from email import encoders
from email.message import Message
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email.mime.text import MIMEText
# from pydub import AudioSegment

gmail_user = "eyeframe.ai@gmail.com"
gmail_password = "bahuamitayu246"
# gmail_user = 'eyeframe.ai@gmail.com'  
# gmail_password = 'bahuamitayu246'
emailfrom = gmail_user
emailto = sys.argv
emailto.pop(0)
elist = []
mlist2 = []
flag=0
for i in range(0,len(emailto)-1):
    if emailto[i]=="EoE":
        flag=1
    if flag == 0:
        elist.append(emailto[i])
    if flag==1:
        mlist2.append(emailto[i+1])
print (str(mlist2[0]))
print("")
print(elist)
# emailfrom = emailto[0]
# emailto.pop(0)
# # audiofile = "Alert_message.mp3"
fileToSend = "./static/python/message.mp3"
# # sound = AudioSegment.from_mp3(fileToSend)
# # sound.export(audiofile, format="wav")

msg = MIMEMultipart()
msg["From"] = emailfrom
msg["To"] = ", ".join(emailto)
msg["Subject"] = "URGENT - IMMEDIATE BROADCAST REQUESTED"
# message = "Medium risk event. On 10/08/2018, a flood started in India, lasting until 24/09/2018 (last update). The flood caused 501 killed and 280679 displaced. Take precautionary measures and keep yourself safe. More information regarding disaster preparedness can be found in https://www.ready.gov/floods "
message = str(mlist2[0])
msg.preamble = "Emergency: Request to broadcast this message on your radio frequency."

ctype, encoding = mimetypes.guess_type(fileToSend)
if ctype is None or encoding is not None:
    ctype = "application/octet-stream"

maintype, subtype = ctype.split("/", 1)

if maintype == "text":
    fp = open(fileToSend)
    # Note: we should handle calculating the charset
    attachment = MIMEText(fp.read(), _subtype=subtype)
    fp.close()
elif maintype == "image":
    fp = open(fileToSend, "rb")
    attachment = MIMEImage(fp.read(), _subtype=subtype)
    fp.close()
elif maintype == "audio":
    fp = open(fileToSend, "rb")
    attachment = MIMEAudio(fp.read(), _subtype=subtype)
    fp.close()
else:
    fp = open(fileToSend, "rb")
    attachment = MIMEBase(maintype, subtype)
    attachment.set_payload(fp.read())
    fp.close()
    encoders.encode_base64(attachment)
attachment.add_header("Content-Disposition", "attachment", filename=fileToSend)
msg.attach(attachment)
msg.attach(MIMEText(message, 'plain'))

try: 
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(gmail_user, gmail_password)
    server.sendmail(emailfrom,emailto, msg.as_string())
    server.quit()
except Exception as e:  
    print(e)