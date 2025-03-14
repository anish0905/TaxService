import React, { useState, useEffect } from "react";
import SubAdminSidebar from "../../../components/SideBar/SubAdminSidebar";
import Swal from "sweetalert2";
import axios from "axios";

const API_URL = "http://localhost:5003/api/services";
const CATEGORY_API = "http://localhost:5003/api/services";

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ category: "", title: "", description: "" });
  const [editingService, setEditingService] = useState(null);


  // ✅ Fetch Services & Categories
  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_URL);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORY_API);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Submit (Add & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedData = {
      name: formData.name,
      description: formData.description,
      category: [formData.category], // Ensure it's an array if required
    };
  
    try {
      if (editingService) {
        await axios.put(`${API_URL}/${editingService._id}`, formattedData);
      } else {
        await axios.post(API_URL, formattedData);
      }
      fetchServices();
    } catch (error) {
      console.error("Error submitting service:", error);
    }
  };
  

  // ✅ Handle Edit
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData(service);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${id}`);
          setServices(services.filter((service) => service._id !== id));
          Swal.fire("Deleted!", "Service has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting service:", error);
        }
      }
    });
  };



  return (
    <div className="flex">
      <SubAdminSidebar />
      <div className="ml-72 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Services</h1>
        <div className="flex justify-center">
          {/* ✅ Service Form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your title"
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter your description"
              className="w-full p-2 mb-3 border rounded"
              required
            />

            {/* ✅ Category Dropdown */}
            <div className="flex items-center space-x-3">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 mb-3 border rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* ✅ Add New Category */}
              <button
  type="button"
  onClick={() => {
    Swal.fire({
      title: "Add New Category",
      input: "text",
      inputPlaceholder: "Enter category name",
      showCancelButton: true,
      confirmButtonText: "Add",
      preConfirm: async (value) => {
        if (!value) {
          Swal.showValidationMessage("Category name cannot be empty!");
          return false;
        }
        setNewCategory(value);
        try {
          await axios.post(CATEGORY_API, { name: value });
          Swal.fire("Added!", "Category added successfully!", "success");
          fetchCategories(); // Refresh the category list
        } catch (error) {
          Swal.fire("Error!", "Failed to add category!", "error");
        }
      },
    });
  }}
  className="bg-green-500 text-white px-3 py-1 rounded"
>
  +
</button>

            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
              {editingService ? "Update Service" : "Add Service"}
            </button>
          </form>
        </div>

        {/* ✅ Service List */}
        <div className="mt-6">
          {services.length === 0 ? (
            <p className="text-gray-500">No services added yet.</p>
          ) : (
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service._id} className="p-4 border rounded flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg">{service.name}</h2>
                    <p className="text-gray-500">{service.category}</p>
                    <p>{service.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
