'use client'
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    Clock,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    SendHorizonal,
} from "lucide-react";
import Heading from "@/components/Heading";
import Buttons from "@/components/Buttons";
import Layout from "@/components/Layout";
import PageMainHero from "@/components/PageMainHero";
import Button from "@/components/Button";

const contactMethods = [
    {
        label: "Call Us",
        value: "+977-981 831 6955",
        href: "tel:+9779818316955",
        icon: Phone,
    },
    {
        label: "Email",
        value: "pho99nepal@gmail.com",
        href: "mailto:pho99nepal@gmail.com",
        icon: Mail,
    },
    {
        label: "Opening Hours",
        value: "Every day, 10 AM - 10 PM",
        href: "#locations",
        icon: Clock,
    },
];

const locations = [
    {
        name: "Lazimpat",
        address: "Lazimpat, Kathmandu",
        image: "/PhooRes/Building/heroBuildingOne.jpg",
        mapHref: "https://www.google.com/maps?ll=27.725304,85.322856&z=16&t=h&hl=en&gl=NP&mapclient=embed&cid=5968072047316399150",
        note: "Flagship Pho99 location with a warm, neighborhood dining room.",
        number: "+977-981 831 6955"
    },
    {
        name: "Boudha",
        address: "Boudha, Kathmandu",
        image: "/PhooRes/Building/Bouddha.jpg",
        mapHref: "https://www.google.com/maps?ll=27.72104,85.361585&z=13&t=h&hl=en&gl=NP&mapclient=embed&cid=17330905215922559191",
        note: "A calm stop for Vietnamese comfort near the Boudhanath area.",
        number: "+977-980 114 3330"

    },
    {
        name: "Jhamsikhel",
        address: "Jhamsikhel, Lalitpur",
        image: "/PhooRes/Building/Jhamsikhel.jpg",
        mapHref: "https://www.google.com/maps?ll=27.677941,85.307323&z=16&t=h&hl=en&gl=NP&mapclient=embed&cid=9912620767158058476",
        note: "Courtyard-style dining for gatherings, lunch plans, and dinner.",
        number: "+977-980 320 3119"

    },
    {
        name: "Thamel",
        address: "Thamel, Kathmandu",
        image: "/PhooRes/Building/Thamel.jpeg",
        mapHref: "https://www.google.com/maps?ll=27.713582,85.310185&z=15&t=m&hl=en&gl=NP&mapclient=embed&cid=9799723082701011482",
        note: "A lively city-center retreat for travelers and Kathmandu locals.",
        number: "+977-970 909 0400"

    },
];

const inputClass =
    "w-full border-0 border-b border-[#e1d5c8] bg-transparent px-0 py-4 text-sm text-[#2f2f31]! outline-none transition-colors placeholder:text-[#aaa198] focus:border-[#ec1c25]";

