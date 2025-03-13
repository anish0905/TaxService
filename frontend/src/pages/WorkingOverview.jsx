import React, { useState, useEffect, useRef } from "react";
import img1 from "../assets/img/download.webp";
import img2 from "../assets/img/download.webp";
import img3 from "../assets/img/download.webp";
import img4 from "../assets/img/download.webp";
import video from "../assets/Rolled.mp4";

// Array of sections with corresponding images
const sections = [
  {
    title: "How SGT Work",
    text: "We're transforming the way enterprise EHS teams approach proactive safety decisions with our cutting-edge AI technology.",
    image: img1,
  },
  {
    title: " Understanding the Process",
    text: "Gain a clear insight into the workflow and key objectives to ensure a smooth start.",
    image: img1,
  },
  {
    title: " Planning & Strategy",
    text: "Develop a structured approach with well-defined strategies for effective execution.",
    image: img2,
  },
  {
    title: "Implementation Phase",
    text: "Execute the planned tasks efficiently while maintaining quality and precision.",
    image: img3,
  },
  {
    title: " Review & Optimization",
    text: "Analyze performance, identify areas for improvement, and refine processes for better outcomes.",
    image: img4,
  },
  {
    title: " Collaboration & Teamwork",
    text: "Enhance productivity through seamless collaboration and effective communication.",
    image: img1,
  },
  {
    title: " Monitoring Progress",
    text: "Track ongoing activities to ensure alignment with goals and make necessary adjustments.",
    image: img2,
  },
  {
    title: " Problem-Solving Approach",
    text: "Address challenges proactively with innovative solutions and critical thinking.",
    image: img3,
  },
  {
    title: " Final Execution & Delivery",
    text: "Deliver the final output with excellence, meeting all expectations and standards.",
    image: img4,
  },
];

const WorkingOverview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(entry.target);
            if (index !== -1) {
              setCurrentIndex(index); // Update index based on section in view
            }
          }
        });
      },
      { threshold: 0.6 } // Trigger change when 60% of the section is visible
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full relative lg:px-[8%]  font-serif bg-[#e6fafc]">
      <div className="lg:flex lg:w-1/2 sticky top-0 h-screen flex items-center justify-center mr-12">
        {/* <img src={sections[currentIndex].image} alt="Overview Image" className="object-contain transition-all duration-500 ease-in-out" /> */}
        <video
          src={video}
          className="object-contain transition-all duration-500 ease-in-out w-full h-full"
          autoPlay
          loop
        ></video>
      </div>
      {/* Content Section */}
      <div className="flex-1 justify-center content-center items-center overflow-y-auto p-6 py-20 lg:w-1/2 sroller">
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="my-32"
          >
            {" "}
            <h2 className="text-2xl font-semibold mb-2 text-gray-600">
              {section.title}
            </h2>
            <p className="text-gray-700 text-lg">{section.text}</p>
          </div>
        ))}
      </div>

      {/* Image Section (Changes on Scroll) */}
    </div>
  );
};

export default WorkingOverview;
