import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/provider/lenisProvider";
import NavBar from "@/components/NavBar";
import DoorFooter from "@/layout/DoorFooter";
import { SoundProvider } from "@/provider/SoundProvider";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pho99",
  description: "Taste authentic Vietnamese cuisine at Pho99 in Kathmandu.",
  icons: {
    icon: "/PhooRes/Logo/PhooLogo.svg",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SoundProvider>
          <Preloader />
          <div id="main-wrapper" className="flex-1 flex flex-col min-h-full bg-background">
            <LenisProvider>
              <NavBar />
              {children}
              <DoorFooter />
            </LenisProvider>
          </div>
        </SoundProvider>
      </body>
    </html>
  );
}
