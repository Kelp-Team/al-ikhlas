import Link from "next/link";

interface Event {
  id: number;
  num: string;
  category: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  featured?: boolean;
  dateNum?: string;
}

const featuredEvent: Event = {
  id: 1,
  num: "01",
  category: "Ibadah · March 2026",
  title: "Tarawih Prayer & Quran Recitation Night",
  description:
    "Join us for Tarawih prayers followed by a special khatam session led by our resident hafiz. Open to all members of the community, including families.",
  dateNum: "07",
  featured: true,
};

const sideEvents: Event[] = [
  {
    id: 2,
    num: "02",
    category: "Talk · 9 March",
    title: "Fiqh of Ramadan — Ustaz Ahmad Naqiyuddin",
    time: "After Maghrib",
    location: "Main Hall",
  },
  {
    id: 3,
    num: "03",
    category: "Classes · 12 March",
    title: "Quran Tajwid — Beginner & Intermediate Levels",
    time: "9:00 AM – 11:00 AM",
    location: "Limited Seats",
  },
];

export function Events() {
  return (
    <section className="py-10 md:py-20 px-4 md:px-12" id="events">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
        <div>
          <div className="flex items-center gap-2.5 text-gold text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
            <span className="w-5 h-px bg-gold" />
            Community Programmes
          </div>
          <h2 className="text-brown text-3xl font-light">Upcoming Events</h2>
        </div>
        <Link
          href="#"
          className="text-forest text-xs tracking-widest uppercase border-b border-forest pb-0.5 hover:opacity-50 transition-opacity no-underline"
        >
          See All Events
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-0.5 bg-parchment">
        <div className="bg-forest p-6 md:p-12 flex flex-col justify-between min-h-[400px] md:min-h-[480px] relative overflow-hidden">
          <svg
            className="absolute top-0 right-0 w-[55%] h-full opacity-[0.05] pointer-events-none"
            viewBox="0 0 300 500"
            fill="none"
          >
            <path
              d="M150 20 Q250 90 250 240 Q250 390 150 470 Q50 390 50 240 Q50 90 150 20Z"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="150" cy="20" r="8" stroke="white" strokeWidth="0.8" fill="none" />
          </svg>
          <div className="font-serif text-cream/15 text-4xl md:text-[5rem] absolute top-5 right-6 md:right-8 leading-none">
            {featuredEvent.dateNum}
          </div>

          <div className="flex items-center gap-2 text-gold text-[0.62rem] tracking-[0.22em] uppercase">
            <span className="w-4 h-px bg-gold" />
            {featuredEvent.category}
          </div>

          <div className="mt-6 md:mt-8 mb-4">
            <h3 className="text-cream text-xl md:text-2.4xl font-light leading-tight">
              {featuredEvent.title}
            </h3>
          </div>

          <p className="text-cream/55 text-sm leading-relaxed max-w-[340px]">
            {featuredEvent.description}
          </p>

          <div className="flex justify-between items-end flex-wrap gap-4 pt-4">
            <div className="flex flex-col gap-1.5">
              <div className="text-cream/50 text-sm flex items-center gap-2">
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                After Isyak · 8:45 PM
              </div>
              <div className="text-cream/50 text-sm flex items-center gap-2">
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
                All Welcome · Main Prayer Hall
              </div>
            </div>
            <Link
              href="#"
              className="bg-gold text-[var(--charcoal)] hover:bg-gold-light text-xs tracking-widest uppercase px-6 py-2.5 rounded-sm no-underline transition-colors shrink-0"
            >
              Register →
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          {sideEvents.map((event) => (
            <div
              key={event.id}
              className="bg-warm p-6 md:p-9 flex flex-col gap-3 md:gap-4 transition-colors hover:bg-parchment cursor-pointer"
            >
              <div className="font-serif text-sand text-base">{event.num}</div>
              <div className="text-gold text-[0.62rem] tracking-[0.18em] uppercase mt-auto">
                {event.category}
              </div>
              <div className="font-serif text-brown text-xl leading-tight">{event.title}</div>
              <div className="flex justify-between items-center pt-4 border-t border-parchment">
                <div className="text-[var(--text-3)] text-sm">
                  {event.time} · {event.location}
                </div>
                <div className="text-forest text-lg transition-transform group-hover:translate-x-1">
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
