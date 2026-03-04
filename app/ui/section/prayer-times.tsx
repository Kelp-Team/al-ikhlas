"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

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

function getNext(): Prayer {
  const cur = nowMins();
  for (const p of prayers) {
    if (p.h * 60 + p.m > cur) return p;
  }
  return prayers[0];
}

function fmt(h: number, m: number) {
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return { h: hh, m: String(m).padStart(2, "0"), ap };
}

function formatCountdown(targetDate: Date): string {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function PrayerTimes() {
  const [activePrayer, setActivePrayer] = useState<string | null>(() => getActive());
  const [nextPrayer, setNextPrayer] = useState<Prayer>(() => getNext());
  const [countdown, setCountdown] = useState<string>(() => {
    const next = getNext();
    const target = new Date();
    target.setHours(next.h, next.m, 0, 0);
    if (target.getTime() < new Date().getTime()) {
      target.setDate(target.getDate() + 1);
    }
    return formatCountdown(target);
  });
  const [dateStr] = useState(() =>
    new Date().toLocaleDateString("en-MY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );

  useEffect(() => {
    const update = () => {
      setActivePrayer(getActive());
      const next = getNext();
      setNextPrayer(next);
      const target = new Date();
      target.setHours(next.h, next.m, 0, 0);
      if (target.getTime() < new Date().getTime()) {
        target.setDate(target.getDate() + 1);
      }
      setCountdown(formatCountdown(target));
    };

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="grid md:grid-cols-[340px_1fr] min-h-100" id="prayers">
      <div className="bg-forest p-6 md:p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 text-gold-light text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
            <span className="w-5 h-px bg-gold" />
            Daily Schedule
          </div>
          <h2 className="text-cream text-2xl md:text-3xl font-light leading-tight">Prayer Times</h2>
          <p className="text-sand font-serif italic text-sm mt-2">{dateStr}</p>
        </div>

        <div className="pt-6 md:pt-9 border-t border-cream/12">
          <div className="text-gold text-[0.62rem] tracking-[0.2em] uppercase mb-2">Next Prayer</div>
          <div className="font-serif text-cream text-lg md:text-xl">
            {nextPrayer.name} · {nextPrayer.time}
          </div>
          <div className="font-serif text-gold-light text-2xl md:text-[2.6rem] font-light tracking-wide leading-none mt-1">
            {countdown}
          </div>
        </div>
      </div>

      <div className="bg-cream grid grid-cols-2 md:grid-cols-5">
        {prayers.map((p) => {
          const f = fmt(p.h, p.m);
          const isActive = p.name === activePrayer;
          return (
            <div
              key={p.name}
              className={`p-4 md:p-12 pb-10 border-r border-parchment flex flex-col gap-4 cursor-default transition-colors relative ${
                isActive ? "bg-warm" : "hover:bg-warm"
              }`}
            >
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.75 bg-gold" />
              )}
              <div className="font-serif text-[var(--sand)] text-xl text-right leading-none">
                {p.arabic}
              </div>
              <div className="mt-auto">
                <div className="text-[var(--text-3)] text-[0.7rem] tracking-[0.18em] uppercase">
                  {p.name}
                </div>
                <div className="font-serif text-brown text-2.4xl font-light leading-none mt-1">
                  {f.h}:{f.m}
                </div>
                <div className="text-[var(--text-3)] text-xs">{f.ap}</div>
              </div>
              {isActive && (
                <Badge className="absolute top-8 right-6 bg-gold text-[var(--charcoal)] text-[0.58rem] tracking-wider px-2 py-0.5 rounded-sm w-fit">
                  Now
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
