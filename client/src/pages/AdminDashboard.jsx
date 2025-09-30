// import React, { useState, useEffect } from "react";
// import axios from "../services/api";
// import styles from "./AdminDashboard.module.css";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("orders");
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editingBook, setEditingBook] = useState(null);
//   const [showBookForm, setShowBookForm] = useState(false);

//   // Form state
//   const [bookForm, setBookForm] = useState({
//     name: "",
//     author: "",
//     description: "",
//     price: "",
//     currency: "usd",
//     coverImage: null,
//   });

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       let endpoint = "";
//       switch (activeTab) {
//         case "orders":
//           endpoint = "/orders";
//           break;
//         case "users":
//           endpoint = "/users";
//           break;
//         case "books":
//           endpoint = "/books";
//           break;
//         default:
//           endpoint = "/orders";
//       }

//       const res = await axios.get(endpoint, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (activeTab === "orders") setOrders(res.data.data || []);
//       if (activeTab === "users") setUsers(res.data.data || []);
//       if (activeTab === "books") setBooks(res.data.data || []);
//     } catch (err) {
//       setError("Failed to fetch data");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         `/orders/${orderId}/status`,
//         { orderStatus: newStatus }, // ✅ correct field
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setOrders((prev) =>
//         prev.map((order) =>
//           order._id === orderId ? res.data.data : order
//         )
//       );
//       setSuccess("Order status updated successfully");
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to update order status");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const handleBookSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       formData.append("name", bookForm.name);
//       formData.append("author", bookForm.author);
//       formData.append("description", bookForm.description);
//       formData.append("price", bookForm.price);
//       formData.append("currency", bookForm.currency);
//       if (bookForm.coverImage) {
//         formData.append("coverImage", bookForm.coverImage);
//       }

//       const endpoint = editingBook
//         ? `/books/${editingBook._id}`
//         : "/books";

//       const method = editingBook ? "put" : "post";

//       const res = await axios[method](endpoint, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setSuccess(
//         editingBook ? "Book updated successfully" : "Book created successfully"
//       );
//       setShowBookForm(false);
//       setEditingBook(null);
//       setBookForm({
//         name: "",
//         author: "",
//         description: "",
//         price: "",
//         currency: "usd",
//         coverImage: null,
//       });
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to save book");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const deleteBook = async (bookId) => {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`/books/${bookId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setSuccess("Book deleted successfully");
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to delete book");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const createStripeProduct = async (bookId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         `/stripe/create-product/${bookId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccess("Stripe product created successfully");
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to create Stripe product");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const editBook = (book) => {
//     setEditingBook(book);
//     setBookForm({
//       name: book.name,
//       author: book.author,
//       description: book.description,
//       price: book.price,
//       currency: book.currency,
//       coverImage: null,
//     });
//     setShowBookForm(true);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);
//   };

//   if (loading) {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Admin Dashboard</h1>

//       {error && <div className={styles.error}>{error}</div>}
//       {success && <div className={styles.success}>{success}</div>}

//       <div className={styles.tabs}>
//         <button
//           className={`${styles.tab} ${
//             activeTab === "orders" ? styles.activeTab : ""
//           }`}
//           onClick={() => setActiveTab("orders")}
//         >
//           Orders
//         </button>
//         <button
//           className={`${styles.tab} ${
//             activeTab === "users" ? styles.activeTab : ""
//           }`}
//           onClick={() => setActiveTab("users")}
//         >
//           Users
//         </button>
//         <button
//           className={`${styles.tab} ${
//             activeTab === "books" ? styles.activeTab : ""
//           }`}
//           onClick={() => setActiveTab("books")}
//         >
//           Books
//         </button>
//       </div>

//       <div className={styles.content}>
//         {activeTab === "orders" && (
//           <div className={styles.section}>
//             <h2>Orders ({orders?.length || 0})</h2>
//             <div className={styles.ordersGrid}>
//               {orders.map((order) => (
//                 <div key={order._id} className={styles.orderCard}>
//                   <div className={styles.orderHeader}>
//                     <h3>Order #{order._id?.slice(-6)}</h3>
//                     <span
//                       className={`${styles.status} ${
//                         styles[order.orderStatus]
//                       }`}
//                     >
//                       {order.orderStatus}
//                     </span>
//                   </div>
//                   <p>
//                     <strong>Customer:</strong>{" "}
//                     {order.userId?.name || order.userId?.email || "N/A"}
//                   </p>
//                   <p>
//                     <strong>Date:</strong> {formatDate(order.createdAt)}
//                   </p>
//                   <p>
//                     <strong>Total:</strong> {formatCurrency(order.totalAmount)}
//                   </p>
//                   <div className={styles.statusUpdate}>
//                     <select
//                       value={order.orderStatus}
//                       onChange={(e) =>
//                         updateOrderStatus(order._id, e.target.value)
//                       }
//                     >
//                       <option value="processing">Processing</option>
//                       <option value="shipped">Shipped</option>
//                       <option value="delivered">Delivered</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "users" && (
//           <div className={styles.section}>
//             <h2>Users ({users?.length || 0})</h2>
//             <div className={styles.usersTable}>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Joined</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <tr key={user._id}>
//                       <td>{user.name || "N/A"}</td>
//                       <td>{user.email}</td>
//                       <td>{formatDate(user.createdAt)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {activeTab === "books" && (
//           <div className={styles.section}>
//             <div className={styles.sectionHeader}>
//               <h2>Books ({books?.length || 0})</h2>
//               <button
//                 className={styles.addButton}
//                 onClick={() => setShowBookForm(true)}
//               >
//                 Add New Book
//               </button>
//             </div>

//             {/* Book Form Modal */}
//             {showBookForm && (
//               <div className={styles.modalOverlay}>
//                 <div className={styles.modal}>
//                   <h3>{editingBook ? "Edit Book" : "Add New Book"}</h3>
//                   <form onSubmit={handleBookSubmit} className={styles.bookForm}>
//                     <input
//                       type="text"
//                       placeholder="Book Name"
//                       value={bookForm.name}
//                       onChange={(e) =>
//                         setBookForm({ ...bookForm, name: e.target.value })
//                       }
//                       required
//                     />
//                     <input
//                       type="text"
//                       placeholder="Author"
//                       value={bookForm.author}
//                       onChange={(e) =>
//                         setBookForm({ ...bookForm, author: e.target.value })
//                       }
//                       required
//                     />
//                     <textarea
//                       placeholder="Description"
//                       value={bookForm.description}
//                       onChange={(e) =>
//                         setBookForm({
//                           ...bookForm,
//                           description: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                     <input
//                       type="number"
//                       placeholder="Price"
//                       value={bookForm.price}
//                       onChange={(e) =>
//                         setBookForm({ ...bookForm, price: e.target.value })
//                       }
//                       step="0.01"
//                       required
//                     />
//                     <select
//                       value={bookForm.currency}
//                       onChange={(e) =>
//                         setBookForm({ ...bookForm, currency: e.target.value })
//                       }
//                     >
//                       <option value="usd">USD</option>
//                       <option value="eur">EUR</option>
//                       <option value="gbp">GBP</option>
//                     </select>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) =>
//                         setBookForm({
//                           ...bookForm,
//                           coverImage: e.target.files[0],
//                         })
//                       }
//                     />
//                     <div className={styles.formButtons}>
//                       <button type="submit" className={styles.saveButton}>
//                         {editingBook ? "Update Book" : "Create Book"}
//                       </button>
//                       <button
//                         type="button"
//                         className={styles.cancelButton}
//                         onClick={() => {
//                           setShowBookForm(false);
//                           setEditingBook(null);
//                           setBookForm({
//                             name: "",
//                             author: "",
//                             description: "",
//                             price: "",
//                             currency: "usd",
//                             coverImage: null,
//                           });
//                         }}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Books List */}
//             <div className={styles.booksGrid}>
//               {books.map((book) => (
//                 <div key={book._id} className={styles.bookCard}>
//                   {book.coverImage && (
//                     <img
//                       src={book.coverImage}
//                       alt={book.name}
//                       className={styles.bookImage}
//                     />
//                   )}
//                   <h3>{book.name}</h3>
//                   <p>
//                     <strong>Author:</strong> {book.author}
//                   </p>
//                   <p>
//                     <strong>Price:</strong> {formatCurrency(book.price)}
//                   </p>
//                   <p>
//                     <strong>Stripe:</strong>{" "}
//                     {book.stripeProductId ? "✅ Connected" : "❌ Not connected"}
//                   </p>
//                   <div className={styles.bookActions}>
//                     <button
//                       className={styles.editButton}
//                       onClick={() => editBook(book)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className={styles.deleteButton}
//                       onClick={() => deleteBook(book._id)}
//                     >
//                       Delete
//                     </button>
//                     {!book.stripeProductId && (
//                       <button
//                         className={styles.stripeButton}
//                         onClick={() => createStripeProduct(book._id)}
//                       >
//                         Create Stripe Product
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from "react";
// import axios from "../services/api";
// import styles from "./AdminDashboard.module.css";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("orders");
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editingBook, setEditingBook] = useState(null);
//   const [showBookForm, setShowBookForm] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showOrderDetails, setShowOrderDetails] = useState(false);

