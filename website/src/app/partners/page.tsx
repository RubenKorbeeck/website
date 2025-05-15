"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Navbar from "../util/navbar";
import Footer from "../util/footer";

// Import logos
//import boikon from "../../pictures/partners/boikon.svg";

// Green Logos.
import rug from "../../pictures/partners/rug.svg";
import hanze from "../../pictures/partners/hanze.svg";
import akkoordVanGroningen from "../../pictures/partners/vangroningen.svg";
import provincieGroningen from "../../pictures/partners/provincie-groningen.svg";

// Platinum Logos.
import oldenburgerFritom from "../../pictures/partners/oldernburg.svg";
import seatrade from "../../pictures/partners/seatrade-main-white.png";
import greatwaves from "../../pictures/partners/greatwaves.svg";
import fokkerGKN from "../../pictures/partners/fokker.svg";
import kampencare from "../../pictures/partners/kampencare.svg";

// Gold Logos
import bionicSurfaces from "../../pictures/partners/bionic.svg";
import rdw from "../../pictures/partners/RDW.svg";
import sony from "../../pictures/partners/sony.svg";
import gemeenteAssen from "../../pictures/partners/assen.svg";
import cableMasters from "../../pictures/partners/cablemasters.svg";
import pouwrent from "../../pictures/partners/pouw.svg";
import rabobank from "../../pictures/partners/rabobank.svg";
import koopman from "../../pictures/partners/koopman.svg";
import viro from "../../pictures/partners/viro.svg";
import ansys from "../../pictures/partners/ansys.svg";
import destic from "../../pictures/partners/destic.png";
import vanderVijgh from "../../pictures/partners/houtindustrieVanDerVijgh.png";

// Silver Logos.
import indi from "../../pictures/partners/indi.svg";
import meilink from "../../pictures/partners/meilink.svg";
import mabutex from "../../pictures/partners/mabutex.svg";
import nedcam from "../../pictures/partners/nedcam.svg";
import abscylinders from "../../pictures/partners/abscylinders.svg";
import trip from "../../pictures/partners/trip.svg";

// Bronze Logos.
import loxam from "../../pictures/partners/loxam.svg";
import jbc from "../../pictures/partners/jbc.svg";
import omnyacc from "../../pictures/partners/omnyacc.svg";
import koar from "../../pictures/partners/ko-ar.svg";
import raytek from "../../pictures/partners/raytek.svg";
import kvaser from "../../pictures/partners/kvaser.svg";
import easycomposites from "../../pictures/partners/easy-composites.svg";
import altium from "../../pictures/partners/altium.svg";
import jolron from "../../pictures/partners/jolron.png";
import d3suspension from "../../pictures/partners/d3suspension.svg";
import bridgestone from "../../pictures/partners/bridgestone.svg";
import fluctus from "../../pictures/partners/fluctus.svg";
import eurocircuits from "../../pictures/partners/eurocircuits.svg";
import makerspace from "../../pictures/partners/makerspace.svg";
import tpee from "../../pictures/partners/TPEE.svg";
import canon from "../../pictures/partners/canon.svg";
import stm from "../../pictures/partners/stm.svg";
import deBoer from "../../pictures/partners/de-boer-bouwmanagement.svg";
import juk from "../../pictures/partners/juk-bronze.png";
import folieTotaal from "../../pictures/partners/folieTotaal.png";
import rtvNoord from "../../pictures/partners/rtvnoord.webp";
import salomons from "../../pictures/partners/salomon.svg";
import avitec from "../../pictures/partners/avitec.svg";
import tweb from "../../pictures/partners/tweb.svg";
import gemeenteLeeuwarden from "../../pictures/partners/gemeente-leeuwarden.svg";


