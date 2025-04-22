"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  onMouseEnter?: () => void;
}

const NavLink = ({
  href,
  children,
  onClick,
  onMouseEnter,
}: NavLinkProps) => (
  <Link
    href={href}
    className="w-1/3 text-center hover:text-light2"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
  >
    {children}
  </Link>
);

interface NavbarMenuProps {
  onClick: () => void;
}

const NavbarMenu = ({ onClick }: NavbarMenuProps) => {
  // State to store the currently active background image URL.
  const [activeBg, setActiveBg] = useState("");

  return (
    <div className="fixed md:absolute md:inset-auto md:top-0 md:right-0 w-screen h-screen pt-36 bg-black relative overflow-hidden">
      {/* Background overlay that slides in from the left */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all ease-in-out"
        style={{
          backgroundImage: activeBg
            ? `url(${activeBg})`
            : "url('/pictures/transparent.png')",
          transform: activeBg ? "translateX(0)" : "translateX(-100%)",
          opacity: activeBg ? 0.6 : 0,
          // Updated transition duration and easing for smoother, slower transitions.
          transition: "transform 1.5s ease-in-out, opacity 1.5s ease-in-out",
          willChange: "transform, opacity",
        }}
      ></div>

      {/* Container for navigation links with spacing preserved */}
      <div
        className="font-bold font-montserrat relative z-10 flex flex-col text-3xl items-center text-center p-4 space-y-6"
        // Reset the active background only when the entire container is left.
        onMouseLeave={() => setActiveBg("")}
      >
        <NavLink
          href="/"
          onClick={onClick}
          onMouseEnter={() => setActiveBg("/pictures/home.png")}
        >
          HOME
        </NavLink>
        <NavLink
          href="/about"
          onClick={onClick}
          onMouseEnter={() => setActiveBg("/pictures/about.png")}
        >
          ABOUT US
        </NavLink>
        <NavLink
          href="/cars"
          onClick={onClick}
          onMouseEnter={() => setActiveBg("/pictures/cars.png")}
        >
          CARS
        </NavLink>
        <NavLink
          href="/challenges"
          onClick={onClick}
          onMouseEnter={() => setActiveBg("/pictures/challenges.png")}
        >
          CHALLENGES
        </NavLink>
        <NavLink
          href="/teams"
          onClick={onClick}
          onMouseEnter={() => setActiveBg("/pictures/team.png")}
        >
          TEAM
        </NavLink>
        <NavLink
          href="/partners"
          onClick={onClick}
          onMouseEnter={() => setActiveBg("/pictures/partners.png")}
        >
          PARTNERS
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarMenu;
