"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import TDSR_logo from "../../pictures/tdsr-full-logo.svg";
import { Navbar } from "./navbar"; // Adjust the path as needed

export default function LandPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // When the scroll exceeds 100px, shrink the main image
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex flex-col gap-8 items-center mt-20 sm:mt-32">
        <div
          className={`transition-all duration-300 ${
            scrolled ? "w-32" : "w-3/4"
          }`}
        >
          <Image
            src={TDSR_logo}
            alt="TDSR logo"
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        {/* Extra content to enable scrolling */}

      </main>
    </div>
  );
}
