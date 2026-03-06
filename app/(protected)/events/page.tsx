import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth-server";
import { getAllEvents } from "@/lib/queries/events";
import { EventList } from "./event-list";

export default async function AdminEventsPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const events = await getAllEvents();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <EventList events={events} />
    </div>
  );
}
