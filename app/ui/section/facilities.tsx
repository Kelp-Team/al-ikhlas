const facilities = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    name: "Wudhu' Area",
    desc: "Separate facilities for brothers and sisters with ample ablution stations, fully tiled and clean.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
    name: "Women's Section",
    desc: "A dedicated prayer space for sisters on the upper floor with direct access and full privacy.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    name: "Parking",
    desc: "200+ parking bays available. Overflow at adjacent lots during peak Jumu'ah times.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    name: "Accessibility",
    desc: "Ramps, lifts and designated prayer areas for wheelchair users and the elderly throughout.",
  },
];

export function Facilities() {
  return (
    <section className="bg-brown py-10 md:py-16 px-4 md:px-12" id="facilities">
      <div className="flex items-center gap-2.5 text-gold-light text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
        <span className="w-5 h-px bg-gold" />
        What We Offer
      </div>
      <h2 className="text-cream text-2xl md:text-3xl font-light mb-8 md:mb-10">Facilities & Amenities</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-0.5 bg-[var(--charcoal)]">
        {facilities.map((fac, i) => (
          <div
            key={i}
            className="bg-cream/4 border border-cream/8 p-8 flex flex-col gap-3.5 transition-colors hover:bg-cream/8 cursor-default"
          >
            <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold">
              {fac.icon}
            </div>
            <div className="font-serif text-cream text-xl">{fac.name}</div>
            <div className="text-cream/45 text-sm leading-relaxed">{fac.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
