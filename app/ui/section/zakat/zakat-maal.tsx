"use client";

import { useState } from "react";
import { Coins, Scales, Buildings, Wallet } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemDescription,
} from "@/components/ui/item";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import {
  GOLD_PRICE_PER_GRAM_MYR,
  NISAB_MYR,
  ZAKAT_RATE,
  HAUL_MONTHS,
} from "./constants";
import { fmt, ResultBox } from "./helpers";

type MaalCategory = "savings" | "gold" | "business";

interface MaalInputs {
  savings: string;
  goldGrams: string;
  businessAssets: string;
  businessLiabilities: string;
  monthsHeld: string;
}

export function ZakatMaal() {
  const [category, setCategory] = useState<MaalCategory>("savings");
  const [inputs, setInputs] = useState<MaalInputs>({
    savings: "",
    goldGrams: "",
    businessAssets: "",
    businessLiabilities: "",
    monthsHeld: "12",
  });

  const set =
    (k: keyof MaalInputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setInputs((prev) => ({ ...prev, [k]: e.target.value }));

  const num = (v: string) => parseFloat(v.replace(/,/g, "")) || 0;

  // ── Calculations ──
  const savings = num(inputs.savings);
  const goldMyr = num(inputs.goldGrams) * GOLD_PRICE_PER_GRAM_MYR;
  const businessNet = Math.max(
    0,
    num(inputs.businessAssets) - num(inputs.businessLiabilities),
  );
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

  const catTabs: { id: MaalCategory; label: string; icon: React.ReactNode }[] =
    [
      { id: "savings", label: "Savings", icon: <Wallet size={15} /> },
      { id: "gold", label: "Gold", icon: <Coins size={15} /> },
      { id: "business", label: "Business", icon: <Buildings size={15} /> },
    ];

  return (
    <div className="flex flex-col gap-6">
      {/* Info banner */}
      <Item variant="muted">
        <ItemMedia variant="icon">
          <Scales size={20} weight="duotone" className="text-secondary" />
        </ItemMedia>
        <ItemContent>
          <ItemDescription className="line-clamp-none text-sm leading-relaxed">
            Zakat Maal is 2.5% on wealth that reaches the{" "}
            <strong className="text-foreground">nisab</strong> (≈ RM{" "}
            {fmt(NISAB_MYR)}, based on 85g gold) and has been held for one full
            lunar year (<strong className="text-foreground">haul</strong> — 12
            months).
          </ItemDescription>
        </ItemContent>
      </Item>

      {/* Category tabs */}
      <Tabs
        value={category}
        onValueChange={(v) => setCategory(v as MaalCategory)}
      >
        <TabsList>
          {catTabs.map((t) => (
            <TabsTrigger key={t.id} value={t.id}>
              {t.icon}
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Inputs */}
        <TabsContent value="savings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Total Savings (RM)</FieldLabel>
              <Input
                type="number"
                min={0}
                placeholder="e.g. 50000"
                value={inputs.savings}
                onChange={set("savings")}
                className="h-10 text-sm"
              />
            </Field>
            <Field>
              <FieldLabel>Months Held</FieldLabel>
              <Input
                type="number"
                min={1}
                max={12}
                placeholder="12"
                value={inputs.monthsHeld}
                onChange={set("monthsHeld")}
                className="h-10 text-sm"
              />
              <FieldDescription>Must reach 12 months (haul)</FieldDescription>
            </Field>
          </div>
        </TabsContent>

        <TabsContent value="gold">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Gold Weight (grams)</FieldLabel>
              <Input
                type="number"
                min={0}
                placeholder="e.g. 100"
                value={inputs.goldGrams}
                onChange={set("goldGrams")}
                className="h-10 text-sm"
              />
            </Field>
            <Field>
              <FieldLabel>Months Held</FieldLabel>
              <Input
                type="number"
                min={1}
                max={12}
                placeholder="12"
                value={inputs.monthsHeld}
                onChange={set("monthsHeld")}
                className="h-10 text-sm"
              />
            </Field>
            <Item variant="muted" className="col-span-full">
              <ItemContent>
                <ItemDescription className="line-clamp-none text-[0.7rem]">
                  Gold price used:{" "}
                  <strong className="text-foreground">
                    RM {fmt(GOLD_PRICE_PER_GRAM_MYR)}/g
                  </strong>{" "}
                  · Nisab (85g):{" "}
                  <strong className="text-foreground">
                    RM {fmt(NISAB_MYR)}
                  </strong>{" "}
                  · Your gold value:{" "}
                  <strong className="text-foreground">RM {fmt(goldMyr)}</strong>
                </ItemDescription>
              </ItemContent>
            </Item>
          </div>
        </TabsContent>

        <TabsContent value="business">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Business Assets (RM)</FieldLabel>
              <Input
                type="number"
                min={0}
                placeholder="e.g. 200000"
                value={inputs.businessAssets}
                onChange={set("businessAssets")}
                className="h-10 text-sm"
              />
              <FieldDescription>
                Stock-in-trade, cash, receivables
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Liabilities / Debts (RM)</FieldLabel>
              <Input
                type="number"
                min={0}
                placeholder="e.g. 30000"
                value={inputs.businessLiabilities}
                onChange={set("businessLiabilities")}
                className="h-10 text-sm"
              />
            </Field>
            <Field>
              <FieldLabel>Months in Operation</FieldLabel>
              <Input
                type="number"
                min={1}
                max={12}
                placeholder="12"
                value={inputs.monthsHeld}
                onChange={set("monthsHeld")}
                className="h-10 text-sm"
              />
            </Field>
          </div>
        </TabsContent>
      </Tabs>

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
        <a
          href="https://zakatselangor.com.my"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Zakat Selangor
        </a>{" "}
        or a qualified religious authority for a precise ruling.
      </p>
    </div>
  );
}
