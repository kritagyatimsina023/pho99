
"use client";
import { useEffect } from "react";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    useEffect(() => {

        const footer = document.querySelector("footer");
        const mainWrapper = document.getElementById("main-wrapper");

        if (footer) {
            footer.style.display = "none";
        }


        if (mainWrapper) {
            mainWrapper.style.minHeight = "100vh";
        }

        return () => {

            if (footer) {
                footer.style.display = "";
            }
            if (mainWrapper) {
                mainWrapper.style.minHeight = "";
            }
        };
    }, []);

    return (
        <div className="flex items-center justify-center h-screen relative z-50 bg-white">
            <div className="w-full h-full">
                <Image
                    priority
                    fill
                    src="/PhooRes/NotFoundTwo.png"
                    className="object-cover"
                    alt="not-found"
                />
            </div>
            <div className="absolute bottom-10 z-50">
                <Link href="/">
                    <Button>
                        Find Your Way Back
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;