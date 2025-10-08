import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav.jsx";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import { useNavigate } from "react-router-dom";
import { FaRegHandPointLeft, FaRegHandPointRight } from "react-icons/fa";

function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(
    (state) => state.user
  );
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const navigate = useNavigate();
  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);
  const [updatedItemsList, setUpdatedItemsList] = useState([]);

  const handleFilterByCategory = (category) => {
    // Navigate to CategoryPage with the selected category
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity);
  }, [itemsInMyCity]);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth
      );
    }
  };
  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (cateScrollRef.current) {
      updateButton(
        cateScrollRef,
        setShowLeftCateButton,
        setShowRightCateButton
      );
      updateButton(
        shopScrollRef,
        setShowLeftShopButton,
        setShowRightShopButton
      );
      cateScrollRef.current.addEventListener("scroll", () => {
        updateButton(
          cateScrollRef,
          setShowLeftCateButton,
          setShowRightCateButton
        );
      });
      shopScrollRef.current.addEventListener("scroll", () => {
        updateButton(
          shopScrollRef,
          setShowLeftShopButton,
          setShowRightShopButton
        );
      });
    }

    return () => {
      cateScrollRef?.current?.removeEventListener("scroll", () => {
        updateButton(
          cateScrollRef,
          setShowLeftCateButton,
          setShowRightCateButton
        );
      });
      shopScrollRef?.current?.removeEventListener("scroll", () => {
        updateButton(
          shopScrollRef,
          setShowLeftShopButton,
          setShowRightShopButton
        );
      });
    };
  }, [categories]);

  return (
    <div
      className="w-screen min-h-screen flex flex-col gap-5 items-center overflow-y-auto"
      style={{ backgroundColor: "#EEE8B2" }}
    >
      <Nav />

      {/* New Health Banner Section */}
      <div className="w-full max-w-6xl mx-auto mt-4 mb-2">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(to right, #96CDB0, #EEE8B2)",
            boxShadow: "0 8px 16px -4px #081B1B",
            border: "1px solid #203B37",
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-10 left-10 w-20 h-20 rounded-full"
              style={{ backgroundColor: "#5A8F76" }}
            ></div>
            <div
              className="absolute top-20 right-20 w-16 h-16 rounded-full"
              style={{ backgroundColor: "#203B37" }}
            ></div>
            <div
              className="absolute bottom-10 left-20 w-12 h-12 rounded-full"
              style={{ backgroundColor: "#5A8F76" }}
            ></div>
            <div
              className="absolute bottom-20 right-10 w-24 h-24 rounded-full"
              style={{ backgroundColor: "#203B37" }}
            ></div>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between p-6 lg:p-8">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0">
              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4"
                style={{
                  backgroundColor: "#5A8F76",
                  color: "white",
                }}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Trusted Medical Delivery
              </div>

              <h2
                className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 leading-tight"
                style={{ color: "#203B37" }}
              >
                Get Your Medicine
                <span className="block" style={{ color: "#5A8F76" }}>
                  Delivered 24/7
                </span>
              </h2>

              <p
                className="text-base lg:text-lg mb-6 max-w-md mx-auto lg:mx-0"
                style={{ color: "#203B37" }}
              >
                Fast, reliable delivery of medicines and medical products right
                to your doorstep. Available round the clock for your health
                needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  className="text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-1"
                  style={{
                    backgroundColor: "#5A8F76",
                    boxShadow: "0 4px 6px -1px #081B1B",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#96CDB0";
                    e.target.style.boxShadow = "0 8px 12px -2px #081B1B";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#5A8F76";
                    e.target.style.boxShadow = "0 4px 6px -1px #081B1B";
                  }}
                >
                  Order Now
                </button>
                <button
                  className="bg-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  style={{
                    color: "#5A8F76",
                    border: "2px solid #5A8F76",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#EEE8B2";
                    e.target.style.borderColor = "#203B37";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.borderColor = "#5A8F76";
                  }}
                >
                  Track Order
                </button>
              </div>
            </div>

            {/* Right Content - Health Icons */}
            <div className="flex-shrink-0 lg:ml-8">
              <div className="relative">
                {/* Main Circle */}
                <div
                  className="w-48 h-48 lg:w-64 lg:h-64 bg-white rounded-full flex items-center justify-center"
                  style={{
                    boxShadow: "0 8px 16px -4px #081B1B",
                    border: "4px solid #96CDB0",
                  }}
                >
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: "#96CDB0" }}
                    >
                      <svg
                        className="w-8 h-8"
                        style={{ color: "#5A8F76" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                        />
                      </svg>
                    </div>
                    <div
                      className="font-bold text-lg"
                      style={{ color: "#203B37" }}
                    >
                      24/7
                    </div>
                    <div className="text-sm" style={{ color: "#5A8F76" }}>
                      Available
                    </div>
                  </div>
                </div>

                {/* Floating Icons */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-emerald-500 rounded-full shadow-lg flex items-center justify-center animate-pulse">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>

                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-green-400 rounded-full shadow-lg flex items-center justify-center animate-bounce">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>

                <div className="absolute top-1/2 -left-4 w-8 h-8 bg-emerald-300 rounded-full shadow-md flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="border-t border-green-100 bg-white bg-opacity-50">
            <div className="flex flex-wrap justify-center lg:justify-around items-center py-4 px-6 gap-4">
              <div className="text-center">
                <div className="text-green-700 font-bold text-lg">15min</div>
                <div className="text-green-600 text-sm">Avg Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-green-700 font-bold text-lg">1000+</div>
                <div className="text-green-600 text-sm">Medicines</div>
              </div>
              <div className="text-center">
                <div className="text-green-700 font-bold text-lg">24/7</div>
                <div className="text-green-600 text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-green-700 font-bold text-lg">Safe</div>
                <div className="text-green-600 text-sm">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {searchItems && searchItems.length > 0 && (
        <div
          className="w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white rounded-2xl mt-4"
          style={{
            boxShadow: "0 4px 6px -1px #081B1B",
            border: "1px solid #203B37",
          }}
        >
          <h1
            className="text-2xl sm:text-3xl font-semibold pb-2"
            style={{
              color: "#203B37",
              borderBottom: "1px solid #203B37",
            }}
          >
            Search Results
          </h1>
          <div className="w-full h-auto flex flex-wrap gap-6 justify-center">
            {searchItems.map((item) => (
              <FoodCard data={item} key={item._id} />
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-2xl sm:text-3xl" style={{ color: "#203B37" }}>
          Your health, delivered fast
        </h1>
        <div className="w-full relative">
          {showLeftCateButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white p-2 rounded-full shadow-lg z-10"
              style={{
                backgroundColor: "#5A8F76",
                boxShadow: "0 4px 6px -1px #081B1B",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#96CDB0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#5A8F76")}
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaRegHandPointLeft />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-2 "
            ref={cateScrollRef}
          >
            {categories.map((cate, index) => (
              <CategoryCard
                name={cate.category}
                image={cate.image}
                key={index}
                onClick={() => handleFilterByCategory(cate.category)}
              />
            ))}
          </div>
          {showRightCateButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white p-2 rounded-full shadow-lg z-10"
              style={{
                backgroundColor: "#5A8F76",
                boxShadow: "0 4px 6px -1px #081B1B",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#96CDB0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#5A8F76")}
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaRegHandPointRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-2xl sm:text-3xl" style={{ color: "#203B37" }}>
          Best Shop in {currentCity}
        </h1>
        <div className="w-full relative">
          {showLeftShopButton && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white p-2 rounded-full shadow-lg z-10"
              style={{
                backgroundColor: "#5A8F76",
                boxShadow: "0 4px 6px -1px #081B1B",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#96CDB0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#5A8F76")}
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaRegHandPointLeft />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-2 "
            ref={shopScrollRef}
          >
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard
                name={shop.name}
                image={shop.image}
                key={index}
                onClick={() => navigate(`/shop/${shop._id}`)}
              />
            ))}
          </div>
          {showRightShopButton && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white p-2 rounded-full shadow-lg z-10"
              style={{
                backgroundColor: "#5A8F76",
                boxShadow: "0 4px 6px -1px #081B1B",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#96CDB0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#5A8F76")}
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaRegHandPointRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-2xl sm:text-3xl" style={{ color: "#203B37" }}>
          Suggested Medical Products
        </h1>

        <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
          {updatedItemsList?.map((item, index) => (
            <FoodCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
