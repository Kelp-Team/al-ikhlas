"use client";

import { useState } from "react";
import { Coins, Scales, GrainsSlash, Buildings, Wallet } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ── Constants ──────────────────────────────────────────────────────────────
// Zakat Fitrah 2025 rate for Selangor (RM / person)
const FITRAH_RATE_PER_PERSON = 7.0;

// Nisab for Zakat Maal = 85g of gold. Gold price MYR/gram (approx, update yearly)
const GOLD_PRICE_PER_GRAM_MYR = 465;
const NISAB_MYR = 85 * GOLD_PRICE_PER_GRAM_MYR; // ~RM 39,525
const ZAKAT_RATE = 0.025; // 2.5%
const HAUL_MONTHS = 12; // savings must be held ≥ 12 lunar months

// ── Types ──────────────────────────────────────────────────────────────────
type Tab = "fitrah" | "maal";

// ── Helpers ────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function ResultBox({
  label,
  value,
  highlight,
  note,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  note?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border p-4 flex flex-col gap-1 transition-colors",
        highlight
          ? "bg-primary border-secondary/40"
          : "bg-muted/50 border-border",
      )}
    >
      <span
        className={cn(
          "text-[0.62rem] tracking-[0.18em] uppercase",
          highlight ? "text-secondary/80" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-2xl font-light font-serif",
          highlight ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {value}
      </span>
      {note && (
        <span className="text-[0.68rem] text-muted-foreground leading-relaxed mt-0.5">
          {note}
        </span>
      )}
    </div>
  );
}

