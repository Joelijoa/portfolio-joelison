"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "projects", label: "Projets" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Parcours" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const offsets = SECTIONS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top - 100) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-sm border-b border-dim" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="font-mono text-xs tracking-widest uppercase text-muted hover:text-white transition-colors"
        >
          JJ_
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`nav-link ${active === id ? "active" : ""}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-64 border-b border-dim" : "max-h-0"
        }`}
      >
        <ul className="px-6 py-4 flex flex-col gap-4 bg-black">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`nav-link text-sm ${active === id ? "active" : ""}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
