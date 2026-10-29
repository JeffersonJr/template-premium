import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Maximize2, Minimize2, Pause, Play, QrCode } from "lucide-react";
import logo from "@/assets/logo-optimized.png";
import { brl, isRent, isSale, properties, propertyPath } from "@/data/properties";

const DISPLAY_MS = 12000;

export const Route = createFileRoute("/vitrine")({
  head: () => ({
    meta: [
      { title: "Vitrine de imóveis | Premium House" },
      { name: "description", content: "Vitrine de imóveis Premium House para exibição em tela cheia." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PropertyShowcase,
});

function PropertyShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const showcaseRef = useRef<HTMLElement>(null);
  const property = properties[active % properties.length]!;

  useEffect(() => {
    if (paused || properties.length < 2) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % properties.length), DISPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setActive((index) => (index + 1) % properties.length);
      if (event.key === "ArrowLeft") setActive((index) => (index - 1 + properties.length) % properties.length);
      if (event.key === " ") setPaused((value) => !value);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === showcaseRef.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const sale = isSale(property) ? property.price : undefined;
  const rent = isRent(property) ? (property.purpose === "Locação" ? property.price : property.rentPrice) : undefined;
  const seasonal = property.purpose === "Temporada";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&color=102a4c&bgcolor=ffffff&data=${encodeURIComponent(`https://premium-house-imoveis-2026.microsistec.chatgpt.site${propertyPath(property)}`)}`;
  const change = (direction: number) => setActive((index) => (index + direction + properties.length) % properties.length);
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await showcaseRef.current?.requestFullscreen();
    } catch {
      // Fullscreen can be denied by browser or platform settings; the showcase remains usable.
    }
  };

  return (
    <main ref={showcaseRef} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#07182c] text-white" aria-label="Vitrine automática de imóveis">
      <div key={property.id} className="absolute inset-0 animate-[showcase-image_900ms_ease-out_both]">
        <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07182c]/5 via-[#07182c]/10 to-[#07182c]/75" />
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#07182c]/35 to-transparent" />
      </div>

      <div className="relative grid h-full grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(430px,0.85fr)]">
        <section className="flex min-h-0 flex-col justify-between p-6 sm:p-10 lg:p-14" aria-live="polite">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/35 bg-[#07182c]/40 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] backdrop-blur">{property.tag ?? property.purpose}</span>
            {property.opportunity && <span className="rounded-full bg-white px-4 py-2 text-sm font-extrabold uppercase tracking-widest text-[#102a4c]">Oportunidade</span>}
          </div>
          <div className="max-w-5xl pb-2 text-shadow-lg">
            <p className="flex items-center gap-2 text-lg font-semibold text-white/90 sm:text-2xl"><MapPin className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />{property.neighborhood} · {property.city}/SP</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl xl:text-7xl">{property.title}</h1>
            <p className="mt-5 text-lg font-medium text-white/85 sm:text-2xl">{property.type} <span className="px-2 text-white/55">·</span>{property.area} m² <span className="px-2 text-white/55">·</span>{property.beds} dormitórios <span className="px-2 text-white/55">·</span>{property.parking} vagas</p>
          </div>
        </section>

        <aside className="relative z-10 flex flex-col justify-between bg-[#102a4c]/95 p-6 backdrop-blur-md sm:p-10 lg:p-12">
          <div>
            <div className="inline-flex rounded-xl bg-white px-4 py-2"><img src={logo} alt="Premium House" className="h-10 w-auto object-contain sm:h-12" /></div>
            <p className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-white/60 sm:text-base">Imóvel {String(active + 1).padStart(2, "0")} <span className="px-2">/</span> {String(properties.length).padStart(2, "0")}</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">Encontre seu próximo lugar.</h2>
            <div className="mt-8 space-y-4 border-y border-white/15 py-6">
              {seasonal ? <Price label="Temporada a partir de" value={property.price} suffix="/diária" /> : <>
                {sale !== undefined && <Price label={rent !== undefined ? "À venda" : "Valor"} value={sale} />}
                {rent !== undefined && <Price label="Para alugar" value={rent} suffix="/mês" />}
              </>}
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-base font-semibold text-white/90">
              <span className="rounded-full border border-white/20 px-3 py-1.5">{property.beds} dormitórios</span>
              <span className="rounded-full border border-white/20 px-3 py-1.5">{property.suites} suítes</span>
              <span className="rounded-full border border-white/20 px-3 py-1.5">{property.parking} vagas</span>
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between gap-5 border-t border-white/15 pt-6">
            <div className="max-w-[220px]">
              <p className="text-sm font-bold uppercase tracking-widest text-white/65 sm:text-base">Saiba mais</p>
              <p className="mt-2 text-lg font-semibold leading-snug sm:text-xl">Aponte a câmera e conheça este imóvel.</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-white/60"><QrCode className="h-4 w-4" />Escaneie o QR Code</p>
            </div>
            <img src={qrUrl} alt={`QR Code para ver ${property.title}`} className="h-24 w-24 rounded-xl bg-white p-1.5 sm:h-32 sm:w-32" />
          </div>
        </aside>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-[#07182c]/70 px-3 py-2 backdrop-blur sm:bottom-7">
        <button type="button" aria-label="Imóvel anterior" onClick={() => change(-1)} className="rounded-full p-2 text-white transition hover:bg-white/15"><ChevronLeft className="h-5 w-5" /></button>
        <div className="flex items-center gap-1.5" aria-label={`Imóvel ${active + 1} de ${properties.length}`}>
          {properties.map((item, index) => <span key={item.id} className={`h-1.5 rounded-full transition-all ${index === active ? "w-7 bg-white" : "w-1.5 bg-white/40"}`} />)}
        </div>
        <button type="button" aria-label="Próximo imóvel" onClick={() => change(1)} className="rounded-full p-2 text-white transition hover:bg-white/15"><ChevronRight className="h-5 w-5" /></button>
        <span className="mx-1 h-6 border-l border-white/20" />
        <button type="button" aria-label={paused ? "Retomar carrossel" : "Pausar carrossel"} onClick={() => setPaused((value) => !value)} className="rounded-full p-2 text-white transition hover:bg-white/15">{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
        <button type="button" aria-label={isFullscreen ? "Sair da tela cheia" : "Ativar tela cheia"} aria-pressed={isFullscreen} onClick={() => void toggleFullscreen()} className="rounded-full p-2 text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>
    </main>
  );
}

function Price({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  return <div><p className="text-sm font-bold uppercase tracking-widest text-white/60 sm:text-base">{label}</p><p className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-5xl">{brl(value)}<span className="text-lg font-semibold text-white/70 sm:text-xl">{suffix}</span></p></div>;
}
