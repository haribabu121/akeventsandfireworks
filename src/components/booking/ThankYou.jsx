import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productCount = location.state?.productCount || 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-6">
      <h1 className="text-4xl font-bold mb-4">Thank You! 😊</h1>
      <p className="text-lg mb-6">
        Your booking for {productCount} item{productCount > 1 ? "s" : ""} has been successfully received.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-yellow-500 text-white rounded-md"
      >
        Visit Again
      </button>
    </div>
  );
};

export default ThankYou;










