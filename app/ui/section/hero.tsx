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

function nowMins(): number {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}

function getActive(): string | null {
  const cur = nowMins();
  let a: string | null = null;
  for (const p of prayers) {
    if (p.h * 60 + p.m <= cur) a = p.name;
  }
  return a;
}

function fmt(h: number, m: number) {
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return { h: hh, m: String(m).padStart(2, "0"), ap };
}

export function Hero() {
  const [activePrayer, setActivePrayer] = useState<string | null>(() =>
    getActive(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePrayer(getActive());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="grid grid-cols-2 min-h-screen">
      <div className="bg-forest px-14 py-20 flex flex-col justify-between relative overflow-hidden">
        <svg
          className="absolute top-0 right-0 w-[60%] h-full opacity-[0.06] pointer-events-none"
          viewBox="0 0 300 600"
          fill="none"
        >
          <path
            d="M150 30 Q260 110 260 280 Q260 450 150 570 Q40 450 40 280 Q40 110 150 30Z"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M150 80 Q230 150 230 280 Q230 410 150 520 Q70 410 70 280 Q70 150 150 80Z"
            stroke="white"
            strokeWidth="0.8"
            fill="none"
          />
          <circle
            cx="150"
            cy="30"
            r="10"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="150" cy="30" r="3" fill="white" />
          <line
            x1="150"
            y1="0"
            x2="150"
            y2="600"
            stroke="white"
            strokeWidth="0.3"
            strokeDasharray="4 6"
          />
        </svg>

        <div className="flex items-center gap-2.5 text-gold-light text-[0.68rem] tracking-[0.22em] uppercase">
          <span className="w-6 h-px bg-gold" />
          Subang Jaya, Malaysia
        </div>

        <h1 className="text-cream text-5xl font-light leading-tight">
          A place of
          <br />
          <em className="text-gold-light">prayer</em> &amp;
          <br />
          community.
        </h1>

        <div className="flex flex-col gap-6">
          <p className="text-cream/60 text-sm leading-relaxed max-w-[360px]">
            Stay connected with your masjid — prayer times, programmes, and
            everything your jemaah needs in one place.
          </p>
          <div className="flex gap-3">
            <Link
              href="#prayers"
              className="bg-gold text-[var(--charcoal)] hover:bg-gold-light text-xs tracking-widest uppercase px-7 py-3 rounded-sm no-underline transition-colors"
            >
              Prayer Times
            </Link>
            <Link
              href="#events"
              className="border border-cream/25 text-cream hover:border-cream/60 text-xs tracking-widest uppercase px-7 py-3 rounded-sm no-underline transition-colors"
            >
              View Events
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-parchment">
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(160deg, #C8B89A 0%, #E6DDD0 40%, #D4C4A8 70%, #A08060 100%)",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 700"
            fill="none"
            className="absolute opacity-[0.18]"
          >
            <ellipse
              cx="300"
              cy="180"
              rx="200"
              ry="180"
              stroke="#3A2A1A"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M100 180 L100 600 L500 600 L500 180"
              stroke="#3A2A1A"
              strokeWidth="1.5"
              fill="none"
            />
            <line
              x1="300"
              y1="0"
              x2="300"
              y2="700"
              stroke="#3A2A1A"
              strokeWidth="0.5"
              strokeDasharray="6 6"
            />
            <path
              d="M200 600 L200 400 Q300 320 400 400 L400 600"
              stroke="#3A2A1A"
              strokeWidth="1.5"
              fill="none"
            />
            <line
              x1="100"
              y1="300"
              x2="500"
              y2="300"
              stroke="#3A2A1A"
              strokeWidth="0.5"
            />
            <line
              x1="100"
              y1="420"
              x2="500"
              y2="420"
              stroke="#3A2A1A"
              strokeWidth="0.5"
            />
            <line
              x1="150"
              y1="180"
              x2="150"
              y2="600"
              stroke="#3A2A1A"
              strokeWidth="0.4"
            />
            <line
              x1="250"
              y1="180"
              x2="250"
              y2="600"
              stroke="#3A2A1A"
              strokeWidth="0.4"
            />
            <line
              x1="350"
              y1="180"
              x2="350"
              y2="600"
              stroke="#3A2A1A"
              strokeWidth="0.4"
            />
            <line
              x1="450"
              y1="180"
              x2="450"
              y2="600"
              stroke="#3A2A1A"
              strokeWidth="0.4"
            />
          </svg>
          <div className="absolute bottom-0 w-full">
            <PrayerTimes />
          </div>
        </div>
      </div>
    </section>
  );
}
