"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TDSR_logo from "../../pictures/tdsr-full-logo.svg";
import Scrollbar from "smooth-scrollbar";

interface CarRevealButtonProps {
  onClick?: () => void;
}

/**
 * A red, oval-shaped button that displays "CAR REVEAL LIVE"
 * with a small arrow pointing to the top-right.
 */
export function CarRevealButton({ onClick }: CarRevealButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background:
          'linear-gradient(to top right, var(--red), var(--red), var(--orange))',
        color: "white",
        border: "none",
        borderRadius: "9999px",
        padding: "0.5rem 1rem",
        display: "inline-flex",
        alignItems: "center",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      LIVE
      <span style={{ marginLeft: "8px", display: "inline-flex" }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: "rotate(0deg)",
          }}
        >
          <path
            d="M4 12L12 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 4H12V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let scrollbarInstance: Scrollbar | null = null;
    // Poll for the scrollbar instance every 100ms
    const interval = setInterval(() => {
      const scrollContainer = document.querySelector("#scroll-container");
      if (scrollContainer) {
        scrollbarInstance = Scrollbar.get(scrollContainer as HTMLElement) || null;
        if (scrollbarInstance) {
          const handleScrollbarScroll = ({ offset }: { offset: { y: number } }) => {
            setScrollY(offset.y);
          };
          scrollbarInstance.addListener(handleScrollbarScroll);
          clearInterval(interval);
          // Cleanup: remove listener when the component unmounts
          return () => {
            if (scrollbarInstance) {
              scrollbarInstance.removeListener(handleScrollbarScroll);
            }
          };
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Update scrolled state based on scrollY
  useEffect(() => {
    if (scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [scrollY]);

  return (
    <header className="fixed top-0 z-50 w-full text-white">
      <div className="flex items-center bg-transparent justify-between p-4">
        {/* Left Section: CarRevealButton */}
        <div className="z-50 w-16">
          <CarRevealButton />
        </div>

        {/* Center Section: Small Logo, visible when scrolled or when the menu is open */}
        <div className="z-50 flex">
          <div
            className={`w-32 transition-all duration-500 linear ${
              scrolled || isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={TDSR_logo}
              alt="TDSR logo"
              className="w-full"
              priority
            />
          </div>
        </div>

        {/* Right Section: Hamburger Menu */}
        <div className="flex w-16 justify-end">
          <button
            className="block focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-2">
              <span className="block w-8 h-1 bg-white"></span>
              <span className="block w-8 h-1 bg-white"></span>
              <span className="block w-8 h-1 bg-white"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay (if you want no background here as well, remove the bg class) */}
      <div
        className={`fixed md:absolute bg-[var(--background)] inset-0 md:inset-auto md:top-0 md:right-0 w-full md:w-80 h-screen z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center md:items-start pt-20 p-4 space-y-4">
          <Link
            href="/"
            className="w-full text-center md:text-left hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/teams"
            className="w-full text-center md:text-left hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Teams
          </Link>
        </div>
      </div>
    </header>
  );
}
