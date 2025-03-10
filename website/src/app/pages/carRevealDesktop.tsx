"use client";
import ".././globals.css";
import React, { useState } from "react";
import Image from "next/image";
import GT from "../../pictures/GreenThunder.webp";
import CountdownTimer from "../util/timer";

// Define an array of pin data with absolute positions (using CSS units)
const pins = [
  {
    id: 1,
    top: "20%",
    left: "30%",
    text: "Engine: 500 HP V8 turbocharged for optimal performance.",
  },
  {
    id: 2,
    top: "50%",
    left: "60%",
    text: "Aerodynamics: Sleek design minimizes drag and maximizes speed.",
  },
  {
    id: 3,
    top: "70%",
    left: "40%",
    text: "Suspension: Advanced system for excellent handling and ride comfort.",
  },
];

// Pin component that toggles its tooltip on click.
const Pin = ({ top, left, text }: { top: string; left: string; text: string }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div style={{ top, left }} className="absolute">
      {/* Pin marker */}
      <div
        className="w-4 h-4 bg-red-500 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform"
        onClick={handleClick}
      />
      {/* Tooltip pop-up appears on click */}
      {open && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[var(--background)] text-white border border-[var(--green1)] text-s p-2 rounded shadow-md whitespace-normal max-w-xs">
          {text}
        </div>
      )}
    </div>
  );
};

const CarRevealDesktop = () => {
  return (
    <div
      className="hidden md:block"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background image */}
      <Image
        src={GT}
        alt="Green Thunder"
        layout="fill"
        objectFit="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Render interactive pins */}
      {pins.map((pin) => (
        <Pin key={pin.id} top={pin.top} left={pin.left} text={pin.text} />
      ))}

      {/* Countdown timer at the bottom */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center space-y-2">
        <div
          className="text-white px-4 py-2 rounded-md shadow-md font-semibold transition-all duration-500"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--green1), var(--green3))",
          }}
        >
          Time until race: <CountdownTimer />
        </div>
      </div>
    </div>
  );
};

export default CarRevealDesktop;
