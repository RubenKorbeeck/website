"use client"; // This directive makes the component a Client Component
import React from "react";
import Image from "next/image";

// import team pics
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

import Willy_alt from "../../pictures/team_photos_25_webp_small/willy.webp";
import Tom_alt from "../../pictures/team_photos_25_webp_small/tom.webp";
import Julliette_alt from "../../pictures/team_photos_25_webp_small/julliette.webp";
import Daan_alt from "../../pictures/team_photos_25_webp_small/daan.webp";
import Egbert_alt from "../../pictures/team_photos_25_webp_small/egbert.webp";
import Etjen_alt from "../../pictures/team_photos_25_webp_small/etjen.webp";
import Jort_alt from "../../pictures/team_photos_25_webp_small/jort.webp";
import Mariza_alt from "../../pictures/team_photos_25_webp_small/mariza.webp";
import Timo_J_alt from "../../pictures/team_photos_25_webp_small/timo_j.webp";
import Anthi_alt from "../../pictures/team_photos_25_webp_small/anthi.webp";
import Cala_alt from "../../pictures/team_photos_25_webp_small/cala.webp";
import Gratas_alt from "../../pictures/team_photos_25_webp_small/gratas.webp";
import Jayden_alt from "../../pictures/team_photos_25_webp_small/jayden.webp";
import Leon_alt from "../../pictures/team_photos_25_webp_small/leon.webp";
import Lorenzo_alt from "../../pictures/team_photos_25_webp_small/lorenzo.webp";
import Merijn_alt from "../../pictures/team_photos_25_webp_small/merijn.webp";
import Mohammed_alt from "../../pictures/team_photos_25_webp_small/mohammed.webp";
import Nienke_alt from "../../pictures/team_photos_25_webp_small/nienke.webp";
import Julian_alt from "../../pictures/team_photos_25_webp_small/julian.webp";
import Rolf_alt from "../../pictures/team_photos_25_webp_small/rolf.webp";
import Ruben_alt from "../../pictures/team_photos_25_webp_small/ruben.webp";
import Steven_alt from "../../pictures/team_photos_25_webp_small/steven.webp";
import Sander_alt from "../../pictures/team_photos_25_webp_small/sander.webp";
import Stijn_alt from "../../pictures/team_photos_25_webp_small/stijn.webp";
import Timo_alt from "../../pictures/team_photos_25_webp_small/timo.webp";
import Yannick_alt from "../../pictures/team_photos_25_webp_small/yannick.webp";
import Erik_alt from "../../pictures/team_photos_25_webp_small/erik.webp";

import we_are_tdsr from "../../pictures/teamphoto/we_are_25.svg";
import team25 from "../../pictures/teamphoto/team25.webp";

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

const navSections = [
  { id: "management", name: "Management Team" },
  { id: "software", name: "Software Team" },
  { id: "operations", name: "Operations Team" },
  { id: "communication", name: "Communication Team" },
  { id: "acquisitions", name: "Acquisitions Team" },
  { id: "aerodynamics", name: "Aerodynamics Team" },
  { id: "mechanics", name: "Mechanics Team" },
  { id: "structural", name: "Structural Team" },
  { id: "strategy", name: "Strategy Team" },
  { id: "electronics", name: "Electronics Team" },
  { id: "coach", name: "Team Coach" },
];


// Team member component using Next.js Image and Tailwind classes
import { StaticImageData } from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  pic: StaticImageData;
  pic_alt: StaticImageData;
  link: string;
}

function TeamMember({ name, role, pic, link }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center m-4 text-gray-700">
      <a href={link} target="_blank" rel="noreferrer" className="group">
        <div className="relative w-80 h-80">
          <Image
            src={pic}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <h3 className="mt-2 text-xl font-semibold text-center group-hover:text-[var(--green2)]">{name}</h3>
      <p className="text-md text-center group-hover:text-[var(--green2)]">{role}</p>
      </a>
    </div>
  );
}

// Navigation bar component with Tailwind styling
interface Section {
  id: string;
  name: string;
}

