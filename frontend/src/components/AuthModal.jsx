import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";

import axios from "axios";
import { serverUrl } from "../App";
import {
  GoogleAuthProvider,
  signInWithPopup,

} from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import LogoPng from "../assets/logo.png";

function AuthModal({ isOpen, onClose, initialMode = "signin" }) {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("user");

  const dispatch = useDispatch();

  const primaryColor = "#5A8F76";

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setMobile("");
    setRole("user");
    setErr("");
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setErr("");
      setLoading(false);
      handleClose();
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, mobile, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setErr("");
      setLoading(false);
      handleClose();
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErr(""); // Clear previous errors
    try {
      console.log("Starting Google Auth...");
      const provider = new GoogleAuthProvider();
      console.log("Provider created");

      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful:", result.user.email);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
        },
        { withCredentials: true }
      );
      console.log("Backend auth successful:", data);

      dispatch(setUserData(data));
      setLoading(false);
      handleClose();
    } catch (error) {
      console.error("Google Auth Error Details:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      let errorMessage = "Google authentication failed";

      // Handle specific Firebase Auth errors
      if (error.code === "auth/unauthorized-domain") {
        errorMessage =
          "This domain is not authorized for Google Sign-In. Please contact administrator.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup was blocked. Please allow popups and try again.";
      } else if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in was cancelled. Please try again.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else if (error.response) {
        errorMessage = error.response.data.message || "Server error occurred";
      }

      setErr(errorMessage);
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setErr("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-[90%] max-w-[450px] max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-lg rounded-3xl p-8 mx-4"
        style={{
          boxShadow: "0 25px 50px -12px rgba(8, 27, 27, 0.25)",
          border: "1px solid rgba(90, 143, 118, 0.2)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: "rgba(203, 55, 55, 0.1)" }}
        >
          <RxCross2 size={20} style={{ color: "#cb3737" }} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
              boxShadow: "0 8px 25px rgba(90, 143, 118, 0.3)",
            }}
          >
            <img
              src={LogoPng}
              alt="Janta Medical Service Logo"
              className="w-14 h-14 object-cover"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
            />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#5A8F76] to-[#203B37] bg-clip-text text-transparent">
            {mode === "signin" ? "Welcome Back" : "Join Janta Medical Service"}
          </h2>
          <p className="text-gray-600 mt-2 text-center">
            {mode === "signin"
              ? "Sign in to access your healthcare dashboard"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Error Message */}
        {err && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm text-center">{err}</p>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    focusRingColor: primaryColor,
                    borderColor: fullName ? primaryColor : undefined,
                  }}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    focusRingColor: primaryColor,
                    borderColor: mobile ? primaryColor : undefined,
                  }}
                  placeholder="Enter your mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{ focusRingColor: primaryColor }}
                >
                  <option value="user">Customer</option>
                  <option value="owner">Pharmacy Owner</option>
                  <option value="deliveryBoy">Delivery Partner</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200"
              style={{
                focusRingColor: primaryColor,
                borderColor: email ? primaryColor : undefined,
              }}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  focusRingColor: primaryColor,
                  borderColor: password ? primaryColor : undefined,
                }}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <FaRegEyeSlash size={18} />
                ) : (
                  <FaRegEye size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={mode === "signin" ? handleSignIn : handleSignUp}
          disabled={loading}
          className="w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
            boxShadow: "0 8px 25px rgba(90, 143, 118, 0.3)",
          }}
        >
          {loading ? (
            <ClipLoader color="white" size={20} />
          ) : mode === "signin" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Auth */}
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-3 px-4 border border-gray-200 rounded-xl font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-md flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <ClipLoader color="#5A8F76" size={20} />
          ) : (
            <>
              <FcGoogle size={20} />
              Continue with Google
            </>
          )}
        </button>

        {/* Switch Mode */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {mode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={switchMode}
              className="ml-2 font-semibold transition-colors duration-200 hover:underline"
              style={{ color: primaryColor }}
            >
              {mode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
