import Link from "next/link";

const navLinks = [
  { href: "#prayers", label: "Prayer Times" },
  { href: "#events", label: "Events" },
  { href: "#facilities", label: "Facilities" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-200 bg-cream border-b border-parchment px-12 h-[60px] flex items-center gap-10">
      <Link
        href="/"
        className="flex items-center gap-2 mr-auto text-forest font-semibold tracking-wide text-sm"
      >
        <span className="w-1.5 h-1.5 bg-gold rounded-full" />
        Masjid Al-Hikmah
      </Link>

      <div className="flex gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[var(--text-2)] hover:text-forest text-xs tracking-widest transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="#"
        className="bg-forest text-cream hover:bg-forest-mid text-xs tracking-widest px-5 py-2 rounded-sm no-underline"
      >
        Declare Mosque
      </Link>
    </nav>
  );
}
