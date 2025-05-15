"use client";
import React from "react";
import Navbar from "../util/navbar";
import ThreeCarScene from "./threeCarScene";

export default function Home() {

    return (
      <div>
        <Navbar showLogoImmediately/>
        <ThreeCarScene/>
      </div>
    );
  }