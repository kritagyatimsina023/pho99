'use client'
import Image from "next/image";
import React, { useRef } from "react";
import Heading from "../Heading";
import Buttons from "../Buttons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import Button from "../Button";
const saltCrystals = [
  {
    top: "5%",
    left: "2%",
    width: 100,
    rotate: -15,
    source: "/About/Salt/salt_cold_1_1.webp",
    crystalSrc: "/Slider/CrystalS.svg",

  },
  {
    top: "4%",
    left: "30%",
    width: 110,
    rotate: 8,
    source: "/About/Salt/salt_cold_2.webp",
    crystalSrc: "/Slider/CrystalTwo.svg",

  },
  {
    top: "20%",
    right: "15%",
    width: 150,
    rotate: 0,
    source: "/About/Salt/salt_cold_5.webp",
    crystalSrc: "/Slider/CrystalThree.svg",

  },
  {
    top: "40%",
    left: "12%",
    width: 410,
    rotate: -8,
    source: "/About/Salt/salt_cold_4.webp",
    crystalSrc: "/Slider/CrystalFour.svg",

  },
  {
    top: "55%",
    left: "58%",
    width: 88,
    rotate: -15,
    source: "/About/Salt/salt_cold_6.webp",
    crystalSrc: "/Slider/CrystalFive.svg",

  },
  {
    top: "4%",
    right: "4%",
    width: 80,
    rotate: 15,
    source: "/About/Salt/salt_cold_7.webp",
    crystalSrc: "/Slider/CrystalSix.svg",

  },
  {
    bottom: "2%",
    right: "6%",
    width: 220,
    rotate: 10,
    source: "/About/Salt/salt_cold_3.webp",
    crystalSrc: "/Slider/CrystalS.svg",

  },
];
const Reservation = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const subHeadingRef = useRef<HTMLHeadingElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const paraRef = useRef<HTMLParagraphElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const crystalRef = useRef<HTMLImageElement[] | null>([])
  const imgRef = useRef<HTMLImageElement | null>(null)
  const imgWrapperRefs = useRef<(HTMLDivElement | null)[]>([])
  // useGSAP(() => {
  //   if (!sectionRef.current || !contentRef.current) return;
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top top",
  //       end: "150% top",
  //       scrub: 1,
  //       pin: true,
  //       pinSpacing: true,
  //       markers: true
  //     }
  //   });
  //   tl.fromTo(
  //     contentRef.current,
  //     { clipPath: "circle(0.0% at 50% 100%)" },
  //     { clipPath: "circle(100% at 50% 50%)", ease: "none", duration: 1 }
  //   ).fromTo(subHeadingRef.current,
  //     { opacity: 0 },
  //     { opacity: 1 },
  //   )
  //     .fromTo(headingRef.current,
  //       { opacity: 0 },
  //       { opacity: 0.25, duration: 0.3, ease: "power2.out" },
  //       "+=0.2"
  //     )
  //     .fromTo(headingRef.current,
  //       { opacity: 0.25 },
  //       { opacity: 0.35, duration: 0.3, ease: "power2.out" }, "+=0.2"
  //     )
  //     .fromTo(headingRef.current,
  //       { opacity: 0.35 },
  //       { opacity: 0.45, duration: 0.3, ease: "power2.out" }, "+=0.2"
  //     )
  //     .fromTo(headingRef.current,
  //       { opacity: 0.45 },
  //       { opacity: 1, duration: 0.5, ease: "power2.out" }, "+=0.2"
  //     ).fromTo(paraRef.current,
  //       { opacity: 0 },
  //       { opacity: 0.25, duration: 0.3, ease: "power2.out" }, "+=0.2"
  //     ).fromTo(paraRef.current,
  //       { opacity: 0.25 },
  //       { opacity: 0.45, duration: 0.3, ease: "power2.out" }, "+=0.2"
  //     ).fromTo(paraRef.current,
  //       { opacity: 0.45 },
  //       { opacity: 1, duration: 0.3, ease: "power2.out" }, "+=0.2"
  //     ).fromTo(btnRef.current,
  //       { opacity: 0 },
  //       { opacity: 0.25, duration: 0.3, ease: "power2.out" }, "+=0.2"
  //     ).fromTo(btnRef.current,
  //       { opacity: 0.25 },
  //       { opacity: 0.45, duration: 0.3, ease: "power2.out" }, "+=0.2"
  //     ).fromTo(btnRef.current,
  //       { opacity: 0.45 },
  //       { opacity: 1, duration: 0.3, ease: "power2.out" }, "+=0.2"
  //     )
  // }, []);
  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current || !crystalRef.current) return;
    const fadeIn = (target: gsap.TweenTarget, stages = [0.25, 0.45, 1], offset = "<+=0.1") => {
      const steps: [number, number][] = [[0, stages[0]], ...stages.slice(0, -1).map((v, i) => [v, stages[i + 1]] as [number, number])];
      steps.forEach(([from, to], i) => {
        tl.fromTo(target,
          { opacity: from },
          { opacity: to, duration: i === steps.length - 1 ? 0.2 : 0.2, ease: "power2.out" },
          i === 0 ? offset : undefined
        );
      });
    };

    const tlTwo = gsap.timeline({
      scrollTrigger: {
        trigger: imgRef.current,
        start: "-45% top",
        end: "bottom top",
        scrub: 1,
        // markers: true
      }
    })
    tlTwo.fromTo(imgRef.current, { yPercent: -15, scale: 1.2 }, { yPercent: 15, ease: "none" })
    crystalRef.current.forEach((el, i) => {
      if (!el) return;
      const direction = i % 2 === 0 ? -1 : 1;
      const speed = 20 + (i % 3) * 15;
      gsap.fromTo(el,
        { yPercent: speed * direction * -1 },
        {
          yPercent: speed * direction,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "150% top",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });
    tl.fromTo(contentRef.current,
      { clipPath: "circle(0% at 50% 100%)" },
      { clipPath: "circle(150% at 50% 50%)", ease: "none", duration: 1 }
    );
    tl.fromTo(subHeadingRef.current, { opacity: 0 }, { opacity: 1 });
    fadeIn(headingRef.current, [0.25, 0.35, 0.45, 1]);
    fadeIn(paraRef.current);
    fadeIn(btnRef.current);
    // Scattered images: reveal from center to original position
    imgWrapperRefs.current.forEach((el) => {
      if (!el) return;
      tl.fromTo(
        el,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" },
        "<0.1"
      );
    });
  }, []);

  return <section ref={sectionRef} className="w-full min-h-screen relative z-10 overflow-hidden">
    <div className="absolute inset-0 z-10">
      <Image ref={imgRef} alt="banner-img" fill className="object-cover w-full h-full" src={"/Hero/NewFlowerBanner.png"} />
    </div>
    <div
      style={{ clipPath: "circle(0.0% at 50% 100%)" }}
      ref={contentRef}
      className="bg-white! relative z-20 min-h-screen w-full overflow-hidden"
    >
      {/* Food photo collage — scattered around edges */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">

        {/* Top-left tall photo */}
        <div ref={(el) => { imgWrapperRefs.current[0] = el }} className="absolute top-4 left-4 md:top-8 md:left-8 w-[120px] md:w-[180px] h-[160px] md:h-[240px] rounded-2xl overflow-hidden rotate-[-4deg] shadow-xl">
          <Image src="/Hero/Food/food-1.jpg" alt="" fill className="object-cover" />
        </div>

        {/* Top-left second photo */}
        <div ref={(el) => { imgWrapperRefs.current[1] = el }} className="hidden md:block absolute top-32 left-52 w-[140px] h-[160px] rounded-2xl overflow-hidden rotate-[3deg] shadow-lg">
          <Image src="/Hero/Food/food-2.jpg" alt="" fill className="object-cover" />
        </div>

        {/* Top-right large photo */}
        <div ref={(el) => { imgWrapperRefs.current[2] = el }} className="absolute top-4 right-4 md:top-6 md:right-10 w-[140px] md:w-[200px] h-[180px] md:h-[260px] rounded-2xl overflow-hidden rotate-[5deg] shadow-xl">
          <Image src="/Hero/Food/food-3.jpg" alt="" fill className="object-cover" />
        </div>

        {/* Top-right small */}
        <div ref={(el) => { imgWrapperRefs.current[3] = el }} className="hidden md:block absolute top-36 right-56 w-[130px] h-[150px] rounded-2xl overflow-hidden rotate-[-3deg] shadow-lg">
          <Image src="/Hero/Food/food-4.jpg" alt="" fill className="object-cover" />
        </div>

        {/* Bottom-left */}
        <div ref={(el) => { imgWrapperRefs.current[4] = el }} className="absolute bottom-6 left-6 md:bottom-12 md:left-24 w-[140px] md:w-[200px] h-[160px] md:h-[220px] rounded-2xl overflow-hidden rotate-[4deg] shadow-xl">
          <Image src="/PhooRes/Building/heroBuildingOne.jpg" alt="" fill className="object-cover" />
        </div>

        {/* Bottom-left second */}
        <div ref={(el) => { imgWrapperRefs.current[5] = el }} className="hidden md:block absolute bottom-50 left-52 w-[150px] h-[160px] rounded-2xl overflow-hidden rotate-[-5deg] shadow-lg">
          <Image src="/PhooRes/Building/Jhamsikhel.jpg" alt="" fill className="object-cover" />
        </div>

        {/* Bottom-right large */}
        <div ref={(el) => { imgWrapperRefs.current[6] = el }} className="absolute bottom-4 right-4 md:bottom-8 md:right-24 w-[150px] md:w-[210px] h-[180px] md:h-[240px] rounded-2xl overflow-hidden rotate-[-4deg] shadow-xl">
          <Image src="/PhooRes/Building/Bouddha.jpg" alt="" fill className="object-cover" />
        </div>

        {/* Bottom-right small */}
        <div ref={(el) => { imgWrapperRefs.current[7] = el }} className="hidden md:block absolute bottom-50 right-50 w-[140px] h-[155px] rounded-2xl overflow-hidden rotate-[3deg] shadow-lg">
          <Image src="/PhooRes/Building/Thamel.jpeg" alt="" fill className="object-cover" />
        </div>

        {/* Radial fade to keep center clean for text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(255,255,255,1) 10%, rgba(255,255,255,0.85) 10%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen py-30 px-4">

        {/* Pill label */}
        <div ref={subHeadingRef} className="flex items-center gap-2 mb-6">
          {/* <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /> */}
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-500">
            Invitation
          </span>
          {/* <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /> */}
        </div>
        <Heading
          ref={headingRef}
          className="text-center text-5xl! md:text-7xl! text-transparent-heading font-heading-arial"
        >
          Taste Authentic Cuisine <br /> Crafted With Every Order
        </Heading>
        <p
          ref={paraRef}
          className="max-w-sm text-center text-base mx-auto text-para-secondary leading-relaxed"
        >
          From steaming bowls of hand-crafted pho to vibrant Vietnamese small plates,
          every dish at Pho99 is prepared with cherished family recipes and the finest
          fresh ingredients. Join us across our four Kathmandu locations — Lazimpat,
          Boudha, Jhamsikhel, or Thamel.
        </p>

        {/* Location pills */}
        {/* <div className="flex items-center gap-2 mt-5 flex-wrap justify-center">
          {["Lazimpat", "Boudha", "Jhamsikhel", "Thamel"].map((loc) => (
            <span
              key={loc}
              className="text-xs px-3 py-1 rounded-full border border-zinc-200 text-zinc-500 bg-white/80"
            >
              {loc}
            </span>
          ))}
        </div> */}
        <div className="mt-8">
          <Button ref={btnRef}>
            Order Now
          </Button>
        </div>
      </div>
    </div>
  </section>
};

export default Reservation;
