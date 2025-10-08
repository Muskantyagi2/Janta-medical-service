import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice";

function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);
  const renderStars = (rating) => {
    //r=3
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar className="text-yellow-500 text-lg" />
        ) : (
          <FaRegStar className="text-yellow-500 text-lg" />
        )
      );
    }
    return stars;
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
  };
  const handleDecrease = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
    }
  };

  return (
    <div
      className="w-[250px] rounded-2xl bg-white overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
      style={{
        border: "2px solid #5A8F76",
        boxShadow: "0 4px 6px -1px #081B1B",
      }}
    >
      <div className="relative w-full h-[170px] flex justify-center items-center bg-white">
        <img
          src={data.image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col p-4">
        <h1
          className="font-semibold text-base truncate"
          style={{ color: "#203B37" }}
        >
          {data.name}
        </h1>

        <div className="flex items-center gap-1 mt-1">
          {renderStars(data.rating?.average || 0)}
          <span className="text-xs text-gray-500">
            {data.rating?.count || 0}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto p-3">
        <span className="font-bold text-lg" style={{ color: "#203B37" }}>
          ₹{data.price}
        </span>

        <div className="flex items-center gap-2">
          {/* Quantity Controls */}
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{
              border: "1px solid #203B37",
              backgroundColor: "#EEE8B2",
              boxShadow: "0 2px 4px -1px #081B1B",
            }}
          >
            <button
              className="px-3 py-2 transition flex items-center justify-center"
              style={{
                backgroundColor: "#EEE8B2",
                color: "#203B37",
                minWidth: "32px",
                height: "32px",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#96CDB0";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#EEE8B2";
              }}
              onClick={handleDecrease}
            >
              <FaMinus size={10} />
            </button>
            <span
              style={{
                color: "#203B37",
                padding: "0 12px",
                minWidth: "24px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {quantity}
            </span>
            <button
              className="px-3 py-2 transition flex items-center justify-center"
              style={{
                backgroundColor: "#EEE8B2",
                color: "#203B37",
                minWidth: "32px",
                height: "32px",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#96CDB0";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#EEE8B2";
              }}
              onClick={handleIncrease}
            >
              <FaPlus size={10} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            className="text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center"
            style={{
              backgroundColor: cartItems.some((i) => i.id == data._id)
                ? "#203B37"
                : "#5A8F76",
              boxShadow: "0 2px 4px -1px #081B1B",
              minWidth: "40px",
              height: "32px",
            }}
            onMouseEnter={(e) => {
              if (!cartItems.some((i) => i.id == data._id)) {
                e.target.style.backgroundColor = "#96CDB0";
              }
            }}
            onMouseLeave={(e) => {
              if (!cartItems.some((i) => i.id == data._id)) {
                e.target.style.backgroundColor = "#5A8F76";
              }
            }}
            onClick={() => {
              quantity > 0
                ? dispatch(
                    addToCart({
                      id: data._id,
                      name: data.name,
                      image: data.image,
                      price: data.price,
                      shop: data.shop,
                      quantity: quantity,
                      description: data.description,
                    })
                  )
                : null;
            }}
          >
            <FaShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
