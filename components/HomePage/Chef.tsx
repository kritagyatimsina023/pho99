'use client'
import Image from "next/image";
import React, { useRef } from "react";
import Heading from "../Heading";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger)

const Chef = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const detailRef = useRef<HTMLDivElement | null>(null)
  const mainRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const firstParaRef = useRef<HTMLParagraphElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const chefRef = useRef<HTMLDivElement | null>(null)
  const firstQuote = useRef<HTMLParagraphElement | null>(null)
  const secondQuote = useRef<HTMLParagraphElement | null>(null)
  const thirdQuote = useRef<HTMLSpanElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const detailRef2 = useRef<HTMLDivElement | null>(null)
  const firstParaRef2 = useRef<HTMLParagraphElement | null>(null)
  const headingRef2 = useRef<HTMLHeadingElement | null>(null)
  const chefRef2 = useRef<HTMLDivElement | null>(null)
  const firstQuote2 = useRef<HTMLParagraphElement | null>(null)
  const secondQuote2 = useRef<HTMLParagraphElement | null>(null)
  const thirdQuote2 = useRef<HTMLSpanElement | null>(null)
  useGSAP(() => {
    if (!sectionRef.current || !detailRef.current || !mainRef.current || !overlayRef.current) return
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: sectionRef.current,
        scrub: 1,
        // markers: true
      }
    });
    const tlThree = gsap.timeline({
      scrollTrigger: {
        trigger: imageRef.current,
        start: "-45% top",
        end: "bottom top",
        scrub: 1.5,
        // markers: true
      }
    })
    tlThree.fromTo(imageRef.current, { yPercent: -5, scale: 1.2 }, { yPercent: 5, ease: "none" })
    // tl.fromTo(imageRef.current,
    //   { yPercent: -10, scale: 1.2 },
    //   { yPercent: 10, scale: 1, ease: "none", scrub: 1 })

    tl.fromTo(overlayRef.current, {
      opacity: 0
    }, {
      opacity: 0.85,
      duration: 1,
    })
      .fromTo(detailRef.current, {
        yPercent: 120
      }, {
        yPercent: 0,
        ease: "power2.out",
        duration: 2
      }, "<+=0.1")
    const scrollDistance = 10;
    const tlTwo = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "35% top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      }
    })
    tlTwo.to(detailRef.current, {
      y: -scrollDistance,
      ease: "none",
      duration: 5
    }, 0)
      .fromTo(firstParaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.75, y: 0, ease: "power2.out", duration: 1 },
        0.5
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.75, y: 0, ease: "power2.out", duration: 1 },
        1
      )
      .fromTo(chefRef.current,
        { opacity: 0.69 },
        { opacity: 0.35, ease: "power2.out", duration: 1.5 },
        1.5
      )
      .fromTo(firstQuote.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, ease: "power2.out", duration: 1 },
        2.5
      )
      .fromTo([secondQuote.current, thirdQuote.current],
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, ease: "power2.out", duration: 1, stagger: 0.5 },
        3.5
      )
      .to(detailRef.current, { opacity: 0, y: -scrollDistance, duration: 1.5 }, 5)
      .fromTo(detailRef2.current,
        { opacity: 0, y: scrollDistance },
        { opacity: 1, y: 0, ease: "power2.out", duration: 1.5 },
        5.5
      )
      .to(detailRef2.current, {
        y: -scrollDistance,
        ease: "none",
        duration: 5
      }, 7)
      .fromTo(firstParaRef2.current,
        { opacity: 0, y: 5 },
        { opacity: 0.75, y: 0, ease: "power2.out", duration: 1 },
        6
      )
      .fromTo(headingRef2.current,
        { opacity: 0, y: 5 },
        { opacity: 0.75, y: 0, ease: "power2.out", duration: 1 },
        6.5
      )
      .fromTo(chefRef2.current,
        { opacity: 0.69 },
        { opacity: 0.35, ease: "power2.out", duration: 1.5 },
        7
      )
      .fromTo(firstQuote2.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, ease: "power2.out", duration: 1 },
        8
      )
      .fromTo([secondQuote2.current, thirdQuote2.current],
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, ease: "power2.out", duration: 1, stagger: 0.5 },
        9
      );
    return () => tl.kill()
  }, [])
  return (
    <div ref={mainRef} className="h-[400vh] relative" >
      {/* Dummy divs for NavBar IntersectionObserver to pick up the theme */}
      <div data-theme="light" className="absolute top-0 w-full h-[100vh] pointer-events-none" />
      <div data-theme="dark" className="absolute top-[100vh] w-full h-[300vh] pointer-events-none" />
      <section ref={sectionRef} className="h-screen w-full relative z-10 " >
        <div ref={overlayRef} className="absolute bg-black w-full h-full z-10" ></div>
        <div className="h-full overflow-hidden " >
          <Image
            ref={imageRef}
            alt="Banner-Two"
            fill
            src={'/PhooRes/Chef/team.webp'}
            className="w-full h-full object-cover" />
        </div>
        <div ref={detailRef} className="bg-transparent absolute inset-0 flex flex-col justify-center items-center w-full z-10 mb-12" >
          <p ref={firstParaRef} className="text-center text-para-secondary text-2xl" >The Architect of Authentic Taste</p>
          <Heading ref={headingRef} className="text-center heading-secondary" >Chef Sangdorje tamang</Heading>
          <div className="w-full flex flex-col items-center justify-center relative" >
            <div className="absolute z-30 left-[20%] top-[50%]" >
              <p ref={firstQuote} className="heading-secondary text-3xl  md:text-5xl italic font-melfira" >
                ‘I don't just cook</p>
            </div>
            <div className="absolute z-30 right-[20%] top-[60%] flex flex-col items-end" >
              <p ref={secondQuote} className="heading-secondary md:font-heading text-3xl md:text-5xl italic font-melfira" >
                I script with fish
              </p>
              <span ref={thirdQuote} className="heading-secondary text-3xl md:text-5xl italic font-melfira">and salt‘</span>
            </div>
            <div className="relative" >
              <Image alt="Main-chef" className="object-cover"
                width={340} height={340}
                src={"/PhooRes/Chef/NewChefOne.png"} />
              <div ref={chefRef} className="absolute inset-0 w-full h-full bg-black" />
            </div>
          </div>
        </div>

        <div ref={detailRef2} className="bg-transparent absolute inset-0 flex flex-col justify-center items-center w-full z-10 mb-12 opacity-0" >
          <p ref={firstParaRef2} className="text-center text-para-secondary text-2xl" >Master of the unique flavors</p>
          <Heading ref={headingRef2} className="text-center heading-secondary" >Chef Pemba Tamang</Heading>
          <div className="w-full flex flex-col items-center justify-center relative" >
            <div className="absolute z-30 left-[20%] top-[50%]" >
              <p ref={firstQuote2} className="heading-secondary text-3xl  md:text-5xl italic font-melfira" >
                ‘Cooking is an art</p>
            </div>
            <div className="absolute z-30 right-[20%] top-[60%] flex flex-col items-end" >
              <p ref={secondQuote2} className="heading-secondary font-heading text-3xl  md:text-5xl italic font-melfira" >
                I paint with spices
              </p>
              <span ref={thirdQuote2} className="heading-secondary text-3xl  md:text-5xl italic font-melfira">and passion‘</span>
            </div>
            <div className="relative" >
              <Image alt="Main-chef-two" className="object-cover"
                width={340} height={340}
                src={"/PhooRes/Chef/NewChefTwo.png"} />
              <div ref={chefRef2} className="absolute inset-0 w-full h-full bg-black" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Chef;
