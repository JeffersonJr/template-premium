import { Link } from "@tanstack/react-router";
import { useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { BedDouble, Bath, Car, Maximize, MapPin, Heart, Share2, ChevronLeft, ChevronRight, Scale } from "lucide-react";
import { type Property, propertyPath, propertySlug } from "@/data/properties";
import { PriceBlock } from "@/components/PriceBlock";
import { shareLink, useFavorites } from "@/lib/favorites";

export function CardActions({ p, className = "", comparing = false, onCompare }: { p: Property; className?: string; comparing?: boolean; onCompare?: (id: string) => void }) {
  const { has, toggle } = useFavorites();
  const fav = has(p.id);
  const stop = (e: MouseEvent, fn: () => void) => { e.preventDefault(); e.stopPropagation(); fn(); };
  const btn = "flex h-8 w-8 items-center justify-center rounded-full bg-card/95 text-navy shadow-card transition hover:scale-105 sm:h-9 sm:w-9";
  return (
    <div className={`flex gap-1.5 sm:gap-2 ${className}`}>
      <button aria-label="Favoritar" onClick={(e) => stop(e, () => toggle(p.id))} className={btn}><Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${fav ? "fill-destructive text-destructive" : ""}`} /></button>
      {onCompare && <button aria-label="Comparar imóvel" onClick={(e) => stop(e, () => onCompare(p.id))} className={`${btn} ${comparing ? "bg-primary text-primary-foreground" : ""}`}><Scale className="h-4 w-4 sm:h-5 sm:w-5" /></button>}
      <button aria-label="Compartilhar" onClick={(e) => stop(e, () => shareLink(p.title, propertyPath(p)))} className={btn}><Share2 className="h-4 w-4 sm:h-5 sm:w-5" /></button>
    </div>
  );
}

export function PhotoSlider({ p, className = "", priority = false, revealMore = false }: { p: Property; className?: string; priority?: boolean; revealMore?: boolean }) {
  const [i, setI] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const suppressClickUntil = useRef(0);
  const n = p.images.length;
  const lastVisibleIndex = revealMore ? Math.min(2, n - 1) : n - 1;
  const isMoreTeaser = revealMore && i === 2 && n > 2;
  const go = (e: MouseEvent, d: number) => {
    e.preventDefault();
    e.stopPropagation();
    setI((x) => revealMore ? Math.max(0, Math.min(lastVisibleIndex, x + d)) : (x + d + n) % n);
  };
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - (event.changedTouches[0]?.clientX ?? touchStartX.current);
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    suppressClickUntil.current = Date.now() + 500;
    setI((x) => revealMore ? Math.max(0, Math.min(lastVisibleIndex, x + (delta > 0 ? 1 : -1))) : (x + (delta > 0 ? 1 : -1) + n) % n);
  };
  const arrow = "absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/95 text-navy opacity-85 shadow-card transition sm:opacity-0 sm:group-hover:opacity-100";
  const indicators = revealMore ? p.images.slice(0, Math.min(3, n)) : p.images;
  return (
    <div className={`relative overflow-hidden ${className}`} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onClickCapture={(event) => {
      if (Date.now() < suppressClickUntil.current) {
        event.preventDefault();
        event.stopPropagation();
        suppressClickUntil.current = 0;
      }
    }}>
      {revealMore && <Link to="/imoveis/$id" params={{ id: propertySlug(p) }} aria-label={`Ver imóvel: ${p.title}`} className="absolute inset-0 z-0" />}
      <div className={`relative z-10 flex h-full transition-transform duration-500 ${revealMore ? "pointer-events-none" : ""} ${isMoreTeaser ? "scale-[1.04] blur-[3px]" : ""}`} style={{ transform: `translateX(-${i * 100}%)` }}>
        {p.images.map((src, k) => <img key={k} src={src} alt={`${p.title} foto ${k + 1}`} width={1024} height={768} loading={priority && k === 0 ? "eager" : "lazy"} fetchPriority={priority && k === 0 ? "high" : "auto"} decoding="async" className="h-full w-full shrink-0 object-cover" />)}
      </div>
      {n > 1 && (
        <>
          {(!revealMore || i > 0) && <button aria-label="Foto anterior" onClick={(e) => go(e, -1)} className={`${arrow} left-3`}><ChevronLeft className="h-5 w-5" /></button>}
          {(!revealMore || i < lastVisibleIndex) && <button aria-label="Próxima foto" onClick={(e) => go(e, 1)} className={`${arrow} right-3`}><ChevronRight className="h-5 w-5" /></button>}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {indicators.map((_, k) => <span key={k} className={`h-1.5 rounded-full bg-card transition-all ${k === i ? "w-5" : "w-1.5 opacity-60"}`} />)}
          </div>
        </>
      )}
      {isMoreTeaser && (
        <Link to="/imoveis/$id" params={{ id: propertySlug(p) }} className="absolute inset-0 z-20 flex items-center justify-center bg-navy/25 px-4 text-center text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-base">
          <span className="rounded-full bg-navy/90 px-5 py-3 shadow-float">Ver mais fotos</span>
        </Link>
      )}
    </div>
  );
}

export function PropertyCard({ p, comparing, onCompare, onHover, showCode = false, priority = false }: { p: Property; comparing?: boolean; onCompare?: (id: string) => void; onHover?: (id?: string) => void; showCode?: boolean; priority?: boolean }) {
  return (
    <div onMouseEnter={() => onHover?.(p.id)} onMouseLeave={() => onHover?.()} className="group block rounded-2xl border border-transparent bg-transparent transition duration-300 hover:-translate-y-0.5 hover:border-transparent">
      <div className="relative overflow-hidden rounded-2xl">
        <PhotoSlider p={p} priority={priority} revealMore className="aspect-[4/3]" />
        <div className="absolute left-2 top-2 flex max-w-[calc(100%-6.5rem)] gap-1.5 sm:left-3 sm:top-3 sm:max-w-[calc(100%-7.5rem)] sm:gap-2">
          <span className="truncate rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold text-navy-foreground sm:px-3 sm:text-xs">{p.purpose}</span>
          {p.tag && <span className="truncate rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground sm:px-3 sm:text-xs">{p.tag}</span>}
        </div>
        <CardActions p={p} comparing={comparing} onCompare={onCompare} className="absolute right-2 top-2 sm:right-3 sm:top-3" />
      </div>
      <Link to="/imoveis/$id" params={{ id: propertySlug(p) }} className="block px-1 pt-3 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:pt-4">
        <p className="flex items-center justify-between gap-2 text-xs font-semibold text-muted-foreground"><span className="flex min-w-0 items-center gap-1 truncate"><MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />{p.type} · {p.neighborhood}, {p.city}</span>{showCode && <span className="shrink-0 text-[10px] font-medium">Cód. {p.id}</span>}</p>
        <h3 className="mt-1.5 line-clamp-2 text-lg font-bold leading-snug sm:text-xl">{p.title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-border/70 py-2.5 text-xs font-medium text-muted-foreground sm:gap-x-4 sm:text-sm">
          <span className="inline-flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-primary" />{p.area} m²</span>
          <span className="inline-flex items-center gap-1"><BedDouble className="h-3.5 w-3.5 text-primary" />{p.beds} quartos</span>
          <span className="inline-flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-primary" />{p.baths} banheiros</span>
          <span className="inline-flex items-center gap-1"><Car className="h-3.5 w-3.5 text-primary" />{p.parking} vagas</span>
        </div>
        <div className="mt-4 space-y-2">
          <PriceBlock p={p} />
          <div className="flex justify-end"><span className="text-sm font-bold text-primary group-hover:underline">Ver imóvel →</span></div>
        </div>
      </Link>
    </div>
  );
}
