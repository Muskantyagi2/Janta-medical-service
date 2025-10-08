import React from "react";
import Nav from "./Nav.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect } from "react";
import { useState } from "react";
import DeliveryBoyTracking from "./DeliveryBoyTracking";
import { FaSync } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function DeliveryBoy() {
  const { userData, socket } = useSelector((state) => state.user);
  const [currentOrder, setCurrentOrder] = useState();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [availableAssignments, setAvailableAssignments] = useState(null);
  const [otp, setOtp] = useState("");
  const [todayDeliveries, setTodayDeliveries] = useState([]);
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!socket || userData.role !== "deliveryBoy") return;
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setDeliveryBoyLocation({ lat: latitude, lon: longitude });
          socket.emit("updateLocation", {
            latitude,
            longitude,
            userId: userData._id,
          });
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [socket, userData]);

  const ratePerDelivery = 50;
  const totalEarning = todayDeliveries.reduce(
    (sum, d) => sum + d.count * ratePerDelivery,
    0
  );

  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, {
        withCredentials: true,
      });
      setAvailableAssignments(result.data);
    } catch (error) {
      console.log("Error fetching assignments:", error);
      setAvailableAssignments([]); // Set empty array on error
    }
  };

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        { withCredentials: true }
      );
      setCurrentOrder(result.data);
    } catch (error) {
      console.log("Error fetching current order:", error);
      // If error is 400, it means no current order (normal case)
      if (error.response?.status === 400) {
        setCurrentOrder(null);
      }
    }
  };

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/accept-order/${assignmentId}`,
        { withCredentials: true }
      );
      console.log(result.data);
      // Refresh both current order and available assignments
      await getCurrentOrder();
      await getAssignments();
    } catch (error) {
      console.log("Error accepting order:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to accept order";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewAssignment = (data) => {
      console.log("New assignment received:", data);
      // Refresh assignments to get the latest data
      getAssignments();
    };

    const handleOrderStatusUpdate = (data) => {
      console.log("Order status updated:", data);
      // Refresh current order and assignments
      getCurrentOrder();
      getAssignments();
    };

    socket.on("newAssignment", handleNewAssignment);
    socket.on("orderStatusUpdate", handleOrderStatusUpdate);

    return () => {
      socket.off("newAssignment", handleNewAssignment);
      socket.off("orderStatusUpdate", handleOrderStatusUpdate);
    };
  }, [socket]);

  const sendOtp = async () => {
    setLoading(true);
    setMessage(""); // Clear any previous messages
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
        },
        { withCredentials: true }
      );
      setLoading(false);
      setShowOtpBox(true);
      setMessage("OTP sent successfully!");
      console.log(result.data);
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Failed to send OTP";
      setMessage(errorMessage);
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };
  const verifyOtp = async () => {
    setMessage("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
          otp,
        },
        { withCredentials: true }
      );
      console.log(result.data);
      setMessage(result.data.message);
      // Give user time to see success message before reload
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      // Show specific error message to user
      const errorMessage =
        error.response?.data?.message || "OTP verification failed";
      setMessage(errorMessage);
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleTodayDeliveries = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-today-deliveries`,
        { withCredentials: true }
      );
      console.log(result.data);
      setTodayDeliveries(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssignments();
    getCurrentOrder();
    handleTodayDeliveries();

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      getAssignments();
      getCurrentOrder();
    }, 30000);

    return () => clearInterval(interval);
  }, [userData]);
  return (
    <div
      className="w-screen min-h-screen flex flex-col gap-5 items-center overflow-y-auto"
      style={{ backgroundColor: "#EEE8B2" }}
    >
      <Nav />
      <div className="w-full max-w-[800px] flex flex-col gap-5 items-center">
        <div
          className="bg-white rounded-2xl p-5 flex flex-col justify-start items-center w-[90%] text-center gap-2"
          style={{
            boxShadow: "0 4px 6px -1px #081B1B",
            border: "1px solid #203B37",
          }}
        >
          <h1 className="text-xl font-bold" style={{ color: "#5A8F76" }}>
            Welcome, {userData.fullName}
          </h1>
          <p style={{ color: "#203B37" }}>
            <span className="font-semibold">Latitude:</span>{" "}
            {deliveryBoyLocation?.lat},{" "}
            <span className="font-semibold">Longitude:</span>{" "}
            {deliveryBoyLocation?.lon}
          </p>
        </div>

        <div
          className="bg-white rounded-2xl p-5 w-[90%] mb-6"
          style={{
            boxShadow: "0 4px 6px -1px #081B1B",
            border: "1px solid #203B37",
          }}
        >
          <h1 className="text-lg font-bold mb-3" style={{ color: "#5A8F76" }}>
            Today Deliveries
          </h1>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={todayDeliveries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tickFormatter={(h) => `${h}:00`} />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(value) => [value, "orders"]}
                labelFormatter={(label) => `${label}:00`}
              />
              <Bar dataKey="count" fill="#5A8F76" />
            </BarChart>
          </ResponsiveContainer>

          <div
            className="max-w-sm mx-auto mt-6 p-6 bg-white rounded-2xl text-center"
            style={{
              boxShadow: "0 6px 10px -2px #081B1B",
              border: "1px solid #203B37",
            }}
          >
            <h1
              className="text-xl font-semibold mb-2"
              style={{ color: "#203B37" }}
            >
              Today's Earning
            </h1>
            <span className="text-3xl font-bold" style={{ color: "#5A8F76" }}>
              ₹{totalEarning}
            </span>
          </div>
        </div>

        {!currentOrder && (
          <div
            className="bg-white rounded-2xl p-5 w-[90%]"
            style={{
              boxShadow: "0 4px 6px -1px #081B1B",
              border: "1px solid #203B37",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h1
                className="text-lg font-bold flex items-center gap-2"
                style={{ color: "#203B37" }}
              >
                Available Orders
              </h1>
              <button
                className="text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1"
                style={{ backgroundColor: "#5A8F76" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#96CDB0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#5A8F76";
                }}
                onClick={() => {
                  getAssignments();
                  getCurrentOrder();
                }}
              >
                <FaSync size={12} />
                Refresh
              </button>
            </div>

            <div className="space-y-4">
              {availableAssignments?.length > 0 ? (
                availableAssignments.map((a, index) => (
                  <div
                    className="rounded-lg p-4 flex justify-between items-center"
                    key={index}
                    style={{ border: "1px solid #203B37" }}
                  >
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#203B37" }}
                      >
                        {a?.shopName}
                      </p>
                      <p className="text-sm" style={{ color: "#5A8F76" }}>
                        <span className="font-semibold">Delivery Address:</span>{" "}
                        {a?.deliveryAddress.text}
                      </p>
                      <p className="text-xs" style={{ color: "#96CDB0" }}>
                        {a.items.length} items | {a.subtotal}
                      </p>
                    </div>
                    <button
                      className="text-white px-4 py-1 rounded-lg text-sm transition-colors"
                      style={{ backgroundColor: "#5A8F76" }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#96CDB0";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#5A8F76";
                      }}
                      onClick={() => acceptOrder(a.assignmentId)}
                    >
                      Accept
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm" style={{ color: "#96CDB0" }}>
                  No Available Orders
                </p>
              )}
            </div>
          </div>
        )}

        {currentOrder && (
          <div
            className="bg-white rounded-2xl p-5 w-[90%]"
            style={{
              boxShadow: "0 4px 6px -1px #081B1B",
              border: "1px solid #203B37",
            }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: "#203B37" }}>
              📦Current Order
            </h2>
            <div
              className="rounded-lg p-4 mb-3"
              style={{ border: "1px solid #203B37" }}
            >
              <p className="font-semibold text-sm" style={{ color: "#203B37" }}>
                {currentOrder?.shopOrder.shop.name}
              </p>
              <p className="text-sm" style={{ color: "#5A8F76" }}>
                {currentOrder.deliveryAddress.text}
              </p>
              <p className="text-xs" style={{ color: "#96CDB0" }}>
                {currentOrder.shopOrder.shopOrderItems.length} items |{" "}
                {currentOrder.shopOrder.subtotal}
              </p>
            </div>

            <DeliveryBoyTracking
              data={{
                deliveryBoyLocation: deliveryBoyLocation || {
                  lat: userData.location.coordinates[1],
                  lon: userData.location.coordinates[0],
                },
                customerLocation: {
                  lat: currentOrder.deliveryAddress.latitude,
                  lon: currentOrder.deliveryAddress.longitude,
                },
              }}
            />
            {!showOtpBox ? (
              <button
                className="mt-4 w-full text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 active:scale-95"
                style={{
                  backgroundColor: "#5A8F76",
                  boxShadow: "0 4px 6px -1px #081B1B",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#96CDB0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#5A8F76";
                }}
                onClick={sendOtp}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "Mark As Delivered"
                )}
              </button>
            ) : (
              <div
                className="mt-4 p-4 rounded-xl"
                style={{
                  backgroundColor: "#EEE8B2",
                  border: "1px solid #203B37",
                }}
              >
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: "#203B37" }}
                >
                  Enter Otp send to{" "}
                  <span style={{ color: "#5A8F76" }}>
                    {currentOrder.user.fullName}
                  </span>
                </p>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg mb-3 focus:outline-none"
                  style={{
                    border: "1px solid #203B37",
                    color: "#203B37",
                  }}
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
                {message && (
                  <p
                    className="text-center text-2xl mb-4"
                    style={{ color: "#5A8F76" }}
                  >
                    {message}
                  </p>
                )}

                <button
                  className="w-full text-white py-2 rounded-lg font-semibold transition-all"
                  style={{ backgroundColor: "#5A8F76" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#96CDB0";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#5A8F76";
                  }}
                  onClick={verifyOtp}
                >
                  Submit OTP
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryBoy;
