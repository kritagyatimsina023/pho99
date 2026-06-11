'use client'
import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { ChevronRight, Clock, MapPin, Phone, Send } from "lucide-react";
import { LuInstagram } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import Heading from "@/components/Heading";

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/menu', label: 'Menu' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/news', label: 'News' },
    { href: '/contact', label: 'Contact Us', isActive: true },
];

const NewFooter = () => {
    return (
        <footer className="w-full bg-white text-black">
            {/* Main footer grid */}
            <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Col 1 — Logo + tagline */}
                <div className="flex flex-col gap-4">
                    <Image
                        src="/PhooRes/Logo/PhooLogo.svg"
                        alt="Pho99 Logo"
                        width={130}
                        height={80}
                    />
                </div>
                {/* Col 2 — Quick Links */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h4 className="text-black font-bold text-base tracking-wide mb-2">Quick Links</h4>
                        <div className="w-10 h-[3px] bg-red-600 mb-4" />
                    </div>
                    <ul className="flex flex-col gap-3">
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
                </div>

                {/* Col 3 — Visit Us */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h4 className="text-black font-bold text-base tracking-wide mb-2">Visit Us</h4>
                        <div className="w-10 h-[3px] bg-red-600 mb-4" />
                    </div>
                    <ul className="flex flex-col gap-5">
                        <li className="flex items-start gap-3">
                            <Clock size={18} className="text-red-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-black! text-sm font-semibold">Opening Hours</p>
                                <p className="text-sm text-black!">
                                    Everyday <span className="text-red-500 font-medium text-black!">10AM – 9:30PM</span>
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="text-red-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-black! text-sm font-semibold">Main Location</p>
                                <p className="text-sm text-black!">JhamsiKhel, Kathmandu</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone size={18} className="text-red-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-black! text-sm font-semibold">Contact</p>
                                <p className="text-sm text-black!">01-4543330</p>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* Col 4 — Stay Connected */}
                {/* <div className="flex flex-col gap-4">
                    <div>
                        <h4 className="text-black font-bold text-base tracking-wide mb-2">Stay Connected</h4>
                        <div className="w-10 h-[3px] bg-red-600 mb-4" />
                    </div>
                    <p className="text-black! text-sm">Subscribe for our latest updates</p>


                    <div className="flex items-center">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="flex-1 bg-white! rounded-l-md border border-zinc-700 text-sm text-black! placeholder-black! px-4 py-2.5 outline-none focus:border-zinc-500 rounded-none"
                        />
                        <button className="bg-red-500! hover:bg-red-700! transition-colors h-full rounded-r-md px-4 py-2.5 flex items-center justify-center cursor-pointer">
                            <Send size={16} className="text-black" />
                        </button>
                    </div>


                    <div className="mt-2">
                        <p className="text-black! text-sm font-semibold mb-3">Follow Us</p>
                        <div className="flex items-center gap-3">
                            <a href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-zinc-200 bg-zinc-200 flex items-center justify-center hover:border-black transition-colors"
                            >

                                <LuInstagram size={16} className="text-black" />

                            </a>

                            <a href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-zinc-200 bg-zinc-200 flex items-center justify-center hover:border-black transition-colors"
                            >

                                <FaFacebookF size={16} className="text-black" />
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
            {/* Big brand name */}
            <div className="border-t border-zinc-800 flex justify-center py-6 overflow-hidden">
                <Heading className="text-center uppercase text-red-500!">Pho</Heading>
                <Heading className="text-center uppercase text-black! ">Ninety</Heading>
                <Heading className="text-center uppercase text-red-500!">Nine</Heading>
            </div>

            {/* Bottom bar */}
            <div className="border-zinc-800 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
                <p className="text-zinc-500! text-xs">
                    © 2025 All Rights Reserved | Pho Ninety Nine Restaurant Pvt. Ltd.
                </p>
                <p className="text-zinc-500! text-xs">
                    Design and Developed by{' '}
                    <span className="text-black! font-semibold">webx</span>
                </p>
            </div>
        </footer>
    );
};

export default NewFooter;