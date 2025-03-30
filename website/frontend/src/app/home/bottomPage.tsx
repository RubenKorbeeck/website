"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import picture1 from "../../pictures/scrollPictures/picture1.jpg";
import picture2 from "../../pictures/scrollPictures/picture2.jpg";
import picture3 from "../../pictures/scrollPictures/picture3.jpg";
import picture4 from "../../pictures/scrollPictures/picture4.jpg";
import picture5 from "../../pictures/scrollPictures/picture5.jpg";
import picture6 from "../../pictures/scrollPictures/picture6.jpg";
import picture7 from "../../pictures/scrollPictures/picture7.jpg";
import picture8 from "../../pictures/scrollPictures/picture8.jpg";
import picture9 from "../../pictures/scrollPictures/picture9.jpg";
import picture10 from "../../pictures/scrollPictures/picture10.jpg";

const images = [
  { src: picture1, alt: "Photo 1" },
  { src: picture2, alt: "Photo 2" },
  { src: picture3, alt: "Photo 3" },
  { src: picture4, alt: "Photo 4" },
  { src: picture5, alt: "Photo 5" },
  { src: picture6, alt: "Photo 6" },
  { src: picture7, alt: "Photo 7" },
  { src: picture8, alt: "Photo 8" },
  { src: picture9, alt: "Photo 9" },
  { src: picture10, alt: "Photo 10" }
];

const ImageScroller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateDistance, setTranslateDistance] = useState(0);

  const updateTranslateDistance = () => {
    if (containerRef.current) {
      // Calculate one full set's width, based on the container's scrollWidth.
      setTranslateDistance(containerRef.current.scrollWidth / 2);
    }
  };

  useEffect(() => {
    updateTranslateDistance();
    window.addEventListener("resize", updateTranslateDistance);
    return () => {
      window.removeEventListener("resize", updateTranslateDistance);
    };
  }, []);

  // Duplicate the images for seamless scrolling.
  const scrollerItems = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex whitespace-nowrap animate-marquee"
        style={{ "--translate-x": `${translateDistance}px` } as React.CSSProperties}
      >
        {scrollerItems.map((item, index) => (
          <div
            key={index}
            className="relative inline-block flex-shrink-0 h-[50vh] sm:h-[50vh] md:h-[60vh] lg:h-[60vh] aspect-[30/41]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--translate-x)));
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ImageScroller;