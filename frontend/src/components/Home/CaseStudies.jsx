import React, { useRef, useState, useEffect } from "react";

const cards = [
  {
    title:
      "Intelligent Inspection of Transmission Lines & EHV Towers with T-Pulse Maintenance Assistant",
    copy: "Intelligent Inspection of Transmission Lines & EHV Towers.",
    button: "View Trips",
    imageId:
      "https://cdn.pixabay.com/photo/2024/08/14/14/52/ai-generated-8968720_1280.jpg",
  },
  {
    title: "Intelligent Midstream Surveillance with T-Pulse for Workplace Security",
    copy: "Enhancing security and workplace safety.",
    button: "Book Now",
    imageId:
      "https://cdn.pixabay.com/photo/2022/10/03/00/59/market-7494693_960_720.jpg",
  },
  {
    title: "Iron and Steel Industry",
    copy: "Next-level industrial monitoring solutions.",
    button: "View Trips",
    imageId:
      "https://cdn.pixabay.com/photo/2024/08/22/10/38/ai-generated-8989016_1280.jpg",
  },
  {
    title: "Oil industry",
    copy: "Intelligent Inspection of Transmission Lines & EHV Towers.",
    button: "View Trips",
    imageId:
      "https://cdn.pixabay.com/photo/2024/08/14/14/52/ai-generated-8968720_1280.jpg",
  },
  {
    title: "Intelligent Midstream Surveillance with T-Pulse for Workplace Security",
    copy: "Enhancing security and workplace safety.",
    button: "Book Now",
    imageId:
      "https://cdn.pixabay.com/photo/2022/10/03/00/59/market-7494693_960_720.jpg",
  },
  {
    title: "Iron and Steel Industry",
    copy: "Next-level industrial monitoring solutions.",
    button: "View Trips",
    imageId:
      "https://cdn.pixabay.com/photo/2024/08/22/10/38/ai-generated-8989016_1280.jpg",
  },
  {
    title: "Logistics Giant Leverages T-Pulse to Overhaul Workplace Safety at Their Largest Warehouse",
    copy: "Intelligent Inspection of Transmission Lines & EHV Towers.",
    button: "View Trips",
    imageId:
      "https://cdn.pixabay.com/photo/2024/08/14/14/52/ai-generated-8968720_1280.jpg",
  },
  {
    title: "Protecting Industrial Pipeline Networks against Corrosion Failures",
    copy: "Enhancing security and workplace safety.",
    button: "Book Now",
    imageId:
      "https://cdn.pixabay.com/photo/2022/10/03/00/59/market-7494693_960_720.jpg",
  },
  {
    title: "Iron and Steel Industry",
    copy: "Next-level industrial monitoring solutions.",
    button: "View Trips",
    imageId:
      "https://cdn.pixabay.com/photo/2024/08/22/10/38/ai-generated-8989016_1280.jpg",
  },
  {
    title: "Mountain View",
    copy: "Intelligent Inspection of Transmission Lines & EHV Towers.",
    button: "View Trips",
    imageId:
      "https://cdn.pixabay.com/photo/2024/08/14/14/52/ai-generated-8968720_1280.jpg",
  },
  {
    title: "Midstream Surveillance",
    copy: "Enhancing security and workplace safety.",
    button: "Book Now",
    imageId:
      "https://cdn.pixabay.com/photo/2022/10/03/00/59/market-7494693_960_720.jpg",
  },
  {
    title: "Iron and Steel Industry",
    copy: "Next-level industrial monitoring solutions.",
    button: "View Trips",
    imageId:
      "https://cdn.pixabay.com/photo/2024/08/22/10/38/ai-generated-8989016_1280.jpg",
  },
];

const CaseStudies = ({ title, copy, button, imageId }) => {
  return (
    <div
      className="relative flex-shrink-0 w-[80vw] sm:w-[300px] h-[450px] snap-center
       text-white shadow-lg rounded-xl transform transition-transform duration-500 hover:scale-105"
      style={{
        backgroundImage: `url(${imageId})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 hover:opacity-30 transition-opacity duration-500 rounded-xl"></div>
      <div className="absolute bottom-24 w-full px-6">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-1 text-sm italic">{copy}</p>
      </div>
      <button className="px-4 py-2 left-6 absolute  bottom-6 border border-yellow-500 text-whit font-semibold rounded-lg shadow-md transition-all hover:bg-yellow-500 hover:text-black">
        {button}
      </button>
    </div>
  );
};

const CardGrid = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setIsAutoScrolling(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoScrolling(true), 3000);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const scrollLeftFunc = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 3000);
    }
  };

  const scrollRightFunc = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 3000);
    }
  };

  useEffect(() => {
    if (!isAutoScrolling || !scrollRef.current) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  return (
    <div className="relative bg-[#2a464b] flex flex-col h-auto px-[5%] pb-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center text-white my-10 lg:my-16 px-6">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 max-w-2xl">
          🌟 Transforming Businesses with Smart Tax Solutions
          </h1>
          <p className="text-lg max-w-2xl mx-auto lg:mx-0">
          At Tax Servicez, we don’t just offer tax solutions—we empower businesses with seamless digital tax transformations that drive real results. Here are some inspiring success stories from our clients who have benefited from our expertise.
          </p>
        </div>
        <div className="mt-6 lg:mt-0">
          <button className="px-6 py-3 border border-yellow-500 text-white hover:border-black hover:border-1  font-semibold rounded-lg shadow-md transition-all hover:bg-yellow-500 hover:text-black">
            Explore Now
          </button>
        </div>
      </div>

      {/* Scrollable Cards with Buttons */}
      <div className="relative flex items-center">
        {/* Left Scroll Button (Outside) */}
        <button
          className="absolute left-0 -ml-12 top-1/2 -translate-y-1/2 z-10 h-20 px-4 shadow-lg backdrop-blur-md bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:scale-110 transition-transform duration-300 ease-in-out rounded-l-full rounded-r-md"
          onClick={scrollLeftFunc}
        >
          ◀
        </button>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing items-center w-full px-10"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsAutoScrolling(false)}
          onTouchStart={() => setIsAutoScrolling(false)}
          onTouchEnd={() => setTimeout(() => setIsAutoScrolling(true), 1000)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cards.map((card, index) => (
            <CaseStudies key={index} {...card} />
          ))}
        </div>

        {/* Right Scroll Button (Outside) */}
        <button
          className="absolute right-0 -mr-12 top-1/2 -translate-y-1/2 z-10 h-20 px-4 shadow-lg backdrop-blur-md bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:scale-110 transition-transform duration-300 ease-in-out rounded-r-full rounded-l-md"
          onClick={scrollRightFunc}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default CardGrid;
