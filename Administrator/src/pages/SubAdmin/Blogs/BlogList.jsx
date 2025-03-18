import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SubAdminSidebar from "../../../components/SideBar/SubAdminSidebar";

const API_URL = "http://localhost:5003/api/blogs";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const [isPublishedFilter, setIsPublishedFilter] = useState(true);

  // State for editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_URL);
        setBlogs(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleTogglePublish = async (blog) => {
    try {
      const updatedBlog = { ...blog, isPublished: !blog.isPublished };
      await axios.put(`${API_URL}/${blog._id}`, updatedBlog);
      setBlogs((prev) => prev.map((b) => (b._id === blog._id ? updatedBlog : b)));
      toast.success(`Blog ${blog.isPublished ? "Unpublished" : "Published"} successfully!`);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setUpdatedTitle(blog.title);
    setUpdatedContent(blog.content);
    setPreview(blog.imageUrl);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    if (!selectedBlog) return;

    const formData = new FormData();
    formData.append("title", updatedTitle);
    formData.append("content", updatedContent);
    if (updatedImage) {
      formData.append("imageUrl", updatedImage);
    }

    try {
      await axios.put(`${API_URL}/${selectedBlog._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBlogs((prev) =>
        prev.map((b) => (b._id === selectedBlog._id ? { ...b, title: updatedTitle, content: updatedContent, imageUrl: preview } : b))
      );

      toast.success("Blog updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
    }
  };

  const filteredBlogs = blogs
    .filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((blog) => blog.isPublished === isPublishedFilter);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="flex">
      <SubAdminSidebar />
      <div className="ml-72 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Blog List</h1>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md w-1/3"
          />
          <button
            onClick={() => setIsPublishedFilter(!isPublishedFilter)}
            className={`px-3 py-1 rounded-md ${isPublishedFilter ? "bg-green-500 text-white" : "bg-gray-400 text-black"}`}
          >
            {isPublishedFilter ? "Published" : "Unpublished"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBlogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-lg rounded-lg p-4">
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-40 object-cover rounded-md" />
              <h2 className="text-xl font-semibold mt-3">{blog.title}</h2>
              <p className="text-gray-600 mt-2">{blog.content.split(" ").slice(0, 50).join(" ")}...</p>
              <div className="flex justify-between items-center mt-4">
                <button onClick={() => handleTogglePublish(blog)} className={`px-3 py-1 rounded-md ${blog.isPublished ? "bg-gray-500 text-white" : "bg-blue-500 text-white"}`}>
                  {blog.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => handleEdit(blog)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">Edit</button>
                <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-1/2">
              <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
              <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} className="w-full border p-2 rounded-md mb-2" placeholder="Blog Title" />
              <textarea value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} className="w-full border p-2 rounded-md h-32" placeholder="Blog Content" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-md" />
              {preview && <img src={preview} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-md" />}
              <div className="flex justify-end mt-4">
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">Close</button>
                <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-md">Update</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogList;
