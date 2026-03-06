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
import { deleteEvent } from "@/lib/actions/events";
import { EventForm } from "./event-form";

interface Event {
  id: string;
  title: string;
  category: string;
  description: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  featured: boolean;
  displayNumber: string | null;
  dateNum: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function EventList({ events }: { events: Event[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteEvent(id);
    });
  }

  if (events.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No events yet. Create one above.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      <h2 className="text-lg font-light">All Events ({events.length})</h2>
      {events.map((event) =>
        editingId === event.id ? (
          <EventForm
            key={event.id}
            event={event}
            onDone={() => setEditingId(null)}
          />
        ) : (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {event.displayNumber && (
                  <span className="text-muted-foreground font-mono">
                    {event.displayNumber}
                  </span>
                )}
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
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingId(event.id)}
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
        ),
      )}
    </div>
  );
}
