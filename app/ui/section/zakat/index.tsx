"use client";

import { Coins, GrainsSlash } from "@phosphor-icons/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ZakatFitrah } from "./zakat-fitrah";
import { ZakatMaal } from "./zakat-maal";
import { Card, CardContent } from "@/components/ui/card";

export function ZakatCalculator() {
  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center gap-2.5 text-muted-foreground text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
        <span className="w-5 h-px bg-secondary" />
        Obligatory Giving
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
        <div>
          <h2 className="text-foreground text-2xl md:text-3xl font-light leading-tight">
            Zakat Calculator
          </h2>
          <p className="text-muted-foreground text-sm mt-1.5 max-w-md leading-relaxed">
            Calculate your Zakat Fitrah (per-person charity) or Zakat Maal
            (wealth tax) based on Lembaga Zakat Selangor guidelines.
          </p>
        </div>
      </div>

      <Tabs defaultValue="fitrah">
        <TabsList>
          <TabsTrigger value="fitrah">
            <GrainsSlash size={18} weight="duotone" />
            <span>Zakat Fitrah</span>
            <span className="hidden md:inline font-serif">زكاة الفطر</span>
          </TabsTrigger>
          <TabsTrigger value="maal">
            <Coins size={18} weight="duotone" />
            <span>Zakat Maal</span>
            <span className="hidden md:inline font-serif">زكاة المال</span>
          </TabsTrigger>
        </TabsList>

        {/* Calculator panels */}
        <TabsContent value="fitrah">
          <Card>
            <CardContent>
              <ZakatFitrah />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maal">
          <Card>
            <CardContent>
              <ZakatMaal />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
