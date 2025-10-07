

const Book = require("../models/Book");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
// const slugify = require("slugify");


exports.createBook = async (req, res) => {
  try {
    const { name, author, description, price, currency } = req.body;

    if (!req.files || !req.files.coverImage) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    // Upload cover image
    const coverResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "books", resource_type: "image", unique_filename: true },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.files.coverImage[0].buffer).pipe(stream);
    });

    // Upload PDF if provided
    let pdfResult = null;
    if (req.files.pdf && req.files.pdf[0]) {
      pdfResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "books",
            resource_type: "raw",
            use_filename: true,
            filename_override: req.files.pdf[0].originalname.replace(/\.[^/.]+$/, ""), // ✅ keep original name
            format: "pdf",
            unique_filename: false,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.files.pdf[0].buffer).pipe(stream);
      });
    }

    // const slug = slugify(name, { lower: true, strict: true });

    const newBook = new Book({
      name,
      author,
      coverImage: coverResult.secure_url,
      pdf: pdfResult ? pdfResult.secure_url : null,
      description,
      price: parseFloat(price),
      currency,
      // slug,
    });

    await newBook.save();
    res.status(201).json({ success: true, data: newBook });
  } catch (err) {
    console.error("Create Book Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// exports.createBook = async (req, res) => {
//   try {
//     const { name, author, description, price, currency } = req.body;

//     if (!req.files || !req.files.coverImage) {
//       return res.status(400).json({ message: "Cover image is required" });
//     }

//     // Upload cover image
//     const coverResult = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "books", resource_type: "image", unique_filename: true },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );
//       streamifier.createReadStream(req.files.coverImage[0].buffer).pipe(stream);
//     });

//     // Upload PDF if provided
//     let pdfResult = null;
//     if (req.files.pdf && req.files.pdf[0]) {
//       pdfResult = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//         folder: "books",
//         resource_type: "raw",
//         type: "upload", // ✅ ensures file is PUBLIC
//         use_filename: true,
//         unique_filename: false,
//         overwrite: true,
//           },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           }
//         );
//         streamifier.createReadStream(req.files.pdf[0].buffer).pipe(stream);
//       });
//     }

//     // Generate proper download URL for PDF
//     let pdfDownloadUrl = null;
//     if (pdfResult) {
//       // Use Cloudinary's URL transformation for forced download
//       const publicId = pdfResult.public_id;
//       pdfDownloadUrl = cloudinary.url(publicId, {
//         resource_type: 'raw',
//         flags: 'attachment', // This forces download instead of opening in browser
//         type: 'upload',
//         secure: true
//       });
//     }

//     const newBook = new Book({
//       name,
//       author,
//       coverImage: coverResult.secure_url,
//       pdf: pdfDownloadUrl, // Use the generated download URL
//       description,
//       price: parseFloat(price),
//       currency,
//     });

//     await newBook.save();
//     res.status(201).json({ success: true, data: newBook });
//   } catch (err) {
//     console.error("Create Book Error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };





// // @desc   Get all books
// // @route  GET /api/books
// // @access Public/Admin
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ success: true, count: books.length, data: books });
    // res.json(200).json({ success: true, data: books });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// @desc   Get single book
// @route  GET /api/books/:id
// @access Public/Admin
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc   Update a book
// @route  PUT /api/books/:id
// @access Admin



exports.updateBook = async (req, res) => {
  try {
    const { name, author, description, price, currency } = req.body;
    const updateData = { 
      name, 
      author, 
      description, 
      price: parseFloat(price), 
      currency 
    };

    // If new cover image is uploaded
    if (req.files && req.files.coverImage) {
      const coverResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "books" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.files.coverImage[0].buffer).pipe(stream);
      });
      updateData.coverImage = coverResult.secure_url;
    }

    // If new PDF is uploaded
    // If new PDF is uploaded
if (req.files && req.files.pdf) {
  const pdfResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {folder: "books",
            resource_type: "raw",
            use_filename: true,
            filename_override: req.files.pdf[0].originalname.replace(/\.[^/.]+$/, ""), // ✅ keep original name
            format: "pdf",
            unique_filename: false,}, 
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(req.files.pdf[0].buffer).pipe(stream);
  });
  updateData.pdf = pdfResult.secure_url;
}


    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.json({ success: true, data: updatedBook });
  } catch (err) {
    console.error("Update Book Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// exports.updateBook = async (req, res) => {
//   try {
//     const { name, author, description, price, currency } = req.body;
//     const updateData = { name, author, description, price: parseFloat(price), currency };

//     if (req.file) {
//       // Upload new cover image
//       const result = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "books" },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           }
//         );
//         streamifier.createReadStream(req.file.buffer).pipe(stream);
//       });
//       updateData.coverImage = result.secure_url;
//     }

//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     if (!updatedBook) return res.status(404).json({ success: false, message: "Book not found" });

//     res.json({ success: true, data: updatedBook });
//   } catch (err) {
//     console.error("Update Book Error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// @desc   Delete a book
// @route  DELETE /api/books/:id
// @access Admin
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ success: false, message: "Book not found" });

    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    console.error("Delete Book Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Helper for Admin Summary
exports.getBooksCount = async () => {
  return await Book.countDocuments();
};
