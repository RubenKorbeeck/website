"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    className="
      w-1/3 text-center
      text-white hover:text-light2
      transition-colors duration-200
    "
  >
    {children}
  </Link>
);

interface NavbarMenuProps {
  onClick: () => void;
}

const slideOut = {
  hidden: { x: 0, opacity: 1 },
  exit:   { x: "-100%", opacity: 0 },
};

const NavbarMenu = ({ onClick }: NavbarMenuProps) => {
  const [activeBg, setActiveBg] = useState("");

  return (
    <motion.div
      // No “initial” or “animate” needed — we only care about exit
      variants={slideOut}
      initial="hidden"
      exit="exit"
      transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
      onMouseLeave={() => setActiveBg("")}
      className="fixed inset-0 w-screen h-screen pt-36 relative overflow-hidden"
    >
      {/* Background overlay that slides in on hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all ease-in-out"
        style={{
          backgroundImage: activeBg
            ? `url(${activeBg})`
            : "url('/pictures/transparent.png')",
          transform: activeBg ? "translateX(0)" : "translateX(-100%)",
          opacity: activeBg ? 0.5 : 0,
          transition: "transform 1s ease-in-out, opacity 1s ease-in-out",
          willChange: "transform, opacity",
        }}
      />

      {/* Nav links */}
      <div className="relative z-10 flex flex-col items-center space-y-6 p-4 text-3xl font-bold font-montserrat text-center">
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
          href="/blogs"
          onClick={onClick}
          onMouseEnter={() => setActiveBg("/pictures/blogs.png")}
        >
          BLOGS
        </NavLink>
        <NavLink
          href="/partners"
          onClick={onClick}
          onMouseEnter={() => setActiveBg("/pictures/partners.png")}
        >
          PARTNERS
        </NavLink>
        <NavLink
          href="/contact"
          onClick={onClick}
          onMouseEnter={() => setActiveBg("/pictures/contact.png")}
        >
          CONTACT
        </NavLink>
        <NavLink
          href="/faq"
          onClick={onClick}
          onMouseEnter={() => setActiveBg("/pictures/faq.png")}
        >
          FAQ
        </NavLink>
      </div>
    </motion.div>
  );
};

export default NavbarMenu;