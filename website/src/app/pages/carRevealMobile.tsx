"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import GT from "../../pictures/GreenThunder.webp";
import CountdownTimer from "../util/timer";

// Example slides; replace each with your desired images and text.
const slides = [
  {
    image: GT,
    text: "hi",
  },
  {
    image: GT,
    text: "Slide 2: Additional info here.",
  },
  {
    image: GT,
    text: "Slide 3: More details on the race.",
  },
];



const CarRevealMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX;
    const threshold = 50; // Minimum swipe distance in pixels

    // Swipe left: go forward if not on the last slide.
    if (delta > threshold && currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    // Swipe right: go back if not on the first slide.
    else if (delta < -threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className="block md:hidden w-full h-screen relative bg-gray-900 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Outer container with fixed height */}
      <div className="relative w-full h-full">
        {/* Slide track */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex-none w-full h-full flex flex-col items-center justify-center px-4"
            >
              {/* Image container: fixed size relative to slide height */}
              <div className="relative w-4/5 h-1/2">
                <Image
                  src={slide.image}
                  alt="Slide image"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              {/* Text container with fixed height to prevent expansion */}
              <div className="mt-4 text-center text-white text-lg h-20 overflow-hidden">
                {slide.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dot indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center space-y-2">
      <div
        className="text-white px-4 py-2 rounded-md shadow-md font-semibold"
        style={{
          backgroundImage: "linear-gradient(to right, var(--green1), var(--green3))",
        }}
      >
        Time until race: <CountdownTimer />
      </div>
    </div>
    </div>
  );
};

export default CarRevealMobile;