//   // Form state
//   const [bookForm, setBookForm] = useState({
//     name: "",
//     author: "",
//     description: "",
//     price: "",
//     currency: "usd",
//     coverImage: null,
//   });

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       let endpoint = "";
//       switch (activeTab) {
//         case "orders":
//           endpoint = "/orders";
//           break;
//         case "users":
//           endpoint = "/users";
//           break;
//         case "books":
//           endpoint = "/books";
//           break;
//         default:
//           endpoint = "/orders";
//       }

//       const res = await axios.get(endpoint, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (activeTab === "orders") setOrders(res.data.data || []);
//       if (activeTab === "users") setUsers(res.data.data || []);
//       if (activeTab === "books") setBooks(res.data.data || []);
//     } catch (err) {
//       setError("Failed to fetch data");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         `/orders/${orderId}/status`,
//         { orderStatus: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setOrders((prev) =>
//         prev.map((order) =>
//           order._id === orderId ? res.data.data : order
//         )
//       );
//       setSuccess("Order status updated successfully");
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to update order status");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const handleBookSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       formData.append("name", bookForm.name);
//       formData.append("author", bookForm.author);
//       formData.append("description", bookForm.description);
//       formData.append("price", bookForm.price);
//       formData.append("currency", bookForm.currency);
//       if (bookForm.coverImage) {
//         formData.append("coverImage", bookForm.coverImage);
//       }

//       const endpoint = editingBook
//         ? `/books/${editingBook._id}`
//         : "/books";

//       const method = editingBook ? "put" : "post";

//       const res = await axios[method](endpoint, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setSuccess(
//         editingBook ? "Book updated successfully" : "Book created successfully"
//       );
//       setShowBookForm(false);
//       setEditingBook(null);
//       setBookForm({
//         name: "",
//         author: "",
//         description: "",
//         price: "",
//         currency: "usd",
//         coverImage: null,
//       });
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to save book");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const deleteBook = async (bookId) => {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`/books/${bookId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setSuccess("Book deleted successfully");
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to delete book");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const createStripeProduct = async (bookId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         `/stripe/create-product/${bookId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccess("Stripe product created successfully");
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to create Stripe product");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const editBook = (book) => {
//     setEditingBook(book);
//     setBookForm({
//       name: book.name,
//       author: book.author,
//       description: book.description,
//       price: book.price,
//       currency: book.currency,
//       coverImage: null,
//     });
//     setShowBookForm(true);
//   };

//   const viewOrderDetails = (order) => {
//     setSelectedOrder(order);
//     setShowOrderDetails(true);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);
//   };

//   if (loading) {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Admin Dashboard</h1>

//       {error && <div className={styles.error}>{error}</div>}
//       {success && <div className={styles.success}>{success}</div>}

//       <div className={styles.tabs}>
//         <button
//           className={`${styles.tab} ${
//             activeTab === "orders" ? styles.activeTab : ""
//           }`}
//           onClick={() => setActiveTab("orders")}
//         >
//           Orders
//         </button>
//         <button
//           className={`${styles.tab} ${
//             activeTab === "users" ? styles.activeTab : ""
//           }`}
//           onClick={() => setActiveTab("users")}
//         >
//           Users
//         </button>
//         <button
//           className={`${styles.tab} ${
//             activeTab === "books" ? styles.activeTab : ""
//           }`}
//           onClick={() => setActiveTab("books")}
//         >
//           Books
//         </button>
//       </div>

//       <div className={styles.content}>
//         {activeTab === "orders" && (
//           <div className={styles.section}>
//             <h2>Orders ({orders?.length || 0})</h2>
//             <div className={styles.ordersGrid}>
//               {orders.map((order) => (
//                 <div key={order._id} className={styles.orderCard}>
//                   <div className={styles.orderHeader}>
//                     <h3>Order #{order._id?.slice(-6)}</h3>
//                     <span
//                       className={`${styles.status} ${
//                         styles[order.orderStatus]
//                       }`}
//                     >
//                       {order.orderStatus}
//                     </span>
//                   </div>
//                   <p>
//                     <strong>Customer:</strong>{" "}
//                     {order.userId?.name || order.userId?.email || "N/A"}
//                   </p>
//                   <p>
//                     <strong>Date:</strong> {formatDate(order.createdAt)}
//                   </p>
//                   <p>
//                     <strong>Total:</strong> {formatCurrency(order.totalAmount)}
//                   </p>
//                   <p>
//                     <strong>Items:</strong> {order.books?.length || 0} book(s)
//                   </p>
                  
//                   {/* Address Preview */}
//                   {order.address && (
//                     <div className={styles.addressPreview}>
//                       <p>
//                         <strong>Delivery to:</strong> {order.address.city}, {order.address.state}
//                       </p>
//                     </div>
//                   )}
                  
//                   <div className={styles.orderActions}>
//                     <div className={styles.statusUpdate}>
//                       <select
//                         value={order.orderStatus}
//                         onChange={(e) =>
//                           updateOrderStatus(order._id, e.target.value)
//                         }
//                       >
//                         <option value="processing">Processing</option>
//                         <option value="shipped">Shipped</option>
//                         <option value="delivered">Delivered</option>
//                         <option value="cancelled">Cancelled</option>
//                       </select>
//                     </div>
//                     <button
//                       className={styles.detailsButton}
//                       onClick={() => viewOrderDetails(order)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "users" && (
//           <div className={styles.section}>
//             <h2>Users ({users?.length || 0})</h2>
//             <div className={styles.usersTable}>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Joined</th>
//                     <th>Role</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <tr key={user._id}>
//                       <td>{user.name || "N/A"}</td>
//                       <td>{user.email}</td>
//                       <td>{formatDate(user.createdAt)}</td>
//                       <td>{user.role || "user"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {activeTab === "books" && (
//           <div className={styles.section}>
//             <div className={styles.sectionHeader}>
//               <h2>Books ({books?.length || 0})</h2>
//               <button
//                 className={styles.addButton}
//                 onClick={() => setShowBookForm(true)}
//               >
//                 Add New Book
//               </button>
//             </div>

//             {/* Book Form Modal */}
//             {showBookForm && (
//               <div className={styles.modalOverlay}>
//                 <div className={styles.modal}>
//                   <h3>{editingBook ? "Edit Book" : "Add New Book"}</h3>
//                   <form onSubmit={handleBookSubmit} className={styles.bookForm}>
//                     <input
//                       type="text"
//                       placeholder="Book Name"
//                       value={bookForm.name}
//                       onChange={(e) =>
//                         setBookForm({ ...bookForm, name: e.target.value })
//                       }
//                       required
//                     />
//                     <input
//                       type="text"
//                       placeholder="Author"
//                       value={bookForm.author}
//                       onChange={(e) =>
//                         setBookForm({ ...bookForm, author: e.target.value })
//                       }
//                       required
//                     />
//                     <textarea
//                       placeholder="Description"
//                       value={bookForm.description}
//                       onChange={(e) =>
//                         setBookForm({
//                           ...bookForm,
//                           description: e.target.value,
//                         })
//                       }
//                       required
//                     />
//                     <input
//                       type="number"
//                       placeholder="Price"
//                       value={bookForm.price}
//                       onChange={(e) =>
//                         setBookForm({ ...bookForm, price: e.target.value })
//                       }
//                       step="0.01"
//                       required
//                     />
//                     <select
//                       value={bookForm.currency}
//                       onChange={(e) =>
//                         setBookForm({ ...bookForm, currency: e.target.value })
//                       }
//                     >
//                       <option value="usd">USD</option>
//                       <option value="eur">EUR</option>
//                       <option value="gbp">GBP</option>
//                     </select>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) =>
//                         setBookForm({
//                           ...bookForm,
//                           coverImage: e.target.files[0],
//                         })
//                       }
//                     />
//                     <div className={styles.formButtons}>
//                       <button type="submit" className={styles.saveButton}>
//                         {editingBook ? "Update Book" : "Create Book"}
//                       </button>
//                       <button
//                         type="button"
//                         className={styles.cancelButton}
//                         onClick={() => {
//                           setShowBookForm(false);
//                           setEditingBook(null);
//                           setBookForm({
//                             name: "",
//                             author: "",
//                             description: "",
//                             price: "",
//                             currency: "usd",
//                             coverImage: null,
//                           });
//                         }}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Books List */}
//             <div className={styles.booksGrid}>
//               {books.map((book) => (
//                 <div key={book._id} className={styles.bookCard}>
//                   {book.coverImage && (
//                     <img
//                       src={book.coverImage}
//                       alt={book.name}
//                       className={styles.bookImage}
//                     />
//                   )}
//                   <h3>{book.name}</h3>
//                   <p>
//                     <strong>Author:</strong> {book.author}
//                   </p>
//                   <p>
//                     <strong>Price:</strong> {formatCurrency(book.price)}
//                   </p>
//                   <p>
//                     <strong>Stripe:</strong>{" "}
//                     {book.stripeProductId ? "✅ Connected" : "❌ Not connected"}
//                   </p>
//                   <div className={styles.bookActions}>
//                     <button
//                       className={styles.editButton}
//                       onClick={() => editBook(book)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className={styles.deleteButton}
//                       onClick={() => deleteBook(book._id)}
//                     >
//                       Delete
//                     </button>
//                     {!book.stripeProductId && (
//                       <button
//                         className={styles.stripeButton}
//                         onClick={() => createStripeProduct(book._id)}
//                       >
//                         Create Stripe Product
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Order Details Modal */}
//       {showOrderDetails && selectedOrder && (
//         <div className={styles.modalOverlay} onClick={() => setShowOrderDetails(false)}>
//           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <button 
//               className={styles.closeButton}
//               onClick={() => setShowOrderDetails(false)}
//             >
//               &times;
//             </button>
            
