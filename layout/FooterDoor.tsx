"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

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
    }, []);

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
            playPromise.catch(() => {
                video.pause();
            });
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

    return (
        <div
            ref={rootRef}
            className={`relative isolate h-[min(105vw,480px)] w-[min(78vw,340px)] cursor-pointer select-none ${className}`}
            onMouseEnter={openDoor}
            onMouseLeave={closeDoor}
            onFocus={openDoor}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    closeDoor();
                }
            }}
        >
            <nav
                ref={menuRef}
                aria-label={ariaLabel}
                aria-hidden={!isOpen}
                className="absolute inset-[6%_10%] z-10 flex flex-col items-center justify-center gap-3 rounded-lg px-5 py-8 opacity-0 "
            >
                <Image alt="logo" src={"/PhooRes/Logo/PhooLogo.svg"} width={120} height={120} />
                {links.map((link) => (
                    <Link
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        className="max-w-full break-words px-2 py-1.5 text-center font-serif font-bold  uppercase leading-tight  text-black! no-underline  transition-colors"
                        onMouseEnter={(event) => {
                            gsap.to(event.currentTarget, {
                                color: "#ffffff",
                                y: -2,
                                // letterSpacing: "0.2em",
                                duration: 0.16,
                                ease: "power2.out",
                                overwrite: true,
                            });
                        }}
                        onMouseLeave={(event) => {
                            gsap.to(event.currentTarget, {
                                color: "#f1d79f",
                                y: 0,
                                // letterSpacing: "0.16em",
                                duration: 0.16,
                                ease: "power2.out",
                                overwrite: true,
                            });
                        }}
                    >
                        {link.label}
                    </Link>
                ))}

                {/* <span
                    aria-hidden="true"
                    className="h-px w-2/3 bg-gradient-to-r from-transparent via-[#d7ad62]/80 to-transparent"
                /> */}
            </nav>

            <video
                ref={videoRef}
                src={DOOR_VIDEO}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                onEnded={(event) => {
                    event.currentTarget.pause();
                }}
                className="pointer-events-none absolute inset-0 z-20 h-full w-full object-contain mix-blend-multiply"
            />

            {/* <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-[4%] z-40 rounded-lg transition-shadow duration-300 ${isOpen
                    ? "shadow-[0_0_36px_rgba(201,169,110,0.28),inset_0_0_24px_rgba(201,169,110,0.12)]"
                    : "shadow-none"
                    }`}
            /> */}
        </div>
    );
}
