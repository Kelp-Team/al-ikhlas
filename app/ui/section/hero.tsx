"use client";

import { PrayerTimes } from "./prayer-times";
import Image from "next/image";

export function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="relative h-72 md:h-auto overflow-hidden">
        <Image
          src="/hero.jpg"
          fill
          className="object-cover"
          alt="Masjid Seksyen 13 AL-Ikhlas"
        />
        <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-transparent to-primary" />
      </div>

      <div className="bg-primary flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center gap-3 p-6 md:p-12">
          <h1 className="text-primary-foreground text-4xl md:text-5xl font-light leading-tight">
            A place of <span className="font-bold text-accent">prayer</span>{" "}
            &amp; community.
          </h1>

          <div className="flex flex-col gap-6">
            <p className="text-primary-foreground/60 leading-relaxed">
              Stay connected with your masjid — prayer times, programmes, and
              everything your jemaah needs in one place.
            </p>
          </div>
        </div>
        <PrayerTimes />
      </div>
    </section>
  );
}
