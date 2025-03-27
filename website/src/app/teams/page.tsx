"use client";
import { useEffect } from "react";
import { Navbar } from "../util/navbar";
import Footer from "../util/footer";
import Teams from "./teams";
import Scrollbar from "smooth-scrollbar";

export default function HomePage() {
  // State to track if the <Stories> section is in view.

  useEffect(() => {
      const scrollContainer = document.querySelector('#scroll-container') as HTMLElement;
      if (scrollContainer) {
        const scrollbar = Scrollbar.init(scrollContainer, {
          damping: 0.08, // Lower values yield a longer glide effect
        });
        // Cleanup the scrollbar on unmount
        return () => {
          scrollbar.destroy();
        };
      }
    }, []);

  return (
    <div className="relative bg-[var(--background)]">
      <Navbar />
      <div id="scroll-container" style={{ height: "100vh"}}>
        {/* LandPage Section */}
        <div className="row-start-2 items-center">
          <Teams />
        {/* Scroll Progress Bar */}
        <Footer />
        </div>
      </div>
    </div>
  );
}
