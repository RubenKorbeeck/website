"use client";
import Navbar  from "../util/navbar";
import Footer from "../util/footer";
import Teams from "./teams";
import ScrollContainer from "../util/ScrollContainer";

export default function HomePage() {


  return (
    <div className="relative bg-[var(--background)]">
      <Navbar />
      <ScrollContainer>
        {/* LandPage Section */}
        <div className="row-start-2 items-center">
          <Teams />
        {/* Scroll Progress Bar */}
        <Footer />
        </div>
      </ScrollContainer>
    </div>
  );
}
