import { useNavigate } from "react-router-dom";
import React from "react";

const Services = () => {
  const navigate = useNavigate();
  
  const cards = [
    {
      title: "Card 1",
      image: "/image.jpg",
      description: "This is a short description of the card.",
      link: "/demo",
    },
    {
      title: "Card 2",
      image: "/image2.jpg",
      description: "This is another short description of the card.",
      link: "/demo2",
    },
    {
      title: "Card 3",
      image: "/image3.jpg",
      description: "Yet another short description of the card.",
      link: "/demo3",
    },
    {
      title: "Card 4",
      image: "/image4.jpg",
      description: "This is yet another card description.",
      link: "/demo4",
    },
  ];

  return (
    < >
    <div className="bg-[#e6fafc]">
  <h1 className="text-4xl font-bold text-gray-800 text-center"> Services</h1>

    </div>
    <div className="min-h-screen flex flex-wrap gap-4 justify-center items-center p-6 bg-[#e6fafc]">
      {cards.map((card, index) => (
        <div key={index} className="bg-gray-300 shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
          <img src={card.image} alt={card.title} className="w-full h-40 object-cover rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
          <p className="text-gray-600 mb-4">{card.description}</p>
          <button
            onClick={() => navigate(card.link)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            View More
          </button>
        </div>
      ))}
    </div>
    </>
  );
};

const DemoPage = () => {
  return (
    <div className="min-h-screen flex flex-wrap gap-4 justify-center items-center p-6 bg-gray-100">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-4 max-w-xs w-full text-center">
          <img
            src={`/image${index + 1}.jpg`}
            alt={`Demo Image ${index + 1}`}
            className="w-full h-32 object-cover rounded mb-2"
          />
          <h3 className="text-lg font-semibold mb-2">Demo Card {index + 1}</h3>
          <p className="text-gray-500">This is a demo card with additional details.</p>
        </div>
      ))}
    </div>
  );
};

export { Services, DemoPage };
