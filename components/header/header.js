import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <nav>
        <img src="" alt="" />
        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>
        <Link href="/about-us">About Us</Link>
      </nav>
    </header>
  );
};

export default Header;
