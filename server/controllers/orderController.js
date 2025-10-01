// controllers/orderController.js
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const Order = require('../models/Order');
// const Book = require('../models/Book');
// const axios = require("axios");
// const { sendEmail } = require('../utils/sendEmail');




// exports.createCheckoutSession = async (req, res) => {
//   try {
//     const { items } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ success: false, message: "No items in request" });
//     }

//     let lineItems = [];
//     let orderItems = [];
//     let totalAmount = 0;

//     for (const item of items) {
//       const book = await Book.findById(item.bookId);
//       if (!book) {
//         return res
//           .status(404)
//           .json({ success: false, message: `Book with ID ${item.bookId} not found` });
//       }

//       // Prepare Stripe line item
//       lineItems.push({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: book.name,
//             images: book.coverImage ? [book.coverImage] : [],
//           },
//           unit_amount: Math.round(book.price * 100), // dollars → cents
//         },
//         quantity: item.quantity,
//       });

//       // Prepare DB order item
//       orderItems.push({
//         bookId: book._id,
//         // name: book.name,
//         quantity: item.quantity,
//         price: book.price, // ✅ price in dollars, trusted from DB
//       });

//       totalAmount += book.price * item.quantity;
//     }

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     customer_email: req.user.email,  // ✅ now available
//     success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
//     metadata: {
//     userId: req.user.id.toString(),
//     email: req.user.email,
//   },
// });

//     // Save order in DB
//     await Order.create({
//       userId: req.user.id,
//       books: orderItems,
//       totalAmount,        // ✅ in dollars
//       currency: "usd",
//       paymentStatus: "pending",
//       stripeSessionId: session.id,
//     });

//     res.status(200).json({ success: true, sessionId: session.id });
//   } catch (error) {
//     console.error("Checkout error:", error);
//     res.status(500).json({ success: false, message: "Server error during checkout" });
//   }
// };



// controllers/orderController.js


// In your orderController.js

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const Order = require('../models/Order');
// const Book = require('../models/Book');
// const axios = require("axios");
// const { sendEmail } = require('../utils/sendEmail');



// exports.createCheckoutSession = async (req, res) => {
//   try {
//     const { items, address } = req.body; // Get address from request body

//     if (!items || items.length === 0) {
//       return res.status(400).json({ success: false, message: "No items in request" });
//     }

//     // Validate address
//     if (!address || !address.street || !address.city || !address.postalCode || !address.country) {
//       return res.status(400).json({ success: false, message: "Complete address information is required" });
//     }

//     let lineItems = [];
//     let orderItems = [];
//     let totalAmount = 0;

//     for (const item of items) {
//       const book = await Book.findById(item.bookId);
//       if (!book) {
//         return res
//           .status(404)
//           .json({ success: false, message: `Book with ID ${item.bookId} not found` });
//       }

//       // Prepare Stripe line item
//       lineItems.push({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: book.name,
//             images: book.coverImage ? [book.coverImage] : [],
//           },
//           unit_amount: Math.round(book.price * 100), // dollars → cents
//         },
//         quantity: item.quantity,
//       });

//       // Prepare DB order item
//       orderItems.push({
//         bookId: book._id,
//         quantity: item.quantity,
//         price: book.price,
//       });

//       totalAmount += book.price * item.quantity;
//     }

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       customer_email: req.user.email,
//       success_url: `${process.env.CLIENT_URL_PRO}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL_PRO}/checkout/cancel`,
//       metadata: {
//         userId: req.user.id.toString(),
//         email: req.user.email,
//       },
//     });

//     // Save order in DB with address
//     await Order.create({
//       userId: req.user.id,
//       books: orderItems,
//       totalAmount,
//       currency: "usd",
//       address: { // Make sure this matches your Order schema
//         name: address.name || `${req.user.firstName} ${req.user.lastName}`,
//         phone: address.phone,
//         street: address.street,
//         city: address.city,
//         state: address.state,
//         postalCode: address.postalCode,
//         country: address.country
//       },
//       paymentStatus: "pending",
//       stripeSessionId: session.id,
//     });

//     res.status(200).json({ success: true, sessionId: session.id });
//   } catch (error) {
//     console.error("Checkout error:", error);
//     res.status(500).json({ success: false, message: "Server error during checkout" });
//   }
// };




// exports.verifySession = async (req, res) => {
//   try {
//     const { sessionId } = req.params;

//     // Fetch session from Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (!session) {
//       return res.status(404).json({ success: false, message: "Session not found" });
//     }

//     // Find the order with this session
//     const order = await Order.findOne({ stripeSessionId: sessionId }).populate("userId", "name email");

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     // Update order payment status if successful
//     if (session.payment_status === "paid") {
//       order.paymentStatus = "completed";
//       order.orderStatus = "processing";
//       await order.save();

