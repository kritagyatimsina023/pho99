"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Heading from "../Heading";
import Button from "../Button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const SVGImage = [
    {
        id: 1,
        source: "/About/Salt/S.svg",
        title: "Stories",
        desc: "stories of the silk road, salt caravans and fishing villages",
    },
    {
        id: 2,
        source: "/About/Salt/A.svg",
        title: "Art",
        desc: "serving on salt slabs, decor made of crystals from the Himalayas and the Dead Sea",
    },
    {
        id: 3,
        source: "/About/Salt/L.svg",
        title: "Legacy",
        desc: `recipes preserved as salt -  Georgian adzhika, Egyptian dukka,  Provencal herbs
Taste
playing with salty accents: marinated olives, ferme`,
    },
    {
        id: 4,
        source: "/About/Salt/T.svg",
        title: "Taste",
        desc: "playing with salty accents: marinated olives, fermented cheeses, sea salt caramel",
    },
];

const Courses = [
    {
        id: 1,
        headingOne: "Course I",
        title: "Fresh Breeze",
        desc: `Tuna with pomegranate and Egyptian dukkah Mediterranean tuna marinated in lemon juice, garnished with pomegranate grains and Gorgian tkemali sauce`,
        footerPart: `Lightness - Birth of a Dialouge`,
        src: "/Slider/Course-1.webp",
    },
    {
        id: 2,
        headingOne: "Course II",
        title: "Mystery of the depths",
        desc: `Charred octopus with black garlic and saffron cream Tender octopus slowly grilled over open flame, paired with silky saffron cream and finished with aromatic black garlic essence`,
        footerPart: "Mystery - Fiery Palette",
        src: "/Slider/Course-2.webp",
    },
    {
        id: 3,
        headingOne: "Course III",
        title: "The Heart of the Surf",
        desc: `Seared sea bass with citrus herbs and coastal greens Fresh sea bass pan-seared to perfection, accompanied by fragrant herbs, vibrant greens and a delicate citrus glaze`,
        footerPart: "Energy - synthesis of Elements",
        src: "/Slider/Course-3.webp",
    },
    {
        id: 4,
        headingOne: "Course IV",
        title: "Pier of three cultures",
        desc: `Red mullet with Georgian spices and Mediterranean olives Delicate red mullet infused with traditional spices, served alongside marinated olives and rich regional flavours`,
        footerPart: "Unity - Earth and sea",
        src: "/Slider/Course-4.webp",
    },
    {
        id: 5,
        headingOne: "Course V",
        title: "Sunset over the ocean",
        desc: `Salted caramel mousse with figs and orange blossom Silky caramel mousse layered with sweet figs, accented by orange blossom aromas and a touch of sea salt`,
        footerPart: "Finale - of a symphony",
        src: "/Slider/Course-5.webp",
    },
];
const SaltMain = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const contentPanelRef = useRef<HTMLDivElement>(null);
    const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const svgPanelRefs = useRef<(HTMLDivElement | null)[]>([]);

    const setTitleRef = useCallback(
        (el: HTMLHeadingElement | null, index: number) => {
            titleRefs.current[index] = el;
        },
        []
    );

    const setSvgPanelRef = useCallback(
        (el: HTMLDivElement | null, index: number) => {
            svgPanelRefs.current[index] = el;
        },
        []
    );

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const contentPanel = contentPanelRef.current;
        if (!section || !track || !contentPanel) return;

        const getScrollAmount = () => {
            return -(track.scrollWidth - window.innerWidth);
        };

        // Main horizontal scroll tween — drives the entire track
        const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${track.scrollWidth - window.innerWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            },
        });

        const allTweens: gsap.core.Tween[] = [];

        // Phase 1: Content panel fades out as it exits
        const contentFade = gsap.fromTo(
            contentPanel,
            { opacity: 1 },
            {
                opacity: 0,
                scrollTrigger: {
                    trigger: contentPanel,
                    containerAnimation: tween,
                    start: "center center",
                    end: "right left",
                    scrub: true,
                },
            }
        );
        allTweens.push(contentFade);

        // Phase 2: Each SVG panel — letter, title, desc fade in then out
        svgPanelRefs.current.forEach((panel) => {
            if (!panel) return;
            const letterEl = panel.querySelector(".salt-letter");
            const titleEl = panel.querySelector(".salt-title");
            const descEl = panel.querySelector(".salt-desc");
            // Entire panel fades in and out
            const panelFade = gsap.fromTo(
                panel,
                { opacity: 0 },
                {
                    opacity: 0,
                    keyframes: [
                        { opacity: 0, percent: 0 },
                        { opacity: 1, percent: 30 },
                        { opacity: 1, percent: 70 },
                        { opacity: 0, percent: 100 },
                    ],
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: tween,
                        start: "left 90%",
                        end: "right 10%",
                        scrub: true,
                    },
                }
            );
            allTweens.push(panelFade);

            // Letter scales up from behind
            if (letterEl) {
                const letterAnim = gsap.fromTo(
                    letterEl,
                    { scale: 0.3, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: tween,
                            start: "left 80%",
                            end: "left 40%",
                            scrub: true,
                        },
                    }
                );
                allTweens.push(letterAnim);
            }
            // Title slides up
            if (titleEl) {
                const titleAnim = gsap.fromTo(
                    titleEl,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: tween,
                            start: "left 65%",
                            end: "left 35%",
                            scrub: true,
                        },
                    }
                );
                allTweens.push(titleAnim);
            }

            // Desc slides up after title
            if (descEl) {
                const descAnim = gsap.fromTo(
                    descEl,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: tween,
                            start: "left 55%",
                            end: "left 25%",
                            scrub: true,
                        },
                    }
                );
                allTweens.push(descAnim);
            }
        });

        // Phase 3: Course title opacity 0.1 → 0.9 → 0.1
        titleRefs.current.forEach((titleEl) => {
            if (!titleEl) return;
            const t = gsap.fromTo(
                titleEl,
                { opacity: 0.1 },
                {
                    opacity: 0.1,
                    keyframes: [
                        { opacity: 0.1, percent: 0 },
                        { opacity: 0.9, percent: 50 },
                        { opacity: 0.1, percent: 100 },
                    ],
                    scrollTrigger: {
                        trigger: titleEl,
                        containerAnimation: tween,
                        start: "left 80%",
                        end: "right 20%",
                        scrub: true,
                    },
                }
            );
            allTweens.push(t);
        });
        return () => {
            allTweens.forEach((t) => {
                t.scrollTrigger?.kill();
                t.kill();
            });
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-black w-full overflow-hidden"
            style={{ height: "100dvh" }}
        >
            {/* Salt crystals — fixed background layer */}
            <div className="absolute inset-0 z-0 w-full h-full">
                {saltCrystals.map((s, i) => (
                    <Image
                        key={i}
                        src={s.crystalSrc}
                        width={120}
                        height={120}
                        alt=""
                        aria-hidden="true"
                        className="absolute pointer-events-none select-none opacity-20"
                        style={{
                            top: s.top,
                            bottom: s.bottom,
                            left: s.left,
                            right: s.right,
                            transform: `rotate(${s.rotate}deg)`,
                        }}
                    />
                ))}
            </div>
            {/* Horizontal scroll track */}
            <div
                ref={trackRef}
                className="flex items-center h-full relative z-10 flex-nowrap"
                style={{ willChange: "transform" }}
            >
                {/* Panel 1: Intro content */}
                <div
                    ref={contentPanelRef}
                    className="flex-none flex flex-col items-center justify-center text-center"
                    style={{ width: "100vw", height: "100dvh" }}
                >
                    <h2>We present to you</h2>
                    <Heading className="text-center text-6xl! heading-secondary">
                        immersive gastronomic show
                    </Heading>
                    <p className="max-w-md pl-5 text-xl mx-auto mt-4 text-para-secondary">
                        5 courses where Egypt, Georgia and the Mediterranean speak the
                        language of fish and salt. From oysters with smoky spices to trout on
                        pink Himalayan salt. Each course is a wave of flavour enhanced by
                        signature wines and cocktails. We don&apos;t reveal all our secrets.
                        Reservation a table for a taste of the sea.
                    </p>
                    <div className="mt-8">
                        <Button className="">Reservation</Button>
                    </div>
                </div>

                {/* Panels 2–5: SALT letters */}
                {SVGImage.map((image, index) => (
                    <div
                        key={image.id}
                        ref={(el: HTMLDivElement | null) => setSvgPanelRef(el, index)}
                        className="flex-none flex flex-col items-center justify-center"
                        style={{ width: "100vw", height: "100dvh", opacity: 0 }}
                    >
                        <div className="relative w-[18vw] h-[50vh] salt-letter">
                            <Image
                                src={image.source}
                                alt={image.title}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="px-4 text-left max-w-sm mt-6">
                            <h3 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wide salt-title">
                                {image.title}
                            </h3>
                            <p className="mt-2 text-sm text-white/70 leading-snug salt-desc">
                                {image.desc}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Panels 6–10: Courses */}
                {Courses.map((images) => (
                    <div
                        className="relative z-30 flex-none flex flex-col items-center
              justify-center text-center px-8 md:px-16"
                        style={{ width: "100vw", height: "100dvh" }}
                        key={images.id}
                    >
                        <div className="flex flex-col items-center">
                            <h2 className="">{images.headingOne}</h2>
                            <Heading
                                ref={(el: HTMLHeadingElement | null) =>
                                    setTitleRef(el, images.id - 1)
                                }
                                className="text-7xl! text-para-secondary "
                                style={{ opacity: 0.1 }}
                            >
                                {images.title}
                            </Heading>
                            <span
                                className="heading-secondary max-w-md
                 text-start leading-[1.1] text-[#A9A49D]!"
                            >
                                {images.desc}
                            </span>
                        </div>
                        <div className="flex justify-center my-8">
                            <Image
                                src={images.src}
                                alt="Courses-image"
                                width={450}
                                height={450}
                                className="object-cover"
                            />
                        </div>
                        <div className="w-full flex justify-center ">
                            <Heading className="text-8xl!  font-heading text-center ">
                                {images.footerPart}
                            </Heading>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SaltMain;
