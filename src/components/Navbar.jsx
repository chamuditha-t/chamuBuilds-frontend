import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, target) => {
    if (isHome && target.startsWith("#")) {
      // Allow smooth scroll on home page
      return;
    }
    
    if (!isHome && target.startsWith("#")) {
      // If we're not on home, we shouldn't use <a> for section links
      // But standard behavior for HashRouter is that #/ and then #section works.
      // However, it's safer to use Link to="/" if we want to go back.
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-amber-500/10 py-3"
          : "bg-transparent py-5 md:py-7"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2.5 no-underline group" onClick={() => setMobileMenuOpen(false)}>
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full pulse" />
          <span className="font-extrabold text-base md:text-lg tracking-tighter text-[#f0f0f0]">
            CHAMU<span className="text-amber-500">.</span>BUILDS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-9">
          <NavLink to="/#expertise">/expertise</NavLink>
          <NavLink to="/#work">/work</NavLink>
          <NavLink to="/#building">/now</NavLink>
          <NavLink to="/#contact">/ping</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#f0f0f0] text-2xl focus:outline-none z-50 relative"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Hire Button */}
        <a
          href="#contact"
          className="hidden md:inline-block bg-amber-500 text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-amber-400 transition-all hover:scale-105"
        >
          hire me
        </a>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-amber-500/20 py-6 px-5 flex flex-col gap-5 z-40">
          <NavLink to="/#expertise" onClick={() => setMobileMenuOpen(false)}>/expertise</NavLink>
          <NavLink to="/#work" onClick={() => setMobileMenuOpen(false)}>/work</NavLink>
          <NavLink to="/#building" onClick={() => setMobileMenuOpen(false)}>/now</NavLink>
          <NavLink to="/#contact" onClick={() => setMobileMenuOpen(false)}>/ping</NavLink>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-amber-500 text-black px-5 py-2 rounded-full text-xs font-bold text-center w-full"
          >
            hire me
          </a>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children, onClick }) {
  // We use standard <a> for section links because HashRouter handles /#section correctly
  return (
    <a
      href={to}
      onClick={onClick}
      className="nav-link text-xs tracking-wider text-[#555] hover:text-amber-500 transition-all duration-200 relative"
    >
      {children}
    </a>
  );
}
