"use client";

import React, { useRef, useCallback } from "react";
import Heading from "../Heading";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CrystalLineSVG from "../CrystalLineSVG";

import { useMediaQuery } from "react-responsive";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const saltCrystals = [
  {
    top: "50%",
    right: "15%",
    tabletTop: "55%",
    tabletRight: "10%",
    mobTop: "65%",
    mobRight: "5%",
    width: 350,
    tabletWidth: 250,
    mobWidth: 150,
    rotate: 0,
    source: "/PhooRes/Building/JhamshiKhel.png",
    crystalSrc: "/Slider/CrystalThree.svg",
  },
  {
    top: "10%",
    left: "12%",
    tabletTop: "15%",
    tabletLeft: "5%",
    mobTop: "15%",
    mobLeft: "-5%",
    width: 410,
    tabletWidth: 280,
    mobWidth: 180,
    rotate: -8,
    source: "/PhooRes/Building/White-NewCrystal.png",
    crystalSrc: "/Slider/CrystalFour.svg",
  },
  {
    top: "55%",
    left: "58%",
    tabletTop: "45%",
    tabletLeft: "70%",
    mobTop: "35%",
    mobLeft: "75%",
    width: 88,
    tabletWidth: 70,
    mobWidth: 50,
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
    mapHref: "https://www.google.com/maps?ll=27.725304,85.322856&z=16&t=h&hl=en&gl=NP&mapclient=embed&cid=5968072047316399150",

  },
  {
    id: 2,
    title: "Boudha",
    desc: `Situated near the iconic Boudhanath Stupa, Pho99 Boudha offers a welcoming dining experience inspired by the rich flavors of Vietnam. Surrounded by the area's vibrant cultural atmosphere, it attracts both travelers and locals seeking authentic cuisine.`,
    src: "/PhooRes/Building/Bouddha.jpg",
    mapHref: "https://www.google.com/maps?ll=27.72104,85.361585&z=13&t=h&hl=en&gl=NP&mapclient=embed&cid=17330905215922559191",

  },
  {
    id: 3,
    title: "Jhamsikhel",
    desc: `Located in the vibrant neighborhood of Jhamsikhel, this charming outlet features cozy indoor seating and a beautiful courtyard garden. Its warm ambiance and authentic Vietnamese dishes make it an ideal setting for gatherings, casual meals, and special occasions.`,
    src: "/PhooRes/Building/Jhamsikhel.jpg",
    mapHref: "https://www.google.com/maps?ll=27.677941,85.307323&z=16&t=h&hl=en&gl=NP&mapclient=embed&cid=9912620767158058476",

  },
  {
    id: 4,
    title: "Thamel",
    desc: `Set in Kathmandu's bustling tourist district, Pho99 Thamel provides a welcoming retreat amidst the energy of the city. Surrounded by shops, cafés, and cultural attractions, it offers guests authentic Vietnamese flavors in a lively and memorable atmosphere.`,
    src: "/PhooRes/Building/PhoThamel.png",
    mapHref: "https://www.google.com/maps?ll=27.713582,85.310185&z=15&t=m&hl=en&gl=NP&mapclient=embed&cid=9799723082701011482",

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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getResponsiveValue = (desktop: any, tablet: any, mobile: any) => {
    if (!mounted) return desktop;
    if (isMobile) return mobile !== undefined ? mobile : desktop;
    if (isTablet) return tablet !== undefined ? tablet : desktop;
    return desktop;
  };

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
          autoAlpha: 0,
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
            className="absolute z-10 pointer-events-none select-none opacity-90 transition-all duration-500 ease-in-out max-w-[50vw] md:max-w-none"
            style={{
              top: getResponsiveValue(s.top, (s as any).tabletTop, (s as any).mobTop),
              bottom: getResponsiveValue((s as any).bottom, (s as any).tabletBottom, (s as any).mobBottom),
              left: getResponsiveValue(s.left, (s as any).tabletLeft, (s as any).mobLeft),
              right: getResponsiveValue(s.right, (s as any).tabletRight, (s as any).mobRight),
              width: getResponsiveValue(s.width, (s as any).tabletWidth, (s as any).mobWidth),
              transform: `rotate(${s.rotate}deg)`,
            }}
          />
        ))}
      </div>


      <div className="flex relative h-dvh z-20 flex-col items-center justify-center py-32">
        {/* Major content */}
        <div ref={contentWrapper} className="flex flex-col items-center justify-center">

          <Heading className="text-center text-4xl! sm:text-5xl! md:text-6xl! lg:text-7xl! xl:text-8xl! px-4 md:px-0 heading-secondary leading-[1.2]!">
            Four Locations, <br />
            <span className="red-touch" >
              One Vietnamese
            </span>{" "}
            Journey
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
              className="absolute pointer-events-none select-none opacity-20 transition-all duration-500 ease-in-out w-16 h-16 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px]"
              style={{
                top: getResponsiveValue(s.top, (s as any).tabletTop, (s as any).mobTop),
                bottom: getResponsiveValue((s as any).bottom, (s as any).tabletBottom, (s as any).mobBottom),
                left: getResponsiveValue(s.left, (s as any).tabletLeft, (s as any).mobLeft),
                right: getResponsiveValue(s.right, (s as any).tabletRight, (s as any).mobRight),
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
                  <Link href={images.mapHref}
                    target="_blank"
                    // rel="noopener noreferrer"
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
                  </Link>
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
