import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import React from "react";
import img from "../assets/img/taxsolutin.png";

const Footer = () => {
  return (
    <footer className="bg-[#81afb5] w-full py-8 px-6">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto mb-8 px-3">
        <div className="bg-blue-900 text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center min-h-[180px]">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">Stay in the loop</h2>
            <p className="text-gray-300">
              Sign up to receive the latest news, offers, and alerts.
            </p>
          </div>
          <div className="relative w-full md:w-auto">
            <input
              type="email"
              placeholder="Your work email"
              className="p-3 bg-cyan-100 pl-4 pr-16 w-full md:w-96 rounded-full text-gray-700 focus:outline-none border-2 border-violet-600"
              aria-label="Email address"
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-cyan-400 text-white p-3 rounded-full hover:bg-cyan-700 w-10 h-10 flex items-center justify-center"
              aria-label="Subscribe"
            >
              ➜
            </button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-3">
        {/* Left Section - Logo & Text */}
        <div className="text-left space-y-3">
          <img src={img} alt="SGT Global" className="w-32 mb-2" />
          <p className="text-gray-700 max-w-md">
            SGT Global is your trusted partner in digital transformation,
            specializing in SAP implementation, Salesforce solutions, and
            industry-specific digital solutions.
          </p>
        </div>

        {/* Right Section - Quick Links */}
        <div className="mt-6 md:mt-0 text-center md:text-right">
          <h2 className="text-lg font-semibold text-blue-900">Quick Links</h2>
          <ul className="flex justify-center md:justify-end space-x-6 mt-2">
            {["About Us", "Our Offerings", "Case Studies", "Contact Us"].map(
              (link, index) => (
                <li key={index} className="relative group">
                  <a
                    href={`#${link.replace(" ", "").toLowerCase()}`}
                    className="relative text-blue-900 font-medium after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-violet-600 after:transition-all after:duration-300 after:ease-in-out group-hover:after:w-full"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="w-full max-w-7xl mx-auto flex justify-center md:justify-end mt-4 space-x-4 text-center items-center ">
        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
          (Icon, index) => (
            <a
              key={index}
              href="#"
              aria-label={`Follow us on ${Icon.displayName}`}
              className="text-blue-800 hover:text-blue-500 transition-transform transform rounded-full text-center hover:border-1 hover:border-violet-600
 w-10 h-10 flex items-center justify-center"
            >
              <Icon className="w-6 h-6" />
            </a>
          )
        )}
      </div>

      {/* Thin Line Separator */}
      <hr className="w-full max-w-7xl mx-auto border-t border-gray-400 my-6" />

      {/* Copyright Section */}
      <div className="text-center text-gray-700 text-sm">
        &copy; {new Date().getFullYear()} SGT Global. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
