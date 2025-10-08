import axios from "axios";
import React from "react";
import { MdPhone } from "react-icons/md";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../redux/userSlice";
import { useState } from "react";

function OwnerOrderCard({ data }) {
  const [availableBoys, setAvailableBoys] = useState([]);
  const dispatch = useDispatch();
  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true }
      );
      dispatch(updateOrderStatus({ orderId, shopId, status }));
      setAvailableBoys(result.data.availableBoys);
      console.log(result.data);
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
      <div>
        <h2 className="text-lg font-semibold" style={{ color: "#203B37" }}>
          {data.user.fullName}
        </h2>
        <p className="text-sm" style={{ color: "#5A8F76" }}>
          {data.user.email}
        </p>
        <p
          className="flex items-center gap-2 text-sm mt-1"
          style={{ color: "#5A8F76" }}
        >
          <MdPhone />
          <span>{data.user.mobile}</span>
        </p>
        {data.paymentMethod == "online" ? (
          <p className="gap-2 text-sm" style={{ color: "#5A8F76" }}>
            payment: {data.payment ? "true" : "false"}
          </p>
        ) : (
          <p className="gap-2 text-sm" style={{ color: "#5A8F76" }}>
            Payment Method: {data.paymentMethod}
          </p>
        )}
      </div>

      <div
        className="flex items-start flex-col gap-2 text-sm"
        style={{ color: "#5A8F76" }}
      >
        <p>{data?.deliveryAddress?.text}</p>
        <p className="text-xs" style={{ color: "#203B37" }}>
          Lat: {data?.deliveryAddress.latitude} , Lon{" "}
          {data?.deliveryAddress.longitude}
        </p>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {data.shopOrders.shopOrderItems.map((item, index) => (
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
          </div>
        ))}
      </div>

      <div
        className="flex justify-between items-center mt-auto pt-3 border-t"
        style={{ borderColor: "#203B37" }}
      >
        <span className="text-sm">
          status:{" "}
          <span
            className="font-semibold capitalize"
            style={{ color: "#5A8F76" }}
          >
            {data.shopOrders.status}
          </span>
        </span>

        <select
          className="rounded-md px-3 py-1 text-sm focus:outline-none"
          style={{
            border: "1px solid #5A8F76",
            color: "#5A8F76",
            backgroundColor: "white",
          }}
          onChange={(e) =>
            handleUpdateStatus(
              data._id,
              data.shopOrders.shop._id,
              e.target.value
            )
          }
        >
          <option value="">Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out Of Delivery</option>
        </select>
      </div>

      {data.shopOrders.status == "out of delivery" && (
        <div
          className="mt-3 p-2 rounded-lg text-sm gap-4"
          style={{ backgroundColor: "#EEE8B2", border: "1px solid #203B37" }}
        >
          {data.shopOrders.assignedDeliveryBoy ? (
            <p style={{ color: "#203B37" }}>Assigned Delivery Boy:</p>
          ) : (
            <p style={{ color: "#203B37" }}>Available Delivery Boys:</p>
          )}
          {availableBoys?.length > 0 ? (
            availableBoys.map((b) => (
              <div key={b._id} style={{ color: "#5A8F76" }}>
                {b.fullName}-{b.mobile}
              </div>
            ))
          ) : data.shopOrders.assignedDeliveryBoy ? (
            <div style={{ color: "#5A8F76" }}>
              {data.shopOrders.assignedDeliveryBoy.fullName}-
              {data.shopOrders.assignedDeliveryBoy.mobile}
            </div>
          ) : (
            <div style={{ color: "#5A8F76" }}>
              Waiting for delivery boy to accept
            </div>
          )}
        </div>
      )}

      <div
        className="text-right font-bold text-sm"
        style={{ color: "#203B37" }}
      >
        Total: ₹{data.shopOrders.subtotal}
      </div>
    </div>
  );
}

export default OwnerOrderCard;
