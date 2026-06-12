"use client";

import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import FooterDoor from "./FooterDoor";
import { useFooterLink } from "@/hooks/useFooterLink";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Layout from "@/components/Layout";

interface NavLink {
    label: string;
    href: string;
    labelVi?: string;
}

interface DoorFooterProps {
    links?: NavLink[];
    brandName?: string;
    ctaLabel?: string;
    ctaHref?: string;
    hintText?: string;
    openAngle?: number;
    className?: string;
}

const CLOSED_DOOR = "/PhooRes/Logo/transparent-closedDoor.png";

const leftDoor = "/PhooRes/Logo/transparent-left.png"
const rightDoor = '/PhooRes/Logo/transparent-right.png'

const CLOSED_LEFT = 0;
const CLOSED_RIGHT = 0;

const DEFAULT_LINKS: NavLink[] = [
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];
const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/menu', label: 'Menu' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/news', label: 'News' },
    { href: '/contact', label: 'Contact Us', isActive: true },
];

export default function DoorFooter({
    links = DEFAULT_LINKS,
    brandName = "Pho 99",
    ctaLabel = "Order Now",
    ctaHref = "#order",
    hintText = "hover to enter",
    openAngle = 58,
    className = "",
}: DoorFooterProps) {

    const footerLink = useFooterLink();
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const hintRef = useRef<HTMLSpanElement>(null);
    const hintCircleRef = useRef<HTMLDivElement>(null);
    const brandRef = useRef<HTMLParagraphElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const ctaRef = useRef<HTMLButtonElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const isOpen = useRef(false);

    useEffect(() => {
        gsap.set(leftPanelRef.current, { rotateY: CLOSED_LEFT, transformPerspective: 2400 });
        gsap.set(rightPanelRef.current, { rotateY: CLOSED_RIGHT, transformPerspective: 2400 });

        const tl = gsap.timeline({ paused: true });

        tl
            .to(leftPanelRef.current, { rotateY: openAngle, duration: 1.2, ease: "back.out(1.2)" }, 0)
            .to(rightPanelRef.current, { rotateY: -openAngle, duration: 1.2, ease: "back.out(1.2)" }, 0)
            .to(hintRef.current, { opacity: 0, duration: 0.25, ease: "power1.in" }, 0)
            .to(hintCircleRef.current, { opacity: 0, scale: 0.85, duration: 0.25, ease: "power1.in" }, 0)
            .to(brandRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.38)
            .to(linksRef.current.filter(Boolean), {
                opacity: 1, y: 0, duration: 0.42, stagger: 0.09, ease: "power2.out",
            }, 0.50)
            .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" }, 0.90);

        tlRef.current = tl;
        return () => { tl.kill(); };
    }, [openAngle]);

    const open = useCallback(() => {
        if (!isOpen.current && tlRef.current) { isOpen.current = true; tlRef.current.play(); }
    }, []);
    const close = useCallback(() => {
        if (isOpen.current && tlRef.current) { isOpen.current = false; tlRef.current.reverse(); }
    }, []);
    const toggle = useCallback(() => { isOpen.current ? close() : open(); }, [open, close]);

    return (
        <footer className={`relative flex flex-col justify-center items-center bg-white overflow-hidden min-h-[100px] pt-0 mt-14 ${className}`}>

            <style>{`
                @keyframes doorRipple {
                    0%   { transform: scale(0.9); opacity: 0.7; }
                    100% { transform: scale(2.6); opacity: 0;   }
                }
                @keyframes doorPinBounce {
                    0%, 100% { transform: translateY(0px);  }
                    50%      { transform: translateY(-4px); }
                }
            `}</style>

            <div className="w-full flex flex-col items-center justify-center">
                {/* <div
                    className="relative shrink-0 cursor-pointer"
                    style={{ width: 560, height: 620, perspective: "1200px" }}
                    onMouseEnter={open}
                    onMouseLeave={close}
                    onTouchStart={(e) => { e.preventDefault(); toggle(); }}
                    role="navigation"
                    aria-label="Site navigation"
                >

                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden z-[1] rounded-[50%_50%_0_0/14%_14%_0_0]"
                        style={{ background: "white" }}
                    >
                        <div
                            className="absolute w-[340px] h-[340px]  rounded-full pointer-events-none"
                            style={{
                                top: "40%", left: "50%",
                                transform: "translate(-50%,-50%)",
                                background: "radial-gradient(circle, rgba(201,169,110,0.10) 0%, transparent 68%)",
                            }}
                        />
                        <nav className="flex flex-col items-center justify-center relative z-[1]">
                            {links.map((link, i) => (
                                <a
                                    key={link.href}
                                    ref={(el) => { linksRef.current[i] = el; }}
                                    href={link.href}
                                    className="group flex items-center justify-center gap-[10px] py-[15px] w-[220px] no-underline border-b-[0.5px] border-[rgba(201,169,110,0.12)]"
                                    style={{
                                        borderTop: i === 0 ? "0.5px solid rgba(201,169,110,0.12)" : undefined,
                                        opacity: 0,
                                        transform: "translateY(14px)",
                                    }}
                                >

                                    <span className="en text-[20px] font-normal text-black! min-w-[90px] relative transition-[color,letter-spacing] duration-300 ease-in-out group-hover:text-[#f0d090]">
                                        {link.label}
                                        <span
                                            className="line absolute left-1/2 -translate-x-1/2 w-[60%] h-[0.5px] bg-red-600! scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms] ease-in-out block"
                                            style={{ bottom: "-15.5px" }}
                                        />
                                    </span>
                                </a>
                            ))}
                        </nav>


                    </div>


                    <div className="absolute inset-0 z-[2] pointer-events-none" style={{ perspective: "1900px" }}>
                        <div
                            ref={leftPanelRef}
                            className="absolute top-0 left-0 w-1/2 h-full pointer-events-auto overflow-hidden"
                            style={{
                                transformOrigin: "left center",
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden",
                                willChange: "transform",
                            }}
                        >
                            <img
                                src={CLOSED_DOOR}
                                alt=""
                                draggable={false}
                                className="absolute top-0 left-0 w-[200%] max-w-[200%] h-full object-contain object-left select-none"
                            />
                        </div>

                        <div
                            ref={rightPanelRef}
                            className="absolute top-0 right-0 w-1/2 h-full pointer-events-auto overflow-hidden"
                            style={{
                                transformOrigin: "right center",
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden",
                                willChange: "transform",
                            }}
                        >
                            <img
                                src={CLOSED_DOOR}
                                alt=""
                                draggable={false}
                                className="absolute top-0 right-0 w-[200%] max-w-[200%] h-full object-contain object-right select-none"
                            />
                        </div>
                    </div>


                    <span
                        ref={hintRef}
                        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.22em] uppercase text-[rgba(201,169,110,0.4)] z-10 pointer-events-none whitespace-nowrap"
                    >
                        {hintText}
                    </span>


                    <div
                        ref={hintCircleRef}
                        className="absolute left-1/2 -translate-x-1/2 z-[10] pointer-events-none flex flex-col items-center gap-2"
                        style={{ bottom: "52px" }}
                    >

                        <div className="relative flex items-center justify-center w-[64px] h-[64px]">

                            <span
                                className="absolute inset-0 rounded-full border border-[rgba(201,169,110,0.5)]"
                                style={{ animation: "doorRipple 2s ease-out infinite" }}
                            />

                            <span
                                className="absolute inset-0 rounded-full border border-[rgba(201,169,110,0.35)]"
                                style={{ animation: "doorRipple 2s ease-out 0.65s infinite" }}
                            />

                            <span
                                className="absolute inset-0 rounded-full border border-[rgba(201,169,110,0.2)]"
                                style={{ animation: "doorRipple 2s ease-out 1.3s infinite" }}
                            />


                            <div className="w-9 h-9 rounded-full bg-[rgba(201,169,110,0.1)] border border-[rgba(201,169,110,0.45)] flex items-center justify-center">

                                <svg
                                    width="15" height="15"
                                    viewBox="0 0 24 24"
                                    fill="red"
                                    stroke="rgba(201,169,110,0.85)"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ animation: "doorPinBounce 1.6s ease-in-out infinite" }}
                                >
                                    <path d="M9 11V6a2 2 0 0 1 4 0v5" />
                                    <path d="M13 11V8a2 2 0 0 1 4 0v3" />
                                    <path d="M17 11a2 2 0 0 1 4 0v4a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-1a2 2 0 0 1 4 0" />
                                    <path d="M9 11V4a2 2 0 0 0-4 0v7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                </div> */}
                {/* <FooterDoor /> */}
                <FooterDoor links={[footerLink]} />
                {/* <div className="flex flex-col gap-4">
                
                    <ul className="flex  flex-row gap-3">
                        {navLinks.map(({ href, label, isActive }) => (
                            <li className="group" key={href}>
                                <Link
                                    href={href}
                                    className={`flex items-center text-black!  group-hover:text-red-600! group-hover:translate-x-4! gap-2 text-sm transition-all ease-in-out duration-300 ${isActive ? 'text-red-500' : 'text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    <ChevronRight size={14} className={isActive ? 'text-red-500' : 'text-zinc-500 group-hover:text-red-600! '} />
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div> */}
                {/* <div className="relative z-40 w-full">
                    <div className="border-t border-zinc-800/10 flex justify-center py-6 overflow-hidden">
                        <Heading className="text-center uppercase text-red-500!">Pho</Heading>
                        <Heading className="text-center uppercase text-black!">Ninety</Heading>
                        <Heading className="text-center uppercase text-red-500!">Nine</Heading>
                    </div>
                    <div className="border-zinc-800 max-w-7xl! mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
                        <p className="text-zinc-800! text-xs">
                            © 2026 All Rights Reserved | Pho Ninety Nine Restaurant Pvt. Ltd.
                        </p>
                        <p className="text-zinc-500! text-xs flex items-center justify-center gap-1">
                            Design and Developed by{" "}
                            <a href="">
                                <Image alt="webx" width={50} height={50} src={'/PhooRes/Logo/black-logo-png.webp'} />
                            </a>
                        </p>
                    </div>
                </div> */}
                <div className="relative z-40  w-full">
                    <div className="border-t border-zinc-800/10 flex justify-center py-4 md:py-6 overflow-hidden">
                        <h1 className="text-center uppercase text-red-500! text-4xl sm:text-5xl md:text-6xl lg:text-8xl">Pho</h1>
                        <h1 className="text-center uppercase text-black! text-4xl sm:text-5xl md:text-6xl lg:text-8xl">Ninety</h1>
                        <h1 className="text-center uppercase text-red-500! text-4xl sm:text-5xl md:text-6xl lg:text-8xl">Nine</h1>
                    </div>
                    <div className="border-zinc-800 max-w-7xl! mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-5 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-2">
                        <p className="text-zinc-800! text-xs text-center md:text-left">
                            © 2026 All Rights Reserved | Pho Ninety Nine Restaurant Pvt. Ltd.
                        </p>
                        <p className="text-zinc-500! text-xs flex items-center justify-center gap-1">
                            Design and Developed by{" "}
                            <a href="">
                                <Image alt="webx" width={140} height={140} src={'/PhooRes/Logo/black-logo-png.webp'} className="w-10 h-10 sm:w-25 sm:h-10 md:w-[50px] md:h-[50px]" />
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}