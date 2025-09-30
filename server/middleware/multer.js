// const multer = require('multer');
// const path = require('path');

// // Configure multer for memory storage (for Cloudinary)
// const storage = multer.memoryStorage();

// // File filter function
// const fileFilter = (req, file, cb) => {
//   // Check if the file is an image
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// // Configure multer
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB file size limit
//   },
//   fileFilter: fileFilter
// });

// module.exports = upload;


const multer = require('multer');

// Configure multer for memory storage (for Cloudinary)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  // Allow both images and videos
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/') ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only image or video files are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit (you can adjust this based on your intro video size)
  },
  fileFilter: fileFilter,
});

module.exports = upload;
