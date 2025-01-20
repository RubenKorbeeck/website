"use client";
import ".././globals.css";
import { useState } from "react";
import Link from "next/link";
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
        background: 'linear-gradient(to top right, var(--red), var(--red), var(--orange))',
        color: 'white',
        border: 'none',
        borderRadius: '9999px',    // Large radius for an oval/pill shape
        padding: '0.5rem 1rem',
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      LIVE
      {/* SVG arrow pointing top-right */}
      <span style={{ marginLeft: '8px', display: 'inline-flex' }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: 'rotate(0deg)',
            // If you want to emphasize a top-right direction,
            // you can adjust rotation or path for a steeper angle
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

  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="absolute top-5 left-10">
        <CarRevealButton/>
      </div>
      
      <nav className="absolute top-5 right-10 --background text-white">
        <div className="flex items-center justify-end p-4">
          {/* Hamburger Menu */}
          <button
            className="block focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-2">
              <span className="block w-8 h-1 bg-white"></span>
              <span className="block w-8 h-1 bg-white"></span>
              <span className="block w-8 h-1 bg-white"></span>
            </div>
          </button>
        </div>

        {/* Folded Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 w-64 --background">
            <div className="flex flex-col items-start p-4 space-y-4">
              <Link href="/" className="w-full text-left hover:text-gray-300" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="w-full text-left hover:text-gray-300" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="/services" className="w-full text-left hover:text-gray-300" onClick={() => setIsOpen(false)}>
                Services
              </Link>
              <Link href="/contact" className="w-full text-left hover:text-gray-300" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

