"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

// Import your images
import imgMorocco from "../../pictures/challenges/imgMorocco.webp";
import imgBWSC from "../../pictures/challenges/imgBWSC.webp";
import imgBWSC23 from "../../pictures/challenges/imgBWSC23.webp";
import imgIESC22 from "../../pictures/challenges/imgIESC22.webp";
import imgIESC20 from "../../pictures/challenges/imgIESC20.webp";
import imgIESC24 from "../../pictures/challenges/imgIESC24.webp";

import { Navbar } from "../util/navbar";
import Footer from "../util/footer";

interface SubStory {
  title: string;
  text: string;
  dx: number; // horizontal offset from x=100
  dy: number; // vertical offset from the challenge midpoint + some offset
}

interface Challenge {
  id: number;
  title: string;
  summary: string;
  fullText: string;
  align: "left" | "right";
  image: StaticImageData;
  link?: string;
  subStories?: SubStory[];
}

// Base segment heights
const collapsedHeight = 150;
const expandedHeight = 300;
// If sub-stories exist, we add extra space to avoid overlap
const extraSubStorySpace = 400;

/**
 * Builds the main timeline path in an SVG of width=200, with the center line at x=100.
 * We start at y=50 for a little top margin.
 */
function buildTimelinePath(challenges: Challenge[], expandedStates: boolean[]) {
  let path = "";
  let currentY = 50; // start at y=50 for top spacing
  const midpoints: number[] = [];

  // Move to (100, 50)
  path += `M 100 50`;

  challenges.forEach((challenge, i) => {
    const isExpanded = expandedStates[i];
    // If expanded and has sub-stories, add extra vertical space
    let segHeight = isExpanded ? expandedHeight : collapsedHeight;
    if (isExpanded && challenge.subStories) {
      segHeight += extraSubStorySpace;
    }

    const nextY = currentY + segHeight;
    

    if (isExpanded) {

      // Organic S-curve: control points at quarter and three-quarter

    } else {
      // Straight line if collapsed
      path += ` L 100 ${nextY}`;
    }

    midpoints.push(currentY);
    currentY = nextY;
  });

  return { path, totalHeight: currentY, midpoints };
}

/**
 * Builds small "branch" paths for sub-stories.
 * We treat (100, yMid+30) as the anchor, so the branch starts slightly below the box midpoint.
 */
function buildSubStoryPaths(
  challenges: Challenge[],
  expandedStates: boolean[],
  midpoints: number[]
) {
  const branchPaths: string[] = [];

  challenges.forEach((challenge, i) => {
    if (!expandedStates[i] || !challenge.subStories) return;
    const yMid = midpoints[i];
    // Start the branch a bit below the midpoint so it doesn't collide with the main box
    const anchorY = yMid + 80;

    challenge.subStories.forEach((sub) => {
      const start = `M 100 ${anchorY}`;
      const vertical = `L 100 ${anchorY + sub.dy}`;
      const horizontal = `L ${100 + sub.dx} ${anchorY + sub.dy}`;
      branchPaths.push(`${start} ${vertical} ${horizontal}`);
    });
  });

  return branchPaths;
}

