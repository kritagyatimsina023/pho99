"use client";

import { usePathname } from "next/navigation";

export interface FooterLink {
    label: string;
    href: string;
    text?: string;
}

const ROUTE_MAP: Record<string, FooterLink> = {
    "/": { label: "Menu", href: "/menu", text: "OPEN THE DOOR TO VIETNAM" },
    "/menu": { label: "About", href: "/about", text: "WHERE TWO CULTURES MEET" },
    "/about": { label: "Contact Us", href: "/contact", text: "Your Vietnamese Escape Awaits" },
    "/contact": { label: "Home", href: "/", text: "WELCOME TO PHO 99" },
    "/news": { label: "Home", href: "/", text: "WELCOME TO PHO 99" },
};

const FALLBACK: FooterLink = { label: "Home", href: "/", text: "WELCOME TO PHO 99" };

export function useFooterLink(): FooterLink {
    const pathname = usePathname();
    // strip trailing slash (except root)
    const clean = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    return ROUTE_MAP[clean] ?? FALLBACK;
}