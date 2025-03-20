import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LatestBlogs = () => {
    const URI = import.meta.env.VITE_API_URL;
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [latestLoading, setLatestLoading] = useState(false);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      setLatestLoading(true);
      try {
        const { data } = await axios.get(`${URI}/api/blogs/latest`);
        setLatestBlogs(data);
      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      }
      setLatestLoading(false);
    };

    fetchLatestBlogs();
  }, []);

  return (
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
  );
};

export default LatestBlogs;
