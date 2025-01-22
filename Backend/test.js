const path = require('path');
const fs = require('fs');
// External Modules
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const app = express();

// Serve static files for the frontend (e.g., index.html, JS, CSS)
app.use(express.static(path.join(__dirname, '../frontend')));

// Get the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Multer configuration to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));  // Save uploaded files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Use timestamp as part of the file name
  }
});

const upload = multer({ storage: storage });

// Handle file upload and image conversion
app.post('/uploads', upload.single('input-img'), (req, res, next) => {
  console.log(req.file);  // Log the uploaded file details

  const fileName = req.file.filename;  // Get the uploaded file name
  const desiredFormat = req.body['desired-format'];  // Get the desired format (png, jpg, etc.)

  // Convert the uploaded image to the desired format
  convertImg(fileName, desiredFormat, (err, convertedImageName) => {
    if (err) {
      return res.status(500).send('Error converting image.');
    }

    // Send the converted image as a downloadable file
    const filePath = path.join(__dirname, 'output', convertedImageName);
    res.download(filePath, convertedImageName);  // This triggers the file download
  });
});

// Image conversion using Sharp
function convertImg(fileName, desiredFormat, callback) {
  const outputFileName = `converted-img.${desiredFormat}`; // Name of the converted image with desired format extension
  
  sharp(path.join(__dirname, 'uploads', fileName))  // Path to the uploaded image
    .toFormat(desiredFormat)  // Convert to the desired format (png, jpg, etc.)
    .toFile(path.join(__dirname, 'output', outputFileName), (err, info) => {
      if (err) return callback(err);  // Handle conversion error
      console.log(info);  // Log the conversion details
      callback(null, outputFileName);  // Return the name of the converted file
    });
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
