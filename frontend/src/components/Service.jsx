import React from "react";

const Service = () => {
  const industries = [
    {
      title: "Logistics & Supply-Chain",
      description: "Improve risk visibility across logistic and supply change environments.",
      icon: "🚚",
    },
    {
      title: "Retail & Wholesale",
      description: "Enhance safety & operational awareness across retail & warehouse operations.",
      icon: "🛒",
    },
    {
      title: "Industrial Manufacturing",
      description: "Boost safety insights across your logistics and manufacturing facilities.",
      icon: "🏭",
    },
    {
      title: "Food & Beverage Manufacturing",
      description: "Enhance safety awareness across your food & beverage environments.",
      icon: "🍽️",
    },
    {
      title: "Ports & Maritime",
      description: "Strengthen risk visibility across your ports and maritime facilities.",
      icon: "⚓",
    },
    {
      title: "Warehousing",
      description: "Improve risk visibility throughout your warehouse environments.",
      icon: "📦",
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-[#e6fbfc] min-h-screen text-white flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl font-extrabold mb-4">Industry Solutions</h1>
        <p className="text-lg opacity-90">
          Explore our solutions designed to enhance visibility, safety, and operational efficiency across various industries.
        </p>
      </div>

      {/* Industry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {industries.map((industry, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transform transition-all duration-300 hover:shadow-2xl"
          >
            <div className="text-5xl mb-4">{industry.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-center">{industry.title}</h2>
            <p className="text-center text-gray-600">{industry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
