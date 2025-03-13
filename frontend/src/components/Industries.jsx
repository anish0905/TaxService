import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Industries = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: "https://sgtglobal.com/wp-content/uploads/2024/02/shell-logo.png",
      title: "Manufacturing",
      text: `I met Detect in 2017 and immediately knew that their expertise and market understanding would bridge industrial gaps. I realized that Detect’s talented team could develop cutting-edge technology to substantially enhance industrial performance. 

We partnered with Detect and subsequently deployed their technologies within Adani Group and have seen the massive potential for applications across various segments in our future. It has been wonderful to see them grow from a lab to a global organization, which speaks volumes for their capabilities and the scalability of their technologies. I am eager to see how Detect Technologies grows and pushes technology and industrial innovation boundaries globally.`,
    },
    {
      image:
        "https://sgtglobal.com/wp-content/uploads/2024/02/Untitled_design-removebg-preview.png",
      title: "Adani",
      text: `We have an internal action tracker to ensure Goal Zero on-site and can take out observations from T-Pulse, add them to our action tracker, and take corrective actions proactively. I particularly like some of the observations at height - especially on the open platforms and loose material stored at height, that we can capture and act on promptly, with Detect Technologies. I can just look at the intuitive T-Pulse portal every time I get an email and review observations within 10 minutes to communicate the same to area leads.`,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQIL24WKTVcb25vSEfHoFDDFaoxv6GX2VuUw&s",
      title: "Healthcare",
      text: "I particularly like some of the observations at height - especially on the open platforms and loose material stored at height, that we can capture and act on promptly, with Detect Technologies. I can just look at the intuitive T-Pulse portal every time I get an email and review observations within 10 minutes to communicate the same to area leads",
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#e6fbfc] to-blue-500 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Carousel Section */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-96 overflow-hidden rounded-xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out flex justify-center items-center ${
                    index === activeSlide
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-90 h-80 object-cover rounded-xl shadow-lg"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
              >
                <FiChevronLeft className="w-8 h-8 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
              >
                <FiChevronRight className="w-8 h-8 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 flex items-center">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-800">
                {slides[activeSlide].title}
              </h2>
              <p className="text-lg text-gray-600">{slides[activeSlide].text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Industries;