//             <h2>Order Details #{selectedOrder._id?.slice(-6)}</h2>
            
//             <div className={styles.orderDetails}>
//               <div className={styles.detailSection}>
//                 <h3>Customer Information</h3>
//                 <p><strong>Name:</strong> {selectedOrder.userId?.name || "N/A"}</p>
//                 <p><strong>Email:</strong> {selectedOrder.userId?.email || "N/A"}</p>
//                 <p><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
//                 <p><strong>Status:</strong> 
//                   <span className={`${styles.status} ${styles[selectedOrder.orderStatus]}`}>
//                     {selectedOrder.orderStatus}
//                   </span>
//                 </p>
//               </div>

//               <div className={styles.detailSection}>
//                 <h3>Delivery Address</h3>
//                 {selectedOrder.address ? (
//                   <>
//                     <p><strong>Name:</strong> {selectedOrder.address.name}</p>
//                     <p><strong>Phone:</strong> {selectedOrder.address.phone}</p>
//                     <p><strong>Street:</strong> {selectedOrder.address.street}</p>
//                     <p><strong>City:</strong> {selectedOrder.address.city}</p>
//                     <p><strong>State:</strong> {selectedOrder.address.state}</p>
//                     <p><strong>Postal Code:</strong> {selectedOrder.address.postalCode}</p>
//                     <p><strong>Country:</strong> {selectedOrder.address.country}</p>
//                   </>
//                 ) : (
//                   <p>No address information available</p>
//                 )}
//               </div>

//               <div className={styles.detailSection}>
//                 <h3>Order Items</h3>
//                 {selectedOrder.books?.map((book, index) => (
//                   <div key={index} className={styles.orderItem}>
//                     <p><strong>Book:</strong> {book.name || `Book ${index + 1}`}</p>
//                     <p><strong>Quantity:</strong> {book.quantity}</p>
//                     <p><strong>Price:</strong> {formatCurrency(book.price)}</p>
//                     <p><strong>Subtotal:</strong> {formatCurrency(book.price * book.quantity)}</p>
//                   </div>
//                 ))}
//                 <div className={styles.orderTotal}>
//                   <h3>Total: {formatCurrency(selectedOrder.totalAmount)}</h3>
//                 </div>
//               </div>

//               <div className={styles.detailSection}>
//                 <h3>Update Status</h3>
//                 <select
//                   value={selectedOrder.orderStatus}
//                   onChange={(e) => {
//                     updateOrderStatus(selectedOrder._id, e.target.value);
//                     setSelectedOrder({
//                       ...selectedOrder,
//                       orderStatus: e.target.value
//                     });
//                   }}
//                   className={styles.statusSelect}
//                 >
//                   <option value="processing">Processing</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;






// import React, { useState, useEffect } from "react";
// import axios from "../services/api";
// import styles from "./AdminDashboard.module.css";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("orders");
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editingBook, setEditingBook] = useState(null);
//   const [showBookForm, setShowBookForm] = useState(false);
//   const [editingVideo, setEditingVideo] = useState(null);
//   const [showVideoForm, setShowVideoForm] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showOrderDetails, setShowOrderDetails] = useState(false);

//   // Book form state
//   const [bookForm, setBookForm] = useState({
//     name: "",
//     author: "",
//     description: "",
//     price: "",
//     currency: "usd",
//     coverImage: null,
//   });

//   // Video form state
//   const [videoForm, setVideoForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     currency: "usd",
//     introVideo: null,
//     videoUrl: "",
//   });

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       let endpoint = "";
//       switch (activeTab) {
//         case "orders":
//           endpoint = "/orders";
//           break;
//         case "users":
//           endpoint = "/users";
//           break;
//         case "books":
//           endpoint = "/books";
//           break;
//         case "videos":
//           endpoint = "/videos";
//           break;
//         default:
//           endpoint = "/orders";
//       }

//       const res = await axios.get(endpoint, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (activeTab === "orders") setOrders(res.data.data || []);
//       if (activeTab === "users") setUsers(res.data.data || []);
//       if (activeTab === "books") setBooks(res.data.data || []);
//       if (activeTab === "videos") setVideos(res.data.data || []);
//     } catch (err) {
//       setError("Failed to fetch data");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Orders ---
//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         `/orders/${orderId}/status`,
//         { orderStatus: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setOrders((prev) =>
//         prev.map((order) => (order._id === orderId ? res.data.data : order))
//       );
//       setSuccess("Order status updated successfully");
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to update order status");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const viewOrderDetails = (order) => {
//     setSelectedOrder(order);
//     setShowOrderDetails(true);
//   };

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-US");

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);

//   // --- Books ---
//   const handleBookSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       formData.append("name", bookForm.name);
//       formData.append("author", bookForm.author);
//       formData.append("description", bookForm.description);
//       formData.append("price", bookForm.price);
//       formData.append("currency", bookForm.currency);
//       if (bookForm.coverImage) formData.append("coverImage", bookForm.coverImage);

//       const endpoint = editingBook ? `/books/${editingBook._id}` : "/books";
//       const method = editingBook ? "put" : "post";

//       await axios[method](endpoint, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setSuccess(editingBook ? "Book updated successfully" : "Book created successfully");
//       setShowBookForm(false);
//       setEditingBook(null);
//       setBookForm({
//         name: "",
//         author: "",
//         description: "",
//         price: "",
//         currency: "usd",
//         coverImage: null,
//       });
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to save book");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const deleteBook = async (bookId) => {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`/books/${bookId}`, { headers: { Authorization: `Bearer ${token}` } });
//       setSuccess("Book deleted successfully");
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to delete book");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const editBook = (book) => {
//     setEditingBook(book);
//     setBookForm({
//       name: book.name,
//       author: book.author,
//       description: book.description,
//       price: book.price,
//       currency: book.currency,
//       coverImage: null,
//     });
//     setShowBookForm(true);
//   };

//   // --- Videos ---
//   const handleVideoSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       formData.append("title", videoForm.title);
//       formData.append("description", videoForm.description);
//       formData.append("price", videoForm.price);
//       formData.append("currency", videoForm.currency);
//       formData.append("videoUrl", videoForm.videoUrl);
//       if (videoForm.introVideo) formData.append("introVideo", videoForm.introVideo);

//       const endpoint = editingVideo ? `/videos/${editingVideo._id}` : "/videos";
//       const method = editingVideo ? "put" : "post";

//       await axios[method](endpoint, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setSuccess(editingVideo ? "Video updated successfully" : "Video created successfully");
//       setShowVideoForm(false);
//       setEditingVideo(null);
//       setVideoForm({
//         title: "",
//         description: "",
//         price: "",
//         currency: "usd",
//         introVideo: null,
//         videoUrl: "",
//       });
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to save video");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const editVideo = (video) => {
//     setEditingVideo(video);
//     setVideoForm({
//       title: video.title,
//       description: video.description,
//       price: video.price,
//       currency: video.currency,
//       introVideo: null,
//       videoUrl: video.videoUrl,
//     });
//     setShowVideoForm(true);
//   };

//   const deleteVideo = async (videoId) => {
//     if (!window.confirm("Are you sure you want to delete this video?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`/videos/${videoId}`, { headers: { Authorization: `Bearer ${token}` } });
//       setSuccess("Video deleted successfully");
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to delete video");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   if (loading) return <div className={styles.loading}>Loading...</div>;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Admin Dashboard</h1>
//       {error && <div className={styles.error}>{error}</div>}
//       {success && <div className={styles.success}>{success}</div>}

//       {/* Tabs */}
//       <div className={styles.tabs}>
//         <button className={`${styles.tab} ${activeTab === "orders" ? styles.activeTab : ""}`} onClick={() => setActiveTab("orders")}>Orders</button>
//         <button className={`${styles.tab} ${activeTab === "users" ? styles.activeTab : ""}`} onClick={() => setActiveTab("users")}>Users</button>
//         <button className={`${styles.tab} ${activeTab === "books" ? styles.activeTab : ""}`} onClick={() => setActiveTab("books")}>Books</button>
//         <button className={`${styles.tab} ${activeTab === "videos" ? styles.activeTab : ""}`} onClick={() => setActiveTab("videos")}>Videos</button>
//       </div>

