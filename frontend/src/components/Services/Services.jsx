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
  <h1 className="text-4xl font-bold text-gray-800 text-center mt-3"> Services</h1>

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



export { Services };
