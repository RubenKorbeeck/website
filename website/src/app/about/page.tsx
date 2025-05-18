"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Navbar from "../util/navbar";
import Footer from "../util/footer";
import Carrousel from "../home/bottomPage";
import Development from "../../pictures/aboutus/Development.webp";
import Sustainability from "../../pictures/aboutus/Sustainability.webp";
import Unity from "../../pictures/aboutus/Unity.webp";
import ScrollContainer from "../util/ScrollContainer";

// Load Montserrat font and assign to CSS variable for Tailwind
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

// Home page component for Top Dutch Solar Racing
const Home: React.FC = () => {
   
  
  return (
    <div className={`${montserrat.variable} relative bg-[var(--background)] min-h-screen`}>
      <Navbar showLogoImmediately />
      <ScrollContainer>
        <main className="container mx-auto px-4 py-16 font-montserrat">
          {/* About Us Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">About us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="order-2 md:order-1">
                <p className="text-white leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div className="order-1 md:order-2 bg-gray-700 aspect-[16/9] flex items-center justify-center text-gray-300">
                PHOTO
              </div>
              <div className="order-3 bg-gray-700 aspect-[16/9] flex items-center justify-center text-gray-300">
                PHOTO
              </div>
              <div className="order-4 md:order-4">
                <p className="text-white leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-green-600 border-8 mb-16 border-solid rounded-full" />

          {/* Feature Icons Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[var(--primary)] rounded-full p-4 inline-block mb-6">
                  <Image src={Development} alt="Development" className="w-36 h-36" />
                </div>
                <h3 className="text-2xl font-bold text-white font-montserrat mb-2">DEVELOPMENT</h3>
                <p className="text-white leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[var(--primary)] rounded-full p-4 inline-block mb-6">
                  <Image src={Sustainability} alt="Sustainability" className="w-36 h-36" />
                </div>
                <h3 className="text-2xl font-bold text-white font-montserrat mb-2">SUSTAINABILITY</h3>
                <p className="text-white leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[var(--primary)] rounded-full p-4 inline-block mb-6">
                  <Image src={Unity} alt="Unity" className="w-36 h-36" />
                </div>
                <h3 className="text-2xl font-bold text-white font-montserrat mb-2">UNITY</h3>
                <p className="text-white leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-8 border-green-600 border-solid mb-16 rounded-full" />
        </main>
        <Carrousel />
        <Footer />
      </ScrollContainer>
    </div>
  );
};

export default Home;
