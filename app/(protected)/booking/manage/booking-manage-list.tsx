"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { acceptBooking, declineBooking } from "@/lib/actions/booking";

interface Booking {
  id: string;
  date: string;
  guestCount: number | null;
  notes: string | null;
  status: string;
  declineReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  userName: string;
  userEmail: string;
  placeId: string;
  placeName: string;
  timeSlotId: string;
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

export function BookingManageList({ bookings }: { bookings: Booking[] }) {
  const [isPending, startTransition] = useTransition();
  const [decliningId, setDecliningId] = useState<string | null>(null);
  const [declineReason, setDeclineReason] = useState("");

  function handleAccept(id: string) {
    startTransition(async () => {
      await acceptBooking(id);
    });
  }

  function handleDecline() {
    if (!decliningId) return;
    startTransition(async () => {
      await declineBooking(decliningId, declineReason || undefined);
      setDecliningId(null);
      setDeclineReason("");
    });
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-light mb-2">Manage Bookings</h1>
        <p className="text-muted-foreground text-sm">
          Review and manage booking requests.
        </p>
      </div>

      <Dialog
        open={!!decliningId}
        onOpenChange={(open) => {
          if (!open) {
            setDecliningId(null);
            setDeclineReason("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Booking</DialogTitle>
            <DialogDescription>
              Optionally provide a reason for declining this booking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="declineReason">Reason (optional)</Label>
            <Textarea
              id="declineReason"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="e.g. The hall is under maintenance..."
            />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              variant="destructive"
              onClick={handleDecline}
              disabled={isPending}
            >
              {isPending ? "Declining..." : "Decline"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {bookings.length === 0 ? (
        <p className="text-muted-foreground text-sm">No bookings yet.</p>
      ) : (
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
                  <div>
                    User: {b.userName} ({b.userEmail})
                  </div>
                  <div>Date: {b.date}</div>
                  <div>
                    Time: {b.timeSlotLabel} ({b.startTime} – {b.endTime})
                  </div>
                  {b.guestCount && <div>Guests: {b.guestCount}</div>}
                  {b.notes && <div>Notes: {b.notes}</div>}
                  {b.declineReason && (
                    <div className="text-destructive">
                      Decline reason: {b.declineReason}
                    </div>
                  )}
                </div>
                {b.status === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleAccept(b.id)}
                      disabled={isPending}
                    >
                      {isPending ? "Accepting..." : "Accept"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDecliningId(b.id)}
                      disabled={isPending}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
