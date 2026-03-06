"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createEvent, updateEvent } from "@/lib/actions/events";

interface EventData {
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
}

export function EventForm({
  event,
  onDone,
}: {
  event?: EventData;
  onDone?: () => void;
}) {
  const isEditing = !!event;
  const action = isEditing ? updateEvent : createEvent;
  const [state, formAction, isPending] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      onDone?.();
    }
  }, [state, onDone]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Event" : "Add New Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="grid gap-4">
          {isEditing && <input type="hidden" name="id" value={event.id} />}

          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={event?.title ?? ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              name="category"
              required
              placeholder="e.g. Ibadah · March 2026"
              defaultValue={event?.category ?? ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={event?.description ?? ""}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                placeholder="e.g. 7 March 2026"
                defaultValue={event?.date ?? ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                placeholder="e.g. After Maghrib"
                defaultValue={event?.time ?? ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Main Hall"
                defaultValue={event?.location ?? ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="displayNumber">Display Number</Label>
              <Input
                id="displayNumber"
                name="displayNumber"
                placeholder="e.g. 01"
                defaultValue={event?.displayNumber ?? ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dateNum">Date Number</Label>
              <Input
                id="dateNum"
                name="dateNum"
                placeholder="e.g. 07"
                defaultValue={event?.dateNum ?? ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="featured">Featured</Label>
              <select
                id="featured"
                name="featured"
                defaultValue={event?.featured ? "true" : "false"}
                className="h-8 w-full rounded-none border border-input bg-transparent px-2.5 py-1 text-xs outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          {state?.error && (
            <p className="text-destructive text-xs">{state.error}</p>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEditing
                  ? "Update Event"
                  : "Create Event"}
            </Button>
            {isEditing && onDone && (
              <Button type="button" variant="outline" onClick={onDone}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
