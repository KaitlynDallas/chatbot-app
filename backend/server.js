const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors()); // Enable CORS for frontend-backend communication

// Endpoint to receive the uploaded .txt file
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("File received:", req.file.originalname);
  
  // Simulate processing and create a response file
  const responseText = "This is a sample response from the backend!";
  const responseFilePath = path.join(__dirname, "response.txt");
  
  fs.writeFileSync(responseFilePath, responseText);

  res.status(200).json({ message: "File received successfully!" });
});

// Endpoint to serve the response .txt file
app.get("/response", (req, res) => {
  const responseFilePath = path.join(__dirname, "response.txt");

  if (fs.existsSync(responseFilePath)) {
    res.sendFile(responseFilePath);
  } else {
    res.status(404).send("No response file found.");
  }
});

// Start the backend server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
