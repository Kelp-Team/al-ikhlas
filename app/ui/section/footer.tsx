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
    <footer className="bg-charcoal px-12 py-16">
      <div className="grid grid-cols-4 gap-12 pb-12 border-b border-cream/8 mb-8">
        <div>
          <div className="font-serif text-cream text-xl mb-3">Masjid Al-Hikmah</div>
          <p className="text-cream/35 text-sm leading-relaxed max-w-[260px]">
            Connecting the Subang Jaya Muslim community through prayer, education,
            and service since 2003.
          </p>
        </div>

        {footerCols.map((col, i) => (
          <div key={i} className="footer-col">
            <h4 className="text-gold text-[0.62rem] tracking-[0.2em] uppercase mb-4.5">
              {col.title}
            </h4>
            {col.links.map((link, j) => (
              <Link
                key={j}
                href="#"
                className="block text-cream/45 text-sm mb-2.5 hover:text-cream transition-colors no-underline"
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="text-cream/25 text-sm">© 2026 Masjid Al-Hikmah · Built for RC26</div>
        <div className="font-serif text-cream/20 text-lg tracking-wide">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
      </div>
    </footer>
  );
}
