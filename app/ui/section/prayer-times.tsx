"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

interface Prayer {
  name: string;
  arabic: string;
  time: string;
  h: number;
  m: number;
}

interface ApiPrayerDay {
  day: number;
  hijri: string;
  fajr: number;
  syuruk: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}

interface ApiResponse {
  zone: string;
  year: number;
  month: string;
  month_number: number;
  prayers: ApiPrayerDay[];
}

async function fetchPrayerTimes(): Promise<ApiResponse> {
  const res = await fetch("https://api.waktusolat.app/v2/solat/SGR02");
  if (!res.ok) throw new Error("Failed to fetch prayer times");
  return res.json();
}

function apiDayToPrayers(day: ApiPrayerDay): Prayer[] {
  const toHM = (ts: number) => {
    const d = new Date(ts * 1000);
    return { h: d.getHours(), m: d.getMinutes() };
  };
  const entries: { name: string; arabic: string; ts: number }[] = [
    { name: "Fajr", arabic: "الفجر", ts: day.fajr },
    { name: "Dhuhr", arabic: "الظهر", ts: day.dhuhr },
    { name: "Asr", arabic: "العصر", ts: day.asr },
    { name: "Maghrib", arabic: "المغرب", ts: day.maghrib },
    { name: "Isyak", arabic: "العشاء", ts: day.isha },
  ];
  return entries.map(({ name, arabic, ts }) => {
    const { h, m } = toHM(ts);
    const f = fmt(h, m);
    return { name, arabic, time: `${f.h}:${f.m}`, h, m };
  });
}

function nowMins(): number {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}

function getActive(prayers: Prayer[]): string | null {
  const cur = nowMins();
  let a: string | null = null;
  for (const p of prayers) {
    if (p.h * 60 + p.m <= cur) a = p.name;
  }
  return a;
}

function getNext(prayers: Prayer[]): Prayer {
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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["prayer-times", "SGR02"],
    queryFn: fetchPrayerTimes,
  });

  const prayers = useMemo<Prayer[]>(() => {
    if (!data) return [];
    const today = new Date().getDate();
    const todayEntry = data.prayers.find((p) => p.day === today);
    if (!todayEntry) return [];
    return apiDayToPrayers(todayEntry);
  }, [data]);

  const [activePrayer, setActivePrayer] = useState<string | null>(() =>
    prayers.length ? getActive(prayers) : null,
  );
  const [nextPrayer, setNextPrayer] = useState<Prayer | null>(() =>
    prayers.length ? getNext(prayers) : null,
  );
  const [countdown, setCountdown] = useState<string>(() => {
    if (!prayers.length) return "--:--:--";
    const next = getNext(prayers);
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
    }),
  );

  useEffect(() => {
    if (!prayers.length) return;
    const update = () => {
      setActivePrayer(getActive(prayers));
      const next = getNext(prayers);
      setNextPrayer(next);
      const target = new Date();
      target.setHours(next.h, next.m, 0, 0);
      if (target.getTime() < new Date().getTime()) {
        target.setDate(target.getDate() + 1);
      }
      setCountdown(formatCountdown(target));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [prayers]);

  return (
    <section className="grid md:grid-cols-[340px_1fr] min-h-100" id="prayers">
      <div className="bg-forest p-6 md:p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 text-gold-light text-xs tracking-widest uppercase mb-2.5">
            <span className="w-5 h-px bg-gold" />
            Prayer Times
          </div>
          <p className="text-sand font-serif italic text-sm mt-2">{dateStr}</p>
        </div>

        {nextPrayer && (
          <div className="pt-6 md:pt-9 border-t border-cream/12">
            <div className="text-gold text-xs tracking-widest uppercase mb-2">
              Next Prayer
            </div>
            <div className="font-serif text-cream text-lg md:text-xl">
              {nextPrayer.name} · {nextPrayer.time}
            </div>
            <div className="font-serif text-gold-light text-2xl md:text-[2.6rem] font-light tracking-wide leading-none mt-1">
              {countdown}
            </div>
          </div>
        )}
      </div>

      <div className="bg-cream grid grid-cols-2 md:grid-cols-5">
        {isLoading && (
          <div className="col-span-2 md:col-span-5 p-12 flex items-center justify-center text-sand text-sm tracking-wide">
            Loading prayer times…
          </div>
        )}
        {isError && (
          <div className="col-span-2 md:col-span-5 p-12 flex items-center justify-center text-sand text-sm tracking-wide">
            Unable to load prayer times
          </div>
        )}
        {!isLoading &&
          !isError &&
          prayers.map((p) => {
            const f = fmt(p.h, p.m);
            const isActive = p.name === activePrayer;
            return (
              <div
                key={p.name}
                className={`p-4 md:p-12 pb-10 border-r border-parchment flex flex-col items-center text-center gap-4 cursor-default transition-colors relative ${
                  isActive ? "bg-warm" : "hover:bg-warm"
                }`}
              >
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.75 bg-gold" />
                )}
                <div className="font-serif text-sand text-xl leading-none">
                  {p.arabic}
                </div>
                <div className="mt-auto">
                  <div className="text-xs tracking-widest uppercase">
                    {p.name}
                  </div>
                  <div className="font-serif text-brown text-2xl font-light leading-none mt-1">
                    {f.h}:{f.m}
                  </div>
                  <div className="text-xs">{f.ap}</div>
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
