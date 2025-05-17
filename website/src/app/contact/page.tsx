import Contact from "./contact";
import Navbar from "../util/navbar";
import Footer from "../util/footer";

export default function Home() {
    return (
      <main>
        <Navbar showLogoImmediately/>
        <Contact />
        <Footer />
      </main>
    );
  }