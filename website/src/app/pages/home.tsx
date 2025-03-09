"use client";
import LandPage from './landpage';
import { Navbar } from './navbar';
import CarRevealMobile from "./carRevealMobile";
import CarRevealDesktop from "./carRevealDesktop";
import Stories from "./stories";
import ScrollProgressBar from "../util/sideBar";
import Supporters from './sponsors';
import ImageScroller from './bottomPage';
import Footer from '../util/footer';
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
          <CarRevealMobile/>
          <CarRevealDesktop/>
        </div>
        <div className="row-start-4 row-end-5">
            <Stories/>
        </div>
        <div className="row-start-5 row-end-6">
            <Supporters/>
        </div>
        <div className="row-start-6 row-end-7">
          <ImageScroller/>
        </div>
        {/* Scroll Progress Bar */}
        <ScrollProgressBar />
        <Footer />
      </div>
    </>
  );
}
