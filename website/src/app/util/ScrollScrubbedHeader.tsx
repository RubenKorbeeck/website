"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import TDSR_logo from "../../pictures/tdsr-full-logo.svg"; // adjust the path as needed

interface ScrollScrubbedHeaderProps {
  /** The normalized scroll progress at which the animation should start (0 to 1). Default is 0. */
  start?: number;
  /** The normalized scroll progress at which the animation should end (0 to 1). Default is 1. */
  end?: number;
  /**
   * The scroll distance (in pixels) over which the animation occurs if the header remained full size.
   * Must be greater than the header's shrink amount (default 300).
   */
  threshold?: number;
}

const ScrollScrubbedHeader: React.FC<ScrollScrubbedHeaderProps> = ({
  start = 0,
  end = 1,
  threshold = 300,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const H0 = window.innerHeight; // initial header height (in px)
      const Hf = 0.2 * H0; // final header height = 20vh
      const delta = H0 - Hf; // total shrink in px (should be 0.8 * H0)

      // Adjust the scroll progress by dividing by a factor that accounts for the lost height.
      const factor = threshold > delta ? 1 - delta / threshold : 1;
      const adjustedProgress = scrolled / (threshold * factor);
      const clamped = Math.min(Math.max(adjustedProgress, 0), 1);
      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll);
    // Run once on mount.
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  // Further refine with optional start and end thresholds.
  const normalizedProgress = Math.min(
    Math.max((progress - start) / (end - start), 0),
    1
  );

  // Interpolated style values.
  const currentHeight = 100 - (100 - 20) * normalizedProgress; // from 100vh to 20vh.
  const currentWidth = 75 - (75 - 0) * normalizedProgress; // from 75% to 0%.
  const currentOpacity = Math.max(1 - 2 * normalizedProgress, 0);
  const currentTranslateY = -150 * normalizedProgress; // from 0px to -150px.

  return (
    <div
      className="relative flex flex-col items-center justify-start transition-all duration-500 linear"
      style={{ height: `${currentHeight}vh` }}
    >
      <main className="flex flex-col gap-8 items-center mt-[200px] w-full">
        <div
          className="flex justify-center items-center transition-all duration-500 linear"
          style={{
            width: `${currentWidth}%`,
            transform: `translateY(${currentTranslateY}px)`,
            opacity: `${currentOpacity}`,
          }}
        >
          <Image
            src={TDSR_logo}
            alt="TDSR logo"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 30vw"
            priority
          />
        </div>
      </main>
      {/* Green blur line at the bottom with stronger upward blur */}
    </div>
  );
};

export default ScrollScrubbedHeader;
