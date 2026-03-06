"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const images = [
  {
    src: "/galley/backyard.jpg",
    alt: "Mosque backyard",
    label: "Backyard",
  },
  {
    src: "/galley/playground.jpg",
    alt: "Children's playground",
    label: "Playground",
  },
  {
    src: "/galley/playground2.jpg",
    alt: "Children's playground area",
    label: "Playground Area",
  },
  {
    src: "/galley/top view.jpg",
    alt: "Top view of the mosque",
    label: "Top View",
  },
];

export function Gallery() {
  const [selected, setSelected] = useState<(typeof images)[number] | null>(null);

  return (
    <section className="bg-background py-10 md:py-16 px-4 md:px-12" id="gallery">
      <div className="flex items-center gap-2.5 text-secondary text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
        <span className="w-5 h-px bg-secondary" />
        Our Premises
      </div>
      <h2 className="text-foreground text-2xl md:text-3xl font-light mb-8 md:mb-10">
        Photo Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {images.map((img) => (
          <button
            key={img.src}
            onClick={() => setSelected(img)}
            className="group relative aspect-square overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`View ${img.label}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-end">
              <span className="text-primary-foreground text-xs tracking-widest uppercase px-3 py-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {img.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black border-0">
          <DialogTitle className="sr-only">
            {selected?.label ?? "Gallery image"}
          </DialogTitle>
          {selected && (
            <div className="relative w-full aspect-video">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 px-4 py-2 bg-black/50">
                <p className="text-white text-xs tracking-widest uppercase">
                  {selected.label}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
