import React from "react";
import { Link } from "react-router-dom";

const CheckoutCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-2xl font-bold text-red-600">❌ Payment Cancelled</h1>
      <p className="mt-2 text-gray-600">
        Your payment was cancelled. You can try again.
      </p>
      <div className="mt-4 space-x-3">
        <Link to="/checkout" className="px-4 py-2 bg-red-600 text-white rounded-lg">
          Retry Payment
        </Link>
        <Link to="/shop" className="px-4 py-2 bg-gray-500 text-white rounded-lg">
          Back to Shop
        </Link>
      </div>
    </div>
  );
};

export default CheckoutCancel;
