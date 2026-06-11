'use client'
import Image from "next/image";
import React, { useRef } from "react";
import Heading from "../../Heading";
import Button from "../../Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageMainHero from "@/components/PageMainHero";

gsap.registerPlugin(ScrollTrigger);

const locations = [
    {
        name: "Lazimpat",
        desc: "Where it all began — our flagship location in the heart of Lazimpat introduced Kathmandu to authentic Vietnamese cuisine through cherished family recipes.",
        src: "/PhooRes/Building/heroBuildingOne.jpg",
    },
    {
        name: "Boudha",
        desc: "Situated near the iconic Boudhanath Stupa, Pho99 Boudha offers a welcoming dining experience surrounded by the area's vibrant cultural atmosphere.",
        src: "/PhooRes/Building/Bouddha.jpg",
    },
    {
        name: "Jhamsikhel",
        desc: "Featuring cozy indoor seating and a beautiful courtyard garden, our Jhamsikhel outlet is the perfect setting for gatherings and special occasions.",
        src: "/PhooRes/Building/Jhamsikhel.jpg",
    },
    {
        name: "Thamel",
        desc: "Set in Kathmandu's bustling tourist district, Pho99 Thamel provides a welcoming retreat with authentic Vietnamese flavors in a lively atmosphere.",
        src: "/PhooRes/Building/Thamel.jpeg",
    },
];

const values = [
    {
        title: "Authenticity",
        desc: "Every dish is prepared using traditional Vietnamese techniques and cherished family recipes passed down through generations.",
        icon: "🍜",
    },
    {
        title: "Quality",
        desc: "We source only the finest, freshest ingredients to ensure each bowl of pho and every plate delivers exceptional flavor.",
        icon: "✦",
    },
    {
        title: "Hospitality",
        desc: "Warm, genuine service inspired by Vietnamese traditions — where every guest is treated like family.",
        icon: "🤝",
    },
    {
        title: "Community",
        desc: "Four locations across Kathmandu, each rooted in its neighborhood, building connections through food and culture.",
        icon: "🏠",
    },
];

