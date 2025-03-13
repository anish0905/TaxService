import React from "react";
import { motion } from "framer-motion";

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
            src="https://th.bing.com/th/id/OIP.sKdrrrDRyvuzNwWGSYzxzAHaE7?rs=1&pid=ImgDetMain"
            alt="Tech"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 p-5 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800">
            Innovate with Technology
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Stay ahead with cutting-edge innovations in AI, blockchain, and
            automation. Discover new possibilities.
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
            src="https://createdigital.org.au/wp-content/uploads/2019/10/create-online-safe-work-month-workplace-safety-engineering-featured.jpg"
            alt="Business"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 p-5 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800">
            Drive Your Business Forward
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Take your business to the next level with expert insights and
            next-gen solutions designed for growth.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AlternatingSections;
