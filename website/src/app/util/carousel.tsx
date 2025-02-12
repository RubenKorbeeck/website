import "./TeamScroll.scss";
// import AOS
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GT from "../../pictures/GreenThunder.webp";

function TeamScroll() {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const portraits = [
    GT
   ];


  const portraitsList = portraits.map((portrait, index) => {
    return (
      <div className="slide" key={portrait}>
        <img
         src={portrait}
         alt="Portrait"
         className="portrait"
         width={isSmallScreen ? "200rem" : "350rem"}
         loading="eager"
         effect="blur"
        />
      </div>
    );
  });
  return (
    <>
      <div className="section-title">
        <h1>
          Meet the <text className="emphasis"> /people </text> <br></br>
          <h2>
            That will <text className=""> get us </text> there
          </h2>
        </h1>
      </div>
      <div className="container-fluid team overflow-hidden">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-12 slider">
            <div className="slide-track">
              {portraitsList}
            </div>
          </div>
          <Link to="/team25">
            <span className="title">
              <h1 data-aos="fade-right" data-aos-duration="1000">
                TEAM{" "}
              </h1>
              <h1 data-aos="fade-left" data-aos-duration="1000">
                <text className="emphasis"> /25</text>
              </h1>
            </span>{" "}
          </Link>
        </div>
      </div>
    </>
  );
}

export default TeamScroll;