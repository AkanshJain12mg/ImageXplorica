const express = require("express");
const multer = require("multer");
const path = require("path");
const { PythonShell } = require("python-shell");

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")), 
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: storage });


router.post("/image/upload", upload.single("image"), (req, res) => {
    console.log('Received image upload request');
    
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imagePath = req.file.path; 
    const outputImagePath = `uploads/processed_${Date.now()}.png`; // Path for the processed image

    console.log("Uploading image:", imagePath);
    console.log("Output image path:", outputImagePath);

    // Call the Python script for histogram equalization
    PythonShell.run(
        "imgprocessing/algorithms/histogramequalization/hist_eq.py",
        { args: [imagePath, outputImagePath] },
        (err, result) => {
            if (err) {
                console.error("Error processing image:", err);
                return res.status(500).json({ message: "Error processing image", error: err.message });
            }
            else{
            
         
            console.log(" Python Script Output:", result);
            
           
            if (result && result.length > 0) {
                result.forEach(line => console.log(line));  
            } else {
                console.log("No output from Python script");
            }
            
           
            return res.json({
                message: "Image processed successfully",
                outputImagePath: `/uploads/${path.basename(outputImagePath)}`, 
            });
           }
        }
    );
});


module.exports = router;
