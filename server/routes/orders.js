// routes/orderRoutes.js
const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createCheckoutSession,
  stripeWebhook,
  getMyOrders,
  getAllOrders,
  verifySession,
  updateOrderStatus
} = require('../controllers/orderController');

const router = express.Router();

// Checkout session
router.post('/create-checkout-session', protect, createCheckoutSession);

// Stripe webhook (public route)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// Get logged-in user orders
router.get('/my-orders', protect, getMyOrders);

router.get("/verify-session/:sessionId", verifySession);

// Get all orders (admin only)
router.get('/', protect, authorize('admin'), getAllOrders);

router.put("/:id/status", protect, authorize("admin"), updateOrderStatus);

module.exports = router; 
