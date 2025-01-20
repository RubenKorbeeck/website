"use client";
import ".././globals.css";
import React from 'react';
import GT from '../../pictures/GreenThunder.webp';

const CarReveal = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <img
        src={GT.src}
        alt="Green Thunder"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default CarReveal;