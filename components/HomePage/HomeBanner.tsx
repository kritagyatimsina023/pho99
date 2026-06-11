import Image from "next/image";
import React from "react";

const HomeBanner = () => {
  return (
    <section className="w-full min-h-screen relative">
      <div>
        <Image
          src={"/Hero/Banner.webp"}
          alt="home-banner"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default HomeBanner;
