"use client";
import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";

const slides = [
  {
    title: "Up to 80% Off",
    subtitle: "Electronics & Gadgets Sale",
    button: "Shop Now",
    bg: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1926&q=80",
    btnColor: "bg-orange-500 hover:bg-orange-600",
  },
  {
    title: "Fashion Fiesta",
    subtitle: "Min 50% Off on Top Brands",
    button: "Explore Deals",
    bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2070&q=80",
    btnColor: "bg-pink-500 hover:bg-pink-600",
  },
  {
    title: "Up to ₹3,500 Off",
    subtitle: "Book flights & save big!",
    button: "Use Code: SAVE3500",
    bg: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2035&q=80",
    btnColor: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Grocery Sale",
    subtitle: "Fresh deals, everyday essentials",
    button: "Order Now",
    bg: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2074&q=80",
    btnColor: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Mobile Bonanza",
    subtitle: "Latest smartphones at best prices",
    button: "Buy Now",
    bg: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2080&q=80",
    btnColor: "bg-purple-500 hover:bg-purple-600",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              <div className="w-full h-full flex items-center bg-black/40">
                <div className="max-w-lg px-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white mb-6 opacity-90">
                    {slide.subtitle}
                  </p>
                  <button
                    className={`${slide.btnColor} text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105`}
                  >
                    {slide.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 p-2 rounded-full"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 p-2 rounded-full"
        >
          ▶
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
