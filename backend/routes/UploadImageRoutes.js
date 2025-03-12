const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

//Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file Uploaded" });
    }

    //Function to handle the stream upload to Cloundinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        // User streamifier to  convert file buffer to a stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    //Call the stream upload function
    const result = await streamUpload(req.file.buffer);

    //Response with the uploaded image URL
    return res.json({
      message: "Uploaded Successfully!",
      imageURL: result.secure_url,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
