import React, { useState, useEffect } from 'react';
import SubAdminSidebar from '../../../components/SideBar/SubAdminSidebar';
import axios from 'axios';
import GetHeroSection from './GetHeroSection';

const HeroSection = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch video details on component mount
  useEffect(() => {
    getVideoDetails();
  }, []);

  const getVideoDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/videos`);
      setVideoUrl(response.data.videoUrl);
    } catch (error) {
      console.error('Error getting video details:', error);
    }
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUploadVideo = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post(`${API_URL}/api/videos/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setVideoUrl(response.data.videoUrl);
      alert('Video uploaded successfully');
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const handleDeleteVideo = async () => {
    if (!videoUrl) {
      alert('No video to delete.');
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/delete/video/${videoUrl}`);
      setVideoUrl('');
      alert('Video deleted successfully');
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div className="flex">
      <SubAdminSidebar />
      <div className="ml-72 p-6 w-full">
        <h1 className="text-2xl font-bold">Hero Section</h1>
        <GetHeroSection/>

        <form onSubmit={handleUploadVideo}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Video</label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Upload Video
          </button>
        </form>

        {videoUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Current Video</h2>
            <video controls className="mt-2 w-full max-w-lg">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <button onClick={handleDeleteVideo} className="bg-red-500 text-white py-2 px-4 rounded mt-4">
              Delete Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
