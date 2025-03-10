"use client";
import ".././globals.css";
import React from 'react';
import Image from 'next/image';
import GT from '../../pictures/GreenThunder.webp';
import CountdownTimer from '../util/timer';

const CarRevealDesktop = () => {
  return (
    <div className="hidden md:block"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Image
        src={GT}
        alt="Green Thunder"
        layout="fill"
        objectFit="cover"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center space-y-2">
      <div
        className="text-white px-4 py-2 rounded-md shadow-md font-semibold"
        style={{
          backgroundImage: "linear-gradient(to right, var(--green1), var(--green3))",
        }}
      >
        Time until race: <CountdownTimer />
      </div>
    </div>

    </div>
  );
};

export default CarRevealDesktop;