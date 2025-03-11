"use client";
import { useEffect, useRef, useState } from "react";
import LandPage from "./landpage";
import { Navbar } from "./navbar";
import CarRevealMobile from "./carRevealMobile";
import CarRevealDesktop from "./carRevealDesktop";
import Stories from "./stories";
import ScrollProgressBar from "../util/sideBar";
import Supporters from "./sponsors";
import ImageScroller from "./bottomPage";
import Footer from "../util/footer";

export default function HomePage() {
  // State to track if the <Stories> section is in view.
  const [storiesInView, setStoriesInView] = useState(false);
  // Ref attached to the <Stories> section.
  const storiesRef = useRef(null);

  useEffect(() => {
    // Create an Intersection Observer to monitor the <Stories> section.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStoriesInView(entry.isIntersecting);
      },
      { threshold: 0.80 } // Trigger when 75% of <Stories> is visible
    );

    if (storiesRef.current) {
      observer.observe(storiesRef.current);
    }

    // Cleanup the observer on component unmount.
    return () => {
      if (storiesRef.current) {
        observer.unobserve(storiesRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      style={{
        transition: "background-color 1s ease",
        backgroundColor: storiesInView
          ? "var(--foreground)"
          : "var(--background)",
      }}
    >
      <Navbar />
      {/* LandPage Section */}
      <div className="relative row-start-2 items-center">
        <LandPage />
      </div>
      {/* CarReveal Section */}
      <div className="row-start-3 overflow-hidden">
        <CarRevealMobile />
        <CarRevealDesktop />
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
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
      <Footer />
    </div>
  );
}
