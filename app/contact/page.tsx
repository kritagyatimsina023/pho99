import ContactUs from "@/components/website/Contact/ContactUs";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Contact Pho99 Nepal | Reservations & Inquiries",
        template: "%s | Pho99 Nepal",
    },
    description:
        "Get in touch with Pho99 Nepal for reservations, dining inquiries, catering requests, feedback, or general information. We’re here to help you enjoy an authentic Vietnamese dining experience.",

    openGraph: {
        title: "Contact Pho99 Nepal | Reservations & Inquiries",
        description:
            "Contact Pho99 Nepal for table reservations, catering services, customer support, and dining information. We look forward to serving you.",
        url: "https://pho99nepal.com/contact",
        siteName: "Pho99 Nepal",
        images: [
            {
                url: "https://pho99nepal.com/og/contact.jpg",
                width: 1200,
                height: 630,
                alt: "Contact Pho99 Nepal",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Contact Pho99 Nepal | Reservations & Inquiries",
        description:
            "Reach out to Pho99 Nepal for reservations, catering, customer support, and all dining-related inquiries.",
        images: ["https://pho99nepal.com/og/contact.jpg"],
    },

    keywords: [
        "Contact Pho99 Nepal",
        "Pho99 Reservations",
        "Vietnamese Restaurant Contact",
        "Restaurant Kathmandu",
        "Book a Table Nepal",
        "Pho99 Customer Support",
        "Pho99 Catering",
        "Vietnamese Food Kathmandu",
        "Restaurant Inquiry Nepal",
    ],
};



export default function ContactPage() {
    return <ContactUs />;
}
