import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, BedDouble, Bath, Maximize, Heart, ArrowRight, Phone, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import banner from "@/assets/banner.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum Imóveis — Comprar, alugar, temporada e permuta" },
      { name: "description", content: "Encontre casas, apartamentos e coberturas para comprar, alugar, temporada ou permuta." },
      { property: "og:title", content: "Aurum Imóveis — Seu próximo endereço" },
      { property: "og:description", content: "Oportunidades, lançamentos e imóveis em destaque selecionados para você." },
    ],
  }),
  component: Index,
});

type Mode = "Comprar" | "Alugar" | "Temporada" | "Permuta";
const modes: Mode[] = ["Comprar", "Alugar", "Temporada", "Permuta"];

type Imovel = {
  id: number; title: string; city: string; img: string; mode: Mode; type: string;
  price: string; beds: number; baths: number; area: number; old?: string;
};

const imoveis: Imovel[] = [
  { id: 1, title: "Villa Horizonte", city: "Florianópolis, SC", img: p1, mode: "Comprar", type: "Casa", price: "R$ 4.800.000", beds: 5, baths: 6, area: 520, old: "R$ 5.400.000" },
  { id: 2, title: "Cobertura Skyline", city: "São Paulo, SP", img: p2, mode: "Alugar", type: "Cobertura", price: "R$ 18.500/mês", beds: 3, baths: 4, area: 280 },
  { id: 3, title: "Casa Pé na Areia", city: "Búzios, RJ", img: p3, mode: "Temporada", type: "Casa", price: "R$ 2.200/diária", beds: 4, baths: 4, area: 340, old: "R$ 2.800/diária" },
  { id: 4, title: "Residencial Aurora", city: "Curitiba, PR", img: p4, mode: "Comprar", type: "Apartamento", price: "R$ 890.000", beds: 2, baths: 2, area: 84, old: "R$ 1.020.000" },
  { id: 5, title: "Chalé da Serra", city: "Campos do Jordão, SP", img: p5, mode: "Permuta", type: "Casa", price: "R$ 1.950.000", beds: 3, baths: 3, area: 210 },
  { id: 6, title: "Loft Nogueira", city: "Belo Horizonte, MG", img: p6, mode: "Alugar", type: "Apartamento", price: "R$ 6.900/mês", beds: 2, baths: 2, area: 110, old: "R$ 7.800/mês" },
];

