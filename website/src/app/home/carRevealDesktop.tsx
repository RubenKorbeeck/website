"use client";
import ".././globals.css";
import React, { useState } from "react";
import Image from "next/image";
import greenfalcon from "../../pictures/car/greenfalcon.png"; // Now background
import greenThunder from "../../pictures/car/greenfalcon2.png"; // Now foreground
import CountdownTimer from "../util/timer";

// Constant for the mask radius (in pixels)
const MASK_RADIUS = 200;

// Define an array of pin data with absolute positions.
const pins = [
  {
    id: 1,
    top: "20%",
    left: "70%",
    text: "Engine: 500 HP V8 turbocharged for optimal performance.",
  },
  {
    id: 2,
    top: "60%",
    left: "60%",
    text: "Suspension: Advanced system for excellent handling and ride comfort.",
  },
  {
    id: 3,
    top: "70%",
    left: "40%",
    text: "Battery: cool battery for long-lasting power.",
  },
];

// Interactive Pin component that toggles its tooltip on click.
const Pin = ({ top, left, text }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ top, left }} className="absolute z-30">
      {/* Pin marker */}
      <div
        className="w-4 h-4 bg-[var(--green3)] rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform"
        onClick={() => setOpen((prev) => !prev)}
      />
      {/* Tooltip pop-up */}
      {open && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[var(--background)] text-white border border-[var(--green1)] text-m p-4 rounded shadow-md whitespace-normal w-[250px]">
          {text}
        </div>
      )}
    </div>
  );
};

const CarRevealDesktop = () => {
  // State to track the mask's position.
  const [maskPos, setMaskPos] = useState({ x: -150, y: -150 });
  // State to track whether the mouse is inside the container.
  const [isMouseInside, setIsMouseInside] = useState(false);

  // Update the mask position based on mouse movement over the container.
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMaskPos({ x, y });
  };

  // The container's style uses greenfalcon as the background.
  const containerStyle = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    margin: 0,
    backgroundSize: "100% auto",
  };

  // The top image style applies a mask using an external X‑ray mask image.
  // The mask's size is twice the MASK_RADIUS; subtract MASK_RADIUS to center the hole on the mouse.
  const topImageStyle = {
    maskImage: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/40713/xray-machine.png')`,
    WebkitMaskImage: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/40713/xray-machine.png')`,
    maskSize: `${MASK_RADIUS * 2}px`,
    WebkitMaskSize: `${MASK_RADIUS * 2}px`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: `${maskPos.x - MASK_RADIUS}px ${maskPos.y - MASK_RADIUS}px`,
    WebkitMaskPosition: `${maskPos.x - MASK_RADIUS}px ${maskPos.y - MASK_RADIUS}px`,
  };

  return (
    <div
      className="hidden md:block"
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseLeave={() => setIsMouseInside(false)}
    >
      {/* Foreground image (greenThunder) with X‑ray mask applied */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Image
          src={greenfalcon}
          alt="Green falcon"
          fill
          style={{ objectFit: "contain" }}
        />
        <Image
          src={greenfalcon}
          alt="Green Thunder"
          fill
          style={{ objectFit: "contain",filter: "Brightness(0.01)", ...topImageStyle }}
        />
        <Image
          src={greenThunder}
          alt="Green Thunder"
          fill
          style={{ objectFit: "contain", ...topImageStyle }}
        />
        
      </div>

      {/* Render interactive pins only if the mouse is inside and within the mask circle */}
      {isMouseInside &&
        pins.map((pin) => {
          // Calculate absolute pin position in pixels based on container dimensions (100vw x 100vh)
          const containerWidth = window.innerWidth;
          const containerHeight = window.innerHeight;
          const pinX = (parseFloat(pin.left) / 100) * containerWidth;
          const pinY = (parseFloat(pin.top) / 100) * containerHeight;
          const dx = maskPos.x - pinX;
          const dy = maskPos.y - pinY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          // Render the pin only if its distance from the mask center is less than MASK_RADIUS.
          if (distance < MASK_RADIUS) {
            return (
              <Pin
                key={pin.id}
                top={pin.top}
                left={pin.left}
                text={pin.text}
              />
            );
          }
          return null;
        })}

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
