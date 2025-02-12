"use client";
import { useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const totalScrollableHeight = documentHeight - clientHeight;
    const progress = (scrollTop / totalScrollableHeight) * 100;

    setScrollProgress(Math.min(progress, 100)); // Clamp value between 0-100%
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progressBar = event.currentTarget;
    const clickY = event.clientY - progressBar.getBoundingClientRect().top;
    const progressBarHeight = progressBar.clientHeight;

    const scrollPercentage = clickY / progressBarHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const totalScrollableHeight = documentHeight - clientHeight;
    const scrollToY = scrollPercentage * totalScrollableHeight;

    window.scrollTo({ top: scrollToY, behavior: "smooth" });
  };

  return (
    <div
      className="fixed right-2 top-5 bottom-5 transform -translate-x-1/2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-2 h-full bg-transparent border-4 border-gray-300 rounded-full">
        {/* Filling effect as the circle passes over the bar */}
        <div
          className="absolute right-0 top-0 w-2 bg-green-500 rounded-full"
          style={{
            height: `${scrollProgress}%`,
            transition: "height 0.1s ease-out",
          }}
        />
        {/* Circle that moves based on scroll progress */}
        <div
          className="absolute right-0 w-6 h-6 rounded-full bg-green-500"
          style={{
            top: `calc(${scrollProgress}% - 22px)`,
            transform: "translateY(50%) translateX(30%)",
            transition: "top 0.15s ease-out",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollProgressBar;
