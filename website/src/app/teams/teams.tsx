"use client";

import React, { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
import Erik from "../../pictures/team_photos_25_webp/erik.webp";

import we_are_tdsr from "../../pictures/teamphoto/we_are_25.svg";
import team25 from "../../pictures/teamphoto/team25.webp";

import electronics from "../../pictures/teamSections/ELEC.jpg";
import operations from "../../pictures/teamSections/LOG.jpg";
import aerodynamics from "../../pictures/teamSections/aero.jpg";
import mechanics from "../../pictures/teamSections/mechies.jpg";
import strategy from "../../pictures/teamSections/strat.jpg";
import software from "../../pictures/teamSections/SOFT.jpg";
import management from "../../pictures/teamSections/managemnet.jpg";
import communication from "../../pictures/teamSections/comms.jpg";
import acquisitions from "../../pictures/teamSections/ACQ.jpg";
import structural from "../../pictures/teamSections/struct.jpg";
import mentor from "../../pictures/teamSections/mentor.jpg";

const sectionImages: Record<string, StaticImageData> = {
  software,
  management,
  operations,
  communication,
  acquisitions,
  aerodynamics,
  mechanics,
  structural,
  strategy,
  electronics,
  mentor,
};


// get team linkedin links
const linkErik = "https://www.linkedin.com/in/erik-westerhoff-452b1111/";
const linkWilly = "http://www.linkedin.com/in/daan-boonstra-";
const linkTom = "http://www.linkedin.com/in/tom-noordanus/";
const linkJulliette = "https://www.linkedin.com/in/jullietteevers/";
const linkAnthi = "https://www.linkedin.com/in/anthi-georgiadou/";
const linkCala = "https://www.linkedin.com/in/cala-gonz%C3%A1lez-6833502b7/";
const linkTimo = "https://timohoogewoonink.myportfolio.com/work";
const linkTimoJ = "https://www.linkedin.com/in/timo-jolman-b7a9b72a0/";
const linkJort = "https://www.linkedin.com/in/jort-frankena/";
const linkSteven = "https://www.linkedin.com/in/steven-de-roos-9a9488267";
const linkYannick = "https://www.linkedin.com/in/yannick-meijer-a90621256/";
const linkJayden =
  "https://www.linkedin.com/in/jayden-de-boer-0a33042a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";
const linkLorenzo = "https://www.lorenzozambelli.it";
const linkMariza = "https://www.linkedin.com/in/maria-mariza-christodoulou/";
const linkRolf = "https://www.linkedin.com/in/rolf-kok/";
const linkEgbert =
  "https://www.linkedin.com/in/egbert-menno-kuipers-66b303328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";
const linkGratas = "https://www.linkedin.com/in/gratas-kanord-35b3b4301/";
const linkLeon = "https://www.linkedin.com/in/leon-westra-48b742291/";
const linkJulian = "https://www.linkedin.com/in/julian-mounir-906346304/";
const linkRuben = "https://www.linkedin.com/in/ruben-korbeeck-36538b309/";
const linkMohammed =
  "https://www.linkedin.com/in/mohammed-sharifpour-286004195/";
const linkStijn = "https://www.linkedin.com/in/stijn-rekers-562154301/";
const linkMerijn = "https://www.linkedin.com/in/merijn-blonk-112a53206";
const linkSander = "https://www.linkedin.com/in/sander-laskewitz-b89875250/";
const linkDaan = "";
const linkEtjen = "https://www.linkedin.com/in/etjenreme/";
const linkNienke = "";

function TeamMember({ name, role, pic, link }: { name: string; role: string; pic: StaticImageData; link: string }) {
  return (
    <div className="flex flex-col items-center m-4 text-gray-700">
      <a href={link} target="_blank" rel="noreferrer" className="group">
        <div className="relative w-80 h-80">
          <Image
            src={pic}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
        <h3 className="mt-2 text-xl font-semibold text-center group-hover:text-[var(--green2)]">{name}</h3>
        <p className="text-md text-center group-hover:text-[var(--green2)]">{role}</p>
      </a>
    </div>
  );
}

function TeamSection({ members }: { members: React.ReactNode[] }) {
  const isOdd = members.length % 2 !== 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {members.map((member, index) => {
        const isLast = index === members.length - 1;
        const shouldCenter = isOdd && isLast;

        // Always center on small screens
        let alignmentClass = "justify-center";
        let marginClass = "";

        if (!shouldCenter) {
          if (index % 2 === 0) {
            alignmentClass += " md:justify-start";
            marginClass = "md:ml-[5%]";
          } else {
            alignmentClass += " md:justify-end";
            marginClass = "md:mr-[5%]";
          }
        } else {
          alignmentClass += " md:justify-center md:col-span-2";
        }

        return (
          <div key={index} className={`flex items-center ${alignmentClass}`}>
            <div className={`w-full max-w-sm ${marginClass}`}>{member}</div>
          </div>
        );
      })}
    </div>
  );
}




