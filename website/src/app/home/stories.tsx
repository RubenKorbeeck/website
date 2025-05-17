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
  { id: 1, quote: "Willy is the heart of the team, always encouraging others to perform their best.", name: "Willy", jobTitle: "Team Lead", image: Willy },
  { id: 2, quote: "'Sleep is overrated'", name: "Tom", jobTitle: "Electrical Engineer", image: Tom },
  { id: 3, quote: "Julliette is an excellent communicator, keeping the team motivated and organized.", name: "Julliette", jobTitle: "Project Manager", image: Julliette },
  { id: 4, quote: "Daan's innovative solutions helped the team tackle many design challenges.", name: "Daan", jobTitle: "Mechanical Engineer", image: Daan },
  { id: 5, quote: "Egbert's background in aerodynamics brought significant improvements to the car’s performance.", name: "Egbert", jobTitle: "Aerodynamics Specialist", image: Egbert },
  { id: 6, quote: "Etjen’s meticulous attention to detail ensures that every part of the car is flawless.", name: "Etjen", jobTitle: "Quality Control", image: Etjen },
  { id: 7, quote: "Jort's leadership in testing has been key in refining the Green Falcon’s capabilities.", name: "Jort", jobTitle: "Testing Coordinator", image: Jort },
  { id: 8, quote: "Mariza brings a deep understanding of solar technology, optimizing the energy system.", name: "Mariza", jobTitle: "Solar Engineer", image: Mariza },
  { id: 9, quote: "Timo J’s skills in mechanical engineering have been crucial in building the car’s chassis.", name: "Timo J", jobTitle: "Mechanical Engineer", image: Timo_J },
  { id: 10, quote: "Anthi’s project management ensures that everything runs smoothly and efficiently.", name: "Anthi", jobTitle: "Project Manager", image: Anthi },
  { id: 11, quote: "Cala’s expertise in data analysis helped the team improve the car’s performance under various conditions.", name: "Cala", jobTitle: "Data Analyst", image: Cala },
  { id: 12, quote: "Gratas contributes a wealth of knowledge in electrical systems and circuit design.", name: "Gratas", jobTitle: "Electrical Engineer", image: Gratas },
  { id: 13, quote: "Jayden’s focus on sustainability has made the team’s efforts more environmentally friendly.", name: "Jayden", jobTitle: "Sustainability Officer", image: Jayden },
  { id: 14, quote: "Leon is passionate about innovation, constantly seeking new ways to improve the car.", name: "Leon", jobTitle: "Innovation Specialist", image: Leon },
  { id: 15, quote: "Lorenzo’s technical skills have been essential for troubleshooting and solving complex problems.", name: "Lorenzo", jobTitle: "Technical Support", image: Lorenzo },
  { id: 16, quote: "Merijn’s contributions in material science helped the team reduce weight without compromising strength.", name: "Merijn", jobTitle: "Materials Scientist", image: Merijn },
  { id: 17, quote: "Mohammed is known for his ability to optimize the car’s performance during test runs.", name: "Mohammed", jobTitle: "Performance Engineer", image: Mohammed },
  { id: 18, quote: "Nienke’s leadership in the logistics team made it possible to execute our goals on time.", name: "Nienke", jobTitle: "Logistics Manager", image: Nienke },
  { id: 19, quote: "'I want the AC on 28 degrees'", name: "Julian", jobTitle: "Software Engineer", image: Julian },
  { id: 20, quote: "Rolf’s technical insights have helped optimize the powertrain and improve efficiency.", name: "Rolf", jobTitle: "Powertrain Engineer", image: Rolf },
  { id: 21, quote: "'Working in this team is one of the most amazing experiences I've ever had.'", name: "Ruben", jobTitle: "Software Engineer", image: Ruben },
  { id: 22, quote: "Steven’s experience in electrical engineering ensures that the energy systems are perfectly balanced.", name: "Steven", jobTitle: "Electrical Engineer", image: Steven },
  { id: 23, quote: "Sander’s work on the design and testing of components ensures optimal performance in all conditions.", name: "Sander", jobTitle: "Component Designer", image: Sander },
  { id: 24, quote: "Stijn’s leadership in strategy and race planning has kept the team focused and on track.", name: "Stijn", jobTitle: "Strategy Lead", image: Stijn },
  { id: 25, quote: "Timo is a valuable member of the team, always troubleshooting and ensuring the car’s systems function properly.", name: "Timo", jobTitle: "Troubleshooter", image: Timo },
  { id: 26, quote: "Yannick brings a wealth of experience in materials science and has helped create a more durable car.", name: "Yannick", jobTitle: "Materials Scientist", image: Yannick },
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
    <div className="h-[100vh] max-h-[100vh] overflow-hidden flex flex-col items-center p-12 space-y-10">
      {selectedStories.map((story, index) => (
        <div
          key={story.id}
          className={`flex flex-col md:flex-row items-center max-w-4xl w-full bg-[var(--offblack2)] h-[45%] p-3 shadow-lg rounded-2xl ${
            index === 0 ? "md:flex-row-reverse self-start" : "md:flex-row self-end"
          }`}
        >
          {/* Image container */}
          <div className="relative md:w-1/2 w-1/2 max-w-xs h-auto overflow-hidden flex items-center justify-center">
            <Image
              src={story.image}
              alt={story.name}
              width={200} // Adjust width as needed
              height={200} // Adjust height as needed
              className="rounded-2xl object-cover"
            />
          </div>

          {/* Text content */}
          <div className="p-8 md:pl-0 text-center md:text-left md:w-2/3">
            <h2 className="text-2xl text-white font-bold mb-4 italic">{story.quote}</h2>
            <h2 className="text-xl text-white font-bold mb-4">{story.name}</h2>
            <h2 className="text-xl text-white font-bold mb-4">{story.jobTitle}</h2>
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
  );
};

export default Stories;