const ContactUs = () => {
    return (
        <main className="bg-white!">
            {/* <section className="relative min-h-[88vh] overflow-hidden">
                <Image
                    src="/PhooRes/Building/buildingInner.jpg"
                    alt="Pho99 restaurant interior"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
                <div className="relative z-10 flex min-h-[88vh] flex-col justify-end px-6 pb-20 pt-32 md:px-16">
                    <div className="mx-auto flex w-full justify-between items-center md:px-16 px-6 pb-20 pt-20" >
                        <div>
                            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.3em] text-red-400!">
                                Contact Pho99
                            </span>
                            <Heading className="max-w-3xl text-white! text-7xl! leading-[0.95] heading-secondary md:text-8xl!">
                                Let&apos;s Make Room At The Table
                            </Heading>
                            <p className="mt-6 max-w-xl text-base leading-relaxed text-white! opacity-85">
                                Reach out for reservations, private gatherings, delivery questions, or anything you would like to ask before visiting Pho99.
                            </p>
                        </div>
                        <div className="grid gap-3  sm:grid-cols-3 lg:grid-cols-1 max-w-[65%] ">
                            {contactMethods.map((method) => {
                                const Icon = method.icon;
                                return (
                                    <Link
                                        key={method.label}
                                        href={method.href}
                                        className="group flex items-center gap-4 rounded-[8px]  border border-white/15 bg-white/10 p-4 backdrop-blur-xs transition-all duration-300 hover:border-red-300/60 hover:bg-[#ec1c25]/85"
                                    >
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#ec1c25] transition-colors group-hover:bg-white">
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60!">
                                                {method.label}
                                            </span>
                                            <span className="mt-1 block text-sm font-semibold text-white!">
                                                {method.value}
                                            </span>
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section> */}
            <PageMainHero heroImg="/PhooRes/Building/buildingInner.jpg" heading="Let&apos;s Make Room At The Table" subHeading=" Reach out for reservations, private gatherings, delivery questions, or anything you would like to ask before visiting Pho99." />
            <Layout className="max-w-8xl!" >
                <section className="px-6 py-24 md:px-16">
                    <div className="mx-auto grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
                        <div className="lg:sticky lg:top-24">
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500!">
                                Send A Message
                            </span>
                            <Heading className="mt-4 text-5xl! leading-[1.05] md:text-6xl!">
                                We&apos;d Love To Hear From You
                            </Heading>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-para-secondary">
                                Tell us what you need and our team will get back to you. For same-day reservations, calling the restaurant is the fastest route.
                            </p>

                            <div className="mt-10 overflow-hidden rounded-[8px] bg-[#ec1c25] p-6">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#ec1c25]">
                                        <MessageCircle className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70!">
                                            Quick Note
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-white!">
                                            Include your preferred location, date, time, and party size if you are asking about a booking.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form className="rounded-[8px] border border-[#eadfd2] bg-white! p-6 md:p-10">
                            <div className="grid gap-6 md:grid-cols-2">
                                <label>
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a8984]!">
                                        Full Name
                                    </span>
                                    <input className={inputClass} type="text" name="name" placeholder="Your name" />
                                </label>
                                <label>
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a8984]!">
                                        Phone Number
                                    </span>
                                    <input className={inputClass} type="tel" name="phone" placeholder="+977" />
                                </label>
                                <label>
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a8984]!">
                                        Email Address
                                    </span>
                                    <input className={inputClass} type="email" name="email" placeholder="you@example.com" />
                                </label>
                                <label>
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a8984]!">
                                        Preferred Location
                                    </span>
                                    <select className={inputClass} name="location" defaultValue="">
                                        <option value="" disabled>
                                            Choose a branch
                                        </option>
                                        {locations.map((location) => (
                                            <option key={location.name} value={location.name}>
                                                {location.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <label className="mt-8 block">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a8984]!">
                                    Message
                                </span>
                                <textarea
                                    className={`${inputClass} min-h-36 resize-none`}
                                    name="message"
                                    placeholder="Tell us about your reservation, event, or question"
                                />
                            </label>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="max-w-md text-xs leading-5 text-[#8a8984]!">
                                    Our team usually replies within the day. For urgent bookings, please call the nearest branch directly.
                                </p>
                                <Button type="submit" className="scale-[0.85] origin-center sm:origin-right">
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
                <section id="locations" className="bg-white! px-6 py-24 md:px-16">

                    <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500!">
                                Visit Us
                            </span>
                            <Heading className="mt-4 text-5xl! leading-[1.05] md:text-6xl!">
                                Find Your Nearest Pho99
                            </Heading>
                        </div>
                        <p className="max-w-md text-sm leading-6 text-[#7c746c]!">
                            Four locations across Kathmandu Valley, each carrying the same red Pho99 warmth, slow-simmered broths, and welcoming service.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {locations.map((location) => (
                            <div
                                key={location.name}
                                className="group overflow-hidden rounded-[8px] border border-[#eadfd2] bg-white shadow-[0_18px_45px_rgba(35,27,20,0.07)]"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={location.image}
                                        alt={`${location.name} Pho99 location`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <span className="absolute bottom-4 left-4 rounded-full bg-[#ec1c25] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white!">
                                        {location.name}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <div className="space-y-2" >
                                        <div className="flex items-start gap-3">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ec1c25]" aria-hidden="true" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#2f2f31]!">
                                                    {location.address}
                                                </p>
                                                {/* <p className="mt-2 text-sm leading-6 text-[#8a8984]!">
                                                {location.note}
                                            </p> */}
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#ec1c25]" aria-hidden="true" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#2f2f31]!">
                                                    {location.number}
                                                </p>
                                                {/* <p className="mt-2 text-sm leading-6 text-[#8a8984]!">
                                                {location.note}
                                            </p> */}
                                            </div>
                                        </div>

                                    </div>
                                    <Link
                                        href={location.mapHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center 
                                        gap-2 text-xs font-semibold 
                                        uppercase 
                                        text-[#ec1c25]!"
                                    >
                                        <Button className="scale-[0.85] origin-left">
                                            View Map
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
            </Layout>
        </main>
    );
};

export default ContactUs;
