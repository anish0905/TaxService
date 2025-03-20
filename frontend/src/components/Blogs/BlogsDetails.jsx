import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import Swal from "sweetalert2";
import LatestBlogs from "./LatestBlogs";

const BlogsDetails = () => {
  const { slug } = useParams(); // Get slug from URL params
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchBlogDetails();
  }, [slug]);

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5003/api/blogs/${slug}`);
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
    setLoading(false);
  };

  const handleLike = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to like this blog.",
        confirmButtonText: "OK",
      });
    }
    setLiked(!liked); // Toggle like state
  };

  const handleComment = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to comment on this blog.",
        confirmButtonText: "OK",
      });
    }
    Swal.fire({
      title: "Write a comment",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Post",
      preConfirm: (comment) => {
        if (!comment) {
          Swal.showValidationMessage("Comment cannot be empty");
        }
        return comment;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Comment Posted:", result.value);
      }
    });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center">Blog not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="lg:flex gap-4">
        {/* Latest Blogs (30%) */}
        <LatestBlogs />

        {/* Blog Details (70%) */}
        <div className="lg:w-3/4 border p-4 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
          <p className="text-gray-500">By {blog.author?.name || "Unknown"}</p>
          <img src={blog.imageUrl} alt={blog.title} className="w-full h-80 object-cover my-4" />
          <p className="text-gray-700">{blog.content}</p>

          {/* Like & Comment Buttons */}
          <div className="flex items-center space-x-4 mt-4">
            <button onClick={handleLike} className="flex items-center space-x-2">
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} <span>Like</span>
            </button>
            <button onClick={handleComment} className="flex items-center space-x-2">
              <FaComment /> <span>Comment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetails;
