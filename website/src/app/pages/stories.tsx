"use client";
import ".././globals.css";
import React from 'react';

const stories = [
  {
    id: 1,
    title: "Story One",
    description: "This is the first story with an image on the right.",
    image: "https://via.placeholder.com/400",
    reverse: true,
  },
  {
    id: 2,
    title: "Story Two",
    description: "This is the second story with an image on the left.",
    image: "https://via.placeholder.com/400",
    reverse: false,
  },
  {
    id: 3,
    title: "Story Two",
    description: "This is the second story with an image on the left.",
    image: "https://via.placeholder.com/400",
    reverse: false,
  },
  {
    id: 4,
    title: "Story Two",
    description: "This is the second story with an image on the left.",
    image: "https://via.placeholder.com/400",
    reverse: false,
  },
];

const Stories = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 space-y-10">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className={`flex flex-col md:flex-row items-center max-w-4xl w-full bg-white p-6 shadow-lg rounded-2xl ${index % 2 === 0 ? 'self-start' : 'self-end'} ${story.reverse ? 'md:flex-row-reverse' : ''}`}
        >
          <img src={story.image} alt={story.title} className="w-full md:w-1/3 rounded-lg" />
          <div className="p-8 md:pl-0 text-center md:text-left md:w-2/3">
             <h2 className="text-2xl font-bold mb-4">{story.title}</h2>
             <p className="text-gray-600">{story.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;
