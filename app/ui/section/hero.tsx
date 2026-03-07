"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PrayerTimes } from "./prayer-times";

interface Prayer {
  name: string;
  arabic: string;
  time: string;
  h: number;
  m: number;
}

const prayers: Prayer[] = [
  { name: "Fajr", arabic: "الفجر", time: "5:52", h: 5, m: 52 },
  { name: "Dhuhr", arabic: "الظهر", time: "1:17", h: 13, m: 17 },
  { name: "Asr", arabic: "العصر", time: "4:35", h: 16, m: 35 },
  { name: "Maghrib", arabic: "المغرب", time: "7:24", h: 19, m: 24 },
  { name: "Isyak", arabic: "العشاء", time: "8:38", h: 20, m: 38 },
];

export function Hero() {
  return (
    <section className="grid grid-cols-2 min-h-screen">
      <div className="bg-primary px-14 py-20 flex flex-col justify-between relative overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 700"
          fill="none"
          className="absolute opacity-20"
        >
          <ellipse
            cx="300"
            cy="180"
            rx="200"
            ry="180"
            stroke="#FFF"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M100 180 L100 600 L500 600 L500 180"
            stroke="#FFF"
            strokeWidth="1.5"
            fill="none"
          />
          <line
            x1="300"
            y1="0"
            x2="300"
            y2="700"
            stroke="#FFF"
            strokeWidth="0.5"
            strokeDasharray="6 6"
          />
          <path
            d="M200 600 L200 400 Q300 320 400 400 L400 600"
            stroke="#FFF"
            strokeWidth="1.5"
            fill="none"
          />
          <line
            x1="100"
            y1="300"
            x2="500"
            y2="300"
            stroke="#FFF"
            strokeWidth="0.5"
          />
          <line
            x1="100"
            y1="420"
            x2="500"
            y2="420"
            stroke="#FFF"
            strokeWidth="0.5"
          />
          <line
            x1="150"
            y1="180"
            x2="150"
            y2="600"
            stroke="#FFF"
            strokeWidth="0.4"
          />
          <line
            x1="250"
            y1="180"
            x2="250"
            y2="600"
            stroke="#FFF"
            strokeWidth="0.4"
          />
          <line
            x1="350"
            y1="180"
            x2="350"
            y2="600"
            stroke="#FFF"
            strokeWidth="0.4"
          />
          <line
            x1="450"
            y1="180"
            x2="450"
            y2="600"
            stroke="#FFF"
            strokeWidth="0.4"
          />
        </svg>

        <div className="flex items-center gap-2.5 text-accent text-[0.68rem] tracking-[0.22em] uppercase">
          <span className="w-6 h-px bg-secondary" />
          Subang Jaya, Malaysia
        </div>

        <h1 className="text-primary-foreground text-5xl font-light leading-tight">
          A place of
          <br />
          <em className="text-accent">prayer</em> &amp;
          <br />
          community.
        </h1>

        <div className="flex flex-col gap-6">
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-[360px]">
            Stay connected with your masjid — prayer times, programmes, and
            everything your jemaah needs in one place.
          </p>
          <div className="flex gap-3">
            <Link
              href="#prayers"
              className="bg-secondary text-secondary-foreground hover:bg-accent/80 text-xs tracking-widest uppercase px-7 py-3 rounded-sm no-underline transition-colors"
            >
              Prayer Times
            </Link>
            <Link
              href="#events"
              className="border border-primary-foreground/25 text-primary-foreground hover:border-primary-foreground/60 text-xs tracking-widest uppercase px-7 py-3 rounded-sm no-underline transition-colors"
            >
              View Events
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-primary">
        <div className="w-full h-full">
          <div className="absolute bottom-0 w-full">
            <PrayerTimes />
          </div>
        </div>
      </div>
    </section>
  );
}
