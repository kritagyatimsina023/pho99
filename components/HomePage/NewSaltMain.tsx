"use client";

import React, { useRef, useCallback } from "react";
import Heading from "../Heading";
// import Button from "../Button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "../Button";
import CrystalLineSVG from "../CrystalLineSVG";

gsap.registerPlugin(ScrollTrigger);

const saltCrystals = [
  // {
  //   top: "5%",
  //   left: "2%",
  //   width: 100,
  //   rotate: -15,
  //   source: "/PhooRes/Building/White-NewCrystal.png",
  //   crystalSrc: "/Slider/CrystalS.svg",
  // },
  // {
  //   top: "4%",
  //   left: "30%",
  //   width: 110,
  //   rotate: 8,
  //   source: "/About/Salt/salt_cold_2.webp",
  //   crystalSrc: "/Slider/CrystalTwo.svg",
  // },
  {
    top: "50%",
    right: "15%",
    width: 350,
    rotate: 0,
    source: "/PhooRes/Building/JhamshiKhel.png",
    crystalSrc: "/Slider/CrystalThree.svg",
  },
  {
    top: "10%",
    left: "12%",
    width: 410,
    rotate: -8,
    source: "/PhooRes/Building/White-NewCrystal.png",
    crystalSrc: "/Slider/CrystalFour.svg",
  },
  {
    top: "55%",
    left: "58%",
    width: 88,
    rotate: -15,
    source: "/PhooRes/Building/Flag.png",
    crystalSrc: "/Slider/CrystalFive.svg",
  },
  // {
  //   top: "4%",
  //   right: "4%",
  //   width: 80,
  //   rotate: 15,
  //   source: "/PhooRes/Building/NewCrystalImage.png",
  //   crystalSrc: "/Slider/CrystalSix.svg",
  // },
  // {
  //   bottom: "2%",
  //   right: "6%",
  //   width: 220,
  //   rotate: 10,
  //   source: "/PhooRes/Building/Flag.png",
  //   crystalSrc: "/Slider/CystalSix.svg",
  // },
];

const SVGImage = [
  {
    id: 1,
    source: "/About/Salt/S.svg",

    title: "Stories",
    desc: "stories of the silk road, salt caravans and fishing villages",
  },
  {
    id: 2,
    source: "/About/Salt/A.svg",

    title: "Art",
    desc: "serving on salt slabs, decor made of crystals from the Himalayas and the Dead Sea",
  },
  {
    id: 3,
    source: "/About/Salt/L.svg",
    width: "10vw",
    height: "9vw",
    title: "Legacy",
    desc: `recipes preserved as salt -  Georgian adzhika, Egyptian dukka,  Provencal herbs
Taste
playing with salty accents: marinated olives, ferme`,
  },
  {
    id: 4,
    source: "/About/Salt/T.svg",

    title: "Taste",
    desc: "playing with salty accents: marinated olives, fermented cheeses, sea salt caramel",
  },
];

// const Courses = [
//   {
//     id: 1,
//     // headingOne: "Course I",
//     title: "Lazimpat",
//     // desc: `Tuna with pomegranate and Egyptian dukkah Mediterranean tuna marinated in lemon juice, garnished with pomegranate grains and Gorgian tkemali sauce`,  
//     desc: `Authentic Vietnamese cuisine crafted from cherished family recipes, creating a welcoming dining experience in the heart of Lazimpat.`,
//     // footerPart: `Lightness - Birth of a Dialouge`,
//     src: "/PhooRes/Building/heroBuildingOne.jpg",
//   },
//   {
//     id: 2,
//     // headingOne: "Course II",
//     title: "Boudha",
//     // desc: `Charred octopus with black garlic and saffron cream Tender octopus slowly grilled over open flame, paired with silky saffron cream and finished with aromatic black garlic essence`,
//     desc: `A cherished Vietnamese restaurant known for authentic pho, traditional family recipes, and a welcoming dining experience.`,
//     // footerPart: "Mystery - Fiery Palette",
//     src: "/PhooRes/Building/Bouddha.jpg",
//   },
//   {
//     id: 3,
//     // headingOne: "Course III",
//     title: "Jhamsikhel",
//     // desc: `Seared sea bass with citrus herbs and coastal greens Fresh sea bass pan-seared to perfection, accompanied by fragrant herbs, vibrant greens and a delicate citrus glaze`, 
//     desc: `Nestled in Jhamsikhel, this welcoming space combines authentic Vietnamese flavors with a relaxing garden and indoor dining experience.`,
//     // footerPart: "Energy - synthesis of Elements",
//     src: "/PhooRes/Building/Jhamsikhel.jpg",
//   },
//   {
//     id: 4,
//     // headingOne: "Course IV",
//     title: "Thamel",
//     // desc: `Red mullet with Georgian spices and Mediterranean olives Delicate red mullet infused with traditional spices, served alongside marinated olives and rich regional flavours`,
//     desc: `A warm Vietnamese dining destination in Thamel, offering traditional flavors, exceptional hospitality, and a memorable experience.`,
//     // footerPart: "Unity - Earth and sea",
//     src: "/PhooRes/Building/Thamel.jpeg",
//   },
//   // {
//   //   id: 5,
//   //   headingOne: "Course V",
//   //   title: "Sunset over the ocean",
//   //   desc: `Salted caramel mousse with figs and orange blossom Silky caramel mousse layered with sweet figs, accented by orange blossom aromas and a touch of sea salt`,
//   //   footerPart: "Finale - of a symphony",
//   //   src: "/Slider/Course-5.webp",
//   // },
// ];