function Teams() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const teamSectionsData = [
    {
      id: "software",
      preEmphasis: "The ",
      emphasis: "Software ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Ruben"
          name="Ruben Korbeeck"
          role="Software & Electrical Engineer"
          pic={Ruben}
          link={linkRuben}
        />,
        <TeamMember
          key="Julian"
          name="Julian Mounir"
          role="Software & Electrical Engineer"
          pic={Julian}
          link={linkJulian}
        />,
      ],
    },
    {
      id: "management",
      preEmphasis: "The ",
      emphasis: "Management ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Daan"
          name="Daan Willem Boonstra"
          role="Team Manager"
          pic={Willy}
          link={linkWilly}
        />,
        <TeamMember
          key="Tom"
          name="Tom Noordanus"
          role="Chief Engineer"
          pic={Tom}
          link={linkTom}
        />,
        <TeamMember
          key="Julliette"
          name="Julliette Evers"
          role="Marketing Manager"
          pic={Julliette}
          link={linkJulliette}
        />,
        <TeamMember
          key="Cala"
          name="Cala Gonzalez"
          role="Technical Manager"
          pic={Cala}
          link={linkCala}
        />,
      ],
    },
    {
      id: "operations",
      preEmphasis: "The ",
      emphasis: "Operations ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Mariza"
          name="Mariza Christodoulou"
          role="Operations Officer"
          pic={Mariza}
          link={linkMariza}
        />,
      ],
    },
    {
      id: "communication",
      preEmphasis: "The ",
      emphasis: "Communication ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Timo"
          name="Timo Hoogewoonink"
          role="Communications and Media Officer"
          pic={Timo}
          link={linkTimo}
        />,
        <TeamMember
          key="Anthi"
          name="Anthi Georgiadou"
          role="Communications and Media Officer"
          pic={Anthi}
          link={linkAnthi}
        />,
        <TeamMember
          key="Nienke"
          name="Nienke de Wit"
          role="Communications and Media Officer - Parttime"
          pic={Nienke}
          link={linkNienke}
        />,
      ],
    },
    {
      id: "acquisitions",
      preEmphasis: "The ",
      emphasis: "Acquisitions ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Stijn"
          name="Stijn Rekers"
          role="Partner Relations"
          pic={Stijn}
          link={linkStijn}
        />,
        <TeamMember
          key="Jort"
          name="Jort Frankena"
          role="Partner Relations"
          pic={Jort}
          link={linkJort}
        />,
      ],
    },
    {
      id: "aerodynamics",
      preEmphasis: "The ",
      emphasis: "Aerodynamics ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Egbert"
          name="Egbert Menno Kuipers"
          role="Aerodynamics Engineer & Structural Engineer"
          pic={Egbert}
          link={linkEgbert}
        />,
        <TeamMember
          key="Cala2"
          name="Cala Gonzalez"
          role="Aerodynamics Engineer"
          pic={Cala}
          link={linkCala}
        />,
        <TeamMember
          key="Leon"
          name="Leon Westra"
          role="Aerodynamics Engineer & Development"
          pic={Leon}
          link={linkLeon}
        />,
      ],
    },
    {
      id: "mechanics",
      preEmphasis: "The ",
      emphasis: "Mechanics ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Merijn"
          name="Merijn Blonk"
          role="Mechanical Engineer"
          pic={Merijn}
          link={linkMerijn}
        />,
        <TeamMember
          key="Sander"
          name="Sander Laskewitz"
          role="Mechanical Engineer"
          pic={Sander}
          link={linkSander}
        />,
        <TeamMember
          key="Steven"
          name="Steven de Roos"
          role="Mechanical Engineer"
          pic={Steven}
          link={linkSteven}
        />,
        <TeamMember
          key="Jayden"
          name="Jayden de Boer"
          role="Mechanical Engineer"
          pic={Jayden}
          link={linkJayden}
        />,
      ],
    },
    {
      id: "structural",
      preEmphasis: "The ",
      emphasis: "Structural ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Daan2"
          name="Daan Bruger"
          role="Structural Engineer"
          pic={Daan}
          link={linkDaan}
        />,
        <TeamMember
          key="Etjen"
          name="Etjen Reme"
          role="Structural Engineer Intern"
          pic={Etjen}
          link={linkEtjen}
        />,
      ],
    },
    {
      id: "strategy",
      preEmphasis: "The ",
      emphasis: "Strategy ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="TimoJ"
          name="Timo Jolman"
          role="Strategist"
          pic={Timo_J}
          link={linkTimoJ}
        />,
        <TeamMember
          key="Lorenzo"
          name="Lorenzo Zambelli"
          role="Strategist"
          pic={Lorenzo}
          link={linkLorenzo}
        />,
      ],
    },
    {
      id: "electronics",
      preEmphasis: "The ",
      emphasis: "Electronics ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Yannick"
          name="Yannick Meijer"
          role="Electrical Engineer"
          pic={Yannick}
          link={linkYannick}
        />,
        <TeamMember
          key="Rolf"
          name="Rolf Kok"
          role="Electrical Engineer"
          pic={Rolf}
          link={linkRolf}
        />,
        <TeamMember
          key="Gratas"
          name="Gratas Kanord"
          role="Electrical Engineer"
          pic={Gratas}
          link={linkGratas}
        />,
        <TeamMember
          key="Mohammed"
          name="Mohammed Sharifpour"
          role="Electrical Engineer"
          pic={Mohammed}
          link={linkMohammed}
        />,
      ],
    },
    {
      id: "mentor",
      preEmphasis: "The ",
      emphasis: "Mentor",
      postEmphasis: "",
      members: [
        <TeamMember
          key="Erik"
          name="Erik Westerhoff"
          role="Team Mentor"
          pic={Erik}
          link={linkErik}
        />,
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-screen bg-cover bg-no-repeat bg-top-0">
        <Image
          src={team25}
          alt="Team Background"

          layout="fill"
          objectFit="cover"
          quality={100}
          style={{ transform: "translateY(-10%)" }}
          priority
        />
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{ transform: "translateY(-10%)" }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl text-white font-bold">
            <Image
              src={we_are_tdsr}
              alt="We are TDSR"
              width={1200}
              height={400}
            />
          </h1>
        </div>
      </div>

      <h1 className="font-montserrat text-light2 text-center text-3xl font-bold mt-8 mx-auto">
        MEET THE PEOPLE THAT BROUGHT OUR LATEST CAR TO LIFE!
      </h1>

      {/* Expandable Sections */}
      {teamSectionsData.map((section) => (
        <div key={section.id} className="w-4/5 mx-auto my-12">
          {/* Clickable Banner */}
          <div
            onClick={() => toggleSection(section.id)}
            className="cursor-pointer relative rounded-xl overflow-hidden shadow-lg group"
          >
            <Image
              src={sectionImages[section.id]}
              alt={`${section.emphasis} banner`}
              width={1200}
              height={256}
              className="w-full h-64 object-cover brightness-75 group-hover:brightness-90 transition rounded-3xl"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl font-bold">{section.emphasis}</h2>
              <span
                className={`text-3xl mt-2 transition-transform duration-300 ${
                  expandedSection === section.id ? "rotate-180" : ""
                }`}
              >
                ↓
              </span>

            </div>
          </div>

          {/* Reveal Section with Smooth Transition */}
          <AnimatePresence>
            {expandedSection === section.id && (
              <motion.div
                key="content"
                initial={{ opacity: 0, scaleY: 0.95 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="origin-top overflow-hidden bg-gray-100 rounded-3xl mt-4 p-6"
              >
                <TeamSection members={section.members} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

export default Teams;
