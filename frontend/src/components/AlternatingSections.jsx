import React from "react";
import { motion } from "framer-motion";
import TaxManagement from "../assets/img/TaxManagement.webp"
import TaxStrategy from "../assets/img/TaxStrategy.webp"


const AlternatingSections = () => {

  return (
    <div className="w-full ">
      {/* Section 1: Image Left, Content Right */}
      <motion.div
        className="flex flex-col md:flex-row items-center w-full py-20 px-5 from-blue-500 to-[#a5e9ec]"
        initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="md:w-1/2 p-5">
  <img
  
    src={TaxManagement}
    alt="Tax Management and Automation"
    className="w-full h-96 rounded-lg shadow-lg"
  />
</div>
        <div className="md:w-1/2 p-5 text-center md:text-left">
  <h2 className="text-4xl font-bold text-gray-800">
    Simplify Tax Management with Technology
  </h2>
  <p className="text-gray-600 mt-4 text-lg">
    Leverage advanced automation and AI-driven solutions to streamline tax 
    compliance, optimize financial processes, and stay ahead of regulatory changes. 
    Experience seamless tax management like never before.
  </p>
</div>

      </motion.div>

      {/* Section 2: Content Left, Image Right */}
      <motion.div
        className="flex flex-col md:flex-row-reverse items-center w-full py-20 px-5 from-[#a7ecf0] to-blue-500"
        initial={{ opacity: 0, rotate: 15, scale: 0.8 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="md:w-1/2 p-5">
          <img
            src={TaxStrategy}
                        alt="Business"
            className="w-full h-96 object-fit rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 p-5 text-center md:text-left">
        <h2 className="text-4xl font-bold text-gray-800">
  Optimize Your Tax Strategy
</h2>
<p className="text-gray-600 mt-4 text-lg">
  Maximize savings and ensure compliance with expert tax solutions tailored 
  for businesses and individuals. Leverage cutting-edge tools and insights 
  to simplify tax management and drive financial success.
</p>

        </div>
      </motion.div>
    </div>
  );
};

export default AlternatingSections;
