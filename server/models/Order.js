// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   books: [{
//     bookId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Book',
//       required: true
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1
//     },
//     price: {
//       type: Number, // in USD
//       required: true
//     },
//     name: {
//        type: String, required: false
//     }
//   }],
//   totalAmount: {
//     type: Number, // in USD
//     required: true,
//     min: 0
//   },
//   currency: {
//     type: String,
//     default: 'usd'
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'completed', 'failed'],
//     default: 'pending'
//   },
//   orderStatus: {
//     type: String,
//     enum: ['processing', 'shipped', 'delivered', 'cancelled'],
//     default: 'processing'
//   },
//   stripeSessionId: {
//     type: String
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Order', orderSchema);


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  books: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number, // in USD
      required: true
    },
    name: {
      type: String,
      required: false
    }
  }],
  totalAmount: {
    type: Number, // in USD
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'usd'
  },
  address: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  },
  stripeSessionId: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
