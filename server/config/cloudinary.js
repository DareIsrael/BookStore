const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;


// const cloudinary = require("cloudinary").v2;
// require('dotenv').config(); // Load environment variables

// // Configure Cloudinary using the CLOUDINARY_URL
// cloudinary.config({
//   cloudinary_url: process.env.CLOUDINARY_URL,
// });

// module.exports = cloudinary;

