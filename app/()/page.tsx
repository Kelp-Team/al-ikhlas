import { Hero } from "@/app/ui/section/hero";
import { About, Events, Facilities, Footer } from "../ui/section";

export default function Page() {
  return (
    <div className="h-screen w-full snap-y overflow-y-scroll">
      <section>
        <Hero />
      </section>
      <section>
        <Events />
      </section>
      <section>
        <Facilities />
        <About />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}
