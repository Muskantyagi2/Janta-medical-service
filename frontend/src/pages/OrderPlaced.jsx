import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function OrderPlaced() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 text-center relative overflow-hidden"
      style={{ backgroundColor: "#EEE8B2" }}
    >
      <FaCircleCheck className="text-6xl mb-4" style={{ color: "#5A8F76" }} />
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#203B37" }}>
        Order Placed!
      </h1>
      <p className="max-w-md mb-6" style={{ color: "#5A8F76" }}>
        Thank you for choosing Janta Medical Service. Your medicines are being
        packed with care. You can track your order status anytime in the 'My
        Orders' section.
      </p>
      <button
        className="text-white px-6 py-3 rounded-lg text-lg font-medium transition"
        style={{
          backgroundColor: "#5A8F76",
          boxShadow: "0 4px 6px -1px #081B1B",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#96CDB0";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#5A8F76";
        }}
        onClick={() => navigate("/my-orders")}
      >
        Back to my orders
      </button>
    </div>
  );
}

export default OrderPlaced;