//       // Send email notification to user
//       try {
//         await sendEmail({
//           to: order.userId.email,
//           subject: "Order Received",
//           text: `Hi ${order.userId.name}, your order #${order._id} has been received and is now being processed.`,
//           html: `
//             <p>Hi ${order.userId.name},</p>
//             <p>Thank you for your order! Your order <strong>#${order._id}</strong> has been received and is now being processed.</p>
//             <p>Total Amount: $${order.totalAmount.toFixed(2)}</p>
//             <p>We will notify you once it is shipped.</p>
//             <p>— The Team</p>
//           `,
//         });
//         console.log("Order confirmation email sent to:", order.userId.email);
//       } catch (emailError) {
//         console.error("Failed to send order confirmation email:", emailError);
//       }
//     }

//     res.json({
//       success: true,
//       order,
//       stripe: {
//         paymentStatus: session.payment_status,
//         amount: session.amount_total / 100,
//         email: session.customer_details?.email,
//       },
//     });

//   } catch (err) {
//     console.error("Verify session error:", err.message);
//     res.status(500).json({ success: false, message: "Error verifying session" });
//   }
// };


// // exports.verifySession = async (req, res) => {
// //   try {
// //     const { sessionId } = req.params;

// //     // Fetch session from Stripe
// //     const session = await stripe.checkout.sessions.retrieve(sessionId);

// //     if (!session) {
// //       return res.status(404).json({ success: false, message: "Session not found" });
// //     }

// //     // Find the order with this session
// //     const order = await Order.findOne({ stripeSessionId: sessionId });

// //     if (!order) {
// //       return res.status(404).json({ success: false, message: "Order not found" });
// //     }

// //     // Update order payment status if successful
// //     if (session.payment_status === "paid") {
// //       order.paymentStatus = "completed";
// //       order.orderStatus = "processing";
// //       await order.save();
// //     }

// //     res.json({
// //       success: true,
// //       order,
// //       stripe: {
// //         paymentStatus: session.payment_status,
// //         amount: session.amount_total / 100,
// //         email: session.customer_details?.email,
// //       },
// //     });

// //   } catch (err) {
// //     console.error("Verify session error:", err.message);
// //     res.status(500).json({ success: false, message: "Error verifying session" });
// //   }
// // };




// // @desc    Handle Stripe webhook
// // @route   POST /api/orders/webhook
// // @access  Public
// exports.stripeWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error('Webhook signature verification failed:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//     try {
//       const order = await Order.findOne({ stripeSessionId: session.id });
//       if (order) {
//         order.paymentStatus = 'completed';
//         await order.save();

//         // Update stock
//         for (const item of order.books) {
//           await Book.findByIdAndUpdate(item.bookId, { $inc: { stock: -item.quantity } });
//         }
//       }
//     } catch (error) {
//       console.error('Webhook order update error:', error);
//     }
//   }

//   res.json({ received: true });
// };

// // @desc    Get logged-in user orders
// // @route   GET /api/orders/my-orders
// // @access  Private
// exports.getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.user.id })
//       .populate('books.bookId', 'name author coverImage')
//       .sort('-createdAt');

//     res.status(200).json({ success: true, count: orders.length, data: orders });
//   } catch (error) {
//     console.error('Get user orders error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// // @desc    Get all orders (admin only)
// // @route   GET /api/orders
// // @access  Private/Admin
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate('userId', 'name email')
//       .populate('books.bookId', 'title author')
//       .sort('-createdAt');

//     res.status(200).json({ success: true, count: orders.length, data: orders });
//   } catch (error) {
//     console.error('Get all orders error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };


// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { new: true }
//     ).populate("userId", "name email"); // ✅ keep user populated

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: order,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update order status" });
//   }
// };

// // Helper for summary
// exports.getOrdersStats = async () => {
//   const count = await Order.countDocuments();
//   const revenueAgg = await Order.aggregate([
//     { $group: { _id: null, total: { $sum: "$totalAmount" } } },
//   ]);
//   return { totalOrders: count, totalRevenue: revenueAgg[0]?.total || 0 };
// };




const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Book = require('../models/Book');
const Video = require('../models/Video'); // ✅ New
const { sendEmail } = require('../utils/sendEmail');

