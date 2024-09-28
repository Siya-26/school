const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const Images = require('../models/image.models');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { bucket } = require('../firebase/firebase.config');
require('dotenv').config();

app.use(cors()); // enforce cors later
app.use(express.json());

// GLOBAL VARIABLES
const PORT = process.env.ENV || 5000;
const database = process.env.MONGO_DATABASE_CONNECT;

// MIDDLEWARE
mongoose.set("strictQuery", false);
mongoose
  .connect(database)
  .then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", PORT);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// Multer Setup for File Upload
const upload = multer({
  storage: multer.memoryStorage(), // Store in memory temporarily
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Firebase Storage Upload Function
async function uploadImageToFirebase(file) {
  const fileName = `${uuidv4()}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);
  // Upload the file to Firebase Storage
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (error) => reject(error));
    stream.on('finish', async () => {
      // Make the file publicly accessible
      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      resolve(publicUrl);
    });
    stream.end(file.buffer);
  });
}

app.get('/api/storage/', async (req, res) => {
  try{
    res.status(200).json({message: "Storage API!"});
  }
  catch(error){
    res.status(500).json({error: error.message})
  }
});

app.post('/api/storage/upload', upload.single('image'), async (req, res) => {
  console.log(req.file);
  try {
    // Upload file to Firebase
    const imageUrl = await uploadImageToFirebase(req.file);
    await Images.create({
      imageUrl: imageUrl
    });

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});