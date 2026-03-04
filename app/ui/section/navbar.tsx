"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#prayers", label: "Prayer Times" },
  { href: "#events", label: "Events" },
  { href: "#facilities", label: "Facilities" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-200 bg-cream border-b border-parchment px-4 md:px-12 h-[60px] flex items-center">
      <Link
        href="/"
        className="flex items-center gap-2 mr-auto text-forest font-semibold tracking-wide text-sm"
      >
        <span className="w-1.5 h-1.5 bg-gold rounded-full" />
        <span className="hidden sm:inline">Masjid Al-Hikmah</span>
        <span className="sm:hidden">Al-Hikmah</span>
      </Link>

      <button
        className="md:hidden p-2 text-forest"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path d="M6 6l12 12M6 18L18 6" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div
        className={cn(
          "fixed md:static inset-0 md:inset-auto bg-cream md:bg-transparent flex flex-col md:flex-row items-center justify-center md:justify-end gap-6 md:gap-8 transition-opacity md:transition-none",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
        )}
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--text-2)] hover:text-forest text-xs tracking-widest transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="#"
          className="bg-forest text-cream hover:bg-forest-mid text-xs tracking-widest px-5 py-2 rounded-sm no-underline"
          onClick={() => setIsOpen(false)}
        >
          Declare Mosque
        </Link>
      </div>
    </nav>
  );
}
