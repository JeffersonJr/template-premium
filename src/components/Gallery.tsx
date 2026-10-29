import { useEffect, useRef, useState, type ReactNode } from "react";
import { Images, PlayCircle, Rotate3d, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ConsentFrame } from "@/components/CookieConsent";

export function Gallery({ images, title, video, tour, showTabs = true, action }: { images: string[]; title: string; video: string; tour: string; showTabs?: boolean; action?: ReactNode }) {
  const [tab, setTab] = useState<"fotos" | "video" | "tour">("fotos");
  const [open, setOpen] = useState<number | null>(null);
  const isGalleryOpen = open !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!isGalleryOpen) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("[data-gallery-close]")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(null); }
      if (event.key === "ArrowRight") { event.preventDefault(); setOpen((current) => ((current ?? 0) + 1) % images.length); }
      if (event.key === "ArrowLeft") { event.preventDefault(); setOpen((current) => ((current ?? 0) - 1 + images.length) % images.length); }
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [isGalleryOpen, images.length]);
  const tabs = [
    { k: "fotos" as const, l: `Fotos (${images.length})`, i: Images },
    { k: "video" as const, l: "Vídeo", i: PlayCircle },
    { k: "tour" as const, l: "Tour 360º", i: Rotate3d },
  ];
  const mobileImages = [images[0], images[1] ?? images[0], images[2] ?? images[1] ?? images[0]];
  return (
    <div>
      {showTabs && <div className="mb-3 flex gap-2">
        {tabs.map((t) => (
          <button key={t.k} onClick={() => setTab(t.k)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${tab === t.k ? "bg-navy text-navy-foreground" : "border bg-card hover:border-primary"}`}><t.i className="h-4 w-4" />{t.l}</button>
        ))}
      </div>}
      {tab === "fotos" && (
        <>
          <div className="relative overflow-hidden rounded-2xl md:hidden">
            <div className="grid h-[72vw] min-h-[230px] max-h-[300px] grid-cols-[1.55fr_1fr] gap-1">
              <button type="button" aria-label={`Abrir galeria: ${title}, foto 1 de ${images.length}`} onClick={() => setOpen(0)} className="relative overflow-hidden focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                <img src={mobileImages[0]} alt={`${title} foto 1`} width={1200} height={900} fetchPriority="high" decoding="async" className="h-full w-full object-cover transition duration-500" />
              </button>
              <div className="grid grid-rows-2 gap-1">
                <button type="button" aria-label={`Abrir galeria: ${title}, foto 2 de ${images.length}`} onClick={() => setOpen(Math.min(1, images.length - 1))} className="relative overflow-hidden focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                  <img src={mobileImages[1]} alt={`${title} foto 2`} width={1200} height={900} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500" />
                </button>
                <button type="button" aria-label={`Abrir galeria completa de ${title}, foto 3 de ${images.length}`} onClick={() => setOpen(Math.min(2, images.length - 1))} className="relative overflow-hidden focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                  <img src={mobileImages[2]} alt={`${title} foto 3`} width={1200} height={900} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500" />
                  <span className="absolute inset-0 flex items-center justify-center bg-navy/45"><span className="rounded-lg border border-card/90 bg-navy/20 px-3 py-2 text-xs font-bold text-navy-foreground backdrop-blur-sm">Ver mais fotos</span></span>
                </button>
              </div>
            </div>
            {action && <div className="absolute right-3 top-3 z-10">{action}</div>}
          </div>
          <div className="relative hidden h-[440px] grid-cols-4 grid-rows-2 gap-1 overflow-hidden rounded-2xl md:grid">
            {images.slice(0, 5).map((src, i) => (
              <button key={i} type="button" aria-label={`Abrir galeria: ${title}, foto ${i + 1} de ${images.length}`} onClick={() => setOpen(i)} className={`relative overflow-hidden focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${i === 0 ? "col-span-2 row-span-2" : i === 3 && images.length === 4 ? "col-span-2" : "block"}`}>
                <img src={src} alt={`${title} foto ${i + 1}`} width={1200} height={900} loading={i ? "lazy" : undefined} decoding="async" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                {i === Math.min(images.length, 5) - 1 && <span className="absolute inset-0 flex items-center justify-center bg-navy/45"><span className="rounded-lg border border-card/90 bg-navy/20 px-5 py-2.5 text-sm font-bold text-navy-foreground backdrop-blur-sm">Ver mais fotos</span></span>}
              </button>
            ))}
            {action && <div className="absolute right-4 top-4 z-10">{action}</div>}
          </div>
        </>
      )}
      {tab === "video" && <div className="aspect-video overflow-hidden rounded-2xl bg-muted md:aspect-auto md:h-[400px]"><ConsentFrame src={video} title={`Vídeo - ${title}`} className="h-full w-full" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>}
      {tab === "tour" && <div className="aspect-video overflow-hidden rounded-2xl bg-muted md:aspect-auto md:h-[400px]"><ConsentFrame src={tour} title={`Tour 360º - ${title}`} className="h-full w-full" allow="xr-spatial-tracking; fullscreen" allowFullScreen /></div>}

      {open !== null && (
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`Galeria de fotos: ${title}`} tabIndex={-1} className="fixed inset-0 z-[60] flex flex-col bg-navy/95 p-4" onClick={() => setOpen(null)}>
          <div className="flex items-center justify-between text-navy-foreground"><span aria-live="polite" className="text-sm font-bold">Foto {open + 1} de {images.length}</span><button type="button" data-gallery-close aria-label="Fechar galeria" onClick={() => setOpen(null)} className="rounded-full p-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><X className="h-7 w-7" /></button></div>
          <div className="relative flex flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Foto anterior" onClick={() => setOpen((open - 1 + images.length) % images.length)} className="absolute left-2 rounded-full bg-card p-3 text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"><ChevronLeft /></button>
            <img src={images[open]} alt={`${title} foto ${open + 1}`} width={1200} height={900} decoding="async" className="max-h-[75vh] max-w-full rounded-xl object-contain" />
            <button type="button" aria-label="Próxima foto" onClick={() => setOpen((open + 1) % images.length)} className="absolute right-2 rounded-full bg-card p-3 text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"><ChevronRight /></button>
          </div>
          <div className="flex justify-center gap-2 overflow-x-auto pb-2" onClick={(e) => e.stopPropagation()}>
            {images.map((src, i) => <button key={i} type="button" aria-label={`Mostrar foto ${i + 1}`} aria-current={i === open ? "true" : undefined} onClick={() => setOpen(i)} className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${i === open ? "ring-2 ring-primary" : "opacity-60"}`}><img src={src} alt="" width={1200} height={900} loading="lazy" decoding="async" className="h-full w-full object-cover" /></button>)}
          </div>
        </div>
      )}
    </div>
  );
}
