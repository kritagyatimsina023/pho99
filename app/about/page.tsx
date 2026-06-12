import AboutUsMain from "@/components/website/About/AboutUsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "About Pho99 Nepal | Authentic Vietnamese Cuisine",
        template: "%s | Pho99 Nepal",
    },
    description:
        "Discover the story behind Pho99 Nepal. We bring the rich flavors of authentic Vietnamese cuisine to Nepal, serving traditional pho, fresh ingredients, and unforgettable dining experiences crafted with passion and authenticity.",

    openGraph: {
        title: "About Pho99 Nepal | Authentic Vietnamese Cuisine",
        description:
            "Learn about Pho99 Nepal's journey, passion for Vietnamese cooking, and commitment to serving authentic flavors, quality ingredients, and exceptional hospitality.",
        url: "https://pho99nepal.com/about",
        siteName: "Pho99 Nepal",
        images: [
            {
                url: "https://pho99nepal.com/og/about.jpg",
                width: 1200,
                height: 630,
                alt: "About Pho99 Nepal",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "About Pho99 Nepal | Authentic Vietnamese Cuisine",
        description:
            "Experience the story, passion, and authentic Vietnamese flavors that make Pho99 Nepal a unique dining destination.",
        images: ["/PhooRes/Building/buildingInner.jpg"],
    },

    keywords: [
        "Pho99 Nepal",
        "About Pho99",
        "Vietnamese Restaurant Nepal",
        "Authentic Pho Nepal",
        "Vietnamese Food Kathmandu",
        "Pho Restaurant Nepal",
        "Asian Cuisine Nepal",
        "Vietnamese Dining Experience",
    ],
};
export default function Home() {
    return <>
        <main className="bg-white! z-20">
            <AboutUsMain />
        </main>
    </>
}