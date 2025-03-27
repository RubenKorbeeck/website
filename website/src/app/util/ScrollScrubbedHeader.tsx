"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Scrollbar from "smooth-scrollbar";
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
    let scrollbarInstance: Scrollbar | null = null;

    // Define the scroll handler to compute progress based on the scrollbar's offset
    const handleScrollbarScroll = ({ offset }: { offset: { x: number; y: number } }) => {
      const scrolled = offset.y;
      const H0 = window.innerHeight; // initial header height in px
      const Hf = 0.2 * H0; // final header height = 20vh
      const delta = H0 - Hf; // total shrink in px (≈ 0.8 * H0)
      // Adjust the progress by accounting for the lost height.
      const factor = threshold > delta ? 1 - delta / threshold : 1;
      const adjustedProgress = scrolled / (threshold * factor);
      const clamped = Math.min(Math.max(adjustedProgress, 0), 1);
      setProgress(clamped);
    };

    // Poll for the scrollbar instance every 100ms in case it's not immediately available.
    const interval = setInterval(() => {
      const scrollContainer = document.querySelector("#scroll-container");
      if (scrollContainer) {
        const instance = Scrollbar.get(scrollContainer as HTMLElement);
        if (instance) {
          scrollbarInstance = instance;
        }
        if (scrollbarInstance) {
          scrollbarInstance.addListener(handleScrollbarScroll);
          // Run once with the current offset.
          handleScrollbarScroll({ offset: scrollbarInstance.offset });
          clearInterval(interval);
        }
      }
    }, 100);

    // Cleanup the listener on unmount.
    return () => {
      clearInterval(interval);
      if (scrollbarInstance) {
        scrollbarInstance.removeListener(handleScrollbarScroll);
      }
    };
  }, [threshold]);

  // Further refine the progress using the optional start and end thresholds.
  const normalizedProgress = Math.min(
    Math.max((progress - start) / (end - start), 0),
    1
  );

  // Interpolate the style values based on normalizedProgress.
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
            opacity: currentOpacity,
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
    </div>
  );
};

export default ScrollScrubbedHeader;
