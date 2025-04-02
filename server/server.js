const express = require("express");
const cors = require("cors");
const path = require("path");
const imageRoutes = require("./routes/imageroutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the image routes
app.use("/api", imageRoutes);

// Test route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
const PORT = process.env.PORT || 3000; // Change to 3000 or another port
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});