import { getServerSession } from "@/lib/auth-server";
import { getUserRegisteredEvents } from "@/lib/queries/events";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const events = await getUserRegisteredEvents(session.user.id);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-light mb-6">My Events</h1>

      {events.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-sm">You haven&apos;t registered for any events yet.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                  <Badge variant="secondary">{event.category}</Badge>
                  {event.date && <span>{event.date}</span>}
                  {event.time && <span>· {event.time}</span>}
                  {event.location && <span>· {event.location}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
