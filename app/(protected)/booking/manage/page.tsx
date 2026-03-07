import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth-server";
import { getAllBookings } from "@/lib/queries/booking";
import { BookingManageList } from "./booking-manage-list";

export default async function ManageBookingsPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const bookings = await getAllBookings();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <BookingManageList bookings={bookings} />
    </div>
  );
}