const Courses = [
  {
    id: 1,
    title: "Lazimpat",
    desc: `Located in the heart of Lazimpat, Pho99 introduced Kathmandu to authentic Vietnamese cuisine through cherished family recipes. Known for its comforting bowls of pho and warm hospitality, it has become a favorite destination for locals, expatriates, and visitors alike.`,
    src: "/PhooRes/Building/heroBuildingOne.jpg",
  },
  {
    id: 2,
    title: "Boudha",
    desc: `Situated near the iconic Boudhanath Stupa, Pho99 Boudha offers a welcoming dining experience inspired by the rich flavors of Vietnam. Surrounded by the area's vibrant cultural atmosphere, it attracts both travelers and locals seeking authentic cuisine.`,
    src: "/PhooRes/Building/Bouddha.jpg",
  },
  {
    id: 3,
    title: "Jhamsikhel",
    desc: `Located in the vibrant neighborhood of Jhamsikhel, this charming outlet features cozy indoor seating and a beautiful courtyard garden. Its warm ambiance and authentic Vietnamese dishes make it an ideal setting for gatherings, casual meals, and special occasions.`,
    src: "/PhooRes/Building/Jhamsikhel.jpg",
  },
  {
    id: 4,
    title: "Thamel",
    desc: `Set in Kathmandu's bustling tourist district, Pho99 Thamel provides a welcoming retreat amidst the energy of the city. Surrounded by shops, cafés, and cultural attractions, it offers guests authentic Vietnamese flavors in a lively and memorable atmosphere.`,
    src: "/PhooRes/Building/Thamel.jpeg",
  },
];

