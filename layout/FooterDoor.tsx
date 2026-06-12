"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Buttons from "@/components/Buttons";
import Lotus from "@/components/Lotus";
import Arrow from "@/components/Arrow";
import Button from "@/components/Button";

export interface DoorLink {
    label: string;
    href: string;
    text?: string
}

export interface FooterDoorProps {
    links?: DoorLink[];
    ariaLabel?: string;
    className?: string;
    menuDelay?: number;
}

const DEFAULT_LINKS: DoorLink[] = [
    { label: "Menu", href: "/menu", text: "OPEN THE DOOR TO VIETNAM" },
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

    const renderLotusIcon = (className: string) => (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
            <path d="M12 2.5C12 2.5 9 7.5 9 11.5C9 14.5 12 17.5 12 17.5C12 17.5 15 14.5 15 11.5C15 7.5 12 2.5 12 2.5Z" />
            <path d="M7 8.5C7 8.5 2 11 2 14.5C2 17.5 6 18.5 6 18.5C6 18.5 8 14.5 8 11.5C8 10 7 8.5 7 8.5Z" />
            <path d="M17 8.5C17 8.5 22 11 22 14.5C22 17.5 18 18.5 18 18.5C18 18.5 16 14.5 16 11.5C16 10 17 8.5 17 8.5Z" />
            <path d="M10 11C10 11 6 13.5 6 17C6 19.5 10 19.5 10 19.5C10 19.5 11 15.5 11 13C11 12 10 11 10 11Z" />
            <path d="M14 11C14 11 18 13.5 18 17C18 19.5 14 19.5 14 19.5C14 19.5 13 15.5 13 13C13 12 14 11 14 11Z" />
        </svg>
    );

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
                // Use a lower z-index so it sits behind the video. The video has mix-blend-multiply
                // which allows this nav background to show through the transparent/white areas of the video.
                className="absolute inset-[6%_10%] z-[-1] flex flex-col items-center justify-start text-center opacity-0 overflow-hidden rounded-t-[120px]"
            >
                {/* Random Background Image with overlay to match the cream aesthetic */}
                <div className="absolute inset-0 w-full h-full">
                    <Image src="/PhooRes/Building/Image.png" alt="background" fill className="object-cover opacity-60" />
                    <div className="absolute inset-0 bg-[#fffaf0] mix-blend-overlay opacity-90" />
                    <div className="absolute inset-0 " />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-start w-full h-full px-3 pt-10 pb-4">

                    {/* Top lotus */}
                    <div className="flex items-center gap-1.5 mb-3">
                        <Lotus className="w-7 h-7" />
                    </div>

                    <p className="text-[9px] tracking-[0.22em] text-[#2c2c2c] uppercase font-bold mb-2">
                        YOUR JOURNEY TO
                    </p>

                    <h2 className="text-3xl font-melfira text-[#9b2226] leading-none mb-3 tracking-wide">
                        VIETNAM
                    </h2>

                    {/* Decorative divider with arrows */}
                    <div className="flex items-center w-full justify-center mb-4">
                        {/* <div className="flex-1 flex justify-end">
                            <Arrow className="w-15 h-20" />
                        </div>
                        <p className="text-[12px] font-melfira text-[#2c2c2c] font-bold whitespace-nowrap">
                            Starts Here
                        </p>
                        <div className="flex-1 flex justify-start">
                            <Arrow imgClassName="rotate-180" className="w-15 h-20" />
                        </div> */}
                    </div>
                    {/* Begin Journey button */}
                    {links.map((link) => (
                        <Link
                            key={`${link.href}-${link.label}`}
                            href={link.href}
                            onClick={() => { closeDoor(); }}
                            onTouchEnd={(e) => {
                                e.stopPropagation();
                                closeDoor();
                            }}
                            className="mt-15"
                        >
                            <Button className="scale-75 origin-top">
                                Begin Journey
                            </Button>
                        </Link>
                    ))}
                </div>
            </nav>
            <video
                ref={videoRef}
                src={DOOR_VIDEO}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                onEnded={(event) => { event.currentTarget.pause(); }}
                className="pointer-events-none absolute inset-0 z-0 h-full w-710 object-contain mix-blend-multiply"
            />
        </div>
    );
}