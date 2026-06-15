import MainNews from "@/components/website/News/MainNews";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "News & Media | Pho99 Nepal — Vietnamese Restaurant Coverage",
        template: "%s | Pho99 Nepal",
    },
    description:
        "Catch up on the latest news, press features, and media coverage of Pho99 Nepal. From restaurant reviews to cultural stories, see what the press is saying about Kathmandu's favorite Vietnamese dining spot.",

    openGraph: {
        title: "News & Media | Pho99 Nepal — Press & Restaurant Coverage",
        description:
            "Explore press features, news articles, and media coverage of Pho99 Nepal — Kathmandu's beloved Vietnamese restaurant bringing authentic pho and Vietnamese culture to Nepal since 2011.",
        url: "https://pho99nepal.com/news",
        siteName: "Pho99 Nepal",
        type: "website",
    },
    keywords: [
        "Pho99 Nepal News",
        "Vietnamese Restaurant Nepal Press",
        "Pho99 Media Coverage",
        "Vietnamese Food Kathmandu Review",
        "Pho99 Restaurant Reviews",
        "Nepal Food News",
        "Vietnamese Cuisine Nepal Media",
        "Kathmandu Restaurant News",
        "Pho99 Press Features",
        "Vietnamese Dining Nepal Coverage",
    ],
};
export default function Home() {
    return (
        <>
            <MainNews />
        </>
    )
}