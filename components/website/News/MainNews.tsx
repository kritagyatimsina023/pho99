'use client'
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageMainHero from "@/components/PageMainHero";

gsap.registerPlugin(ScrollTrigger);

const newsItems = [
    {
        title: "Taste and Culture Of Vietname in Nepal",
        desc: "The family run business, Pho99, a Vietnamese restaurant, has been serving food since 2011. Talking to the owner, Naveen Saru, he sai...",
        src: "/PhooRes/News/News-1.jpeg",
        href: "https://nepalnews.com/s/entertainment-lifestyle/a-taste-of-vietnam-in-nepal/",
    },
    {
        title: "'Pho 99 Restaurant' opens its outlet in Lazimpat, Kathmandu",
        desc: "The restaurant will be selling Vietnamese recipes through the outlet. Since 2011, the restaurant has been operating its two outlets ...",
        src: "/PhooRes/News/News-2.jpg",
        href: "https://nvcci.org/vietnamese-pho-99-restaurant-opens-its-outlet-in-lazimpat-kathmandu/",
    },
    {
        title: "Eperience of Vietnam without leaving Kathmandu",
        desc: "With summer stinking over Kathmandu, leeching sweat from the city's pores, this South-East Asian hub could provide the perfect antid...",
        src: "/PhooRes/News/news-3.jpg",
        href: "https://kathmandupost.com/food/2019/06/20/an-un-pho-gettable-trip-to-vietnam-without-leaving-kathmandu",
    },
    {
        title: "Eat Out | Viatnamese at jhamshikhel",
        desc: "With summer stinking over Kathmandu, leeching sweat from the city's pores, this South-East Asian hub could provide the perfect antid...",
        src: "/PhooRes/Building/Jhamsikhel.jpg",
        href: "https://theannapurnaexpress.com/story/20157/",
    },

];

const MainNews = () => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        cardRefs.current.forEach((el) => {
            if (!el) return;
            gsap.fromTo(
                el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        end: "top 55%",
                        scrub: 1,
                    },
                }
            );
        });
    }, []);

    return (
        <div className="bg-white relative z-10">
            <PageMainHero
                heroImg="/PhooRes/News/Phoo99news.png"
                heading="
News & media"
                subHeading="Stories, updates & moments from Pho99"
            />
            {/* ── Main news section ── */}
            <section className="py-24 px-6 md:px-16 bg-white">
                {/* Section label */}
                <div className="text-center mb-14">
                    <p className="text-xs font-semibold tracking-[0.35em] uppercase text-red-500">
                        — Stay With Us For Updates —
                    </p>
                </div>

                {/* Cards grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newsItems.map((item, i) => (
                        <div
                            key={i}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            className="group flex flex-col border border-[#e8e0d5] rounded-sm overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
                        >
                            {/* Image */}
                            <div className="relative w-full h-[260px] overflow-hidden">
                                <Image
                                    src={item.src}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Text body */}
                            <div className="flex flex-col flex-1 p-7 gap-4">
                                <h3 className="text-xl font-semibold text-[#1a1a1a] leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-[#6b6b6b] text-sm leading-relaxed flex-1">
                                    {item.desc}
                                </p>
                                {/* Read more */}
                                <div className="mt-2 flex justify-end">
                                    <a
                                        href={item.href}
                                        target="_blank"

                                        className="inline-flex items-center gap-1.5 text-sm text-[#1a1a1a] hover:text-red-500 transition-colors duration-200"
                                    >
                                        Read more
                                        <span className="text-base leading-none">➜</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MainNews;