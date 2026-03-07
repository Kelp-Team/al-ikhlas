"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { registerForEvent } from "@/lib/actions/events";

interface Event {
  id: string;
  title: string;
  category: string;
  description: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  featured: boolean;
}

interface EventsClientProps {
  featuredEvent: Event | null;
  sideEvents: Event[];
  userId: string | null;
  registeredEventIds: string[];
}

export function EventsClient({
  featuredEvent,
  sideEvents,
  userId,
  registeredEventIds,
}: EventsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(
    new Set(registeredEventIds)
  );

  const allEvents = [featuredEvent, ...sideEvents].filter(
    (e): e is Event => e !== null
  );

  const openEventById = useCallback(
    (eventId: string) => {
      const found = allEvents.find((e) => e.id === eventId);
      if (found) setSelectedEvent(found);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [featuredEvent?.id, sideEvents.length]
  );

  useEffect(() => {
    const eventParam = searchParams.get("event");
    if (eventParam) {
      openEventById(eventParam);
      const url = new URL(window.location.href);
      url.searchParams.delete("event");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams, openEventById]);

  async function handleRegister() {
    if (!selectedEvent) return;

    if (!userId) {
      router.push(
        `/login?callbackUrl=${encodeURIComponent(`/?event=${selectedEvent.id}`)}`
      );
      return;
    }

    setIsPending(true);
    try {
      const result = await registerForEvent(selectedEvent.id);
      if (result.success || result.alreadyRegistered) {
        setRegisteredIds((prev) => new Set(prev).add(selectedEvent.id));
      }
    } finally {
      setSelectedEvent(null);
      setIsPending(false);
    }
  }

  const isRegistered = selectedEvent
    ? registeredIds.has(selectedEvent.id)
    : false;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-0.5 bg-border">
        {featuredEvent && (
          <div
            className="bg-primary p-6 md:p-12 flex flex-col justify-between min-h-100 md:min-h-120 relative overflow-hidden cursor-pointer"
            onClick={() => setSelectedEvent(featuredEvent)}
          >
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
              <circle
                cx="150"
                cy="20"
                r="8"
                stroke="white"
                strokeWidth="0.8"
                fill="none"
              />
            </svg>
            <div className="flex items-center gap-2 text-secondary text-[0.62rem] tracking-[0.22em] uppercase">
              <span className="w-4 h-px bg-secondary" />
              {featuredEvent.category}
            </div>

            <div className="mt-6 md:mt-8 mb-4">
              <h3 className="text-primary-foreground text-xl md:text-2.4xl font-light leading-tight">
                {featuredEvent.title}
              </h3>
            </div>

            <p className="text-primary-foreground/55 text-sm leading-relaxed max-w-85">
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
              <Button
                variant="secondary"
                className="tracking-widest uppercase text-xs px-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(featuredEvent);
                }}
              >
                {registeredIds.has(featuredEvent.id)
                  ? "Registered ✓"
                  : "Register →"}
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-0.5">
          {sideEvents.map((event) => (
            <div
              key={event.id}
              className="bg-muted p-6 md:p-9 flex flex-col gap-3 md:gap-4 transition-colors hover:bg-muted cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="text-secondary text-[0.62rem] tracking-[0.18em] uppercase mt-auto">
                {event.category} - {event.date}
              </div>
              <div className="font-serif text-foreground text-xl leading-tight">
                {event.title}
              </div>
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

      <Dialog
        open={!!selectedEvent}
        onOpenChange={(open) => {
          if (!open) setSelectedEvent(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>{selectedEvent?.category}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedEvent?.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedEvent.description}
              </p>
            )}
            <div className="space-y-2 text-sm">
              {selectedEvent?.date && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-medium text-foreground">Date:</span>
                  {selectedEvent.date}
                </div>
              )}
              {selectedEvent?.time && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-medium text-foreground">Time:</span>
                  {selectedEvent.time}
                </div>
              )}
              {selectedEvent?.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Location:
                  </span>
                  {selectedEvent.location}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            {selectedEvent && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setSelectedEvent(null)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isPending || isRegistered}
                  onClick={handleRegister}
                >
                  {isPending
                    ? "Registering..."
                    : isRegistered
                      ? "Registered"
                      : "Register"}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
