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
    text?: string
    subText?: string
    buttonText?: string

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
    {
        label: "Menu",
        href: "#menu",
        text: "Your Journey to",
        subText: "Vietnam",
        buttonText: "Taste Vietnam",
    },
    {
        label: "About",
        href: "#about",
        text: "WHERE TWO CULTURES MEET",
        buttonText: "Our Story",
    },
    {
        label: "Contact",
        href: "#contact",
        text: "Your Vietnamese Escape Awaits",
        buttonText: "Reserve a Table",
    },
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
                {/* <FooterDoor /> */}
                <FooterDoor links={[footerLink]} />

                <div className="relative z-40  w-full">
                    <div className="border-t border-zinc-800/10 flex justify-center py-4 md:py-6 overflow-hidden">
                        <h1 className="text-center uppercase text-red-500! text-4xl sm:text-5xl md:text-6xl lg:text-8xl">Pho</h1>
                        <h1 className="text-center uppercase text-black! text-4xl sm:text-5xl md:text-6xl lg:text-8xl">Ninety</h1>
                        <h1 className="text-center uppercase text-red-500! text-4xl sm:text-5xl md:text-6xl lg:text-8xl">Nine</h1>
                    </div>
                    <div className="border-zinc-800 max-w-7xl! mx-auto px-4 sm:px-6 md:px-8 py-5 md:py-5 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-2 w-full">
                        <p className="text-zinc-800! text-[11px] sm:text-xs text-center md:text-left leading-relaxed px-4 md:px-0">
                            © 2026 All Rights Reserved | Pho Ninety Nine Restaurant Pvt. Ltd.
                        </p>
                        <p className="text-zinc-500! text-[11px] sm:text-xs flex flex-wrap items-center justify-center gap-1.5 mt-2 md:mt-0">
                            Design and Developed by{" "}
                            <a href="https://www.webxnepal.com/" target="_blank" className="hover:opacity-80 transition-opacity flex items-center">
                                <Image alt="webx" width={40} height={40} src={'/PhooRes/Logo/black-logo-png.webp'} className="w-8 h-8 sm:w-9 sm:h-9 md:w-[30px] md:h-[30px] object-contain" />
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}