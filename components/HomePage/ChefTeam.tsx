"use client";

import Image from "next/image";
import React, { useState } from "react";

const chefTeamData = [
  {
    id: 1, name: "Nino Tsiklauri", specialist: "Dough Alchemist",
    location: "Georgia",
    source: "/Chef/nino_tsiklauri.webp",
    left: "-10%", top: "38%", bottom: "", width: 780, height: 780
  },
  {
    id: 2,
    name: "Amir el-asih",
    specialist: "Fire & Spice Sage",
    location: "Egypt",
    source: "/Chef/amir_el-masih.webp",
    right: "5%",
    bottom: "",
    top: "45%", width: 540, height: 540
  },
  {
    id: 3, name: "Luca De Sanctis", specialist: "Seafood Virtuoso", location: "Italy", source: "/Chef/luca_de_sanctis.webp",
    left: "2%",
    bottom: "",
    top: "60%",
    width: 440,
    height: 440
  },
  {
    id: 4, name: "Sofia Martino", specialist: " Desert Sorceress", location: "Greece", source: "/Chef/sofia_martino.webp",
    right: "5%",
    bottom: "45%",
    width: 440,
    height: 440
  },
  {
    id: 5, name: "David Bagrationi", specialist: "Fermentation Maestro", location: "Georgia", source: "/Chef/david_bagrationi.webp",
    bottom: "62%",
    left: "5%",
    width: 440,
    height: 440
  }
]

const ChefTeam = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return <section className="min-h-screen relative bg-section-bg">
    <div className="h-full  absolute top-0 left-30 w-0.5 bg-[#E1DED5]/5"></div>
    <div className="h-full  absolute top-0 left-[30%] w-0.5 bg-[#E1DED5]/5"></div>
    <div className="h-full  absolute top-0 right-72 w-0.5 bg-[#E1DED5]/5"></div>
    <div className="flex items-center flex-col relative justify-center py-30" >
      <h2>The Chef Team</h2>
      <div className="flex flex-col" >
        {chefTeamData.map((item, i) => (
          <div
            key={item.id}
            className={`flex   items-center flex-col cursor-pointer   ${hoveredId === item.id ? "z-50" : "z-10"}`}

          >
            <div
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="flex flex-col    group  items-center">
              <h1 className={`uppercase text-8xl! ${hoveredId === item.id ? "text-about-bg!" : "transparent-heading"} 
               transition-all ease-linear duration-300 relative z-20`}>{item.name}</h1>
              <div className="flex flex-col items-center -translate-y-3 relative z-20" >
                <span className="transparent-heading text-xl! transition-colors duration-300 ease-linear group-hover:text-white">{item.specialist}</span>
                <span className="transparent-heading text-xl! transition-colors duration-300
               group-hover:text-white">({item.location})</span>
              </div>
              <div
                style={{
                  // top: item.top ? `${item.top}` : ""
                  top: item.top ?? "50%",
                  bottom: item.bottom ?? "",
                  left: item.left ?? "",
                  right: item.right ?? "30%"
                }}
                className={`absolute -translate-y-1/2  
            transition-all 
            duration-500 pointer-events-none z-10 ${hoveredId === item.id ? "opacity-100" : "opacity-0"}`} >
                <Image src={item.source} alt="image"
                  width={item.width ? item.width : 520}
                  height={item.height ? item.height : 520}
                  className="object-cover rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>;
};

export default ChefTeam;
