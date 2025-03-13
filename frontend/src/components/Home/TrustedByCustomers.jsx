import React from "react";
import logo1 from "../../assets/img/Mask-Group-11-1.png";
import logo2 from "../../assets/img/Mask-Group-13.png";
import logo3 from "../../assets/img/Mask-Group-14-1.png";
import logo4 from "../../assets/img/Mask-Group-15-1.png";
import logo5 from "../../assets/img/Mask-Group-16-1.png";

// Sample logos data (you can replace with your actual logos)
const logos = [logo1, logo2, logo3, logo4, logo5];

const TrustedByCustomers = () => {
  return (
    <section className="py-16 bg-[#e6fafc]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Trusted by
        </h2>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedByCustomers;
