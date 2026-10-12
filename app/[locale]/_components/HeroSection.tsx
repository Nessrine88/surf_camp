import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = ({ imgSrc, headline, theme = "turquoise" }: any) => {
  return (
    <section className="hero">
      <div className="hero__background">
        <Image
          src={imgSrc || "/assets/hero-home.png"}
          width={5000}
          height={5000}
          alt="Hero home image"
        />
      </div>
      <div className={`hero__headline hero__headline--${theme} `}>
        {headline || <h1>Headline is missing</h1>}
      </div>
      <button className={`btn btn--medium btn--${theme} `}>
        <Link href="/events">BOOK NOW</Link>
      </button>
      <Image
        className={`hero__logo hero__logo--${theme} `}
        src={"/assets/logo.svg"}
        width={100}
        height={100}
        alt="logo"
      />
    </section>
  );
};

export default HeroSection;
