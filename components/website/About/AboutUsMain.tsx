'use client'
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Heading from "../../Heading";
import Button from "../../Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageMainHero from "@/components/PageMainHero";
import { Users, Utensils, CalendarDays, Heart, Soup, Sparkles, Handshake, Home } from "lucide-react";

import { IconBase } from "react-icons";
import Arrow from "@/components/Arrow";

gsap.registerPlugin(ScrollTrigger);

const locations = [
    {
        name: "Lazimpat",
        desc: "Where it all began  our flagship location in the heart of Lazimpat introduced Kathmandu to authentic Vietnamese cuisine through cherished family recipes.",
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
        id: 1,
        title: "Authenticity",
        desc: "Every dish is prepared using traditional Vietnamese techniques and cherished family recipes passed down through generations.",
        icon: "🍜",
        bg: "/PhooRes/Building/Hat.png"
    },
    {
        id: 2,
        title: "Quality",
        desc: "We source only the finest, freshest ingredients to ensure each bowl of pho and every plate delivers exceptional flavor.",
        icon: "✦",
        bg: "/PhooRes/Building/Hat.png"

    },
    {
        id: 3,
        title: "Hospitality",
        desc: "Warm, genuine service inspired by Vietnamese traditions  where every guest is treated like family.",
        icon: "🤝",
        bg: "/PhooRes/Building/lamp.png"

    },
    {
        id: 4,

        title: "Community",
        desc: "Four locations across Kathmandu, each rooted in its neighborhood, building connections through food and culture.",
        icon: "🏠",
        bg: "/PhooRes/Building/Image.png",
        bottom: "-20%",
        right: "-10%"

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

    // Stats refs & counter state
    const statsRef = useRef<HTMLDivElement | null>(null);
    const [countersStarted, setCountersStarted] = useState(false);
    const [heartCount, setHeartCount] = useState(0);
    const [dishCount, setDishCount] = useState(0);
    const [yearCount, setYearCount] = useState(0);

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

    // ── Stats counter: fire once when section enters viewport ──
    useEffect(() => {
        const node = statsRef.current;
        if (!node || countersStarted) return;

        const animateCount = (
            target: number,
            duration: number,
            setter: (v: number) => void
        ) => {
            const start = performance.now();
            // easeOutCubic — fast start, smooth settle
            const ease = (t: number) => 1 - Math.pow(1 - t, 3);

            const tick = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(ease(progress) * target);
                setter(progress === 1 ? target : value);
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(
            ([entry], obs) => {
                if (entry.isIntersecting) {
                    setCountersStarted(true);
                    obs.unobserve(entry.target); // ensure it runs only once
                    animateCount(100, 2200, setHeartCount);
                    animateCount(300, 1800, setDishCount);
                    animateCount(10, 1600, setYearCount);
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [countersStarted]);

    return (
        <div className="bg-white! relative z-10">
            <PageMainHero heroImg="/PhooRes/Building/aboutmainhero.png" heading="About Pho99" subHeading="A taste of Home,Crafted with Love" />
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
                            className="text-neutral-600 text-base leading-relaxed"
                        >
                            <span className="text-primary! text-5xl">P</span>ho99 was born from a simple dream  to bring the authentic flavors of Vietnam to the streets of Kathmandu. What began as a single restaurant in Lazimpat has grown into a beloved family of four locations, each carrying the same passion for genuine Vietnamese cuisine and heartfelt hospitality.
                        </p>
                        <p
                            ref={(el) => { storyParaRefs.current[1] = el }}
                            className="text-neutral-600 text-base leading-relaxed"
                        >
                            Our recipes are not just dishes  they are stories passed down through generations, carefully preserved and lovingly prepared. From the slow-simmered broths that take hours to perfect, to the fresh herbs and spices that define each plate, every detail reflects our commitment to authenticity. Essential ingredients  from the rice noodles and aromatic spices to the fish sauce and herbs  are sourced directly from Vietnam to ensure every bowl stays true to its roots.
                        </p>
                        <p
                            ref={(el) => { storyParaRefs.current[2] = el }}
                            className="text-neutral-600 text-base leading-relaxed"
                        >
                            Today, Pho99 stands as a bridge between Vietnamese culinary traditions and Nepal&apos;s vibrant food culture  a place where friends and families gather to share meals, make memories, and experience the warmth of Vietnamese hospitality. With over 70 dishes on the menu, from steaming bowls of phở and crispy bánh mì to vibrant salads and freshly baked baguettes, there is always something to discover.
                        </p>
                    </div>
                    {/* Image side  arch shape */}
                    <div ref={storyImageRef} className="relative">
                        <div className="relative w-full aspect-[4/5] rounded-t-full overflow-hidden shadow-2xl">
                            <Image
                                src="/PhooRes/Building/Story.png"
                                alt="Pho99 Signature Dish"
                                fill
                                className="object-cover"
                            />
                        </div>

                    </div>
                </div>
            </section>
            {/* ── Stats / counter section ── */}
            <section className="relative py-10 px-6 md:px-16 bg-white overflow-hidden">
                {/* soft red ambient glows */}
                {/* Heading */}
                <div className="max-w-3xl mx-auto text-center mb-16 relative">
                    <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-4">
                        Our Journey
                    </span>
                    <Heading className="text-5xl! md:text-6xl! leading-[1.05] text-[#1a1a1a]">
                        A Journey Shared With Thousands
                    </Heading>
                    <p className="text-para-secondary mt-5 max-w-xl mx-auto">
                        Every bowl served, every guest welcomed, and every year of dedication
                        reflects our passion for authentic Vietnamese cuisine.
                    </p>
                </div>
                {/* Stats grid */}
                <div
                    ref={statsRef}
                    className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 bg-white/90 backdrop-blur-sm rounded-[2rem] border border-red-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
                >
                    {/* Decorative background curves */}
                    <div className="absolute left-0 bottom-0 pointer-events-none opacity-[0.05] z-0 -translate-x-1/2 translate-y-1/2">
                        <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            {/* <circle cx="100" cy="100" r="180" fill="none" stroke="#C10008" strokeWidth="2" /> */}
                            {/* <circle cx="100" cy="100" r="150" fill="none" stroke="#C10008" strokeWidth="2" /> */}
                            {/* <circle cx="100" cy="100" r="120" fill="none" stroke="#C10008" strokeWidth="2" /> */}
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#C10008" strokeWidth="2" />
                            {/* <circle cx="100" cy="100" r="60" fill="none" stroke="#C10008" strokeWidth="2" /> */}
                        </svg>
                    </div>
                    <div className="absolute -right-35 -top-40 pointer-events-none opacity-[0.05] z-0 ">
                        <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            {/* <circle cx="100" cy="100" r="180" fill="none" stroke="#C10008" strokeWidth="2" /> */}
                            {/* <circle cx="100" cy="100" r="150" fill="none" stroke="#C10008" strokeWidth="2" /> */}
                            {/* <circle cx="100" cy="100" r="120" fill="none" stroke="#C10008" strokeWidth="2" /> */}
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#C10008" strokeWidth="2" />
                            {/* <circle cx="100" cy="100" r="60" fill="none" stroke="#C10008" strokeWidth="2" /> */}
                        </svg>
                    </div>

                    {[
                        {
                            label: "Hearts Nourished",
                            value: `${heartCount.toLocaleString()}K+`,
                            sub: null,
                            icon: (
                                <div className="relative flex items-center justify-center">
                                    <Users className="w-8 h-8 stroke-[1.5]" />
                                    <Heart className="w-4 h-4 absolute -top-1 stroke-[2] fill-[#B22222]" />
                                </div>
                            ),
                        },
                        {
                            label: "More than",
                            value: `${dishCount}+`,
                            sub: "Vietnamese Dishes",
                            icon: <Utensils className="w-8 h-8 stroke-[1.5]" />,
                        },
                        {
                            label: "Serving Love on a Plate for",
                            value: `${yearCount}+`,
                            sub: "Years",
                            icon: <CalendarDays className="w-8 h-8 stroke-[1.5]" />,
                        },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="group relative z-10 flex flex-col items-center justify-center px-4 py-4 md:py-7"
                        >
                            {/* Separator line for desktop */}
                            {i !== 2 && (
                                <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-8 h-3/4 flex-col items-center justify-center translate-x-1/2 z-20">
                                    <div className="w-[1px] flex-1 bg-red-200/80" />
                                    <div className="relative w-5 h-5 shrink-0 my-3">
                                        <Image src="/PhooRes/Building/lotusDesign.png" fill alt="" className="object-contain" />
                                    </div>
                                    <div className="w-[1px] flex-1 bg-red-200/80" />
                                </div>
                            )}
                            {/* Separator line for mobile */}
                            {i !== 2 && (
                                <div className="flex md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 h-8 w-3/4 flex-row items-center justify-center translate-y-1/2 z-20">
                                    <div className="h-[1px] flex-1 bg-red-200/80" />
                                    <div className="relative w-5 h-5 shrink-0 mx-3">
                                        <Image src="/PhooRes/Building/lotusDesign.png" fill alt="" className="object-contain" />
                                    </div>
                                    <div className="h-[1px] flex-1 bg-red-200/80" />
                                </div>
                            )}
                            {/* Icon Circle */}
                            <div className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center text-[#B22222] mb-6 bg-[#fcf5f5]">
                                {stat.icon}
                            </div>
                            {/* Label */}
                            <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] text-[#333333]">
                                {stat.label}
                            </span>

                            {/* Red Accent Line */}
                            <Arrow className="w-16 h-3 mt-2 mb-3" />

                            {/* Value & Sub */}
                            <div className="flex flex-col items-center gap-0.5">
                                <span className="text-[2.8rem] lg:text-[3.2rem] font-heading font-melfira text-[#1A1A1A] leading-none">
                                    {stat.value}
                                </span>
                                {stat.sub && (
                                    <span className="text-sm lg:text-base text-[#4A4A4A]">
                                        {stat.sub}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="py-28 px-6 md:px-16 bg-white!">
                <div ref={ownerRef} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image  rounded leaf shape */}
                    <div ref={ownerImageRef} className="relative order-2 lg:order-1">
                        <div className="relative w-full max-w-[420px] mx-auto aspect-[3/4] rounded-t-full overflow-hidden ">
                            <Image
                                src="/PhooRes/People/owner.jpg"
                                alt="Vo Thi Kim Cuong  Founder & CEO"
                                fill
                                className="object-cover object-start"
                            />
                        </div>
                        {/* Name & position tag */}
                        <div className="mt-6 mx-auto text-center  py-4 px-6 rounded-xl  max-w-[320px]">
                            <p className="text-3xl  font-melfira font-bold text-black! tracking-wide">
                                Naveen Saru
                            </p>
                            <p className="text-xs tracking-[0.22em] uppercase text-red-500! font-bold! mt-1">
                                Founder & Visionary
                            </p>
                        </div>
                    </div>
                    {/* Text */}
                    <div className="flex flex-col gap-6 order-1 lg:order-2">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-600!">
                            The Founder
                        </span>
                        <Heading
                            ref={ownerHeadingRef}
                            className="text-5xl! md:text-6xl! leading-[1.05]"
                        >
                            Bringing <span className="font-melfira text-red-600!" >
                                Vietnam's Heart  </span>  to Kathmandu
                        </Heading>
                        <p
                            ref={ownerParaRef}
                            className="text-neutral-800 text-base leading-relaxed  font-medium relative z-10"
                        >
                            When Naveen Saru first traveled to Vietnam, he was captivated not only by its vibrant culture and breathtaking landscapes but by a simple bowl of pho served from a humble street-side kitchen. The rich broth, fragrant herbs, and generations of tradition behind every bowl revealed a story far deeper than food  a story of family, love, and heritage.
                        </p>


                        <p className="text-neutral-800 text-base leading-relaxed">
                            During that journey, Naveen met the woman who would later become his wife. Raised in a family that had perfected traditional Vietnamese recipes over generations, she shared with him a passion for cooking that extended beyond ingredients and techniques. For her, food was a way of preserving memories, honoring family traditions, and bringing people together around a shared table.
                        </p>

                        <p className="text-neutral-800 text-base leading-relaxed">
                            Inspired by their shared vision, the couple brought a piece of Vietnam to Kathmandu and founded Pho99. Today, every dish served reflects that journey  from the slow-simmered broths and carefully selected herbs to the warm hospitality that welcomes every guest. More than a restaurant, Pho99 is a celebration of two cultures united by a love for authentic food, meaningful connections, and unforgettable dining experiences.
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
                            Preserving <span className="font-melfira text-red-600!" >Vietnam's Culinary </span>
                            Heritage
                        </Heading>
                        <p
                            ref={chefParaRef}
                            className="text-neutral-800 text-base leading-relaxed  font-medium relative z-10"
                        >
                            At Pho99, we are honored to be guided by our Executive Chef, Thi Kim Cuong Vo (Bao), whose expertise and deep-rooted passion for authentic Vietnamese cuisine serve as the heart of our culinary identity. With extensive experience in traditional Vietnamese cooking and modern culinary techniques, Chef Bao brings exceptional skill, creativity, and cultural authenticity to every dish we serve.
                        </p>
                        <p className="text-neutral-800 text-base leading-relaxed">
                            Dedicated to maintaining the highest standards of quality, consistency, and freshness, Chef Bao carefully oversees every aspect of our menu. From our signature pho with its rich, slow-simmered broth to each appetizer and specialty dish, every recipe is prepared with meticulous attention to detail, ensuring the true flavors of Vietnam are preserved in every bite.
                        </p>
                        <p className="text-neutral-800 text-base leading-relaxed">
                            Beyond the kitchen, Chef Bao plays a vital leadership role by mentoring and inspiring our culinary teams across all Pho99 locations. Her unwavering commitment to excellence in hygiene, food safety, presentation, and taste has helped establish Pho99 as one of Nepal's most trusted destinations for authentic Vietnamese cuisine. Today, her culinary vision and dedication continue to shape the dining experience at our Lazimpat, Boudhanath, Jhamsikhel, and Thamel branches, bringing the spirit of Vietnam to every guest who walks through our doors.
                        </p>
                    </div>
                    {/* Image  arch shape */}
                    <div ref={chefImageRef} className="relative">
                        <div className="relative w-full max-w-[420px] mx-auto aspect-[3/4] rounded-t-full overflow-hidden ">
                            <Image
                                src="/PhooRes/People/Chef-executive.jpeg"
                                alt="Executive Chef"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Name & position tag */}
                        <div className="mt-6 mx-auto text-center  py-4 px-6 rounded-xl  max-w-[425px]">
                            {/* <p className="text-2xl font-bold text-red-600! tracking-wide">Vo Thi Kim Cuong</p>
                            <p className="text-xs font-bold tracking-[0.25em] uppercase text-red-500 mt-1">Executive Chef</p> */}
                            <p className="text-3xl w-full font-heading font-melfira font-bold text-black! tracking-wide">
                                Vo Thi Kim Cuong
                            </p>
                            <p className="text-xs font-bold! tracking-[0.25em] uppercase text-red-600! mt-1">
                                Executive Chef
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="relative overflow-hidden py-28 px-6 md:px-16 bg-white">
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
                        <p className="text-zinc-400! text-base leading-relaxed max-w-xl lg:ml-auto">
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

                                    </div>
                                    <p className="mt-auto pt-10 text-zinc-800! text-sm leading-relaxed">
                                        {val.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
            <section className="relative overflow-hidden py-28 px-6 md:px-16 bg-white">
                <div ref={valuesRef} className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-10 mb-16 relative">
                        {/* Faint background illustrations can go here if needed */}
                        <div className="absolute bg-amber-400 right-20 h-140 w-180 top-0 opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/4">

                            {/* <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="100" cy="100" r="90" stroke="#DC2626" strokeWidth="0.5" />
                                <path d="M50 100 Q 100 50 150 100 T 50 100" stroke="#DC2626" strokeWidth="0.5" />
                            </svg> */}
                            <Image fill src={"/PhooRes/Building/Image.png"} alt="Img" className="object-cover " />
                        </div>
                        <div className="max-w-xl z-10">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-600 block mb-2">
                                What We Stand For
                            </span>
                            {/* <div className="w-8 h-[2px] bg-red-600 mb-6" /> */}
                            <Heading
                                ref={valuesHeadingRef}
                                className="text-6xl! md:text-7xl! text-black! font-melfira leading-[1.02]"
                            >
                                Our Values
                            </Heading>
                            {/* <div className="mt-8 flex items-center gap-4">

                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="#DC2626" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                                 </svg>
                                 <div className="h-[1px] w-full max-w-[300px] bg-red-200" />
                             </div> */}
                        </div>
                        {/* <p className="text-zinc-600! text-sm md:text-base leading-relaxed max-w-sm lg:pb-4 z-10">
                            The details that shape every Pho99 experience, from the broth simmering in our kitchens to the welcome waiting at each table.
                        </p> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((val, i) => (
                            <div
                                key={val.title}
                                ref={(el) => { valueCardRefs.current[i] = el }}
                                className="group relative flex flex-col min-h-[380px] overflow-hidden rounded-[1.5rem] bg-white p-8 shadow-[0_4px_25px_rgb(0,0,0,0.04)] border border-red-50/50  transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                {/* <div className="absolute -right-10 -top-10 h-30 w-30 rounded-full border border-red-400/30" /> */}
                                {/* Background decorative faint icon (optional, matching image bottom-right graphics) */}
                                {/* <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none text-red-600">
                                    {i === 1 && <Sparkles className="w-48 h-48" strokeWidth={0.5} />}
                                    {i === 3 && <Home className="w-48 h-48" strokeWidth={0.5} />}
                                </div> */}

                                <div className="flex justify-between items-start w-full mb-10 z-10">
                                    {/* Icon Circle */}
                                    {/* <div className="w-16 h-16 rounded-full bg-red-50/50 border border-red-100 flex items-center justify-center text-red-500">
                                        {val.id === 1 && <Soup className="w-7 h-7 stroke-[1.5]" />}
                                        {val.id === 2 && <Sparkles className="w-7 h-7 stroke-[1.5]" />}
                                        {val.id === 3 && <Handshake className="w-7 h-7 stroke-[1.5]" />}
                                        {val.id === 4 && <Home className="w-7 h-7 stroke-[1.5]" />}
                                    </div> */}
                                    {/* Number */}
                                    <div className="flex relative flex-col rounded-full  items-center">
                                        {/* <span className="text-red-600 font-bold text-lg leading-none">0{i + 1}</span> */}
                                        {/* <div className="w-5 h-[2px] bg-red-600 mt-2" /> */}
                                    </div>
                                </div>
                                <div className="z-10">
                                    <h3 className="text-3xl font-heading font-melfira text-black! mb-4">
                                        {val.title}
                                    </h3>
                                    <div className="w-10 group-hover:w-full transition-all duration-500 h-[1.5px] bg-red-300 mb-6" />
                                    <p className="text-zinc-600 text-[13px] leading-relaxed pr-2">
                                        {val.desc}
                                    </p>
                                </div>
                                <div style={{
                                    bottom: val.bottom ?? "-15%",
                                    right: val.right ?? "-40%"
                                }} className="absolute group-hover:opacity-75 transition-all duration-300   opacity-45 z-0 h-[280px] w-[280px]" >
                                    <Image
                                        src={val.bg}
                                        alt=""
                                        fill
                                        className="object-contain"
                                    />
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

                <div className="relative overflow-hidden w-full">
                    {/* left + right fade masks */}
                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" /> */}
                    {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" /> */}
                    {/* marquee strip  duplicate the list so the seam is invisible */}
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