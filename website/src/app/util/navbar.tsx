"use client";
import ".././globals.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TDSR_logo from "../../pictures/tdsr-full-logo.svg";

interface CarRevealButtonProps {
  onClick?: () => void;
}

// Function for the button's style
const getCarRevealButtonStyle = () => ({
  background: 'linear-gradient(to top right, var(--red), var(--red), var(--orange))',
  color: 'white',
  border: 'none',
  borderRadius: '9999px', // Oval/pill shape
  padding: '0.5rem 1rem',
  display: 'inline-flex',
  alignItems: 'center',
  fontWeight: 'bold',
  cursor: 'pointer',
});

// CarRevealButton Component
export function CarRevealButton({ onClick }: CarRevealButtonProps) {
  return (
    <button onClick={onClick} style={getCarRevealButtonStyle()}>
      LIVE
      <span style={{ marginLeft: '8px', display: 'inline-flex' }}>
        <LiveButton />
      </span>
    </button>
  );
}

// ArrowIcon Component
const LiveButton = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'rotate(0deg)' }}
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
);

// Navbar Menu Items Component
const NavbarMenu = ({ onClick }: { onClick: () => void }) => (
  <div className="fixed md:absolute inset-0 md:inset-auto md:top-0 md:right-0 w-full md:w-80 h-screen bg-[var(--background)] z-40">
    <div className="flex flex-col items-center md:items-start pt-20 p-4 space-y-4">
      <NavLink href="/" onClick={onClick}>Home</NavLink>
      <NavLink href="/about" onClick={onClick}>About Us</NavLink>
      <NavLink href="/teams" onClick={onClick}>Team</NavLink>
      <NavLink href="/green-falcon" onClick={onClick}>Cars</NavLink>
      <NavLink href="/partners" onClick={onClick}>Partners</NavLink>
    </div>
  </div>
);

// Navbar Link Component
const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick: () => void }) => (
  <Link
    href={href}
    className="w-full text-center md:text-left hover:text-gray-300"
    onClick={onClick}
  >
    {children}
  </Link>
);

// Hamburger Button Component
const HamburgerButton = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => (
  <div className="flex w-16 justify-end">
    <button className="block focus:outline-none z-50" onClick={() => setIsOpen(!isOpen)}>
      <div className="space-y-2">
        <span className="block w-8 h-1 bg-white rounded-2xl"></span>
        <span className="block w-8 h-1 bg-white rounded-2xl"></span>
        <span className="block w-8 h-1 bg-white rounded-2xl"></span>
      </div>
    </button>
  </div>
);

// Navbar Component
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white">
      <div className="flex items-center justify-between p-4">
        {/* Left Section: CarRevealButton */}
        <div className="z-50 w-16">
          <CarRevealButton />
        </div>

        {/* Center Section: Small Logo */}
        <div className="z-50 flex">
          <div className="w-32 transition-all duration-500 linear opacity-100">
            <Image src={TDSR_logo} alt="TDSR logo" className="w-full" priority />
          </div>
        </div>

        {/* Hamburger Button */}
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Navbar Menu */}
      <div
        className={`fixed md:absolute bg-[var(--background)] inset-0 md:inset-auto md:top-0 md:right-0 w-full md:w-80 h-screen z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isOpen && <NavbarMenu onClick={() => setIsOpen(false)} />}
      </div>
    </header>
  );
}
