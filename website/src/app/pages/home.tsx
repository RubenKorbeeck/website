"use client";
import LandPage from './landpage';
import { Navbar } from './navbar';
import CarReveal from "./car_reveal";
import Stories from "./stories";
import ScrollProgressBar from "../util/sideBar";
// Scroll Progress Bar Component

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <Navbar />
        {/* LandPage Section */}
        <div className="relative row-start-2 row-end-3 items-center">
          <LandPage />
        </div>
        {/* CarReveal Section */}
        <div className="row-start-3 row-end-4 overflow-hidden">
          <CarReveal />
        </div>
        <div className="row-start-4 row-end-5">
            <Stories/>
        </div>
        {/* Scroll Progress Bar */}
        <ScrollProgressBar />
      </div>
    </>
  );
}