// @desc    Create Stripe checkout session
// @route   POST /api/orders/create-checkout-session
// @access  Private
exports.createCheckoutSession = async (req, res) => {
  try {
    const { items, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in request" });
    }

    const hasBook = items.some(item => item.bookId);

    // Require address only if the order has a book
    if (hasBook) {
      if (!address || !address.street || !address.city || !address.postalCode || !address.country) {
        return res.status(400).json({ success: false, message: "Complete address information is required for books" });
      }
    }

    let lineItems = [];
    let bookItems = [];
    let videoItems = [];
    let totalAmount = 0;

    for (const item of items) {
      if (item.bookId) {
        const book = await Book.findById(item.bookId);
        if (!book) return res.status(404).json({ success: false, message: `Book with ID ${item.bookId} not found` });

        lineItems.push({
          price_data: {
            currency: "gbp",
            product_data: { name: book.name, images: book.coverImage ? [book.coverImage] : [] },
            unit_amount: Math.round(book.price * 100),
          },
          quantity: item.quantity,
        });

        bookItems.push({ bookId: book._id, quantity: item.quantity, price: book.price, name: book.name });
        totalAmount += book.price * item.quantity;

      } else if (item.videoId) {
        const video = await Video.findById(item.videoId);
        if (!video) return res.status(404).json({ success: false, message: `Video with ID ${item.videoId} not found` });

        lineItems.push({
          price_data: {
            currency: "gbp",
            product_data: { name: video.title, images: video.introVideo ? [video.introVideo] : [] },
            unit_amount: Math.round(video.price * 100),
          },
          quantity: 1,
        });

        videoItems.push({ videoId: video._id, price: video.price, title: video.title });
        totalAmount += video.price;
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: req.user.email,
      success_url: `${process.env.CLIENT_URL_PRO}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL_PRO}/checkout/cancel`,
      metadata: { userId: req.user.id.toString(), email: req.user.email },
    });

    await Order.create({
      userId: req.user.id,
      books: bookItems,
      videos: videoItems,
      totalAmount,
      currency: "gbp",
      address: hasBook ? {
        name: address.name,
        // || `${req.user.firstName} ${req.user.lastName}`,
        phone: address.phone,
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      } : undefined, // ✅ No address for videos
      paymentStatus: "pending",
      stripeSessionId: session.id,
    });

    res.status(200).json({ success: true, sessionId: session.id });

  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ success: false, message: "Server error during checkout" });
  }
};


// @desc    Verify Stripe session
// @route   GET /api/orders/verify/:sessionId
// @access  Private
exports.verifySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    // Populate both books and videos (including videoUrl)
    const order = await Order.findOne({ stripeSessionId: sessionId })
      .populate("userId", "name email")
      .populate("books.bookId", "name")
      .populate("videos.videoId", "title videoUrl");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (session.payment_status === "paid") {
      order.paymentStatus = "completed";
      order.orderStatus = "processing";
      await order.save();

      // Build email content dynamically
      let itemsList = "";
      if (order.books?.length) {
        itemsList += `<p><strong>Books ordered:</strong> ${order.books
          .map(b => `${b.bookId?.name || "Unknown"} (x${b.quantity})`)
          .join(", ")}</p>`;
      }
      if (order.videos?.length) {
        itemsList += `<p><strong>Your Coaching Video ordered:</strong> ${order.videos
          .map(v => v.videoId?.title || "Untitled")
          .join(", ")}</p>`;
      }

      // Send order confirmation email
      try {
        await sendEmail({
          to: order.userId.email,
          subject: "Order Confirmation",
          html: `
            <p>Hi ${order.userId.name},</p>
            <p>Thank you for your order <strong>#${order._id}</strong>.</p>
            <p>Total Amount: $${order.totalAmount.toFixed(2)}</p>
            ${itemsList || "<p>No items found in this order.</p>"}
            <p>You can now access your content from your dashboard. Go to my order to view your orders</p>
            <p>— The Team</p>
          `,
        });
      } catch (err) {
        console.error("Email sending failed:", err);
      }
    }

    // Send order along with video URLs only if paid
    const responseOrder = order.toObject();
    if (order.paymentStatus !== "completed") {
      // Hide video URL if not paid
      responseOrder.videos = responseOrder.videos.map(v => ({
        videoId: { ...v.videoId, videoUrl: null },
      }));
    }

    res.json({
      success: true,
      order: responseOrder,
      stripe: { paymentStatus: session.payment_status },
    });

  } catch (err) {
    console.error("Verify session error:", err.message);
    res.status(500).json({ success: false, message: "Error verifying session" });
  }
};

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const order = await Order.findOne({ stripeSessionId: session.id });
      if (order) {
        order.paymentStatus = 'completed';
        await order.save();

        // Update stock
        for (const item of order.books) {
          await Book.findByIdAndUpdate(item.bookId, { $inc: { stock: -item.quantity } });
        }
      }
    } catch (error) {
      console.error('Webhook order update error:', error);
    }
  }

  res.json({ received: true });
};


// controllers/orderController.js

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('books.bookId', 'name author coverImage') // Books info
      .populate('videos.videoId', 'title thumbnail videoUrl') // ✅ Include videoUrl
      .sort('-createdAt');

    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('books.bookId', 'name author')
      .populate('videos.videoId', 'title')
      .sort('-createdAt');

    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    ).populate("userId", "name email"); // ✅ keep user populated

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status" });
  }
};

// Helper for summary
exports.getOrdersStats = async () => {
  const count = await Order.countDocuments();
  const revenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);
  return { totalOrders: count, totalRevenue: revenueAgg[0]?.total || 0 };
};

