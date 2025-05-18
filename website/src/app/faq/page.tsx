import React from "react";
import FAQContent from "./FAQ";
import Navbar from "../util/navbar";
import Footer from "../util/footer";
import ScrollContainer from "../util/ScrollContainer";

export default function Home() {
    return (
      <main>
        <ScrollContainer>
          <Navbar />
          <FAQContent />
          <Footer />
        </ScrollContainer>
      </main>
    );
  }