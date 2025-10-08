import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import { IoArrowBack } from "react-icons/io5";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  return (
    <>
      <Nav />
      <div
        className="min-h-screen flex flex-col pt-[100px]"
        style={{ backgroundColor: "#EEE8B2" }}
      >
        <div className="flex-1 flex justify-center p-6">
          <div className="w-full max-w-[800px]">
            <div className="flex items-center gap-[20px] mb-6 ">
              <div className=" z-[10] " onClick={() => navigate("/")}>
                <IoArrowBack size={35} style={{ color: "#5A8F76" }} />
              </div>
              <h1
                className='"text-2xl font-bold text-start'
                style={{ color: "#203B37" }}
              >
                Your Cart
              </h1>
            </div>
            {cartItems?.length == 0 ? (
              <p style={{ color: "#5A8F76" }} className="text-lg text-center">
                Your Cart is Empty
              </p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems?.map((item, index) => (
                    <CartItemCard data={item} key={index} />
                  ))}
                </div>
                <div
                  className="mt-6 bg-white p-4 rounded-xl flex justify-between items-center"
                  style={{
                    boxShadow: "0 4px 6px -1px #081B1B",
                    border: "1px solid #203B37",
                  }}
                >
                  <h1
                    className="text-lg font-semibold"
                    style={{ color: "#203B37" }}
                  >
                    Total Amount
                  </h1>
                  <span
                    className="text-xl font-bold"
                    style={{ color: "#5A8F76" }}
                  >
                    ₹{totalAmount}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    className="text-white px-6 py-3 rounded-lg text-lg font-medium transition cursor-pointer"
                    style={{
                      backgroundColor: "#5A8F76",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#96CDB0";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#5A8F76";
                    }}
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to CheckOut
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default CartPage;
