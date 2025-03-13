import React from "react";
import video from "../../../src/assets/safety.mp4";

const HeroSection = () => {
  return (
    <div className="relative w-full  h-[100vh] sm:h-[90vh] overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Background video showing proactive safety powered by AI"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Black Overlay with Opacity */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="absolute bottom-20 left-0 w-full p-4 sm:p-10 z-50">
        <div className="container mx-auto text-center sm:text-left text-white">
          <div className="w-full lg:w-3/5 animate-fadeIn">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
              Unleash the Potential of
            </h2>
            <h4 className="text-3xl sm:text-5xl lg:text-7xl font-bold mt-2 leading-snug">
              Detect Technology & SGT Partnership
            </h4>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed mt-6">
              SGT Global and Detect Technologies have joined forces to spearhead
              a paradigm shift in the industrial sector’s approach to security
              and safety. This groundbreaking partnership brings together SGT
              Global’s expertise in AI and Detect Technologies’ innovative
              solutions in industrial safety, creating a formidable alliance
              poised to revolutionize the way businesses safeguard their
              operations.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex sm:flex-row justify-center sm:justify-start gap-3 sm:gap-6">
              <button className="bg-yellow-400 hover:bg-yellow-700 hover:border-black text-black px-6 py-3 w-36 sm:w-40 rounded-lg text-base sm:text-lg transition-all shadow-md hover:shadow-xl">
                Demo
              </button>
              <button className="bg-gray-800 hover:bg-gray-900 border border-transparent w-36 sm:w-40 hover:border-yellow-500 text-white px-6 py-3 rounded-lg text-base sm:text-lg transition-all shadow-md hover:shadow-xl">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
