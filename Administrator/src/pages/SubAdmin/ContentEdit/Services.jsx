import React, { useState, useEffect } from "react";
import SubAdminSidebar from "../../../components/SideBar/SubAdminSidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URI = import.meta.env.VITE_API_URL;

const API_URL = `${URI}/api/services`;
const CATEGORY_API = `${URI}/api/services/categories`;
const getCATEGORY_API = `${URI}/api/services/categories/get`;

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", category: "", imageUrl: null });
  const [editingService, setEditingService] = useState(null);
  const navigate = useNavigate();

  console.log(services);

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
      const response = await axios.get(getCATEGORY_API);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "imageUrl") {
      setFormData({ ...formData, imageUrl: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    if (formData.imageUrl) {
      formDataToSend.append("imageUrl", formData.imageUrl);
    }

    try {
      if (editingService) {
        await axios.put(`${API_URL}/${editingService._id}`, formDataToSend, { headers: { "Content-Type": "multipart/form-data" } });
        Swal.fire("Updated!", "Service updated successfully!", "success");
      } else {
        await axios.post(API_URL, formDataToSend, { headers: { "Content-Type": "multipart/form-data" } });
        Swal.fire("Added!", "Service added successfully!", "success");
        navigate("/home-services-list");
      }
      fetchServices();
      setFormData({ name: "", description: "", category: "", imageUrl: null });
      setEditingService(null);
    } catch (error) {
      console.error("Error submitting service:", error);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

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

  const handleAddCategory = async () => {
    Swal.fire({
      title: "Add New Category",
      input: "text",
      inputPlaceholder: "Enter category name",
      showCancelButton: true,
      confirmButtonText: "Add",
      preConfirm: async (value) => {
        if (!value.trim()) {
          Swal.showValidationMessage("Category name cannot be empty!");
          return false;
        }
        try {
          await axios.post(CATEGORY_API, { category: value });
          Swal.fire("Added!", "Category added successfully!", "success");
          fetchCategories();
        } catch (error) {
          Swal.fire("Error!", "Failed to add category!", "error");
        }
      },
    });
  };

  
 

  return (
    <div className="flex">
      <SubAdminSidebar />
      <div className="ml-72 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Services</h1>
        <button onClick={handleAddCategory} className="bg-green-500 text-white px-3 py-2 rounded mb-4">Add Category</button>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg" encType="multipart/form-data">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter service name" className="w-full p-2 mb-3 border rounded" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter service description" className="w-full p-2 mb-3 border rounded" required />
          <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 mb-3 border rounded" required>
            <option value="">Select Category</option>
            {categories.map((cat) => (<option key={cat._id} value={cat.category}>{cat.category}</option>))}
          </select>
          <input type="file" name="imageUrl" accept="image/*" onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">{editingService ? "Update Service" : "Add Service"}</button>
        </form>
        
      
      </div>
    </div>
  );
};

export default Services;
