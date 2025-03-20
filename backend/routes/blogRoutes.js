const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogsController');
const upload = require("../middleware/upload");
// Create a new blog post
router.post('/',upload.single("imageUrl"), blogController.createBlog);

// Get all blog posts
router.get('/', blogController.getAllBlogs);
router.get('/latest', blogController.getLatestBlogs);

// Get blog posts by category

router.get('/category/:category', blogController.getBlogsByCategory);

// Get a single blog post by ID
router.get('/:slug', blogController.getBlogBySlug);

// Update a blog post
router.put('/:id',upload.single("imageUrl"), blogController.updateBlog);

// Delete a blog post
router.delete('/:id', blogController.deleteBlog);

module.exports = router;