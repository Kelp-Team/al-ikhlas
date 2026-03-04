import Link from "next/link";

const navLinks = [
  { href: "#prayers", label: "Prayer Times" },
  { href: "#events", label: "Events" },
  { href: "#facilities", label: "Facilities" },
  { href: "#about", label: "About" },
];

export function HeaderBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-background border-b border-parchment px-12 h-[60px] flex items-center gap-10">
      <Link
        href="/"
        className="flex items-center gap-2 mr-auto font-serif text-[1.1rem] font-semibold tracking-[0.06em] text-forest"
      >
        <span className="w-1.5 h-1.5 bg-gold rounded-full" />
        Masjid Al-Hikmah
      </Link>

      <div className="flex gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[var(--text-2)] hover:text-forest text-[0.78rem] tracking-[0.08em] transition-colors no-underline"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="#"
        className="bg-forest text-cream hover:bg-forest-mid text-[0.75rem] tracking-[0.1em] px-5 py-2 rounded-sm no-underline transition-colors"
      >
        Declare Mosque
      </Link>
    </nav>
  );
}
