"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
}

function parseTime12(value: string) {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match)
    return {
      hours: match[1],
      minutes: match[2],
      period: match[3].toUpperCase(),
    };
  return { hours: "", minutes: "", period: "AM" };
}

function TimePicker({ value = "", onChange, id, name }: TimePickerProps) {
  const parsed = parseTime12(value);
  const [hours, setHours] = useState(parsed.hours);
  const [minutes, setMinutes] = useState(parsed.minutes);
  const [period, setPeriod] = useState(parsed.period);

  // Sync internal state when external value changes (e.g. form reset)
  useEffect(() => {
    const p = parseTime12(value);
    setHours(p.hours);
    setMinutes(p.minutes);
    setPeriod(p.period);
  }, [value]);

  function emit(h: string, m: string, p: string) {
    if (h && m.length === 2) {
      onChange?.(`${h}:${m} ${p}`);
    } else if (!h && !m) {
      onChange?.("");
    }
  }

  return (
    <div className="flex gap-1.5 items-center">
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        placeholder="hh"
        maxLength={2}
        value={hours}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "").slice(0, 2);
          const num = parseInt(v, 10);
          if (v && (num < 1 || num > 12)) return;
          setHours(v);
          emit(v, minutes, period);
        }}
        className="w-12 text-center"
      />
      <span className="text-muted-foreground">:</span>
      <Input
        type="text"
        inputMode="numeric"
        placeholder="mm"
        maxLength={2}
        value={minutes}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "").slice(0, 2);
          const num = parseInt(v, 10);
          if (v.length === 2 && num > 59) return;
          setMinutes(v);
          emit(hours, v, period);
        }}
        className="w-12 text-center"
      />
      <select
        value={period}
        onChange={(e) => {
          setPeriod(e.target.value);
          emit(hours, minutes, e.target.value);
        }}
        className="h-8 rounded-none border border-input bg-transparent px-1.5 text-xs outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
      {name && (
        <input
          type="hidden"
          name={name}
          value={hours && minutes.length === 2 ? `${hours}:${minutes} ${period}` : ""}
        />
      )}
    </div>
  );
}

export { TimePicker };