export default function Challenges() {
  const [challenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "2024 iLumen European Solar Challenge",
      image: imgIESC24,
      summary:
        "Team 2025 faced their first challenge at the iLumen European Solar Challenge (iESC)...",
      fullText:
        "Team 2025 faced their first challenge at the iLumen European Solar Challenge (iESC), delivering outstanding results...",
      align: "left",
      subStories: [
        {
          title: "YouTube/Blog",
          text: "Check out our video or blog for more details!",
          dx: 100, // to the right of x=100
          dy: 100 + expandedHeight, // 100 below the anchor
        },
        {
          title: "Extra Pic",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          dx: -100 - 160, // to the left of x=100
          dy: 180 + expandedHeight,
        },
      ],
    },
    {
      id: 2,
      title: "2023 Bridgestone World Solar Challenge",
      image: imgBWSC23,
      summary:
        "Team 2023 embarked on their first major race at the Bridgestone World Solar Challenge in Australia...",
      fullText:
        "Team 2023 embarked on their first major race at the Bridgestone World Solar Challenge in Australia...",
      align: "right",
    },
    {
      id: 3,
      title: "2022 iLumen European Solar Challenge",
      image: imgIESC22,
      summary: "In 2022 we participated at the iESC for the second time...",
      fullText:
        "In 2022 we participated at the iESC for the second time. In cooperation with some members of the Team 2019...",
      align: "left",
      link: "https://www.youtube.com/watch?v=W7xF7Cq42t8",
    },
    {
      id: 4,
      title: "2021 Moroccan Solar Challenge",
      image: imgMorocco,
      summary:
        "When the Bridgestone World Solar Challenge was cancelled in 2021...",
      fullText:
        "When the Bridgestone World Solar Challenge was cancelled in February 2021...",
      align: "right",
    },
    {
      id: 5,
      title: "2020 iLumen European Solar Challenge",
      image: imgIESC20,
      summary:
        "The iLumen European Solar Challenge is a 24-hour endurance race held at Circuit Zolder...",
      fullText:
        "The iLumen European Solar Challenge is held every two years at Circuit Zolder in Belgium...",
      align: "left",
    },
    {
      id: 6,
      title: "2019 Bridgestone World Solar Challenge",
      image: imgBWSC,
      summary:
        "In 2019, we participated in the World Solar Challenge for the very first time...",
      fullText:
        "In 2019, we participated in the World Solar Challenge for the very first time...",
      align: "right",
    },
  ]);

  // Track which challenges are expanded
  const [expandedStates, setExpandedStates] = useState<boolean[]>(
    new Array(challenges.length).fill(false)
  );

  const toggleExpand = (idx: number) => {
    setExpandedStates((prev) =>
      prev.map((state, i) => (i === idx ? !state : state))
    );
  };

  // Build main path + sub-story paths
  const { path, totalHeight, midpoints } = buildTimelinePath(
    challenges,
    expandedStates
  );
  const branchPaths = buildSubStoryPaths(challenges, expandedStates, midpoints);

  return (
    <div>      
    <section
      className="relative w-full bg-black text-white"
      style={{ minHeight: `${totalHeight + 100}px` }}
    >
      <Navbar />

      {/* Main timeline SVG. Using width=200 for more horizontal room. */}
      <svg
        width="200"
        height={totalHeight + 100}
        viewBox={`0 0 200 ${totalHeight + 100}`}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-0"
      >
        {/* Main timeline path */}
        <path
          d={path}
          fill="none"
          stroke="#22C55E"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Branch lines for sub-stories */}
        {branchPaths.map((bp, idx) => (
          <path
            key={idx}
            d={bp}
            fill="none"
            stroke="#22C55E"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Challenge boxes */}
      {challenges.map((challenge, i) => {
        const isExpanded = expandedStates[i];
        const yMid = midpoints[i];
        // The final segment might exceed totalHeight if we keep adding space
        // so ensure we have enough container height (we did with +100 above).

        // Adjust the box height if expanded
        const topPosition = yMid;

        // Position the box to the left or right of x=100 in the same scale as the SVG
        // We'll do ~400px to the left for "left" align, 200px to the right for "right".
        const horizontalStyle =
          challenge.align === "left"
            ? { left: "calc(50% - 400px)" }
            : { left: "calc(50% + 200px)" };

        return (
          <div
            key={challenge.id}
            className="absolute w-80 p-4 bg-neutral-800 rounded-lg shadow-lg transition-all z-10"
            style={{ top: topPosition, ...horizontalStyle }}
          >
            <h2 className="text-xl font-bold mb-3">{challenge.title}</h2>
            <p className="text-base overflow-hidden">
              {isExpanded ? challenge.fullText : challenge.summary}
            </p>

            {isExpanded && (
              <div className="mt-4">
                <Image
                  src={challenge.image}
                  alt={challenge.title}
                  className="rounded shadow"
                />
              </div>
            )}

            {challenge.link && (
              <a
                href={challenge.link}
                target="_blank"
                className="underline text-green-300 hover:text-green-500 block mt-4"
              >
                Watch Video
              </a>
            )}

            <button
              onClick={() => toggleExpand(i)}
              className="mt-4 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>
        );
      })}

      {/* Sub-story boxes in the same container coordinate space */}
      {challenges.map((challenge, i) => {
        if (!expandedStates[i] || !challenge.subStories) return null;

        const yMid = midpoints[i];
        const anchorY = yMid + 30; // We used +30 in buildSubStoryPaths

        return challenge.subStories.map((sub, idx2) => {
          // The anchor is (100, anchorY) in the SVG space
          // so subStory box is top: anchorY + sub.dy, left: calc(50% + sub.dx px).
          const top = anchorY + sub.dy;
          const left = `calc(50% + ${sub.dx}px)`;

          return (
            <div
              key={idx2}
              className="absolute bg-white text-black p-3 rounded shadow-md w-40"
              style={{ top, left }}
            >
              <h3 className="font-bold mb-1">{sub.title}</h3>
              <p className="text-sm">{sub.text}</p>
            </div>
          );
        });
      })}
    </section>
    <Footer />
    </div>
  );
}
