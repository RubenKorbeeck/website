"use client";
import "../globals.css";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

// Custom team member images
import Willy from "../../pictures/team_photos_25_webp/willy.webp";
import Tom from "../../pictures/team_photos_25_webp/tom.webp";
import Julliette from "../../pictures/team_photos_25_webp/julliette.webp";
import Daan from "../../pictures/team_photos_25_webp/daan.webp";
import Egbert from "../../pictures/team_photos_25_webp/egbert.webp";
import Etjen from "../../pictures/team_photos_25_webp/etjen.webp";
import Jort from "../../pictures/team_photos_25_webp/jort.webp";
import Mariza from "../../pictures/team_photos_25_webp/mariza.webp";
import Timo_J from "../../pictures/team_photos_25_webp/timo_j.webp";
import Anthi from "../../pictures/team_photos_25_webp/anthi.webp";
import Cala from "../../pictures/team_photos_25_webp/cala.webp";
import Gratas from "../../pictures/team_photos_25_webp/gratas.webp";
import Jayden from "../../pictures/team_photos_25_webp/jayden.webp";
import Leon from "../../pictures/team_photos_25_webp/leon.webp";
import Lorenzo from "../../pictures/team_photos_25_webp/lorenzo.webp";
import Merijn from "../../pictures/team_photos_25_webp/merijn.webp";
import Mohammed from "../../pictures/team_photos_25_webp/mohammed.webp";
import Nienke from "../../pictures/team_photos_25_webp/nienke.webp";
import Julian from "../../pictures/team_photos_25_webp/julian.webp";
import Rolf from "../../pictures/team_photos_25_webp/rolf.webp";
import Ruben from "../../pictures/team_photos_25_webp/ruben.webp";
import Steven from "../../pictures/team_photos_25_webp/steven.webp";
import Sander from "../../pictures/team_photos_25_webp/sander.webp";
import Stijn from "../../pictures/team_photos_25_webp/stijn.webp";
import Timo from "../../pictures/team_photos_25_webp/timo.webp";
import Yannick from "../../pictures/team_photos_25_webp/yannick.webp";

// Updated 26 stories with id, quote, name, and job title
const allStories = [
  { id: 1, quote: "''", name: "Daan Boonstra", jobTitle: "Team Manager", image: Willy },
  { id: 2, quote: "'Sleep is overrated'", name: "Tom Noordanus", jobTitle: "Chief Engineer", image: Tom },
  { id: 3, quote: "''", name: "Julliette Evers", jobTitle: "Marketing Manager", image: Julliette },
  { id: 4, quote: "''", name: "Daan", jobTitle: "Structual Engineer", image: Daan },
  { id: 5, quote: "''", name: "Egbert", jobTitle: "Aerodynamics Engineer & Structural Engineer", image: Egbert },
  { id: 6, quote: "''", name: "Etjen", jobTitle: "Quality Control", image: Etjen },
  { id: 7, quote: "''", name: "Jort", jobTitle: "Partner Relations", image: Jort },
  { id: 8, quote: "''", name: "Mariza", jobTitle: "Operations officer", image: Mariza },
  { id: 9, quote: "We race with the sun on our side — my job is to make sure every move counts, from the first light to the finish line.", name: "Timo Jolman", jobTitle: "Strategist", image: Timo_J },
  { id: 10, quote: "''", name: "Anthi", jobTitle: "Communications and Media Officer", image: Anthi },
  { id: 11, quote: "''", name: "Cala", jobTitle: "Technical Manager & Aerodynamics Engineer", image: Cala },
  { id: 12, quote: "''", name: "Gratas", jobTitle: "Electrical Engineer", image: Gratas },
  { id: 13, quote: "''", name: "Jayden", jobTitle: "Mechanical Engineer", image: Jayden },
  { id: 14, quote: "''", name: "Leon", jobTitle: "Aerodynamics Engineer", image: Leon },
  { id: 15, quote: "''", name: "Lorenzo", jobTitle: "Strategist", image: Lorenzo },
  { id: 16, quote: "''", name: "Merijn", jobTitle: "Mechanical Engineer", image: Merijn },
  { id: 17, quote: "'Doing this job is like eating spicy food, sometimes it feels good, sometimes it makes you suffer, but you know that it's an incredible and rewarding experience no matter what'", name: "Mohammed", jobTitle: "Electrical Engineer", image: Mohammed },
  { id: 18, quote: "''", name: "Nienke", jobTitle: "Logistics Manager", image: Nienke },
  { id: 19, quote: "'I want the AC on 28 degrees'", name: "Julian", jobTitle: "Software Engineer", image: Julian },
  { id: 20, quote: "''", name: "Rolf", jobTitle: "Electrical Engineer", image: Rolf },
  { id: 21, quote: "''", name: "Ruben", jobTitle: "Software Engineer", image: Ruben },
  { id: 22, quote: "''", name: "Steven", jobTitle: "Mechanical Engineer", image: Steven },
  { id: 23, quote: "''", name: "Sander", jobTitle: "Mechanical Engineer", image: Sander },
  { id: 24, quote: "''", name: "Stijn", jobTitle: "Partner Relations", image: Stijn },
  { id: 25, quote: "''", name: "Timo", jobTitle: "Communications and Media Officer", image: Timo },
  { id: 26, quote: "''", name: "Yannick", jobTitle: "Electrical Engineer", image: Yannick },
];

