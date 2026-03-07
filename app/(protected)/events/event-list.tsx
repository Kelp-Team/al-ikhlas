"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { deleteEvent } from "@/lib/actions/events";
import { EventForm } from "./event-form";
import { PlusIcon } from "@phosphor-icons/react";

interface Event {
  id: string;
  title: string;
  category: string;
  description: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Participant {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  createdAt: Date | null;
}

export function EventList({
  events,
  participants,
}: {
  events: Event[];
  participants: Participant[];
}) {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteEvent(id);
    });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light mb-2">Manage Events</h1>
          <p className="text-muted-foreground text-sm">
            Create, edit, and delete events displayed on the homepage.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <PlusIcon />
          Add Event
        </Button>
      </div>

      <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Event</SheetTitle>
            <SheetDescription>
              Fill in the details to create a new event.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto flex-1 p-4">
            <EventForm onDone={() => setIsAddOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet
        open={!!editingEvent}
        onOpenChange={(open) => {
          if (!open) setEditingEvent(null);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Event</SheetTitle>
            <SheetDescription>
              Update the event details below.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto flex-1 p-4">
            {editingEvent && (
              <EventForm
                event={editingEvent}
                onDone={() => setEditingEvent(null)}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      {events.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No events yet. Click &quot;Add Event&quot; to create one.
        </p>
      ) : (
        <div className="grid gap-4">
          <h2 className="text-lg font-light">All Events ({events.length})</h2>
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {event.title}
                  {event.featured && <Badge variant="secondary">Featured</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div>Category: {event.category}</div>
                  {event.description && <div>{event.description}</div>}
                  <div className="flex flex-wrap gap-4">
                    {event.date && <span>Date: {event.date}</span>}
                    {event.time && <span>Time: {event.time}</span>}
                    {event.location && <span>Location: {event.location}</span>}
                  </div>
                </div>
                {(() => {
                  const eventParticipants = participants.filter(
                    (p) => p.eventId === event.id
                  );
                  return (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium mb-2">
                        Participants ({eventParticipants.length})
                      </p>
                      {eventParticipants.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No registrations yet.
                        </p>
                      ) : (
                        <div className="space-y-1">
                          {eventParticipants.map((p) => (
                            <div
                              key={p.id}
                              className="text-sm text-muted-foreground flex items-center gap-2"
                            >
                              <span>{p.name}</span>
                              <span className="text-xs">({p.email})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingEvent(event)}
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      }
                    />
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Event</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &quot;{event.title}
                          &quot;? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => handleDelete(event.id)}
                          disabled={isPending}
                        >
                          {isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
