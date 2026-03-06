import Link from "next/link";
import { getFeaturedEvent, getSideEvents } from "@/lib/queries/events";

export async function Events() {
  const featuredEvent = await getFeaturedEvent();
  const sideEvents = await getSideEvents();

  if (!featuredEvent && sideEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-10 md:py-20 px-4 md:px-12" id="events">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
        <div>
          <div className="flex items-center gap-2.5 text-secondary text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
            <span className="w-5 h-px bg-secondary" />
            Community Programmes
          </div>
          <h2 className="text-foreground text-3xl font-light">Upcoming Events</h2>
        </div>
        <Link
          href="#"
          className="text-primary text-xs tracking-widest uppercase border-b border-primary pb-0.5 hover:opacity-50 transition-opacity no-underline"
        >
          See All Events
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-0.5 bg-border">
        {featuredEvent && (
          <div className="bg-primary p-6 md:p-12 flex flex-col justify-between min-h-[400px] md:min-h-[480px] relative overflow-hidden">
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
            <div className="font-serif text-primary-foreground/15 text-4xl md:text-[5rem] absolute top-5 right-6 md:right-8 leading-none">
              {featuredEvent.dateNum}
            </div>

            <div className="flex items-center gap-2 text-secondary text-[0.62rem] tracking-[0.22em] uppercase">
              <span className="w-4 h-px bg-secondary" />
              {featuredEvent.category}
            </div>

            <div className="mt-6 md:mt-8 mb-4">
              <h3 className="text-primary-foreground text-xl md:text-2.4xl font-light leading-tight">
                {featuredEvent.title}
              </h3>
            </div>

            <p className="text-primary-foreground/55 text-sm leading-relaxed max-w-[340px]">
              {featuredEvent.description}
            </p>

            <div className="flex justify-between items-end flex-wrap gap-4 pt-4">
              <div className="flex flex-col gap-1.5">
                {featuredEvent.time && (
                  <div className="text-primary-foreground/50 text-sm flex items-center gap-2">
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
                    {featuredEvent.time}
                  </div>
                )}
                {featuredEvent.location && (
                  <div className="text-primary-foreground/50 text-sm flex items-center gap-2">
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
                    {featuredEvent.location}
                  </div>
                )}
              </div>
              <Link
                href="#"
                className="bg-secondary text-secondary-foreground hover:bg-accent/80 text-xs tracking-widest uppercase px-6 py-2.5 rounded-sm no-underline transition-colors shrink-0"
              >
                Register →
              </Link>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-0.5">
          {sideEvents.map((event) => (
            <div
              key={event.id}
              className="bg-muted p-6 md:p-9 flex flex-col gap-3 md:gap-4 transition-colors hover:bg-muted cursor-pointer"
            >
              <div className="font-serif text-muted-foreground text-base">{event.displayNumber}</div>
              <div className="text-secondary text-[0.62rem] tracking-[0.18em] uppercase mt-auto">
                {event.category}
              </div>
              <div className="font-serif text-foreground text-xl leading-tight">{event.title}</div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="text-muted-foreground text-sm">
                  {event.time} · {event.location}
                </div>
                <div className="text-primary text-lg transition-transform group-hover:translate-x-1">
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
