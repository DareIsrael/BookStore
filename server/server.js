const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const SpinUp = require("./SpinUp")()

dotenv.config();
const userRoutes = require("./routes/User");
const bookRoutes = require("./routes/books");
const orderRoutes = require("./routes/orders");
const videoRoutes = require("./routes/videos");
// const AdminDashboard = require ("./routes/AdminDashboardRoutes.js");
const adminSummaryRoutes = require("./routes/adminSummaryRoutes");
const contactRoutes = require('./routes/contact');
const healthRoutes = require("./routes/health");


const app = express();
app.use(helmet());
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cors({
  origin: [process.env.CLIENT_URL_LOCAL, process.env.CLIENT_URL_PRO], // Replace with your actual frontend URLs
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// SpinUp();

app.use(morgan("dev"));
app.use("/orders/webhook", express.raw({ type: "application/json" }), orderRoutes);
app.use(express.json({ limit: "10mb" }));

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/orders", orderRoutes);
app.use("/videos", videoRoutes)
// app.use("/api/admin", AdminDashboard);
app.use("/admin/summary", adminSummaryRoutes);
app.use('/contact', contactRoutes);
app.use("/health", healthRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
