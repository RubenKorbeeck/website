"use client";
import { useEffect, useRef, useState } from "react";
import LandPage from "./landpage";
import { Navbar } from "../util/navbar";
import CarRevealMobile from "./carRevealMobile";
import Stories from "./stories";
import ScrollProgressBar from "../util/sideBar";
import Supporters from "./sponsors";
import ImageScroller from "./bottomPage";
import Footer from "../util/footer";
import Scrollbar from "smooth-scrollbar";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function HomePage() {
  const [storiesInView, setStoriesInView] = useState(false);
  const storiesRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStoriesInView(entry.isIntersecting),
      { threshold: 0.80 }
    );
    if (storiesRef.current) observer.observe(storiesRef.current);
    return () => {
      if (storiesRef.current) observer.unobserve(storiesRef.current);
    };
  }, []);

  useEffect(() => {
    // Only init on devices with a “fine” pointer (i.e. desktops with a mouse)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      const scrollContainer = document.querySelector('#scroll-container') as HTMLElement;
      if (scrollContainer) {
        const scrollbar = Scrollbar.init(scrollContainer, { damping: 0.08 });
        return () => {
          scrollbar.destroy();
        };
      }
    }
    // If no scrollbar was initialized, no cleanup necessary
  }, []);

  return (
    <div
      className="relative"
      style={{
        transition: "background-color 1s ease",
        backgroundColor: storiesInView ? "var(--foreground)" : "var(--background)",
      }}
    >
      <Navbar />
      <div id="scroll-container" style={{ height: "100vh", overflow: "hidden" }}>
        {/* LandPage Section */}
        <div className="relative row-start-2 items-center">
          <LandPage />
        </div>
        {/* CarReveal Section */}
        <div className="row-start-3 overflow-hidden">
          <CarRevealMobile />
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
      <ScrollProgressBar />
    </div>
  );
}
