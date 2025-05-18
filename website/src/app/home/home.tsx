"use client";
import { useEffect, useState, useRef } from "react";
import Navbar from "../util/navbar";
import Footer from "../util/footer";
import LandPage from "./landpage";
import Stories from "./stories";
import Supporters from "./sponsors";
import ImageScroller from "./bottomPage";
import dynamic from "next/dynamic";
import ScrollContainer from "../util/ScrollContainer";

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function HomePage() {
  const [storiesInView, setStoriesInView] = useState(false);
  const storiesRef = useRef<HTMLDivElement | null>(null);

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
      <ScrollContainer>
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
      </ScrollContainer>
    </div>
  );
}