function NavigationMenu({ sections }: { sections: Section[] }) {
  const scrollToSection = (id: string): void => {
    const element: HTMLElement | null = document.getElementById(id);
    if (element) {
      const yOffset: number = -200; // Adjust as needed
      const yPosition: number =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-around items-center mb-4">
        <h1 className="text-3xl font-bold">
          Find us with a <span className="text-[var(--green2)]">/click</span>
        </h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="px-6 py-4 m-2 bg-[var(--green2)] text-white rounded-xl hover:bg-blue-600 transition"
          >
            {section.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Team section component using Tailwind grid and text utilities
interface TeamSectionProps {
  id: string;
  preEmphasis: string;
  emphasis: string;
  postEmphasis: string;
  members: React.ReactNode[];
}

function TeamSection({ id, preEmphasis, emphasis, postEmphasis, members }: TeamSectionProps) {
  const numMembers = members.length;

  return (
    <section id={id} className="container mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-black">
          {preEmphasis}
          <span className="text-[var(--green2)]">{emphasis}</span>
          {postEmphasis}
        </h1>
      </div>
      {/* Dynamically adjust grid layout */}
      <div className={`grid grid-cols-1 ${numMembers >= 2 ? "md:grid-cols-2" : ""} gap-8`}>
        {members.map((member, index) => (
          <div
            key={index}
            className={`flex justify-center items-center ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            {member}
          </div>
        ))}

        {/* {numMembers > 2 && (
          <div className="col-span-2 flex justify-center items-center">
            {members[2]}
          </div>
        )} */}
      </div>
    </section>
  );
}

// Main Teams component
function Teams() {

  // Data for each team section and its members
  const teamSectionsData = [
    {
      id: "software",
      preEmphasis: "The ",
      emphasis: "software ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Ruben"
          name="Ruben Korbeeck"
          role="Software & Electrical Engineer"
          pic={Ruben}
          pic_alt={Ruben_alt}
          link={linkRuben}
        />,
        <TeamMember
          key="Julian"
          name="Julian Mounir"
          role="Software & Electrical Engineer"
          pic={Julian}
          pic_alt={Julian_alt}
          link={linkJulian}
        />,
      ],
    },
    {
      id: "management",
      preEmphasis: "The ",
      emphasis: "management ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Daan"
          name="Daan Willem Boonstra"
          role="Team Manager"
          pic={Willy}
          pic_alt={Willy_alt}
          link={linkWilly}
        />,
        <TeamMember
          key="Tom"
          name="Tom Noordanus"
          role="Chief Engineer"
          pic={Tom}
          pic_alt={Tom_alt}
          link={linkTom}
        />,
        <TeamMember
          key="Julliette"
          name="Julliette Evers"
          role="Marketing Manager"
          pic={Julliette}
          pic_alt={Julliette_alt}
          link={linkJulliette}
        />,
        <TeamMember
          key="Cala"
          name="Cala Gonzalez"
          role="Technical Manager"
          pic={Cala}
          pic_alt={Cala_alt}
          link={linkCala}
        />,
      ],
    },
    {
      id: "operations",
      preEmphasis: "The ",
      emphasis: "operations ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Mariza"
          name="Mariza Christodoulou"
          role="Operations Officer"
          pic={Mariza}
          pic_alt={Mariza_alt}
          link={linkMariza}
        />,
      ],
    },
    {
      id: "communication",
      preEmphasis: "The ",
      emphasis: "communication ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Timo"
          name="Timo Hoogewoonink"
          role="Communications and Media Officer"
          pic={Timo}
          pic_alt={Timo_alt}
          link={linkTimo}
        />,
        <TeamMember
          key="Anthi"
          name="Anthi Georgiadou"
          role="Communications and Media Officer"
          pic={Anthi}
          pic_alt={Anthi_alt}
          link={linkAnthi}
        />,
        <TeamMember
          key="Nienke"
          name="Nienke de Wit"
          role="Communications and Media Officer - Parttime"
          pic={Nienke}
          pic_alt={Nienke_alt}
          link={linkNienke}
        />,
      ],
    },
    {
      id: "acquisitions",
      preEmphasis: "The ",
      emphasis: "acquisitions ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Stijn"
          name="Stijn Rekers"
          role="Partner Relations"
          pic={Stijn}
          pic_alt={Stijn_alt}
          link={linkStijn}
        />,
        <TeamMember
          key="Jort"
          name="Jort Frankena"
          role="Partner Relations"
          pic={Jort}
          pic_alt={Jort_alt}
          link={linkJort}
        />,
      ],
    },
    {
      id: "aerodynamics",
      preEmphasis: "The ",
      emphasis: "aerodynamics ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Egbert"
          name="Egbert Menno Kuipers"
          role="Aerodynamics Engineer & Structural Engineer"
          pic={Egbert}
          pic_alt={Egbert_alt}
          link={linkEgbert}
        />,
        <TeamMember
          key="Cala2"
          name="Cala Gonzalez"
          role="Aerodynamics Engineer"
          pic={Cala}
          pic_alt={Cala_alt}
          link={linkCala}
        />,
        <TeamMember
          key="Leon"
          name="Leon Westra"
          role="Aerodynamics Engineer & Development"
          pic={Leon}
          pic_alt={Leon_alt}
          link={linkLeon}
        />,
      ],
    },
    {
      id: "mechanics",
      preEmphasis: "The ",
      emphasis: "mechanics ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Merijn"
          name="Merijn Blonk"
          role="Mechanical Engineer"
          pic={Merijn}
          pic_alt={Merijn_alt}
          link={linkMerijn}
        />,
        <TeamMember
          key="Sander"
          name="Sander Laskewitz"
          role="Mechanical Engineer"
          pic={Sander}
          pic_alt={Sander_alt}
          link={linkSander}
        />,
        <TeamMember
          key="Steven"
          name="Steven de Roos"
          role="Mechanical Engineer"
          pic={Steven}
          pic_alt={Steven_alt}
          link={linkSteven}
        />,
        <TeamMember
          key="Jayden"
          name="Jayden de Boer"
          role="Mechanical Engineer"
          pic={Jayden}
          pic_alt={Jayden_alt}
          link={linkJayden}
        />,
      ],
    },
    {
      id: "structural",
      preEmphasis: "The ",
      emphasis: "structural ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Daan2"
          name="Daan Bruger"
          role="Structural Engineer"
          pic={Daan}
          pic_alt={Daan_alt}
          link={linkDaan}
        />,
        <TeamMember
          key="Etjen"
          name="Etjen Reme"
          role="Structural Engineer Intern"
          pic={Etjen}
          pic_alt={Etjen_alt}
          link={linkEtjen}
        />,
      ],
    },
    {
      id: "strategy",
      preEmphasis: "The ",
      emphasis: "strategy ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="TimoJ"
          name="Timo Jolman"
          role="Strategist"
          pic={Timo_J}
          pic_alt={Timo_J_alt}
          link={linkTimoJ}
        />,
        <TeamMember
          key="Lorenzo"
          name="Lorenzo Zambelli"
          role="Strategist"
          pic={Lorenzo}
          pic_alt={Lorenzo_alt}
          link={linkLorenzo}
        />,
      ],
    },
    {
      id: "electronics",
      preEmphasis: "The ",
      emphasis: "electronics ",
      postEmphasis: "team",
      members: [
        <TeamMember
          key="Yannick"
          name="Yannick Meijer"
          role="Electrical Engineer"
          pic={Yannick}
          pic_alt={Yannick_alt}
          link={linkYannick}
        />,
        <TeamMember
          key="Rolf"
          name="Rolf Kok"
          role="Electrical Engineer"
          pic={Rolf}
          pic_alt={Rolf_alt}
          link={linkRolf}
        />,
        <TeamMember
          key="Gratas"
          name="Gratas Kanord"
          role="Electrical Engineer"
          pic={Gratas}
          pic_alt={Gratas_alt}
          link={linkGratas}
        />,
        <TeamMember
          key="Mohammed"
          name="Mohammed Sharifpour"
          role="Electrical Engineer"
          pic={Mohammed}
          pic_alt={Mohammed_alt}
          link={linkMohammed}
        />,
      ],
    },
  ];

  // Separate section for the coach/team mentor
  const coachSection = {
    id: "coach",
    preEmphasis: "The ",
    emphasis: "mentor",
    postEmphasis: "",
    members: [
      <TeamMember
        key="Erik"
        name="Erik Westerhoff"
        role="Team Mentor"
        pic={Erik}
        pic_alt={Erik_alt}
        link={linkErik}
      />,
    ],
  };

  // Shuffle the team sections (excluding the coach) if desired
  const shuffledTeamSections = [...teamSectionsData].sort(
    () => Math.random() - 0.5
  );
  return (
    <>
      {/* Hero Section with team25.webp as the background */}
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
        {/* Optional overlay for improved text contrast */}
        <div className="absolute inset-0 bg-black opacity-50" style={{ transform: "translateY(-10%)" }} ></div>
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

      {/* Introduction Section */}
      <section className="container mx-auto py-12" data-aos="fade-up">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Meet our <span className="text-[var(--green2)]">/team</span>
          </h1>
          <h2 className="mt-4 text-lg text-gray-700">
            We are Top Dutch Solar Racing, a driven student team from Groningen.
            What makes us unique is that we are the only team in the Netherlands
            whose members come from different levels of education (MBO, HBO,
            WO). Together we are building a solar-powered car from scratch with
            the goal of winning the Bridgestone World Solar Challenge.
          </h2>
        </div>
      </section>

      {/* Navigation Bar */}
      <NavigationMenu sections={navSections} />

{/* Render all team sections wrapped in Tailwind-styled div containers */}
{shuffledTeamSections.map((section) => (
  <div
    key={section.id}
    className="w-4/5 mx-auto my-24 p-6 bg-gray-200 rounded-3xl"
  >
    <TeamSection
      id={section.id}
      preEmphasis={section.preEmphasis}
      emphasis={section.emphasis}
      postEmphasis={section.postEmphasis}
      members={section.members}
    />
  </div>
))}

{/* Render the coach section wrapped in a Tailwind-styled div container */}
<div className="w-3/5 mx-auto my-8 p-6 bg-gray-200 rounded-lg shadow-sm">
  <TeamSection
    id={coachSection.id}
    preEmphasis={coachSection.preEmphasis}
    emphasis={coachSection.emphasis}
    postEmphasis={coachSection.postEmphasis}
    members={coachSection.members}
  />
</div>


    </>
  );
}

export default Teams;
