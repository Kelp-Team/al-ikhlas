import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth-server";
import { getAllPlaces, getAllTimeSlots } from "@/lib/queries/booking";
import { PlaceList } from "./place-list";

export default async function AdminPlacesPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const [places, timeSlots] = await Promise.all([
    getAllPlaces(),
    getAllTimeSlots(),
  ]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <PlaceList places={places} timeSlots={timeSlots} />
    </div>
  );
}
