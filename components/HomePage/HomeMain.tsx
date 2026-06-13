'use client'
import Hero from "./Hero";
import CockTail from "./CockTail";
import Chef from "./Chef";
import Reservation from "./Reservation";
import HomeAbout from "./HomeAbout";
import HomeBanner from "./HomeBanner";
import LocationInfo from "./LocationInfo";


const HomeMain = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="relative w-full z-0">
        <Hero />
      </div>
      <div className="relative w-full z-10">
        <HomeAbout />
        <HomeBanner source="/PhooRes/Building/building-Three.png" />
        <LocationInfo />
        <HomeBanner source="/PhooRes/Building/Jhamsikhel.jpg" />
        <CockTail />
        <Chef />
        <Reservation />
      </div>
    </div>
  );
};

export default HomeMain;
