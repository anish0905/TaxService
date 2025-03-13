import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Expert = () => {
  const faqs = [
    {
      question: "How can AI help identify hazards and prevent them?",
      answer: "AI can analyze patterns and detect risks early...",
    },
    {
      question: "How to identify hazards in the workplace?",
      answer: "Hazards can be identified through regular inspections...",
    },
    {
      question: "How do I prevent false positives in near miss reporting?",
      answer: "To reduce false positives, refine detection algorithms...",
    },
    {
      question: "What are the benefits of AI in EHS?",
      answer: "AI improves safety compliance and reduces risks...",
    },
    {
      question: "How does machine learning enhance workplace safety?",
      answer: "ML can predict and prevent workplace accidents...",
    },
  ];

  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full px-4 py-12 bg-[#e6fbfc] rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center">
      {/* Image Section on Left */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img src={images[currentImage]} alt="AI Expert" className="object-cover w-full h-64 md:h-96 rounded-lg" />
      </div>

      <div className="md:w-1/2 flex flex-col justify-start px-4 md:px-[5%]">
        {/* Header Section */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Ask The Expert</h2>
        <p className="text-gray-600 mt-3 text-sm sm:text-base">
          Explore common questions asked by EHS professionals on AI safety. If you have any additional queries, feel free to contact us.
        </p>

        {/* FAQ Section */}
        <div className="space-y-4 w-full">
          {(expanded ? faqs : faqs.slice(0, 3)).map((faq, index) => (
            <div key={index} className="bg-[#81afb5] shadow-lg rounded-lg p-5 transition-transform transform hover:scale-[1.02] duration-300">
              <button className="w-full flex justify-between items-center text-gray-900 font-semibold text-sm sm:text-lg" onClick={() => toggleFAQ(index)}>
                {faq.question}
                {openIndex === index ? <ChevronUp size={20} className="text-gray-700" /> : <ChevronDown size={20} className="text-gray-700" />}
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openIndex === index ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"} text-sm sm:text-base`}>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}

          {/* View More/Less Button */}
          {faqs.length > 3 && (
            <div className="flex justify-center mt-6">
              <button className="bg-[#0a848f] border-yellow-500 border-1 text-white font-bold py-2 px-5 rounded-lg shadow-lg hover:bg-[rgb(111,204,212)] transition duration-300 hover:text-black text-sm sm:text-base" onClick={() => setExpanded(!expanded)}>
                {expanded ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expert;
