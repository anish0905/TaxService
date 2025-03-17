import React, { useState, useEffect, useRef } from "react";
import img1 from "../assets/img/download.webp";
import img2 from "../assets/img/download.webp";
import img3 from "../assets/img/download.webp";
import img4 from "../assets/img/download.webp";
import video from "../assets/Rolled.mp4";

// Sections Data
const sections = [
  {
    title: "Introduction to Tax Services",
    text: "Understand the importance of tax services and how they help individuals and businesses stay compliant.",
    image: img1,
  },
  {
    title: "Understanding Tax Regulations",
    text: "Familiarize yourself with tax laws, filing deadlines, and compliance requirements.",
    image: img2,
  },
  {
    title: "Tax Planning & Strategy",
    text: "Develop an effective tax-saving strategy by utilizing deductions, exemptions, and credits.",
    image: img3,
  },
  {
    title: "Income Tax Filing Process",
    text: "Step-by-step guidance on filing individual and business income tax returns accurately.",
    image: img4,
  },
  {
    title: "GST & Business Taxes",
    text: "Learn about GST registration, filing, and compliance for businesses.",
    image: img1,
  },
  {
    title: "Tax Deductions & Credits",
    text: "Maximize your savings by understanding eligible deductions and tax credits.",
    image: img2,
  },
  {
    title: "Tax Compliance & Audits",
    text: "Ensure proper record-keeping and avoid penalties by staying compliant with tax laws.",
    image: img3,
  },
  {
    title: "Handling Tax Notices",
    text: "Know how to respond to tax notices and resolve issues with the tax authorities.",
    image: img4,
  },
  {
    title: "Final Tax Submission & Refunds",
    text: "Submit your final tax returns and track refunds efficiently.",
    image: img1,
  },
];

const WorkingOverview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(entry.target);
            if (index !== -1) {
              setCurrentIndex(index);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full relative lg:px-[8%] font-serif bg-[#e6fafc]">
      {/* Left Side: Video Section */}
      <div className="lg:w-1/2 sticky top-0 h-screen flex items-center justify-center mr-12">
        <video
          src={video}
          className="object-cover transition-all duration-500 ease-in-out w-full h-full"
          autoPlay
          loop
        ></video>
      </div>

      {/* Right Side: Content Section */}
      <div className="flex-1 overflow-y-auto p-6 py-20 lg:w-1/2">
        {(showAll ? sections : sections.slice(0, 3)).map((section, index) => (
          <div
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-600">
              {section.title}
            </h2>
            <p className="text-gray-700 text-lg">{section.text}</p>
          </div>
        ))}

        {/* Read More Button */}
        {!showAll && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 mt-6 text-white bg-blue-500 hover:bg-blue-700 transition rounded-lg"
            >
              Read More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkingOverview;