const AboutUsMain = () => {
    // Hero refs
    const heroRef = useRef<HTMLElement | null>(null);
    const heroImageRef = useRef<HTMLImageElement | null>(null);
    const heroOverlayRef = useRef<HTMLDivElement | null>(null);
    const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
    const heroSubRef = useRef<HTMLParagraphElement | null>(null);

    // Story section refs
    const storyRef = useRef<HTMLDivElement | null>(null);
    const storyHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const storyParaRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const storyImageRef = useRef<HTMLDivElement | null>(null);

    // Owner section refs
    const ownerRef = useRef<HTMLDivElement | null>(null);
    const ownerHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const ownerParaRef = useRef<HTMLParagraphElement | null>(null);
    const ownerImageRef = useRef<HTMLDivElement | null>(null);

    // Chef section refs
    const chefSectionRef = useRef<HTMLDivElement | null>(null);
    const chefHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const chefParaRef = useRef<HTMLParagraphElement | null>(null);
    const chefImageRef = useRef<HTMLDivElement | null>(null);

    // Locations refs
    const locationsRef = useRef<HTMLDivElement | null>(null);
    const locationsHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const locationCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Values refs
    const valuesRef = useRef<HTMLDivElement | null>(null);
    const valuesHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const valueCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Awards refs
    const awardsRef = useRef<HTMLDivElement | null>(null);
    const awardsHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const awardImageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        // ── Hero parallax & fade ──
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
        // Hero text entrance
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
        // ── Story section ──
        if (storyRef.current && storyHeadingRef.current) {
            const storyTl = gsap.timeline({
                scrollTrigger: {
                    trigger: storyRef.current,
                    start: "top 80%",
                    end: "center 40%",
                    scrub: 1,
                }
            });
            storyTl.fromTo(storyHeadingRef.current,
                { opacity: 0.2 },
                { opacity: 1, ease: "power1.inOut" }
            );
            storyParaRefs.current.forEach((el) => {
                if (!el) return;
                storyTl.fromTo(el,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, ease: "power2.out" },
                    "<+=0.1"
                );
            });
        }

        // Story image parallax
        if (storyImageRef.current) {
            gsap.fromTo(storyImageRef.current,
                { y: 60 },
                {
                    y: -60, ease: "none",
                    scrollTrigger: {
                        trigger: storyImageRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    }
                }
            );
        }

        // ── Owner section ──
        if (ownerRef.current) {
            const ownerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ownerRef.current,
                    start: "top 75%",
                    end: "center 40%",
                    scrub: 1,
                }
            });
            if (ownerImageRef.current) {
                ownerTl.fromTo(ownerImageRef.current,
                    { scale: 0.85, opacity: 0 },
                    { scale: 1, opacity: 1, ease: "power2.out" }
                );
            }
            if (ownerHeadingRef.current) {
                ownerTl.fromTo(ownerHeadingRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, ease: "power2.out" },
                    "<+=0.1"
                );
            }
            if (ownerParaRef.current) {
                ownerTl.fromTo(ownerParaRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, ease: "power2.out" },
                    "<+=0.1"
                );
            }
        }

        // ── Chef section ──
        // if (chefSectionRef.current) {
        //     const chefTl = gsap.timeline({
        //         scrollTrigger: {
        //             trigger: chefSectionRef.current,
        //             start: "top 75%",
        //             end: "center 40%",
        //             scrub: 1,
        //         }
        //     });
        //     if (chefImageRef.current) {
        //         chefTl.fromTo(chefImageRef.current,
        //             { scale: 0.85, opacity: 0 },
        //             { scale: 1, opacity: 1, ease: "power2.out" }
        //         );
        //     }
        //     if (chefHeadingRef.current) {
        //         chefTl.fromTo(chefHeadingRef.current,
        //             { opacity: 0, y: 30 },
        //             { opacity: 1, y: 0, ease: "power2.out" },
        //             "<+=0.1"
        //         );
        //     }
        //     if (chefParaRef.current) {
        //         chefTl.fromTo(chefParaRef.current,
        //             { opacity: 0, y: 20 },
        //             { opacity: 1, y: 0, ease: "power2.out" },
        //             "<+=0.1"
        //         );
        //     }
        // }

        // ── Locations ──
        if (locationsRef.current && locationsHeadingRef.current) {
            gsap.fromTo(locationsHeadingRef.current,
                { opacity: 0.2 },
                {
                    opacity: 1, ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: locationsRef.current,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 1,
                    }
                }
            );
            locationCardRefs.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1, y: 0, ease: "power2.out", duration: 0.8,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            end: "top 55%",
                            scrub: 1,
                        }
                    }
                );
            });
        }

        // ── Values ──
        if (valuesRef.current && valuesHeadingRef.current) {
            gsap.fromTo(valuesHeadingRef.current,
                { opacity: 0.2 },
                {
                    opacity: 1, ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: valuesRef.current,
                        start: "top 80%",
                        end: "top 50%",
                        scrub: 1,
                    }
                }
            );
            valueCardRefs.current.forEach((el) => {
                if (!el) return;
                gsap.fromTo(el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            end: "top 65%",
                            scrub: 1,
                        }
                    }
                );
            });
        }

        // ── Awards ──
        if (awardsRef.current && awardsHeadingRef.current) {
            gsap.fromTo(awardsHeadingRef.current,
                { opacity: 0.2 },
                {
                    opacity: 1, ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: awardsRef.current,
                        start: "top 80%",
                        end: "top 50%",
                        scrub: 1,
                    }
                }
            );
            awardImageRefs.current.forEach((el) => {
                if (!el) return;
                gsap.fromTo(el,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1, opacity: 1, ease: "back.out(1.4)",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            end: "top 60%",
                            scrub: 1,
                        }
                    }
                );
            });
        }

    }, []);

    return (
        <div className="bg-white! relative z-10">
            <PageMainHero heroImg="/PhooRes/Building/buildingInner.jpg" heading="About Pho99" subHeading="A taste of Home,Crafted with Love" />
            <section className="py-28 px-6 md:px-16 bg-white!">
                <div ref={storyRef} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text side */}
                    <div className="flex flex-col gap-6">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-500">
                            Est. 2018
                        </span>
                        <Heading
                            ref={storyHeadingRef}
                            className="text-5xl! md:text-6xl! leading-[1.05]"
                        >
                            Where Every Bowl Tells a Story
                        </Heading>
                        <p
                            ref={(el) => { storyParaRefs.current[0] = el }}
                            className="text-para-secondary text-base leading-relaxed"
                        >
                            Pho99 was born from a simple dream — to bring the authentic flavors of Vietnam to the streets of Kathmandu. What began as a single restaurant in Lazimpat has grown into a beloved family of four locations, each carrying the same passion for genuine Vietnamese cuisine and heartfelt hospitality.
                        </p>
                        <p
                            ref={(el) => { storyParaRefs.current[1] = el }}
                            className="text-para-secondary text-base leading-relaxed"
                        >
                            Our recipes are not just dishes — they are stories passed down through generations, carefully preserved and lovingly prepared. From the slow-simmered broths that take hours to perfect, to the fresh herbs and spices that define each plate, every detail reflects our commitment to authenticity.
                        </p>
                        <p
                            ref={(el) => { storyParaRefs.current[2] = el }}
                            className="text-para-secondary text-base leading-relaxed"
                        >
                            Today, Pho99 stands as a bridge between Vietnamese culinary traditions and Nepal&apos;s vibrant food culture — a place where friends and families gather to share meals, make memories, and experience the warmth of Vietnamese hospitality.
                        </p>
                    </div>
                    {/* Image side — arch shape */}
                    <div ref={storyImageRef} className="relative">
                        <div className="relative w-full aspect-[4/5] rounded-t-full overflow-hidden shadow-2xl">
                            <Image
                                src="/PhooRes/HeroSlider/PhoFood-1.avif"
                                alt="Pho99 Signature Dish"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative accent */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-red-500/20 rounded-full" />
                        <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-red-500/10 rounded-full" />
                    </div>
                </div>
            </section>
            <section className="py-28 px-6 md:px-16 bg-white!">
                <div ref={ownerRef} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image — rounded leaf shape */}
                    <div ref={ownerImageRef} className="relative order-2 lg:order-1">
                        <div className="relative w-full max-w-[420px] mx-auto aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl">
                            <Image
                                src="/PhooRes/People/owner.jpg"
                                alt="Executive Chef"
                                fill
                                className="object-cover object-start"
                            />
                        </div>
                    </div>
                    {/* Text */}
                    <div className="flex flex-col gap-6 order-1 lg:order-2">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-500">
                            The Founder
                        </span>
                        <Heading
                            ref={ownerHeadingRef}
                            className="text-5xl! md:text-6xl! leading-[1.05]"
                        >
                            A Vision Rooted in Tradition
                        </Heading>
                        <p
                            ref={ownerParaRef}
                            className="text-para-secondary text-base leading-relaxed"
                        >
                            Driven by a deep love for Vietnamese cuisine and culture, our founder envisioned a space where the rich culinary heritage of Vietnam could find a new home in Nepal. With dedication and an unwavering commitment to quality, Pho99 was established — not just as a restaurant, but as a celebration of flavor, family, and togetherness. Every location carries forward the same founding principles: authentic recipes, the finest ingredients, and hospitality that makes every guest feel at home.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-28 px-6 md:px-16 bg-white">
                <div ref={chefSectionRef} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div className="flex flex-col gap-6">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-500">
                            The Kitchen
                        </span>
                        <Heading
                            ref={chefHeadingRef}
                            className="text-5xl! md:text-6xl! leading-[1.05]"
                        >
                            Crafted by Passionate Hands
                        </Heading>
                        <p
                            ref={chefParaRef}
                            className="text-para-secondary text-base leading-relaxed"
                        >
                            Our executive chef brings years of experience and a profound understanding of Vietnamese culinary traditions to every dish. From the signature pho — with its deeply aromatic, slow-simmered broth — to the vibrant small plates inspired by the streets of Hanoi and Ho Chi Minh City, each creation is a testament to the art of Vietnamese cooking. The kitchen at Pho99 is where tradition meets innovation, and where every meal is prepared with precision, care, and heart.
                        </p>
                    </div>
                    {/* Image — arch shape */}
                    <div ref={chefImageRef} className="relative">
                        <div className="relative w-full max-w-[420px] mx-auto aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl">
                            <Image
                                src="/PhooRes/People/Chef-executive.jpeg"
                                alt="Executive Chef"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="py-28 px-6 md:px-16 bg-white!">
                <div ref={locationsRef} className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-500">
                            Visit Us
                        </span>
                        <Heading
                            ref={locationsHeadingRef}
                            className="text-5xl! md:text-6xl! mt-4"
                        >
                            Four Locations, One Journey
                        </Heading>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {locations.map((loc, i) => (
                            <div
                                key={loc.name}
                                ref={(el) => { locationCardRefs.current[i] = el }}
                                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                            >
                                <div className="relative h-[360px] overflow-hidden">
                                    <Image
                                        src={loc.src}
                                        alt={loc.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <Heading className="text-4xl! heading-secondary mb-2">
                                        {loc.name}
                                    </Heading>
                                    <p className="text-white! text-sm leading-relaxed opacity-80 max-w-sm">
                                        {loc.desc}
                                    </p>
                                    <a
                                        href={`https://maps.google.com/?q=Pho99+${loc.name}+Kathmandu`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-4 text-white! text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        Find Us
                                        <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
            <section className="relative overflow-hidden py-28 px-6 md:px-16 bg-white">
                <div ref={valuesRef} className="relative max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-10 lg:gap-16 items-end mb-16">
                        <div>
                            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-500">
                                What We Stand For
                            </span>
                            <Heading
                                ref={valuesHeadingRef}
                                className="text-5xl! md:text-6xl! mt-4 leading-[1.02]"
                            >
                                Our Values
                            </Heading>
                        </div>
                        <p className="text-para-secondary text-base leading-relaxed max-w-xl lg:ml-auto">
                            The details that shape every Pho99 experience, from the broth simmering in our kitchens to the welcome waiting at each table.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.map((val, i) => (
                            <div
                                key={val.title}
                                ref={(el) => { valueCardRefs.current[i] = el }}
                                className="group relative min-h-[330px] overflow-hidden rounded-[1.5rem] border border-[#eadfce] bg-white p-7 transition-all duration-300 hover:border-red-500/30"
                            >
                                {/* <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-[#f7f2e8] opacity-80" /> */}
                                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-red-500/10" />
                                <div className="relative z-10 flex h-full flex-col">
                                    <div className="flex items-start justify-between gap-5">
                                        <span className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-t-full rounded-b-2xl border border-red-500/15 bg-[#faf9f6] text-3xl shadow-inner">
                                            {val.icon}
                                        </span>
                                        <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-red-500/70">
                                            0{i + 1}
                                        </span>
                                    </div>
                                    <div className="mt-10">
                                        <h3 className="text-2xl font-medium leading-tight text-[#2f2f31]">
                                            {val.title}
                                        </h3>
                                        {/* <div className="mt-5 h-px w-12 bg-red-500/30 transition-all duration-300 group-hover:w-20" /> */}
                                    </div>
                                    <p className="mt-auto pt-10 text-para-secondary text-sm leading-relaxed">
                                        {val.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-28 px-6 md:px-16 bg-white!">
                <div ref={awardsRef} className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-500">
                            Recognition
                        </span>
                        <Heading
                            ref={awardsHeadingRef}
                            className="text-5xl! md:text-6xl! mt-4"
                        >
                            Awards & Accolades
                        </Heading>
                        <p className="text-para-secondary text-base mt-4 max-w-lg mx-auto leading-relaxed">
                            Our commitment to authentic Vietnamese cuisine and warm hospitality has been recognized across Nepal.
                        </p>
                    </div>
                </div>
                {/* ── Infinite marquee track (full-bleed, no max-w constraint) ── */}
                <div className="relative overflow-hidden w-full">
                    {/* left + right fade masks */}
                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" /> */}
                    {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" /> */}
                    {/* marquee strip — duplicate the list so the seam is invisible */}
                    <div className="flex gap-6 w-max" style={{ animation: "awardsMarquee 32s linear infinite" }}>
                        {[1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4].map((num, i) => (
                            <div
                                key={i}
                                ref={(el) => { if (i < 4) awardImageRefs.current[i] = el; }}
                                className="flex-shrink-0 flex flex-col items-center gap-4 w-[220px]"
                            >
                                {/* badge */}
                                <div className="relative w-[140px] h-[140px] rounded-2xl overflow-hidden bg-[#faf9f6] shadow-sm hover:shadow-lg transition-all duration-300 group">
                                    <Image
                                        src={`/PhooRes/People/Awards/Awards-${num}.${num === 4 ? 'png' : 'jpg'}`}
                                        alt={`Award ${num}`}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                {/* label */}
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-black leading-snug">
                                        {[
                                            "Food Taste Award",
                                            "Luxury Restaurant Award",
                                            "Best Choice Award",
                                            "Restaurant Choice Award",
                                        ][num - 1]}
                                    </p>
                                    <p className="text-xs text-zinc-400 mt-1 tracking-wide">
                                        {["2018", "2019", "2020", "2020"][num - 1]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <style>{`
                    @keyframes awardsMarquee {
                        0%   { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                `}</style>
            </section>
        </div>
    );
};

export default AboutUsMain;
