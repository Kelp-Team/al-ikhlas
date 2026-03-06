import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#prayers", label: "Prayer Times" },
  { href: "#events", label: "Events" },
  { href: "#facilities", label: "Facilities" },
  { href: "#about", label: "About" },
];

export function HeaderBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 px-12 h-14 flex items-center gap-10">
      <Link href="/" className="mr-auto">
        <Image
          src="/logo.png"
          alt="Masjid Al-Ikhlas Seksyen 13"
          height={42}
          width={42}
        />
      </Link>

      <div className="flex gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted-foreground hover:text-primary text-[0.78rem] tracking-[0.08em] transition-colors no-underline"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="#"
        className="bg-primary text-primary-foreground hover:bg-primary/80 text-[0.75rem] tracking-widest px-5 py-2 rounded-sm no-underline transition-colors"
      >
        Declare Mosque
      </Link>
    </nav>
  );
}
