"use client";
import React from "react";
// Optional: Install react-icons (npm install react-icons) if you want social media icons
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
export default function Footer() {
  return (
    <footer className="bg-[var(--background)] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top row: 3 columns */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Contact Us Column */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <ul className="space-y-1 text-sm leading-relaxed">
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
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p className="text-[var(--green1)] font-medium">Top Dutch Solar Racing</p>
            <p>Zernikelaan 7, 9747 AA</p>
            <p>Groningen</p>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Social Media</h3>
            <div className="flex space-x-4">
              {/* Example links: replace # with your social URLs */}
              <a
                href="#"
                aria-label="Facebook"
                className="text-[var(--green1)] hover:text-green-700"
              >
                <FaFacebook size={32} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-[var(--green1)] hover:text-green-700"
              >
                <FaTwitter size={32} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-[var(--green1)] hover:text-green-700"
              >
                <FaInstagram size={32} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[var(--green1)] hover:text-green-700"
              >
                <FaLinkedin size={32} />
              </a>
              <a 
                href="#" 
                aria-label="YouTube" 
                className="text-[var(--green1)] hover:text-green-700"
              >
                <FaYoutube size={32} />
              </a>
              <a 
                href="#" 
                aria-label="TikTok" 
                className="text-[var(--green1)] hover:text-green-700"
              >
                <SiTiktok size={32} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright & links */}
        <div className="mt-8 text-center text-sm text-gray-700">
          <div>
            © 2025 Top Dutch Solar Racing - Software Engineering Department
          </div>
          <div className="space-x-2">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Terms and Conditions (EN)
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Terms and Conditions (NL)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
