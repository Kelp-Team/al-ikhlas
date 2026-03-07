"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimePicker } from "@/components/ui/time-picker";
import { createTimeSlot } from "@/lib/actions/booking";

export function TimeSlotForm({
  placeId,
  onDone,
}: {
  placeId: string;
  onDone?: () => void;
}) {
  const [state, formAction, isPending] = useActionState(createTimeSlot, null);
  const formRef = useRef<HTMLFormElement>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [prevState, setPrevState] = useState(state);
  if (state !== prevState) {
    setPrevState(state);
    if (state?.success) {
      setStartTime("");
      setEndTime("");
    }
  }

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      onDone?.();
    }
  }, [state, onDone]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-4">
      <input type="hidden" name="placeId" value={placeId} />

      <div className="grid gap-2">
        <Label htmlFor="label">Label *</Label>
        <Input
          id="label"
          name="label"
          required
          placeholder="e.g. Morning Session"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Start Time *</Label>
          <TimePicker
            name="startTime"
            value={startTime}
            onChange={setStartTime}
          />
        </div>
        <div className="grid gap-2">
          <Label>End Time *</Label>
          <TimePicker
            name="endTime"
            value={endTime}
            onChange={setEndTime}
          />
        </div>
      </div>

      {state?.error && (
        <p className="text-destructive text-xs">{state.error}</p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add Time Slot"}
      </Button>
    </form>
  );
}
