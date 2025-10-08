import React, { useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import {
  FaHeartbeat,
  FaPills,
  FaTruck,
  FaShieldAlt,
  FaClock,
  FaUserMd,
  FaPhoneAlt,
  FaAmbulance,
  FaCheckCircle,
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaQuoteLeft,
  FaRegClock,
} from "react-icons/fa";
import { MdVerified, MdSecurity, MdLocalPharmacy } from "react-icons/md";
import { BiSupport, BiMoney } from "react-icons/bi";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";

import LogoPng from "../assets/logo.png";

function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");

  const openSignIn = () => {
    setAuthMode("signin");
    setIsAuthModalOpen(true);
  };

  const openSignUp = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  const features = [
    {
      icon: <FaPills size={24} />,
      title: "Wide Medicine Range",
      description: "Access to thousands of medicines and healthcare products",
    },
    {
      icon: <FaTruck size={24} />,
      title: "Fast Delivery",
      description: "Quick and reliable delivery to your doorstep",
    },
    {
      icon: <FaShieldAlt size={24} />,
      title: "Authentic Products",
      description: "100% genuine medicines from verified pharmacies",
    },
    {
      icon: <FaClock size={24} />,
      title: "24/7 Service",
      description: "Round-the-clock availability for emergencies",
    },
    {
      icon: <FaUserMd size={24} />,
      title: "Expert Consultation",
      description: "Professional healthcare guidance and support",
    },
    {
      icon: <FaHeartbeat size={24} />,
      title: "Health Tracking",
      description: "Monitor your health journey with smart insights",
    },
  ];

  return (
    <>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#EEE8B2" }}
      >
        {/* Navigation */}
        <nav
          className="w-full h-[85px] flex items-center justify-between px-[20px] md:px-[40px] fixed top-0 z-[9999] backdrop-blur-md"
          style={{
            background: "linear-gradient(135deg, #EEE8B2 0%, #F5F1C8 100%)",
            borderBottom: "1px solid rgba(90, 143, 118, 0.2)",
            boxShadow: "0 8px 32px rgba(8, 27, 27, 0.1)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                boxShadow: "0 4px 15px rgba(90, 143, 118, 0.3)",
              }}
            >
              <img
                src={LogoPng}
                alt="Janta Medical Service Logo"
                className="w-15 h-15 object-cover"
                style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#5A8F76] to-[#203B37] bg-clip-text text-transparent">
                Janta Medical Service
              </h1>
              <p
                className="text-sm hidden md:block"
                style={{ color: "#5A8F76" }}
              >
                Healthcare Delivered
              </p>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={openSignIn}
              className="px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg border"
              style={{
                backgroundColor: "rgba(90, 143, 118, 0.1)",
                borderColor: "rgba(90, 143, 118, 0.3)",
                color: "#5A8F76",
              }}
            >
              Sign In
            </button>
            <button
              onClick={openSignUp}
              className="px-6 py-2 rounded-xl font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                boxShadow: "0 4px 15px rgba(90, 143, 118, 0.3)",
              }}
            >
              Sign Up
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 pt-[120px] pb-[60px]">
          <div className="max-w-6xl mx-auto px-[20px] md:px-[40px]">
            {/* Hero Content */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#5A8F76] to-[#203B37] bg-clip-text text-transparent">
                  Healthcare
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#203B37] to-[#5A8F76] bg-clip-text text-transparent">
                  at Your Doorstep
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Order medicines online and get them delivered quickly and
                safely. Your health is our priority.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={openSignUp}
                  className="px-8 py-4 rounded-2xl font-semibold text-white text-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                    boxShadow: "0 8px 25px rgba(90, 143, 118, 0.3)",
                  }}
                >
                  Get Started Today
                </button>
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={openSignIn}
                    className="font-semibold transition-colors duration-200 hover:underline"
                    style={{ color: "#5A8F76" }}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#5A8F76] to-[#203B37] bg-clip-text text-transparent">
                Why Choose Janta Medical Service?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-xl bg-white/70 backdrop-blur-lg"
                    style={{
                      boxShadow: "0 10px 25px rgba(8, 27, 27, 0.1)",
                      border: "1px solid rgba(90, 143, 118, 0.2)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background:
                          "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                        color: "white",
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ color: "#203B37" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Janta vs Others - Comparison Strip */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#5A8F76] to-[#203B37] bg-clip-text text-transparent">
                Why Choose Janta Medical Service?
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Compare us with traditional pharmacies and other online medicine
                platforms
              </p>

              <div className="overflow-x-auto">
                <div
                  className="min-w-[800px] bg-white/70 backdrop-blur-lg rounded-3xl p-8"
                  style={{
                    boxShadow: "0 20px 40px rgba(8, 27, 27, 0.15)",
                    border: "1px solid rgba(90, 143, 118, 0.2)",
                  }}
                >
                  <div className="grid grid-cols-4 gap-6">
                    <div className="text-center">
                      <h3
                        className="font-bold text-lg mb-12"
                        style={{ color: "#203B37" }}
                      >
                        Features
                      </h3>
                      <div
                        className="space-y-4 text-sm font-medium"
                        style={{ color: "#203B37" }}
                      >
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Delivery Time
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Medicine Verification
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Emergency Service
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Price Transparency
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Prescription Management
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Medicine Reminders
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div
                        className="mb-6 p-3 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                        }}
                      >
                        <h3 className="font-bold text-lg text-white">
                          Janta Medical Service
                        </h3>
                      </div>
                      <div className="space-y-4 text-sm">
                        <div className="py-3 px-2 h-12 flex items-center justify-center gap-2 text-green-600">
                          <FaCheckCircle size={16} />
                          <span className="font-semibold">Fast Delivery</span>
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center gap-2 text-orange-500">
                          <FaRegClock size={16} />
                          <span className="font-semibold">Coming Soon</span>
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center gap-2 text-green-600">
                          <FaCheckCircle size={16} />
                          <span className="font-semibold">24/7 Available</span>
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center gap-2 text-green-600">
                          <FaCheckCircle size={16} />
                          <span className="font-semibold">No Hidden Costs</span>
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center gap-2 text-green-600">
                          <FaCheckCircle size={16} />
                          <span className="font-semibold">Order History</span>
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center gap-2 text-orange-500">
                          <FaRegClock size={16} />
                          <span className="font-semibold">Coming Soon</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="mb-6 p-3 rounded-xl bg-gray-100">
                        <h3 className="font-bold text-lg text-gray-600">
                          Other Platforms
                        </h3>
                      </div>
                      <div className="space-y-4 text-sm text-gray-500">
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          2-4 Hours
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Limited Checks
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Business Hours Only
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Hidden Charges
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Basic Upload
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center gap-2 text-red-500">
                          <FaTimes size={16} />
                          <span>Not Available</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="mb-6 p-3 rounded-xl bg-gray-100">
                        <h3 className="font-bold text-lg text-gray-600">
                          Local Pharmacy
                        </h3>
                      </div>
                      <div className="space-y-4 text-sm text-gray-500">
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Visit Required
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Manual Check
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center gap-2 text-red-500">
                          <FaTimes size={16} />
                          <span>Limited Hours</span>
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Variable Pricing
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center">
                          Paper Based
                        </div>
                        <div className="py-3 px-2 h-12 flex items-center justify-center gap-2 text-red-500">
                          <FaTimes size={16} />
                          <span>Manual Tracking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Story Blog Section */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#5A8F76] to-[#203B37] bg-clip-text text-transparent">
                How Janta Medical Service Started
              </h2>

              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div
                    className="bg-white/70 backdrop-blur-lg rounded-2xl p-8"
                    style={{
                      boxShadow: "0 15px 35px rgba(8, 27, 27, 0.12)",
                      border: "1px solid rgba(90, 143, 118, 0.2)",
                    }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                        }}
                      >
                        <FaQuoteLeft className="text-white" size={16} />
                      </div>
                      <div>
                        <h3
                          className="font-bold text-lg"
                          style={{ color: "#203B37" }}
                        >
                          The Beginning
                        </h3>
                        <p className="text-sm text-gray-600">
                          2022 - A Personal Crisis
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      It all started when our founder's elderly mother needed
                      emergency medication at 2 AM. After calling dozens of
                      pharmacies and finding none open, he realized how broken
                      our healthcare accessibility system was.
                    </p>
                  </div>

                  <div
                    className="bg-white/70 backdrop-blur-lg rounded-2xl p-8"
                    style={{
                      boxShadow: "0 15px 35px rgba(8, 27, 27, 0.12)",
                      border: "1px solid rgba(90, 143, 118, 0.2)",
                    }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                        }}
                      >
                        <FaUser className="text-white" size={16} />
                      </div>
                      <div>
                        <h3
                          className="font-bold text-lg"
                          style={{ color: "#203B37" }}
                        >
                          The Mission
                        </h3>
                        <p className="text-sm text-gray-600">
                          2023 - Building Trust
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      "No family should face what we faced that night." This
                      became our mission. We started by partnering with 3 local
                      pharmacies, ensuring 24/7 medicine availability for
                      emergency situations.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div
                    className="bg-white/70 backdrop-blur-lg rounded-2xl p-8"
                    style={{
                      boxShadow: "0 15px 35px rgba(8, 27, 27, 0.12)",
                      border: "1px solid rgba(90, 143, 118, 0.2)",
                    }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                        }}
                      >
                        <MdLocalPharmacy className="text-white" size={20} />
                      </div>
                      <div>
                        <h3
                          className="font-bold text-lg"
                          style={{ color: "#203B37" }}
                        >
                          The Growth
                        </h3>
                        <p className="text-sm text-gray-600">
                          2024 - Expanding Care
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Today, we serve 15+ cities with 500+ partner pharmacies.
                      Our platform has delivered over 50,000 orders, saving
                      precious time during medical emergencies and making
                      healthcare accessible to every household.
                    </p>
                  </div>

                  <div
                    className="bg-white/70 backdrop-blur-lg rounded-2xl p-8"
                    style={{
                      boxShadow: "0 15px 35px rgba(8, 27, 27, 0.12)",
                      border: "1px solid rgba(90, 143, 118, 0.2)",
                    }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                        }}
                      >
                        <FaHeartbeat className="text-white" size={18} />
                      </div>
                      <div>
                        <h3
                          className="font-bold text-lg"
                          style={{ color: "#203B37" }}
                        >
                          The Future
                        </h3>
                        <p className="text-sm text-gray-600">2025 & Beyond</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      We're building India's most trusted medicine delivery
                      network with AI-powered health insights, medicine
                      interaction checkers, and preventive care reminders. Every
                      feature we build asks one question: "Will this help a
                      family in need?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
                  style={{
                    background: "rgba(90, 143, 118, 0.1)",
                    border: "1px solid rgba(90, 143, 118, 0.3)",
                  }}
                >
                  <MdVerified style={{ color: "#5A8F76" }} size={20} />
                  <span className="font-semibold" style={{ color: "#203B37" }}>
                    From Personal Crisis to Public Service - That's Our Story
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Banner */}
            <div className="mb-16">
              <div
                className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, #ff4757 0%, #ff3742 100%)",
                  boxShadow: "0 25px 50px -12px rgba(255, 71, 87, 0.4)",
                }}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                      <FaAmbulance className="text-white" size={28} />
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Medical Emergency?
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Get emergency medicines delivered within 30 minutes, 24/7.
                    Our emergency hotline connects you instantly to nearby
                    pharmacies.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-lg">
                      <FaPhoneAlt className="text-white" size={18} />
                      <div className="text-left">
                        <div className="text-white font-bold">
                          Emergency Hotline
                        </div>
                        <div className="text-white/80 text-sm">
                          +91-911-MEDCARE
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-lg">
                      <FaClock className="text-white" size={18} />
                      <div className="text-left">
                        <div className="text-white font-bold">
                          24/7 Available
                        </div>
                        <div className="text-white/80 text-sm">
                          365 Days a Year
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-white animate-ping"></div>
                      <span className="text-white font-semibold">
                        Available After Login
                      </span>
                    </div>
                    <p className="text-white/90 text-sm">
                      Emergency services, medicine tracking, and 24/7 support
                      are available once you create your free account.
                    </p>
                    <button
                      onClick={openSignUp}
                      className="mt-4 px-6 py-3 bg-white text-red-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
                    >
                      Create Free Account
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div
              className="text-center p-12 rounded-3xl bg-white/70 backdrop-blur-lg"
              style={{
                boxShadow: "0 20px 40px rgba(8, 27, 27, 0.15)",
                border: "1px solid rgba(90, 143, 118, 0.2)",
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#5A8F76] to-[#203B37] bg-clip-text text-transparent">
                Join the Healthcare Revolution
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Thousands of families trust Janta Medical Service for their
                healthcare needs. Experience the difference today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={openSignUp}
                  className="px-10 py-4 rounded-2xl font-semibold text-white text-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #5A8F76 0%, #96CDB0 100%)",
                    boxShadow: "0 8px 25px rgba(90, 143, 118, 0.3)",
                  }}
                >
                  Start Your Health Journey
                </button>
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={openSignIn}
                    className="font-semibold transition-colors duration-200 hover:underline"
                    style={{ color: "#5A8F76" }}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}

export default LandingPage;
