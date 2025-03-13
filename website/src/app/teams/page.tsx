"use client";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "../util/navbar";
import Footer from "../util/footer";
import Teams from "./teams";

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
        <Teams />
      {/* Scroll Progress Bar */}
      <Footer />
    </div>
    </div>
  );
}
