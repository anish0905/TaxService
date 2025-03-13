import React, { useEffect, useState } from "react";
import axios from "axios";
import { HandMetal } from "lucide-react";
import { Helmet } from "react-helmet-async";


const HeroSection = () => {
  const [videos , setVideos] = useState("");
  const URI = import.meta.env.VITE_API_URL;
  console.log(videos);
  

  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${URI}/api/videos`);
        setVideos(response.data); // Update state with fetched data
        // console.log(response.data); // Log or use the fetched data
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <>
        {/* SEO Helmet */}
        <Helmet>
        <title>{videos[0]?.title}</title>
        <meta name="description" content={videos[0]?.description} />
        <meta property="og:title" content={videos[0]?.title} />
        <meta property="og:description" content={videos[0]?.description} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={URI} />
        <meta property="og:image" content={videos ? `${URI}${videos[0]?.videoUrl}` : "/default-thumbnail.jpg"} />
      </Helmet>
    <div className="relative w-full  h-[100vh] sm:h-[90vh] overflow-hidden">
      {/* Background Video */}
      {videos.length > 0 && videos[0].videoUrl ? (
  <video
    autoPlay
    loop
    muted
    className="absolute inset-0 w-full h-full object-cover"
    aria-label="Background video showing proactive safety powered by AI"
  >
    <source src={`${URI}${videos[0].videoUrl}`} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
) : (
  <div className="absolute inset-0 w-full h-full bg-gray-900 flex items-center justify-center text-white">
    Loading video...
  </div>
)}


      {/* Black Overlay with Opacity */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="absolute top-1.5 left-0 w-full p-8  z-50 mt-14   sm:px-6">
  <div className="container mx-auto text-center sm:text-left text-white">
    <div className="w-full lg:w-3/5 animate-fadeIn">
      {videos.length > 0 ? (
        (() => {
          const words = videos[0].title.split(" ");
          const firstFourWords = words.slice(0, 4).join(" ");
          const remainingWords = words.slice(4).join(" ");

          return (
            <>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight">
                {firstFourWords}
              </h1>
              <h4 className="text-3xl sm:text-5xl lg:text-6xl font-bold mt-2 leading-snug">
                {remainingWords}
              </h4>
            </>
          );
        })()
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-semibold">Loading...</h1>
          <h4 className="text-3xl sm:text-5xl lg:text-7xl font-bold mt-2"></h4>
        </>
      )}

      <p className="text-base sm:text-lg lg:text-xl leading-relaxed mt-4 sm:mt-6">
        {videos.length > 0 ? videos[0].description : "Loading..."}
      </p>

      {/* Buttons */}
      <div className="mt-6 flex justify-center sm:justify-start gap-3 sm:gap-6">
        <button className="bg-yellow-400 hover:bg-yellow-700 hover:border-black text-black px-6 py-3 w-32 sm:w-40 rounded-lg text-sm sm:text-lg transition-all shadow-md hover:shadow-xl">
          Services
        </button>
        <button className="bg-gray-800 hover:bg-gray-900 border border-transparent w-32 sm:w-40 hover:border-yellow-500 text-white px-6 py-3 rounded-lg text-sm sm:text-lg transition-all shadow-md hover:shadow-xl">
          Contact
        </button>
      </div>
    </div>
  </div>
</div>

    </div>
    </>
  );
};

export default HeroSection;