const NewSaltMain = () => {
  const courseTrackRef = useRef<HTMLDivElement>(null);
  const courseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const crystalRef = useRef<(HTMLImageElement | null)[]>([]);
  const crystalWrapper = useRef<HTMLDivElement | null>(null);
  const saltInfoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentWrapper = useRef<HTMLDivElement | null>(null);
  const crystalBgRef = useRef<HTMLDivElement | null>(null);
  const courseWrapperRef = useRef<HTMLDivElement | null>(null);
  const svgCrystalRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paraRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useGSAP(() => {
    const track = courseTrackRef.current;
    if (!track || !crystalRef.current || !svgCrystalRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * Courses.length}`,
        pin: true,
        scrub: 1.5,
        pinSpacing: true,
        // markers: true,
        invalidateOnRefresh: true,
      },
    });
    tl.fromTo(
      crystalWrapper.current,
      { scale: 0 },
      { scale: 1, ease: "power2.out" },
    )
    // tl.to(contentWrapper.current, { opacity: 0 }, "<+=0.1");
    saltInfoRefs.current.forEach((infoEl, i) => {
      if (!infoEl) return;
      tl.fromTo(
        infoEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out" },
      );
      if (i < saltInfoRefs.current.length - 1) {
        tl.to(infoEl, {
          opacity: 0,
          y: -20,
          ease: "power2.in",
        });
      }
    });

    tl.to(crystalBgRef.current, { x: "-100vw", ease: "none" }, "transition")
      .to(crystalWrapper.current, { x: "-100vw", ease: "none" }, "transition")
      .fromTo(
        courseWrapperRef.current,
        { x: "100vw", opacity: 1 },
        { x: "0vw", opacity: 1, ease: "none" },
        "transition",
      );

    // Zoom in and fade out each course to reveal the next
    courseRefs.current.forEach((courseEl, index) => {
      if (!courseEl) return;
      if (index === courseRefs.current.length - 1) return;

      const titleEl = titleRefs.current[index];
      const imgEl = imageRefs.current[index];
      const paraEl = paraRef.current[index]
      if (titleEl) {
        tl.to(
          titleEl,
          {
            scale: 3,
            opacity: 0,
            ease: "power2.in",
            duration: 1.35,
          },
          "+=0.1"
        )
      }

      if (imgEl) {
        tl.to(
          imgEl,
          {
            scale: 3,
            opacity: 0,
            filter: "blur(20px)",
            ease: "power2.in",
            duration: 1.35,
          },
          "<+=0.2"
        );
      }
      tl.to(
        courseEl,
        {
          opacity: 0,
          ease: "power2.in",
          duration: 1.35,
        },
        "<"
      );
    });

    // Crystal parallax (independent ScrollTrigger)
    crystalRef.current.forEach((el, i) => {
      if (!el) return;
      const direction = i % 2 === 0 ? -1 : 1;
      const speed = 20 + (i % 3) * 15;
      gsap.fromTo(
        el,
        { yPercent: speed * direction * -1 },
        {
          yPercent: speed * direction,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            // end: "bottom top",
            end: () => `+=${window.innerHeight * Courses.length}`,
            scrub: 1.5,
          },
        },
      );
    });
    // svgCrystalRef.current.forEach((el, i) => {
    //   if (!el) return;
    //   const direction = i % 2 === 0 ? -1 : 1;
    //   const speed = 20 + (i % 3) * 25;
    //   gsap.fromTo(
    //     el,
    //     { yPercent: speed * direction * -1 },
    //     {
    //       yPercent: speed * direction,
    //       ease: "none",
    //       scrollTrigger: {
    //         trigger: el,
    //         start: "top bottom",
    //         // end: "bottom top",
    //         end: () => `+=${window.innerHeight * Courses.length}`,
    //         scrub: 1.5,
    //       },
    //     },
    //   );
    // });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative bg-black! min-h-dvh w-full overflow-hidden"
    >
      {/* Salt crystals background */}
      <div ref={crystalBgRef} className="absolute inset-0 w-full h-full">
        {saltCrystals.map((s, i) => (
          // <CrystalLineSVG key={i} className="absolute inset-0 w-full h-full" />
          <Image
            key={i}
            src={s.source}
            ref={(el) => {
              crystalRef.current![i] = el;
            }}
            width={s.width}
            height={s.width}
            alt=""
            aria-hidden="true"
            className="absolute z-10 pointer-events-none  select-none opacity-90"
            style={{
              top: s.top,
              bottom: (s as any).bottom,
              left: s.left,
              right: s.right,
              width: s.width,
              transform: `rotate(${s.rotate}deg)`,
            }}
          />
        ))}
      </div>
      {/* Salt SVG + Content layer */}
      {/* Salt SVG letters */}
      <div className="flex relative h-dvh z-20 flex-col items-center justify-center py-32">
        {/* Major content */}
        <div ref={contentWrapper} className="flex flex-col items-center justify-center">
          {/* <h2>Join Us Here</h2> */}
          <Heading className="text-center text-8xl! heading-secondary">
            Four Locations, <br /> One Vietnamese Journey
          </Heading>
          {/* <p className="max-w-md pl-5 text-xl mx-auto mt-4 text-para-secondary">
            Step into Pho99 and enjoy a warm, inviting atmosphere inspired by Vietnamese
            hospitality. Whether you're joining us for a quick lunch, a family gathering,
            or an evening meal, every visit is an opportunity to experience authentic
            Vietnamese flavors and genuine hospitality.
          </p> */}
        </div>
      </div>
      <div
        ref={courseWrapperRef}
        className="absolute inset-0 z-30 w-full h-dvh"
        style={{ opacity: 0 }}
      >
        {/* Course crystal decorations */}
        <div className="absolute inset-0 z-0 w-full h-full">
          {saltCrystals.map((s, i) => (
            <Image
              ref={(el) => {
                svgCrystalRef.current[i] = el;
              }}
              key={i}
              src={s.crystalSrc}
              width={120}
              height={120}
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none select-none opacity-20"
              style={{
                top: s.top,
                bottom: (s as any).bottom,
                left: s.left,
                right: s.right,
                transform: `rotate(${s.rotate}deg)`,
              }}
            />
          ))}
        </div>
        <div
          ref={courseTrackRef}
          className="w-full h-full relative z-10"
        >
          {Courses.map((images, idx) => (
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
              style={{ zIndex: Courses.length - idx }}
              key={images.id}
              ref={(el) => { courseRefs.current[idx] = el; }}
            >
              <div className="absolute inset-0 w-full h-full origin-center" ref={(el) => { imageRefs.current[idx] = el; }}>
                <Image
                  src={images.src}
                  alt={images.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/70" />
              </div>

              <div className="relative  z-10 w-full h-full flex flex-col justify-center px-10 md:px-24">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end w-full h-full pb-20 pt-40">
                  <div className="flex flex-col w-full md:w-2/3 origin-left">
                    <span className="text-white! font-bold tracking-[0.2em] uppercase text-sm mb-4">
                      LOCATION.
                    </span>
                    <Heading ref={(el) => { titleRefs.current[idx] = el; }} className="text-7xl md:text-[9rem] lg:text-[11rem] font-serif text-white! uppercase leading-[0.9]">
                      {images.title}
                    </Heading>
                  </div>
                  {/* <div className="flex flex-col mt-10 md:mt-0 w-full md:w-1/3 text-left md:text-right">
                    <span className="text-white! font-serif text-4xl mb-2">Pho99</span>
                    <p ref={(el) => { paraRef.current[idx] = el }} className="text-white! text-sm md:text-base leading-relaxed md:ml-auto max-w-sm text-left">
                      {images.desc}
                    </p>
                  </div> */}
                  {/* Right — Find Us */}
                  <a href={`https://maps.google.com/?q=Pho99+${images.title}+Kathmandu`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center relative z-50 gap-3 group mb-2 pointer-events-auto"
                  >
                    <span className="text-white! text-xs tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
                      Find Us
                    </span>
                    <div className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all duration-300">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewSaltMain;
