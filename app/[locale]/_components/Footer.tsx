import Image from "next/image";
import Link from "next/link";

const Footer = () => {
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
  const policies = [
    {
      display: "Imprint",
      slug: "/imprint",
    },
    {
      display: "Terms and Conditions",
      slug: "/toc",
    },
    {
      display: "Data Protection",
      slug: "/data-protection",
    },
  ];
  return (
    <footer className=" footer ">
      <nav className="footer__nav">
        <Image
          src="/assets/logo.svg"
          width={100}
          height={100}
          alt=""
          className=" footer__logo "
        />
        <ul className=" footer__links ">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.slug}>
                <h5>{item.display} </h5>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className=" footer__policies ">
        <ul className=" footer__policies-nav ">
          {policies.map((item, index) => (
            <li key={index}>
              <Link href={item.slug}>
                <p>{item.display} </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