// Stories component
type Story = {
  id: number;
  quote: string;
  name: string;
  jobTitle: string;
  image: StaticImageData;
};

const Stories = () => {
  const [selectedStories, setSelectedStories] = useState<Story[]>([]);

  // Function to reshuffle and select 2 random stories
  const reshuffleStories = () => {
    const shuffledStories = [...allStories].sort(() => Math.random() - 0.5); // Shuffle stories
    setSelectedStories([shuffledStories[0], shuffledStories[1]]); // Select the first 2 after shuffling
  };

  // Initial random selection of stories
  useEffect(() => {
    reshuffleStories();
  }, []);

  return (
    <div className="h-[100vh] max-h-[100vh] flex flex-row items-center justify-center w-full">
      <div className="h-[80vh] overflow-hidden flex flex-col items-center p-12 space-y-4 w-full">
      {selectedStories.map((story, index) => (
        <div
          key={story.id}
          className={`flex flex-col md:flex-row items-center max-w-4xl w-full bg-[var(--offblack2)] h-[45%] p-3 shadow-lg rounded-2xl ${
            index === 0 ? "md:flex-row-reverse self-start" : "md:flex-row self-end"
          }`}
        >
          {/* Image container */}
          <div className="relative md:w-1/2 w-1/2 max-w-xs h-auto overflow-hidden flex items-center justify-center invisible md:visible">
            <Image
              src={story.image}
              alt={story.name}
              width={180} // Adjust width as needed
              height={200} // Adjust height as needed
              className="rounded-2xl object-cover "
            />
          </div>

          {/* Text content */}
          <div className="p-2 md:pl-0 text-center md:text-left md:w-2/3">
            <h2 className="md:text-2xl sm:text-lg text-md text-white font-bold mb-2 italic">{story.quote}</h2>
            <h2 className="md:text-xl sm:text-lg text-md text-white font-bold mb-2">{story.name}</h2>
            <h2 className="md:text-xl sm:text-lg text-md text-white font-bold mb-2">{story.jobTitle}</h2>
          </div>
        </div>
      ))}
      {/* Button to reshuffle */}
      <button
        onClick={reshuffleStories}
        className="mt-4 px-6 py-2 bg-[var(--green3)] text-white rounded-lg hover:bg-[var(--green2)] transition duration-300"
      >
        More stories
      </button>
      </div>
    </div>
  );
};

export default Stories;
