const { exec } = require("child_process");
const path = require("path");

exports.processImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const inputPath = path.resolve(req.file.path);
  const outputPath = path.resolve("uploads", `processed_${Date.now()}.png`);

  const pythonScript = path.resolve("imgprocessing", "algorithms", "histogramequalization", "hist_eq.py");

  const command = `python ${pythonScript} ${inputPath} ${outputPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return res.status(500).json({ message: "Error processing image", error: stderr });
    }

    res.json({ message: "Image processed successfully", outputImage: outputPath });
  });
};
