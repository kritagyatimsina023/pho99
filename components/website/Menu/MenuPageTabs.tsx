"use client";

import { useState, useRef, useEffect, useCallback, type MouseEvent, type RefObject } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    GlassWater,
    ShoppingBag,
    Utensils,
    X,
    ZoomIn,
} from "lucide-react";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import { useScrollToTop } from "@/hooks/useScrollToTop";

// ─── Types ───────────────────────────────────────────────────────────────────
type MenuTab = "food" | "drinks" | "order";
type MenuPageTabsProps = {
    menuPageRefs?: RefObject<(HTMLDivElement | null)[]>;
    menuImageRefs?: RefObject<(HTMLDivElement | null)[]>;
    menuPages?: { src: string; alt: string }[];
};

// ─── Data ────────────────────────────────────────────────────────────────────
const FOOD_PAGES = Array.from({ length: 10 }, (_, i) => ({
    src: `/PhooRes/Menu/menu-${i + 1}.webp`,
    alt: `Food menu page ${i + 1}`,
    label: `Page ${i + 1}`,
}));

const DRINKS_PAGES = [
    {
        src: "/PhooRes/Menu/drinks-1.jpg",
        alt: "Drinks menu page 1",
        label: "Drinks 1",
    },
    {
        src: "/PhooRes/Menu/drinks-2.jpg",
        alt: "Drinks menu page 2",
        label: "Drinks 2",
    },
    {
        src: "/PhooRes/Menu/drinks-3.jpeg",
        alt: "Drinks menu page 3",
        label: "Drinks 3",
    },
];

const FOODMANDU_BRANCHES = [
    { name: "Pho99 Thamel", url: "https://foodmandu.com", address: "Thamel, Kathmandu" },
    { name: "Pho99 Jhamsikhel", url: "https://foodmandu.com", address: "Jhamsikhel, Lalitpur" },
    { name: "Pho99 Durbarmarg", url: "https://foodmandu.com", address: "Durbarmarg, Kathmandu" },
];

const AUTO_ADVANCE_MS = 3000;

