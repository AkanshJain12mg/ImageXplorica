import sys
import cv2

# Ensure UTF-8 encoding for stdout
sys.stdout.reconfigure(encoding='utf-8')

def histogram_equalization(input_image_path, output_image_path):
    print(f"Processing image: {input_image_path}")  # Debugging line
    image = cv2.imread(input_image_path)
    if image is None:
        print("❌ Error: Image not found or unable to read.")
        print("FAIL")  # Node.js should capture this
        return
    
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    equalized_image = cv2.equalizeHist(gray_image)
    cv2.imwrite(output_image_path, equalized_image)
    
    print("SUCCESS")  # Node.js should capture this
    print(f"✅ Image saved to: {output_image_path}")

if __name__ == "__main__":
    input_image_path = sys.argv[1]
    output_image_path = sys.argv[2]
    print(f"Received input path: {input_image_path}")  # Log paths
    histogram_equalization(input_image_path, output_image_path)
