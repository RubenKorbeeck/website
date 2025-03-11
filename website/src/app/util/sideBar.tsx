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

  // Click on the progress bar to scroll to that position.
  const handleClick = (event) => {
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

  // Markers with fixed percentages.
  const markers = [
    { label: "start", percentage: 0 },
    { label: "car", percentage: 7.938 },
    { label: "stories", percentage: 38.9 },
    { label: "partners", percentage: 70.412 },
    { label: "bottom", percentage: 100 },
  ];

  return (
    <div
      className="fixed right-2 top-20 bottom-5 transform text-white -translate-x-1/2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="absolute right-0 top-0 w-1 h-full bg-gray-200 rounded-full">
        {/* Render clickable markers */}
        {markers.map((marker) => (
          <div
            key={marker.label}
            className="absolute right-0 w-3 h-3 rounded-full bg-[var(--green2)] cursor-pointer"
            style={{
              top: `calc(${marker.percentage}% - 9px)`, // Offset to center the circle
              transform: "translateY(50%) translateX(30%)",
            }}
            onClick={(e) => {
              // Prevent the parent's onClick handler from triggering.
              e.stopPropagation();
              const documentHeight = document.documentElement.scrollHeight;
              const clientHeight = document.documentElement.clientHeight;
              const totalScrollableHeight = documentHeight - clientHeight;
              const scrollToY =
                (marker.percentage / 100) * totalScrollableHeight;
              window.scrollTo({ top: scrollToY, behavior: "smooth" });
            }}
          />
        ))}
        {/* Filling effect as the scroll progresses */}
        <div
          className="absolute right-0 top-0 w-1 bg-[var(--green2)] rounded-full"
          style={{
            height: `${scrollProgress}%`,
            transition: "height 0.1s ease-out",
          }}
        />
        {/* Moving circle indicator for current scroll progress */}
      </div>
    </div>
  );
};

export default ScrollProgressBar;
