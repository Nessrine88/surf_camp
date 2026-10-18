
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type HeroSectionProps = {
  imgSrc?: string;
  headline?: React.ReactNode;
  theme?: string;
  imageAlt?: string;
};

const HeroSection = ({
  imgSrc = "/assets/hero-home.png",
  headline,
  theme = "turquoise",
  imageAlt = "",
}: HeroSectionProps) => {
  return (
    <section className="hero">
      <div className="hero__background">
        <Image
          src={imgSrc}
          alt={imageAlt}
          width={500}
          height={500}
          priority
          sizes="100vw"
          quality={80}
          className="hero__image"
        />
      </div>

      <div className={`hero__headline hero__headline--${theme}`}>
        {headline || <h1>Headline is missing</h1>}
      </div>

      <button className={`btn btn--medium btn--${theme}`}>
        <Link href="/events">BOOK NOW</Link>
      </button>

      <Image
        className={`hero__logo hero__logo--${theme}`}
        src="/assets/logo.svg"
        width={100}
        height={100}
        alt="Surf camp logo"
      />
    </section>
  );
};

export default HeroSection;
