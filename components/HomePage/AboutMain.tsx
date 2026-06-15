
import Image from "next/image";
import Heading from "../Heading";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap"

const AboutMain = () => {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const subHeading = useRef<HTMLHeadingElement | null>(null)
  const mainHeading = useRef<HTMLHeadingElement | null>(null)
  const imgSvg = useRef<HTMLDivElement | null>(null)
  const img = useRef<HTMLImageElement | null>(null)
  const text = useRef<HTMLParagraphElement | null>(null)
  const outerSvg = useRef<HTMLDivElement | null>(null)
  const content = useRef<HTMLDivElement | null>(null)
  const parallaxWrapper = useRef<HTMLDivElement | null>(null)
  const ConceptParallex = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (!mainRef || !subHeading || !mainHeading) return
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
      opacity: 0
    }, {
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    }).to(mainHeading.current, {
      opacity: 0,
      ease: "power1.inOut",
      duration: 1
    })
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: imgSvg.current,
        start: "top 75%",
        end: "bottom 35%",
        scrub: true,

      }
    })
    tl2.fromTo(img.current, {
      opacity: 0.40
    }, {
      opacity: 1,
      ease: "power1.inOut",
      duration: 1
    }).to(img.current, {
      opacity: 0.40,
      ease: "power1.inOut",
      duration: 1
    })
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: imgSvg.current,
        start: "top 75%",
        end: "bottom top",
        scrub: true,

      }
    })
    tl3.fromTo(text.current, {
      opacity: 0
    }, {
      opacity: 1,
      ease: "power1.inOut",
      duration: 0.85
    }).to(text.current, {
      opacity: 0,
      ease: "power1.inOut",
      duration: 1
    })

    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: content.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // markers: true
      }
    })
    tl4.fromTo(parallaxWrapper.current, {
      y: 150
    }, {
      y: -150,
      ease: "none",
      duration: 3
    }, 0).fromTo(ConceptParallex.current, {
      y: -150
    }, {
      y: 150,
      ease: "none",
      duration: 1
    }, 0)

    if (parallaxWrapper.current) {
      const headings = parallaxWrapper.current.children
      if (headings.length >= 3) {
        tl4.fromTo(headings[0], { opacity: 0.45 }, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, 0)
          .to(headings[0], { opacity: 0.45, duration: 0.5, ease: "power1.inOut" }, 0.5)
        tl4.fromTo(headings[1], { opacity: 0.45 }, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, 1)
          .to(headings[1], { opacity: 0.45, duration: 0.5, ease: "power1.inOut" }, 1.5)
        tl4.fromTo(headings[2], { opacity: 0.45 }, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, 2)
          .to(headings[2], { opacity: 0.45, duration: 0.5, ease: "power1.inOut" }, 2.5)
      }
    }

  }, [])
  return (
    <div className="bg-about-bg min-h-screen relative w-full">
      <div className="flex relative z-20 flex-col items-center py-30">
        <h2 ref={subHeading} className="">What is Laguna Al-Shaab?</h2>
        <div ref={mainRef}>
          <Heading ref={mainHeading} className="text-center max-w-8xl opacity-0">
            Is a gastronomic laboratory where haute cuisine serves <br /> as a
            language of <br /> dialogue between continents
          </Heading>
        </div>
        <div className="relative -mt-10 flex flex-col items-center">

          <div ref={outerSvg} className="w-[460px]">

            <div ref={imgSvg} className="relative aspect-[480/500]">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M100 950 L100 350 C100 120 280 20 500 20 C720 20 900 120 900 350 L900 950 Z"
                  stroke="#D1CCC3"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {/* Image centered inside the arch */}
              <div className="absolute inset-0 flex items-center justify-center pt-10">
                <div className="relative w-[230px] h-[330px]">
                  <Image
                    ref={img}
                    src="/About/About.webp"
                    alt="Food"
                    fill
                    className="object-cover opacity-40"
                  />
                </div>
              </div>
            </div>
            <p ref={text} className="text-start opacity-0 max-w-sm text-lg mx-auto font-extrabold leading-[1.1] text-[#8F8A84]">
              Here Georgian khinkali acquires the crunch of Canarian chips, and
              Mediterranean tuna tartare ‘comes to life’ under the smoke of
              Egyptian spices. No menu, but with surprises - this is how we
              challenge the usual, while maintaining the sophistication of every
              detail.
            </p>
          </div>
        </div>
      </div>
      <div ref={content} className="relative  z-20 flex flex-col mt-2 pb-20">
        <div ref={parallaxWrapper} className="flex flex-col gap-22">
          <Heading className="text-center opacity-0.45">
            Imagic of fusion <br /> cuisine
          </Heading>
          <Heading className="text-center leading-[1.1] opacity-0.45">
            No <br /> preliminary menus
          </Heading>
          <Heading className="text-center leading-[1.1] opacity-0.45">
            Wonderful surprises <br /> await you all
          </Heading>
        </div>
        <div ref={ConceptParallex} className="absolute z-10 left-1/2 top-1/5 -translate-x-1/2 pointer-events-none">
          <Heading className="opacity-10 text-[17em]">Concept</Heading>
        </div>
      </div>
      {/* vertical lines */}
      <div className="h-full absolute top-0 z-10 left-30 w-0.5 bg-[#E1DED5]"></div>
      <div className="h-full absolute top-0 z-10 left-[30%] w-0.5 bg-[#E1DED5]"></div>
      <div className="h-full absolute top-0 z-10 right-72 w-0.5 bg-[#E1DED5]"></div>
    </div>
  );
};

export default AboutMain;
