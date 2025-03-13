import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Teresa May",
    role: "Founder at ET Company",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    rating: 4.5,
  },
  {
    name: "Maggie McLoan",
    role: "Photographer at Studio LA",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp",
    text: "Autem, totam debitis suscipit saepe sapiente magnam officiis quaerat necessitatibus odio assumenda perferendis labore laboriosam.",
    rating: 5,
  },
  {
    name: "Alexa Horwitz",
    role: "Front-end Developer in NY",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp",
    text: "Cras sit amet nibh libero, in gravida nulla metus scelerisque ante sollicitudin commodo cras purus odio, vestibulum in tempus viverra turpis.",
    rating: 4,
  },
];

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="bg-[#e6fbfc] py-15">
      <h3 className="text-center text-3xl font-bold mb-6">Testimonials</h3>
      <div className="max-w-2xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white shadow-lg rounded-xl"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="rounded-full mx-auto w-20 h-20 mb-4"
              />
              <h5 className="text-2xl font-semibold">{testimonial.name}</h5>
              <p className="text-xl text-gray-600 mb-2">{testimonial.role}</p>
              <p className="text-gray-700">"{testimonial.text}"</p>
              <div className="text-yellow-500 mt-4  text-2xl">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>
                    {i < Math.floor(testimonial.rating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
