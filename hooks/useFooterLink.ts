"use client";

import { usePathname } from "next/navigation";

export interface FooterLink {
    label: string;
    href: string;
}

const ROUTE_MAP: Record<string, FooterLink> = {
    "/": { label: "Menu", href: "/menu" },
    "/menu": { label: "About", href: "/about" },
    "/about": { label: "Contact Us", href: "/contact" },
    "/contact": { label: "Home", href: "/" },
    "/news": { label: "Home", href: "/" },
};

const FALLBACK: FooterLink = { label: "Home", href: "/" };

export function useFooterLink(): FooterLink {
    const pathname = usePathname();
    // strip trailing slash (except root)
    const clean = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    return ROUTE_MAP[clean] ?? FALLBACK;
}