//       <div className={styles.content}>
//         {/* --- Orders --- */}
//         {activeTab === "orders" && (
//           <div className={styles.section}>
//             <h2>Orders ({orders?.length || 0})</h2>
//             <div className={styles.ordersGrid}>
//               {orders.map((order) => (
//                 <div key={order._id} className={styles.orderCard}>
//                   <div className={styles.orderHeader}>
//                     <h3>Order #{order._id?.slice(-6)}</h3>
//                     <span className={`${styles.status} ${styles[order.orderStatus]}`}>{order.orderStatus}</span>
//                   </div>
//                   <p><strong>Customer:</strong> {order.userId?.name || order.userId?.email || "N/A"}</p>
//                   <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
//                   <p><strong>Total:</strong> {formatCurrency(order.totalAmount)}</p>
//                   <p><strong>Items:</strong> {order.books?.length || 0} book(s)</p>
//                   <div className={styles.orderActions}>
//                     <select value={order.orderStatus} onChange={(e) => updateOrderStatus(order._id, e.target.value)}>
//                       <option value="processing">Processing</option>
//                       <option value="shipped">Shipped</option>
//                       <option value="delivered">Delivered</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                     <button className={styles.detailsButton} onClick={() => viewOrderDetails(order)}>View Details</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* --- Users --- */}
//         {activeTab === "users" && (
//           <div className={styles.section}>
//             <h2>Users ({users?.length || 0})</h2>
//             <table className={styles.usersTable}>
//               <thead>
//                 <tr>
//                   <th>Name</th><th>Email</th><th>Joined</th><th>Role</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id}>
//                     <td>{user.name || "N/A"}</td>
//                     <td>{user.email}</td>
//                     <td>{formatDate(user.createdAt)}</td>
//                     <td>{user.role || "user"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* --- Books --- */}
//         {activeTab === "books" && (
//           <div className={styles.section}>
//             <div className={styles.sectionHeader}>
//               <h2>Books ({books?.length || 0})</h2>
//               <button className={styles.addButton} onClick={() => setShowBookForm(true)}>Add New Book</button>
//             </div>

//             {/* Book Form */}
//             {showBookForm && (
//               <div className={styles.modalOverlay}>
//                 <div className={styles.modal}>
//                   <h3>{editingBook ? "Edit Book" : "Add New Book"}</h3>
//                   <form onSubmit={handleBookSubmit} className={styles.bookForm}>
//                     <input type="text" placeholder="Book Name" value={bookForm.name} onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })} required />
//                     <input type="text" placeholder="Author" value={bookForm.author} onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })} required />
//                     <textarea placeholder="Description" value={bookForm.description} onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })} required />
//                     <input type="number" placeholder="Price" value={bookForm.price} onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })} step="0.01" required />
//                     <select value={bookForm.currency} onChange={(e) => setBookForm({ ...bookForm, currency: e.target.value })}>
//                       <option value="usd">USD</option>
//                       <option value="eur">EUR</option>
//                       <option value="gbp">GBP</option>
//                     </select>
//                     <input type="file" accept="image/*" onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.files[0] })} />
//                     <div className={styles.formButtons}>
//                       <button type="submit" className={styles.saveButton}>{editingBook ? "Update Book" : "Create Book"}</button>
//                       <button type="button" className={styles.cancelButton} onClick={() => { setShowBookForm(false); setEditingBook(null); setBookForm({ name: "", author: "", description: "", price: "", currency: "usd", coverImage: null }); }}>Cancel</button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Books List */}
//             <div className={styles.booksGrid}>
//               {books.map((book) => (
//                 <div key={book._id} className={styles.bookCard}>
//                   {book.coverImage && <img src={book.coverImage} alt={book.name} className={styles.bookImage} />}
//                   <h3>{book.name}</h3>
//                   <p><strong>Author:</strong> {book.author}</p>
//                   <p><strong>Price:</strong> {formatCurrency(book.price)}</p>
//                   <div className={styles.bookActions}>
//                     <button onClick={() => editBook(book)}>Edit</button>
//                     <button onClick={() => deleteBook(book._id)}>Delete</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* --- Videos --- */}
//         {activeTab === "videos" && (
//           <div className={styles.section}>
//             <div className={styles.sectionHeader}>
//               <h2>Videos ({videos?.length || 0})</h2>
//               <button className={styles.addButton} onClick={() => setShowVideoForm(true)}>Add New Video</button>
//             </div>

//             {/* Video Form */}
//             {showVideoForm && (
//               <div className={styles.modalOverlay}>
//                 <div className={styles.modal}>
//                   <h3>{editingVideo ? "Edit Video" : "Add New Video"}</h3>
//                   <form onSubmit={handleVideoSubmit} className={styles.bookForm}>
//                     <input type="text" placeholder="Title" value={videoForm.title} onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })} required />
//                     <textarea placeholder="Description" value={videoForm.description} onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })} required />
//                     <input type="number" placeholder="Price" value={videoForm.price} onChange={(e) => setVideoForm({ ...videoForm, price: e.target.value })} step="0.01" required />
//                     <select value={videoForm.currency} onChange={(e) => setVideoForm({ ...videoForm, currency: e.target.value })}>
//                       <option value="usd">USD</option>
//                       <option value="eur">EUR</option>
//                       <option value="gbp">GBP</option>
//                     </select>
//                     <input type="file" accept="video/*" onChange={(e) => setVideoForm({ ...videoForm, introVideo: e.target.files[0] })} />
//                     <input type="text" placeholder="Full Video URL" value={videoForm.videoUrl} onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })} />
//                     <div className={styles.formButtons}>
//                       <button type="submit">{editingVideo ? "Update Video" : "Create Video"}</button>
//                       <button type="button" onClick={() => { setShowVideoForm(false); setEditingVideo(null); setVideoForm({ title: "", description: "", price: "", currency: "usd", introVideo: null, videoUrl: "" }); }}>Cancel</button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Videos List */}
//             <div className={styles.booksGrid}>
//               {videos.map((video) => (
//                 <div key={video._id} className={styles.bookCard}>
//                   {video.introVideo && <video src={video.introVideo} controls className={styles.bookImage} />}
//                   <h3>{video.title}</h3>
//                   <p>{video.description}</p>
//                   <p><strong>Price:</strong> {formatCurrency(video.price)}</p>
//                   <p><strong>Full Video URL:</strong> {video.videoUrl ? <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">Watch</a> : "N/A"}</p>
//                   <div className={styles.bookActions}>
//                     <button onClick={() => editVideo(video)}>Edit</button>
//                     <button onClick={() => deleteVideo(video._id)}>Delete</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* --- Order Details Modal --- */}
//       {showOrderDetails && selectedOrder && (
//         <div className={styles.modalOverlay} onClick={() => setShowOrderDetails(false)}>
//           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <button className={styles.closeButton} onClick={() => setShowOrderDetails(false)}>&times;</button>
//             <h2>Order Details #{selectedOrder._id?.slice(-6)}</h2>

//             <div className={styles.orderDetails}>
//               <div className={styles.detailSection}>
//                 <h3>Customer Information</h3>
//                 <p><strong>Name:</strong> {selectedOrder.userId?.name || "N/A"}</p>
//                 <p><strong>Email:</strong> {selectedOrder.userId?.email || "N/A"}</p>
//                 <p><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
//                 <p><strong>Status:</strong> <span className={`${styles.status} ${styles[selectedOrder.orderStatus]}`}>{selectedOrder.orderStatus}</span></p>
//               </div>

//               <div className={styles.detailSection}>
//                 <h3>Order Items</h3>
//                 {selectedOrder.books?.map((book, index) => (
//                   <div key={index} className={styles.orderItem}>
//                     <p><strong>Book:</strong> {book.name || `Book ${index + 1}`}</p>
//                     <p><strong>Quantity:</strong> {book.quantity}</p>
//                     <p><strong>Price:</strong> {formatCurrency(book.price)}</p>
//                     <p><strong>Subtotal:</strong> {formatCurrency(book.price * book.quantity)}</p>
//                   </div>
//                 ))}
//                 <div className={styles.orderTotal}><h3>Total: {formatCurrency(selectedOrder.totalAmount)}</h3></div>
//               </div>

//               <div className={styles.detailSection}>
//                 <h3>Update Status</h3>
//                 <select value={selectedOrder.orderStatus} onChange={(e) => { updateOrderStatus(selectedOrder._id, e.target.value); setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value }); }} className={styles.statusSelect}>
//                   <option value="processing">Processing</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, { useState, useEffect } from "react";
// import axios from "../services/api";
// import styles from "./AdminDashboard.module.css";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("orders");
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editingBook, setEditingBook] = useState(null);
//   const [showBookForm, setShowBookForm] = useState(false);
//   const [editingVideo, setEditingVideo] = useState(null);
//   const [showVideoForm, setShowVideoForm] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showOrderDetails, setShowOrderDetails] = useState(false);

//   // Loading states for uploads
//   const [isUploadingBook, setIsUploadingBook] = useState(false);
//   const [isUploadingVideo, setIsUploadingVideo] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   // Book form state
//   const [bookForm, setBookForm] = useState({
//     name: "",
//     author: "",
//     description: "",
//     price: "",
//     currency: "usd",
//     coverImage: null,
//     pdfUrl: null,
//   });

//   // Video form state
//   const [videoForm, setVideoForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     currency: "usd",
//     introVideo: null,
//     videoUrl: "",
//   });

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       let endpoint = "";
//       switch (activeTab) {
//         case "orders":
//           endpoint = "/orders";
//           break;
//         case "users":
//           endpoint = "/users";
//           break;
//         case "books":
//           endpoint = "/books";
//           break;
//         case "videos":
//           endpoint = "/videos";
//           break;
//         default:
//           endpoint = "/orders";
//       }

