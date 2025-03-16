import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Services = () => {
  const URI = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function getServices() {
      try {
        let response = await axios.get(`${URI}/api/services`);
        if (response.status === 200) {
          setServices(response.data);
        } else {
          console.log("Error fetching services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    getServices();
  }, []);

  return (
    <>
      <div className="bg-[#e6fafc]">
        <h1 className="text-4xl font-bold text-gray-800 text-center mt-3">Services</h1>
      </div>
      <div className="min-h-screen flex flex-wrap gap-4 justify-center items-center p-6 bg-[#e6fafc]">
        {services.map((service) => (
          <div key={service._id} className="bg-gray-300 shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
            <img src={`${URI}${service.imageUrl}`} alt={service.name} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <button
              onClick={() => navigate(`/subservices/${service._id} `,{ state: { service } })} // Navigate to subservices with ID
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              View More
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export { Services };
