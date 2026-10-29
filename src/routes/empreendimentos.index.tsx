import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Building2, CalendarDays, ChevronDown, MapPin, Ruler, Search, SlidersHorizontal, X } from "lucide-react";
import banner1 from "@/assets/banner1.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p6 from "@/assets/p6.jpg";
import { PageShell } from "@/components/Layout";
import { FormSelect } from "@/components/ui/form-select";
import { digitsOnly, formatThousands } from "@/lib/input-masks";

const phases = ["Lançamento", "Em obras", "Pronto para morar"] as const;
type Phase = (typeof phases)[number];
type SearchParams = { fase?: Phase; tipo?: string; q?: string };
const isPhase = (value: unknown): value is Phase => typeof value === "string" && phases.includes(value as Phase);

export const Route = createFileRoute("/empreendimentos/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const fase = search["fase"];
    const tipo = search["tipo"];
    const q = search["q"];
    return {
      ...(isPhase(fase) ? { fase } : {}),
      ...(typeof tipo === "string" ? { tipo } : {}),
      ...(typeof q === "string" ? { q } : {}),
    };
  },
  head: () => ({ meta: [{ title: "Empreendimentos e lançamentos | Premium House" }, { name: "description", content: "Conheça lançamentos, imóveis em obras e prontos para morar selecionados pela Premium House." }], links: [{ rel: "canonical", href: "https://premium-house-imoveis-2026.microsistec.chatgpt.site/empreendimentos" }] }),
  component: DevelopmentList,
});

type Development = { slug: string; name: string; type: string; status: Phase; city: string; neighborhood: string; img: string; areaMin: number; areaMax: number; area: string; units: string; delivery: string; from: string; bedsMax: number; suitesMax: number; bathsMax: number; parkingMax: number; furnished: boolean; pets: boolean; features: string[] };

const developments: Development[] = [
  { slug: "skyline-residences-2-a-4-quartos-98-a-210-m2-itaim-bibi-sao-paulo-sp", name: "Skyline Residences", type: "Apartamento", status: "Lançamento", city: "São Paulo", neighborhood: "Itaim Bibi", img: banner1, areaMin: 98, areaMax: 210, area: "98 a 210 m²", units: "2 a 4 suítes", delivery: "Dez/2028", from: "R$ 1,9 mi", bedsMax: 4, suitesMax: 4, bathsMax: 4, parkingMax: 3, furnished: false, pets: true, features: ["Ar condicionado", "Academia", "Portaria 24h"] },
  { slug: "jardins-de-alphaville-4-a-5-quartos-280-a-420-m2-alphaville-barueri-sp", name: "Jardins de Alphaville", type: "Casa", status: "Em obras", city: "Barueri", neighborhood: "Alphaville", img: p2, areaMin: 280, areaMax: 420, area: "280 a 420 m²", units: "Casas 4 suítes", delivery: "Jun/2027", from: "R$ 3,2 mi", bedsMax: 5, suitesMax: 4, bathsMax: 6, parkingMax: 5, furnished: false, pets: true, features: ["Adega", "Aquecimento solar", "Churrasqueira", "Piscina"] },
  { slug: "mar-azul-riviera-3-a-5-quartos-160-a-410-m2-riviera-de-sao-lourenco-bertioga-sp", name: "Mar Azul Riviera", type: "Apartamento", status: "Pronto para morar", city: "Bertioga", neighborhood: "Riviera de São Lourenço", img: p3, areaMin: 160, areaMax: 410, area: "160 a 410 m²", units: "3 a 5 suítes", delivery: "Pronto", from: "R$ 2,8 mi", bedsMax: 5, suitesMax: 5, bathsMax: 7, parkingMax: 4, furnished: true, pets: true, features: ["Ar condicionado", "Varanda gourmet", "Piscina", "Academia"] },
  { slug: "vista-paulista-studios-a-3-quartos-45-a-120-m2-bela-vista-sao-paulo-sp", name: "Vista Paulista", type: "Studio", status: "Lançamento", city: "São Paulo", neighborhood: "Bela Vista", img: p1, areaMin: 45, areaMax: 120, area: "45 a 120 m²", units: "Studios a 3 dorms", delivery: "Mar/2029", from: "R$ 620 mil", bedsMax: 3, suitesMax: 3, bathsMax: 3, parkingMax: 2, furnished: false, pets: false, features: ["Ar condicionado", "Academia", "Portaria 24h"] },
  { slug: "refugio-da-serra-3-quartos-220-a-340-m2-campos-do-jordao-sp", name: "Refúgio da Serra", type: "Chalé", status: "Em obras", city: "Campos do Jordão", neighborhood: "Serra da Mantiqueira", img: p6, areaMin: 220, areaMax: 340, area: "220 a 340 m²", units: "Chalés 3 suítes", delivery: "Set/2027", from: "R$ 1,7 mi", bedsMax: 3, suitesMax: 3, bathsMax: 4, parkingMax: 3, furnished: true, pets: true, features: ["Adega", "Aquecimento solar", "Lareira"] },
];

