import { HeaderBar } from "@/components/header-bar";
import { Hero } from "@/app/ui/section/hero";
import { About, Events, Facilities, Footer } from "../ui/section";

export default function Page() {
  return (
    <div className="h-screen w-full snap-y overflow-y-scroll">
      <HeaderBar />
      <section>
        <Hero />;
      </section>
      <section>
        <Events />
      </section>
      <section>
        <Facilities />
        <About />
        <Gallery />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}
