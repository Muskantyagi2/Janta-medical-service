import React, { useEffect, useState } from "react";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setSearchItems, setUserData } from "../redux/userSlice";
import { TbReceipt2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import LogoPng from "../assets/logo.png";
function Nav() {
  const { userData, currentCity, cartItems } = useSelector(
    (state) => state.user
  );
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchItems = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,
        { withCredentials: true }
      );
      dispatch(setSearchItems(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearchItems();
    } else {
      dispatch(setSearchItems(null));
    }
  }, [query]);
  return (
    <div
      className="w-full h-[85px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] overflow-visible backdrop-blur-md"
      style={{
        background: "linear-gradient(135deg, #EEE8B2 0%, #F5F1C8 100%)",
        borderBottom: "1px solid rgba(90, 143, 118, 0.2)",
        boxShadow: "0 8px 32px rgba(8, 27, 27, 0.1)",
      }}
    >
      {showSearch && userData.role == "user" && (
        <div
          className="w-[95%] h-[75px] bg-white/95 backdrop-blur-lg rounded-2xl items-center gap-[20px] flex fixed top-[90px] left-[2.5%] md:hidden transition-all duration-300 ease-out"
          style={{
            boxShadow:
              "0 20px 25px -5px rgba(8, 27, 27, 0.1), 0 10px 10px -5px rgba(8, 27, 27, 0.04)",
            border: "1px solid rgba(90, 143, 118, 0.2)",
          }}
        >
          <div
            className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[15px] border-r-[1px]"
            style={{ borderColor: "rgba(90, 143, 118, 0.3)" }}
          >
            <div
              className="p-2 rounded-full"
              style={{ backgroundColor: "rgba(90, 143, 118, 0.1)" }}
            >
              <FaLocationDot size={18} style={{ color: "#5A8F76" }} />
            </div>
            <div className="w-[80%] truncate text-gray-600 text-sm font-medium">
              {currentCity}
            </div>
          </div>
          <div className="w-[80%] flex items-center gap-[15px] px-[10px]">
            <IoIosSearch size={22} style={{ color: "#96CDB0" }} />
            <input
              type="text"
              placeholder="Search medicines..."
              className="px-[10px] text-gray-700 outline-0 w-full font-medium placeholder:text-gray-400"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </div>
      )}

      {/* Modern Brand Logo with Icon */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div
          className="w-12 h-12 rounded-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
            boxShadow: "0 4px 15px rgba(90, 143, 118, 0.3)",
          }}
        >
          <img
            src={LogoPng}
            alt="Janta Medical Service Logo"
            className="w-15 h-15 object-cover"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
          />
        </div>
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#5A8F76] to-[#203B37] bg-clip-text text-transparent">
            Janta Medical Service
          </h1>
          <p className="text-sm" style={{ color: "#5A8F76" }}>
            Healthcare Delivered
          </p>
        </div>
        <h1 className="md:hidden text-xl font-bold bg-gradient-to-r from-[#5A8F76] to-[#203B37] bg-clip-text text-transparent">
          Janta Medical Service
        </h1>
      </div>
      {userData.role == "user" && (
        <div
          className="md:w-[60%] lg:w-[45%] h-[65px] bg-white/90 backdrop-blur-lg rounded-2xl items-center gap-[20px] hidden md:flex transition-all duration-200 hover:shadow-lg group"
          style={{
            boxShadow: "0 10px 20px rgba(8, 27, 27, 0.08)",
            border: "1px solid rgba(90, 143, 118, 0.2)",
          }}
        >
          <div
            className="flex items-center w-[35%] overflow-hidden gap-[12px] px-[20px] border-r-[1px]"
            style={{ borderColor: "rgba(90, 143, 118, 0.3)" }}
          >
            <div
              className="p-2 rounded-full transition-colors group-hover:bg-opacity-20"
              style={{ backgroundColor: "rgba(90, 143, 118, 0.1)" }}
            >
              <FaLocationDot size={18} style={{ color: "#5A8F76" }} />
            </div>
            <div className="w-[80%] truncate text-gray-600 font-medium text-sm">
              {currentCity}
            </div>
          </div>
          <div className="w-[65%] flex items-center gap-[15px] px-[15px]">
            <IoIosSearch
              size={24}
              style={{ color: "#96CDB0" }}
              className="transition-colors group-hover:text-[#5A8F76]"
            />
            <input
              type="text"
              placeholder="Search for medicines..."
              className="px-[10px] text-gray-700 outline-0 w-full font-medium placeholder:text-gray-400"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 relative">
        {/* Enhanced Search Toggle for Mobile */}
        {userData.role == "user" &&
          (showSearch ? (
            <button
              className="md:hidden p-3 rounded-full transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "rgba(203, 55, 55, 0.1)" }}
              onClick={() => setShowSearch(false)}
            >
              <RxCross2 size={20} style={{ color: "#cb3737" }} />
            </button>
          ) : (
            <button
              className="md:hidden p-3 rounded-full transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "rgba(90, 143, 118, 0.1)" }}
              onClick={() => setShowSearch(true)}
            >
              <IoIosSearch size={20} style={{ color: "#5A8F76" }} />
            </button>
          ))}
        {userData.role == "owner" ? (
          <>
            {myShopData && (
              <>
                <button
                  className="hidden md:flex items-center gap-2 px-4 py-3 cursor-pointer rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                    color: "white",
                    boxShadow: "0 4px 15px rgba(90, 143, 118, 0.3)",
                  }}
                  onClick={() => navigate("/add-item")}
                >
                  <FaPlus size={18} />
                  <span>Add Medicine</span>
                </button>
                <button
                  className="md:hidden p-3 rounded-xl transition-all duration-200 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                    boxShadow: "0 4px 15px rgba(90, 143, 118, 0.3)",
                  }}
                  onClick={() => navigate("/add-item")}
                >
                  <FaPlus size={18} className="text-white" />
                </button>
              </>
            )}

            <button
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg border"
              style={{
                backgroundColor: "rgba(90, 143, 118, 0.1)",
                borderColor: "rgba(90, 143, 118, 0.3)",
                color: "#5A8F76",
              }}
              onClick={() => navigate("/my-orders")}
            >
              <TbReceipt2 size={18} />
              <span>My Orders</span>
            </button>
            <button
              className="md:hidden p-3 rounded-xl transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "rgba(90, 143, 118, 0.1)",
                borderColor: "rgba(90, 143, 118, 0.3)",
                color: "#5A8F76",
              }}
              onClick={() => navigate("/my-orders")}
            >
              <TbReceipt2 size={18} />
            </button>
          </>
        ) : (
          <>
            {userData.role == "user" && (
              <div
                className="relative cursor-pointer p-3 rounded-xl transition-all duration-200 hover:scale-105 group"
                style={{ backgroundColor: "rgba(90, 143, 118, 0.1)" }}
                onClick={() => navigate("/cart")}
              >
                <FiShoppingCart
                  size={22}
                  style={{ color: "#5A8F76" }}
                  className="group-hover:scale-110 transition-transform"
                />
                {cartItems.length > 0 && (
                  <span
                    className="absolute -right-1 -top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff4757 0%, #ff3742 100%)",
                      boxShadow: "0 2px 8px rgba(255, 71, 87, 0.4)",
                    }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </div>
            )}

            <button
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg border"
              style={{
                backgroundColor: "rgba(90, 143, 118, 0.1)",
                borderColor: "rgba(90, 143, 118, 0.3)",
                color: "#5A8F76",
              }}
              onClick={() => navigate("/my-orders")}
            >
              <TbReceipt2 size={18} />
              <span>My Orders</span>
            </button>
          </>
        )}

        {/* Modern User Avatar */}
        <div
          className="w-[45px] h-[45px] rounded-2xl flex items-center justify-center text-white text-[16px] font-bold cursor-pointer transition-all duration-200 hover:scale-105 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #5A8F76 0%, #203B37 100%)",
            boxShadow: "0 8px 25px rgba(8, 27, 27, 0.2)",
          }}
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName.slice(0, 1)}
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity rounded-2xl"></div>
        </div>
        {/* Enhanced User Menu Dropdown */}
        {showInfo && (
          <div
            className="absolute top-[60px] right-0 w-[200px] bg-white/95 backdrop-blur-lg rounded-2xl p-[25px] flex flex-col gap-[15px] z-[9999] transition-all duration-200"
            style={{
              boxShadow: "0 25px 50px -12px rgba(8, 27, 27, 0.15)",
              border: "1px solid rgba(90, 143, 118, 0.2)",
            }}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div
                className="w-[40px] h-[40px] rounded-xl flex items-center justify-center text-white text-sm font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                }}
              >
                {userData?.fullName.slice(0, 1)}
              </div>
              <div>
                <div className="text-[16px] font-semibold text-gray-800">
                  {userData.fullName}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {userData.role}
                </div>
              </div>
            </div>

            {userData.role == "user" && (
              <button
                className="md:hidden text-left font-medium cursor-pointer p-2 rounded-lg transition-colors hover:bg-gray-50"
                style={{ color: "#5A8F76" }}
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </button>
            )}

            <button
              className="text-left font-medium cursor-pointer p-2 rounded-lg transition-colors hover:bg-red-50 text-red-600"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
