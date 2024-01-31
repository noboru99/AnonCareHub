// import React from "react";
import MainHeader from "../../components/MainHeader/index";
import MainSiteIntro from "../../components/MainSiteIntro/index";
import MainReviewSection from "../../components/MainReviewSection/index";
import HeroSection from "../../components/HeroSection";
import MainMonitorEmotion from "../../components/MainMonitorEmotion";
import "../../styles/Landing.scss";
const LandingPage = () => {
  return (
    <section className="landing-section">
      <div>
        <HeroSection />
      </div>
      <div>
        <MainHeader />
      </div>
      <div>
        <MainSiteIntro />
      </div>
      <div>
        <MainReviewSection />
      </div>
      <div>
        <MainMonitorEmotion />
      </div>
    </section>
  );
};

export default LandingPage;
