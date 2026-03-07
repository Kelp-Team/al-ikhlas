import { HeaderBar } from "@/components/header-bar";
import { ZakatCalculator } from "@/app/ui/section";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center pt-14 px-4">
      <HeaderBar />
      <ZakatCalculator />
    </div>
  );
}
