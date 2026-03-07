"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#prayers", label: "Prayer Times" },
  { href: "#events", label: "Events" },
  { href: "#facilities", label: "Facilities" },
  { href: "#about", label: "About" },
  { href: "/zakat", label: "Zakat Calculator" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-200 bg-background border-b border-border px-4 md:px-12 h-[60px] flex items-center">
      <Link
        href="/"
        className="flex items-center gap-2 mr-auto text-primary font-semibold tracking-wide text-sm"
      >
        <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
        <span className="hidden sm:inline">Masjid Al-Hikmah</span>
        <span className="sm:hidden">Al-Hikmah</span>
      </Link>

      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
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
      </Button>

      <div
        className={cn(
          "fixed md:static inset-0 md:inset-auto bg-background md:bg-transparent flex flex-col md:flex-row items-center justify-center md:justify-end gap-6 md:gap-8 transition-opacity md:transition-none",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
        )}
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary text-xs tracking-widest transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button render={<Link href="#" />} className="tracking-widest text-xs" onClick={() => setIsOpen(false)}>
          Declare Mosque
        </Button>
      </div>
    </nav>
  );
}
