import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/verify-session/${sessionId}`
        );
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) fetchOrder();
  }, [sessionId]);

  if (loading) return <p className="text-center mt-10">Verifying your payment...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-2xl font-bold text-green-600">🎉 Payment Successful!</h1>
      {order ? (
        <>
          <p className="mt-2">Thanks, {order.customerName}.</p>
          <p>Your order <b>#{order._id}</b> is confirmed.</p>
          <p>Total: <b>${order.totalAmount}</b></p>
        </>
      ) : (
        <p className="text-gray-600 mt-2">We couldn’t fetch your order details.</p>
      )}

      <Link to="/shop" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
