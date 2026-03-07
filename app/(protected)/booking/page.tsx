import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth-server";
import { getAllPlaces, getUserBookings } from "@/lib/queries/booking";
import { BookingPage } from "./booking-page";

export default async function BookingIndexPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const [places, bookings] = await Promise.all([
    getAllPlaces(),
    getUserBookings(session.user.id),
  ]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <BookingPage places={places} bookings={bookings} />
    </div>
  );
}
