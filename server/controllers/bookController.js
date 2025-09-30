// const Book = require("../models/Book");
// const cloudinary = require("../config/cloudinary");
// const streamifier = require("streamifier");

// // Create a book
// exports.createBook = async (req, res) => {
//   try {
//     const { name, author, description, price, currency } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Cover image is required" });
//     }

//     // Upload buffer to Cloudinary
//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "books" },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );
//       streamifier.createReadStream(req.file.buffer).pipe(stream);
//     });

//     const newBook = new Book({
//       name,
//       author,
//       coverImage: result.secure_url,
//       description,
//       price,
//       currency,
//     });

//     await newBook.save();
//     res.status(201).json(newBook);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get all books
// exports.getBooks = async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get single book by ID
// exports.getBookById = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) return res.status(404).json({ message: "Book not found" });
//     res.json(book);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



// const Book = require("../models/Book");
// const cloudinary = require("../config/cloudinary");
// const streamifier = require("streamifier");

// // Create a book
// exports.createBook = async (req, res) => {
//   try {
//     const { name, author, description, price, currency } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Cover image is required" });
//     }

//     // Upload buffer to Cloudinary
//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "books" },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );
//       streamifier.createReadStream(req.file.buffer).pipe(stream);
//     });

//     const newBook = new Book({
//       name,
//       author,
//       coverImage: result.secure_url,
//       description,
//       price,
//       currency,
//     });

//     await newBook.save();
//     res.status(201).json(newBook);
//   } catch (err) {
//     console.error("Create Book Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get all books
// exports.getBooks = async (req, res) => {
//   try {
//     const books = await Book.find().sort({ createdAt: -1 });
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get single book by ID
// exports.getBookById = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) return res.status(404).json({ message: "Book not found" });
//     res.json(book);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update a book
// exports.updateBook = async (req, res) => {
//   try {
//     const { name, author, description, price, currency } = req.body;

//     const updateData = { name, author, description, price, currency };

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

//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });

//     if (!updatedBook) return res.status(404).json({ message: "Book not found" });

//     res.json(updatedBook);
//   } catch (err) {
//     console.error("Update Book Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Delete a book
// exports.deleteBook = async (req, res) => {
//   try {
//     const deletedBook = await Book.findByIdAndDelete(req.params.id);
//     if (!deletedBook)
//       return res.status(404).json({ message: "Book not found" });

//     res.json({ message: "Book deleted successfully" });
//   } catch (err) {
//     console.error("Delete Book Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


const Book = require("../models/Book");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");


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
            resource_type: "raw",   // 🔹 required for PDF
            // format: "pdf",          // 🔹 forces Cloudinary to keep `.pdf`
            unique_filename: true,  // 🔹 prevents overwriting
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.files.pdf[0].buffer).pipe(stream);
      });
    }

    const newBook = new Book({
      name,
      author,
      coverImage: coverResult.secure_url,
      pdf: pdfResult ? pdfResult.secure_url : null,
      description,
      price: parseFloat(price),
      currency,
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

//     if (!req.file) {
//       return res.status(400).json({ message: "Cover image is required" });
//     }

//     // Upload buffer to Cloudinary
//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "books" },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );
//       streamifier.createReadStream(req.file.buffer).pipe(stream);
//     });

//     const newBook = new Book({
//       name,
//       author,
//       coverImage: result.secure_url,
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

// @desc   Get all books
// @route  GET /api/books
// @access Public/Admin
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
      { folder: "books", resource_type: "raw"}, 
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
