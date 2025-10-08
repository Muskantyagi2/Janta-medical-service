import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCreditCard, FaGooglePay, FaLock, FaShieldAlt } from "react-icons/fa";
import { SiPaytm, SiPhonepe, SiRazorpay } from "react-icons/si";
import { MdAccountBalance, MdPayment } from "react-icons/md";
import { BiMobile } from "react-icons/bi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addMyOrder } from "../redux/userSlice";
import { serverUrl } from "../App";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId, razorOrder, totalAmount } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!orderId || !razorOrder) {
      navigate("/checkout");
    }
  }, [orderId, razorOrder, navigate]);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return cleaned;
    }
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate mock payment ID
      const mockPaymentId = `mock_pay_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Verify payment with backend
      const result = await axios.post(
        `${serverUrl}/api/order/verify-payment`,
        {
          razorpay_payment_id: mockPaymentId,
          orderId,
        },
        { withCredentials: true }
      );

      setShowSuccess(true);

      // Wait for success animation then navigate
      setTimeout(() => {
        dispatch(addMyOrder(result.data));
        navigate("/order-placed");
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      alert("Payment failed. Please try again.");
    }
  };

  if (showSuccess) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: "#EEE8B2" }}
      >
        <div
          className="bg-white rounded-2xl p-8 text-center max-w-md w-full"
          style={{
            boxShadow: "0 8px 16px -4px #081B1B",
            border: "1px solid #203B37",
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#96CDB0" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#5A8F76" }}
            >
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#203B37" }}>
            Payment Successful!
          </h2>
          <p className="mb-4" style={{ color: "#5A8F76" }}>
            Your order has been placed successfully
          </p>
          <div className="text-sm" style={{ color: "#5A8F76" }}>
            Redirecting to order details...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#EEE8B2" }}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 10px 20px -5px #081B1B",
          border: "1px solid #203B37",
        }}
      >
        {/* Header */}
        <div
          className="text-white p-6"
          style={{
            background: "linear-gradient(to right, #5A8F76, #96CDB0)",
          }}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/checkout")}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
            >
              <IoIosArrowRoundBack size={24} />
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold">Secure Payment</h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <FaLock size={14} />
                <span className="text-sm">256-bit SSL Encrypted</span>
              </div>
            </div>
            <div className="w-8"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Payment Methods */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <div
                className="rounded-lg p-3 mb-4"
                style={{
                  backgroundColor: "#EEE8B2",
                  border: "1px solid #203B37",
                }}
              >
                <div
                  className="flex items-center gap-2"
                  style={{ color: "#203B37" }}
                >
                  <FaShieldAlt size={16} />
                  <span className="text-sm font-medium">
                    Test Mode - No real money will be charged
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#203B37" }}
              >
                Choose Payment Method
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setSelectedMethod("card")}
                  className="p-3 rounded-lg border-2 transition"
                  style={{
                    borderColor:
                      selectedMethod === "card" ? "#5A8F76" : "#203B37",
                    backgroundColor:
                      selectedMethod === "card" ? "#EEE8B2" : "white",
                  }}
                >
                  <FaCreditCard
                    className="mx-auto mb-1"
                    size={20}
                    style={{ color: "#5A8F76" }}
                  />
                  <div className="text-xs" style={{ color: "#203B37" }}>
                    Cards
                  </div>
                </button>
                <button
                  onClick={() => setSelectedMethod("upi")}
                  className="p-3 rounded-lg border-2 transition"
                  style={{
                    borderColor:
                      selectedMethod === "upi" ? "#5A8F76" : "#203B37",
                    backgroundColor:
                      selectedMethod === "upi" ? "#EEE8B2" : "white",
                  }}
                >
                  <BiMobile
                    className="mx-auto mb-1"
                    size={20}
                    style={{ color: "#5A8F76" }}
                  />
                  <div className="text-xs" style={{ color: "#203B37" }}>
                    UPI
                  </div>
                </button>
                <button
                  onClick={() => setSelectedMethod("wallet")}
                  className="p-3 rounded-lg border-2 transition"
                  style={{
                    borderColor:
                      selectedMethod === "wallet" ? "#5A8F76" : "#203B37",
                    backgroundColor:
                      selectedMethod === "wallet" ? "#EEE8B2" : "white",
                  }}
                >
                  <MdAccountBalance
                    className="mx-auto mb-1"
                    size={20}
                    style={{ color: "#5A8F76" }}
                  />
                  <div className="text-xs" style={{ color: "#203B37" }}>
                    Wallets
                  </div>
                </button>
              </div>
            </div>

            {/* Card Payment Form */}
            {selectedMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#203B37" }}
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full p-3 rounded-lg focus:outline-none transition"
                    style={{
                      border: "1px solid #203B37",
                      focusBorderColor: "#5A8F76",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#5A8F76")}
                    onBlur={(e) => (e.target.style.borderColor = "#203B37")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#203B37" }}
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full p-3 rounded-lg focus:outline-none transition"
                      style={{
                        border: "1px solid #203B37",
                        focusBorderColor: "#5A8F76",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#5A8F76")}
                      onBlur={(e) => (e.target.style.borderColor = "#203B37")}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#203B37" }}
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(
                          e.target.value.replace(/\D/g, "").substring(0, 3)
                        )
                      }
                      placeholder="123"
                      maxLength={3}
                      className="w-full p-3 rounded-lg focus:outline-none transition"
                      style={{
                        border: "1px solid #203B37",
                        focusBorderColor: "#5A8F76",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#5A8F76")}
                      onBlur={(e) => (e.target.style.borderColor = "#203B37")}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#203B37" }}
                  >
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Enter name on card"
                    className="w-full p-3 rounded-lg focus:outline-none transition"
                    style={{
                      border: "1px solid #203B37",
                      focusBorderColor: "#5A8F76",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#5A8F76")}
                    onBlur={(e) => (e.target.style.borderColor = "#203B37")}
                  />
                </div>
              </div>
            )}

            {/* UPI Payment Form */}
            {selectedMethod === "upi" && (
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#203B37" }}
                  >
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@paytm"
                    className="w-full p-3 rounded-lg focus:outline-none transition"
                    style={{
                      border: "1px solid #203B37",
                      focusBorderColor: "#5A8F76",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#5A8F76")}
                    onBlur={(e) => (e.target.style.borderColor = "#203B37")}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className="flex items-center justify-center p-3 rounded-lg"
                    style={{ border: "1px solid #203B37" }}
                  >
                    <FaGooglePay size={24} style={{ color: "#5A8F76" }} />
                  </div>
                  <div
                    className="flex items-center justify-center p-3 rounded-lg"
                    style={{ border: "1px solid #203B37" }}
                  >
                    <SiPhonepe size={24} style={{ color: "#5A8F76" }} />
                  </div>
                  <div
                    className="flex items-center justify-center p-3 rounded-lg"
                    style={{ border: "1px solid #203B37" }}
                  >
                    <SiPaytm size={24} style={{ color: "#5A8F76" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Wallet Payment */}
            {selectedMethod === "wallet" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="flex items-center justify-center p-4 rounded-lg cursor-pointer transition"
                    style={{ border: "1px solid #203B37" }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = "#5A8F76";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "#203B37";
                    }}
                  >
                    <SiPaytm size={32} style={{ color: "#5A8F76" }} />
                  </div>
                  <div
                    className="flex items-center justify-center p-4 rounded-lg cursor-pointer transition"
                    style={{ border: "1px solid #203B37" }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = "#5A8F76";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "#203B37";
                    }}
                  >
                    <FaGooglePay size={32} style={{ color: "#5A8F76" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div
            className="lg:w-80 p-6"
            style={{
              backgroundColor: "#EEE8B2",
              borderLeft: "1px solid #203B37",
            }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#203B37" }}
            >
              Order Summary
            </h3>
            <div className="space-y-3 mb-6">
              <div
                className="flex justify-between"
                style={{ color: "#5A8F76" }}
              >
                <span>Amount</span>
                <span>₹{totalAmount}</span>
              </div>
              <div
                className="flex justify-between"
                style={{ color: "#5A8F76" }}
              >
                <span>Processing Fee</span>
                <span>₹0</span>
              </div>
              <hr className="my-3" style={{ borderColor: "#203B37" }} />
              <div
                className="flex justify-between text-lg font-bold"
                style={{ color: "#203B37" }}
              >
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs mb-2" style={{ color: "#5A8F76" }}>
                Order ID: {razorOrder?.id}
              </div>
              <div className="text-xs" style={{ color: "#5A8F76" }}>
                Test Transaction ID: {razorOrder?.receipt}
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full text-white py-4 rounded-lg font-semibold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isProcessing
                  ? "#96CDB0"
                  : "linear-gradient(to right, #5A8F76, #96CDB0)",
                boxShadow: "0 4px 6px -1px #081B1B",
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.target.style.background =
                    "linear-gradient(to right, #96CDB0, #5A8F76)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isProcessing) {
                  e.target.style.background =
                    "linear-gradient(to right, #5A8F76, #96CDB0)";
                }
              }}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                `Pay ₹${totalAmount}`
              )}
            </button>

            <div
              className="mt-4 text-center text-xs"
              style={{ color: "#5A8F76" }}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <FaLock size={10} />
                <span>Secured by 256-bit SSL</span>
              </div>
              <div>This is a test transaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="rounded-2xl p-8 text-center max-w-sm w-full mx-4"
            style={{ backgroundColor: "#EEE8B2", border: "2px solid #203B37" }}
          >
            <div
              className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: "#5A8F76", borderTopColor: "transparent" }}
            ></div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#203B37" }}
            >
              Processing Payment
            </h3>
            <p style={{ color: "#5A8F76" }}>
              Please wait while we process your payment...
            </p>
            <div className="mt-4 text-sm" style={{ color: "#5A8F76" }}>
              This may take a few seconds
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
