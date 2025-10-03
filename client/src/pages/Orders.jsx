// // src/pages/Orders.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./Orders.module.css";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/orders/my-orders`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("Fetched orders (Orders page):", res.data);
//         setOrders(res.data.data || []);
//       } catch (err) {
//         console.error("Error fetching orders:", err.response?.data || err.message);
//         setError("Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };

    

//     fetchOrders();
//   }, []);

//   if (loading) return <p>Loading orders...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Orders</h1>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order._id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
//             <h3>Order #{order._id}</h3>
//             <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
//             <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
//             <p><strong>Order Status:</strong> {order.orderStatus}</p>
//             <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            
//             <h4>Books:</h4>
//             {order.books.map((bookItem) => (
//               <div key={bookItem.bookId._id} style={{ marginLeft: "20px", marginBottom: "10px" }}>
//                 <p><strong>Title:</strong> {bookItem.bookId.name}</p>
//                 <p><strong>Author:</strong> {bookItem.bookId.author}</p>
//                 <p><strong>Quantity:</strong> {bookItem.quantity}</p>
//                 <p><strong>Price:</strong> ${bookItem.price}</p>
//                 {bookItem.bookId.coverImage && (
//                   <img 
//                     src={bookItem.bookId.coverImage} 
//                     alt={bookItem.bookId.title} 
//                     style={{ width: "100px", height: "auto" }}
//                   />
//                 )}
//                 <hr />
//               </div>
//             ))}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


// src/pages/Orders.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./Orders.module.css";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/orders/my-orders`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("Fetched orders (Orders page):", res.data);
//         setOrders(res.data.data || []);
//       } catch (err) {
//         console.error("Error fetching orders:", err.response?.data || err.message);
//         setError("Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <div className={styles.loading}>Loading orders...</div>;
//   if (error) return <div className={styles.error}>{error}</div>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>My Orders</h1>
//         <p>View your order history and track your purchases</p>
//       </div>

//       {orders.length === 0 ? (
//         <div className={styles.emptyState}>
//           <div className={styles.emptyIcon}>📦</div>
//           <h3>No orders yet</h3>
//           <p>You haven't placed any orders. Start shopping to see your orders here!</p>
//           <a href="/books" className={styles.ctaButton}>
//             Browse Books
//           </a>
//         </div>
//       ) : (
//         <div className={styles.ordersList}>
//           {orders.map((order) => (
//             <div key={order._id} className={styles.orderCard}>
//               <div className={styles.orderHeader}>
//                 <div className={styles.orderInfo}>
//                   <h3 className={styles.orderId}>
//                     Order <span>#{order._id?.slice(-8).toUpperCase()}</span>
//                   </h3>
//                   <div className={styles.orderMeta}>
//                     <div className={styles.metaItem}>
//                       <span className={styles.metaIcon}>💰</span>
//                       Payment: {order.paymentStatus}
//                     </div>
//                     <div className={styles.metaItem}>
//                       <span className={styles.metaIcon}>📦</span>
//                       Status: {order.orderStatus}
//                     </div>
//                   </div>
//                 </div>
//                 <div className={styles.orderStatus}>
//                   <span className={`${styles.statusBadge} ${styles[`status${order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}`]}`}>
//                     {order.paymentStatus}
//                   </span>
//                   <div className={styles.amount}>
//                     ${order.totalAmount?.toFixed(2)} <span>USD</span>
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.booksSection}>
//                 <h4 className={styles.booksHeader}>Books in this order</h4>
//                 <div className={styles.booksList}>
//                   {order.books.map((bookItem) => (
//                     <div key={bookItem.bookId._id} className={styles.bookItem}>
//                       {bookItem.bookId.coverImage && (
//                         <img 
//                           src={bookItem.bookId.coverImage} 
//                           alt={bookItem.bookId.name} 
//                           className={styles.bookImage}
//                         />
//                       )}
//                       <div className={styles.bookContent}>
//                         <div className={styles.bookHeader}>
//                           <h4 className={styles.bookTitle}>{bookItem.bookId.name}</h4>
//                           <p className={styles.bookAuthor}>by {bookItem.bookId.author}</p>
//                         </div>
//                         <div className={styles.bookDetails}>
//                           <div className={styles.bookMeta}>
//                             <span>Qty: {bookItem.quantity}</span>
//                             <span>Price: ${bookItem.price}</span>
//                           </div>
//                           <div className={styles.bookPrice}>
//                             ${(bookItem.price * bookItem.quantity).toFixed(2)}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className={styles.orderFooter}>
//                 <div className={styles.orderDate}>
//                   <span className={styles.metaIcon}>📅</span>
//                   Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                   })}
//                 </div>
//                 {order.trackingNumber && (
//                   <a href="#" className={styles.trackingInfo}>
//                     Track your order →
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




