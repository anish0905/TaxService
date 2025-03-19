import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBlogs();
    fetchLatestBlogs();
    fetchCategories();
  }, [selectedCategory, search, page]);

  const fetchBlogs = async () => {
    const { data } = await axios.get(`http://localhost:5003/api/blogs?page=${page}&category=${selectedCategory}&search=${search}`);
    setBlogs(data);
  };

  const fetchLatestBlogs = async () => {
    const { data } = await axios.get('http://localhost:5003/api/blogs/latest');
    setLatestBlogs(data);
  };

  const fetchCategories = async () => {
    const { data } = await axios.get('http://localhost:5003/api/blogs/categories');
    setCategories(data);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search blogs..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filter */}
      <div className="flex items-center space-x-4 overflow-x-auto mb-4">
        <button className="p-2 border rounded" onClick={() => setSelectedCategory('all')}>All</button>
        {categories.map((cat) => (
          <button key={cat} className="p-2 border rounded" onClick={() => setSelectedCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        {/* Blog Cards (70%) */}
        <div className="w-2/3 grid grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="border p-4 rounded shadow">
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-40 object-cover mb-2" />
              <h3 className="text-lg font-bold">{blog.title}</h3>
              <p className="text-sm">{blog.content.split(' ').slice(0, 20).join(' ')}...</p>
              <Link to={`/blogs/${blog.slug}`} className="text-blue-500">View More</Link>
            </div>
          ))}
        </div>

        {/* Latest Blogs (30%) */}
        <div className="w-1/3 border p-4 rounded shadow overflow-y-auto max-h-96">
          <h3 className="text-lg font-bold mb-2">Latest Blogs</h3>
          {latestBlogs.map((blog) => (
            <div key={blog._id} className="py-2 border-b last:border-b-0 animate-slide-in">
              <Link to={`/blogs/${blog.slug}`} className="text-blue-500">{blog.title}</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button className="p-2 border rounded" onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        <span className="px-4">Page {page}</span>
        <button className="p-2 border rounded" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Blogs;
