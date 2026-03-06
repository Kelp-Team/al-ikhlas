import Link from "next/link";

const footerCols = [
  {
    title: "Mosque",
    links: ["Prayer Times", "About", "Facilities", "Parking & Access"],
  },
  {
    title: "Community",
    links: ["Events", "Classes", "Programmes", "Volunteer"],
  },
  {
    title: "RC26 Hackathon",
    links: ["Declare Mosque", "Join Discord", "Submit Project"],
  },
];

export function Footer() {
  return (
    <footer className="bg-sidebar py-10 md:py-16 px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-8 md:pb-12 border-b border-primary-foreground/8 mb-8">
        <div>
          <div className="font-serif text-primary-foreground text-xl mb-3">
            Masjid Al-Ikhlas Seksyen 13
          </div>
          <p className="text-primary-foreground/35 text-sm leading-relaxed max-w-65">
            Connecting the Seksyen 13, Shah Alam Muslim community through
            prayer, education, and service since 2013.
          </p>
        </div>

        {footerCols.map((col, i) => (
          <div key={i} className="footer-col">
            <h4 className="text-secondary text-[0.62rem] tracking-[0.2em] uppercase mb-4.5">
              {col.title}
            </h4>
            {col.links.map((link, j) => (
              <Link
                key={j}
                href="#"
                className="block text-primary-foreground/45 text-sm mb-2.5 hover:text-primary-foreground transition-colors no-underline"
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="text-primary-foreground/25 text-sm">
          © 2026 Masjid Al-Ikhlas Seksyen 13 · Built for RC26
        </div>
        <div className="font-serif text-primary-foreground/20 text-lg tracking-wide">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
      </div>
    </footer>
  );
}