function Index() {
  const [mode, setMode] = useState<Mode>("Comprar");
  const [type, setType] = useState("Todos");
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState<{ mode: Mode | null; type: string; query: string }>({ mode: null, type: "Todos", query: "" });

  const search = () => {
    setApplied({ mode, type, query });
    document.getElementById("destaques")?.scrollIntoView({ behavior: "smooth" });
  };

  const filtered = imoveis.filter(
    (i) =>
      (!applied.mode || i.mode === applied.mode) &&
      (applied.type === "Todos" || i.type === applied.type) &&
      (!applied.query || (i.city + i.title).toLowerCase().includes(applied.query.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2 font-display text-2xl">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">A</span>
            Aurum
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            {modes.map((m) => (
              <button key={m} onClick={() => { setMode(m); setApplied({ mode: m, type: "Todos", query: "" }); document.getElementById("destaques")?.scrollIntoView({ behavior: "smooth" }); }} className="transition-colors hover:text-foreground">{m}</button>
            ))}
          </nav>
          <a href="tel:+551100000000" className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            <Phone className="h-4 w-4" /> Fale conosco
          </a>
        </div>
      </header>

      {/* Hero / Banner */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <img src={banner} alt="Torre residencial de luxo ao entardecer" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-overlay via-overlay/85 to-overlay/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-6 pb-16 pt-36">
          <span className="mb-5 w-fit rounded-full border border-border bg-glass px-4 py-1.5 text-xs uppercase tracking-widest text-primary backdrop-blur">Imobiliária premium</span>
          <h1 className="max-w-2xl font-display text-5xl leading-tight md:text-7xl">
            Onde sonhos viram <em className="text-primary">endereços</em>
          </h1>
          <p className="mt-5 max-w-lg text-muted-foreground">Compre, alugue, passe a temporada ou faça permuta com quem entende de imóveis de alto padrão.</p>

          {/* Search */}
          <div className="mt-10 max-w-4xl rounded-2xl border border-border bg-glass p-5 backdrop-blur-xl">
            <div className="mb-4 flex flex-wrap gap-2">
              {modes.map((m) => (
                <button key={m} onClick={() => setMode(m)} className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{m}</button>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]">
              <label className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-3">
                <MapPin className="h-4 w-4 text-primary" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder="Cidade ou bairro" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl bg-secondary px-4 py-3 text-sm outline-none">
                {["Todos", "Casa", "Apartamento", "Cobertura"].map((t) => <option key={t}>{t}</option>)}
              </select>
              <select className="rounded-xl bg-secondary px-4 py-3 text-sm outline-none">
                <option>Quartos: qualquer</option><option>1+</option><option>2+</option><option>3+</option><option>4+</option>
              </select>
              <button onClick={search} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold">
                <Search className="h-4 w-4" /> Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Oportunidades */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle eyebrow="Preço abaixo do mercado" title="Oportunidades" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {imoveis.filter((i) => i.old).map((i) => (
            <article key={i.id} className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={i.img} alt={i.title} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground"><Flame className="h-3 w-3" /> Oportunidade</span>
              </div>
              <div className="p-4">
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{i.city}</p>
                <h3 className="mt-1 font-semibold">{i.title}</h3>
                <p className="mt-3 text-xs text-muted-foreground line-through">{i.old}</p>
                <p className="text-lg font-bold text-primary">{i.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Imóveis no banner */}
      <BannerShowcase />

      {/* Destaques mosaico */}
      <section id="destaques" className="mx-auto max-w-7xl scroll-mt-8 px-6 py-20">
        <SectionTitle eyebrow="Selecionados para você" title="Imóveis em destaque" />
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            Nenhum imóvel encontrado. <button className="text-primary underline" onClick={() => setApplied({ mode: null, type: "Todos", query: "" })}>Ver todos</button>
          </div>
        ) : (
          <>
            {applied.mode && <button onClick={() => setApplied({ mode: null, type: "Todos", query: "" })} className="mb-6 text-sm text-primary">Limpar filtros ({applied.mode}) ×</button>}
            <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
              {filtered.map((i, idx) => (
                <MosaicCard key={i.id} i={i} className={filtered.length === 6 ? ["md:col-span-2 md:row-span-2", "md:col-span-2", "", "", "md:col-span-2", "md:col-span-2"][idx] : "md:col-span-2"} />
              ))}
            </div>
          </>
        )}
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row">
          <span className="font-display text-xl text-foreground">Aurum Imóveis</span>
          <span>CRECI 00000-J · © 2026 Todos os direitos reservados</span>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        <p className="text-xs uppercase tracking-widest text-primary">{eyebrow}</p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl">{title}</h2>
      </div>
      <a href="#destaques" className="hidden items-center gap-2 rounded-full border border-border px-5 py-2 text-sm hover:border-primary md:flex">Ver todos <ArrowRight className="h-4 w-4" /></a>
    </div>
  );
}

function MosaicCard({ i, className }: { i: Imovel; className?: string | undefined }) {
  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-border ${className}`}>
      <img src={i.img} alt={i.title} loading="lazy" width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/30 to-transparent" />
      <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{i.mode}</span>
      <button aria-label="Favoritar" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-glass backdrop-blur"><Heart className="h-4 w-4" /></button>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{i.city}</p>
        <h3 className="font-display text-2xl">{i.title}</h3>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{i.beds}</span>
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{i.baths}</span>
            <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" />{i.area} m²</span>
          </div>
          <span className="font-bold text-primary">{i.price}</span>
        </div>
      </div>
    </article>
  );
}

function BannerShowcase() {
  const items = imoveis.slice(0, 3) as [Imovel, Imovel, Imovel];
  const [idx, setIdx] = useState(0);
  const cur = items[idx] ?? items[0];
  const go = (d: number) => setIdx((idx + d + items.length) % items.length);
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-border">
          <img key={cur.id} src={cur.img} alt={cur.title} loading="lazy" width={1024} height={1024} className="absolute inset-0 h-full w-full animate-in fade-in object-cover duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-overlay via-overlay/70 to-transparent" />
          <div className="relative flex min-h-[520px] max-w-xl flex-col justify-center p-10">
            <p className="text-xs uppercase tracking-widest text-primary">Imóvel no banner · {cur.mode}</p>
            <h2 className="mt-3 font-display text-5xl">{cur.title}</h2>
            <p className="mt-2 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{cur.city}</p>
            <div className="mt-6 flex gap-6 text-sm">
              <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-primary" />{cur.beds} quartos</span>
              <span className="flex items-center gap-2"><Bath className="h-4 w-4 text-primary" />{cur.baths} banheiros</span>
              <span className="flex items-center gap-2"><Maximize className="h-4 w-4 text-primary" />{cur.area} m²</span>
            </div>
            <p className="mt-6 text-3xl font-bold text-primary">{cur.price}</p>
            <div className="mt-8 flex items-center gap-3">
              <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold">Agendar visita</button>
              <button aria-label="Anterior" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-border bg-glass"><ChevronLeft className="h-4 w-4" /></button>
              <button aria-label="Próximo" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-border bg-glass"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="absolute bottom-6 right-6 hidden gap-3 md:flex">
            {items.map((it, n) => (
              <button key={it.id} onClick={() => setIdx(n)} className={`h-16 w-24 overflow-hidden rounded-lg border-2 ${n === idx ? "border-primary" : "border-transparent opacity-60"}`}>
                <img src={it.img} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
