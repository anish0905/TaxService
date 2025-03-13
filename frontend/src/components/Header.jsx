import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/img/taxsolutin.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const dropdownItems = {
    Home:[true],
    About:[true],
    Services: ["Service1", "Service2", "Service3"],
    Blogs: ["Blog1", "Blog2", "Blog3"],
    Contacts: ["WhatsApp", "Email", "Linkdin"],
    Resources: ["Resource1", "Resource2", "Resource3"],
   
  };

  const handleDropdown = (item) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  return (
    <header className="bg-transparent p-2 shadow-2xl shadow-black sticky
     top-0 z-80">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-20 h-14 md:w-32 md:h-20">
            <img
              src={logo}
              alt="Logo"
              className="w-4xlxl h-2xl object-cover"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 relative">
          {Object.keys(dropdownItems).map((item) => (
            <div key={item} className="relative group">
              <button
                onClick={() => handleDropdown(item)}
                className="relative text-[#0f3691] hover:text-blue-900 transition text-lg"
              >
                {item}
                {/* Animated Underline */}
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-black transform
                 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </button>

              {/* Dropdown Menu */}
              {openDropdown === item && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md">
                  {dropdownItems[item].map((subItem) => (
                    <Link
                      key={subItem}
                      to={`/${subItem}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setOpenDropdown(null)} // Close dropdown on click
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side - Schedule Button */}
        <div className="hidden md:flex">
          <Link
            to="https://calendly.com/lance-sgtglobal/t-pulse-safety-management-platform-review?month=2025-02&date=2025-02-24"
            target="_blank"
            rel="noopener noreferrer"
           
            className="px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition rounded-lg text-lg"
          >
          Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#0f3691]" onClick={toggleMenu}>
          {isOpen ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#81afb5] py-4 space-y-4">
          {["Company", "Product", "Resources", "Solution"].map((item) => (
            <Link
              key={item}
              to={`/${item}`}
              className="relative group text-blue-700 text-lg py-2 px-4 w-full text-center hover:text-gray-200 transition"
              onClick={toggleMenu}
            >
              {item}
              {/* Animated Underline for Mobile */}
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform
               scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </Link>
          ))}
          {/* Mobile Schedule Button */}
          <Link
           target="_blank"
            rel="noopener noreferrer"
          
            to="https://calendly.com/lance-sgtglobal/t-pulse-safety-management-platform-review?month=2025-02&date=2025-02-24"
            className="px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition rounded-lg text-lg"
          >
            Schedule
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
