import cv2
import numpy as np
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

img = cv2.imread(input_path, 0)
equalized = cv2.equalizeHist(img)
cv2.imwrite(output_path, equalized)