// src/pages/Orders.jsx
// src/pages/Orders.jsx
// src/pages/Orders.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./Orders.module.css";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/orders/my-orders`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setOrders(res.data.data || []);
//       } catch (err) {
//         console.error("Error fetching orders:", err.response?.data || err.message);
//         setError("Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <div className={styles.loading}>Loading orders...</div>;
//   if (error) return <div className={styles.error}>{error}</div>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>My Orders</h1>
//         <p>View your order history and track your purchases</p>
//       </div>

//       {orders.length === 0 ? (
//         <div className={styles.emptyState}>
//           <div className={styles.emptyIcon}>📦</div>
//           <h3>No orders yet</h3>
//           <p>You haven't placed any orders. Start shopping to see your orders here!</p>
//           <a href="/books" className={styles.ctaButton}>
//             Browse Books
//           </a>
//         </div>
//       ) : (
//         <div className={styles.ordersList}>
//           {orders.map((order) => (
//             <div key={order._id} className={styles.orderCard}>
//               <div className={styles.orderHeader}>
//                 <div className={styles.orderInfo}>
//                   <h3 className={styles.orderId}>
//                     Order <span>#{order._id?.slice(-8).toUpperCase()}</span>
//                   </h3>
//                   <div className={styles.orderMeta}>
//                     <div className={styles.metaItem}>
//                       <span className={styles.metaIcon}>💰</span>
//                       Payment: {order.paymentStatus}
//                     </div>
//                     <div className={styles.metaItem}>
//                       <span className={styles.metaIcon}>📦</span>
//                       Status: {order.orderStatus}
//                     </div>
//                   </div>
//                 </div>
//                 <div className={styles.orderStatus}>
//                   <span className={`${styles.statusBadge} ${styles[`status${order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}`]}`}>
//                     {order.paymentStatus}
//                   </span>
//                   <div className={styles.amount}>
//                     £{order.totalAmount?.toFixed(2)} <span>GBP</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Books Section */}
//               {order.books.length > 0 && (
//                 <div className={styles.booksSection}>
//                   <h4 className={styles.booksHeader}>Books in this order</h4>
//                   <div className={styles.booksList}>
//                     {order.books.map((bookItem) => (
//                       <div key={bookItem.bookId._id} className={styles.bookItem}>
//                         {bookItem.bookId.coverImage && (
//                           <img 
//                             src={bookItem.bookId.coverImage} 
//                             alt={bookItem.bookId.name} 
//                             className={styles.bookImage}
//                           />
//                         )}
//                         <div className={styles.bookContent}>
//                           <div className={styles.bookHeader}>
//                             <h4 className={styles.bookTitle}>{bookItem.bookId.name}</h4>
//                             <p className={styles.bookAuthor}>by {bookItem.bookId.author}</p>
//                           </div>
//                           <div className={styles.bookDetails}>
//                             <div className={styles.bookMeta}>
//                               <span>Qty: {bookItem.quantity}</span>
//                               <span>Price: £{bookItem.price}</span>
//                             </div>
//                             <div className={styles.bookPrice}>
//                               £{(bookItem.price * bookItem.quantity).toFixed(2)}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Videos Section */}
//               {order.videos?.length > 0 && (
//                 <div className={styles.videosSection}>
//                   <h4 className={styles.videosHeader}>Videos in this order</h4>
//                   <div className={styles.videosList}>
//                     {order.videos.map((videoItem) => (
//                       <div key={videoItem.videoId._id} className={styles.videoItem}>
//                         <p className={styles.videoTitle}>{videoItem.videoId.title}</p>
//                         {videoItem.videoId.introVideo && (
//                           <video 
//                             src={videoItem.videoId.introVideo} 
//                             controls 
//                             className={styles.videoPreview}
//                           />
//                         )}
//                         {/* ✅ Show full video URL only for paid users */}
//                         {order.paymentStatus === "completed" && videoItem.videoId.videoUrl && (
//                           <p className={styles.videoLink}>
//                             Full video: <a href={videoItem.videoId.videoUrl} target="_blank" rel="noopener noreferrer">Watch Now</a>
//                           </p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className={styles.orderFooter}>
//                 <div className={styles.orderDate}>
//                   <span className={styles.metaIcon}>📅</span>
//                   Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                   })}
//                 </div>
//                 {order.trackingNumber && (
//                   <a href="#" className={styles.trackingInfo}>
//                     Track your order →
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Orders.module.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/my-orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(res.data.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err.response?.data || err.message);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className={styles.loading}>Loading orders...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Orders</h1>
        <p>View your order history and track your purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📦</div>
          <h3>No orders yet</h3>
          <p>You haven't placed any orders. Start shopping to see your orders here!</p>
          <a href="/books" className={styles.ctaButton}>
            Browse Books
          </a>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <h3 className={styles.orderId}>
                    Order <span>#{order._id?.slice(-8).toUpperCase()}</span>
                  </h3>
                  <div className={styles.orderMeta}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaIcon}>💰</span>
                      Payment: {order.paymentStatus}
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaIcon}>📦</span>
                      Status: {order.orderStatus}
                    </div>
                  </div>
                </div>
                <div className={styles.orderStatus}>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[
                        `status${
                          order.paymentStatus.charAt(0).toUpperCase() +
                          order.paymentStatus.slice(1)
                        }`
                      ]
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                  <div className={styles.amount}>
                    £{order.totalAmount?.toFixed(2)} <span>GBP</span>
                  </div>
                </div>
              </div>

              {/* Books Section */}
              {order.books.length > 0 && (
                <div className={styles.booksSection}>
                  <h4 className={styles.booksHeader}>Books in this order</h4>
                  <div className={styles.booksList}>
                    {order.books.map((bookItem) => (
                      <div key={bookItem.bookId?._id || bookItem.bookId} className={styles.bookItem}>
                        {bookItem.bookId?.coverImage && (
                          <img
                            src={bookItem.bookId.coverImage}
                            alt={bookItem.bookId?.name || bookItem.name}
                            className={styles.bookImage}
                          />
                        )}
                        <div className={styles.bookContent}>
                          <div className={styles.bookHeader}>
                            <h4 className={styles.bookTitle}>
                              {bookItem.bookId?.name || bookItem.name}
                            </h4>
                            {bookItem.bookId?.author && (
                              <p className={styles.bookAuthor}>
                                by {bookItem.bookId.author}
                              </p>
                            )}
                          </div>
                          <div className={styles.bookDetails}>
                            <div className={styles.bookMeta}>
                              <span>Qty: {bookItem.quantity}</span>
                              <span>Price: £{bookItem.price}</span>
                            </div>
                            <div className={styles.bookPrice}>
                              £{(bookItem.price * bookItem.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos Section */}
              {order.videos?.length > 0 && (
                <div className={styles.videosSection}>
                  <h4 className={styles.videosHeader}>Videos in this order</h4>
                  <div className={styles.videosList}>
                    {order.videos.map((videoItem) => {
                      const video = videoItem.videoId || {}; // could be populated object or just ID
                      return (
                        <div key={video._id || videoItem.videoId} className={styles.videoItem}>
                          <p className={styles.videoTitle}>
                            {video.title || videoItem.title}
                          </p>
                          {video.introVideo && (
                            <video
                              src={video.introVideo}
                              controls
                              className={styles.videoPreview}
                            />
                          )}
                          {order.paymentStatus === "completed" &&
                            video.videoUrl && (
                              <p className={styles.videoLink}>
                                Full video:{" "}
                                <a
                                  href={video.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Watch Now
                                </a>
                              </p>
                            )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className={styles.orderFooter}>
                <div className={styles.orderDate}>
                  <span className={styles.metaIcon}>📅</span>
                  Ordered on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                {order.trackingNumber && (
                  <a href="#" className={styles.trackingInfo}>
                    Track your order →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
