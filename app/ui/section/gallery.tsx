"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, MagnifyingGlassPlus } from "@phosphor-icons/react";

const images = [
  { src: "/galley/top view.jpg",    alt: "Aerial top view" },
  { src: "/galley/nikah.jpg",       alt: "Nikah ceremony" },
  { src: "/galley/1.jpg",           alt: "Masjid Al-Ikhlas" },
  { src: "/galley/inner.jpg",       alt: "Interior of the mosque" },
  { src: "/galley/backyard.jpg",    alt: "Mosque backyard" },
  { src: "/galley/kids.jpg",        alt: "Children at the mosque" },
  { src: "/galley/playground.jpg",  alt: "Children's playground" },
  { src: "/galley/playground2.jpg", alt: "Playground area" },
];

const colSpans = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
];

// CSS injected once for keyframe animations
const ANIM_STYLES = `
  @keyframes lb-enter-right { from { opacity:0; transform:translateX(48px) scale(0.97); } to { opacity:1; transform:translateX(0) scale(1); } }
  @keyframes lb-enter-left  { from { opacity:0; transform:translateX(-48px) scale(0.97); } to { opacity:1; transform:translateX(0) scale(1); } }
  @keyframes lb-overlay-in  { from { opacity:0; } to { opacity:1; } }
  @keyframes lb-panel-in    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  .lb-img-enter-right { animation: lb-enter-right 320ms cubic-bezier(0.22,1,0.36,1) both; }
  .lb-img-enter-left  { animation: lb-enter-left  320ms cubic-bezier(0.22,1,0.36,1) both; }
  .lb-overlay-in      { animation: lb-overlay-in  220ms ease both; }
  .lb-panel-in        { animation: lb-panel-in    280ms cubic-bezier(0.22,1,0.36,1) both; }
`;

export function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [displayIdx, setDisplayIdx] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [imgKey, setImgKey] = useState(0);   // bump to re-trigger CSS animation
  const [open, setOpen] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Navigate with direction-aware animation
  const navigate = useCallback(
    (dir: "prev" | "next") => {
      const next =
        dir === "next"
          ? (displayIdx + 1) % images.length
          : (displayIdx - 1 + images.length) % images.length;
      setDirection(dir === "next" ? "right" : "left");
      setDisplayIdx(next);
      setImgKey((k) => k + 1);
    },
    [displayIdx],
  );

  // Open lightbox
  const openAt = useCallback((i: number) => {
    setDisplayIdx(i);
    setImgKey((k) => k + 1);
    setDirection("right");
    setOpen(true);
    setSelectedIdx(i);
  }, []);

  // Close lightbox
  const close = useCallback(() => {
    setOpen(false);
    setSelectedIdx(null);
  }, []);

  // Sync selectedIdx → displayIdx for thumbnail clicks
  const goTo = useCallback(
    (i: number) => {
      setDirection(i > displayIdx ? "right" : "left");
      setDisplayIdx(i);
      setSelectedIdx(i);
      setImgKey((k) => k + 1);
    },
    [displayIdx],
  );

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbsRef.current) return;
    const thumb = thumbsRef.current.children[displayIdx] as HTMLElement;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [displayIdx]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "Escape")     close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, navigate, close]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const img = images[displayIdx];

  return (
    <section className="bg-muted/40 py-10 md:py-16 px-4 md:px-12" id="gallery">
      {/* Inject keyframe styles once */}
      <style>{ANIM_STYLES}</style>

      {/* Header */}
      <div className="flex items-center gap-2.5 text-secondary text-[0.65rem] tracking-[0.22em] uppercase mb-2.5">
        <span className="w-5 h-px bg-secondary" />
        Our Premises
      </div>
      <h2 className="text-foreground text-2xl md:text-3xl font-light mb-8 md:mb-10">
        Photo Gallery
      </h2>

      {/* Masonry grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 auto-rows-[180px] md:auto-rows-[160px]">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => openAt(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            className={`group relative overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${colSpans[i] ?? ""}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-all duration-300 flex items-center justify-center">
              <MagnifyingGlassPlus
                size={32}
                weight="light"
                className="text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
              />
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {open && (
        <div
          className="lb-overlay-in fixed inset-0 z-50 flex flex-col bg-black/96 backdrop-blur-md"
          onClick={close}
        >

          {/* ── Top bar ── */}
          <div
            className="lb-panel-in shrink-0 flex items-center justify-between px-5 md:px-8 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Counter */}
            <span className="font-mono text-[0.7rem] tracking-[0.2em] text-white/35 uppercase select-none">
              {String(displayIdx + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(images.length).padStart(2, "0")}
            </span>

            {/* Dot indicators */}
            <div className="hidden md:flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === displayIdx
                      ? "w-5 h-1.5 bg-secondary"
                      : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 hover:border-white/25 text-white/50 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <X size={16} weight="bold" />
            </button>
          </div>

          {/* ── Main image ── */}
          <div
            className="relative flex-1 flex items-center justify-center min-h-0 px-12 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev */}
            <button
              onClick={() => navigate("prev")}
              aria-label="Previous photo"
              className="absolute left-2 md:left-4 z-10 group w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 hover:border-white/25 text-white/50 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <ArrowLeft size={20} weight="bold" className="group-hover:-translate-x-0.5 transition-transform duration-150" />
            </button>

            {/* Image container — 80% viewport height */}
            <div
              key={imgKey}
              className={`relative w-full select-none ${direction === "right" ? "lb-img-enter-right" : "lb-img-enter-left"}`}
              style={{ height: "80vh" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain drop-shadow-2xl"
                priority
                draggable={false}
              />
            </div>

            {/* Next */}
            <button
              onClick={() => navigate("next")}
              aria-label="Next photo"
              className="absolute right-2 md:right-4 z-10 group w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 hover:border-white/25 text-white/50 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <ArrowRight size={20} weight="bold" className="group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>
          </div>

          {/* ── Thumbnail strip ── */}
          <div
            className="lb-panel-in shrink-0 px-4 md:px-8 pt-3 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* thin separator line */}
            <div className="w-full h-px bg-white/8 mb-3" />
            <div
              ref={thumbsRef}
              className="flex gap-2 overflow-x-auto justify-center"
              style={{ scrollbarWidth: "none" }}
            >
              {images.map((t, i) => (
                <button
                  key={t.src}
                  onClick={() => goTo(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`relative shrink-0 overflow-hidden rounded transition-all duration-250 ${
                    i === displayIdx
                      ? "w-20 h-14 ring-2 ring-secondary opacity-100 scale-105 shadow-lg shadow-black/50"
                      : "w-16 h-11 ring-1 ring-white/10 opacity-30 hover:opacity-65 hover:scale-102"
                  }`}
                >
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </section>
  );
}

