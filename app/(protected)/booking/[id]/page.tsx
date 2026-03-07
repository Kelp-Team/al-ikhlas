import { redirect, notFound } from "next/navigation";
import { getServerSession } from "@/lib/auth-server";
import { getPlaceById, getTimeSlotsByPlaceId } from "@/lib/queries/booking";
import { BookingForm } from "./booking-form";

export default async function BookingFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const place = await getPlaceById(id);
  if (!place) {
    notFound();
  }

  const timeSlots = await getTimeSlotsByPlaceId(id);

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-light mb-2">Book {place.name}</h1>
      {place.description && (
        <p className="text-muted-foreground text-sm mb-6">
          {place.description}
        </p>
      )}
      <BookingForm placeId={place.id} timeSlots={timeSlots} />
    </div>
  );
}
