// const express = require("express");
// const {
//   createBook,
//   getBooks,
//   getBookById,
//   updateBook,
//   deleteBook,
// } = require("../controllers/bookController");

// const upload = require("../middleware/multer"); // make sure multer handles file upload

// const router = express.Router();

// // CRUD endpoints
// router.post("/", upload.single("coverImage"), createBook);
// router.get("/", getBooks);
// router.get("/:id", getBookById);
// router.put("/:id", upload.single("coverImage"), updateBook);
// router.delete("/:id", deleteBook);

// module.exports = router;

// const express = require("express");
// const {
//   getBooks,
//   createBook,
//   updateBook,
//   deleteBook,
//   getBookById
// } = require("../controllers/bookController");
// const { protect, authorize } = require("../middleware/authMiddleware");
// const upload = require("../middleware/multer");



// const router = express.Router();

// router.get("/", getBooks);
// // router.post("/", protect, authorize("admin"), upload.single("coverImage"), createBook);
// router.post("/", upload.single("coverImage"), createBook);

// router.get("/:id", getBookById);
// router.put("/:id", protect, authorize("admin"), upload.single("coverImage"), updateBook);
// router.delete("/:id", protect, authorize("admin"), deleteBook);

// module.exports = router;


const express = require("express");
const { getBooks, createBook, updateBook, deleteBook, getBookById } = require("../controllers/bookController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/", getBooks);
router.post("/", protect, authorize("admin"), upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "pdf", maxCount: 1 }]), createBook);
router.get("/:id", getBookById);
router.put("/:id", protect, authorize("admin"), upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "pdf", maxCount: 1 }]), updateBook);
router.delete("/:id", protect, authorize("admin"), deleteBook);

module.exports = router;