//       const res = await axios.get(endpoint, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (activeTab === "orders") setOrders(res.data.data || []);
//       if (activeTab === "users") setUsers(res.data.data || []);
//       if (activeTab === "books") setBooks(res.data.data || []);
//       if (activeTab === "videos") setVideos(res.data.data || []);
//     } catch (err) {
//       setError("Failed to fetch data");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Simulate upload progress
//   const simulateUploadProgress = () => {
//     setIsUploadingBook(true);
//     setIsUploadingVideo(true);
//     setUploadProgress(0);

//     const progressInterval = setInterval(() => {
//       setUploadProgress(prev => {
//         if (prev >= 90) {
//           clearInterval(progressInterval);
//           return 90;
//         }
//         return prev + 10;
//       });
//     }, 200);

//     return progressInterval;
//   };

//   // --- Orders ---
//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         `/orders/${orderId}/status`,
//         { orderStatus: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setOrders((prev) =>
//         prev.map((order) => (order._id === orderId ? res.data.data : order))
//       );
//       setSuccess("Order status updated successfully");
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to update order status");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const viewOrderDetails = (order) => {
//     setSelectedOrder(order);
//     setShowOrderDetails(true);
//   };

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-US");

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);

//   // --- Books ---
//   const handleBookSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const progressInterval = simulateUploadProgress();
      
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       formData.append("name", bookForm.name);
//       formData.append("author", bookForm.author);
//       formData.append("description", bookForm.description);
//       formData.append("price", bookForm.price);
//       formData.append("currency", bookForm.currency);
//       if (bookForm.coverImage) formData.append("coverImage", bookForm.coverImage);
//       if (bookForm.pdf) formData.append("pdf", bookForm.pdf);

//       const endpoint = editingBook ? `/books/${editingBook._id}` : "/books";
//       const method = editingBook ? "put" : "post";

//       await axios[method](endpoint, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           if (progressEvent.total) {
//             const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(progress);
//           }
//         },
//       });

//       setUploadProgress(100);
//       setTimeout(() => {
//         setIsUploadingBook(false);
//         setUploadProgress(0);
//         clearInterval(progressInterval);
//       }, 500);

//       setSuccess(editingBook ? "Book updated successfully" : "Book created successfully");
//       setShowBookForm(false);
//       setEditingBook(null);
//       setBookForm({
//         name: "",
//         author: "",
//         description: "",
//         price: "",
//         currency: "usd",
//         coverImage: null,
//       });
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setIsUploadingBook(false);
//       setUploadProgress(0);
//       setError("Failed to save book");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const deleteBook = async (bookId) => {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`/books/${bookId}`, { headers: { Authorization: `Bearer ${token}` } });
//       setSuccess("Book deleted successfully");
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to delete book");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const editBook = (book) => {
//     setEditingBook(book);
//     setBookForm({
//       name: book.name,
//       author: book.author,
//       description: book.description,
//       price: book.price,
//       currency: book.currency,
//       coverImage: null,
//     });
//     setShowBookForm(true);
//   };

//   // --- Videos ---
//   const handleVideoSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const progressInterval = simulateUploadProgress();
      
//       const token = localStorage.getItem("token");
//       const formData = new FormData();

//       formData.append("title", videoForm.title);
//       formData.append("description", videoForm.description);
//       formData.append("price", videoForm.price);
//       formData.append("currency", videoForm.currency);
//       formData.append("videoUrl", videoForm.videoUrl);
//       if (videoForm.introVideo) formData.append("introVideo", videoForm.introVideo);

//       const endpoint = editingVideo ? `/videos/${editingVideo._id}` : "/videos";
//       const method = editingVideo ? "put" : "post";

//       await axios[method](endpoint, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           if (progressEvent.total) {
//             const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(progress);
//           }
//         },
//       });

//       setUploadProgress(100);
//       setTimeout(() => {
//         setIsUploadingVideo(false);
//         setUploadProgress(0);
//         clearInterval(progressInterval);
//       }, 500);

//       setSuccess(editingVideo ? "Video updated successfully" : "Video created successfully");
//       setShowVideoForm(false);
//       setEditingVideo(null);
//       setVideoForm({
//         title: "",
//         description: "",
//         price: "",
//         currency: "usd",
//         introVideo: null,
//         videoUrl: "",
//       });
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setIsUploadingVideo(false);
//       setUploadProgress(0);
//       setError("Failed to save video");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const editVideo = (video) => {
//     setEditingVideo(video);
//     setVideoForm({
//       title: video.title,
//       description: video.description,
//       price: video.price,
//       currency: video.currency,
//       introVideo: null,
//       videoUrl: video.videoUrl,
//     });
//     setShowVideoForm(true);
//   };

//   const deleteVideo = async (videoId) => {
//     if (!window.confirm("Are you sure you want to delete this video?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`/videos/${videoId}`, { headers: { Authorization: `Bearer ${token}` } });
//       setSuccess("Video deleted successfully");
//       fetchData();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError("Failed to delete video");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   if (loading) return (
//     <div className={styles.loading}>
//       <div className={styles.loadingSpinner}></div>
//       Loading Dashboard...
//     </div>
//   );

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Admin Dashboard</h1>
//       {error && <div className={styles.error}>{error}</div>}
//       {success && <div className={styles.success}>{success}</div>}

//       {/* Tabs */}
//       <div className={styles.tabs}>
//         <button className={`${styles.tab} ${activeTab === "orders" ? styles.activeTab : ""}`} onClick={() => setActiveTab("orders")}>Orders</button>
//         <button className={`${styles.tab} ${activeTab === "users" ? styles.activeTab : ""}`} onClick={() => setActiveTab("users")}>Users</button>
//         <button className={`${styles.tab} ${activeTab === "books" ? styles.activeTab : ""}`} onClick={() => setActiveTab("books")}>Books</button>
//         <button className={`${styles.tab} ${activeTab === "videos" ? styles.activeTab : ""}`} onClick={() => setActiveTab("videos")}>Videos</button>
//       </div>

//       <div className={styles.content}>
//         {/* --- Orders --- */}
//         {activeTab === "orders" && (
//           <div className={styles.section}>
//             <h2>Orders ({orders?.length || 0})</h2>
//             <div className={styles.ordersGrid}>
//               {orders.map((order) => (
//                 <div key={order._id} className={styles.orderCard}>
//                   <div className={styles.orderHeader}>
//                     <h3>Order #{order._id?.slice(-6)}</h3>
//                     <span className={`${styles.status} ${styles[order.orderStatus]}`}>{order.orderStatus}</span>
//                   </div>
//                   <p><strong>Customer:</strong> {order.userId?.name || order.userId?.email || "N/A"}</p>
//                   <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
//                   <p><strong>Total:</strong> {formatCurrency(order.totalAmount)}</p>
//                   <p><strong>Items:</strong> {order.books?.length || 0} book(s)</p>
//                   <div className={styles.orderActions}>
//                     <select value={order.orderStatus} onChange={(e) => updateOrderStatus(order._id, e.target.value)}>
//                       <option value="processing">Processing</option>
//                       <option value="shipped">Shipped</option>
//                       <option value="delivered">Delivered</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                     <button className={styles.detailsButton} onClick={() => viewOrderDetails(order)}>View Details</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* --- Users --- */}
//         {activeTab === "users" && (
//           <div className={styles.section}>
//             <h2>Users ({users?.length || 0})</h2>
//             <table className={styles.usersTable}>
//               <thead>
//                 <tr>
//                   <th>Name</th><th>Email</th><th>Joined</th><th>Role</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id}>
//                     <td>{user.name || "N/A"}</td>
//                     <td>{user.email}</td>
//                     <td>{formatDate(user.createdAt)}</td>
//                     <td>{user.role || "user"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* --- Books --- */}
//         {activeTab === "books" && (
//           <div className={styles.section}>
//             <div className={styles.sectionHeader}>
//               <h2>Books ({books?.length || 0})</h2>
//               <button 
//                 className={styles.addButton} 
//                 onClick={() => setShowBookForm(true)}
//                 disabled={isUploadingBook}
//               >
//                 Add New Book
//               </button>
//             </div>

//             {/* Book Form */}
//             {showBookForm && (
//               <div className={styles.modalOverlay}>
//                 <div className={styles.modal}>
//                   <button className={styles.closeButton} onClick={() => { setShowBookForm(false); setEditingBook(null); setBookForm({ name: "", author: "", description: "", price: "", currency: "usd", coverImage: null }); }}>&times;</button>
//                   <h3>{editingBook ? "Edit Book" : "Add New Book"}</h3>
                  
//                   {/* Upload Progress Indicator */}
//                   {isUploadingBook && (
//                     <div className={styles.uploading}>
//                       <div className={styles.uploadingSpinner}></div>
//                       <span>Uploading... {uploadProgress}%</span>
//                       <div className={styles.uploadProgress}>
//                         <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}></div>
//                       </div>
//                     </div>
//                   )}