const tiers = [
  {
    title: "GREEN PARTNERS",
    gradient:
      "linear-gradient(to bottom, #0a0a0a 0%, rgb(0, 90, 0) 10%, rgb(0, 128, 0) 50%, rgb(0, 90, 0) 70%, #0a0a0a 100%)",
    opacity: "20",
    columns: 4,
    size: { width: 300, height: 200 },
    logos: [
      { src: hanze, label: "Hanze University of Applied Sciences" },
      { src: rug, label: "University of Groningen" },
      { src: akkoordVanGroningen, label: "Akkoord van Groningen" },
      { src: provincieGroningen, label: "Provincie Groningen" }
    ],
  },
  {
    title: "PLATINUM PARTNERS",
    gradient:
      "linear-gradient(to bottom, #0a0a0a 20%, rgb(54, 112, 131) 35%, rgb(84, 168, 196) 45%, rgb(54, 112, 131) 60%, #0a0a0a 95%)",
    opacity: "20",
    columns: 3,
    size: { width: 200, height: 100 },
    logos: [
      { src: oldenburgerFritom, label: "Oldenburger Fritom" },
      { src: seatrade, label: "Seatrade" },
      { src: greatwaves, label: "Greatwaves" },
      { src: fokkerGKN, label: "Fokker GKN" },
      { src: kampencare, label: "KampenCare" },
    ],
  },
  {
    title: "GOLD PARTNERS",
    gradient:
      "linear-gradient(to bottom, #0a0a0a 0%, #b8860b 25%, #ffd700 65%, #b8860b 80%, #0a0a0a 100%)",
    opacity: "20",
    columns: 6,
    size: { width: 140, height: 70 },
    logos: [
      { src: bionicSurfaces, label: "" },
      { src: rdw, label: "" },
      { src: sony, label: "" },
      { src: gemeenteAssen, label: "" },
      { src: cableMasters, label: "" },
      { src: pouwrent, label: "" },
      { src: rabobank, label: "" },
      { src: koopman, label: "" },
      { src: viro, label: "" },
      { src: ansys, label: "" },
      { src: destic, label: "" },
      { src: vanderVijgh, label: "" },
    ],
  },
  {
    title: "SILVER PARTNERS",
    gradient:
      "linear-gradient(to bottom, #0a0a0a 15%, #a9a9a9 40%, #c0c0c0 50%, #a9a9a9 55%, #0a0a0a 90%)",
    opacity: "20",
    columns: 6,
    size: { width: 140, height: 70 },
    logos: [
      { src: indi, label: "" },
      { src: meilink, label: "" },
      { src: mabutex, label: "" },
      { src: nedcam, label: "" },
      { src: abscylinders, label: "" },
      { src: trip, label: "" },
    ],
  },
  {
    title: "BRONZE PARTNERS",
    gradient:
      "linear-gradient(to bottom, #0a0a0a 0%, #8c6239 10%, #cd7f32 50%, #8c6239 65%, #0a0a0a 100%)",
    opacity: "20",
    columns: 6,
    size: { width: 140, height: 70 },
    logos: [
      { src:loxam, label: "" },
      { src:jbc, label: "" },
      { src:omnyacc, label: "" },
      { src:koar, label: "" },
      { src:raytek, label: "" },
      { src:kvaser, label: "" },
      { src:easycomposites, label: "" },
      { src:altium, label: "" },
      { src:jolron, label: "" },
      { src:d3suspension, label: "" },
      { src:bridgestone, label: "" },
      { src:fluctus, label: "" },
      { src:eurocircuits, label: "" },
      { src:makerspace, label: "" },
      { src:tpee, label: "" },
      { src:canon, label: "" },
      { src:stm, label: "" },
      { src:deBoer, label: "" },
      { src:juk, label: "" },
      { src:folieTotaal, label: "" },
      { src:rtvNoord, label: "" },
      { src:salomons, label: "" },
      { src:avitec, label: "" },
      { src:tweb, label: "" },
      { src:gemeenteLeeuwarden, label: "" },
    ],
  },
];

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-light">
      <Navbar showLogoImmediately/>
      <main className="flex flex-col items-center">
        {tiers.map((tier, index) => (
          <PartnerSection
            key={index}
            title={tier.title}
            gradient={tier.gradient}
            opacity={tier.opacity}
            columns={tier.columns}
            size={tier.size}
            logos={tier.logos}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

type PartnerLogo = {
  src: StaticImageData;
  label: string;
};

type PartnerSectionProps = {
  title: string;
  gradient: string;
  opacity: string;
  columns: number;
  size: {width: number; height: number};
  logos: PartnerLogo[];
};



function PartnerSection({ title, gradient, opacity, logos }: PartnerSectionProps) {
  return (
    <section className="relative w-full py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <div
          className={"w-[10000px] h-[350px] blur-2 xl"}
          style={{ 
            backgroundImage: gradient, 
            opacity: Number(opacity) / 100,
          }}
        />
      </div>

      {/* Title section for a partner category. Change font here.*/}
      <h2 className="relative z-10 text-4xl font-thin font-sans text-center text-white mb-14 uppercase">
        {title}
      </h2>

      {/**/}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 px-2">
        {logos.map((logo, index) => {
          const showHover = 
            title === "GREEN PARTNERS" || title === "PLATINUM PARTNERS";
        return (
          <div
            key={index}
            className="group relative flex items-center justify-center overflow-hidden hover:scale-125 transition-transform duration-300 w-20 h-10 sm:w-28 sm:h-14 md:w-36 md:h-20"
          >
            {/* Image section. */}
            <Image
              src={logo.src}
              alt={logo.label}
              fill
              className={`absolute transition-opacity duration-200 brightness-0 filter invert ${showHover ? "group-hover:opacity-0" : ""}`}
            />
            {showHover && (
            <span className="absolute text-sm text-white text-center px-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              {logo.label}
            </span>
            )}
          </div>
        )})} 
      </div>
    </section>
  );
}