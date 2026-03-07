"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { TimePicker } from "@/components/ui/time-picker";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
  const [date, setDate] = useState<Date | undefined>(
    event?.date ? parse(event.date, "d MMMM yyyy", new Date()) : undefined
  );
  const [time, setTime] = useState(event?.time ?? "");

  // Adjust state during render (React-recommended pattern)
  const [prevState, setPrevState] = useState(state);
  if (state !== prevState) {
    setPrevState(state);
    if (state?.success) {
      setDate(undefined);
      setTime("");
    }
  }

  // Side effects (DOM reset + callback) stay in useEffect
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      onDone?.();
    }
  }, [state, onDone]);

  return (
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
          <Label>Date</Label>
          <DatePicker value={date} onChange={setDate} />
          <input
            type="hidden"
            name="date"
            value={date ? format(date, "d MMMM yyyy") : ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="time">Time</Label>
          <TimePicker
            id="time"
            name="time"
            value={time}
            onChange={setTime}
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
          <Label htmlFor="featured">Featured</Label>
          <Select name="featured" defaultValue={event?.featured ? "true" : "false"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">No</SelectItem>
              <SelectItem value="true">Yes</SelectItem>
            </SelectContent>
          </Select>
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
  );
}
