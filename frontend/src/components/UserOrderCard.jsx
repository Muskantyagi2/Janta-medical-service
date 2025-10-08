import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

function UserOrderCard({ data }) {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState({}); //itemId:rating

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleRating = async (itemId, rating) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/item/rating`,
        { itemId, rating },
        { withCredentials: true }
      );
      setSelectedRating((prev) => ({
        ...prev,
        [itemId]: rating,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-white rounded-lg p-4 space-y-4"
      style={{
        boxShadow: "0 4px 6px -1px #081B1B",
        border: "1px solid #203B37",
      }}
    >
      <div
        className="flex justify-between border-b pb-2"
        style={{ borderColor: "#203B37" }}
      >
        <div>
          <p className="font-semibold" style={{ color: "#203B37" }}>
            order #{data._id.slice(-6)}
          </p>
          <p className="text-sm" style={{ color: "#5A8F76" }}>
            Date: {formatDate(data.createdAt)}
          </p>
        </div>
        <div className="text-right">
          {data.paymentMethod == "cod" ? (
            <p className="text-sm" style={{ color: "#5A8F76" }}>
              {data.paymentMethod?.toUpperCase()}
            </p>
          ) : (
            <p className="text-sm font-semibold" style={{ color: "#5A8F76" }}>
              Payment: {data.payment ? "true" : "false"}
            </p>
          )}

          <p className="font-medium" style={{ color: "#5A8F76" }}>
            {data.shopOrders?.[0].status}
          </p>
        </div>
      </div>

      {data.shopOrders.map((shopOrder, index) => (
        <div
          className="rounded-lg p-3 space-y-3"
          key={index}
          style={{ backgroundColor: "#EEE8B2", border: "1px solid #203B37" }}
        >
          <p style={{ color: "#203B37" }}>{shopOrder.shop.name}</p>

          <div className="flex space-x-4 overflow-x-auto pb-2">
            {shopOrder.shopOrderItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 rounded-lg p-2 bg-white"
                style={{ border: "1px solid #203B37" }}
              >
                <img
                  src={item.item.image}
                  alt=""
                  className="w-full h-24 object-cover rounded"
                />
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "#203B37" }}
                >
                  {item.name}
                </p>
                <p className="text-xs" style={{ color: "#5A8F76" }}>
                  Qty: {item.quantity} x ₹{item.price}
                </p>

                {shopOrder.status == "delivered" && (
                  <div className="flex space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`text-lg ${
                          selectedRating[item.item._id] >= star
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                        onClick={() => handleRating(item.item._id, star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            className="flex justify-between items-center border-t pt-2"
            style={{ borderColor: "#203B37" }}
          >
            <p className="font-semibold" style={{ color: "#203B37" }}>
              Subtotal: {shopOrder.subtotal}
            </p>
            <span className="text-sm font-medium" style={{ color: "#5A8F76" }}>
              {shopOrder.status}
            </span>
          </div>
        </div>
      ))}

      <div
        className="flex justify-between items-center border-t pt-2"
        style={{ borderColor: "#203B37" }}
      >
        <p className="font-semibold" style={{ color: "#203B37" }}>
          Total: ₹{data.totalAmount}
        </p>
        <button
          className="text-white px-4 py-2 rounded-lg text-sm transition"
          style={{ backgroundColor: "#5A8F76" }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#96CDB0";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#5A8F76";
          }}
          onClick={() => navigate(`/track-order/${data._id}`)}
        >
          Track Order
        </button>
      </div>
    </div>
  );
}

export default UserOrderCard;
