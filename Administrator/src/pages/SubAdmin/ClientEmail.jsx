import React, { useState, useEffect } from "react";
import axios from "axios";
import SubAdminSidebar from "../../components/SideBar/SubAdminSidebar";

const ClientEmails = () => {
    const URI = import.meta.env.VITE_API_URL;  // Assuming API endpoint is defined in Vite environment variable VITE_API_URL
  const [loading, setLoading] = useState(true);  // Flag to show loading spinner while fetching data from API

  const [clientEmails, setClientEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch client emails from API
  useEffect(() => {
    const fetchClientEmails = async () => {
      try {
        const response = await axios.get(`${URI}/api/contact/email`);
  
        if (response.data.success && Array.isArray(response.data.data)) {
          setClientEmails(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setClientEmails([]);
        }
      } catch (error) {
        console.error("Error fetching client emails:", error);
      }
    };
  
    fetchClientEmails();
  }, []);
  

  // Filtered emails based on search term
  const filteredEmails = clientEmails.filter(client =>
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmails = filteredEmails.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex">
    <SubAdminSidebar/>
    <div className="ml-72  p-6 w-full">
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Client Emails</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />

      {/* Email Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">#</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmails.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">No emails found.</td>
            </tr>
          ) : (
            currentEmails.map((client, index) => (
              <tr key={client._id} className="border-b">
                <td className="p-3 border">{indexOfFirstItem + index + 1}</td>
                <td className="p-3 border">{client.email}</td>
                <td className="p-3 border text-center">
                  <a
                    href={`mailto:${client.email}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Send Email
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage(prev =>
              indexOfLastItem < filteredEmails.length ? prev + 1 : prev
            )
          }
          disabled={indexOfLastItem >= filteredEmails.length}
          className={`px-4 py-2 rounded ${indexOfLastItem >= filteredEmails.length ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
        >
          Next
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ClientEmails;
