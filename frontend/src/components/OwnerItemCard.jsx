import axios from "axios";
import React from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";
function OwnerItemCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/delete/${data._id}`,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="flex rounded-lg shadow-md overflow-hidden w-full max-w-2xl"
      style={{ backgroundColor: "white", border: "1px solid #5A8F76" }}
    >
      <div
        className="w-36 flex-shrink-0"
        style={{ backgroundColor: "#EEE8B2" }}
      >
        <img src={data.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between p-3 flex-1">
        <div>
          <h2 className="text-base font-semibold" style={{ color: "#5A8F76" }}>
            {data.name}
          </h2>
          <p>
            <span className="font-medium" style={{ color: "#203B37" }}>
              Category:
            </span>{" "}
            <span style={{ color: "#5A8F76" }}>{data.category}</span>
          </p>
          <p>
            <span className="font-medium" style={{ color: "#203B37" }}>
              Medicine Type:
            </span>{" "}
            <span style={{ color: "#5A8F76" }}>{data.foodType}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-bold" style={{ color: "#5A8F76" }}>
            ₹{data.price}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="p-2 cursor-pointer rounded-full transition-colors"
              style={{ color: "#5A8F76" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#EEE8B2")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
              onClick={() => navigate(`/edit-item/${data._id}`)}
            >
              <FaPen size={16} />
            </div>
            <div
              className="p-2 cursor-pointer rounded-full transition-colors"
              style={{ color: "#5A8F76" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#EEE8B2")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
              onClick={handleDelete}
            >
              <FaTrashAlt size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerItemCard;
