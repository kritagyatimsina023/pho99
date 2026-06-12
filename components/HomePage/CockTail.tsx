import Image from "next/image";
import React, { useRef } from "react";
import Heading from "../Heading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"


const drinks = [
  {
    id: 1,
    title: "Classic Margarita",
    desc: "Tquulia,triple sec, lime juice & salt rimmed glass",
    img: "/PhooRes/Drinks/drink-1.png",
    roman: "I"
  },
  {
    id: 2,
    title: "Tequlia Sunrise",
    desc: "Tequila,Orange juics,cranberry juice,ice",
    img: "/PhooRes/Drinks/drink-2.png",
    roman: "II"
  },
  {
    id: 3,
    title: "cosmopolitan",
    desc: "Vodka,triplesec,lime juice,cranberry juice,ice",
    img: "/PhooRes/Drinks/drink-3.png",
    roman: "III"

  },
  {
    id: 4,
    title: "caipiroska",
    desc: "Vodka, lemons , syrup and ice",
    img: "/PhooRes/Drinks/drink-4.png",
    roman: "IV"

  },
  // {
  //   id: 5,
  //   title: "God Of the  Pharaohs",
  //   desc: "apple , banana mango guava test ",
  //   img: "/PhooRes/Drinks/drinks-5.png",
  //   roman: "V"

  // }
];
const CockTail = () => {
  const drinksWrapper = useRef<HTMLDivElement | null>(null)
  const imgRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const descRefs = useRef<(HTMLDivElement | null)[]>([])
  const romanRef = useRef<(HTMLParagraphElement | null)[]>([])
  const contentWrapper = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  useGSAP(() => {
    if (!drinksWrapper.current) return
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: drinksWrapper.current,
        start: "top top",
        end: `+=${(drinks.length * 100)}%`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        // markers: true
      }
    })
    // Initial positioning
    titleRefs.current.forEach((el, i) => {
      if (i > 0) gsap.set(el, { yPercent: 200, opacity: 1 })
    })
    descRefs.current.forEach((el, i) => {
      if (i > 0) gsap.set(el, { opacity: 0 })
    })
    romanRef.current.forEach((el, i) => {
      gsap.set(el, { backgroundColor: i === 0 ? '#ef4444' : '#d1ccc3' })
    })
    drinks.forEach((_, i) => {
      if (i === drinks.length - 1) return;
      const label = `slide${i}`;
      tl.addLabel(label)
      tl.to(titleRefs.current[i], {
        y: -500, // Reaches the top of the SVG arch
        opacity: 0,
        ease: "none",
        duration: 1
      }, label)
      tl.to(imgRefs.current[i], {
        yPercent: -100, // Slides up out of view
        ease: "none",
        duration: 1
      }, label)
      tl.to(descRefs.current[i], {
        opacity: 0,
        ease: "none",
      }, label)
      // Line indicator: current goes inactive (gray)
      tl.to(romanRef.current[i], {
        backgroundColor: '#d1ccc3',
        ease: "none",
        duration: 1
      }, label)
      tl.to(titleRefs.current[i + 1], {
        yPercent: -100,
        opacity: 1,
        ease: "none",
        duration: 1
      }, label)
      tl.to(descRefs.current[i + 1], {
        opacity: 1,
        ease: "none",

      }, label)
      // Line indicator: next goes active (red)
      tl.to(romanRef.current[i + 1], {
        backgroundColor: '#ef4444',
        ease: "none",
        duration: 1
      }, label)
    })
    const tlTwo = gsap.timeline({
      scrollTrigger: {
        trigger: contentWrapper.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 1.5,
        // markers: true
      }
    })
    tlTwo.fromTo(headingRef.current, {
      opacity: 0.45
    }, {
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    }).to(headingRef.current, {
      opacity: 0.45,
      ease: "power1.inOut",
      duration: 1
    })


  }, [])
  return (
    <section className="min-h-screen relative w-full overflow-hidden">
      {/* Vertical lines */}
      {/* <div className="h-full absolute top-0 left-[10%] w-0.5 bg-[#E1DED5]"></div>
      <div className="h-full absolute top-0 left-[28%] w-0.5 bg-[#E1DED5]"></div>
      <div className="h-full absolute top-0 right-72 w-0.5 bg-[#E1DED5]"></div> */}
      <div className="relative z-20">
        <div className="flex flex-col items-center py-30">
          {/* Top label */}
          <h2>Drinks</h2>
          {/* Subheading */}
          <div ref={contentWrapper} className="flex flex-col items-center px-4 md:px-8" >
            <div>
              <Heading ref={headingRef} className="text-center max-w-8xl opacity-0.45">
                Signature cocktails paired with authentic Vietnamese flavors
              </Heading>
            </div>
            {/* Description */}
            <p className="text-center md:text-start max-w-sm text-para-secondary text-lg leading-[1.1] mt-4 md:mt-0">
              Crafted with fresh ingredients and bold inspiration, each drink enhances the aromas, textures, and stories found in every dish.
            </p>
          </div>

          <div ref={drinksWrapper} className="h-[100vh] w-full">
            <div className="relative w-full flex flex-col overflow-hidden items-center mt-10">
              {/* Arch image */}
              <div className="relative z-10 w-[90vw] md:w-[560px] max-w-[560px] border-b-2 border-transparent">
                <div className="relative aspect-[480/500] overflow-hidden">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <defs>
                      <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
                        <path d="M0.1 0.95 L0.1 0.35 C0.1 0.12 0.28 0.02 0.5 0.02 C0.72 0.02 0.9 0.12 0.9 0.35 L0.9 0.95 Z" />
                      </clipPath>
                    </defs>
                    <path
                      d="M100 950 L100 350 C100 120 280 20 500 20 C720 20 900 120 900 350 L900 950 Z"
                      stroke="#D1CCC3"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <div
                    className="absolute inset-0 "
                    style={{ clipPath: "url(#arch-clip)" }}
                  >
                    {drinks.map((drink, i) => (
                      <div
                        key={drink.id}
                        ref={(el) => { imgRefs.current[i] = el }}
                        className="absolute inset-0"
                        style={{ zIndex: drinks.length - i }}
                      >
                        <Image
                          src={drink.img}
                          alt={drink.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Headings Container: clipped precisely at the arch's visual bottom edge (95% of SVG height) */}
                <div className="absolute z-20 w-screen h-[1200px] bottom-[5%] left-1/2 -translate-x-1/2 overflow-hidden pointer-events-none mix-blend-hard-light  ">
                  <div className="absolute bottom-0 w-full flex items-center justify-center">
                    {drinks.map((drink, i) => (
                      <Heading
                        key={drink.id}
                        ref={(el) => { titleRefs.current[i] = el }}
                        className="absolute text-4xl! md:text-7xl! lg:text-8xl! z-20 uppercase text-center whitespace-nowrap leading-none tracking-tight"
                      >
                        {drink.title}
                      </Heading>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative max-w-[250px] mx-auto mt-4 h-[60px]">
              {drinks.map((drink, i) => (
                <div
                  key={drink.id}
                  ref={(el) => { descRefs.current[i] = el }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <p className="text-center text-lg! md:text-xl! leading-[1.1] px-4">
                    {drink.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 w-full justify-center mx-auto mt-2">
              {drinks.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => { romanRef.current[i] = el }}
                  className="h-5 w-0.5 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: i === 0 ? '#ef4444' : '#d1ccc3' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CockTail;
