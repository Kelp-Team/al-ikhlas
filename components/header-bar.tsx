"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { SignOut, CaretUpDown, GridFourIcon } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const navLinks = [
  { href: "#prayers", label: "Prayer Times" },
  { href: "#events", label: "Events" },
  { href: "#facilities", label: "Facilities" },
  { href: "#about", label: "About" },
];

export function HeaderBar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }
  async function handleDashboard() {
    router.push("/dashboard");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 px-12 h-14 flex items-center gap-10">
      <Link href="/" className="mr-auto">
        <Image
          src="/logo.png"
          alt="Masjid Al-Ikhlas Seksyen 13"
          height={42}
          width={42}
        />
      </Link>

      <div className="flex gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted-foreground hover:text-primary text-[0.78rem] tracking-[0.08em] transition-colors no-underline"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {isPending ? null : session ? (
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">
              {session.user.name}
              <CaretUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-56 p-1">
            <Button
              onClick={handleDashboard}
              size="sm"
              variant="ghost"
              className="justify-start w-full"
            >
              <GridFourIcon />
              Dashboard
            </Button>
            <Button
              onClick={handleSignOut}
              size="sm"
              variant="ghost"
              className="justify-start w-full"
            >
              <SignOut />
              Sign out
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          href="/login"
          className="bg-primary text-primary-foreground hover:bg-primary/80 text-[0.75rem] tracking-widest px-5 py-2 rounded-sm no-underline transition-colors"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
