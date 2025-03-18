import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SubAdminSidebar from "../../../components/SideBar/SubAdminSidebar";

const URI = import.meta.env.VITE_API_URL;
const username = localStorage.getItem("username");

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: username || "", // Ensure author is set initially
    tags: "",
    image: null,
    isPublished: false,
  });

  const [preview, setPreview] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("tags", formData.tags.split(",").map(tag => tag.trim()));
      formDataToSend.append("isPublished", formData.isPublished);
      if (formData.image) {
        formDataToSend.append("imageUrl", formData.image);
      }

      await axios.post(`${URI}/api/blogs`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog posted successfully!");

      // Reset form
      setFormData({
        title: "",
        content: "",
        category: "",
        author: username || "",
        tags: "",
        image: null,
        isPublished: false,
      });
      setPreview(null);
    } catch (error) {
      console.error("Error posting blog:", error);
      toast.error(error.response?.data?.message || "Failed to post the blog.");
    }
  };

  return (
    <div className="flex">
      <SubAdminSidebar />
      <div className="ml-72 p-6 w-full">
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a Blog</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-gray-700 font-medium">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows="5"
                required
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-gray-700 font-medium">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Upload Image */}
            <div>
              <label className="block text-gray-700 font-medium">Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded-md"
              />
              {preview && (
                <img src={preview} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-md" />
              )}
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-5 h-5 text-blue-600"
              />
              <label className="ml-2 text-gray-700 font-medium">Publish Now</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
