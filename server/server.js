const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());

// Ensure folders exist
const uploadDir = path.join(__dirname, "uploads");
const processedDir = path.join(__dirname, "processed");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(processedDir)) fs.mkdirSync(processedDir);

//  Multer config with original extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

//route for histogram processing
app.post("/api/histogram", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const uploadedPath = path.join(uploadDir, req.file.filename);
  const outputPath = path.join(processedDir, `${req.file.filename.split(".")[0]}_hist.png`);

  console.log("📥 Uploaded:", uploadedPath);
  console.log("⚙️  Processing output path:", outputPath);

  //  Python script with file paths
  exec(`python scripts/histogram.py "${uploadedPath}" "${outputPath}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(" Python script error:", stderr);
      return res.status(500).send("Error processing image.");
    }

    console.log(" Processed image sent:", outputPath);
    res.sendFile(outputPath);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
