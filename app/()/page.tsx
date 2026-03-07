import { HeaderBar } from "@/components/header-bar";
import { Hero } from "@/app/ui/section/hero";
import {
  About,
  Events,
  Facilities,
  Footer,
  ZakatCalculator,
} from "../ui/section";

export default function Page() {
  return (
    <div className="h-screen w-full snap-y overflow-y-scroll">
      <HeaderBar />
      <section>
        <Hero />
      </section>
      <section>
        <Events />
      </section>
      <section>
        <Facilities />
        <About />
        <ZakatCalculator />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}
