import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHandHoldingMedical, FaUtensils } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice";
import { ClipLoader } from "react-spinners";
import { IoArrowBack } from "react-icons/io5";
function AddItem() {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [category, setCategory] = useState("");

  const categories = [
    "Pain Relief",
    "Cold & Cough",
    "Diabetes Care",
    "Heart Care",
    "Vitamins & Supplements",
    "Skin Care",
    "Baby & Mother Care",
    "First aid & Essentials",
    "Stomach Care",
    "All medicines",
  ];
  const dispatch = useDispatch();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("price", price);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/item/add-item`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div
      className="flex justify-center flex-col items-center p-6 relative min-h-screen"
      style={{ backgroundColor: "#EEE8B2" }}
    >
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px]"
        onClick={() => navigate("/")}
      >
        <IoArrowBack size={35} style={{ color: "#5A8F76" }} />
      </div>

      <div
        className="max-w-lg w-full shadow-xl rounded-2xl p-8"
        style={{ backgroundColor: "white", border: "1px solid #5A8F76" }}
      >
        <div className="flex flex-col items-center mb-6">
          <div
            className="p-4 rounded-full mb-4"
            style={{ backgroundColor: "#EEE8B2" }}
          >
            <FaHandHoldingMedical
              className="w-16 h-16"
              style={{ color: "#5A8F76" }}
            />
          </div>
          <div className="text-3xl font-extrabold" style={{ color: "#203B37" }}>
            Add Medical Product
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#203B37" }}
            >
              Medicine Name
            </label>
            <input
              type="text"
              placeholder="Enter Medicine Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
              style={{ border: "1px solid #5A8F76" }}
              onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
              onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#203B37" }}
            >
              Medicine Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
              style={{ border: "1px solid #5A8F76" }}
              onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
              onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg"
                  style={{ border: "1px solid #5A8F76" }}
                />
              </div>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#203B37" }}
            >
              Medicine Price
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
              style={{ border: "1px solid #5A8F76" }}
              onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
              onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#203B37" }}
            >
              Select Medicine Category
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
              style={{ border: "1px solid #5A8F76" }}
              onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
              onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Category</option>
              {categories.map((cate, index) => (
                <option value={cate} key={index}>
                  {cate}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#203B37" }}
            >
              Medicine Description
            </label>
            <textarea
              placeholder="Enter medicine description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition resize-none"
              style={{ border: "1px solid #5A8F76" }}
              onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
              onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={3}
            />
          </div>

          <button
            className="w-full text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 cursor-pointer"
            style={{ backgroundColor: "#5A8F76" }}
            onMouseEnter={(e) =>
              !loading && (e.target.style.backgroundColor = "#96CDB0")
            }
            onMouseLeave={(e) =>
              !loading && (e.target.style.backgroundColor = "#5A8F76")
            }
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Add Medicine"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
