import React, { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";

function Footer() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
    rating: 5,
  });

  // Default testimonials
  const defaultTestimonials = [
    {
      id: "default-1",
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment:
        "Amazing service! Medicines delivered right to my doorstep within 30 minutes. Very reliable for emergency needs.",
      image: "👨‍💼",
    },
    {
      id: "default-2",
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment:
        "Best medicine delivery app in our area! Quick delivery and genuine medicines. Saved me during late night emergencies.",
      image: "👩‍💻",
    },
    {
      id: "default-3",
      name: "Amit Patel",
      location: "Bangalore",
      rating: 4,
      comment:
        "Great local pharmacy options. Love supporting nearby medical stores through this platform. Always authentic medicines.",
      image: "👨‍🍳",
    },
  ];

  // Load testimonials from localStorage or use defaults
  const loadTestimonials = () => {
    try {
      const savedTestimonials = localStorage.getItem("patientTestimonials");
      if (savedTestimonials) {
        return JSON.parse(savedTestimonials);
      }
    } catch (error) {
      console.error("Error loading testimonials from localStorage:", error);
    }
    return defaultTestimonials;
  };

  const [testimonials, setTestimonials] = useState(loadTestimonials);

  // Save testimonials to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("patientTestimonials", JSON.stringify(testimonials));
    } catch (error) {
      console.error("Error saving testimonials to localStorage:", error);
    }
  }, [testimonials]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    // Add new testimonial to the beginning of the array
    const newTestimonial = {
      id: Date.now(), // Unique identifier
      name: feedback.name,
      location: feedback.location || "Local Patient", // Use provided location or default
      rating: feedback.rating,
      comment: feedback.message,
      image: "👤", // Default user icon, you could randomize this
      timestamp: new Date().toISOString(), // For future reference if needed
    };

    setTestimonials([newTestimonial, ...testimonials]);

    // Reset form
    setFeedback({ name: "", email: "", location: "", message: "", rating: 5 });

    // Show success toast
    toast.success(
      "Thanks for your feedback! Your testimonial has been added to our patient reviews.",
      {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#5A8F76",
          color: "#EEE8B2",
          padding: "16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
          zIndex: 99999,
          marginTop: "90px", // Add margin to appear below navbar
        },
        iconTheme: {
          primary: "#EEE8B2",
          secondary: "#5A8F76",
        },
      }
    );
  };

  return (
    <footer
      className="mt-auto"
      style={{ backgroundColor: "#203B37", color: "#EEE8B2" }}
    >
      {/* Testimonials Section */}
      <div className="py-12" style={{ backgroundColor: "#5A8F76" }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-8"
            style={{ color: "#EEE8B2" }}
          >
            What Our Patients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <div
                key={testimonial.id || `default-${index}`}
                className="p-6 rounded-lg shadow-lg"
                style={{ backgroundColor: "#EEE8B2", color: "#203B37" }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.image}</div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm" style={{ color: "#5A8F76" }}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Us Section */}
            <div>
              <h3
                className="text-xl font-semibold mb-6"
                style={{ color: "#96CDB0" }}
              >
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaPhone style={{ color: "#5A8F76" }} />
                  <div>
                    <p className="font-medium">Medical Support</p>
                    <p className="text-sm">+91 12345 67890</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope style={{ color: "#5A8F76" }} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm">jantamedical678@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt style={{ color: "#5A8F76" }} />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm">123 Medical Street, Delhi, India</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="font-medium mb-3" style={{ color: "#96CDB0" }}>
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  <FaFacebook
                    className="cursor-pointer hover:opacity-80 transition"
                    style={{ color: "#5A8F76" }}
                    size={20}
                  />
                  <FaTwitter
                    className="cursor-pointer hover:opacity-80 transition"
                    style={{ color: "#5A8F76" }}
                    size={20}
                  />
                  <FaInstagram
                    className="cursor-pointer hover:opacity-80 transition"
                    style={{ color: "#5A8F76" }}
                    size={20}
                  />
                  <FaLinkedin
                    className="cursor-pointer hover:opacity-80 transition"
                    style={{ color: "#5A8F76" }}
                    size={20}
                  />
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div>
              <h3
                className="text-xl font-semibold mb-6"
                style={{ color: "#96CDB0" }}
              >
                Send Feedback
              </h3>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={feedback.name}
                    onChange={(e) =>
                      setFeedback({ ...feedback, name: e.target.value })
                    }
                    required
                    className="w-full p-3 rounded-lg border transition"
                    style={{
                      backgroundColor: "#EEE8B2",
                      border: "1px solid #5A8F76",
                      color: "#203B37",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
                    onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={feedback.email}
                    onChange={(e) =>
                      setFeedback({ ...feedback, email: e.target.value })
                    }
                    required
                    className="w-full p-3 rounded-lg border transition"
                    style={{
                      backgroundColor: "#EEE8B2",
                      border: "1px solid #5A8F76",
                      color: "#203B37",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
                    onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Your Location (e.g., Delhi, Mumbai)"
                    value={feedback.location}
                    onChange={(e) =>
                      setFeedback({ ...feedback, location: e.target.value })
                    }
                    className="w-full p-3 rounded-lg border transition"
                    style={{
                      backgroundColor: "#EEE8B2",
                      border: "1px solid #5A8F76",
                      color: "#203B37",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
                    onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className="cursor-pointer transition"
                        style={{
                          color:
                            star <= feedback.rating ? "#FFD700" : "#96CDB0",
                        }}
                        onClick={() =>
                          setFeedback({ ...feedback, rating: star })
                        }
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    value={feedback.message}
                    onChange={(e) =>
                      setFeedback({ ...feedback, message: e.target.value })
                    }
                    required
                    rows={4}
                    className="w-full p-3 rounded-lg border transition resize-none"
                    style={{
                      backgroundColor: "#EEE8B2",
                      border: "1px solid #5A8F76",
                      color: "#203B37",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#96CDB0")}
                    onBlur={(e) => (e.target.style.borderColor = "#5A8F76")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                  style={{ backgroundColor: "#5A8F76" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#96CDB0")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#5A8F76")
                  }
                >
                  <IoSend />
                  Send Feedback
                </button>
              </form>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className="text-xl font-semibold mb-6"
                style={{ color: "#96CDB0" }}
              >
                Quick Links
              </h3>
              <div className="space-y-3">
                <a href="#" className="block hover:opacity-80 transition">
                  About Us
                </a>
                <a href="#" className="block hover:opacity-80 transition">
                  Privacy Policy
                </a>
                <a href="#" className="block hover:opacity-80 transition">
                  Terms of Service
                </a>
                <a href="#" className="block hover:opacity-80 transition">
                  Help & Support
                </a>
                <a href="#" className="block hover:opacity-80 transition">
                  Partner Pharmacy
                </a>
                <a href="#" className="block hover:opacity-80 transition">
                  Medicine Guidelines
                </a>
              </div>

              {/* Business Hours */}
              <div className="mt-6">
                <h4 className="font-medium mb-3" style={{ color: "#96CDB0" }}>
                  Service Hours
                </h4>
                <div className="text-sm space-y-1">
                  <p>Monday - Friday: 8:00 AM - 10:00 PM</p>
                  <p>Saturday - Sunday: 9:00 AM - 9:00 PM</p>
                  <p style={{ color: "#5A8F76" }}>24/7 Emergency Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-4 border-t" style={{ borderColor: "#5A8F76" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © 2025 Janta Medical Service. All rights reserved. Supporting
              local pharmacies, one delivery at a time.
            </p>
            <p className="text-sm mt-2 md:mt-0" style={{ color: "#96CDB0" }}>
              Made with ❤️ for healthier communities
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
