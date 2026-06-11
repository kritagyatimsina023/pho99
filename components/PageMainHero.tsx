import Image from "next/image"
import Heading from "./Heading"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"

interface pageProps {
    heroImg: string
    heading: string
    subHeading?: string
}




const PageMainHero = ({ heroImg, heading, subHeading }: pageProps) => {
    const heroRef = useRef<HTMLElement | null>(null);
    const heroImageRef = useRef<HTMLImageElement | null>(null);
    const heroOverlayRef = useRef<HTMLDivElement | null>(null);
    const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
    const heroSubRef = useRef<HTMLParagraphElement | null>(null);


    useGSAP(() => {
        if (heroRef.current && heroImageRef.current) {
            gsap.fromTo(heroImageRef.current,
                { yPercent: -10, scale: 1.15 },
                {
                    yPercent: 10, ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    }
                }
            );
        }
        if (heroTitleRef.current) {
            gsap.fromTo(heroTitleRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
            );
        }
        if (heroSubRef.current) {
            gsap.fromTo(heroSubRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
            );
        }

    }, [])
    return (
        <section ref={heroRef} data-theme="dark" className="relative h-[85vh] w-full overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    ref={heroImageRef}
                    alt="Pho99 Restaurant Interior"
                    fill
                    className="object-cover"
                    // src="/PhooRes/Building/buildingInner.jpg"
                    src={heroImg}
                    priority
                />
                <div ref={heroOverlayRef} className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-end h-full pb-24 px-6">
                {/* <span className="text-xs font-semibold tracking-[0.3em] uppercase text-red-400 mb-4">Our Story</span> */}
                <Heading
                    ref={heroTitleRef}
                    className="text-center text-7xl! md:text-8xl! heading-secondary leading-[0.95]"
                >
                    {heading}
                </Heading>
                <p
                    ref={heroSubRef}
                    className="text-center max-w-lg mt-6 text-white! text-base leading-relaxed opacity-85"
                >
                    {subHeading}
                </p>
            </div>
        </section>
    )
}
export default PageMainHero