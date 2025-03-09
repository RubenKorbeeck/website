"use client";
import ".././globals.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TDSR_logo from "../../pictures/tdsr-full-logo.svg";

interface CarRevealButtonProps {
  onClick?: () => void;
}

/**
 * A red, oval-shaped button that displays "CAR REVEAL LIVE"
 * with a small arrow pointing to the top-right.
 */
export default function CarRevealButton({ onClick }: CarRevealButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background:
          'linear-gradient(to top right, var(--red), var(--red), var(--orange))',
        color: 'white',
        border: 'none',
        borderRadius: '9999px', // Oval/pill shape
        padding: '0.5rem 1rem',
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      LIVE
      <span style={{ marginLeft: '8px', display: 'inline-flex' }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: 'rotate(0deg)',
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
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // When scroll exceeds 100px, show the small logo in the navbar
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full  text-white">
      <div className="flex items-center justify-between p-4">
        {/* Left Section: CarRevealButton */}
        <div className="z-50 w-16">	
          <CarRevealButton />
        </div>

        {/* Center Section: Small Logo, visible when scrolled */}
        <div className="z-50 flex">
          <div
            className={`w-32 transition-all duration-500 linear ${
              scrolled || isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src={TDSR_logo} alt="TDSR logo" className="w-full" priority />
          </div>
        </div>
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

      {isOpen && (
        
        <div className="fixed md:absolute inset-0 md:inset-auto md:top-0 md:right-0 w-full md:w-80 h-screen bg-[var(--background)] z-40">
          <div className="flex flex-col items-center md:items-start pt-20 p-4 space-y-4">
            <Link
              href="/"
              className="w-full text-center md:text-left hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="w-full text-center md:text-left hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="w-full text-center md:text-left hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="w-full text-center md:text-left hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