//                   <form onSubmit={handleBookSubmit} className={styles.bookForm}>
//                     <input 
//                       type="text" 
//                       placeholder="Book Name" 
//                       value={bookForm.name} 
//                       onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })} 
//                       required 
//                       disabled={isUploadingBook}
//                     />
//                     <input 
//                       type="text" 
//                       placeholder="Author" 
//                       value={bookForm.author} 
//                       onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })} 
//                       required 
//                       disabled={isUploadingBook}
//                     />
//                     <textarea 
//                       placeholder="Description" 
//                       value={bookForm.description} 
//                       onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })} 
//                       required 
//                       disabled={isUploadingBook}
//                     />
//                     <input 
//                       type="number" 
//                       placeholder="Price" 
//                       value={bookForm.price} 
//                       onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })} 
//                       step="0.01" 
//                       required 
//                       disabled={isUploadingBook}
//                     />
//                     <select 
//                       value={bookForm.currency} 
//                       onChange={(e) => setBookForm({ ...bookForm, currency: e.target.value })}
//                       disabled={isUploadingBook}
//                     >
//                       <option value="usd">USD</option>
//                       <option value="eur">EUR</option>
//                       <option value="gbp">GBP</option>
//                     </select>
//                     <input 
//                       type="file" 
//                       accept="image/*" 
//                       onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.files[0] })}
//                       disabled={isUploadingBook}
//                     />
//                     <input 
//                       type="file" 
//                       accept="application/pdf" 
//                       onChange={(e) => setBookForm({ ...bookForm, pdf: e.target.files[0] })}
//                       disabled={isUploadingBook}
//                       />
//                     <div className={styles.formButtons}>
//                       <button 
//                         type="submit" 
//                         className={styles.saveButton} 
//                         disabled={isUploadingBook}
//                       >
//                         {isUploadingBook ? (
//                           <>
//                             <div className={styles.uploadingSpinner}></div>
//                             Uploading...
//                           </>
//                         ) : (
//                           editingBook ? "Update Book" : "Create Book"
//                         )}
//                       </button>
//                       <button 
//                         type="button" 
//                         className={styles.cancelButton} 
//                         onClick={() => { setShowBookForm(false); setEditingBook(null); setBookForm({ name: "", author: "", description: "", price: "", currency: "usd", coverImage: null }); }}
//                         disabled={isUploadingBook}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Books List */}
//             <div className={styles.booksGrid}>
//               {books.map((book) => (
//                 <div key={book._id} className={styles.bookCard}>
//                   {book.coverImage && <img src={book.coverImage} alt={book.name} className={styles.bookImage} />}
//                   <h3>{book.name}</h3>
//                   <p><strong>Author:</strong> {book.author}</p>
//                   <p><strong>Price:</strong> {formatCurrency(book.price)}</p>
//                   <div className={styles.bookActions}>
//                     <button onClick={() => editBook(book)} disabled={isUploadingBook}>Edit</button>
//                     <button onClick={() => deleteBook(book._id)} disabled={isUploadingBook}>Delete</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* --- Videos --- */}
//         {activeTab === "videos" && (
//           <div className={styles.section}>
//             <div className={styles.sectionHeader}>
//               <h2>Videos ({videos?.length || 0})</h2>
//               <button 
//                 className={styles.addButton} 
//                 onClick={() => setShowVideoForm(true)}
//                 disabled={isUploadingVideo}
//               >
//                 Add New Video
//               </button>
//             </div>

//             {/* Video Form */}
//             {showVideoForm && (
//               <div className={styles.modalOverlay}>
//                 <div className={styles.modal}>
//                   <button className={styles.closeButton} onClick={() => { setShowVideoForm(false); setEditingVideo(null); setVideoForm({ title: "", description: "", price: "", currency: "usd", introVideo: null, videoUrl: "" }); }}>&times;</button>
//                   <h3>{editingVideo ? "Edit Video" : "Add New Video"}</h3>
                  
//                   {/* Upload Progress Indicator */}
//                   {isUploadingVideo && (
//                     <div className={styles.uploading}>
//                       <div className={styles.uploadingSpinner}></div>
//                       <span>Uploading... {uploadProgress}%</span>
//                       <div className={styles.uploadProgress}>
//                         <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}></div>
//                       </div>
//                     </div>
//                   )}

//                   <form onSubmit={handleVideoSubmit} className={styles.bookForm}>
//                     <input 
//                       type="text" 
//                       placeholder="Title" 
//                       value={videoForm.title} 
//                       onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })} 
//                       required 
//                       disabled={isUploadingVideo}
//                     />
//                     <textarea 
//                       placeholder="Description" 
//                       value={videoForm.description} 
//                       onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })} 
//                       required 
//                       disabled={isUploadingVideo}
//                     />
//                     <input 
//                       type="number" 
//                       placeholder="Price" 
//                       value={videoForm.price} 
//                       onChange={(e) => setVideoForm({ ...videoForm, price: e.target.value })} 
//                       step="0.01" 
//                       required 
//                       disabled={isUploadingVideo}
//                     />
//                     <select 
//                       value={videoForm.currency} 
//                       onChange={(e) => setVideoForm({ ...videoForm, currency: e.target.value })}
//                       disabled={isUploadingVideo}
//                     >
//                       <option value="usd">USD</option>
//                       <option value="eur">EUR</option>
//                       <option value="gbp">GBP</option>
//                     </select>
//                     <input 
//                       type="file" 
//                       accept="video/*" 
//                       onChange={(e) => setVideoForm({ ...videoForm, introVideo: e.target.files[0] })}
//                       disabled={isUploadingVideo}
//                     />
//                     <input 
//                       type="text" 
//                       placeholder="Full Video URL" 
//                       value={videoForm.videoUrl} 
//                       onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
//                       disabled={isUploadingVideo}
//                     />
//                     <div className={styles.formButtons}>
//                       <button 
//                         type="submit" 
//                         className={styles.saveButton}
//                         disabled={isUploadingVideo}
//                       >
//                         {isUploadingVideo ? (
//                           <>
//                             <div className={styles.uploadingSpinner}></div>
//                             Uploading...
//                           </>
//                         ) : (
//                           editingVideo ? "Update Video" : "Create Video"
//                         )}
//                       </button>
//                       <button 
//                         type="button" 
//                         className={styles.cancelButton}
//                         onClick={() => { setShowVideoForm(false); setEditingVideo(null); setVideoForm({ title: "", description: "", price: "", currency: "usd", introVideo: null, videoUrl: "" }); }}
//                         disabled={isUploadingVideo}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Videos List */}
//             <div className={styles.booksGrid}>
//               {videos.map((video) => (
//                 <div key={video._id} className={styles.bookCard}>
//                   {video.introVideo && <video src={video.introVideo} controls className={styles.bookImage} />}
//                   <h3>{video.title}</h3>
//                   <p>{video.description}</p>
//                   <p><strong>Price:</strong> {formatCurrency(video.price)}</p>
//                   <p><strong>Full Video URL:</strong> {video.videoUrl ? <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">Watch</a> : "N/A"}</p>
//                   <div className={styles.bookActions}>
//                     <button onClick={() => editVideo(video)} disabled={isUploadingVideo}>Edit</button>
//                     <button onClick={() => deleteVideo(video._id)} disabled={isUploadingVideo}>Delete</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* --- Order Details Modal --- */}
//       {showOrderDetails && selectedOrder && (
//         <div className={styles.modalOverlay} onClick={() => setShowOrderDetails(false)}>
//           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <button className={styles.closeButton} onClick={() => setShowOrderDetails(false)}>&times;</button>
//             <h2>Order Details #{selectedOrder._id?.slice(-6)}</h2>

//             <div className={styles.orderDetails}>
//               <div className={styles.detailSection}>
//                 <h3>Customer Information</h3>
//                 <p><strong>Name:</strong> {selectedOrder.userId?.name || "N/A"}</p>
//                 <p><strong>Email:</strong> {selectedOrder.userId?.email || "N/A"}</p>
//                 <p><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
//                 <p><strong>Status:</strong> <span className={`${styles.status} ${styles[selectedOrder.orderStatus]}`}>{selectedOrder.orderStatus}</span></p>
//               </div>

//               <div className={styles.detailSection}>
//                 <h3>Order Items</h3>
//                 {selectedOrder.books?.map((book, index) => (
//                   <div key={index} className={styles.orderItem}>
//                     <p><strong>Book:</strong> {book.name || `Book ${index + 1}`}</p>
//                     <p><strong>Quantity:</strong> {book.quantity}</p>
//                     <p><strong>Price:</strong> {formatCurrency(book.price)}</p>
//                     <p><strong>Subtotal:</strong> {formatCurrency(book.price * book.quantity)}</p>
//                   </div>
//                 ))}
//                 <div className={styles.orderTotal}><h3>Total: {formatCurrency(selectedOrder.totalAmount)}</h3></div>
//               </div>

