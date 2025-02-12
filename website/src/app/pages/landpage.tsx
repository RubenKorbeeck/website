"use client";
import Image from "next/image";
import TDSR_logo from "../../pictures/tdsr-full-logo.svg";
export default function LandPage() {
    return (
      <div className="relative min-h-screen flex flex-col">
        {/* Main Content */}
        <main className="flex flex-col gap-8 items-center justify-items-center mt-16 sm:mt-32">
          <Image
            className="dark"
            src={TDSR_logo}
            alt="TDSR logo"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </main>
        </div>

    );
  };