"use client";

import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/components/Heading";
import { MenuPageTabs } from "./MenuPageTabs";
import Layout from "@/components/Layout";


gsap.registerPlugin(ScrollTrigger);

const menuPages = Array.from({ length: 10 }, (_, index) => ({
    src: `/PhooRes/Menu/menu-${index + 1}.webp`,
    alt: `Pho99 menu page ${index + 1}`,
}));

// ─── at the top of the file, add this data array ───────────────────────────

const MENU_ITEMS = [
    { name: "Beef Pho", category: "dish" as const, src: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=75" },
    { name: "Spring Rolls", category: "dish" as const, src: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=800&q=75" },
    { name: "Chicken Pho", category: "dish" as const, src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=75" },
    { name: "Banh Mi", category: "dish" as const, src: "https://images.unsplash.com/photo-1600628421060-7d0a0a71b9d7?w=800&q=75" },
    { name: "Veg Noodle Bowl", category: "dish" as const, src: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=75" },
    { name: "Pho Special", category: "dish" as const, src: "https://images.unsplash.com/photo-1501959915551-4e8d30928317?w=800&q=75" },

    { name: "Lemon Iced Tea", category: "drink" as const, src: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=75" },
    { name: "Vietnamese Coffee", category: "drink" as const, src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=75" },
    { name: "Fresh Lime Soda", category: "drink" as const, src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=75" },
    { name: "Mango Lassi", category: "drink" as const, src: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=75" },

    { name: "Che Ba Mau", category: "sweets" as const, src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=75" },
    { name: "Pandan Cake", category: "sweets" as const, src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=75" },
    { name: "Mango Pudding", category: "sweets" as const, src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=75" },
    { name: "Coconut Jelly", category: "sweets" as const, src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=75" },
];






type Category = "all" | "dish" | "drink" | "sweets";

const CATEGORY_TABS: { label: string; value: Category }[] = [
    { label: "All", value: "all" },
    { label: "Dish", value: "dish" },
    { label: "Drink", value: "drink" },
    { label: "Sweets", value: "sweets" },
];

const BADGE_STYLES: Record<string, string> = {
    dish: "bg-[#FAECE7] text-[#993C1D]",
    drink: "bg-[#E6F1FB] text-[#185FA5]",
    sweets: "bg-[#FAEEDA] text-[#854F0B]",
};

const MenuMain = () => {
    const heroRef = useRef<HTMLElement | null>(null);
    const heroImageRef = useRef<HTMLImageElement | null>(null);
    const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
    const openSectionRef = useRef<HTMLElement | null>(null);
    const menuShellRef = useRef<HTMLDivElement | null>(null);
    const leftPageRef = useRef<HTMLDivElement | null>(null);
    const rightPageRef = useRef<HTMLDivElement | null>(null);
    const menuContentRef = useRef<HTMLDivElement | null>(null);
    const handRef = useRef<HTMLDivElement | null>(null);
    const menuPageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const menuImageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const filterGridRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);


    const [activeCategory, setActiveCategory] = useState<Category>("all");

    const filteredItems = activeCategory === "all"
        ? MENU_ITEMS
        : MENU_ITEMS.filter((item) => item.category === activeCategory);



    const handleFilter = useCallback((cat: Category) => {
        if (cat === activeCategory || isAnimating.current) return;
        isAnimating.current = true;

        const grid = filterGridRef.current;
        if (!grid) { setActiveCategory(cat); isAnimating.current = false; return; }

        const visibleCards = Array.from(
            grid.querySelectorAll<HTMLElement>("[data-category]")
        );

        // 1. fade out all visible cards
        gsap.to(visibleCards, {
            opacity: 0,
            scale: 0.92,
            y: 10,
            duration: 0.22,
            stagger: 0.03,
            ease: "power2.in",
            onComplete: () => {
                // 2. swap state (React reflows the grid)
                setActiveCategory(cat);
                // 3. stagger new cards in on next tick
                requestAnimationFrame(() => {
                    const newCards = Array.from(
                        grid.querySelectorAll<HTMLElement>("[data-category]")
                    );
                    gsap.fromTo(
                        newCards,
                        { opacity: 0, scale: 0.88, y: 18 },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            duration: 0.38,
                            stagger: 0.055,
                            ease: "power3.out",
                            onComplete: () => { isAnimating.current = false; },
                        }
                    );
                });
            },
        });
    }, [activeCategory]);

    useGSAP(() => {
        if (heroRef.current && heroImageRef.current) {
            gsap.fromTo(heroImageRef.current,
                { yPercent: -8, scale: 1.12 },
                {
                    yPercent: 8,
                    scale: 1.18,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",

                        scrub: 1,
                    },
                }
            );
        }

        if (heroTitleRef.current) {
            gsap.fromTo(heroTitleRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.2 }
            );
        }

        if (openSectionRef.current && menuShellRef.current && leftPageRef.current && rightPageRef.current) {
            const openTl = gsap.timeline({
                scrollTrigger: {
                    trigger: openSectionRef.current,
                    start: "top 62%",
                    end: "top 12%",
                    markers: true,
                    scrub: 1,
                },
            });

            openTl
                .fromTo(menuShellRef.current,
                    { y: 80, rotateX: 9, scale: 0.92, opacity: 0.1 },
                    { y: 0, rotateX: 0, scale: 1, opacity: 1, ease: "power2.out" }
                )
                .fromTo(handRef.current,
                    { opacity: 0, x: 80, y: 38, rotate: -18 },
                    { opacity: 1, x: 0, y: 0, rotate: -5, ease: "power2.out" },
                    "<+=0.1"
                )
                .fromTo(leftPageRef.current,
                    { rotateY: -86, xPercent: 48, filter: "brightness(0.72)" },
                    { rotateY: 0, xPercent: 0, filter: "brightness(1)", ease: "power3.inOut" },
                    "<+=0.12"
                )
                .fromTo(rightPageRef.current,
                    { rotateY: 86, xPercent: -48, filter: "brightness(0.72)" },
                    { rotateY: 0, xPercent: 0, filter: "brightness(1)", ease: "power3.inOut" },
                    "<"
                )
                .to(handRef.current,
                    { opacity: 0, x: -26, y: -12, rotate: -18, ease: "power2.in" },
                    ">-=0.2"
                )
                .fromTo(menuContentRef.current,
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, ease: "power2.out" },
                    ">-=0.25"
                );
        }

        menuPageRefs.current.forEach((pageEl, index) => {
            const imageEl = menuImageRefs.current[index];
            if (!pageEl || !imageEl) return;

            const opensFromLeft = index % 2 === 0;
            const startClipPath = opensFromLeft
                ? "polygon(0 0, 0 0, 10% 100%, 0 100%)"
                : "polygon(100% 0, 100% 0, 90% 100%, 100% 100%)";
            const endClipPath = opensFromLeft
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

            gsap.set(pageEl, {
                clipPath: startClipPath,
                opacity: 0.25,
            });

            gsap.set(imageEl, {
                scale: 1.08,
                xPercent: opensFromLeft ? -3 : 3,
                filter: "blur(6px)",
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: pageEl,
                    start: "top 82%",
                    end: "top 42%",
                    scrub: 1,
                },
            })
                .to(pageEl, {
                    clipPath: endClipPath,
                    opacity: 1,
                    ease: "power3.inOut",
                })
                .to(imageEl, {
                    scale: 1,
                    xPercent: 0,
                    filter: "blur(0px)",
                    ease: "power2.out",
                }, "<");
        });
    }, []);

    return (
        <main className="bg-white">
            <section ref={heroRef} className="relative h-[85vh] w-full overflow-hidden">
                <Image
                    ref={heroImageRef}
                    src="/PhooRes/HeroSlider/PhoFood-1.avif"
                    alt="Pho99 signature Vietnamese food"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
                <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-24 text-center">
                    <span className="mb-4 text-xs font-semibold tracking-[0.3em] uppercase text-red-400">
                        Pho99 Menu
                    </span>
                    <Heading
                        ref={heroTitleRef}
                        className="heading-secondary text-7xl! leading-[0.95] md:text-8xl!"
                    >
                        Taste The Journey
                    </Heading>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-white! opacity-85">
                        Open the menu and explore Vietnamese comfort, fresh drinks, and sweet finishes across our Kathmandu locations.
                    </p>
                </div>
            </section>
            {/* <section className="bg-white px-4 py-28 md:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 max-w-2xl">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-500">
                            Full Menu
                        </span>
                        <Heading className="mt-4 text-5xl! leading-[1.04] md:text-6xl!">
                            Menu Pages
                        </Heading>
                        <p className="mt-6 text-base leading-relaxed text-para-secondary">
                            Browse all ten Pho99 menu pages in a side-by-side spread.
                        </p>
                    </div>
                    <div className="overflow-hidden rounded-[1.5rem]   p-2  md:p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                            {menuPages.map((page, index) => (
                                <div
                                    key={page.src}
                                    ref={(el) => { menuPageRefs.current[index] = el; }}
                                    className={`relative aspect-[4/5] overflow-hidden bg-white ${index % 2 === 0 ? "md:border-r md:border-[#d8d0c4]" : ""}`}
                                >
                                    <div
                                        ref={(el) => { menuImageRefs.current[index] = el; }}
                                        className="absolute inset-4 md:inset-6"
                                    >
                                        <Image
                                            src={page.src}
                                            alt={page.alt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section> */}
            <MenuPageTabs menuPageRefs={menuPageRefs} menuImageRefs={menuImageRefs} menuPages={menuPages} />
            <section className="bg-white px-4 py-24 md:px-12">
                <Layout>
                    <div className="mb-10 text-center">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-500">
                            Explore
                        </span>
                        <Heading className="mt-3 text-5xl! leading-[1.04] md:text-6xl!">
                            Our Exquisite Menu
                        </Heading>
                    </div>
                    <div className="mb-10 flex flex-wrap justify-center gap-3">
                        {CATEGORY_TABS.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => handleFilter(tab.value)}
                                className={`rounded-full  px-6 py-2 text-sm font-semibold uppercase tracking-widest transition-all duration-200 border
                        ${activeCategory === tab.value
                                        ? "bg-red-500! text-white! border-red-500!"
                                        : "border-zinc-300! text-zinc-500 hover:border-zinc-400 hover:text-zinc-800"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    {/* grid — note: ref on grid, data-category on every card */}
                    <div
                        ref={filterGridRef}
                        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5"
                    >
                        {filteredItems.map((item) => (
                            <div
                                key={item.name}
                                data-category={item.category}
                                className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white"
                            >
                                <div className="relative aspect-square w-full overflow-hidden">
                                    <Image
                                        src={item.src}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-3">
                                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${BADGE_STYLES[item.category]}`}>
                                        {item.category}
                                    </span>
                                    <p className="text-sm font-semibold uppercase tracking-wide text-zinc-800 leading-tight">
                                        {item.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </Layout>
            </section>
        </main>
    );
};

export default MenuMain;
