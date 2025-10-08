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
function CreateEditShop() {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState(myShopData?.name || "");
  const [address, setAddress] = useState(myShopData?.address || currentAddress);
  const [city, setCity] = useState(myShopData?.city || currentCity);
  const [state, setState] = useState(myShopData?.state || currentState);
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
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
      formData.append("city", city);
      formData.append("state", state);
      formData.append("address", address);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit`,
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
            {myShopData ? "Edit Medical Store" : "Add Medical Store"}
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#203B37" }}
            >
              Medical Store Name
            </label>
            <input
              type="text"
              placeholder="Enter Medical Store Name"
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
              Store Image
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "#203B37" }}
              >
                Store's City
              </label>
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
                style={{ border: "1px solid #5A8F76" }}
                onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
                onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "#203B37" }}
              >
                Store's State
              </label>
              <input
                type="text"
                placeholder="State"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
                style={{ border: "1px solid #5A8F76" }}
                onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
                onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#203B37" }}
            >
              Store's Address
            </label>
            <input
              type="text"
              placeholder="Enter Store Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
              style={{ border: "1px solid #5A8F76" }}
              onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
              onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
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
            {loading ? (
              <ClipLoader size={20} color="white" />
            ) : (
              "Save Medical Store"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEditShop;
