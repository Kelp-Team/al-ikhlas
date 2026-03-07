"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/lib/actions/booking";

interface TimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
}

export function BookingForm({
  placeId,
  timeSlots,
}: {
  placeId: string;
  timeSlots: TimeSlot[];
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createBooking, null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlotId, setTimeSlotId] = useState("");

  useEffect(() => {
    if (state?.success) {
      router.push("/booking");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="placeId" value={placeId} />
      <input type="hidden" name="timeSlotId" value={timeSlotId} />
      <input
        type="hidden"
        name="date"
        value={date ? format(date, "d MMMM yyyy") : ""}
      />

      <div className="grid gap-2">
        <Label>Date *</Label>
        <DatePicker value={date} onChange={setDate} />
      </div>

      <div className="grid gap-2">
        <Label>Time Slot *</Label>
        {timeSlots.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No time slots available for this place.
          </p>
        ) : (
          <div className="grid gap-2">
            {timeSlots.map((slot) => (
              <label
                key={slot.id}
                className={`flex items-center gap-3 border p-3 cursor-pointer text-sm ${
                  timeSlotId === slot.id
                    ? "border-ring bg-accent"
                    : "border-input"
                }`}
              >
                <input
                  type="radio"
                  name="timeSlotRadio"
                  value={slot.id}
                  checked={timeSlotId === slot.id}
                  onChange={() => setTimeSlotId(slot.id)}
                  className="accent-primary"
                />
                <span>
                  {slot.label} ({slot.startTime} – {slot.endTime})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="guestCount">Number of Guests</Label>
        <Input
          id="guestCount"
          name="guestCount"
          type="number"
          min={1}
          placeholder="e.g. 50"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Any special requests..."
        />
      </div>

      {state?.error && (
        <p className="text-destructive text-xs">{state.error}</p>
      )}

      <Button type="submit" disabled={isPending || timeSlots.length === 0}>
        {isPending ? "Submitting..." : "Submit Booking"}
      </Button>
    </form>
  );
}
