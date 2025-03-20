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
  const [loading, setLoading] = useState(false);
  const [latestLoading, setLatestLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
    fetchLatestBlogs();
    fetchCategories();
  }, [selectedCategory, search, page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5003/api/blogs?page=${page}&category=${selectedCategory}&search=${search}`
      );
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
    setLoading(false);
  };

  const fetchLatestBlogs = async () => {
    setLatestLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5003/api/blogs');
      setLatestBlogs(data);
    } catch (error) {
      console.error('Error fetching latest blogs:', error);
    }
    setLatestLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:5003/api/blogs/categories/get');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
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
        <button className="p-2 border rounded" onClick={() => setSelectedCategory('all')}>
          All
        </button>
        {categories.map((cat) => (
          <button key={cat} className="p-2 border rounded" onClick={() => setSelectedCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className=" lg:flex gap-4 ">
            {/* Latest Blogs (30%) */}
            <div className="lg:w-1/4 border p-4 rounded shadow overflow-hidden lg:max-h-full  max-h-96 mb-8 relative">
  <h3 className="text-lg font-bold mb-2">Latest Blogs</h3>
  {latestLoading ? (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
    </div>
  ) : (
    <div className="relative overflow-hidden h-full">
      <div className="animate-scroll space-y-2">
        {latestBlogs.concat(latestBlogs).map((blog, index) => (
          <div key={index} className="py-2 border-b last:border-b-0">
            <Link to={`/blogs/${blog.slug}`} className="text-blue-500">
              {blog.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
        {/* Blog Cards (70%) */}
        <div className="lg:w-2/2 lg:grid-cols-3 grid grid-cols-1 gap-4 ">
          {loading ? (
            <div className="col-span-2 flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-500"></div>
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="border p-4 rounded shadow">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-40 object-cover mb-2" />
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <p className="text-sm">{blog.content.split(' ').slice(0, 20).join(' ')}...</p>
                <Link to={`/blogs/${blog.slug}`} className="text-blue-500">
                  View More
                </Link>
              </div>
            ))
          )}
        </div>

    

      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button className="p-2 border rounded" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span className="px-4">Page {page}</span>
        <button className="p-2 border rounded" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Blogs;
