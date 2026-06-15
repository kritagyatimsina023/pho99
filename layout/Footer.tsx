'use client'
import React, { useState } from "react";
import Image from "next/image";

const footerDataLeft = [
    { id: 1, title: "Concept", source: "/Footer/Concept.webp" },
    { id: 2, title: "Snow Salt", source: "/Footer/SnowSalt.webp" },
]
const footerDataRight = [
    { id: 3, title: "Drinks", source: "/Footer/Drinks.webp" },
    { id: 4, title: "Creators", source: "/Footer/Creators.webp" },
]
export default function Footer() {

    const [hoverId, setHoverId] = useState<number | null>(0)
    return (
        <footer className="bg-section-bg min-h-screen w-full relative z-10 flex flex-col justify-between overflow-hidden">
            <div className="h-full  absolute top-0 left-30 w-0.5 bg-[#E1DED5]/5"></div>
            <div className="h-full  absolute top-0 left-[30%] w-0.5 bg-[#E1DED5]/5"></div>
            <div className="h-full  absolute top-0 right-72 w-0.5 bg-[#E1DED5]/5"></div>
            <div className="w-full relative z-10 grid grid-cols-1 md:grid-cols-4 px-8 pt-8">
                <div className="flex group flex-col">
                    <h2 className="text-md! cursor-pointer group-hover:text-about-bg! mb-1">Contacts</h2>
                    <span className="text-about-bg! text-lg ">+33 (4) 93 12 34 56</span>
                    <span className="text-about-bg! text-lg ">hello@LagunaAl-Sha'ab.com</span>
                </div>
                <div className="flex group flex-col ">
                    <h2 className="text-md! cursor-pointer group-hover:text-about-bg! mb-1">Address</h2>
                    <span className="text-about-bg! text-lg leading-[1.2]">Promenade du Soleil,<br />12 Nice, France</span>
                </div>
                <div className="flex group flex-col">
                    <h2 className="text-md! cursor-pointer group-hover:text-about-bg! mb-1">Opening hours</h2>
                    <span className="text-about-bg! text-lg ">18:00 - 00:00</span>
                </div>
                <div className="hidden md:block"></div>
            </div>
            <div className="relative max-w-[96%]  mx-auto z-10 w-full flex-col flex  items-center mt-auto pt-20">
                <div className="flex flex-col xl:flex-row gap-8 items-end-safe justify-center w-full ">
                    <div className="flex gap-9  md:gap-12 tracking-wide ">
                        {footerDataLeft.map((data, idx) => (
                            <span
                                onMouseLeave={() => setHoverId(0)}
                                onMouseEnter={() => setHoverId(data.id)} key={data.id}
                                className="text-about-bg! cursor-pointer uppercase tracking-wide 
                             text-3xl md:text-5xl! font-heading!">{data.title}</span>
                        ))}
                    </div>
                    <div className="px-4">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 rounded-t-full overflow-hidden bg-section-bg transition-all duration-400 ease-linear " >
                                {[...footerDataLeft, ...footerDataRight].map((data) => (
                                    <Image
                                        key={data.id}
                                        src={data.source}
                                        alt={data.title}
                                        fill
                                        className={`object-cover transition-all duration-400 ease-linear absolute inset-0 ${(hoverId === data.id)
                                            ? 'opacity-40 z-10'
                                            : 'opacity-0 z-0'
                                            }`}
                                    />
                                ))}
                            </div>
                            <Image src="/Footer/Footer-logo.svg" alt="Footer Logo" width={283} height={314} className="w-auto h-[180px] md:h-[240px] xl:h-[280px] relative z-20 " />
                        </div>
                    </div>
                    <div className="flex gap-9 md:gap-12 ">
                        {footerDataRight.map((data, idx) => (
                            <span
                                onMouseLeave={() => setHoverId(0)}
                                onMouseEnter={() => setHoverId(data.id)}
                                key={data.id} className="text-about-bg! cursor-pointer 
                              uppercase tracking-wide  text-3xl md:text-5xl! font-heading!">{data.title}</span>
                        ))}
                    </div>

                </div>
                <div className="w-full text-center  px-4 overflow-hidden flex justify-center">
                    <h1 className="text-about-bg! font-heading text-[11vw] leading-[0.85] uppercase tracking-tighter whitespace-nowrap">
                        LAGUNA AL-SHA'AB
                    </h1>
                </div>
            </div>
            <div className="w-full relative z-10 flex flex-col md:flex-row justify-between items-center px-8 pb-6 pt-16 text-para-secondary text-sm gap-2">
                <span>Created for demonstration purposes only</span>
                <span>Design creation</span>
            </div>

        </footer>
    );
}