// ─── Component ───────────────────────────────────────────────────────────────
export const MenuPageTabs = ({ menuPages }: MenuPageTabsProps) => {
    const [activeTab, setActiveTab] = useState<MenuTab>("food");
    const [current, setCurrent] = useState(0);
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
    const [isTransiting, setIsTransiting] = useState(false);
    const scrollTop = useScrollToTop(10)

    const trackRef = useRef<HTMLDivElement>(null);
    const lightboxRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const foodPages = menuPages?.length
        ? menuPages.map((page, index) => ({
            ...page,
            label: `Page ${index + 1}`,
        }))
        : FOOD_PAGES;
    const pages = activeTab === "drinks" ? DRINKS_PAGES : foodPages;


    const slideTo = useCallback((next: number) => {
        if (isTransiting || !trackRef.current) return;
        setIsTransiting(true);
        const w = trackRef.current.offsetWidth;
        const dir = next > current ? -1 : 1;

        gsap.fromTo(
            trackRef.current,
            { x: 0, opacity: 1 },
            {
                x: dir * -w * 0.06,
                opacity: 0,
                duration: 0.28,
                ease: "power2.in",
                onComplete: () => {
                    setCurrent(next);
                    gsap.fromTo(
                        trackRef.current,
                        { x: dir * w * 0.06, opacity: 0 },
                        {
                            x: 0, opacity: 1, duration: 0.36, ease: "power3.out",
                            onComplete: () => setIsTransiting(false)
                        }
                    );
                },
            }
        );
    }, [current, isTransiting]);

    const goNext = useCallback(() => slideTo((current + 1) % pages.length), [slideTo, current, pages.length]);
    const goPrev = useCallback(() => slideTo((current - 1 + pages.length) % pages.length), [slideTo, current, pages.length]);


    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (pages.length > 1) {
            timerRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
        }
    }, [goNext, pages.length]);

    useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [resetTimer]);


    const switchTab = (tab: MenuTab) => {
        if (tab === activeTab) return;
        if (tab === "order") scrollTop();
        const el = panelRef.current;
        if (!el) { setActiveTab(tab); setCurrent(0); return; }
        gsap.to(el, {
            opacity: 0, y: 10, duration: 0.18, ease: "power2.in",
            onComplete: () => {
                setActiveTab(tab);
                setCurrent(0);
                gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" });
            },
        });
    };


    const openLightbox = useCallback((idx: number) => {
        setLightboxIdx(idx);
        requestAnimationFrame(() => {
            if (lightboxRef.current)
                gsap.fromTo(lightboxRef.current, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.28, ease: "power3.out" });
        });
    }, []);

    const closeLightbox = useCallback(() => {
        if (!lightboxRef.current) { setLightboxIdx(null); return; }
        gsap.to(lightboxRef.current, {
            opacity: 0, scale: 0.96, duration: 0.2, ease: "power2.in",
            onComplete: () => { setLightboxIdx(null); },
        });
    }, []);

    const handleSlideClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        const pageIdx = Number(event.currentTarget.dataset.pageIndex);
        const isCenterSlide = event.currentTarget.dataset.center === "true";

        if (Number.isNaN(pageIdx)) return;
        if (isCenterSlide) {
            openLightbox(pageIdx);
            return;
        }

        slideTo(pageIdx);
        resetTimer();
    }, [openLightbox, resetTimer, slideTo]);

    useEffect(() => {
        if (lightboxIdx === null) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [lightboxIdx]);

    // lightbox keyboard nav
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (lightboxIdx === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") setLightboxIdx(i => i !== null ? (i + 1) % pages.length : null);
            if (e.key === "ArrowLeft") setLightboxIdx(i => i !== null ? (i - 1 + pages.length) % pages.length : null);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [closeLightbox, lightboxIdx, pages.length]);


    const visibleIndices = [
        (current - 1 + pages.length) % pages.length,
        current,
        (current + 1) % pages.length,
    ];


    return (
        <Layout>
            <div ref={panelRef}>
                {activeTab !== "order" && (
                    <section className="relative overflow-hidden rounded-[32px] bg-white! px-4 py-8 sm:px-6 md:px-8 md:py-10">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/75 to-transparent" />

                        {/* ── Title (centred) ── */}
                        <div className="relative z-10 mb-6 flex flex-col items-center text-center gap-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ec1c25]!">
                                {activeTab === "food" ? "Full food menu" : "Drinks selection"}
                            </p>
                            <Heading className="text-4xl! font-semibold tracking-tight text-[#2f2f31] md:text-4xl!">
                                {activeTab === "food" ? "Browse every Pho99 plate" : "Sip through the drinks menu"}
                            </Heading>
                        </div>

                        {/* ── Tab buttons (Food & Drinks only, no Foodmandu) ── */}
                        <div className="relative z-10 mb-6 flex justify-center gap-3">
                            {[
                                { value: "food" as MenuTab, icon: Utensils, label: "Pho Food" },
                                { value: "drinks" as MenuTab, icon: GlassWater, label: "Drinks" },
                            ].map(tab => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.value;
                                return (
                                    <button
                                        key={tab.value}
                                        onClick={() => switchTab(tab.value)}
                                        aria-pressed={isActive}
                                        className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300
                                            ${isActive
                                                ? "border-[#ec1c25] bg-[#ec1c25]! text-white!"
                                                : "border-zinc-300! bg-white! text-[#2f2f31]! hover:border-red-300! hover:bg-red-50!"
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── Slide strip (reduced height) ── */}
                        <div
                            ref={trackRef}
                            className="relative z-10 grid grid-cols-1 items-center gap-1 sm:grid-cols-3 md:gap-2"
                            style={{ perspective: "1200px" }}
                        >
                            {pages.length === 1 ? (
                                <div
                                    className="group relative cursor-zoom-in overflow-hidden rounded-[26px] bg-white  ring-1 ring-black/8 sm:col-start-2"
                                    style={{ aspectRatio: "4/5", maxHeight: "55vh" }}
                                    onClick={() => openLightbox(0)}
                                >
                                    <Image src={pages[0].src} alt={pages[0].alt} fill className="object-contain bg-zinc-50" />
                                    <HoverOverlay label="View full size" />
                                </div>
                            ) : (
                                visibleIndices.map((pageIdx, pos) => {
                                    const isCenter = pos === 1;
                                    return (
                                        <div
                                            key={`${activeTab}-${pageIdx}`}
                                            data-center={isCenter}
                                            data-page-index={pageIdx}
                                            style={{ aspectRatio: "4/5", maxHeight: "55vh" }}
                                            className={`group relative overflow-hidden rounded-[26px] bg-white ring-1 ring-black/8 transition-all duration-300
                                                ${isCenter
                                                    ? "z-10 cursor-zoom-in shadow-[0_28px_70px_rgba(28,24,20,0.22)]"
                                                    : "hidden cursor-pointer opacity-70 shadow-[0_16px_35px_rgba(28,24,20,0.11)] hover:opacity-90 sm:block"
                                                }`}
                                            onClick={handleSlideClick}
                                        >
                                            <Image
                                                src={pages[pageIdx].src}
                                                alt={pages[pageIdx].alt}
                                                fill
                                                className="bg-white object-contain"
                                                sizes="(max-width:640px) 100vw, 33vw"
                                            />
                                            {/* {isCenter && <HoverOverlay label="View full size" />} */}
                                            {/* <span className="absolute bottom-3 left-3 rounded-full bg-[#2f2f31]/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white! backdrop-blur-sm">
                                                {pages[pageIdx].label}
                                            </span> */}
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* prev / next arrows */}
                        {pages.length > 1 && (
                            <>
                                <ArrowBtn dir="left" onClick={() => { goPrev(); resetTimer(); }} />
                                <ArrowBtn dir="right" onClick={() => { goNext(); resetTimer(); }} />
                            </>
                        )}
                        {/* dot indicators */}
                        {pages.length > 1 && (
                            <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-2">
                                {pages.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { slideTo(i); resetTimer(); }}
                                        aria-label={`Go to page ${i + 1}`}
                                        className={`h-2 rounded-full transition-all duration-300
                                            ${i === current ? "w-8 bg-[#ec1c25]!" : "w-2 bg-[#d5c7b7]! hover:bg-[#a8927b]!"}`}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                )}
                {activeTab === "order" && (
                    <div className="overflow-hidden rounded-r-[32px]">
                        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                            <div className="relative min-h-72 overflow-hidden p-8 md:p-10  rounded-r-full ">
                                <Image
                                    src="/PhooRes/HeroSlider/Phoofood-2.avif"
                                    alt="Pho99 delivery food"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/55 " />
                                <div className="relative z-10 flex h-full min-h-56 flex-col justify-between">
                                    <Image
                                        src="/PhooRes/Logo/foodmandu.png"
                                        alt="Foodmandu"
                                        width={58}
                                        height={58}
                                        className="rounded-full p-1"
                                    />
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75!">
                                            Delivery
                                        </p>
                                        <Heading className="mt-3 max-w-sm text-4xl! font-semibold leading-tight tracking-tight text-white! md:text-5xl!">
                                            Order Pho99 from Foodmandu
                                        </Heading>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-10">
                                <div className="mb-6 max-w-xl">
                                    <p className="text-sm leading-6 text-[#6f6b64]!">
                                        Pick your nearest Pho99 branch and continue to Foodmandu for delivery.
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    {FOODMANDU_BRANCHES.map(branch => (
                                        <a
                                            key={branch.name}
                                            href={branch.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between gap-4 rounded-[22px] border border-[#eadfd2]/70 bg-white px-5 py-4 transition-all duration-200 hover:border-[#ec1c25]/45"
                                        >
                                            <span className="min-w-0">
                                                <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-[#2f2f31]! transition-colors group-hover:text-[#ec1c25]!">
                                                    {branch.name}
                                                </span>
                                                <span className="mt-1 block text-xs text-[#8a8984]!">{branch.address}</span>
                                            </span>
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-300 text-[#8d3324] transition-colors group-hover:bg-[#ec1c25] group-hover:text-white!">
                                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {lightboxIdx !== null && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={closeLightbox}
                >
                    <div
                        ref={lightboxRef}
                        className="relative flex h-[90dvh] w-[92vw] max-w-2xl flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* top bar */}
                        <div className="flex items-center justify-between px-1 pb-3">
                            <span className="text-xs font-semibold uppercase tracking-widest text-white">
                                {pages[lightboxIdx]?.label}
                            </span>
                            <button
                                onClick={closeLightbox}
                                className="rounded-full bg-white p-2 text-black! transition-colors hover:bg-white"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>

                        {/* image */}
                        <div className="relative flex-1 overflow-hidden rounded-2xl bg-zinc-900">
                            <Image
                                src={pages[lightboxIdx]?.src ?? ""}
                                alt={pages[lightboxIdx]?.alt ?? ""}
                                fill
                                className="object-contain"
                                sizes="92vw"
                                priority
                            />
                        </div>

                        {/* bottom nav */}
                        {pages.length > 1 && (
                            <div className="flex items-center absolute w-full top-1/2 justify-between px-1 pt-4">
                                <button
                                    onClick={() => setLightboxIdx(i => i !== null ? (i - 1 + pages.length) % pages.length : null)}
                                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black! transition-colors hover:bg-white"
                                >
                                    <ArrowLeft />
                                </button>
                                <span className="text-xs text-white/40">
                                    {lightboxIdx + 1} / {pages.length}
                                </span>
                                <button
                                    onClick={() => setLightboxIdx(i => i !== null ? (i + 1) % pages.length : null)}
                                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black! transition-colors hover:bg-white"
                                >
                                    <ArrowRight />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
};



/** Prev / next arrow buttons */
const ArrowBtn = ({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) => (
    <button
        onClick={onClick}
        aria-label={dir === "left" ? "Previous page" : "Next page"}
        className={`absolute top-[58%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white! text-[#2f2f31]! shadow-[0_12px_28px_rgba(28,24,20,0.16)] ring-1 ring-black/8 transition-all duration-150 hover:scale-105 active:scale-95
            ${dir === "left" ? "left-2 md:left-4" : "right-2 md:right-4"}`}
    >
        {dir === "left" ? <ChevronLeft className="h-5 w-5 text-black" /> : <ChevronRight className="h-5 w-5 text-black" />}
    </button>
);

/** Zoom overlay on hover */
const HoverOverlay = ({ label }: { label: string }) => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/25">
        <span className="flex scale-90 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-zinc-800! opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
        </span>
    </div>
);
