import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useCallback } from "react";
import Heading from "../Heading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import Buttons from "../Buttons";
import Button from "../Button";

const NewAboutMain = () => {
  const mainHeading = useRef<HTMLHeadingElement | null>(null)
  const mainRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  // Parallax state for each image panel (x, y offsets)
  const [leftPos, setLeftPos] = useState({ x: 0, y: 0 })
  const [rightPos, setRightPos] = useState({ x: 0, y: 0 })
  const [bottomPos, setBottomPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    // Normalise mouse to -1 → +1 relative to section center
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

    // Different multipliers for depth: left panel floats inward, right outward, bottom subtle
    setLeftPos({ x: nx * -22, y: ny * -18 })
    setRightPos({ x: nx * 28, y: ny * 20 })
    setBottomPos({ x: nx * 10, y: ny * 8 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setLeftPos({ x: 0, y: 0 })
    setRightPos({ x: 0, y: 0 })
    setBottomPos({ x: 0, y: 0 })
  }, [])

  useGSAP(() => {
    if (!mainRef || !mainHeading) return
    if (!mainRef.current) return
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: true,
        // markers: true
      }
    })
    tl.fromTo(mainHeading.current, {
      opacity: 0.35
    }, {
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    }).to(mainHeading.current, {
      opacity: 0.35,
      ease: "power1.inOut",
      duration: 1
    })
  }, [])

  const parallaxStyle = (pos: { x: number; y: number }) => ({
    transform: `translate(${pos.x}px, ${pos.y}px)`,
    transition: 'transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform' as const,
  })
  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white! min-h-screen relative w-full overflow-hidden py-24 px-6 md:px-10"
    >
      {/* Top center text */}
      <div className="flex relative z-20 flex-col items-center max-w-2xl mx-auto mt-4 gap-6">
        <div ref={mainRef}>
          <Heading ref={mainHeading} className="text-6xl! text-center" >Experience our journey of bringing <br />  Authentic, Flavors Excellence &  Warm <br /> Hospitality</Heading>
        </div>
        <div className="flex flex-col items-center gap-3" >
          <p className="text-center max-w-md text-black! leading-relaxed  text-sm md:text-base">
            Discover the story behind Pho99, where authentic Vietnamese traditions meet exceptional hospitality. Experience the rich flavors, comforting aromas, and warm atmosphere that bring the taste of Vietnam to Nepal.
          </p>
          <Link href={"/about"}>
            <Button>
              About Us
            </Button>
          </Link>
        </div>
      </div>
      {/* Left Image (Arch shape) */}
      <div
        className="hidden lg:block absolute left-10 xl:left-12 top-[35%] w-[25%] max-w-[350px] aspect-[4/5] z-10"
        style={parallaxStyle(leftPos)}
      >
        <div className="w-full h-full relative rounded-t-full overflow-hidden shadow-xl border border-black/5">
          <Image src="/PhooRes/HeroSlider/Phoofood-2.avif" alt="Drinks and sides" fill className="object-cover" />
        </div>
      </div>

      {/* Right Image (Leaf shape) */}
      <div
        className="hidden lg:block absolute right-10 xl:right-20 top-[42%] w-[28%] max-w-[400px] aspect-[4/3] z-10"
        style={parallaxStyle(rightPos)}
      >
        <div className="w-full h-full relative rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-xl border border-black/5">
          <Image src="/PhooRes/Pho99Dish/HeroFood.png" alt="Main dish" fill className="object-cover" />
        </div>
      </div>
      {/* Circular Badge right below right image */}
      <div className="hidden   lg:block absolute right-12 xl:right-32 top-[calc(320px+37vw+20px)]  w-32 h-32 z-20">
        <div className="relative w-full  h-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
            <path id="circlePath" color="#C10008" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            <text className="text-[10px] fill-[#000000] tracking-[4px] font-bold uppercase">
              <textPath href="#circlePath" startOffset="0%">ORDER NOW • ORDER NOW • </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12  rounded-full flex items-center justify-center shadow-md">
            <Image alt="foodmandu" className="rounded-full" width={50} height={50} src={'/PhooRes/Logo/foodmanduLogo.png'} />
          </div>
        </div>
      </div>
      {/* Bottom Center Image (Wide Arch shape) */}
      <div
        className="relative w-[90%] md:w-[50%] max-w-[600px] aspect-[15/10] mx-auto mt-32 md:mt-48 z-10"
        style={parallaxStyle(bottomPos)}
      >
        <div className="w-full h-full relative rounded-t-[200px] md:rounded-t-[300px] overflow-hidden shadow-xl border border-black/5">
          <Image src="/PhooRes/HeroSlider/PhoFood-1.avif" alt="Restaurant Interior" fill className="object-cover object-left" />
        </div>
      </div>
      {/* Scroll up button (Bottom Right) */}
      {/* <div className="absolute bottom-10 right-10 w-12 h-12 bg-[#fbd405] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 shadow-md z-30 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M18 15l-6-6-6 6" /></svg>
      </div> */}
    </div>
  );
};

export default NewAboutMain;


