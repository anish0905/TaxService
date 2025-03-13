const Video = require("../models/Video");

// Upload a new video
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No video uploaded" });

    const newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: `/uploads/videos/${req.file.filename}`,
    });

    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a video
exports.updateVideo = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
    };

    if (req.file) {
      updatedData.videoUrl = `/uploads/videos/${req.file.filename}`;
    }

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedVideo) return res.status(404).json({ message: "Video not found" });

    res.status(200).json({ message: "Video updated successfully", video: updatedVideo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
