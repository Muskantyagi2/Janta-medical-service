import React from "react";
import Nav from "./Nav.jsx";
import { useSelector } from "react-redux";
import { FaHandHoldingMedical, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import OwnerItemCard from "./ownerItemCard";
function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center"
      style={{ backgroundColor: "#EEE8B2" }}
    >
      <Nav />
      {!myShopData && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div
            className="w-full max-w-md shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
            style={{ backgroundColor: "white", border: "1px solid #5A8F76" }}
          >
            <div className="flex flex-col items-center text-center">
              <FaHandHoldingMedical
                className="w-16 h-16 sm:w-20 sm:h-20 mb-4"
                style={{ color: "#5A8F76" }}
              />
              <h2
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "#203B37" }}
              >
                Add Your Medical Store
              </h2>
              <p
                className="mb-4 text-sm sm:text-base"
                style={{ color: "#5A8F76" }}
              >
                Join Janta Medical and bring trusted healthcare closer to
                thousands of people every day.
              </p>
              <button
                className="text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md transition-colors duration-200"
                style={{ backgroundColor: "#5A8F76" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#96CDB0")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#5A8F76")
                }
                onClick={() => navigate("/create-edit-shop")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {myShopData && (
        <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6">
          <h1
            className="text-2xl sm:text-3xl flex items-center gap-3 mt-8 text-center"
            style={{ color: "#203B37" }}
          >
            <FaHandHoldingMedical
              className="w-14 h-14"
              style={{ color: "#5A8F76" }}
            />
            Welcome to {myShopData.name}
          </h1>

          <div
            className="shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative"
            style={{ backgroundColor: "white", border: "1px solid #5A8F76" }}
          >
            <div
              className="absolute top-4 right-4 text-white p-2 rounded-full shadow-md transition-colors cursor-pointer"
              style={{ backgroundColor: "#5A8F76" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#96CDB0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#5A8F76")}
              onClick={() => navigate("/create-edit-shop")}
            >
              <FaPen size={20} />
            </div>
            <img
              src={myShopData.image}
              alt={myShopData.name}
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h1
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: "#203B37" }}
              >
                {myShopData.name}
              </h1>
              <p style={{ color: "#5A8F76" }}>
                {myShopData.city},{myShopData.state}
              </p>
              <p className="mb-4" style={{ color: "#5A8F76" }}>
                {myShopData.address}
              </p>
            </div>
          </div>

          {myShopData.items.length == 0 && (
            <div className="flex justify-center items-center p-4 sm:p-6">
              <div
                className="w-full max-w-md shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #5A8F76",
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <FaHandHoldingMedical
                    className="w-16 h-16 sm:w-20 sm:h-20 mb-4"
                    style={{ color: "#5A8F76" }}
                  />
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ color: "#203B37" }}
                  >
                    Add Your Medicine Item
                  </h2>
                  <p
                    className="mb-4 text-sm sm:text-base"
                    style={{ color: "#5A8F76" }}
                  >
                    Provide essential medicines and healthcare products to
                    people in need by adding them to your store.
                  </p>
                  <button
                    className="text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md transition-colors duration-200"
                    style={{ backgroundColor: "#5A8F76" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#96CDB0")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#5A8F76")
                    }
                    onClick={() => navigate("/add-item")}
                  >
                    Add Medicine
                  </button>
                </div>
              </div>
            </div>
          )}

          {myShopData.items.length > 0 && (
            <div className="flex flex-col items-center gap-4 w-full max-w-3xl ">
              {myShopData.items.map((item, index) => (
                <OwnerItemCard data={item} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
