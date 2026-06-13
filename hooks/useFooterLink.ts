"use client";

import { usePathname } from "next/navigation";

export interface FooterLink {
    label: string;
    href: string;
    text?: string;
    subText?: string;
    buttonText?: string;
}

const ROUTE_MAP: Record<string, FooterLink> = {
    "/": { label: "Menu", href: "/menu", text: "YOUR JOURNEY TO", subText: "VIETNAM", buttonText: "Begin Journey" },
    "/menu": { label: "About", href: "/about", text: "WHERE TWO CULTURES", subText: "MEET", buttonText: "Our Story" },
    "/about": { label: "Contact Us", href: "/contact", text: "YOUR VIETNAMESE ESCAPE", subText: "AWAITS", buttonText: "Order Now" },
    "/contact": { label: "Home", href: "/", text: "WELCOME TO", subText: "PHO 99", buttonText: "Discover More" },
    "/news": { label: "Home", href: "/", text: "WELCOME TO", subText: "PHO 99", buttonText: "Discover More" },
};

const FALLBACK: FooterLink = { label: "Home", href: "/", text: "WELCOME TO", subText: "PHO 99", buttonText: "Begin Journey" };

export function useFooterLink(): FooterLink {
    const pathname = usePathname();
    // strip trailing slash (except root)
    const clean = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    return ROUTE_MAP[clean] ?? FALLBACK;
}