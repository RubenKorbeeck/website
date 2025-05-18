"use client";
import { useEffect, useState, useRef } from "react";
import Navbar from "../util/navbar";
import Footer from "../util/footer";
import LandPage from "./landpage";
import Stories from "./stories";
import Supporters from "./sponsors";
import ImageScroller from "./bottomPage";
import Scrollbar from "smooth-scrollbar";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function HomePage() {
  const [storiesInView, setStoriesInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const storiesRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);

  // 1️⃣ Detect desktop vs touch
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 2️⃣ IntersectionObserver for stories
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStoriesInView(entry.isIntersecting),
      { threshold: 0.8 }
    );
    if (storiesRef.current) observer.observe(storiesRef.current);
    return () => {
      if (storiesRef.current) observer.unobserve(storiesRef.current);
    };
  }, []);

  // 3️⃣ Init / destroy Smooth Scrollbar only on desktop
  useEffect(() => {
    const container = document.querySelector('#scroll-container') as HTMLElement;
    if (container) {
      scrollbarRef.current = Scrollbar.init(container, { damping: 0.08 });
      return () => {
        scrollbarRef.current?.destroy();
        scrollbarRef.current = null;
      };
    }
  }, [isDesktop]);




  return (
    <div
      className="relative"
      style={{
        transition: "background-color 1s ease",
        backgroundColor: storiesInView ? "var(--background)" : "var(--background)",
      }}
    >
      <Navbar />

      {/* 
        4️⃣ Only hide overflow on desktop (to let the custom scrollbar work).
           On touch devices, use auto so native swiping works.
      */}
      <div
        id="scroll-container"
        style={{
          height: "100vh",
          overflowY: isDesktop ? "hidden" : "auto", // Allow native scroll on mobile
          touchAction: isDesktop ? "none" : "auto", // Disable touch actions on desktop to allow native scrolling on mobile
          scrollBehavior: 'smooth',  // Add this to enable smooth scrolling on mobile (native)
        }}
      >
        {/* LandPage Section */}
        <div className="relative row-start-2 items-center">
          <LandPage />
        </div>

        {/* CarReveal Section */}
        <div className="row-start-3 overflow-hidden">
          <ThreeScene />
        </div>

        {/* Stories Section */}
        <div ref={storiesRef} className="row-start-4">
          <Stories />
        </div>

        {/* Supporters Section */}
        <div className="row-start-5">
          <Supporters />
        </div>

        {/* ImageScroller Section */}
        <div className="row-start-6">
          <ImageScroller />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