const knownCities = [...new Set(developments.map((d) => d.city))];
const knownNeighborhoods = [...new Set(developments.map((d) => d.neighborhood))];

type Filters = {
  keyword: string;
  city: string;
  neighborhood: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  parking: string;
  phase: string;
  furnished: "Indiferente" | "Sim" | "Não";
  suites: string;
  pets: "Indiferente" | "Sim" | "Não";
  areaMin: string;
  areaMax: string;
  features: string[];
};

const initialFilters: Filters = {
  keyword: "", city: "", neighborhood: "", type: "", bedrooms: "", bathrooms: "", parking: "", phase: "",
  furnished: "Indiferente", suites: "", pets: "Indiferente", areaMin: "", areaMax: "", features: [],
};

function filtersFromSearch(search: SearchParams): Filters {
  const next = { ...initialFilters, phase: search.fase ?? "", type: search.tipo ?? "" };
  const query = search.q?.trim();
  if (query) {
    const normalized = query.toLocaleLowerCase("pt-BR");
    const city = knownCities.find((value) => value.toLocaleLowerCase("pt-BR") === normalized);
    const neighborhood = knownNeighborhoods.find((value) => value.toLocaleLowerCase("pt-BR") === normalized);
    if (city) next.city = city;
    else if (neighborhood) next.neighborhood = neighborhood;
    else next.keyword = query;
  }
  return next;
}

const selectClass = "h-12 w-full rounded-xl border border-border bg-background px-3 text-sm font-normal text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground";
const allFeatures = ["Adega", "Aquecimento solar", "Ar condicionado", "Armário closet", "Churrasqueira", "Piscina", "Varanda gourmet", "Academia", "Portaria 24h", "Lareira"];

