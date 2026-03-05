import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-cream px-4">
      <Link href="/" className="mb-8">
        <Image
          src="/logo.png"
          alt="Masjid Al-Ikhlas Seksyen 13"
          height={64}
          width={64}
        />
      </Link>
      {children}
    </div>
  );
}
