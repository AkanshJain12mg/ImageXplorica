const express = require("express");
const multer = require("multer");
const path = require("path");
const { PythonShell } = require("python-shell");

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")), // Ensure correct path
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: storage });

// Route for image upload and processing
// POST route for image upload and processing
// POST route for image upload and processing
router.post("/image/upload", upload.single("image"), (req, res) => {
    console.log('Received image upload request');
    
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imagePath = req.file.path; // Path to the uploaded image
    const outputImagePath = `uploads/processed_${Date.now()}.png`; // Path for the processed image

    console.log("Uploading image:", imagePath);
    console.log("Output image path:", outputImagePath);

    // Call the Python script for histogram equalization
    PythonShell.run(
        "imgprocessing/algorithms/histogramequalization/hist_eq.py",
        { args: [imagePath, outputImagePath] },
        (err, result) => {
            if (err) {
                console.error("❌ Error processing image:", err);
                return res.status(500).json({ message: "Error processing image", error: err.message });
            }
            else{
            
            // Debug the result and logs from Python
            console.log("✅ Python Script Output:", result);
            
            // Check the output logs to make sure the image is being processed
            if (result && result.length > 0) {
                result.forEach(line => console.log(line));  // Print each line of result
            } else {
                console.log("No output from Python script");
            }
            
            // Ensure correct file path for frontend
            return res.json({
                message: "Image processed successfully",
                outputImagePath: `/uploads/${path.basename(outputImagePath)}`, // Correct URL for frontend
            });
           }
        }
    );
});


module.exports = router;
