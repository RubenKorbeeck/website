"use client";
import { useEffect, useState } from "react";
import Scrollbar from "smooth-scrollbar";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update scroll progress based on the Smooth Scrollbar offset.
  useEffect(() => {
    let scrollbarInstance = null;
    const updateScrollProgressFromOffset = ({ offset }) => {
      const scrollTop = offset.y;
      // Use the scroll container to determine the total scrollable height.
      const scrollContainer = document.querySelector("#scroll-container");
      if (scrollContainer) {
        const containerHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;
        const totalScrollableHeight = containerHeight - clientHeight;
        const progress = (scrollTop / totalScrollableHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    const interval = setInterval(() => {
      const scrollContainer = document.querySelector("#scroll-container");
      if (scrollContainer) {
        scrollbarInstance = Scrollbar.get(scrollContainer);
        if (scrollbarInstance) {
          scrollbarInstance.addListener(updateScrollProgressFromOffset);
          // Set the initial progress.
          updateScrollProgressFromOffset({ offset: scrollbarInstance.offset });
          clearInterval(interval);
        }
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (scrollbarInstance) {
        scrollbarInstance.removeListener(updateScrollProgressFromOffset);
      }
    };
  }, []);

  // Helper to scroll to a given percentage using Smooth Scrollbar.
  const scrollToPercentage = (percentage) => {
    const scrollContainer = document.querySelector("#scroll-container");
    if (scrollContainer) {
      const scrollbarInstance = Scrollbar.get(scrollContainer);
      if (scrollbarInstance) {
        const containerHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;
        const totalScrollableHeight = containerHeight - clientHeight;
        const scrollToY = (percentage / 100) * totalScrollableHeight;
        scrollbarInstance.scrollTo(0, scrollToY, 500); // 500ms duration
      }
    }
  };

  // Clicking on the progress bar background scrolls to the clicked position.
  const handleClick = (event) => {
    const progressBar = event.currentTarget;
    const clickY = event.clientY - progressBar.getBoundingClientRect().top;
    const progressBarHeight = progressBar.clientHeight;
    const scrollPercentage = (clickY / progressBarHeight) * 100;
    scrollToPercentage(scrollPercentage);
  };

  // Markers with fixed percentages.
  const markers = [
    { label: "start", percentage: -1 },
    { label: "car", percentage: 7.938 },
    { label: "stories", percentage: 38.9 },
    { label: "partners", percentage: 71.412 },
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
              top: `calc(${marker.percentage}% - 9px)`, // Center the marker vertically.
              transform: "translateY(50%) translateX(30%)",
            }}
            onClick={(e) => {
              // Prevent parent's onClick from firing.
              e.stopPropagation();
              scrollToPercentage(marker.percentage);
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
      </div>
    </div>
  );
};

export default ScrollProgressBar;
