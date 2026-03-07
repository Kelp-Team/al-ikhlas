import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth-server";
import { getAllPlaces, getUserBookings } from "@/lib/queries/booking";
import { BookingPage } from "./booking-page";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default async function BookingIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ place?: string }>;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const [places, bookings, params] = await Promise.all([
    getAllPlaces(),
    getUserBookings(session.user.id),
    searchParams,
  ]);

  if (params.place) {
    const matched = places.find(
      (p) => slugify(p.name) === params.place,
    );
    if (matched) {
      redirect(`/booking/${matched.id}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <BookingPage places={places} bookings={bookings} />
    </div>
  );
}
