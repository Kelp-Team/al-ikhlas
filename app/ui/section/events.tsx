import { Suspense } from "react";
import Link from "next/link";
import { getFeaturedEvent, getSideEvents } from "@/lib/queries/events";
import { getServerSession } from "@/lib/auth-server";
import { getParticipantStatus } from "@/lib/queries/events";
import { EventsClient } from "./events-client";

export async function Events() {
  const featuredEvent = await getFeaturedEvent();
  const sideEvents = await getSideEvents();

  if (!featuredEvent && sideEvents.length === 0) {
    return null;
  }

  const session = await getServerSession();
  const userId = session?.user?.id ?? null;

  const allEvents = [featuredEvent, ...sideEvents].filter(
    (e): e is NonNullable<typeof featuredEvent> => e !== null
  );

  const registeredEventIds: string[] = [];
  if (userId) {
    for (const evt of allEvents) {
      const isRegistered = await getParticipantStatus(evt.id, userId);
      if (isRegistered) registeredEventIds.push(evt.id);
    }
  }

  return (
    <section className="py-10 md:py-20 px-4 md:px-12" id="events">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
        <div>
          <div className="flex items-center gap-2.5 text-secondary text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
            <span className="w-5 h-px bg-secondary" />
            Community Programmes
          </div>
          <h2 className="text-foreground text-3xl font-light">
            Upcoming Events
          </h2>
        </div>
        <Link
          href="#"
          className="text-primary text-xs tracking-widest uppercase border-b border-primary pb-0.5 hover:opacity-50 transition-opacity no-underline"
        >
          See All Events
        </Link>
      </div>

      <Suspense>
        <EventsClient
          featuredEvent={featuredEvent}
          sideEvents={sideEvents}
          userId={userId}
          registeredEventIds={registeredEventIds}
        />
      </Suspense>
    </section>
  );
}
