const path = require('path');
const fs = require('fs');
// External Modules
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const app = express();

// app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../Frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend', 'index.html'));
});

// create upload and output folder
const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'output');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Multer code for uploading image
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) =>{
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({storage: storage});
app.post('/uploads', upload.single('input-img'), async (req, res) =>{

  // const originalFileName = req.file.originalname;
  const fileName = req.file.filename;
  const desiredFormat = req.body['desired-format'];
  
  try{
    const convertedFileName = await convertImg(fileName, desiredFormat); //Converting image after uploading

    res.download(path.join(__dirname, 'output', convertedFileName), convertedFileName, (err) =>{
      if (err) throw err;

      // fs.unlinkSync(path.join(__dirname, 'output', convertedFileName));
      // fs.unlinkSync(path.join(__dirname, 'uploads', fileName));
    });
  }
  catch(err){
    res.status(500).send('Error converting image');
  }
});

// Sharp Code for image conversion
async function convertImg(fileName, desiredFormat){
  try{
    const outputFileName = `converted-img.${desiredFormat}`;

    await sharp(path.join(__dirname, 'uploads',fileName))
    .toFormat(desiredFormat)
    .toFile(path.join(__dirname, 'output', outputFileName));

    return outputFileName;
  }
  catch(err){
    throw new Error('Error converting image');
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log(`Server running on http://localhost:${PORT}`);
})