// ── Zakat Fitrah ──────────────────────────────────────────────────────────
function ZakatFitrah() {
  const [persons, setPersons] = useState<number>(1);

  const total = persons * FITRAH_RATE_PER_PERSON;

  return (
    <div className="flex flex-col gap-6">
      {/* Info banner */}
      <div className="flex gap-3 bg-primary/10 border border-primary/20 rounded-sm p-4 text-sm text-muted-foreground leading-relaxed">
        <GrainsSlash size={20} weight="duotone" className="text-secondary shrink-0 mt-0.5" />
        <p>
          Zakat Fitrah is obligatory for every Muslim who has food in excess of their own and
          their dependents&apos; needs on the eve of Eid al-Fitr. The rate for{" "}
          <strong className="text-foreground">Selangor 2025</strong> is{" "}
          <strong className="text-foreground">RM {fmt(FITRAH_RATE_PER_PERSON)}</strong> per person.
        </p>
      </div>

      {/* Input */}
      <div>
        <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
          Number of Persons
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPersons((p) => Math.max(1, p - 1))}
            className="w-10 h-10 rounded-sm border border-border bg-muted hover:bg-muted/70 text-foreground text-xl flex items-center justify-center transition-colors"
            aria-label="Decrease"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={50}
            value={persons}
            onChange={(e) => setPersons(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 h-10 text-center rounded-sm border border-border bg-background text-foreground text-lg focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            onClick={() => setPersons((p) => Math.min(50, p + 1))}
            className="w-10 h-10 rounded-sm border border-border bg-muted hover:bg-muted/70 text-foreground text-xl flex items-center justify-center transition-colors"
            aria-label="Increase"
          >
            +
          </button>
          <span className="text-sm text-muted-foreground">
            × RM {fmt(FITRAH_RATE_PER_PERSON)} / person
          </span>
        </div>
      </div>

      {/* Result */}
      <ResultBox
        label="Total Zakat Fitrah"
        value={`RM ${fmt(total)}`}
        highlight
        note={`For ${persons} person${persons > 1 ? "s" : ""} at RM ${fmt(FITRAH_RATE_PER_PERSON)} each`}
      />

      <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
        * Rate based on Lembaga Zakat Selangor (LZS). Please verify the current year&apos;s
        rate at <span className="underline">zakatselangor.com.my</span> before paying.
      </p>
    </div>
  );
}

// ── Zakat Maal (Harta) ────────────────────────────────────────────────────
type MaalCategory = "savings" | "gold" | "business";

interface MaalInputs {
  savings: string;
  goldGrams: string;
  businessAssets: string;
  businessLiabilities: string;
  monthsHeld: string;
}

function ZakatMaal() {
  const [category, setCategory] = useState<MaalCategory>("savings");
  const [inputs, setInputs] = useState<MaalInputs>({
    savings: "",
    goldGrams: "",
    businessAssets: "",
    businessLiabilities: "",
    monthsHeld: "12",
  });

  const set = (k: keyof MaalInputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((prev) => ({ ...prev, [k]: e.target.value }));

  const num = (v: string) => parseFloat(v.replace(/,/g, "")) || 0;

  // ── Calculations ──
  const savings = num(inputs.savings);
  const goldMyr = num(inputs.goldGrams) * GOLD_PRICE_PER_GRAM_MYR;
  const businessNet = Math.max(0, num(inputs.businessAssets) - num(inputs.businessLiabilities));
  const monthsHeld = Math.min(HAUL_MONTHS, num(inputs.monthsHeld));

  let zakatable = 0;
  let zakatDue = 0;
  let meetsNisab = false;
  let meetsHaul = false;

  if (category === "savings") {
    zakatable = savings;
    meetsNisab = savings >= NISAB_MYR;
    meetsHaul = monthsHeld >= HAUL_MONTHS;
    zakatDue = meetsNisab && meetsHaul ? savings * ZAKAT_RATE : 0;
  } else if (category === "gold") {
    zakatable = goldMyr;
    meetsNisab = goldMyr >= NISAB_MYR;
    meetsHaul = monthsHeld >= HAUL_MONTHS;
    zakatDue = meetsNisab && meetsHaul ? goldMyr * ZAKAT_RATE : 0;
  } else {
    zakatable = businessNet;
    meetsNisab = businessNet >= NISAB_MYR;
    meetsHaul = monthsHeld >= HAUL_MONTHS;
    zakatDue = meetsNisab && meetsHaul ? businessNet * ZAKAT_RATE : 0;
  }

  const catTabs: { id: MaalCategory; label: string; icon: React.ReactNode }[] = [
    { id: "savings", label: "Savings", icon: <Wallet size={15} /> },
    { id: "gold",    label: "Gold",    icon: <Coins size={15} /> },
    { id: "business",label: "Business",icon: <Buildings size={15} /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Info banner */}
      <div className="flex gap-3 bg-primary/10 border border-primary/20 rounded-sm p-4 text-sm text-muted-foreground leading-relaxed">
        <Scales size={20} weight="duotone" className="text-secondary shrink-0 mt-0.5" />
        <p>
          Zakat Maal is 2.5% on wealth that reaches the <strong className="text-foreground">nisab</strong>{" "}
          (≈ RM {fmt(NISAB_MYR)}, based on 85g gold) and has been held for one full lunar year{" "}
          (<strong className="text-foreground">haul</strong> — 12 months).
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-sm w-fit">
        {catTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setCategory(t.id)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] text-xs tracking-wide transition-all duration-150",
              category === t.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category === "savings" && (
          <>
            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                Total Savings (RM)
              </label>
              <input
                type="number"
                min={0}
                placeholder="e.g. 50000"
                value={inputs.savings}
                onChange={set("savings")}
                className="w-full h-10 px-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                Months Held
              </label>
              <input
                type="number"
                min={1}
                max={12}
                placeholder="12"
                value={inputs.monthsHeld}
                onChange={set("monthsHeld")}
                className="w-full h-10 px-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <p className="text-[0.65rem] text-muted-foreground mt-1">Must reach 12 months (haul)</p>
            </div>
          </>
        )}

        {category === "gold" && (
          <>
            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                Gold Weight (grams)
              </label>
              <input
                type="number"
                min={0}
                placeholder="e.g. 100"
                value={inputs.goldGrams}
                onChange={set("goldGrams")}
                className="w-full h-10 px-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                Months Held
              </label>
              <input
                type="number"
                min={1}
                max={12}
                placeholder="12"
                value={inputs.monthsHeld}
                onChange={set("monthsHeld")}
                className="w-full h-10 px-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="col-span-full text-[0.7rem] text-muted-foreground bg-muted/60 rounded-sm px-3 py-2">
              Gold price used: <strong className="text-foreground">RM {fmt(GOLD_PRICE_PER_GRAM_MYR)}/g</strong> ·
              Nisab (85g): <strong className="text-foreground">RM {fmt(NISAB_MYR)}</strong> ·
              Your gold value: <strong className="text-foreground">RM {fmt(goldMyr)}</strong>
            </div>
          </>
        )}

        {category === "business" && (
          <>
            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                Business Assets (RM)
              </label>
              <input
                type="number"
                min={0}
                placeholder="e.g. 200000"
                value={inputs.businessAssets}
                onChange={set("businessAssets")}
                className="w-full h-10 px-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <p className="text-[0.65rem] text-muted-foreground mt-1">
                Stock-in-trade, cash, receivables
              </p>
            </div>
            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                Liabilities / Debts (RM)
              </label>
              <input
                type="number"
                min={0}
                placeholder="e.g. 30000"
                value={inputs.businessLiabilities}
                onChange={set("businessLiabilities")}
                className="w-full h-10 px-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                Months in Operation
              </label>
              <input
                type="number"
                min={1}
                max={12}
                placeholder="12"
                value={inputs.monthsHeld}
                onChange={set("monthsHeld")}
                className="w-full h-10 px-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </>
        )}
      </div>

      {/* Nisab & haul status */}
      <div className="flex flex-wrap gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-[0.65rem] tracking-wide uppercase px-2.5 py-1 rounded-full border",
            meetsNisab
              ? "bg-primary/15 border-primary/30 text-primary"
              : "bg-muted border-border text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              meetsNisab ? "bg-secondary" : "bg-muted-foreground/50",
            )}
          />
          Nisab {meetsNisab ? "Reached" : "Not Reached"}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-[0.65rem] tracking-wide uppercase px-2.5 py-1 rounded-full border",
            meetsHaul
              ? "bg-primary/15 border-primary/30 text-primary"
              : "bg-muted border-border text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              meetsHaul ? "bg-secondary" : "bg-muted-foreground/50",
            )}
          />
          Haul {meetsHaul ? "Complete" : `${num(inputs.monthsHeld)}/12 months`}
        </span>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ResultBox
          label="Zakatable Amount"
          value={`RM ${fmt(zakatable)}`}
          note={`Nisab threshold: RM ${fmt(NISAB_MYR)}`}
        />
        <ResultBox
          label="Zakat Due (2.5%)"
          value={`RM ${fmt(zakatDue)}`}
          highlight
          note={
            !meetsNisab
              ? "Below nisab — no zakat required"
              : !meetsHaul
                ? "Haul not complete — no zakat yet"
                : "Payable to Lembaga Zakat Selangor"
          }
        />
      </div>

      <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
        * This is an estimate only. Gold price is indicative. Consult{" "}
        <span className="underline">zakatselangor.com.my</span> or a qualified religious
        authority for a precise ruling.
      </p>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────
