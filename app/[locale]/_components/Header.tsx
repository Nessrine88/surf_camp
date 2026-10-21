
"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import "@/sass/main.scss";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { display: "the camp", slug: "/" },
    { display: "the experience", slug: "/experience" },
    { display: "the blog", slug: "/blog" },
  ];

  const isLight = pathname === "/en/experience";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${isLight ? "header--light" : ""}`}>
      <div className="header__inner">
        <Link href="/" onClick={closeMenu} aria-label="Home">
          <Image
            src="/assets/logo.svg"
            width={100}
            height={100}
            alt="Logo"
            className="header__logo"
          />
        </Link>

        <button
          type="button"
          className={`header__hamburger ${
            menuOpen ? "header__hamburger--open" : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="header-navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="header-navigation"
          className={`header__menu ${
            menuOpen ? "header__menu--open" : ""
          }`}
        >
          <ul className="header__nav">
            {navItems.map((item) => (
              <li key={item.slug}>
                <Link href={item.slug} onClick={closeMenu}>
                  <h5>{item.display}</h5>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/events"
            className="btn btn--black btn--small header__book"
            onClick={closeMenu}
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
