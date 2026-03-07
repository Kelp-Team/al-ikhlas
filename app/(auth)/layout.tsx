import { Card, CardContent } from "@/components/ui/card";
import { GeometricPattern } from "@/app/ui/section/geometric-pattern";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-muted">
      <div className="relative flex flex-col gap-4 p-6 md:p-10">
        <div className="absolute inset-0 mask-[linear-gradient(to_right,transparent,black)] pointer-events-none z-0">
          <GeometricPattern className="absolute inset-0 opacity-5" />
        </div>
        <div className="relative z-10 flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image
              src="/logo.png"
              alt="Masjid Al-Ikhlas Seksyen 13"
              height={32}
              width={32}
            />
          </Link>
        </div>
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image
          src="/hero.jpg"
          alt="Masjid Al-Ikhlas"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
