import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LatestBlogs from './LatestBlogs';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchBlogs();
   
    fetchCategories();
  }, [selectedCategory, search, page]);



  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5003/api/services/categories/get');
      console.log('Categories', response.data); // Corrected
      setCategories(response.data); // Fix: Use response.data instead of response
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5003/api/blogs?page=${page}&search=${search}`;
      if (selectedCategory !== 'all') {
        url = `http://localhost:5003/api/blogs/category/${selectedCategory}?page=${page}&search=${search}`;
      }
      
      const { data } = await axios.get(url);
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
    setLoading(false);
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
  <button
    className={`p-2 border rounded ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : ''}`}
    onClick={() => setSelectedCategory('all')}
  >
    All
  </button>
  {categories.map((cat, index) => (
  <button
    key={index}
    className={`p-2 border rounded ${selectedCategory === cat.category ? 'bg-blue-500 text-white' : ''}`}
    onClick={() => {
      setSelectedCategory(cat.category);
      setPage(1);  // Reset page when category changes
    }}
  >
    {cat.category}
  </button>
))}


</div>


      <div className=" lg:flex gap-4 ">
            {/* Latest Blogs (30%) */}
            <LatestBlogs/>

        {/* Blog Cards (70%) */}
        <div className="lg:w-2/2 lg:grid-cols-3 grid grid-cols-1 gap-4 ">
          {loading ? (
            <div className="col-span-2 flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-500"></div>
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="border p-4 rounded shadow h-full">
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
