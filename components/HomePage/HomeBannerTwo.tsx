import Image from "next/image";
import React, { useRef } from "react";
import Heading from "../Heading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"

interface HomeBannerProps {
  source?: string
}

const HomeBannerTwo = ({ source }: HomeBannerProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  useGSAP(() => {
    if (!sectionRef.current || !imageRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })
    tl.fromTo(imageRef.current,
      { yPercent: -15, scale: 1.2 },
      { yPercent: 15, ease: "none" }
    )
  }, [])
  return (
    <section ref={sectionRef} className="min-h-[40vh] md:min-h-[60vh] lg:min-h-[80vh] relative z-10 overflow-hidden" >
      <div className="h-full w-full absolute inset-0" >
        <Image
          ref={imageRef}
          alt="Banner-Two"
          fill
          src={source || ''}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HomeBannerTwo;