const Blog= require("../models/blogs/blogsModels")
const fs = require("fs");
const { console } = require("inspector");
const path = require("path");

// Create a new blog

const slugify = require('slugify');

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, author, tags, isPublished } = req.body;
    const slug = slugify(title, { lower: true });
       // Ensure a file was uploaded
       if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
    }
    const newBlog = new Blog({
      title,
      slug,
      content,
      category,
      author,
      tags,
      imageUrl: `/uploads/videos/${req.file.filename}`, 
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a blog post
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, category, tags, isPublished } = req.body;
    const slug = title ? slugify(title, { lower: true }) : undefined;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, slug, content, category, tags, isPublished, publishedAt: isPublished ? new Date() : null },
      { new: true, runValidators: true }
    );
    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog post






exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findById(req.params.id);
    console.log(deletedBlog);
    
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Construct absolute path to the image file
    const imagePath = path.resolve(process.cwd(), `.${deletedBlog.imageUrl}`);

    // Check if file exists asynchronously
    fs.promises.stat(imagePath)
      .then(() => {
        // Delete the image file
        return fs.promises.unlink(imagePath);
      })
      .catch((err) => {
        if (err.code !== "ENOENT") {
          console.error("Error deleting image file:", err);
        }
      });

    // Delete blog entry from the database
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Blog and image deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
