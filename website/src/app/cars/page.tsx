"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../util/navbar";
import ThreeCarScene from "./threeCarScene";
import Scrollbar from "smooth-scrollbar";
import Footer from "../util/footer";

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollbarRef = useRef<Scrollbar | null>(null);
  // 1️⃣ Detect desktop vs touch
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 3️⃣ Init / destroy Smooth Scrollbar only on desktop
  useEffect(() => {
    const container = document.querySelector('#scroll-container') as HTMLElement;
    if (isDesktop && container) {
      scrollbarRef.current = Scrollbar.init(container, { damping: 0.08 });
      return () => {
        scrollbarRef.current?.destroy();
        scrollbarRef.current = null;
      };
    }
  }, [isDesktop]);

  return (
    <div id="scroll-container" 
        className="overflow-y-auto" // Ensure scroll is enabled
        style={{ height: "100vh" }}>
      <Navbar showLogoImmediately/>
      <ThreeCarScene/>
      <Footer/>
    </div>
  );
}