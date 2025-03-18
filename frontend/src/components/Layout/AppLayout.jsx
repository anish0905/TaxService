import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Loader from "./Loader ";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion

const AppLayout = () => {
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [bubbles, setBubbles] = useState([]); // Store bubbles

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Mouse Move for Floating Bubbles
  const handleMouseMove = (e) => {
    const newBubble = {
      id: Math.random(),
      x: e.clientX,
      y: e.clientY,
    };

    setBubbles((prev) => [...prev.slice(-10), newBubble]); // Keep last 10 bubbles
  };

  return (
    <div onMouseMove={handleMouseMove} className="relative overflow-hidden">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />

          {/* Floating Cursor Bubbles */}
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.5, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                top: bubble.y,
                left: bubble.x,
                width: "10px",
                height: "10px",
                backgroundColor: "rgba(0, 162, 255, 0.7)",
                borderRadius: "50%",
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* Scroll to Top Button */}
          {showScroll && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition-transform transform hover:scale-110"
            >
              <FaArrowUp size={20} />
            </motion.button>
          )}

          {/* WhatsApp Contact Button */}
          <motion.a
            href="https://wa.me/917260858715"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", type: "spring", stiffness: 100 }}
            className="fixed bottom-16 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
          >
            <FaWhatsapp size={24} />
          </motion.a>

          {/* Email Contact Button */}
          <motion.a
            href="mailto:your-email@example.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", type: "spring", stiffness: 100 }}
            className="fixed bottom-32 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110"
          >
            📧 {/* Email Icon */}
          </motion.a>

          {/* LinkedIn Contact Button */}
<motion.a
  href="https://www.linkedin.com/in/your-linkedin-profile" // Replace with your LinkedIn URL
  target="_blank"
  rel="noopener noreferrer"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.5, ease: "easeOut", type: "spring", stiffness: 100 }}
  className="fixed bottom-48 right-4 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-transform transform hover:scale-110"
>
  🔗 {/* LinkedIn Icon */}
</motion.a>

        </>
      )}
    </div>
  );
};

export default AppLayout;
