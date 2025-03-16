import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { HandMetal } from "lucide-react";
import { Helmet } from "react-helmet-async";


const SubServices = () => {
  const { serviceId } = useParams(); // Get serviceId from the URL
  const location = useLocation();
  const serviceData = location.state?.service; // Access the sent service data
  console.log("Received Service Data:", serviceData);
  const URI = import.meta.env.VITE_API_URL;
  const [subServices, setSubServices] = useState([]);

  useEffect(() => {
    async function fetchSubServices() {
      try {
        const response = await axios.get(`${URI}/api/services/subservices/${serviceId}`);
        console.log(response.data); // Log or use the fetched data
        if (response.status === 200) {
          setSubServices(response.data);
        } else {
          console.log("Error fetching sub-services");
        }
      } catch (error) {
        console.error("Error fetching sub-services:", error);
      }
    }

    fetchSubServices();
  }, [serviceId]);

  return (
    <>
     {/* SEO Helmet */}
            <Helmet>
            <title>{serviceData.name}</title>
            <meta name="description" content={serviceData.description} />
            <meta property="og:title" content={serviceData.name} />
            <meta property="og:description" content={serviceData.description} />
            <meta property="og:type" content="video.other" />
            <meta property="og:url" content={URI} />
            <meta property="og:image" content={`${URI}${serviceData.imageUrl}`} />
          </Helmet>

    <div className="min-h-screen p-6 bg-gray-100">
<img 
  src={`${URI}${serviceData.imageUrl}`} 
  alt={serviceData.name} 
  className="
    w-full h-48 object-fit rounded-lg shadow-lg 
    sm:h-56 md:h-64 lg:h-72 xl:h-80
  " 
/>
      <h1 className="text-3xl font-bold text-gray-800 text-center my-6">Sub-Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subServices.length > 0 ? (
          subServices.map((subService) => (
            <div key={subService._id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold">{subService.name}</h2>
              <p className="text-gray-700 font-bold mt-2">Price: ₹{subService.price}</p>
              {/* <p className="text-gray-600">{subService.description}</p> */}
              <div  className="text-gray-600" dangerouslySetInnerHTML={{ __html: subService.description }} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No sub-services available.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default SubServices;
