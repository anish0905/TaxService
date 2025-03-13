import React, { useEffect, useState } from "react";
import axios from "axios";

const GetHeroSection = () => {
  const [videoDatas, setVideoData] = useState([]);
  const [editData, setEditData] = useState(null); // Holds data for editing
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchVideoData();
  }, []);

  const fetchVideoData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/videos`);
      if (Array.isArray(response.data)) {
        setVideoData(response.data);
      } else {
        setVideoData([response.data]);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  // ✅ Handle DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/videos/${id}`);
      setVideoData(videoDatas.filter(video => video._id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  // ✅ Handle EDIT
  const handleEdit = (video) => {
    setEditData(video);
    setUpdatedTitle(video.title);
    setUpdatedDescription(video.description);
  };

  // ✅ Handle UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/api/videos/${editData._id}`, {
        title: updatedTitle,
        description: updatedDescription,
      });

      setVideoData(videoDatas.map(video =>
        video._id === editData._id ? { ...video, title: updatedTitle, description: updatedDescription } : video
      ));

      setEditData(null); // Close edit form
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hero Section</h1>

      {videoDatas.length > 0 ? (
        videoDatas.map((videoData) => (
          <div key={videoData._id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
            {editData && editData._id === videoData._id ? (
              // ✅ Edit Mode
              <div className="mb-4">
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="border p-2 w-full rounded"
                />
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="border p-2 w-full rounded mt-2"
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                  <button onClick={() => setEditData(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                </div>
              </div>
            ) : (
              // ✅ Display Mode
              <>
                <h2 className="text-xl font-semibold">{videoData.title}</h2>
                <p className="text-gray-600">{videoData.description}</p>
                <video controls className="mt-6 w-full max-w-lg">
                  <source src={`${API_URL}${videoData.videoUrl}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="flex justify-evenly mt-3">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(videoData._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 text-black px-3 py-1 rounded"
                    onClick={() => handleEdit(videoData)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default GetHeroSection;
