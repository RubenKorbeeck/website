"use client";
import { useEffect, useState } from "react";
import Scrollbar from "smooth-scrollbar";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update scroll progress based on the Smooth Scrollbar offset.
  useEffect(() => {
    let scrollbarInstance: Scrollbar | null = null;
    const updateScrollProgressFromOffset = ({ offset }: { offset: { y: number } }) => {
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
        const instance = Scrollbar.get(scrollContainer as HTMLElement);
        if (instance) {
          scrollbarInstance = instance;
        }
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
  const scrollToPercentage = (percentage: number): void => {
    const scrollContainer = document.querySelector("#scroll-container");
    if (scrollContainer) {
      const scrollbarInstance = Scrollbar.get(scrollContainer as HTMLElement);
      if (scrollbarInstance) {
        const containerHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;
        const totalScrollableHeight = containerHeight - clientHeight;
        const scrollToY = (percentage / 100) * totalScrollableHeight;
        scrollbarInstance.scrollTo(0, scrollToY, 500); // 500ms duration
      }
    }
  };




  // Markers with fixed percentages.
  const markers = [
    { label: "start", percentage: -1 },
    { label: "car", percentage: 6.138 },
    { label: "stories", percentage: 37 },
    { label: "partners", percentage: 68.2377 },
    { label: "bottom", percentage: 100 },
  ];

  return (
    <div
      className="fixed right-2 top-20 bottom-5 transform text-white -translate-x-1/2"
      
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
            onClick={() => {
              scrollToPercentage(marker.percentage);
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
