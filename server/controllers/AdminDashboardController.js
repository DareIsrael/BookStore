// const Book = require("../models/Book");
// const Order = require("../models/Order");
// const User = require("../models/User");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const cloudinary = require("../config/cloudinary");
// const streamifier = require("streamifier");

// // Get all books
// exports.getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: books });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// // };

// // Create new book
// exports.createBook = async (req, res) => {
//   try {
//     const { name, author, description, price, currency } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "Cover image is required" });
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
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Update book
// exports.updateBook = async (req, res) => {
//   try {
//     const { name, author, description, price, currency } = req.body;
//     const updates = { name, author, description, price: parseFloat(price), currency };

//     if (req.file) {
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
//       updates.coverImage = result.secure_url;
//     }

//     const book = await Book.findByIdAndUpdate(
//       req.params.id,
//       updates,
//       { new: true, runValidators: true }
//     );

//     if (!book) {
//       return res.status(404).json({ success: false, message: 'Book not found' });
//     }

//     res.status(200).json({ success: true, data: book });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Delete book
// exports.deleteBook = async (req, res) => {
//   try {
//     const book = await Book.findByIdAndDelete(req.params.id);
//     if (!book) {
//       return res.status(404).json({ success: false, message: 'Book not found' });
//     }
//     res.status(200).json({ success: true, message: 'Book deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get all orders
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate('userId', 'name email')
//       .populate('books.bookId', 'name price coverImage')
//       .sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Update order status
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ success: false, message: 'Invalid status' });
//     }

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus: status },
//       { new: true }
//     ).populate('userId', 'name email');

//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     res.status(200).json({ success: true, data: order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password').sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Create Stripe product
// exports.createStripeProduct = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.bookId);
//     if (!book) {
//       return res.status(404).json({ success: false, message: 'Book not found' });
//     }

//     // Create product in Stripe
//     const product = await stripe.products.create({
//       name: book.name,
//       description: book.description,
//       images: book.coverImage ? [book.coverImage] : [],
//     });

//     // Create price in Stripe
//     const price = await stripe.prices.create({
//       product: product.id,
//       unit_amount: Math.round(book.price * 100), // Convert to cents
//       currency: book.currency || 'usd',
//     });

//     // Update book with Stripe IDs
//     book.stripeProductId = product.id;
//     book.stripePriceId = price.id;
//     await book.save();

//     res.status(200).json({ 
//       success: true, 
//       message: 'Stripe product created successfully',
//       data: book 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };