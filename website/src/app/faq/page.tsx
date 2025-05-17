import React from "react";
import FAQContent from "./FAQ";
import Navbar from "../util/navbar";
import Footer from "../util/footer";

export default function Home() {
    return (
      <main>
        <Navbar />
        <FAQContent />
        <Footer />
      </main>
    );
  }