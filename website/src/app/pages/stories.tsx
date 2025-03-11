"use client";
import ".././globals.css";
import React from 'react';
import Image from "next/image";

import ruben from "../../pictures/team/ruben.jpg";
import julian from "../../pictures/team/julian.jpg";

const stories = [
  {
    id: 1,
    title: "Story Ruben",
    description: "This is the first story with an image on the right.",
    image: ruben,
    reverse: true,
  },
  {
    id: 2,
    title: "Story Julian",
    description: "This is the second story with an image on the left.",
    image: julian,
    reverse: false,
  },
];

const Stories = () => {
  return (
    <div className="h-[100vh] max-h-[100vh] overflow-hidden flex flex-col items-center p-12 space-y-10">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className={`flex flex-col md:flex-row items-center max-w-4xl w-full bg-white h-[45%] p-3 shadow-lg rounded-2xl ${
            index % 2 === 0 ? "self-start" : "self-end"
          } ${story.reverse ? "md:flex-row-reverse" : ""}`}
        >
          {/* Wrap the Image in a container with fixed dimensions */}
          <div className="relative md:w-1/3 h-[100%]">
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="rounded-lg object-contain"
            />
          </div>
          <div className="p-8 md:pl-0 text-center md:text-left md:w-2/3">
            <h2 className="text-2xl text-gray-600 font-bold mb-4">{story.title}</h2>
            <p className="text-gray-600">{story.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;