function DevelopmentList() {
  const search = Route.useSearch();
  const [filters, setFilters] = useState<Filters>(() => filtersFromSearch(search));
  const [applied, setApplied] = useState<Filters>(() => filtersFromSearch(search));
  const [moreOpen, setMoreOpen] = useState(false);
  const [allFeaturesOpen, setAllFeaturesOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const filterPanelRef = useRef<HTMLElement>(null);
  const listingRef = useRef<HTMLDivElement>(null);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const closeFilterButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!showFilters || window.matchMedia("(min-width: 1024px)").matches) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeFilterButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowFilters(false);
        filterTriggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = filterPanelRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showFilters]);
  useEffect(() => {
    if (!search.fase && !search.tipo && !search.q) return;
    const next = filtersFromSearch(search);
    setFilters(next);
    setApplied(next);
    setVisibleCount(6);
  }, [search.fase, search.tipo, search.q]);

  const cities = useMemo(() => [...new Set(developments.map((d) => d.city))].sort(), []);
  const neighborhoods = useMemo(() => [...new Set(developments.filter((d) => !filters.city || d.city === filters.city).map((d) => d.neighborhood))].sort(), [filters.city]);
  const types = useMemo(() => [...new Set(developments.map((d) => d.type))].sort(), []);
  const featureChoices = allFeatures.slice(0, allFeaturesOpen ? allFeatures.length : 4);
  const advancedFilterCount = [filters.phase, filters.furnished !== "Indiferente" ? "furnished" : "", filters.suites, filters.pets !== "Indiferente" ? "pets" : "", filters.areaMin, filters.areaMax, ...filters.features].filter(Boolean).length;
  const list = developments.filter((d) => {
    const number = (value: string) => value ? Number.parseInt(value, 10) : 0;
    const areaMin = number(applied.areaMin);
    const areaMax = number(applied.areaMax);
    return (!applied.keyword || `${d.name} ${d.city} ${d.neighborhood}`.toLocaleLowerCase("pt-BR").includes(applied.keyword.toLocaleLowerCase("pt-BR")))
      && (!applied.city || d.city === applied.city)
      && (!applied.neighborhood || d.neighborhood === applied.neighborhood)
      && (!applied.type || d.type === applied.type)
      && (!applied.phase || d.status === applied.phase)
      && (!applied.bedrooms || d.bedsMax >= number(applied.bedrooms))
      && (!applied.bathrooms || d.bathsMax >= number(applied.bathrooms))
      && (!applied.parking || d.parkingMax >= number(applied.parking))
      && (!applied.suites || d.suitesMax >= number(applied.suites))
      && (applied.furnished === "Indiferente" || d.furnished === (applied.furnished === "Sim"))
      && (applied.pets === "Indiferente" || d.pets === (applied.pets === "Sim"))
      && (!areaMin || d.areaMax >= areaMin)
      && (!areaMax || d.areaMin <= areaMax)
      && applied.features.every((feature) => d.features.includes(feature));
  });

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters((current) => ({ ...current, [key]: value }));
  const toggleFeature = (feature: string) => setFilters((current) => ({ ...current, features: current.features.includes(feature) ? current.features.filter((item) => item !== feature) : [...current.features, feature] }));
  const clearFilters = () => { setFilters(initialFilters); setApplied(initialFilters); setVisibleCount(6); };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setApplied({ ...filters }); setVisibleCount(6); setShowFilters(false); };
  const choices = (values: string[], selected: string, onChange: (value: string) => void) => (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => <button key={value || "all"} type="button" aria-pressed={selected === value} onClick={() => onChange(selected === value ? "" : value)} className={`min-w-10 rounded-lg border px-3 py-2 text-sm font-semibold transition ${selected === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/50"}`}>{value ? `${value}+` : "Todos"}</button>)}
    </div>
  );
  const visibleList = list.slice(0, visibleCount);

  return <PageShell>
    <section className="relative">
      <img src={banner1} alt="Empreendimento Premium House" width={1600} height={640} className="h-[300px] w-full object-cover sm:h-[360px]" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-x absolute inset-0 flex flex-col justify-center text-navy-foreground">
        <p className="text-sm font-bold uppercase tracking-widest text-navy-foreground/80">Empreendimentos</p>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl md:text-6xl">Lançamentos e imóveis na planta</h1>
      </div>
    </section>

    <div ref={listingRef} className="container-x mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[300px_1fr] lg:items-start">
      <button ref={filterTriggerRef} type="button" aria-expanded={showFilters} aria-controls="development-search-filters" onClick={() => setShowFilters(true)} className="sticky top-[calc(var(--site-header-height)_+_0.75rem)] z-30 flex min-h-12 items-center justify-center gap-2 rounded-xl border bg-card py-3 font-bold shadow-card lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Mais Filtros{advancedFilterCount > 0 && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{advancedFilterCount}</span>} <ChevronDown className="h-4 w-4" /></button>
      {showFilters && <button type="button" aria-label="Fechar filtros" onClick={() => setShowFilters(false)} className="fixed inset-x-0 bottom-0 top-[var(--site-header-height)] z-[69] bg-navy/45 backdrop-blur-[2px] lg:hidden" />}
      <div className="contents lg:block lg:h-fit lg:self-start lg:sticky lg:top-[calc(var(--site-header-height)_+_0.75rem)] lg:z-10">
      <aside id="development-search-filters" ref={filterPanelRef} role={showFilters ? "dialog" : undefined} aria-modal={showFilters ? true : undefined} aria-labelledby={showFilters ? "development-filter-title" : undefined} className={`${showFilters ? "flex" : "hidden"} fixed inset-x-3 bottom-3 top-[calc(var(--site-header-height)_+_0.75rem)] z-[70] flex-col overflow-hidden rounded-2xl border bg-card p-0 shadow-float lg:static lg:inset-auto lg:z-auto lg:block lg:h-fit lg:max-h-[calc(100svh_-_var(--site-header-height)_-_1.5rem)] lg:overflow-y-auto lg:rounded-2xl lg:p-5 lg:pr-3`}>
        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col lg:block lg:space-y-3">
          <div className="flex shrink-0 items-center justify-between gap-3 px-5 pt-5 lg:px-0 lg:pt-0"><h2 id="development-filter-title" className="!text-lg !font-semibold leading-tight">Filtrar empreendimentos</h2><button ref={closeFilterButtonRef} type="button" onClick={() => setShowFilters(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted lg:hidden">Fechar</button></div>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-4 lg:contents lg:p-0">
          <fieldset>
            <legend className={`${labelClass} mb-2`}>Fase do empreendimento</legend>
            <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-muted p-2">
              {[["Todas", ""], ["Lançamentos", "Lançamento"], ["Em obras", "Em obras"], ["Prontos", "Pronto para morar"]].map(([label, value]) => {
                const selected = filters.phase === value;
                return <button key={label} type="button" aria-pressed={selected} onClick={() => set("phase", value)} className={`min-h-11 rounded-xl px-2 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${selected ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-background/80 hover:text-foreground"}`}>{label}</button>;
              })}
            </div>
          </fieldset>
          <label><span className={labelClass}>Cidade</span><FormSelect className={selectClass} value={filters.city} onChange={(e) => { set("city", e.target.value); set("neighborhood", ""); }}><option value="">Todas</option>{cities.map((city) => <option key={city}>{city}</option>)}</FormSelect></label>
          <label><span className={labelClass}>Bairro</span><FormSelect className={selectClass} value={filters.neighborhood} onChange={(e) => set("neighborhood", e.target.value)}><option value="">Todos</option>{neighborhoods.map((hood) => <option key={hood}>{hood}</option>)}</FormSelect></label>
          <label><span className={labelClass}>Tipo</span><FormSelect className={selectClass} value={filters.type} onChange={(e) => set("type", e.target.value)}><option value="">Todos</option>{types.map((type) => <option key={type}>{type}</option>)}</FormSelect></label>
          <label><span className={labelClass}>Quartos</span><FormSelect className={selectClass} value={filters.bedrooms} onChange={(e) => set("bedrooms", e.target.value)}><option value="">Qualquer</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={String(n)}>{n === 5 ? "5+" : n}</option>)}</FormSelect></label>
          <label><span className={labelClass}>Banheiros</span><FormSelect className={selectClass} value={filters.bathrooms} onChange={(e) => set("bathrooms", e.target.value)}><option value="">Qualquer</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={String(n)}>{n === 5 ? "5+" : n}</option>)}</FormSelect></label>
          <label><span className={labelClass}>Vagas</span><FormSelect className={selectClass} value={filters.parking} onChange={(e) => set("parking", e.target.value)}><option value="">Qualquer</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={String(n)}>{n === 5 ? "5+" : n}</option>)}</FormSelect></label>
          <div className="border-t pt-3">
            <button type="button" aria-expanded={moreOpen} onClick={() => setMoreOpen((open) => !open)} className="flex w-full items-center justify-between py-1 text-sm font-bold text-foreground transition hover:text-primary"><span className="inline-flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Mais filtros</span><ChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} /></button>
          </div>
          {moreOpen && <div className="space-y-5 border-t pt-4">
          <div className="space-y-5">
            <fieldset><legend className={`${labelClass} mb-2`}>Mobiliado?</legend><div className="flex gap-2">{(["Sim", "Não", "Indiferente"] as const).map((value) => <button key={value} type="button" aria-pressed={filters.furnished === value} onClick={() => set("furnished", value)} className={`rounded-lg border px-3.5 py-2 text-sm ${filters.furnished === value ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{value}</button>)}</div></fieldset>
            <fieldset><legend className={`${labelClass} mb-2`}>Suítes</legend>{choices(["1", "2", "3", "4", "5"], filters.suites, (value) => set("suites", value))}</fieldset>
            <fieldset><legend className={`${labelClass} mb-2`}>Aceita pet?</legend><div className="flex gap-2">{(["Sim", "Não", "Indiferente"] as const).map((value) => <button key={value} type="button" aria-pressed={filters.pets === value} onClick={() => set("pets", value)} className={`rounded-lg border px-3.5 py-2 text-sm ${filters.pets === value ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>{value}</button>)}</div></fieldset>
            <fieldset><legend className={`${labelClass} mb-2`}>Área (m²)</legend><div className="grid grid-cols-2 gap-2"><label className="text-sm text-muted-foreground">De<input type="text" inputMode="numeric" value={formatThousands(filters.areaMin)} onChange={(e) => set("areaMin", digitsOnly(e.target.value))} placeholder="0" className={`${selectClass} mt-1`} /></label><label className="text-sm text-muted-foreground">Até<input type="text" inputMode="numeric" value={formatThousands(filters.areaMax)} onChange={(e) => set("areaMax", digitsOnly(e.target.value))} placeholder="10.000" className={`${selectClass} mt-1`} /></label></div></fieldset>
          </div>
          <fieldset>
            <legend className={`${labelClass} mb-3`}>Características</legend>
            <div className="grid gap-y-3">{featureChoices.map((feature) => <label key={feature} className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={filters.features.includes(feature)} onChange={() => toggleFeature(feature)} className="h-4 w-4 rounded accent-primary" />{feature}</label>)}</div>
            <button type="button" onClick={() => setAllFeaturesOpen((open) => !open)} className="mt-3 text-sm font-semibold text-primary">{allFeaturesOpen ? "Menos características" : "Mais características"} <span aria-hidden="true">{allFeaturesOpen ? "⌃" : "⌄"}</span></button>
          </fieldset>
          </div>}
          </div>
          <div className="shrink-0 space-y-2 border-t bg-card px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:px-0 lg:pb-0"><button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"><Search className="h-4 w-4" /> Buscar empreendimentos</button><button type="button" onClick={clearFilters} className="inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-xl border py-2 text-sm font-medium text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /> Limpar filtros</button></div>
        </form>
      </aside>
      </div>

    <section className="pb-16" aria-live="polite">
      <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Seleção Premium House</p><h2 className="mt-1 text-2xl sm:text-3xl">{list.length} {list.length === 1 ? "empreendimento encontrado" : "empreendimentos encontrados"}</h2></div>{Boolean(applied.keyword || applied.city || applied.neighborhood || applied.type || applied.phase || applied.bedrooms || applied.bathrooms || applied.parking || applied.suites || applied.furnished !== "Indiferente" || applied.pets !== "Indiferente" || applied.areaMin || applied.areaMax || applied.features.length) && <button type="button" onClick={clearFilters} className="text-sm font-semibold text-primary">Limpar busca</button>}</div>
      {list.length ? <>
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {visibleList.map((development) => <article key={development.name} className="group min-w-0 overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-float">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]"><img src={development.img} alt={development.name} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground sm:left-3 sm:top-3 sm:px-3 sm:text-xs">{development.status}</span></div>
            <div className="p-3 sm:p-6"><h3 className="text-base font-bold leading-snug sm:text-2xl">{development.name}</h3><p className="mt-1 flex items-start gap-1 text-xs leading-snug text-muted-foreground sm:text-sm"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{development.neighborhood}, {development.city}</span></p>
              <ul className="mt-3 grid grid-cols-1 gap-2 border-y py-3 text-xs sm:mt-4 sm:grid-cols-3 sm:gap-2"><li className="flex items-center gap-2 text-muted-foreground sm:flex-col sm:gap-1 sm:text-center"><Ruler className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />{development.area}</li><li className="flex items-center gap-2 text-muted-foreground sm:flex-col sm:gap-1 sm:text-center"><Building2 className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />{development.units}</li><li className="flex items-center gap-2 text-muted-foreground sm:flex-col sm:gap-1 sm:text-center"><CalendarDays className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />{development.delivery}</li></ul>
              <div className="mt-3 flex flex-col items-start gap-3 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"><span className="text-xs text-muted-foreground sm:text-sm">A partir de <strong className="text-base text-navy sm:text-lg">{development.from}</strong></span><Link to="/empreendimentos/$slug" params={{ slug: development.slug }} className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-navy px-3 py-2 text-xs font-bold text-navy-foreground sm:w-auto sm:px-5 sm:text-sm">Mais informações</Link></div>
            </div>
          </article>)}
        </div>
        {list.length > visibleCount && <div className="mt-9 flex flex-col items-center gap-3"><p className="text-sm text-muted-foreground">Mostrando {visibleList.length} de {list.length} empreendimentos</p><button type="button" onClick={() => setVisibleCount((count) => count + 6)} className="rounded-full border-2 border-navy px-7 py-3 text-sm font-bold text-navy transition hover:bg-navy hover:text-navy-foreground">Ver mais empreendimentos</button></div>}
      </> : <div className="rounded-2xl border border-dashed p-10 text-center"><h3 className="text-xl font-bold">Nenhum empreendimento encontrado</h3><p className="mt-2 text-muted-foreground">Ajuste os filtros para ver outras opções.</p><button type="button" onClick={clearFilters} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">Limpar filtros</button></div>}
    </section>
    </div>
  </PageShell>;
}
