const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminDashboardController');
const { protect, authorize } = require('../middleware/authMiddleware'); // ✅ destructure properly
const upload = require('../middleware/multer');

// Books routes
router.get('/books', protect, authorize('admin'), adminController.getAllBooks);
router.post('/books', protect, authorize('admin'), upload.single('coverImage'), adminController.createBook);
router.put('/books/:id', protect, authorize('admin'), upload.single('coverImage'), adminController.updateBook);
router.delete('/books/:id', protect, authorize('admin'), adminController.deleteBook);

// Orders routes
router.get('/orders', protect, authorize('admin'), adminController.getAllOrders);
router.put('/orders/:id/status', protect, authorize('admin'), adminController.updateOrderStatus);

// Users routes
router.get('/users', protect, authorize('admin'), adminController.getAllUsers);

// Stripe integration
router.post('/stripe/create-product/:bookId', protect, authorize('admin'), adminController.createStripeProduct);

module.exports = router;
