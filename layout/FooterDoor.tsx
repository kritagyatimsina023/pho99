"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export interface DoorLink {
    label: string;
    href: string;
}

export interface FooterDoorProps {
    links?: DoorLink[];
    ariaLabel?: string;
    className?: string;
    menuDelay?: number;
}

const DEFAULT_LINKS: DoorLink[] = [
    { label: "Menu", href: "/menu" },
];

const DOOR_VIDEO = "/PhooRes/Logo/newDoorOpen.webm";
const DOOR_PLAYBACK_RATE = 3.68;

function useIsTouchDevice() {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
        setIsTouch(mq.matches);

        const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return isTouch;
}

export default function FooterDoor({
    links = DEFAULT_LINKS,
    ariaLabel = "Footer menu",
    className = "",
    menuDelay = 0.96,
}: FooterDoorProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const menuRef = useRef<HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isTouch = useIsTouchDevice();

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!menuRef.current) return;
            gsap.set(menuRef.current, {
                autoAlpha: 0,
                y: 8,
                scale: 0.98,
                pointerEvents: "none",
            });
        }, rootRef);

        const video = videoRef.current;
        if (!video) return () => ctx.revert();

        const resetVideo = () => {
            video.pause();
            video.currentTime = 0;
            video.playbackRate = DOOR_PLAYBACK_RATE;
        };

        if (video.readyState >= 1) {
            resetVideo();
        } else {
            video.addEventListener("loadedmetadata", resetVideo, { once: true });
        }

        return () => {
            video.removeEventListener("loadedmetadata", resetVideo);
            ctx.revert();
        };
    }, []);

    const revealMenu = useCallback(() => {
        if (!menuRef.current) return;
        gsap.to(menuRef.current, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            delay: menuDelay,
            ease: "power2.out",
            pointerEvents: "auto",
            overwrite: true,
        });
    }, [menuDelay]);

    const hideMenu = useCallback(() => {
        if (!menuRef.current) return;
        gsap.to(menuRef.current, {
            autoAlpha: 0,
            y: 8,
            scale: 0.98,
            duration: 0.16,
            ease: "power1.out",
            pointerEvents: "none",
            overwrite: true,
        });
    }, [pathname]);

    const openDoor = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        setIsOpen(true);
        revealMenu();

        video.playbackRate = DOOR_PLAYBACK_RATE;
        if (video.ended || video.currentTime >= video.duration - 0.04) {
            video.currentTime = 0;
        }

        const playPromise = video.play();
        if (playPromise) {
            playPromise.catch(() => { video.pause(); });
        }
    }, [revealMenu]);

    const closeDoor = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        setIsOpen(false);
        hideMenu();
        video.pause();
        video.currentTime = 0;
    }, [hideMenu]);

    // Touch: toggle open/close on tap
    const handleTouchTap = useCallback((e: React.TouchEvent) => {
        if (menuRef.current && menuRef.current.contains(e.target as Node)) {
            // Touch is on a nav link — let it navigate naturally, don't interfere
            return;
        }
        e.preventDefault();
        isOpen ? closeDoor() : openDoor();
    }, [isOpen, openDoor, closeDoor]);

    useEffect(() => {
        closeDoor();
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        video.currentTime = 0;
        video.load();
    }, [pathname, closeDoor]);

    return (
        <div
            ref={rootRef}
            className={`relative isolate h-[min(105vw,480px)] w-[min(78vw,340px)] cursor-pointer select-none ${className}`}
            // Desktop: hover
            onMouseEnter={!isTouch ? openDoor : undefined}
            onMouseLeave={!isTouch ? closeDoor : undefined}
            // Desktop keyboard
            onFocus={!isTouch ? openDoor : undefined}
            onBlur={!isTouch ? (event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) closeDoor();
            } : undefined}
            // Mobile/tablet: tap to toggle
            onTouchEnd={isTouch ? handleTouchTap : undefined}
        >
            <nav
                ref={menuRef}
                aria-label={ariaLabel}
                aria-hidden={!isOpen}
                className="absolute inset-[6%_10%] z-10 flex flex-col items-center justify-center gap-3 rounded-lg px-5 py-8 opacity-0"
            >
                <Image alt="logo" src={"/PhooRes/Logo/PhooLogo.svg"} width={120} height={120} />
                {links.map((link) => (
                    // 2. Link — add onTouchEnd stopPropagation so it doesn't bubble to the parent div
                    <Link
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        onClick={() => {
                            closeDoor();
                        }}
                        onTouchEnd={(e) => {
                            e.stopPropagation(); // prevent bubbling to parent's onTouchEnd (which would closeDoor instead of navigate)
                            closeDoor();         // still reset the door/video
                        }}
                        className="max-w-full break-words px-2 py-1.5 text-center font-serif font-bold uppercase leading-tight text-black! no-underline transition-colors"
                        onMouseEnter={(event) => {
                            gsap.to(event.currentTarget, {
                                color: "#ffffff",
                                y: -2,
                                duration: 0.16,
                                ease: "power2.out",
                                overwrite: true,
                            });
                        }}
                        onMouseLeave={(event) => {
                            gsap.to(event.currentTarget, {
                                color: "#f1d79f",
                                y: 0,
                                duration: 0.16,
                                ease: "power2.out",
                                overwrite: true,
                            });
                        }}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            <video
                ref={videoRef}
                src={DOOR_VIDEO}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                onEnded={(event) => { event.currentTarget.pause(); }}
                className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain mix-blend-multiply"
            />
        </div>
    );
}