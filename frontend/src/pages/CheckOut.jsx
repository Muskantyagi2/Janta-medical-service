import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoArrowBack, IoSearchOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import { MdDeliveryDining } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import axios from "axios";
import { FaMobileScreenButton } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { addMyOrder, setTotalAmount } from "../redux/userSlice";
function RecenterMap({ location }) {
  if (location.lat && location.lon) {
    const map = useMap();
    map.setView([location.lat, location.lon], 16, { animate: true });
  }
  return null;
}

function CheckOut() {
  const { location, address } = useSelector((state) => state.map);
  const { cartItems, totalAmount, userData } = useSelector(
    (state) => state.user
  );
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const AmountWithDeliveryFee = totalAmount + deliveryFee;

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };
  const getCurrentLocation = () => {
    const latitude = userData.location.coordinates[1];
    const longitude = userData.location.coordinates[0];
    dispatch(setLocation({ lat: latitude, lon: longitude }));
    getAddressByLatLng(latitude, longitude);
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );
      dispatch(setAddress(result?.data?.results[0].address_line2));
    } catch (error) {
      console.log(error);
    }
  };

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${apiKey}`
      );
      const { lat, lon } = result.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/place-order`,
        {
          paymentMethod,
          deliveryAddress: {
            text: addressInput,
            latitude: location.lat,
            longitude: location.lon,
          },
          totalAmount: AmountWithDeliveryFee,
          cartItems,
        },
        { withCredentials: true }
      );

      if (paymentMethod == "cod") {
        dispatch(addMyOrder(result.data));
        navigate("/order-placed");
      } else {
        const orderId = result.data.orderId;
        const razorOrder = result.data.razorOrder;
        // Navigate to payment page instead of showing alert
        navigate("/payment", {
          state: {
            orderId,
            razorOrder,
            totalAmount: AmountWithDeliveryFee,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#EEE8B2" }}
    >
      <div
        className=" absolute top-[20px] left-[20px] z-[10]"
        onClick={() => navigate("/")}
      >
        <IoArrowBack size={35} style={{ color: "#5A8F76" }} />
      </div>
      <div
        className="w-full max-w-[900px] bg-white rounded-2xl p-6 space-y-6"
        style={{
          boxShadow: "0 10px 15px -3px #081B1B",
          border: "1px solid #203B37",
        }}
      >
        <h1 className="text-2xl font-bold" style={{ color: "#203B37" }}>
          Checkout
        </h1>

        <section>
          <h2
            className="text-lg font-semibold mb-2 flex items-center gap-2"
            style={{ color: "#203B37" }}
          >
            <IoLocationSharp style={{ color: "#5A8F76" }} /> Delivery Location
          </h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="flex-1 rounded-lg p-2 text-sm focus:outline-none"
              style={{
                border: "1px solid #203B37",
                color: "#203B37",
              }}
              placeholder="Enter Your Delivery Address.."
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            <button
              className="text-white px-3 py-2 rounded-lg flex items-center justify-center transition"
              style={{
                backgroundColor: "#5A8F76",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#96CDB0";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#5A8F76";
              }}
              onClick={getLatLngByAddress}
            >
              <IoSearchOutline size={17} />
            </button>
            <button
              className="text-white px-3 py-2 rounded-lg flex items-center justify-center transition"
              style={{
                backgroundColor: "#5A8F76",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#96CDB0";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#5A8F76";
              }}
              onClick={getCurrentLocation}
            >
              <TbCurrentLocation size={17} />
            </button>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <div className="h-64 w-full flex items-center justify-center">
              <MapContainer
                className={"w-full h-full"}
                center={[location?.lat, location?.lon]}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker
                  position={[location?.lat, location?.lon]}
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                />
              </MapContainer>
            </div>
          </div>
        </section>

        <section>
          <h2
            className="text-lg font-semibold mb-3"
            style={{ color: "#203B37" }}
          >
            Payment Method
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`flex items-center gap-3 rounded-xl p-4 text-left transition cursor-pointer`}
              style={{
                border:
                  paymentMethod === "cod"
                    ? "2px solid #5A8F76"
                    : "1px solid #203B37",
                backgroundColor: paymentMethod === "cod" ? "#EEE8B2" : "white",
                boxShadow:
                  paymentMethod === "cod" ? "0 4px 6px -1px #081B1B" : "none",
              }}
              onClick={() => setPaymentMethod("cod")}
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "#96CDB0" }}
              >
                <MdDeliveryDining
                  style={{ color: "#5A8F76" }}
                  className="text-xl"
                />
              </span>
              <div>
                <p className="font-medium" style={{ color: "#203B37" }}>
                  Cash On Delivery
                </p>
                <p className="text-xs" style={{ color: "#5A8F76" }}>
                  Pay when your Medicine arrives
                </p>
              </div>
            </div>
            <div
              className={`flex items-center gap-3 rounded-xl p-4 text-left transition cursor-pointer`}
              style={{
                border:
                  paymentMethod === "online"
                    ? "2px solid #5A8F76"
                    : "1px solid #203B37",
                backgroundColor:
                  paymentMethod === "online" ? "#EEE8B2" : "white",
                boxShadow:
                  paymentMethod === "online"
                    ? "0 4px 6px -1px #081B1B"
                    : "none",
              }}
              onClick={() => setPaymentMethod("online")}
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "#96CDB0" }}
              >
                <FaMobileScreenButton
                  style={{ color: "#5A8F76" }}
                  className="text-lg"
                />
              </span>
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "#96CDB0" }}
              >
                <FaCreditCard
                  style={{ color: "#5A8F76" }}
                  className="text-lg"
                />
              </span>
              <div>
                <p className="font-medium" style={{ color: "#203B37" }}>
                  UPI / Credit / Debit Card
                </p>
                <p className="text-xs" style={{ color: "#5A8F76" }}>
                  Testing payment - No real money charged
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2
            className="text-lg font-semibold mb-3"
            style={{ color: "#203B37" }}
          >
            Order Summary
          </h2>
          <div
            className="rounded-xl p-4 space-y-2"
            style={{ backgroundColor: "#EEE8B2", border: "1px solid #203B37" }}
          >
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm"
                style={{ color: "#203B37" }}
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <hr style={{ borderColor: "#203B37" }} className="my-2" />
            <div
              className="flex justify-between font-medium"
              style={{ color: "#203B37" }}
            >
              <span>Subtotal</span>
              <span>{totalAmount}</span>
            </div>
            <div className="flex justify-between" style={{ color: "#5A8F76" }}>
              <span>Delivery Fee</span>
              <span>{deliveryFee == 0 ? "Free" : deliveryFee}</span>
            </div>
            <div
              className="flex justify-between text-lg font-bold pt-2"
              style={{ color: "#5A8F76" }}
            >
              <span>Total</span>
              <span>{AmountWithDeliveryFee}</span>
            </div>
          </div>
        </section>
        <button
          className="w-full text-white py-3 rounded-xl font-semibold transition"
          style={{
            backgroundColor: "#5A8F76",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#96CDB0";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#5A8F76";
          }}
          onClick={handlePlaceOrder}
        >
          {" "}
          {paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}
        </button>
      </div>
    </div>
  );
}

export default CheckOut;
