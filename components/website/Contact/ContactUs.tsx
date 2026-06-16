"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MailCheck,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  User,
} from "lucide-react";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import PageMainHero from "@/components/PageMainHero";
import Button from "@/components/Button";

const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "YOUR_PUBLIC_KEY";
// ─────────────────────────────────────────────────────────────────────────────

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
    mapHref:
      "https://www.google.com/maps?ll=27.725304,85.322856&z=16&t=h&hl=en&gl=NP&mapclient=embed&cid=5968072047316399150",
    note: "Flagship Pho99 location with a warm, neighborhood dining room.",
    number: "+977-981 831 6955",
  },
  {
    name: "Boudha",
    address: "Boudha, Kathmandu",
    image: "/PhooRes/Building/Bouddha.jpg",
    mapHref:
      "https://www.google.com/maps?ll=27.72104,85.361585&z=13&t=h&hl=en&gl=NP&mapclient=embed&cid=17330905215922559191",
    note: "A calm stop for Vietnamese comfort near the Boudhanath area.",
    number: "+977-980 114 3330",
  },
  {
    name: "Jhamsikhel",
    address: "Jhamsikhel, Lalitpur",
    image: "/PhooRes/Building/Jhamsikhel.jpg",
    mapHref:
      "https://www.google.com/maps?ll=27.677941,85.307323&z=16&t=h&hl=en&gl=NP&mapclient=embed&cid=9912620767158058476",
    note: "Courtyard-style dining for gatherings, lunch plans, and dinner.",
    number: "+977-980 320 3119",
  },
  {
    name: "Thamel",
    address: "Thamel, Kathmandu",
    image: "/PhooRes/Building/Thamel.jpeg",
    mapHref:
      "https://www.google.com/maps?ll=27.713582,85.310185&z=15&t=m&hl=en&gl=NP&mapclient=embed&cid=9799723082701011482",
    note: "A lively city-center retreat for travelers and Kathmandu locals.",
    number: "+977-970 909 0400",
  },
];

const inputClass =
  "w-full border-0 border-b border-[#e1d5c8] bg-transparent px-0 py-4 text-sm text-[#2f2f31]! outline-none transition-colors placeholder:text-[#aaa198] focus:border-[#ec1c25]";

type FormStatus = "idle" | "loading" | "success" | "error";

const emptyForm = {
  from_name: "",
  phone: "",
  reply_to: "",
  address: "",
  message: "",
};

const ContactUs = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "phone") {
      setPhoneError(validateNepalPhone(value) ?? "");
    }
  };
  const validateNepalPhone = (phone: string): string | null => {
    if (!phone) return null;
    const cleaned = phone.replace(/[\s\-]/g, "");
    const mobileRegex = /^(\+977|977|0)?[9][6-9]\d{8}$/;
    //   const landlineRegex = /^(\+977|977)?0[1-9]\d{5,7}$/;
    if (!mobileRegex.test(cleaned)) {
      return "Enter a valid number(e.g. 98XXXXXXXX or +977-98XXXXXXXX)";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneErr = validateNepalPhone(form.phone);
    if (phoneErr) {
      setPhoneError(phoneErr);
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: "Pho99info@gmail.com",
            from_name: form.from_name,
            name: form.from_name,
            reply_to: form.reply_to,
            title: form.message,
            phone: form.phone,
            address: form.address,
            message: form.message,
          },
        }),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        console.error("EmailJS error body:", errorBody);
        throw new Error(`EmailJS responded with ${res.status}: ${errorBody}`);
      }
      setStatus("success");
      setForm(emptyForm);
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      console.error("EmailJS error:", err);
      setErrorMsg(
        "Something went wrong. Please try again or call us directly.",
      );
      setStatus("error");
    }
  };

  return (
    <main className="bg-white!">
      <PageMainHero
        heroImg="/PhooRes/Building/ThamelPic.png"
        heading="Let's Make Room At The Table"
        subHeading=" Reach out for reservations, private gatherings, delivery questions, or anything you would like to ask before visiting Pho99."
      />
      <Layout className="max-w-8xl!">
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
                Tell us what you need and our team will get back to you. For
                same-day reservations, calling the restaurant is the fastest
                route.
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
                      Include your preferred location, date, time, and party
                      size if you are asking about a booking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="rounded-[8px] border border-[#eadfd2] bg-white! p-6 md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <label>
                  <span className="text-[10px] flex items-center gap-2 font-semibold uppercase tracking-[0.22em] text-black!">
                    <User size={16} />
                    Full Name
                  </span>
                  <input
                    className={inputClass}
                    type="text"
                    name="from_name"
                    placeholder="Your name"
                    value={form.from_name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <span className="text-[10px] flex items-center gap-2 font-semibold uppercase tracking-[0.22em] text-black!">
                    <PhoneCall size={16} />
                    Phone Number
                  </span>
                  <input
                    className={`${inputClass} ${phoneError ? "border-b-red-500!" : ""}`}
                    type="tel"
                    name="phone"
                    placeholder="+977-98XXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {phoneError && (
                    <p className="mt-1 text-[11px] text-red-500! font-medium">
                      {phoneError}
                    </p>
                  )}
                </label>
                <label>
                  <span className="text-[10px] flex items-center gap-2 font-semibold uppercase tracking-[0.22em] text-black!">
                    <MailCheck size={16} />
                    Email Address
                  </span>
                  <input
                    className={inputClass}
                    type="email"
                    name="reply_to"
                    placeholder="you@example.com"
                    value={form.reply_to}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <span className="text-[10px] flex items-center gap-2 font-semibold uppercase tracking-[0.22em] text-black!">
                    <MapPin size={16} />
                    Preferred Location
                  </span>
                  <select
                    className={inputClass}
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  >
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
                <span className="text-[10px] flex items-center gap-2 font-semibold uppercase tracking-[0.22em] text-black!">
                  <MessageCircle size={16} />
                  Message
                </span>
                <textarea
                  className={`${inputClass} min-h-36 resize-none`}
                  name="message"
                  placeholder="Tell us about your reservation, event, or question"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </label>
              {/* Error message */}
              {status === "error" && (
                <p className="mt-4 text-xs text-red-600! font-medium">
                  {errorMsg}
                </p>
              )}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {status === "success" ? (
                  <div className="flex items-center gap-3 rounded-[8px] bg-green-50 border border-green-200 px-5 py-3 w-full">
                    <CheckCircle2
                      className="text-green-600 shrink-0"
                      size={20}
                    />
                    <p className="text-sm font-medium text-green-700">
                      Message sent! We&apos;ll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="max-w-md text-xs leading-5 text-[#8a8984]!">
                      Our team usually replies within the day. For urgent
                      bookings, please call the nearest branch directly.
                    </p>
                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="scale-[0.85] flex justify-center items-center text-center sm:origin-right disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <div className="flex items-center gap-1">
                          <Loader2 size={16} className="animate-spin mr-1" />
                          {/* Sending… */}
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </>
                )}
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
              Four locations across Kathmandu Valley, each carrying the same red
              Pho99 warmth, slow-simmered broths, and welcoming service.
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
                  <span className="absolute bottom-2 left-3 rounded-full border border-red-500/35 px-4 py-1.5 text-xs bg-white/10 backdrop-blur-[1.2px] font-semibold uppercase tracking-wide text-white!">
                    {location.name}
                  </span>
                </div>
                <div className="p-5">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#ec1c25]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#2f2f31]!">
                          {location.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#ec1c25]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#2f2f31]!">
                          {location.number}
                        </p>
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
                    <Button className="scale-[0.75] origin-left">
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
