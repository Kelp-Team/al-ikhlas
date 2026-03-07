"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPlace, updatePlace } from "@/lib/actions/booking";

interface PlaceData {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  capacity: number | null;
}

export function PlaceForm({
  place,
  onDone,
}: {
  place?: PlaceData;
  onDone?: () => void;
}) {
  const isEditing = !!place;
  const action = isEditing ? updatePlace : createPlace;
  const [state, formAction, isPending] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      onDone?.();
    }
  }, [state, onDone]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-4">
      {isEditing && <input type="hidden" name="id" value={place.id} />}

      <div className="grid gap-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={place?.name ?? ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={place?.description ?? ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          placeholder="https://..."
          defaultValue={place?.image ?? ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          name="capacity"
          type="number"
          min={1}
          defaultValue={place?.capacity ?? ""}
        />
      </div>

      {state?.error && (
        <p className="text-destructive text-xs">{state.error}</p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving..."
            : isEditing
              ? "Update Place"
              : "Create Place"}
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
