import { motion } from "framer-motion";
import React from "react";
import video from "../../assets/industry.mp4";
const CollaborationPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-16 py-20 bg-gray-900 text-white">
      {/* Content Section */}
      <motion.div
        className="w-full md:w-1/2 text-center flex flex-col items-center"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
     <h3 className="text-center">Unlock the Power of</h3>
<h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
  Tax Servicez & Your Tax Solutions
</h2>
<p className="text-lg text-gray-300">
  Tax Servicez is dedicated to empowering tax service providers with 
  cutting-edge solutions that streamline compliance, enhance accuracy, 
  and optimize financial planning. Our expertise in tax advisory, 
  regulatory compliance, and AI-driven automation ensures that tax professionals 
  can focus on what they do best—serving their clients efficiently.  
  Partner with Tax Servicez to revolutionize your tax management strategy and 
  stay ahead in an ever-evolving financial landscape.
</p>

      </motion.div>

      {/* Video Section */}
      <motion.div
        className="w-full md:w-1/2 h-64 md:h-96 overflow-hidden rounded-2xl shadow-lg"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
        </video>
      </motion.div>
    </div>
  );
};

export default CollaborationPage;
