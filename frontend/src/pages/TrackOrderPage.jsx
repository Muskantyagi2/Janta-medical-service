import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryBoyTracking from "../components/DeliveryBoyTracking";
import { useSelector } from "react-redux";
import { IoArrowBack, IoLocationSharp } from "react-icons/io5";
import {
  FaStore,
  FaPills,
  FaUserMd,
  FaPhone,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";
import { MdDeliveryDining, MdLocalPharmacy } from "react-icons/md";
function TrackOrderPage() {
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState();
  const navigate = useNavigate();
  const { socket } = useSelector((state) => state.user);
  const [liveLocations, setLiveLocations] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [updateReceived, setUpdateReceived] = useState(false);

  // Medical theme colors
  const primaryColor = "#5A8F76"; // Primary green
  const hoverColor = "#96CDB0"; // Hover green
  const bgColor = "#EEE8B2"; // Background cream
  const borderColor = "#203B37"; // Border dark green

  const handleGetOrder = useCallback(async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${serverUrl}/api/order/get-order-by-id/${orderId}`,
        { withCredentials: true }
      );
      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (!socket) {
      console.log("Socket not available yet");
      return;
    }

    console.log("Setting up socket listeners for orderId:", orderId);
    console.log("Socket connected:", socket.connected);
    console.log("Socket ID:", socket.id);

    const handleLocationUpdate = ({ deliveryBoyId, latitude, longitude }) => {
      console.log(
        "✅ Received location update for delivery boy:",
        deliveryBoyId
      );
      setLiveLocations((prev) => ({
        ...prev,
        [deliveryBoyId]: { lat: latitude, lon: longitude },
      }));
    };

    const handleStatusUpdate = ({ orderId: updateOrderId, status }) => {
      console.log(
        "✅ Received status update for order:",
        updateOrderId,
        "Status:",
        status
      );
      console.log("Current tracking order ID:", orderId);

      // Use orderId from params instead of currentOrder._id for more reliable comparison
      if (updateOrderId === orderId) {
        console.log("🎯 Status update matches current order, refreshing...");
        setUpdateReceived(true);
        setLastUpdate(Date.now()); // Force re-render
        handleGetOrder();

        // Reset the update indicator after a short delay
        setTimeout(() => setUpdateReceived(false), 2000);
      } else {
        console.log("❌ Status update for different order, ignoring");
      }
    };

    socket.on("updateDeliveryLocation", handleLocationUpdate);
    socket.on("update-status", handleStatusUpdate);

    return () => {
      console.log("Cleaning up socket listeners");
      socket.off("updateDeliveryLocation", handleLocationUpdate);
      socket.off("update-status", handleStatusUpdate);
    };
  }, [socket, orderId, handleGetOrder]);

  useEffect(() => {
    handleGetOrder();
  }, [orderId, handleGetOrder, lastUpdate]);
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: bgColor }}>
      <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
        {/* Header Section */}
        <div
          className="bg-white p-4 rounded-2xl shadow-lg"
          style={{
            border: `2px solid ${primaryColor}`,
            boxShadow: "0 4px 6px -1px rgba(90, 143, 118, 0.1)",
          }}
        >
          <div
            className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            <div
              className="p-2 rounded-full hover:scale-105 transition-transform"
              style={{ backgroundColor: `${primaryColor}15` }}
            >
              <IoArrowBack size={24} style={{ color: primaryColor }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: borderColor }}>
                Track Your Order
                {updateReceived && (
                  <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded animate-pulse">
                    Updated!
                  </span>
                )}
              </h1>
              <p className="text-sm" style={{ color: `${borderColor}80` }}>
                Real-time updates on your medicine delivery
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
            style={{
              border: `2px solid ${primaryColor}`,
            }}
          >
            <div
              className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
              style={{
                borderColor: primaryColor,
                borderTopColor: "transparent",
              }}
            />
            <p className="text-sm font-medium" style={{ color: borderColor }}>
              Loading your order details...
            </p>
          </div>
        )}

        {/* Order Details */}
        {!loading &&
          currentOrder?.shopOrders?.map((shopOrder, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg space-y-4 hover:shadow-xl transition-shadow duration-300"
              style={{
                border: `2px solid ${primaryColor}`,
                boxShadow:
                  "0 4px 6px -1px rgba(90, 143, 118, 0.1), 0 2px 4px -1px rgba(90, 143, 118, 0.06)",
              }}
            >
              <div>
                <div
                  className="flex items-center gap-3 mb-4 p-3 rounded-lg"
                  style={{ backgroundColor: `${primaryColor}08` }}
                >
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <MdLocalPharmacy size={20} className="text-white" />
                  </div>
                  <p
                    className="text-xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    {shopOrder.shop.name}
                  </p>
                </div>

                <div className="space-y-4">
                  <div
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: `${primaryColor}08` }}
                  >
                    <FaPills
                      size={16}
                      style={{ color: primaryColor, marginTop: "2px" }}
                    />
                    <div className="flex-1">
                      <span
                        className="font-semibold text-sm block mb-1"
                        style={{ color: borderColor }}
                      >
                        Medicines Ordered:
                      </span>
                      <span className="text-sm" style={{ color: borderColor }}>
                        {shopOrder.shopOrderItems
                          ?.map((i) => i.name)
                          .join(", ")}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: `${hoverColor}15` }}
                  >
                    <div
                      className="p-2 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <span className="text-white text-xs font-bold">₹</span>
                    </div>
                    <div>
                      <span
                        className="font-semibold text-sm block"
                        style={{ color: borderColor }}
                      >
                        Order Total:
                      </span>
                      <span
                        className="text-xl font-bold"
                        style={{ color: primaryColor }}
                      >
                        ₹{shopOrder.subtotal}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex items-start gap-3 p-4 rounded-lg"
                    style={{
                      backgroundColor: `${bgColor}80`,
                      border: `1px solid ${primaryColor}30`,
                    }}
                  >
                    <IoLocationSharp
                      size={18}
                      style={{ color: primaryColor, marginTop: "2px" }}
                    />
                    <div>
                      <span
                        className="font-semibold text-sm block mb-1"
                        style={{ color: borderColor }}
                      >
                        Delivery Address:
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: borderColor }}
                      >
                        {currentOrder.deliveryAddress?.text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {shopOrder.status !== "delivered" ? (
                <>
                  {shopOrder.assignedDeliveryBoy ? (
                    <div
                      className="p-4 rounded-lg space-y-3"
                      style={{
                        backgroundColor: `${primaryColor}10`,
                        border: `1px solid ${primaryColor}30`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="p-2 rounded-full"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <MdDeliveryDining size={18} className="text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: primaryColor }}
                          />
                          <span
                            className="font-semibold text-sm"
                            style={{ color: borderColor }}
                          >
                            Delivery Boy Assigned
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaUserMd size={14} style={{ color: primaryColor }} />
                        <p className="text-sm" style={{ color: borderColor }}>
                          <span className="font-medium">Name:</span>{" "}
                          {shopOrder.assignedDeliveryBoy.fullName}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaPhone size={14} style={{ color: primaryColor }} />
                        <p className="text-sm" style={{ color: borderColor }}>
                          <span className="font-medium">Contact:</span>{" "}
                          {shopOrder.assignedDeliveryBoy.mobile}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="p-4 rounded-lg text-center"
                      style={{
                        backgroundColor: `${hoverColor}20`,
                        border: `1px dashed ${primaryColor}`,
                      }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <FaTruck size={16} style={{ color: primaryColor }} />
                        <p
                          className="font-semibold text-sm"
                          style={{ color: borderColor }}
                        >
                          Delivery Boy Assignment Pending
                        </p>
                      </div>
                      <p
                        className="text-xs"
                        style={{ color: `${borderColor}80` }}
                      >
                        We're finding the best delivery partner for your order
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="p-6 rounded-lg text-center"
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    border: `2px solid ${primaryColor}`,
                  }}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <FaCheckCircle size={24} style={{ color: primaryColor }} />
                    <p
                      className="font-bold text-lg"
                      style={{ color: primaryColor }}
                    >
                      Delivered Successfully!
                    </p>
                  </div>
                  <p className="text-sm" style={{ color: `${borderColor}80` }}>
                    Your medicines have been delivered safely
                  </p>
                </div>
              )}

              {shopOrder.assignedDeliveryBoy &&
                shopOrder.status !== "delivered" && (
                  <div
                    className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg"
                    style={{ border: `2px solid ${primaryColor}` }}
                  >
                    <DeliveryBoyTracking
                      data={{
                        deliveryBoyLocation: liveLocations[
                          shopOrder.assignedDeliveryBoy._id
                        ] || {
                          lat: shopOrder.assignedDeliveryBoy.location
                            ?.coordinates?.[1],
                          lon: shopOrder.assignedDeliveryBoy.location
                            ?.coordinates?.[0],
                        },
                        customerLocation: {
                          lat: currentOrder.deliveryAddress?.latitude,
                          lon: currentOrder.deliveryAddress?.longitude,
                        },
                      }}
                    />
                  </div>
                )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TrackOrderPage;
