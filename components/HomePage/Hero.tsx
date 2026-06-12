import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import Heading from "../Heading";

const Hero = () => {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const bgImgRef = useRef<HTMLImageElement | null>(null)


  const innerImgRef1 = useRef<HTMLImageElement | null>(null)
  const contentRef1 = useRef<HTMLDivElement | null>(null)

  const innerImgRef2 = useRef<HTMLImageElement | null>(null)
  const contentRef2 = useRef<HTMLDivElement | null>(null)

  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const headingRefTwo = useRef<HTMLHeadingElement | null>(null)
  const headingRefThree = useRef<HTMLHeadingElement | null>(null)

  useGSAP(() => {
    if (!mainRef.current || !contentRef1.current || !contentRef2.current || !headingRef) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "300% top",
        scrub: 2.5,
        pin: true,
        pinSpacing: true,
      }
    })
    tl.fromTo(bgImgRef.current,
      { scale: 1.2, },
      { scale: 3, ease: "power2.inOut", duration: 1 }
    ).fromTo(headingRef.current, {
      opacity: 1
    }, {
      opacity: 0
    }, "<+=0.01")
      .fromTo(bgImgRef.current, {
        filter: "blur(2px)"
      }, {
        filter: "blur(0px)",
      }, "<+=0.1")
      .fromTo(contentRef1.current,
        { clipPath: "circle(0% at 50% 100%)" },
        { clipPath: "circle(150% at 50% 50%)", ease: "none", duration: 1 },
        "<+=0.1"
      ).fromTo(headingRefTwo.current, {
        opacity: 1
      }, {
        opacity: 0
      }, "<+=0.6")
    tl.fromTo(contentRef2.current,
      { clipPath: "circle(0% at 50% 100%)" },
      { clipPath: "circle(150% at 50% 50%)", ease: "none", duration: 1 }
    ).fromTo(headingRefThree.current, {
      opacity: 1
    }, {
      opacity: 0
    }, "<+=0.6")
  }, [])

  return (
    <div ref={mainRef} data-theme="dark" className="min-h-screen w-full relative overflow-hidden">
      <div className="absolute z-10 inset-0">
        <Image
          ref={bgImgRef}
          src={"/PhooRes/Building/whitelazimpat.png"}
          className="w-full h-full object-cover"
          fill
          alt="hero-background"
        />
        <div className="absolute bg-black/20 z-20 inset-0" ></div>
        <Heading ref={headingRef} className="relative w-full h-full z-30 flex items-center justify-center text-center text-white!">Authentic Vietnamese Flavors <br />
          Serving Every Plate</Heading>
        {/* <Heading ref={headingRef} className="relative w-full h-full z-30 flex-col  flex items-center justify-center text-center text-white!">Welcome <br /> To
          <span className="text-red-600!" > Pho99</span>
        </Heading> */}
      </div>
      <div
        ref={contentRef1}
        className="absolute z-20 inset-0 min-h-screen"
        style={{ clipPath: "circle(0% at 50% 100%)" }}
      >
        <Image
          ref={innerImgRef1}
          src={"/PhooRes/Building/buildingInner.jpg"}
          className="w-full h-full object-cover"
          fill
          alt="hero-reveal"
        // style={{ scale: 0.15 }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <Heading ref={headingRefTwo} className="relative w-full h-full z-30 flex items-center justify-center text-center text-white!">Inspired Spaces</Heading>
      </div>
      <div
        ref={contentRef2}
        className="absolute z-30 inset-0 min-h-screen"
        style={{ clipPath: "circle(0% at 50% 100%)" }}
      >
        <Image
          ref={innerImgRef2}
          src={"/PhooRes/Building/building-Three.png"}
          className="w-full h-full object-cover"
          fill
          alt="hero-reveal"
        // style={{ scale: 1.15 }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <Heading ref={headingRefThree} className="relative w-full h-full z-30 flex items-center justify-center text-center text-white!">Authentic Dining</Heading>
      </div>
    </div>
  );
};

export default Hero;