export function ZakatCalculator() {
  const [tab, setTab] = useState<Tab>("fitrah");

  const tabs: { id: Tab; label: string; arabic: string; icon: React.ReactNode }[] = [
    {
      id: "fitrah",
      label: "Zakat Fitrah",
      arabic: "زكاة الفطر",
      icon: <GrainsSlash size={18} weight="duotone" />,
    },
    {
      id: "maal",
      label: "Zakat Maal",
      arabic: "زكاة المال",
      icon: <Coins size={18} weight="duotone" />,
    },
  ];

  return (
    <section className="bg-primary py-10 md:py-16 px-4 md:px-12" id="zakat">
      {/* Header */}
      <div className="flex items-center gap-2.5 text-accent text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
        <span className="w-5 h-px bg-secondary" />
        Obligatory Giving
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
        <div>
          <h2 className="text-primary-foreground text-2xl md:text-3xl font-light leading-tight">
            Zakat Calculator
          </h2>
          <p className="text-primary-foreground/45 text-sm mt-1.5 max-w-md leading-relaxed">
            Calculate your Zakat Fitrah (per-person charity) or Zakat Maal (wealth tax) based
            on Lembaga Zakat Selangor guidelines.
          </p>
        </div>
        <p className="font-serif text-secondary/60 text-2xl md:text-3xl tracking-wide shrink-0">
          وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-primary-foreground/6 border border-primary-foreground/10 rounded-sm p-1 w-fit mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-sm transition-all duration-200",
              tab === t.id
                ? "bg-secondary text-secondary-foreground shadow-sm font-medium"
                : "text-primary-foreground/50 hover:text-primary-foreground",
            )}
          >
            {t.icon}
            <span>{t.label}</span>
            <span className="hidden md:inline font-serif text-[0.8em] opacity-70 ml-0.5">
              {t.arabic}
            </span>
          </button>
        ))}
      </div>

      {/* Calculator panel */}
      <div className="bg-background/95 backdrop-blur-sm rounded-sm border border-primary-foreground/10 p-6 md:p-8 max-w-2xl">
        {tab === "fitrah" ? <ZakatFitrah /> : <ZakatMaal />}
      </div>
    </section>
  );
}
