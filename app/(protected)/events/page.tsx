import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth-server";
import { getAllEvents } from "@/lib/queries/events";
import { EventList } from "./event-list";
import { EventForm } from "./event-form";
import { Separator } from "@/components/ui/separator";

export default async function AdminEventsPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const events = await getAllEvents();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-light mb-2">Manage Events</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Create, edit, and delete events displayed on the homepage.
      </p>

      <EventForm />

      <Separator className="my-8" />

      <EventList events={events} />
    </div>
  );
}
