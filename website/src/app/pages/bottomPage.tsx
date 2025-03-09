"use client";
import React from "react";
import Image from "next/image";

// Replace these with your actual image paths and alt text.
const images = [
  { src: "/pictures/scrollPictures/picture1.jpg", alt: "Photo 1" },
  { src: "/pictures/scrollPictures/picture2.jpg", alt: "Photo 2" },
  { src: "/pictures/scrollPictures/picture3.jpg", alt: "Photo 3" },
  { src: "/pictures/scrollPictures/picture4.jpg", alt: "Photo 4" },
];

const ImageScroller: React.FC = () => {
  // Duplicate the images array so the scroll looks seamless.
  const scrollerItems = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 py-8">
      <div className="flex whitespace-nowrap animate-marquee">
        {scrollerItems.map((item, index) => (
          <div key={index} className="inline-block mx-4">
            <Image
              src={item.src}
              alt={item.alt}
              width={200}
              height={420}
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* CSS Keyframes for the marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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
