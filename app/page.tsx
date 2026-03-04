import { Hero } from "@/app/ui/section/hero";
import { About, Events, Facilities, Footer } from "./ui/section";

export default function Page() {
  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      <section className="h-screen w-full snap-start snap-always">
        <Hero />;
      </section>
      <section className="h-screen w-full snap-start snap-always">
        <Events />
      </section>
      <section className="h-screen w-full snap-start snap-always">
        <Facilities />
        <About />
      </section>
      <section className="h-screen w-full snap-start snap-always">
        <Footer />
      </section>
    </div>
  );
}
