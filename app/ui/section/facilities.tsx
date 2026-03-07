"use client";

import Link from "next/link";
import { Mosque, GenderFemale, Car, Wheelchair } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const facilities = [
  {
    icon: <Mosque size={18} weight="light" />,
    name: "Dewan Nikah",
    desc: "An elegant place available for nikah ceremonies and walimah receptions, accommodating up to 20 guests.",
    href: "/booking?place=wedding-hall",
  },
  {
    icon: <GenderFemale size={18} weight="light" />,
    name: "Women's Section",
    desc: "A dedicated prayer space for sisters on the lower floor with direct access and full privacy.",
  },
  {
    icon: <Car size={18} weight="light" />,
    name: "Parking",
    desc: "200+ parking bays available. Overflow at adjacent lots during peak Jumu'ah times.",
  },
  {
    icon: <Wheelchair size={18} weight="light" />,
    name: "Accessibility",
    desc: "Ramps, lifts and designated prayer areas for wheelchair users and the elderly throughout.",
  },
];

export function Facilities() {
  return (
    <section
      className="bg-primary py-10 md:py-16 px-4 md:px-12"
      id="facilities"
    >
      <div className="flex items-center gap-2.5 text-accent text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
        <span className="w-5 h-px bg-secondary" />
        What We Offer
      </div>
      <h2 className="text-primary-foreground text-2xl md:text-3xl font-light mb-8 md:mb-10">
        Facilities & Amenities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-0.5 bg-sidebar">
        {facilities.map((fac, i) => (
          <div
            key={i}
            className="bg-primary-foreground/4 border border-primary-foreground/8 p-8 flex flex-col gap-3.5 transition-colors hover:bg-primary-foreground/8 cursor-default"
          >
            <div className="flex flex-row justify-between">
              <div className="w-10 h-10 border border-secondary/30 rounded-full flex items-center justify-center text-secondary">
                {fac.icon}
              </div>
              {fac.href && (
                <Button variant="outline" size="sm" render={<Link href={fac.href} />} className="text-secondary border-secondary/30 rounded-full hover:bg-secondary/10">
                  Book
                </Button>
              )}
            </div>
            <div className="font-serif text-primary-foreground text-xl">
              {fac.name}
            </div>
            <div className="text-primary-foreground/45 text-sm leading-relaxed">
              {fac.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
