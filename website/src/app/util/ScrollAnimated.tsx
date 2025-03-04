"use client";
import { useEffect, useRef, useState } from "react";

interface ScrollScrubbedProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right"; // Determines the initial movement direction
}

const ScrollAnimated: React.FC<ScrollScrubbedProps> = ({ children, className, direction = "left" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Calculate progress:
      // When the element's top is at the bottom of the viewport, progress ~0.
      // When the element's bottom is at the top, progress ~1.
      const progressValue = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      setProgress(progressValue);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount in case the element is already visible
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define the starting translation in pixels (adjust as needed)
  const translateInitial = direction === "left" ? -100 : 100;
  // Calculate current translation based on scroll progress
  const currentTranslate = translateInitial * (1 - progress);
  // Fade from transparent (0) to fully opaque (1)
  const currentOpacity = progress;

  return (
    <div
      ref={ref}
      style={{
        transform: `translateX(${currentTranslate}px)`,
        opacity: currentOpacity,
      }}
      className={`transition-none ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimated;
