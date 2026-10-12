"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // next-intl's locale-aware hooks
import { useParams } from "next/navigation";
import "@/sass/main.scss";

const languages = ["en", "fr", "ar"];

const Header = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const newPathname = pathname.replace(/^\/[^/]+/, `/${newLocale}`);
    router.replace(newPathname);
  };
  const navItems = [
    {
      display: "the camp",
      slug: "/",
    },
    {
      display: "the experience",
      slug: "/experience",
    },
    {
      display: "the blog",
      slug: "/blog",
    },
  ];
  return (
    <header
      className={`header ${pathname === "/en/experience" ? "header--light" : ""} `}
    >
      <div className="header">
        <div>
          <Image
            src="/assets/logo.svg"
            width={100}
            height={100}
            alt="Logo"
            className="header__logo"
          />
        </div>
        <div>
          <ul className="header__nav ">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.slug}>
                  <h5>{item.display} </h5>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {/* <select onChange={handleLanguage} value={params.locale as string}>
            {languages.map((lan) => (
              <option key={lan} value={lan}>
               <h5> {lan}</h5>
              </option>
            ))}
          </select> */}
          <div>
            <Link href="/events">
              <button className="btn btn--black btn--small">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
