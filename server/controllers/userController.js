// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail"); // you'll create this helper
// const generateToken = (user) => jwt.sign({ id: user.id , role: user.role, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });

// // exports.register = async (req, res) => {

// //   const { name, email, password } = req.body;
// //   try {
// //     const userExists = await User.findOne({ email });
// //     if (userExists) return res.status(400).json({ message: "User already exists" });

// //     const user = await User.create({ name, email, password });
// //     res.status(201).json({
// //       user: { id: user._id, name: user.name, email: user.email, role: user.role },
// //       token: generateToken(user),   // ✅ pass full user
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // exports.login = async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     const user = await User.findOne({ email }).select("+password");
// //     if (!user) return res.status(401).json({ message: "Invalid credentials" });

// //     const isMatch = await user.matchPassword(password);
// //     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

// //     res.json({
// //       user: { id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
// //       token: generateToken(user),   // ✅ pass full user
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };


// // utils/validateEmail.js
// function validateEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email.toLowerCase());
// }


// exports.register = async (req, res) => {
//   const { name, email, password, confirmPassword } = req.body;

//   try {
//     // 1. Required fields
//     if (!name || !email || !password || !confirmPassword) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // 2. Email format
//     if (!validateEmail(email)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }

//     // 3. Password confirmation
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // 4. Password strength (min 6 chars)
//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters long" });
//     }

//     // 5. Email already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "Email is already registered" });
//     }

//     // 6. Create user
//     const user = await User.create({ name, email, password });
//     res.status(201).json({
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       token: generateToken(user),
//     });

//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Server error, please try again later" });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // 1. Required fields
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // 2. Email format
//     if (!validateEmail(email)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }

//     // 3. User exists
//     const user = await User.findOne({ email }).select("+password");
//     if (!user) return res.status(401).json({ message: "Invalid email or password" });

//     // 4. Password match
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

//     // 5. Success
//     res.json({
//       user: { id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
//       token: generateToken(user),
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Get reset token
//     const resetToken = user.getResetPasswordToken();
//     await user.save({ validateBeforeSave: false });

//     // Reset URL
//     const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

//     // Email message
//     const message = `
//       <h1>Password Reset Request</h1>
//       <p>You requested to reset your password.</p>
//       <p>Please click this link to reset your password:</p>
//       <a href="${resetUrl}" target="_blank">${resetUrl}</a>
//     `;

//     await sendEmail({
//       to: user.email,
//       subject: "Password Reset Request",
//       html: message,
//     });

//     res.json({ success: true, message: "Reset link sent to email" });
//   } catch (err) {
//     console.error("Forgot password error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Reset password
// exports.resetPassword = async (req, res) => {
//   const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   try {
//     const user = await User.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user)
//       return res.status(400).json({ message: "Invalid or expired token" });

//     const { password, confirmPassword } = req.body;

//     if (!password || !confirmPassword) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     user.password = password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     res.json({ success: true, message: "Password updated successfully" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password").sort("-createdAt");
//     res.json({ success: true, count: users.length, data: users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Helper for summary
// exports.getUsersCount = async () => {
//   return await User.countDocuments();
// };


// controllers/authController.js (or wherever register/login live)
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendWelcomeEmail, sendResetPasswordEmail, sendEmail } = require("../utils/sendEmail");


const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
}

exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email is already registered" });

    const user = await User.create({ name, email, password });

    // send welcome email asynchronously (non-blocking)
    sendWelcomeEmail(user).catch((err) => {
      // Log but don't fail registration for email errors
      console.error("Welcome email failed:", err && err.message ? err.message : err);
    });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user),
    });
  } catch (err) {
    console.error("Register error:", err && err.message ? err.message : err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
    if (!validateEmail(email)) return res.status(400).json({ message: "Invalid email format" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
      token: generateToken(user),
    });
  } catch (err) {
    console.error("Login error:", err && err.message ? err.message : err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists or not
      return res.json({ 
        success: true, 
        message: "If the email exists, a reset link has been sent" 
      });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Link to frontend page
    const resetUrl = `${process.env.CLIENT_URL_PRO}/reset-password/${resetToken}`;

    try {
      // Send password reset email
      await sendResetPasswordEmail({ user, resetUrl });

      res.json({ 
        success: true, 
        message: "Password reset link sent to your email" 
      });
    } catch (emailError) {
      console.error("Failed to send reset email:", emailError);

      // Reset token if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(500).json({ 
        message: "Email could not be sent. Please try again." 
      });
    }

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ 
        message: "Invalid or expired reset token. Please request a new password reset." 
      });
    }

    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Send success email
    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset successful",
        text: `Hi ${user.name || ""}, your password has been updated successfully.`,
        html: `<p>Hi ${user.name || ""},</p><p>Your password has been updated successfully.</p>`
      });
      console.log("Password reset success email sent to:", user.email);
    } catch (emailError) {
      console.error("Failed to send success email:", emailError);
      // Don't fail password reset if email fails
    }

    res.json({ 
      success: true, 
      message: "Password updated successfully. You can now login with your new password." 
    });

  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort("-createdAt");
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Helper for summary
exports.getUsersCount = async () => {
  return await User.countDocuments();
};