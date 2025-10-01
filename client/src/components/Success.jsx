// import React, { useEffect, useState } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import axios from "axios";

// const Success = () => {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/orders/verify-session/${sessionId}`
//         );
//         setOrder(data);
//       } catch (err) {
//         console.error("Failed to fetch order:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (sessionId) fetchOrder();
//   }, [sessionId]);

//   if (loading) return <p className="text-center mt-10">Verifying your payment...</p>;

//   return (
//     <div className="flex flex-col items-center justify-center h-[80vh] text-center">
//       <h1 className="text-2xl font-bold text-green-600">🎉 Payment Successful!</h1>
//       {order ? (
//         <>
//           <p className="mt-2">Thanks, {order.customerName}.</p>
//           <p>Your order <b>#{order._id}</b> is confirmed.</p>
//           <p>Total: <b>${order.totalAmount}</b></p>
//         </>
//       ) : (
//         <p className="text-gray-600 mt-2">We couldn’t fetch your order details.</p>
//       )}

//       <Link to="/shop" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
//         Continue Shopping
//       </Link>
//     </div>
//   );
// };

// export default Success;


import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Success.module.css";

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/verify-session/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setOrder(res.data.order || res.data);
      } catch (err) {
        console.error("Error verifying order:", err);
        setError(
          err.response?.data?.message || 
          "Could not verify your payment. Please contact support if the issue persists."
        );
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchOrder();
    } else {
      setError("No session ID found. Please check your payment confirmation.");
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Verifying your payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>⚠️ Payment Verification Failed</h2>
          <p>{error}</p>
          <Link to="/" className={styles.homeButton}>
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.successCheckmark}></div>
        <h1 className={styles.title}>Payment Successful!</h1>
        <p className={styles.subtitle}>
          Thank you for your purchase! Your order has been confirmed and will be processed shortly.
        </p>

        {order && (
          <div className={styles.orderBox}>
            <h2>Order Summary</h2>
            <ul>
              {order.books.map((item, index) => (
                <li key={index}>
                  <span>
                    {item.bookId?.title || item.name || "Unknown Book"} × {item.quantity}
                  </span>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p>
              <strong>Total Amount:</strong> ${order.totalAmount?.toFixed(2) || "0.00"}
            </p>
            <p>
              <strong>Payment Status:</strong> 
              <span className={`${styles.statusBadge} ${styles.statusCompleted}`}>
                {order.paymentStatus || "completed"}
              </span>
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Order ID:</strong> {order._id?.slice(-8).toUpperCase()}
            </p>
          </div>
        )}

        <div className={styles.actions}>
          <Link to="/" className={styles.homeButton}>
            Continue Shopping
          </Link>
          <Link to="/dashboard" className={styles.dashboardButton}>
            View My Orders
          </Link>
        </div>

        <p className={styles.supportText}>
          Need help? Contact our support team at support@winifredsbooks.com
        </p>
      </div>
    </div>
  );
}

