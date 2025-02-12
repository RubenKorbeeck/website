"use client";
import ".././globals.css";
import React from 'react';
import Image from 'next/image';
import GT from '../../pictures/GreenThunder.webp';
import CountdownTimer from '../util/timer';

const CarReveal = () => {
  return (
    <div
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

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-2xl font-bold">⏳ BWSC Timer</h1>
        <CountdownTimer/>
      </div>

    </div>
  );
};

export default CarReveal;