"use client";

import { useTransition } from "react";
import Link from "next/link";
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
import { cancelBooking } from "@/lib/actions/booking";

interface Place {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  capacity: number | null;
}

interface Booking {
  id: string;
  date: string;
  guestCount: number | null;
  notes: string | null;
  status: string;
  declineReason: string | null;
  createdAt: Date;
  placeName: string;
  timeSlotLabel: string;
  startTime: string;
  endTime: string;
}

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  accepted: "default",
  declined: "destructive",
  cancelled: "secondary",
};

export function BookingPage({
  places,
  bookings,
}: {
  places: Place[];
  bookings: Booking[];
}) {
  const [isPending, startTransition] = useTransition();

  function handleCancel(id: string) {
    startTransition(async () => {
      await cancelBooking(id);
    });
  }

  return (
    <>
      <h1 className="text-2xl font-light mb-8">Booking</h1>

      {bookings.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-light mb-4">
            My Bookings ({bookings.length})
          </h2>
          <div className="grid gap-4">
            {bookings.map((b) => (
              <Card key={b.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {b.placeName}
                    <Badge variant={statusVariant[b.status] ?? "outline"}>
                      {b.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-1 text-sm text-muted-foreground">
                    <div>Date: {b.date}</div>
                    <div>
                      Time: {b.timeSlotLabel} ({b.startTime} – {b.endTime})
                    </div>
                    {b.guestCount && <div>Guests: {b.guestCount}</div>}
                    {b.notes && <div>Notes: {b.notes}</div>}
                    {b.declineReason && (
                      <div className="text-destructive">
                        Reason: {b.declineReason}
                      </div>
                    )}
                  </div>
                  {b.status === "pending" && (
                    <div className="mt-4">
                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={isPending}
                            >
                              Cancel Booking
                            </Button>
                          }
                        />
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Cancel Booking
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel this booking?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={() => handleCancel(b.id)}
                              disabled={isPending}
                            >
                              {isPending ? "Cancelling..." : "Cancel Booking"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-light mb-4">Available Places</h2>
        {places.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No places available for booking yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {places.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {p.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {p.description}
                    </p>
                  )}
                  {p.capacity && (
                    <p className="text-sm text-muted-foreground mb-3">
                      Capacity: {p.capacity}
                    </p>
                  )}
                  <Button size="sm" render={<Link href={`/booking/${p.id}`} />}>
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
