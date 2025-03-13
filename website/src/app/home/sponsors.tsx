"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Scrollbar from "smooth-scrollbar";

const offset = 1000;
// Import logos
import rug from "../../pictures/partners/rug.svg";
import hanze from "../../pictures/partners/hanze.svg";
import provGron from "../../pictures/partners/provincie-groningen.svg";
import alfa from "../../pictures/partners/alfa.svg";
import firda from "../../pictures/partners/firda.svg";
import vanGroningen from "../../pictures/partners/vangroningen.svg";
import noord from "../../pictures/partners/noord.svg";
import oldernburg from "../../pictures/partners/oldernburg.svg";
import seatrade from "../../pictures/partners/seatrade.png";
import fokker from "../../pictures/partners/fokker.svg";
import greatwaves from "../../pictures/partners/greatwaves.svg";
import bionic from "../../pictures/partners/bionic.svg";
import RDW from "../../pictures/partners/RDW.svg";
import sony from "../../pictures/partners/sony.svg";
import assen from "../../pictures/partners/assen.svg";
import cablemasters from "../../pictures/partners/cablemasters.svg";
import koopman from "../../pictures/partners/koopman.svg";
import pouw from "../../pictures/partners/pouw.svg";
import rabobank from "../../pictures/partners/rabobank.svg";

const logos = [
  // "green" group
  { src: hanze,        top: "10%",  left: "65vw", speed: 1.8, width: 150 },
  { src: provGron,     top: "54%", left: "27vw", speed: 1.3, width: 150 },
  { src: vanGroningen, top: "60%", left: "55vw", speed: 1.0, width: 150 },
  { src: rug,          top: "35%", left: "25vw", speed: 1.2, width: 150 },
  // "knowledge" group
  { src: alfa,         top: "6%",  left: "15vw", speed: 1.7, width: 120 },
  { src: firda,        top: "84%", left: "42vw", speed: 0.5, width: 120 },
  { src: noord,        top: "20%", left: "86vw", speed: 1.4, width: 120 },
  // "plat" group
  { src: oldernburg,   top: "12%", left: "45vw", speed: 0.5, width: 110 },
  { src: seatrade,     top: "48%", left: "75vw", speed: 2.0, width: 110 },
  { src: fokker,       top: "50%", left: "13vw", speed: 1.0, width: 110 },
  { src: greatwaves,   top: "0%",  left: "70vw", speed: 1.6, width: 110 },
  // "gold" group
  { src: bionic,       top: "80%", left: "85vw", speed: 0.5, width: 100 },
  { src: RDW,          top: "50%", left: "2vw",  speed: 1.9, width: 100 },
  { src: sony,         top: "4%",  left: "90vw", speed: 1.1, width: 100 },
  { src: assen,        top: "0%",  left: "35vw", speed: 1.8, width: 100 },
  { src: cablemasters, top: "80%", left: "20vw", speed: 0.7, width: 100 },
  { src: koopman,      top: "77%", left: "5vw",  speed: 1.2, width: 100 },
  { src: pouw,         top: "2%",  left: "4vw",  speed: 1.0, width: 100 },
  { src: rabobank,     top: "78%", left: "70vw", speed: 1.3, width: 100 },
];
// Import logos
// ... (your logos array as defined earlier)

export default function Supporters() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollStart = 1050;

  useEffect(() => {
    let scrollbarInstance = null;
    // Poll for the scrollbar instance every 100ms
    const interval = setInterval(() => {
      const scrollContainer = document.querySelector("#scroll-container");
      if (scrollContainer) {
        scrollbarInstance = Scrollbar.get(scrollContainer);
        if (scrollbarInstance) {
          const handleScrollbarScroll = ({ offset }) => {
            setScrollY(offset.y);
          };
          scrollbarInstance.addListener(handleScrollbarScroll);
          clearInterval(interval);
          // Cleanup: remove listener when the component unmounts
          return () => {
            scrollbarInstance.removeListener(handleScrollbarScroll);
          };
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const adjustedScroll = Math.max(scrollY - scrollStart, 0);

  return (
    <div className="relative w-full h-[100vh] text-white overflow-hidden">
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl font-bold text-center">
        Thanks to all the supporters
      </h1>
      {logos.map((logo, index) => {
        const adjustedWidth = isMobile ? logo.width / 2 : logo.width;
        return (
          <div
            key={index}
            className="absolute"
            style={{
              top: `calc(${logo.top} + ${offset * logo.speed}px)`,
              left: logo.left,
              transform: `translateY(-${adjustedScroll * logo.speed}px)`,
            }}
          >
            <Image
              src={logo.src}
              alt={`Supporter logo ${index + 1}`}
              width={adjustedWidth}
              height={adjustedWidth}
              style={{
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}