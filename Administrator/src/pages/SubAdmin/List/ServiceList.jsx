import React, { useEffect, useState } from "react";
import SubAdminSidebar from "../../../components/SideBar/SubAdminSidebar";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ServiceList = () => {
  const [currentServices, setCurrentServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subServiceForm, setSubServiceForm] = useState({
    serviceId: "",
    name: "",
    description: "",
    price: "",
  });

  const [showSubServiceModal, setShowSubServiceModal] = useState(false);
  const URI = import.meta.env.VITE_API_URL;
  const API_URL = `${URI}/api/services`;
  const SUBSERVICE_API = `${URI}/api/services/subservices`;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Filter services based on search input
  const filteredServices = currentServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const paginatedServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_URL);
      setCurrentServices(response.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(SUBSERVICE_API, subServiceForm);
      Swal.fire("Success!", "Subservice added successfully!", "success");
      setShowSubServiceModal(false);
      setSubServiceForm({ serviceId: "", name: "", description: "", price: "" });
    } catch (error) {
      Swal.fire("Error!", "Failed to add subservice.", "error");
      console.error("Error adding subservice:", error);
    }
  };

  return (
    <div className="flex">
      <SubAdminSidebar />
      <div className="ml-72 p-6 w-full">
        <h1 className="text-2xl font-bold">Services List</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search services..."
          className="mt-4 p-2 border rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="mt-6 grid grid-cols-3 gap-4">
          {paginatedServices.map((service) => (
            <div
              key={service._id}
              className="bg-white p-4 shadow-lg rounded-lg cursor-pointer"
              onClick={() => {
                setSubServiceForm({ ...subServiceForm, serviceId: service._id });
               
              }}
            >
              <h2 className="font-semibold">{service.name}</h2>
              <p className="text-sm">{service.description}</p>
              <img src={`${URI}${service.imageUrl}`} alt="Service" className="w-full h-40 object-cover mt-2" />
              <div className="flex justify-between mt-2">
                <button className="px-2 py-1 bg-gray-500 text-white rounded">Edit</button>
                <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={()=>{
                   setShowSubServiceModal(true);
                }}>Add SubService</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded mx-2"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={indexOfLastItem >= filteredServices.length}
            className="px-4 py-2 bg-gray-500 text-white rounded mx-2"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add SubService Modal */}
      {showSubServiceModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Subservice</h2>

      <form onSubmit={handleSubServiceSubmit} className="space-y-4">
        <input type="hidden" value={subServiceForm.serviceId} />

        {/* Name Field */}
        <div>
          <label className="block font-semibold text-gray-700">Name</label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
            value={subServiceForm.name}
            onChange={(e) => setSubServiceForm({ ...subServiceForm, name: e.target.value })}
            required
          />
        </div>

        {/* Price Field */}
        <div>
          <label className="block font-semibold text-gray-700">Price</label>
          <input
            type="number"
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
            value={subServiceForm.price}
            onChange={(e) => setSubServiceForm({ ...subServiceForm, price: e.target.value })}
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-semibold text-gray-700">Description</label>
          <div className="border border-gray-300 rounded">
          <ReactQuill
  theme="snow"
  className="w-full min-h-[150px]"
  value={subServiceForm.description}
  onChange={(value) => setSubServiceForm({ ...subServiceForm, description: value })}
/>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowSubServiceModal(false)}
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default ServiceList;
