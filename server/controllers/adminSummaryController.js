const { getUsersCount } = require("./userController");
const { getBooksCount } = require("./bookController");
const { getOrdersStats } = require("./orderController");

// @desc   Get admin summary (counts + revenue)
// @route  GET /api/admin/summary
// @access Admin
exports.getSummary = async (req, res) => {
  try {
    const [users, books, orders] = await Promise.all([
      getUsersCount(),
      getBooksCount(),
      getOrdersStats(),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers: users,
        totalBooks: books,
        totalOrders: orders.totalOrders,
        totalRevenue: orders.totalRevenue,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
