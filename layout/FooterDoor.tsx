"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Lotus from "@/components/Lotus";
import Arrow from "@/components/Arrow";
import Button from "@/components/Button";

export interface DoorLink {
    label: string;
    href: string;
    text?: string
    subText?: string
    buttonText?: string
}

export interface FooterDoorProps {
    links?: DoorLink[];
    ariaLabel?: string;
    className?: string;
    menuDelay?: number;
}

const DEFAULT_LINKS: DoorLink[] = [
    { label: "Menu", href: "/menu", text: "your journey to", subText: "VIETNAM" },
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


    const handleTouchTap = useCallback((e: React.TouchEvent) => {
        if (menuRef.current && menuRef.current.contains(e.target as Node)) {

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
            className={`relative isolate h-[min(105vw,480px)] w-[min(78vw,340px)] cursor-pointer select-none overflow-x-hidden ${className}`}

            onMouseEnter={!isTouch ? openDoor : undefined}
            onMouseLeave={!isTouch ? closeDoor : undefined}

            onFocus={!isTouch ? openDoor : undefined}
            onBlur={!isTouch ? (event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) closeDoor();
            } : undefined}

            onTouchEnd={isTouch ? handleTouchTap : undefined}
        >
            <nav
                ref={menuRef}
                aria-label={ariaLabel}
                aria-hidden={!isOpen}

                className="absolute inset-[6%_10%] z-[-1] flex flex-col items-center justify-start text-center opacity-0 overflow-hidden rounded-t-[120px]"
            >

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

                    <p className="text-[9px] tracking-[0.22em] text-[#2c2c2c] uppercase font-bold mb-2 text-center">
                        {links[0]?.text}
                    </p>

                    <h2 className="text-3xl font-melfira text-[#9b2226] leading-none mb-3 tracking-wide text-center">
                        {links[0]?.subText}
                    </h2>
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
                            <Button className="scale-75  origin-top">
                                {link.buttonText}
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