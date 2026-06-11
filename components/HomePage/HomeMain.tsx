'use client'
import React from "react";
import Hero from "./Hero";
import AboutMain from "./AboutMain";
import HomeBanner from "./HomeBanner";
// import SaltMain from "./SaltMain";
import HomeBannerTwo from "./HomeBannerTwo";
import CockTail from "./CockTail";
import Chef from "./Chef";
import ChefTeam from "./ChefTeam";
import Reservation from "./Reservation";
import Footer from "@/layout/Footer";
import NewAboutMain from "./NewAboutMain";
import NewSaltMain from "./NewSaltMain";
import NewFooter from "@/layout/NewFooter";

import DoorFooter from "@/layout/DoorFooter";


const HomeMain = () => {
  return (
    <>
      <div className="relative w-full z-0">
        <Hero />
      </div>
      <div className="relative w-full z-10 ">
        {/* <AboutMain /> */}
        <NewAboutMain />
        {/* <HomeBanner /> */}
        <HomeBannerTwo source="/PhooRes/Building/building-Three.png" />
        {/* <SaltMain /> */}
        <NewSaltMain />
        <HomeBannerTwo source="/PhooRes/Building/Jhamsikhel.jpg" />
        <CockTail />
        <Chef />
        {/* <ChefTeam /> */}
        <Reservation />
        {/* <Footer /> */}
        {/* <NewFooter /> */}
        {/* <DoorFooter /> */}
      </div>
    </>
  );
};

export default HomeMain;
