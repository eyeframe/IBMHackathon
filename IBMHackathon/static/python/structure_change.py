#!/usr/bin/env python3
import numpy as np
import cv2
import sys

def Eyeframe_Imchange(im1,im2):
    
    def DistMap(frame1, frame2):
        frame1_32 = np.float32(frame1)
        frame2_32 = np.float32(frame2)
        diff32 = frame1_32 - frame2_32
        norm32 = np.sqrt(diff32[:,:,0]**2 + diff32[:,:,1]**2 + diff32[:,:,2]**2)/np.sqrt(255**2 + 255**2 + 255**2)
        dist = np.uint8(norm32*255)

        return dist

    dist = DistMap(im1, im2)
    mod = cv2.GaussianBlur(dist, (9,9), 0)
    _, thresh = cv2.threshold(mod, 100, 255, 0)
    _, stDev = cv2.meanStdDev(mod)
    # plt.imshow(mod)
    # plt.title('Change')
    # plt.show()
    return stDev

Images = sys.argv
Images.pop(0)
Image1 = Images[0]
Image2 = Images[1]
Image1 = str(Image1)
Image2 = str(Image2)
image1 = cv2.imread(Image1)
image2 = cv2.imread(Image2)
# print(Eyeframe_Imchange(image1,image2))
sdThresh = 18
val = Eyeframe_Imchange(image1,image2)
if val > sdThresh:
    print("Major structural change detected due to earthquake")
else: 
    print("No major structural change detected")
