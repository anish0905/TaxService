const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogsController');
const upload = require("../middleware/upload");
// Create a new blog post
router.post('/',upload.single("imageUrl"), blogController.createBlog);

// Get all blog posts
router.get('/', blogController.getAllBlogs);

// Get a single blog post by ID
router.get('/:id', blogController.getBlogById);

// Update a blog post
router.put('/:id',upload.single("imageUrl"), blogController.updateBlog);

// Delete a blog post
router.delete('/:id', blogController.deleteBlog);

module.exports = router;