import MenuMain from "@/components/website/Menu/MenuMain";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Menu | Pho99 Nepal — Authentic Vietnamese Cuisine",
        template: "%s | Pho99 Nepal",
    },
    description:
        "Explore Pho99 Nepal's full menu featuring authentic Vietnamese dishes — from rich, slow-simmered pho and fresh spring rolls to banh mi, vermicelli bowls, and signature drinks. Fresh ingredients, bold flavors, every visit.",

    openGraph: {
        title: "Menu | Pho99 Nepal — Authentic Vietnamese Cuisine",
        description:
            "Browse Pho99 Nepal's menu of authentic Vietnamese dishes. Savor traditional pho, fresh spring rolls, banh mi, and more — crafted with quality ingredients and time-honored Vietnamese recipes.",
        url: "https://pho99nepal.com/menu",
        siteName: "Pho99 Nepal",
        type: "website",
    },
    keywords: [
        "Pho99 Nepal Menu",
        "Vietnamese Food Menu Nepal",
        "Pho Menu Kathmandu",
        "Authentic Vietnamese Dishes Nepal",
        "Spring Rolls Nepal",
        "Banh Mi Kathmandu",
        "Vietnamese Pho Nepal",
        "Asian Food Menu Kathmandu",
        "Vietnamese Restaurant Menu Nepal",
        "Noodle Soup Nepal",
    ],
};

export default function Home() {
    return (
        <>
            <MenuMain />
        </>
    )
}