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
import { deletePlace, deleteTimeSlot } from "@/lib/actions/booking";
import { PlaceForm } from "./place-form";
import { TimeSlotForm } from "./time-slot-form";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";

interface Place {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  capacity: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface TimeSlot {
  id: string;
  placeId: string;
  label: string;
  startTime: string;
  endTime: string;
  createdAt: Date;
}

export function PlaceList({
  places,
  timeSlots,
}: {
  places: Place[];
  timeSlots: TimeSlot[];
}) {
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addSlotPlaceId, setAddSlotPlaceId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDeletePlace(id: string) {
    startTransition(async () => {
      await deletePlace(id);
    });
  }

  function handleDeleteTimeSlot(id: string) {
    startTransition(async () => {
      await deleteTimeSlot(id);
    });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light mb-2">Manage Places</h1>
          <p className="text-muted-foreground text-sm">
            Create and manage bookable places and their time slots.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <PlusIcon />
          Add Place
        </Button>
      </div>

      <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Place</SheetTitle>
            <SheetDescription>
              Fill in the details to create a new bookable place.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto flex-1 p-4">
            <PlaceForm onDone={() => setIsAddOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet
        open={!!editingPlace}
        onOpenChange={(open) => {
          if (!open) setEditingPlace(null);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Place</SheetTitle>
            <SheetDescription>
              Update the place details below.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto flex-1 p-4">
            {editingPlace && (
              <PlaceForm
                place={editingPlace}
                onDone={() => setEditingPlace(null)}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet
        open={!!addSlotPlaceId}
        onOpenChange={(open) => {
          if (!open) setAddSlotPlaceId(null);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Time Slot</SheetTitle>
            <SheetDescription>
              Add a new time slot to this place.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto flex-1 p-4">
            {addSlotPlaceId && (
              <TimeSlotForm
                placeId={addSlotPlaceId}
                onDone={() => setAddSlotPlaceId(null)}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      {places.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No places yet. Click &quot;Add Place&quot; to create one.
        </p>
      ) : (
        <div className="grid gap-4">
          {places.map((p) => {
            const slots = timeSlots.filter((s) => s.placeId === p.id);
            return (
              <Card key={p.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {p.name}
                    {p.capacity && (
                      <Badge variant="secondary">
                        Capacity: {p.capacity}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {p.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {p.description}
                    </p>
                  )}

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">
                        Time Slots ({slots.length})
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAddSlotPlaceId(p.id)}
                      >
                        <PlusIcon />
                        Add Slot
                      </Button>
                    </div>
                    {slots.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No time slots yet.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {slots.map((slot) => (
                          <div
                            key={slot.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span>
                              {slot.label} ({slot.startTime} – {slot.endTime})
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTimeSlot(slot.id)}
                              disabled={isPending}
                            >
                              <TrashIcon />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPlace(p)}
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
                          <AlertDialogTitle>Delete Place</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &quot;{p.name}
                            &quot;? This will also delete all its time slots.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleDeletePlace(p.id)}
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
            );
          })}
        </div>
      )}
    </>
  );
}
