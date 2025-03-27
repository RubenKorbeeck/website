"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import imgMorocco from "../../pictures/challenges/imgMorocco.webp";
import imgBWSC from "../../pictures/challenges/imgBWSC.webp";
import imgBWSC23 from "../../pictures/challenges/imgBWSC23.webp";
import imgIESC22 from "../../pictures/challenges/imgIESC22.webp";
import imgIESC20 from "../../pictures/challenges/imgIESC20.webp";
import imgIESC24 from "../../pictures/challenges/imgIESC24.webp";
import { Navbar } from "../util/navbar";

interface ChallengeItemProps {
  title: string;
  image: StaticImageData;
  summary: string;
  fullText: string;
  align: "left" | "right";
  link?: string;
}

const ChallengeItem = ({ title, image, summary, fullText, align, link }: ChallengeItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const isLeft = align === "left";

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className={`w-full mb-16 flex flex-col gap-4 ${isLeft ? 'items-start' : 'items-end'}`}>
        <div className={`w-full max-w-xl ${isLeft ? 'ml-[10%]' : 'mr-[10%]'}`}>
          <Image src={image} alt={title} className="rounded-xl shadow-lg w-full h-auto" />
        </div>
        <div className={`w-full max-w-xl text-white p-4 rounded-xl shadow-lg text-center ${isLeft ? 'ml-[15%]' : 'mr-[15%]'}`}>
        <div className={`relative mt-8 bg-green-600 rounded ${isLeft ? 'self-start' : 'self-end'}`}>
          <h2 className="text-xl font-bold text-white mb-2 text-center">{title}</h2>
          </div>
          <p className={`transition-max-height duration-1000 ease-in-out overflow-hidden ${expanded ? 'max-h-[1000px]' : 'max-h-20'}`}>{expanded ? fullText : summary}</p>
          <div className="mt-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="bg-green-600 text-white px-4 py-2 rounded-full font-bold hover:bg-green-700"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
            {link && (
              <Link
                href={link}
                target="_blank"
                className="ml-4 underline text-green-300 hover:text-green-500"
              >
                Watch Video
              </Link>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default function Challenges() {
  return (
    <section className="relative min-h-screen px-4 pt-28 pb-12 bg-black text-white">
      <div className="flex flex-col items-center relative w-full z-10">
        <div className="absolute top+20 w-10 bg-green-600 h-full z-0 rounded" />
        <Navbar />
        <ChallengeItem
          title="2024 iLumen European Solar Challenge"
          image={imgIESC24}
          summary="Team 2025 faced their first challenge at the iLumen European Solar Challenge (iESC)..."
          fullText="Team 2025 faced their first challenge at the iLumen European Solar Challenge (iESC), and with incredible determination and high motivation, they delivered outstanding results. Alongside the 27 team members came our 12 alumni from Team '23. Combining all of our expertise and curiosity to gain our National Champion title as well as Green Thunder ending as 4th in Europe, including 3rd Team in Europe. Heavily credited to our speed, not only on the tracks but in the pit box. Due to fastest hot lap and fastest pit-box we got Pole Position from qualifying, leading to us to push again in the race. Getting the fastest hot lap during the 24hr race itself! This achievement reflects the team's perseverance and passion. Pushing through challenges before and during the race, bringing our team together."
          align="left"
        />
        <ChallengeItem
          title="2023 Bridgestone World Solar Challenge"
          image={imgBWSC23}
          summary="Team 2023 embarked on their first major race at the Bridgestone World Solar Challenge in Australia..."
          fullText="Team 2023 embarked on their first major race at the Bridgestone World Solar Challenge in Australia. With unwavering determination and innovative technology, the team delivered outstanding results, securing 6th place internationally and 4th in qualifiers. This incredible achievement is a testament to the team's resilience, technical expertise, and passion for sustainable energy."
          align="right"
        />
        <ChallengeItem
          title="2022 iLumen European Solar Challenge"
          image={imgIESC22}
          summary="In 2022 we participated at the iESC for the second time..."
          fullText="In 2022 we participated at the iESC for the second time. In cooperation with some members of the Team 2019 and 2021 we were able to drive the Green Lightning to the 5th place! This was an amazing experience for us, Team 2023, to gain experience and a lot of learning outcomes for future challenges."
          align="left"
          link="https://www.youtube.com/watch?v=W7xF7Cq42t8"
        />
        <ChallengeItem
          title="2021 Moroccan Solar Challenge"
          image={imgMorocco}
          summary="When the Bridgestone World Solar Challenge was cancelled in 2021, we had to come up with an alternative..."
          fullText="When the Bridgestone World Solar Challenge was cancelled in February 2021, we had to come up with an alternative race to showcase our new solar car, Green Spirit. The result was the Solar Challenge Morocco 2021. This new race led us 2500 km through the Middle-Atlas and Sahara desert. The route included a height difference of 8 km and a 10° climbing slope, pushing our car to new limits. Driving in Morocco also required extreme focus due to the curvy, mountainous roads."
          align="right"
        />
        <ChallengeItem
          title="2020 iLumen European Solar Challenge"
          image={imgIESC20}
          summary="The iLumen European Solar Challenge is a 24-hour endurance race held at Circuit Zolder..."
          fullText="The iLumen European Solar Challenge is being held every two years at Circuit Zolder in Belgium. This 24-hour endurance race allows a maximum of two solar cars per team. In 2020, we participated for the first time and managed to win third place in collaboration with Team 2019. Circuit Zolder, a former Formula 1 track, challenged our car with sharp corners and long straights."
          align="left"
        />
        <ChallengeItem
          title="2019 Bridgestone World Solar Challenge"
          image={imgBWSC}
          summary="In 2019, we participated in the World Solar Challenge for the very first time..."
          fullText="In 2019, we participated in the World Solar Challenge for the very first time. It was an amazing journey through the Australian outback, from Darwin to Adelaide. With our car Green Lightning, we camped, raced, and grew closer as a team. We learned about pit strategies, time management, and working under pressure. The experience laid the foundation for our future races."
          align="right"
        />
      </div>
    </section>
  );
}
