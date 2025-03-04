"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
const offset = 400;
// Example data for your logos:
const logos = [
  { src: "/logo1.png", top: 100+offset, left: "15%", speed: 0.3, width: 100 },
  { src: "/logo2.png", top: 200+offset, left: "70%", speed: 0.25, width: 120 },
  { src: "/logo3.png", top: 400+offset, left: "40%", speed: 0.6, width: 90 },
  { src: "/logo4.png", top: 150+offset, left: "50%", speed: 0.8, width: 80 },
  { src: "/logo5.png", top: 500+offset, left: "10%", speed: 0.4, width: 100 },
  { src: "/logo6.png", top: 600+offset, left: "70%", speed: 0.5, width: 110 },
  { src: "/logo7.png", top: 700+offset, left: "30%", speed: 0.4, width: 130 },
  { src: "/logo8.png", top: 800+offset, left: "50%", speed: 0.7, width: 100 },
  { src: "/logo9.png", top: 250+offset, left: "80%", speed: 0.25, width: 90 },
];

export default function Supporters() {
  const [scrollY, setScrollY] = useState(0);
  // Set the scrollY value at which the effect should start
  const scrollStart = 1400;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    // Run once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only apply the scroll effect if scrollY exceeds the threshold
  const adjustedScroll = Math.max(scrollY - scrollStart, 0);

  return (
    <div className="relative w-full h-[100vh] bg-black text-white overflow-x-hidden overflow-y-hidden">
      {/* Centered text */}
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl font-bold text-center">
        Thanks to all the supporters
      </h1>

      {/* Render each logo with floating effect */}
      {logos.map((logo, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: logo.top,
            left: logo.left,
            transform: `translateY(-${adjustedScroll * logo.speed}px)`,
          }}
        >
          <Image
            src={logo.src}
            alt={`Supporter logo ${index + 1}`}
            width={logo.width}
            height={logo.width / 2} // example ratio
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
    </div>
  );
}
