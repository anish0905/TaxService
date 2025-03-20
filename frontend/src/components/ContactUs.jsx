import { motion } from "framer-motion";
import React,{ useState } from "react";
import axios from "axios"; // Import Axios


export default function ContactUs() {
    const URI = import.meta.env.VITE_API_URL
  const [formData, setFormData] = useState({ name: "", email: "", query: "" });
  const [loading, setLoading] = useState(false); // For button loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      const response = await axios.post( `${URI}/api/contact`, formData);

      if (response.status === 201) {
        alert("Query submitted successfully!");
        setFormData({ name: "", email: "", query: "" }); // Reset form
      }
    } catch (error) {
      alert("Failed to submit query. Please try again later.");
      console.error("Error submitting query:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Contact Us</h2>
        <p className="text-gray-600 text-center mb-6">We'd love to hear from you!</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg"
            required
          />
          <textarea
            name="query"
            value={formData.query}
            onChange={handleChange}
            placeholder="Ask your query here..."
            className="w-full p-3 border rounded-lg"
            rows="4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
