import React, { useState } from 'react';
import { FaHouseUser, FaSignOutAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { GiSkills } from "react-icons/gi";
import { MdOndemandVideo, MdTextFields } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from "../../assets/taxsolutin.png"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const toggleAboutDropdown = () => setIsAboutDropdownOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleDropdownSelect = (route) => {
    navigate(route);
    setIsDropdownOpen(false); 
  };

  const handleAboutDropdownSelect = (route) => {
    navigate(route);
    setIsAboutDropdownOpen(false);
  };

  const menuItems = [
    { label: 'Dashboard', icon: <FaHouseUser />, route: '/admin-dashboard' },
    { label: 'Content Edit', icon: <GiSkills />, isDropdown: true },
    { label: 'About Us Edit', icon: <GiSkills />, isAboutDropdown: true },
    { label: 'Logout', icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <div className="sidebar-wrapper text-base font-semibold font-serif z-10">
      <div className={`sidebar ${isOpen ? '' : 'open'}`} id="sidebar">
        <ul>
          <div className="profile">
            <img
              src={logo}
              alt="logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className='over'>{localStorage.getItem("email") || 'Username'}</span>
          </div>

          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.isDropdown ? (
                <>
                  <li
                    onClick={toggleDropdown}
                    className="menu-item flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-lg p-2"
                    aria-expanded={isDropdownOpen}
                  >
                    <div className="flex items-center">
                      <i className="icon">{item.icon}</i>
                      <span className="ml-2">{item.label}</span>
                    </div>
                    <i className="icon">{isDropdownOpen ? <FaAngleLeft /> : <FaAngleRight />}</i>
                  </li>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu bg-gray-600 rounded-lg ml-6 p-2">
                      <li onClick={() => handleDropdownSelect('/home-video-edit')} className="dropdown-item flex items-center p-2 cursor-pointer hover:bg-gray-300 rounded">
                        <MdOndemandVideo className="mr-2" /> Home Page Video Editing
                      </li>
                      <li onClick={() => handleDropdownSelect('/text-edit')} className="dropdown-item flex items-center p-2 cursor-pointer hover:bg-gray-300 rounded">
                        <MdTextFields className="mr-2" /> Text Editing
                      </li>
                    </ul>
                  )}
                </>
              ) : item.isAboutDropdown ? (
                <>
                  <li
                    onClick={toggleAboutDropdown}
                    className="menu-item flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-lg p-2"
                    aria-expanded={isAboutDropdownOpen}
                  >
                    <div className="flex items-center">
                      <i className="icon">{item.icon}</i>
                      <span className="ml-2">{item.label}</span>
                    </div>
                    <i className="icon">{isAboutDropdownOpen ? <FaAngleLeft /> : <FaAngleRight />}</i>
                  </li>
                  {isAboutDropdownOpen && (
                    <ul className="dropdown-menu bg-gray-600 rounded-lg ml-6 p-2">
                      <li onClick={() => handleAboutDropdownSelect('/about1')} className="dropdown-item flex items-center p-2 cursor-pointer hover:bg-gray-300 rounded">
                        About1
                      </li>
                      <li onClick={() => handleAboutDropdownSelect('/about2')} className="dropdown-item flex items-center p-2 cursor-pointer hover:bg-gray-300 rounded">
                        About2
                      </li>
                      <li onClick={() => handleAboutDropdownSelect('/about3')} className="dropdown-item flex items-center p-2 cursor-pointer hover:bg-gray-300 rounded">
                        About3
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <li
                  onClick={item.action ? item.action : () => navigate(item.route)}
                  className="menu-item flex items-center cursor-pointer hover:bg-gray-200 rounded-lg p-2"
                >
                  <i className="icon">{item.icon}</i>
                  <span className="ml-2">{item.label}</span>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>

      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className="icon">{isOpen ? <FaAngleLeft /> : <FaAngleRight />}</i>
      </button>
    </div>
  );
};

export default Sidebar;
