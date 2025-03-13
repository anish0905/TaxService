import React from "react";
import logo from "../../assets/img/taxsolutin.png";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      {/* Glowing Spinning Loader with Logo */}
      <div className="relative">
        {/* Increased size of the spinning loader */}
        <div className="animate-spin rounded-full h-48 w-48 border-t-4 border-violet-600 shadow-[0_0_30px_3px_rgba(59,130,246,0.8)]"></div>
        
        {/* Centered Logo Image with increased size */}
        <img
          src={logo}
          alt="Loading"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 drop-shadow-[0_0_30px_rgba(59,130,246,1)]"
        />
      </div>

      {/* Welcome Message */}
      <p className="mt-6 text-xl font-semibold text-gray-300 opacity-0 animate-fade-in">
        Welcome to <span className="text-blue-400 font-bold">Tax Servicez</span>
      </p>
    </div>
  );
};

export default Loader;
