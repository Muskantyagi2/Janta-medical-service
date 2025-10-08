import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaArrowLeft,
  FaPills,
  FaHeartbeat,
  FaBaby,
  FaFirstAid,
} from "react-icons/fa";
import { MdLocalPharmacy } from "react-icons/md";
import { BiCapsule } from "react-icons/bi";
import FoodCard from "../components/FoodCard";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { itemsInMyCity } = useSelector((state) => state.user);
  const [filteredItems, setFilteredItems] = useState([]);

  // Category icons mapping
  const categoryIcons = {
    "Pain Relief": (
      <FaPills className="text-4xl" style={{ color: "#5A8F76" }} />
    ),
    "Cold & Cough": (
      <MdLocalPharmacy className="text-4xl" style={{ color: "#5A8F76" }} />
    ),
    "Diabetes Care": (
      <BiCapsule className="text-4xl" style={{ color: "#5A8F76" }} />
    ),
    "Heart Care": (
      <FaHeartbeat className="text-4xl" style={{ color: "#5A8F76" }} />
    ),
    "Vitamins & Supplements": (
      <FaPills className="text-4xl" style={{ color: "#5A8F76" }} />
    ),
    "Skin Care": (
      <MdLocalPharmacy className="text-4xl" style={{ color: "#5A8F76" }} />
    ),
    "Baby & Mother Care": (
      <FaBaby className="text-4xl" style={{ color: "#5A8F76" }} />
    ),
    "First aid & Essentials": (
      <FaFirstAid className="text-4xl" style={{ color: "#5A8F76" }} />
    ),
    "Stomach Care": (
      <BiCapsule className="text-4xl" style={{ color: "#5A8F76" }} />
    ),
    "All medicines": (
      <MdLocalPharmacy className="text-4xl" style={{ color: "#5A8F76" }} />
    ),
  };

  // Category descriptions
  const categoryDescriptions = {
    "Pain Relief":
      "Find effective pain relief medications for headaches, body aches, and chronic pain.",
    "Cold & Cough":
      "Get relief from cold and cough symptoms with our range of medications.",
    "Diabetes Care":
      "Manage your diabetes with quality medications and monitoring supplies.",
    "Heart Care":
      "Cardiovascular health medications and supplements for heart wellness.",
    "Vitamins & Supplements":
      "Essential vitamins and nutritional supplements for overall health.",
    "Skin Care":
      "Dermatological treatments and skincare medications for healthy skin.",
    "Baby & Mother Care":
      "Safe and effective medications for mothers and babies.",
    "First aid & Essentials":
      "Emergency medical supplies and first aid essentials.",
    "Stomach Care":
      "Digestive health medications for stomach and gastrointestinal issues.",
    "All medicines": "Browse all available medications from local pharmacies.",
  };

  useEffect(() => {
    if (category && itemsInMyCity) {
      if (category === "All medicines") {
        setFilteredItems(itemsInMyCity);
      } else {
        const filtered = itemsInMyCity.filter(
          (item) => item.category === category
        );
        setFilteredItems(filtered);
      }
    }
  }, [category, itemsInMyCity]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#EEE8B2" }}
    >
      <Nav />

      {/* Header */}
      <div
        className="relative pt-20 pb-8"
        style={{ backgroundColor: "#5A8F76" }}
      >
        <button
          className="absolute top-24 left-4 z-20 flex items-center gap-2 text-white px-3 py-2 rounded-full shadow-md transition"
          style={{ backgroundColor: "rgba(32, 59, 55, 0.8)" }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(32, 59, 55, 0.9)")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "rgba(32, 59, 55, 0.8)")
          }
          onClick={() => navigate("/")}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            {categoryIcons[category] || (
              <MdLocalPharmacy
                className="text-4xl"
                style={{ color: "#EEE8B2" }}
              />
            )}
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "#EEE8B2" }}
          >
            {category}
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#EEE8B2" }}>
            {categoryDescriptions[category] ||
              "Quality medications from trusted local pharmacies."}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Stats */}
        <div
          className="mb-8 p-4 rounded-lg"
          style={{ backgroundColor: "white", border: "1px solid #5A8F76" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "#203B37" }}
              >
                Available Medicines
              </h3>
              <p style={{ color: "#5A8F76" }}>
                {filteredItems.length} medicine(s) found in {category}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: "#5A8F76" }}>
                From local pharmacies
              </p>
              <p className="text-xs" style={{ color: "#96CDB0" }}>
                Fast delivery available
              </p>
            </div>
          </div>
        </div>

        {/* Medicine Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <FoodCard key={item._id || index} data={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <MdLocalPharmacy
                className="text-6xl mx-auto"
                style={{ color: "#96CDB0" }}
              />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#203B37" }}
            >
              No medicines found
            </h3>
            <p style={{ color: "#5A8F76" }}>
              No medicines are currently available in the {category} category.
            </p>
            <button
              className="mt-4 px-6 py-2 rounded-lg text-white transition"
              style={{ backgroundColor: "#5A8F76" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#96CDB0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#5A8F76")}
              onClick={() => navigate("/")}
            >
              Browse All Categories
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CategoryPage;
