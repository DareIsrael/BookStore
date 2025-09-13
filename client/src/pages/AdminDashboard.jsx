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


import React, { useState, useEffect } from "react";
import axios from "../services/api";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [showBookForm, setShowBookForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Form state
  const [bookForm, setBookForm] = useState({
    name: "",
    author: "",
    description: "",
    price: "",
    currency: "usd",
    coverImage: null,
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
        default:
          endpoint = "/orders";
      }

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (activeTab === "orders") setOrders(res.data.data || []);
      if (activeTab === "users") setUsers(res.data.data || []);
      if (activeTab === "books") setBooks(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/orders/${orderId}/status`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? res.data.data : order
        )
      );
      setSuccess("Order status updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update order status");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", bookForm.name);
      formData.append("author", bookForm.author);
      formData.append("description", bookForm.description);
      formData.append("price", bookForm.price);
      formData.append("currency", bookForm.currency);
      if (bookForm.coverImage) {
        formData.append("coverImage", bookForm.coverImage);
      }

      const endpoint = editingBook
        ? `/books/${editingBook._id}`
        : "/books";

      const method = editingBook ? "put" : "post";

      const res = await axios[method](endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(
        editingBook ? "Book updated successfully" : "Book created successfully"
      );
      setShowBookForm(false);
      setEditingBook(null);
      setBookForm({
        name: "",
        author: "",
        description: "",
        price: "",
        currency: "usd",
        coverImage: null,
      });
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to save book");
      setTimeout(() => setError(""), 3000);
    }
  };

  const deleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Book deleted successfully");
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete book");
      setTimeout(() => setError(""), 3000);
    }
  };

  const createStripeProduct = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/stripe/create-product/${bookId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Stripe product created successfully");
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to create Stripe product");
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
    });
    setShowBookForm(true);
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "orders" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "users" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "books" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("books")}
        >
          Books
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "orders" && (
          <div className={styles.section}>
            <h2>Orders ({orders?.length || 0})</h2>
            <div className={styles.ordersGrid}>
              {orders.map((order) => (
                <div key={order._id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <h3>Order #{order._id?.slice(-6)}</h3>
                    <span
                      className={`${styles.status} ${
                        styles[order.orderStatus]
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  <p>
                    <strong>Customer:</strong>{" "}
                    {order.userId?.name || order.userId?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Date:</strong> {formatDate(order.createdAt)}
                  </p>
                  <p>
                    <strong>Total:</strong> {formatCurrency(order.totalAmount)}
                  </p>
                  <p>
                    <strong>Items:</strong> {order.books?.length || 0} book(s)
                  </p>
                  
                  {/* Address Preview */}
                  {order.address && (
                    <div className={styles.addressPreview}>
                      <p>
                        <strong>Delivery to:</strong> {order.address.city}, {order.address.state}
                      </p>
                    </div>
                  )}
                  
                  <div className={styles.orderActions}>
                    <div className={styles.statusUpdate}>
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <button
                      className={styles.detailsButton}
                      onClick={() => viewOrderDetails(order)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className={styles.section}>
            <h2>Users ({users?.length || 0})</h2>
            <div className={styles.usersTable}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Role</th>
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
          </div>
        )}

        {activeTab === "books" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Books ({books?.length || 0})</h2>
              <button
                className={styles.addButton}
                onClick={() => setShowBookForm(true)}
              >
                Add New Book
              </button>
            </div>

            {/* Book Form Modal */}
            {showBookForm && (
              <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                  <h3>{editingBook ? "Edit Book" : "Add New Book"}</h3>
                  <form onSubmit={handleBookSubmit} className={styles.bookForm}>
                    <input
                      type="text"
                      placeholder="Book Name"
                      value={bookForm.name}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, name: e.target.value })
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Author"
                      value={bookForm.author}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, author: e.target.value })
                      }
                      required
                    />
                    <textarea
                      placeholder="Description"
                      value={bookForm.description}
                      onChange={(e) =>
                        setBookForm({
                          ...bookForm,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={bookForm.price}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, price: e.target.value })
                      }
                      step="0.01"
                      required
                    />
                    <select
                      value={bookForm.currency}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, currency: e.target.value })
                      }
                    >
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                    </select>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setBookForm({
                          ...bookForm,
                          coverImage: e.target.files[0],
                        })
                      }
                    />
                    <div className={styles.formButtons}>
                      <button type="submit" className={styles.saveButton}>
                        {editingBook ? "Update Book" : "Create Book"}
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
                          });
                        }}
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
                  {book.coverImage && (
                    <img
                      src={book.coverImage}
                      alt={book.name}
                      className={styles.bookImage}
                    />
                  )}
                  <h3>{book.name}</h3>
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Price:</strong> {formatCurrency(book.price)}
                  </p>
                  <p>
                    <strong>Stripe:</strong>{" "}
                    {book.stripeProductId ? "✅ Connected" : "❌ Not connected"}
                  </p>
                  <div className={styles.bookActions}>
                    <button
                      className={styles.editButton}
                      onClick={() => editBook(book)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteBook(book._id)}
                    >
                      Delete
                    </button>
                    {!book.stripeProductId && (
                      <button
                        className={styles.stripeButton}
                        onClick={() => createStripeProduct(book._id)}
                      >
                        Create Stripe Product
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className={styles.modalOverlay} onClick={() => setShowOrderDetails(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={() => setShowOrderDetails(false)}
            >
              &times;
            </button>
            
            <h2>Order Details #{selectedOrder._id?.slice(-6)}</h2>
            
            <div className={styles.orderDetails}>
              <div className={styles.detailSection}>
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {selectedOrder.userId?.name || "N/A"}</p>
                <p><strong>Email:</strong> {selectedOrder.userId?.email || "N/A"}</p>
                <p><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                <p><strong>Status:</strong> 
                  <span className={`${styles.status} ${styles[selectedOrder.orderStatus]}`}>
                    {selectedOrder.orderStatus}
                  </span>
                </p>
              </div>

              <div className={styles.detailSection}>
                <h3>Delivery Address</h3>
                {selectedOrder.address ? (
                  <>
                    <p><strong>Name:</strong> {selectedOrder.address.name}</p>
                    <p><strong>Phone:</strong> {selectedOrder.address.phone}</p>
                    <p><strong>Street:</strong> {selectedOrder.address.street}</p>
                    <p><strong>City:</strong> {selectedOrder.address.city}</p>
                    <p><strong>State:</strong> {selectedOrder.address.state}</p>
                    <p><strong>Postal Code:</strong> {selectedOrder.address.postalCode}</p>
                    <p><strong>Country:</strong> {selectedOrder.address.country}</p>
                  </>
                ) : (
                  <p>No address information available</p>
                )}
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
                <div className={styles.orderTotal}>
                  <h3>Total: {formatCurrency(selectedOrder.totalAmount)}</h3>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3>Update Status</h3>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => {
                    updateOrderStatus(selectedOrder._id, e.target.value);
                    setSelectedOrder({
                      ...selectedOrder,
                      orderStatus: e.target.value
                    });
                  }}
                  className={styles.statusSelect}
                >
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
