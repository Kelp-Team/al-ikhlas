import { Hero } from "@/app/ui/section/hero";
import { About, Events, Facilities, PrayerTimes } from "./ui/section";

export default function Page() {
  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      <section className="h-screen w-full">
        <Hero />;
      </section>
      <section>
        <PrayerTimes/>
      </section>
      <section>
        <Events/>
      </section>
      <section>
        <Facilities/>
      </section>
      <section>
        <About/>
      </section>
    </div>
  );
}