//               <div className={styles.detailSection}>
//                 <h3>Update Status</h3>
//                 <select value={selectedOrder.orderStatus} onChange={(e) => { updateOrderStatus(selectedOrder._id, e.target.value); setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value }); }} className={styles.statusSelect}>
//                   <option value="processing">Processing</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from "react";
import axios from "../services/api";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [showBookForm, setShowBookForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Loading states for uploads
  const [isUploadingBook, setIsUploadingBook] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Book form state
  const [bookForm, setBookForm] = useState({
    name: "",
    author: "",
    description: "",
    price: "",
    currency: "usd",
    coverImage: null,
    pdf: null,
  });

  // Video form state
  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    price: "",
    currency: "usd",
    introVideo: null,
    videoUrl: "",
    pdf: null, // Added PDF for videos
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      let endpoint = "";
      switch (activeTab) {
        case "orders":
          endpoint = "/orders";
          break;
        case "users":
          endpoint = "/users";
          break;
        case "books":
          endpoint = "/books";
          break;
        case "videos":
          endpoint = "/videos";
          break;
        default:
          endpoint = "/orders";
      }

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (activeTab === "orders") setOrders(res.data.data || []);
      if (activeTab === "users") setUsers(res.data.data || []);
      if (activeTab === "books") setBooks(res.data.data || []);
      if (activeTab === "videos") setVideos(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Simulate upload progress
  const simulateUploadProgress = () => {
    setIsUploadingBook(true);
    setIsUploadingVideo(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    return progressInterval;
  };

  // --- Orders ---
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/orders/${orderId}/status`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data.data : order))
      );
      setSuccess("Order status updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update order status");
      setTimeout(() => setError(""), 3000);
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US");

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  // --- Books ---
  const handleBookSubmit = async (e) => {
    e.preventDefault();
    try {
      const progressInterval = simulateUploadProgress();
      
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", bookForm.name);
      formData.append("author", bookForm.author);
      formData.append("description", bookForm.description);
      formData.append("price", bookForm.price);
      formData.append("currency", bookForm.currency);
      if (bookForm.coverImage) formData.append("coverImage", bookForm.coverImage);
      if (bookForm.pdf) formData.append("pdf", bookForm.pdf);

      const endpoint = editingBook ? `/books/${editingBook._id}` : "/books";
      const method = editingBook ? "put" : "post";

      await axios[method](endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      });

      setUploadProgress(100);
      setTimeout(() => {
        setIsUploadingBook(false);
        setUploadProgress(0);
        clearInterval(progressInterval);
      }, 500);

      setSuccess(editingBook ? "Book updated successfully" : "Book created successfully");
      setShowBookForm(false);
      setEditingBook(null);
      setBookForm({
        name: "",
        author: "",
        description: "",
        price: "",
        currency: "usd",
        coverImage: null,
        pdf: null,
      });
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setIsUploadingBook(false);
      setUploadProgress(0);
      setError("Failed to save book");
      setTimeout(() => setError(""), 3000);
    }
  };

  const deleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/books/${bookId}`, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess("Book deleted successfully");
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete book");
      setTimeout(() => setError(""), 3000);
    }
  };

  const editBook = (book) => {
    setEditingBook(book);
    setBookForm({
      name: book.name,
      author: book.author,
      description: book.description,
      price: book.price,
      currency: book.currency,
      coverImage: null,
      pdf: null,
    });
    setShowBookForm(true);
  };

  // --- Videos ---
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      const progressInterval = simulateUploadProgress();
      
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", videoForm.title);
      formData.append("description", videoForm.description);
      formData.append("price", videoForm.price);
      formData.append("currency", videoForm.currency);
      formData.append("videoUrl", videoForm.videoUrl);
      if (videoForm.introVideo) formData.append("introVideo", videoForm.introVideo);
      if (videoForm.pdf) formData.append("pdf", videoForm.pdf); // Added PDF for videos

      const endpoint = editingVideo ? `/videos/${editingVideo._id}` : "/videos";
      const method = editingVideo ? "put" : "post";

      await axios[method](endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      });

      setUploadProgress(100);
      setTimeout(() => {
        setIsUploadingVideo(false);
        setUploadProgress(0);
        clearInterval(progressInterval);
      }, 500);

      setSuccess(editingVideo ? "Video updated successfully" : "Video created successfully");
      setShowVideoForm(false);
      setEditingVideo(null);
      setVideoForm({
        title: "",
        description: "",
        price: "",
        currency: "usd",
        introVideo: null,
        videoUrl: "",
        pdf: null,
      });
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setIsUploadingVideo(false);
      setUploadProgress(0);
      setError("Failed to save video");
      setTimeout(() => setError(""), 3000);
    }
  };

  const editVideo = (video) => {
    setEditingVideo(video);
    setVideoForm({
      title: video.title,
      description: video.description,
      price: video.price,
      currency: video.currency,
      introVideo: null,
      videoUrl: video.videoUrl,
      pdf: null,
    });
    setShowVideoForm(true);
  };

  const deleteVideo = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/videos/${videoId}`, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess("Video deleted successfully");
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete video");
      setTimeout(() => setError(""), 3000);
    }
  };

  // PDF file validation
  const validatePdf = (file) => {
    if (!file) return true;
    
    const validTypes = ['application/pdf'];
    const maxSize = 50 * 1024 * 1024; // 50MB
    
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid PDF file");
      return false;
    }
    
    if (file.size > maxSize) {
      setError("PDF file size must be less than 50MB");
      return false;
    }
    
    return true;
  };

  if (loading) return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}></div>
      Loading Dashboard...
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === "orders" ? styles.activeTab : ""}`} onClick={() => setActiveTab("orders")}>Orders</button>
        <button className={`${styles.tab} ${activeTab === "users" ? styles.activeTab : ""}`} onClick={() => setActiveTab("users")}>Users</button>
        <button className={`${styles.tab} ${activeTab === "books" ? styles.activeTab : ""}`} onClick={() => setActiveTab("books")}>Books</button>
        <button className={`${styles.tab} ${activeTab === "videos" ? styles.activeTab : ""}`} onClick={() => setActiveTab("videos")}>Videos</button>
      </div>

      <div className={styles.content}>
        {/* --- Orders --- */}
        {activeTab === "orders" && (
          <div className={styles.section}>
            <h2>Orders ({orders?.length || 0})</h2>
            <div className={styles.ordersGrid}>
              {orders.map((order) => (
                <div key={order._id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <h3>Order #{order._id?.slice(-6)}</h3>
                    <span className={`${styles.status} ${styles[order.orderStatus]}`}>{order.orderStatus}</span>
                  </div>
                  <p><strong>Customer:</strong> {order.userId?.name || order.userId?.email || "N/A"}</p>
                  <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                  <p><strong>Total:</strong> {formatCurrency(order.totalAmount)}</p>
                  <p><strong>Items:</strong> {order.books?.length || 0} book(s)</p>
                  <div className={styles.orderActions}>
                    <select value={order.orderStatus} onChange={(e) => updateOrderStatus(order._id, e.target.value)}>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button className={styles.detailsButton} onClick={() => viewOrderDetails(order)}>View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Users --- */}
        {activeTab === "users" && (
          <div className={styles.section}>
            <h2>Users ({users?.length || 0})</h2>
            <table className={styles.usersTable}>
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Joined</th><th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name || "N/A"}</td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>{user.role || "user"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- Books --- */}
        {activeTab === "books" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Books ({books?.length || 0})</h2>
              <button 
                className={styles.addButton} 
                onClick={() => setShowBookForm(true)}
                disabled={isUploadingBook}
              >
                Add New Book
              </button>
            </div>

            {/* Book Form */}
            {showBookForm && (
              <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                  <button className={styles.closeButton} onClick={() => { 
                    setShowBookForm(false); 
                    setEditingBook(null); 
                    setBookForm({ 
                      name: "", 
                      author: "", 
                      description: "", 
                      price: "", 
                      currency: "usd", 
                      coverImage: null,
                      pdf: null 
                    }); 
                  }}>&times;</button>
                  <h3>{editingBook ? "Edit Book" : "Add New Book"}</h3>
                  
                  {/* Upload Progress Indicator */}
                  {isUploadingBook && (
                    <div className={styles.uploading}>
                      <div className={styles.uploadingSpinner}></div>
                      <span>Uploading... {uploadProgress}%</span>
                      <div className={styles.uploadProgress}>
                        <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleBookSubmit} className={styles.bookForm}>
                    <input 
                      type="text" 
                      placeholder="Book Name" 
                      value={bookForm.name} 
                      onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })} 
                      required 
                      disabled={isUploadingBook}
                    />
                    <input 
                      type="text" 
                      placeholder="Author" 
                      value={bookForm.author} 
                      onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })} 
                      required 
                      disabled={isUploadingBook}
                    />
                    <textarea 
                      placeholder="Description" 
                      value={bookForm.description} 
                      onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })} 
                      required 
                      disabled={isUploadingBook}
                    />
                    <input 
                      type="number" 
                      placeholder="Price" 
                      value={bookForm.price} 
                      onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })} 
                      step="0.01" 
                      required 
                      disabled={isUploadingBook}
                    />
                    <select 
                      value={bookForm.currency} 
                      onChange={(e) => setBookForm({ ...bookForm, currency: e.target.value })}
                      disabled={isUploadingBook}
                    >
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                    </select>
                    
                    {/* Cover Image Upload */}
                    <div className={styles.fileInputGroup}>
                      <label className={styles.fileInputLabel}>Cover Image</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.files[0] })}
                        disabled={isUploadingBook}
                        className={styles.fileInput}
                      />
                      {bookForm.coverImage && (
                        <span className={styles.fileName}>{bookForm.coverImage.name}</span>
                      )}
                    </div>

                    {/* PDF File Upload */}
                    <div className={styles.fileInputGroup}>
                      <label className={styles.fileInputLabel}>PDF File (Optional)</label>
                      <input 
                        type="file" 
                        accept="application/pdf" 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (validatePdf(file)) {
                            setBookForm({ ...bookForm, pdf: file });
                          } else {
                            e.target.value = ""; // Clear the file input
                          }
                        }}
                        disabled={isUploadingBook}
                        className={styles.fileInput}
                      />
                      {bookForm.pdf && (
                        <span className={styles.fileName}>{bookForm.pdf.name}</span>
                      )}
                      <small className={styles.fileHint}>Max 50MB, PDF format only</small>
                    </div>

                    <div className={styles.formButtons}>
                      <button 
                        type="submit" 
                        className={styles.saveButton} 
                        disabled={isUploadingBook}
                      >
                        {isUploadingBook ? (
                          <>
                            <div className={styles.uploadingSpinner}></div>
                            Uploading...
                          </>
                        ) : (
                          editingBook ? "Update Book" : "Create Book"
                        )}
                      </button>
                      <button 
                        type="button" 
                        className={styles.cancelButton} 
                        onClick={() => { 
                          setShowBookForm(false); 
                          setEditingBook(null); 
                          setBookForm({ 
                            name: "", 
                            author: "", 
                            description: "", 
                            price: "", 
                            currency: "usd", 
                            coverImage: null,
                            pdf: null 
                          }); 
                        }}
                        disabled={isUploadingBook}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Books List */}
            <div className={styles.booksGrid}>
              {books.map((book) => (
                <div key={book._id} className={styles.bookCard}>
                  {book.coverImage && <img src={book.coverImage} alt={book.name} className={styles.bookImage} />}
                  <h3>{book.name}</h3>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Price:</strong> {formatCurrency(book.price)}</p>
                  {book.pdf && (
                    <div className={styles.pdfIndicator}>
                      <span className={styles.pdfIcon}>📄</span>
                      PDF Available
                    </div>
                  )}
                  <div className={styles.bookActions}>
                    <button onClick={() => editBook(book)} disabled={isUploadingBook}>Edit</button>
                    <button onClick={() => deleteBook(book._id)} disabled={isUploadingBook}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Videos --- */}
        {activeTab === "videos" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Videos ({videos?.length || 0})</h2>
              <button 
                className={styles.addButton} 
                onClick={() => setShowVideoForm(true)}
                disabled={isUploadingVideo}
              >
                Add New Video
              </button>
            </div>

            {/* Video Form */}
            {showVideoForm && (
              <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                  <button className={styles.closeButton} onClick={() => { 
                    setShowVideoForm(false); 
                    setEditingVideo(null); 
                    setVideoForm({ 
                      title: "", 
                      description: "", 
                      price: "", 
                      currency: "usd", 
                      introVideo: null, 
                      videoUrl: "",
                      pdf: null 
                    }); 
                  }}>&times;</button>
                  <h3>{editingVideo ? "Edit Video" : "Add New Video"}</h3>
                  
                  {/* Upload Progress Indicator */}
                  {isUploadingVideo && (
                    <div className={styles.uploading}>
                      <div className={styles.uploadingSpinner}></div>
                      <span>Uploading... {uploadProgress}%</span>
                      <div className={styles.uploadProgress}>
                        <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleVideoSubmit} className={styles.bookForm}>
                    <input 
                      type="text" 
                      placeholder="Title" 
                      value={videoForm.title} 
                      onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })} 
                      required 
                      disabled={isUploadingVideo}
                    />
                    <textarea 
                      placeholder="Description" 
                      value={videoForm.description} 
                      onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })} 
                      required 
                      disabled={isUploadingVideo}
                    />
                    <input 
                      type="number" 
                      placeholder="Price" 
                      value={videoForm.price} 
                      onChange={(e) => setVideoForm({ ...videoForm, price: e.target.value })} 
                      step="0.01" 
                      required 
                      disabled={isUploadingVideo}
                    />
                    <select 
                      value={videoForm.currency} 
                      onChange={(e) => setVideoForm({ ...videoForm, currency: e.target.value })}
                      disabled={isUploadingVideo}
                    >
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                    </select>

                    {/* Intro Video Upload */}
                    <div className={styles.fileInputGroup}>
                      <label className={styles.fileInputLabel}>Intro Video</label>
                      <input 
                        type="file" 
                        accept="video/*" 
                        onChange={(e) => setVideoForm({ ...videoForm, introVideo: e.target.files[0] })}
                        disabled={isUploadingVideo}
                        className={styles.fileInput}
                      />
                      {videoForm.introVideo && (
                        <span className={styles.fileName}>{videoForm.introVideo.name}</span>
                      )}
                    </div>

                    <input 
                      type="text" 
                      placeholder="Full Video URL" 
                      value={videoForm.videoUrl} 
                      onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                      disabled={isUploadingVideo}
                    />

                    {/* PDF File Upload for Videos */}
                    <div className={styles.fileInputGroup}>
                      <label className={styles.fileInputLabel}>PDF Resources (Optional)</label>
                      <input 
                        type="file" 
                        accept="application/pdf" 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (validatePdf(file)) {
                            setVideoForm({ ...videoForm, pdf: file });
                          } else {
                            e.target.value = ""; // Clear the file input
                          }
                        }}
                        disabled={isUploadingVideo}
                        className={styles.fileInput}
                      />
                      {videoForm.pdf && (
                        <span className={styles.fileName}>{videoForm.pdf.name}</span>
                      )}
                      <small className={styles.fileHint}>Max 50MB, PDF format only</small>
                    </div>

                    <div className={styles.formButtons}>
                      <button 
                        type="submit" 
                        className={styles.saveButton}
                        disabled={isUploadingVideo}
                      >
                        {isUploadingVideo ? (
                          <>
                            <div className={styles.uploadingSpinner}></div>
                            Uploading...
                          </>
                        ) : (
                          editingVideo ? "Update Video" : "Create Video"
                        )}
                      </button>
                      <button 
                        type="button" 
                        className={styles.cancelButton}
                        onClick={() => { 
                          setShowVideoForm(false); 
                          setEditingVideo(null); 
                          setVideoForm({ 
                            title: "", 
                            description: "", 
                            price: "", 
                            currency: "usd", 
                            introVideo: null, 
                            videoUrl: "",
                            pdf: null 
                          }); 
                        }}
                        disabled={isUploadingVideo}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Videos List */}
            <div className={styles.booksGrid}>
              {videos.map((video) => (
                <div key={video._id} className={styles.bookCard}>
                  {video.introVideo && <video src={video.introVideo} controls className={styles.bookImage} />}
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <p><strong>Price:</strong> {formatCurrency(video.price)}</p>
                  <p><strong>Full Video URL:</strong> {video.videoUrl ? <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">Watch</a> : "N/A"}</p>
                  {video.pdf && (
                    <div className={styles.pdfIndicator}>
                      <span className={styles.pdfIcon}>📄</span>
                      PDF Resources Available
                    </div>
                  )}
                  <div className={styles.bookActions}>
                    <button onClick={() => editVideo(video)} disabled={isUploadingVideo}>Edit</button>
                    <button onClick={() => deleteVideo(video._id)} disabled={isUploadingVideo}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Order Details Modal --- */}
      {showOrderDetails && selectedOrder && (
        <div className={styles.modalOverlay} onClick={() => setShowOrderDetails(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowOrderDetails(false)}>&times;</button>
            <h2>Order Details #{selectedOrder._id?.slice(-6)}</h2>

            <div className={styles.orderDetails}>
              <div className={styles.detailSection}>
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {selectedOrder.userId?.name || "N/A"}</p>
                <p><strong>Email:</strong> {selectedOrder.userId?.email || "N/A"}</p>
                <p><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                <p><strong>Status:</strong> <span className={`${styles.status} ${styles[selectedOrder.orderStatus]}`}>{selectedOrder.orderStatus}</span></p>
              </div>

              <div className={styles.detailSection}>
                <h3>Order Items</h3>
                {selectedOrder.books?.map((book, index) => (
                  <div key={index} className={styles.orderItem}>
                    <p><strong>Book:</strong> {book.name || `Book ${index + 1}`}</p>
                    <p><strong>Quantity:</strong> {book.quantity}</p>
                    <p><strong>Price:</strong> {formatCurrency(book.price)}</p>
                    <p><strong>Subtotal:</strong> {formatCurrency(book.price * book.quantity)}</p>
                  </div>
                ))}
                <div className={styles.orderTotal}><h3>Total: {formatCurrency(selectedOrder.totalAmount)}</h3></div>
              </div>

              <div className={styles.detailSection}>
                <h3>Update Status</h3>
                <select value={selectedOrder.orderStatus} onChange={(e) => { updateOrderStatus(selectedOrder._id, e.target.value); setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value }); }} className={styles.statusSelect}>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;