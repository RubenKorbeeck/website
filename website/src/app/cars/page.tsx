"use client";
import React from "react";
import Navbar from "../util/navbar";
import ThreeCarScene from "./threeCarScene";
import Footer from "../util/footer";
import ScrollContainer from "../util/ScrollContainer";

export default function Home() {
  return (
    <div>
      <Navbar showLogoImmediately/>
      <ScrollContainer>
        <ThreeCarScene/>
        <Footer/>
      </ScrollContainer>
    </div>
  );
}