"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Scrollbar from "smooth-scrollbar";
import NavbarMenu from "./menu";
import TDSR_logo from "../../pictures/tdsr-full-logo.svg";
import Link from "next/link";
interface NavbarProps {
  /**
   * If true, the logo will be shown immediately on mount,
   * regardless of scroll position or menu state.
   */
  showLogoImmediately?: boolean;
}
/**
 * A red, oval-shaped button that displays "LIVE"
 * along with a small arrow.
 */

const HamburgerButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="flex w-16 justify-end">
    <button
      className="block focus:outline-none z-50"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="space-y-2">
        <span className="block w-8 h-1 bg-white rounded-2xl"></span>
        <span className="block w-8 h-1 bg-white rounded-2xl"></span>
        <span className="block w-8 h-1 bg-white rounded-2xl"></span>
      </div>
    </button>
  </div>
);
export default function Navbar({
  showLogoImmediately = false,
}: NavbarProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position via Smooth Scrollbar
  useEffect(() => {
    let scrollbarInstance: Scrollbar | null = null;
    const interval = setInterval(() => {
      const scrollContainer = document.querySelector("#scroll-container");
      if (!scrollContainer) return;

      scrollbarInstance =
        Scrollbar.get(scrollContainer as HTMLElement) ?? null;
      if (scrollbarInstance) {
        const handleScrollbarScroll = ({
          offset,
        }: {
          offset: { x: number; y: number };
        }) => {
          setScrollY(offset.y);
        };
        scrollbarInstance.addListener(handleScrollbarScroll);
        clearInterval(interval);

        return () => {
          scrollbarInstance?.removeListener(handleScrollbarScroll);
        };
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Update 'scrolled' whenever scrollY crosses the 100px threshold
  useEffect(() => {
    setScrolled(scrollY > 100);
  }, [scrollY]);

  // Determine whether the logo should be visible
  const shouldShowLogo = showLogoImmediately || scrolled || isOpen;

  return (
    <header className={`fixed top-0 w-full z-50 h-16 text-white `} >
      <div className="flex items-center bg-transparent justify-between p-4">
        {/* empty div because otherwise it's not centered and i'm too lazy to fix it*/}
        <div className="z-50 w-16">
        </div>

        {/* Center Section: Logo */}
        <div className="z-50 flex items-center justify-center w-full">
          <div
            className={`w-32 transition-all duration-500 ${
              shouldShowLogo ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link href="/">
            <Image
              src={TDSR_logo}
              alt="TDSR logo"
              className="w-full"
              priority
            />
            </Link>
          </div>
        </div>

        {/* Right Section: Hamburger Menu */}
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`
          fixed 
          bg-[var(--background)]
          inset-0  md:top-0 md:right-0
          w-full md:w-screen h-screen
          transform transition-transform duration-[1s] ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <NavbarMenu onClick={() => setIsOpen(false)} />
      </div>
    </header>
  );
}