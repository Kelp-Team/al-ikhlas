const infoRows = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    label: "Address",
    value: "Jalan SS 15/4, SS 15, 47500 Subang Jaya, Selangor",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
      </svg>
    ),
    label: "Contact",
    value: "+60 3-5633 1234 info@masjidalhikmah.my",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Office Hours",
    value: "Daily · 8:00 AM – 10:00 PM Open for all 5 daily prayers",
  },
];

export function About() {
  return (
    <section className="grid md:grid-cols-2" id="about">
      <div className="bg-cream p-6 md:p-14">
        <div className="flex items-center gap-2.5 text-gold text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
          <span className="w-5 h-px bg-gold" />
          About the Mosque
        </div>
        <h2 className="text-brown text-2xl md:text-3xl font-light leading-tight">
          Rooted in Faith,
          <br />
          Built for Community
        </h2>
        <blockquote className="font-serif text-brown text-xl md:text-2xl font-light italic leading-relaxed border-l-2 border-gold pl-4 md:pl-7 my-7 md:my-9">
          &ldquo;The mosque is the heart of the Muslim community &mdash; a place of worship,
          learning, and belonging.&rdquo;
        </blockquote>
        <p className="text-[var(--text-2)] text-sm leading-relaxed max-w-[440px]">
          Masjid Al-Hikmah has served the Subang Jaya community since 2003. Our
          mission is to provide a welcoming space for worship, education, and
          community programmes that bring Muslims together and serve our neighbours
          of all backgrounds.
          <br />
          <br />
          We run weekly classes, monthly events, and daily programmes to keep our
          jemaah spiritually nourished and connected.
        </p>
      </div>

      <div className="bg-parchment p-6 md:p-14 flex flex-col justify-center gap-6 md:gap-8">
        {infoRows.map((row, i) => (
          <div key={i}>
            <div className="flex gap-5 pb-7 border-b border-sand last:border-0 last:pb-0">
              <div className="w-11 h-11 bg-cream rounded-sm flex items-center justify-center text-forest shrink-0">
                {row.icon}
              </div>
              <div>
                <div className="text-[var(--text-3)] text-[0.65rem] tracking-[0.18em] uppercase mb-1">
                  {row.label}
                </div>
                <div className="text-brown text-sm leading-relaxed whitespace-pre-line">
                  {row.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
