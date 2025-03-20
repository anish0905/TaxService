import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import logo from "../assets/img/taxsolutin.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getServices() {
      try {
        let response = await axios.get(`${URI}/api/services`);
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.error("Error: API did not return an array");
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    getServices();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdown = (item) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  const dropdownItems = {
    Home: "/",
    About: "/about",
    Blogs:"/Blogs",
  
    Services: services.map((service) => ({
      name: service?.name,
      onClick: () => navigate(`/subservices/${service._id}`, { state: { service } }),
    })),
   
    Contacts: [
      {
        name: "📞 WhatsApp",
        onClick: () => window.open("https://wa.me/919876543210", "_blank"), // Replace with your number
      },
      {
        name: "📧 Email",
        onClick: () => window.location.href = "mailto:your-email@example.com", // Replace with your email
      },
      {
        name: "🔗 LinkedIn",
        onClick: () => window.open("https://www.linkedin.com/in/your-profile", "_blank"), // Replace with your LinkedIn profile
      },
    ],
   

    // Resources: ["Resource1", "Resource2", "Resource3"],
  };

  return (
    <header className=" p-2 shadow-2xl shadow-black sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-20 h-14 md:w-32 md:h-20">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 relative">
        {Object.keys(dropdownItems).map((item) => (
  <div key={item} className="relative group">
    {typeof dropdownItems[item] === "string" ? (
      <Link
        to={dropdownItems[item]}
        className="relative text-[#0f3691] hover:text-blue-900 transition text-lg flex items-center gap-2 mt-1"
      >
        {item}
        <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
      </Link>
    ) : (
      <>
      <button
  onClick={() => handleDropdown(item)}
  className="relative text-[#0f3691] hover:text-blue-900 transition text-lg flex items-center gap-2"
>
  {item}
  <span className="transform transition-transform duration-300 text-3xl" 
        style={{ transform: openDropdown === item ? "rotate(180deg)" : "rotate(0deg)" }}>
   <ArrowDropDownIcon/>
  </span>
</button>
        {openDropdown === item && dropdownItems[item].length > 0 && (
          <div className="absolute left-0 mt-2 w-72 bg-white shadow-md rounded-md">
            {dropdownItems[item].map((subItem, index) => (
           <button
           key={index}
           className=" w-full px-4 py-2 text-gray-800 hover:bg-gray-200 flex justify-center items-center text-center"
           onClick={() => {
             if (typeof subItem === "string") {
               navigate(`/${subItem}`);
             } else {
               subItem.onClick();
             }
             setOpenDropdown(null);
           }}
         >
           {typeof subItem === "string" ? subItem : subItem.name}
         </button>
         
              
            ))}
          </div>
        )}
      </>
    )}
  </div>
))}

        </div>

        {/* Right Side - Contact Us Button "https://calendly.com/lance-sgtglobal/t-pulse-safety-management-platform-review?month=2025-02&date=2025-02-24" */}
        <div className="hidden md:flex">
          <Link
            to= "/contacts-us"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition rounded-lg text-lg"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#0f3691]" onClick={toggleMenu}>
          {isOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#81afb5] py-4 space-y-4">
        {Object.keys(dropdownItems).map((item) => (
  <div key={item} className="relative group">
    {typeof dropdownItems[item] === "string" ? (
      <Link
        to={dropdownItems[item]}
        className="relative text-[#0f3691] hover:text-blue-900 transition text-lg"
        onClick={() => setIsOpen(false)}
      >
        {item}


        <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
      </Link>
    ) : (
      <>
        <button
          onClick={() => handleDropdown(item)}
          className="relative text-[#0f3691] hover:text-blue-900 transition text-lg"
        >
          {item}
          <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
        </button>
        {openDropdown === item && dropdownItems[item].length > 0 && (
          <div
          className={`absolute left-0 mt-2 w-60 bg-white shadow-md rounded-md z-50 transition-all duration-300 ease-in-out 
          ${openDropdown === item ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"} origin-top`}
        >
          {dropdownItems[item].map((subItem, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 transition-all duration-200"
              onClick={() => {
                if (typeof subItem === "string") {
                  navigate(`/${subItem}`);
                } else {
                  subItem.onClick();
                }
                setOpenDropdown(null);
                setIsOpen(false);
              }}
            >
              {typeof subItem === "string" ? subItem : subItem.name}
            </button>
          ))}
        </div>
        
        )}
      </>
    )}
  </div>
))}


          {/* Mobile Contact Us Button */}
          <Link
            to="https://calendly.com/lance-sgtglobal/t-pulse-safety-management-platform-review?month=2025-02&date=2025-02-24"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition rounded-lg text-lg"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
