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

        <div className="relative w-full h-96 pointer-events-none"/>
          {/* First Blur */}
          <div
            className="absolute bottom-0 left-0 w-1/2 h-20 animate-blurMove"
            style={{
              background: `linear-gradient(to right, var(--green1) 90%, var(--green2) 10%)`,
              filter: "blur(40px)",
            }}
          />
          {/* Second Blur */}
          <div
            className="absolute bottom-0 left-1/3 w-1/3 h-20 animate-blurMove2"
            style={{
              background: `linear-gradient(to right, var(--green2), var(--green2))`,
              filter: "blur(40px)",
            }}
          />
          {/* Third Blur */}
          <div
            className="absolute bottom-0 right-0 w-1/2 h-20 animate-blurMove3"
            style={{
              background: `linear-gradient(to right, var(--green2) 10%, var(--green3) 90%)`,
              filter: "blur(40px)",
            }}
          />

          <style jsx>{`
            @keyframes blurMove {
              0% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(20px);
              }
              100% {
                transform: translateY(0px);
              }
            }
            @keyframes blurMove2 {
              0% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(50px);
              }
              100% {
                transform: translateY(0);
              }
            }
            @keyframes blurMove3 {
              0% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(20px);
              }
              100% {
                transform: translateY(0);
              }
            }
            .animate-blurMove {
              animation: blurMove 6s ease-in-out infinite;
            }
            .animate-blurMove2 {
              animation: blurMove2 4s ease-in-out infinite;
            }
            .animate-blurMove3 {
              animation: blurMove3 2s ease-in-out infinite;
            }
          `}</style>
        </div>

    );
  };