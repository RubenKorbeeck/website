"use client";
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6"; // New Twitter icon

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top row: 3 columns */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-4 md:gap-8">
          {/* Contact Us Column */}
          <div>
            <h3 className="text-m md:text-lg font-semibold mb-2">Contact Us</h3>
            <ul className="space-y-0 md:space-y-1 text-sm leading-relaxed">
              <li>
                <span className="text-[var(--green1)] font-medium">Bestuur:</span>{" "}
                <a
                  href="mailto:bestuur@solarracinggroningen.nl"
                  className="hover:underline"
                >
                  bestuur@solarracinggroningen.nl
                </a>
              </li>
              <li>
                <span className="text-[var(--green1)] font-medium">Communication:</span>{" "}
                <a
                  href="mailto:pers@solarracinggroningen.nl"
                  className="hover:underline"
                >
                  pers@solarracinggroningen.nl
                </a>
              </li>
              <li>
                <span className="text-[var(--green1)] font-medium">Acquisition:</span>{" "}
                <a
                  href="mailto:acquisition@solarracinggroningen.nl"
                  className="hover:underline"
                >
                  acquisition@solarracinggroningen.nl
                </a>
              </li>
            </ul>
          </div>

          {/* Address Column */}
          <div>
            <h3 className="text-m md:text-lg font-semibold mb-2">Address</h3>
            <p className="text-sm md:text-m text-[var(--green1)] font-medium">Top Dutch Solar Racing</p>
            <p className="text-sm md:text-m">Zernikelaan 17, 9747 AA</p>
            <p className="text-sm md:text-m">Groningen</p>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="text-m md:text-lg font-semibold mb-2">Social Media</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.facebook.com/topdutchsolarracing"
                aria-label="Facebook"
                className="text-[var(--green1)] hover:text-green-700"
              >
                <FaFacebook className="w-6 h-6 md:w-8 md:h-8" />
              </a>
              <a
                href="https://twitter.com/tdsolarracing"
                aria-label="Twitter / X"
                className="text-[var(--green1)] hover:text-green-700"
              >
                <FaXTwitter className="w-6 h-6 md:w-8 md:h-8" />
              </a>
              <a
                href="https://www.instagram.com/topdutchsolarracing/?hl=en"
                aria-label="Instagram"
                className="text-[var(--green1)] hover:text-green-700"
              >
                <FaInstagram className="w-6 h-6 md:w-8 md:h-8" />
              </a>
              <a
                href="https://www.linkedin.com/company/solarracing/?originalSubdomain=nl"
                aria-label="LinkedIn"
                className="text-[var(--green1)] hover:text-green-700"
              >
                <FaLinkedin className="w-6 h-6 md:w-8 md:h-8" />
              </a>
              <a
                href="https://www.youtube.com/@topdutchsolarracing"
                aria-label="YouTube"
                className="text-[var(--green1)] hover:text-green-700"
              >
                <FaYoutube className="w-6 h-6 md:w-8 md:h-8" />
              </a>
              <a
                href="https://www.tiktok.com/@topdutchsolarracing"
                aria-label="TikTok"
                className="text-[var(--green1)] hover:text-green-700"
              >
                <SiTiktok className="w-6 h-6 md:w-8 md:h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright & links */}
        <div className="md:mt-32 sm:mt-12 text-center text-xs md:text-sm text-gray-700">
          {/* Suzanne design the whole website. Keep this in if you change small details. 
              If you change big parts change it to "Partly designed by". 
              ofc when a completely new website is made, you can delete it.
          */}
          <div className="mt-2">
            Website designed by:{" "}
            <a href="#" className="hover:underline text-gray-400">
              Suzanne Korbeeck
            </a>
          </div>
          <div>
            © 2025 Top Dutch Solar Racing - Software Engineering Department
          </div>
            <div className="space-x-2">
            <a href="/termsofservice/privacypolicy" className="hover:underline">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="/termsofservice/termsandconditions" className="hover:underline">
              Terms and Conditions (EN)
            </a>
            <span>|</span>
            <a href="/termsofservice/termsandconditionsnl" className="hover:underline">
              Terms and Conditions (NL)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
