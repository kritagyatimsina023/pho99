"use client";

import React, { useRef, useCallback } from "react";
import Heading from "../Heading";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CrystalLineSVG from "../CrystalLineSVG";

import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const saltCrystals = [
  {
    top: "50%",
    right: "15%",
    mobTop: "75%",
    mobRight: "5%",
    width: 350,
    rotate: 0,
    source: "/PhooRes/Building/JhamshiKhel.png",
    crystalSrc: "/Slider/CrystalThree.svg",
  },
  {
    top: "10%",
    left: "12%",
    mobTop: "5%",
    mobLeft: "2%",
    width: 410,
    rotate: -8,
    source: "/PhooRes/Building/White-NewCrystal.png",
    crystalSrc: "/Slider/CrystalFour.svg",
  },
  {
    top: "55%",
    left: "58%",
    mobTop: "35%",
    mobLeft: "80%",
    width: 88,
    rotate: -15,
    source: "/PhooRes/Building/Flag.png",
    crystalSrc: "/Slider/CrystalFive.svg",
  },
];




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

const LocationInfo = () => {
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
  const isMobile = useMediaQuery({
    maxWidth: 768
  })


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

        invalidateOnRefresh: true,
      },
    });
    tl.fromTo(
      crystalWrapper.current,
      { scale: 0 },
      { scale: 1, ease: "power2.out" },
    )

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
            className="absolute z-10 pointer-events-none select-none opacity-90 max-w-[40vw] md:max-w-none"
            style={{
              top: isMobile ? (s as any).mobTop || s.top : s.top,
              bottom: isMobile ? (s as any).mobBottom || (s as any).bottom : (s as any).bottom,
              left: isMobile ? (s as any).mobLeft || s.left : s.left,
              right: isMobile ? (s as any).mobRight || s.right : s.right,
              width: s.width,
              transform: `rotate(${s.rotate}deg)`,
            }}
          />
        ))}
      </div>


      <div className="flex relative h-dvh z-20 flex-col items-center justify-center py-32">
        {/* Major content */}
        <div ref={contentWrapper} className="flex flex-col items-center justify-center">

          <Heading className="text-center text-5xl! md:text-7xl! lg:text-8xl! px-4 md:px-0 heading-secondary">
            Four Locations, <br /> One Vietnamese Journey
          </Heading>

        </div>
      </div>
      <div
        ref={courseWrapperRef}
        className="absolute inset-0 z-30 w-full h-dvh"
        style={{ opacity: 0 }}
      >

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
              className="absolute pointer-events-none select-none opacity-20 w-16 h-16 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px]"
              style={{
                top: isMobile ? (s as any).mobTop || s.top : s.top,
                bottom: isMobile ? (s as any).mobBottom || (s as any).bottom : (s as any).bottom,
                left: isMobile ? (s as any).mobLeft || s.left : s.left,
                right: isMobile ? (s as any).mobRight || s.right : s.right,
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

              <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full h-full pb-16 pt-32 md:pb-20 md:pt-40">
                  <div className="flex flex-col w-full md:w-2/3 origin-left">
                    <span className="text-white! font-bold tracking-[0.2em] uppercase text-sm mb-4">
                      LOCATION.
                    </span>
                    <Heading ref={(el) => { titleRefs.current[idx] = el; }} className="text-5xl md:text-[7rem] lg:text-[11rem] font-serif text-white! uppercase leading-[0.9]">
                      {images.title}
                    </Heading>
                  </div>

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

export default LocationInfo;
